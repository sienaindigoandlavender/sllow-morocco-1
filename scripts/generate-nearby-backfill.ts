/**
 * Generate UPDATE statements that backfill `nearby_slugs` for published
 * places where the column is null or empty. The user reviews and runs the
 * SQL manually in Supabase — this script does NOT mutate data.
 *
 * Run:
 *   NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_ANON_KEY=... \
 *     npx tsx scripts/generate-nearby-backfill.ts
 *
 * Output: scripts/backfill-nearby-slugs.sql
 *
 * Logic, in priority order:
 *   1. Same-destination siblings (featured DESC, sort_order ASC, title ASC).
 *   2. If lat/long available, prefer same-destination siblings within ~10km;
 *      fall back to broader same-destination if fewer than 4 candidates.
 *   3. If destination is missing but lat/long present, use a 15km radius
 *      across all published places.
 *   4. If neither destination nor lat/long is available, write an empty
 *      array literal so the column is no longer null (prevents repeated
 *      recalculation attempts).
 *
 * Cap each result at 6 slugs.
 */

import { createClient } from "@supabase/supabase-js";
import { writeFileSync } from "fs";
import { join } from "path";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  process.exit(1);
}

const MAX_NEARBY = 6;
const SAME_DEST_RADIUS_KM = 10;
const NO_DEST_RADIUS_KM = 15;
const MIN_PROXIMITY_RESULTS = 4;

interface PlaceRow {
  slug: string;
  title: string;
  destination: string | null;
  featured: boolean | null;
  sort_order: number | null;
  latitude: number | null;
  longitude: number | null;
  nearby_slugs: string[] | null;
}

function haversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function sortSiblings(a: PlaceRow, b: PlaceRow): number {
  const af = a.featured ? 1 : 0;
  const bf = b.featured ? 1 : 0;
  if (af !== bf) return bf - af;
  const aso = a.sort_order ?? Number.MAX_SAFE_INTEGER;
  const bso = b.sort_order ?? Number.MAX_SAFE_INTEGER;
  if (aso !== bso) return aso - bso;
  return a.title.localeCompare(b.title);
}

function pickNearby(target: PlaceRow, all: PlaceRow[]): string[] {
  const others = all.filter((p) => p.slug !== target.slug);
  const targetDest = (target.destination || "").trim().toLowerCase();
  const hasCoords = target.latitude != null && target.longitude != null;

  if (!targetDest && !hasCoords) {
    return [];
  }

  if (targetDest) {
    const sameDest = others
      .filter((p) => (p.destination || "").trim().toLowerCase() === targetDest)
      .sort(sortSiblings);

    if (hasCoords) {
      const withinRadius = sameDest.filter((p) => {
        if (p.latitude == null || p.longitude == null) return false;
        return (
          haversineKm(
            target.latitude!,
            target.longitude!,
            p.latitude,
            p.longitude,
          ) <= SAME_DEST_RADIUS_KM
        );
      });
      if (withinRadius.length >= MIN_PROXIMITY_RESULTS) {
        return withinRadius.slice(0, MAX_NEARBY).map((p) => p.slug);
      }
    }

    return sameDest.slice(0, MAX_NEARBY).map((p) => p.slug);
  }

  // No destination but lat/long present — radius search across all places.
  const withCoords = others.filter(
    (p) => p.latitude != null && p.longitude != null,
  );
  const ranked = withCoords
    .map((p) => ({
      slug: p.slug,
      dist: haversineKm(
        target.latitude!,
        target.longitude!,
        p.latitude!,
        p.longitude!,
      ),
    }))
    .filter((r) => r.dist <= NO_DEST_RADIUS_KM)
    .sort((a, b) => a.dist - b.dist);

  return ranked.slice(0, MAX_NEARBY).map((r) => r.slug);
}

function escapeSqlString(s: string): string {
  return s.replace(/'/g, "''");
}

function arrayLiteral(slugs: string[]): string {
  if (slugs.length === 0) return "'{}'::text[]";
  const parts = slugs.map((s) => `'${escapeSqlString(s)}'`).join(", ");
  return `ARRAY[${parts}]::text[]`;
}

async function main() {
  const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);

  const { data, error } = await supabase
    .from("places")
    .select(
      "slug,title,destination,featured,sort_order,latitude,longitude,nearby_slugs",
    )
    .eq("published", true);

  if (error) {
    console.error("Supabase error:", error);
    process.exit(1);
  }

  const places = (data || []) as PlaceRow[];
  console.log(`Fetched ${places.length} published places.`);

  const targets = places.filter(
    (p) => !p.nearby_slugs || p.nearby_slugs.length === 0,
  );
  console.log(`${targets.length} places need nearby_slugs backfill.`);

  const lines: string[] = [
    "-- Backfill nearby_slugs for published places.",
    "-- Generated by scripts/generate-nearby-backfill.ts",
    "-- Skips places that already have nearby_slugs populated.",
    "-- Review before running.",
    "",
    "BEGIN;",
    "",
  ];

  let updateCount = 0;
  let emptyCount = 0;

  for (const target of targets) {
    const slugs = pickNearby(target, places);
    if (slugs.length === 0) emptyCount += 1;
    lines.push(
      `UPDATE places SET nearby_slugs = ${arrayLiteral(slugs)} WHERE slug = '${escapeSqlString(target.slug)}';`,
    );
    updateCount += 1;
  }

  lines.push("");
  lines.push("COMMIT;");
  lines.push("");

  const outPath = join(process.cwd(), "scripts", "backfill-nearby-slugs.sql");
  writeFileSync(outPath, lines.join("\n"), "utf8");

  console.log(`Wrote ${updateCount} UPDATE statements to ${outPath}`);
  console.log(`  ${updateCount - emptyCount} populated, ${emptyCount} empty (no destination + no coords).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
