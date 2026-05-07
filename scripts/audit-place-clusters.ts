/**
 * Group published places by destination, count them, and identify
 * candidates for the next sprint of curated city/destination hub pages.
 * Read-only; outputs JSON + markdown for review.
 *
 * Run:
 *   NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_ANON_KEY=... \
 *     npx tsx scripts/audit-place-clusters.ts
 *
 * Output:
 *   scripts/output/place-destination-clusters.json
 *   scripts/output/place-destination-clusters.md
 *
 * For each destination:
 *   - destination slug + display title
 *   - number of published places
 *   - top candidate slug for hub-intro hero (featured > sort_order > alpha)
 *   - hub_ready: place_count >= 3
 *   - is_curated_hub: already has a /[city] curated guide
 *   - sprint_candidate: hub_ready && !is_curated_hub
 *
 * No content is written. The user reviews the report.
 */

import { createClient } from "@supabase/supabase-js";
import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  process.exit(1);
}

// Destinations that already have a curated CityGuideContent hub at /[city].
// Mirrors CITY_SLUGS in app/sitemap.ts. Other destinations render via the
// dynamic /[city] route too, but without the curated city-guide editorial.
const CURATED_HUB_SLUGS = new Set([
  "marrakech", "fes", "tangier", "rabat", "essaouira", "casablanca",
  "meknes", "ouarzazate", "agadir", "dakhla", "chefchaouen",
]);

const HUB_READY_THRESHOLD = 3;

// --- Types ----------------------------------------------------------------

interface PlaceRow {
  slug: string;
  title: string;
  destination: string | null;
  featured: boolean | null;
  sort_order: number | null;
  hero_image: string | null;
}

interface DestinationRow {
  slug: string;
  title: string;
  hero_image: string | null;
}

interface ClusterReport {
  slug: string;
  title: string;
  place_count: number;
  hub_ready: boolean;
  is_curated_hub: boolean;
  sprint_candidate: boolean;
  top_hero_candidate: string | null;
  has_destination_row: boolean;
  destination_hero_image: string | null;
  places: { slug: string; title: string; featured: boolean; sort_order: number | null; has_hero: boolean }[];
}

// --- Helpers --------------------------------------------------------------

function displayFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Pick the best place to feature as the hub-intro hero.
 *  1. featured=true, then alphabetical title
 *  2. else lowest sort_order (non-null), then alphabetical
 *  3. else alphabetical title
 * Prefers places that have a hero_image so the hub block has imagery.
 */
function topHeroCandidate(places: PlaceRow[]): string | null {
  if (places.length === 0) return null;

  const sorted = [...places].sort((a, b) => {
    // Prefer places with imagery so the hub hero isn't blank.
    const aImg = a.hero_image ? 1 : 0;
    const bImg = b.hero_image ? 1 : 0;
    if (aImg !== bImg) return bImg - aImg;

    // Featured wins.
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;

    // sort_order ascending (nulls last).
    const aSort = a.sort_order ?? Number.POSITIVE_INFINITY;
    const bSort = b.sort_order ?? Number.POSITIVE_INFINITY;
    if (aSort !== bSort) return aSort - bSort;

    return a.title.localeCompare(b.title);
  });

  return sorted[0]?.slug ?? null;
}

// --- Main -----------------------------------------------------------------

async function main() {
  const sb = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, { auth: { persistSession: false } });

  const [placesRes, destsRes] = await Promise.all([
    sb
      .from("places")
      .select("slug, title, destination, featured, sort_order, hero_image")
      .eq("published", true)
      .order("slug"),
    sb
      .from("destinations")
      .select("slug, title, hero_image")
      .eq("published", true),
  ]);

  if (placesRes.error) {
    console.error("Places select failed:", placesRes.error);
    process.exit(1);
  }
  if (destsRes.error) {
    console.error("Destinations select failed:", destsRes.error);
    process.exit(1);
  }

  const places = (placesRes.data || []) as PlaceRow[];
  const destinations = (destsRes.data || []) as DestinationRow[];
  const destBySlug = new Map(destinations.map((d) => [d.slug, d]));

  // Group places by destination slug.
  const grouped = new Map<string, PlaceRow[]>();
  for (const p of places) {
    if (!p.destination) continue;
    const arr = grouped.get(p.destination) || [];
    arr.push(p);
    grouped.set(p.destination, arr);
  }

  // Build the cluster report — one entry per destination.
  const clusters: ClusterReport[] = Array.from(grouped.entries())
    .map(([slug, items]) => {
      const dest = destBySlug.get(slug);
      const title = dest?.title || displayFromSlug(slug);
      const place_count = items.length;
      const hub_ready = place_count >= HUB_READY_THRESHOLD;
      const is_curated_hub = CURATED_HUB_SLUGS.has(slug);
      return {
        slug,
        title,
        place_count,
        hub_ready,
        is_curated_hub,
        sprint_candidate: hub_ready && !is_curated_hub,
        top_hero_candidate: topHeroCandidate(items),
        has_destination_row: Boolean(dest),
        destination_hero_image: dest?.hero_image ?? null,
        places: items
          .map((p) => ({
            slug: p.slug,
            title: p.title,
            featured: !!p.featured,
            sort_order: p.sort_order,
            has_hero: Boolean(p.hero_image),
          }))
          .sort((a, b) => a.title.localeCompare(b.title)),
      };
    })
    .sort((a, b) => b.place_count - a.place_count);

  const summary = {
    total_published_places: places.length,
    total_destinations_with_places: clusters.length,
    hub_ready: clusters.filter((c) => c.hub_ready).length,
    curated_hubs: clusters.filter((c) => c.is_curated_hub).length,
    sprint_candidates: clusters.filter((c) => c.sprint_candidate).length,
    orphan_destinations_without_row: clusters.filter((c) => !c.has_destination_row).length,
    generated_at: new Date().toISOString(),
  };

  // --- Write JSON ------
  const json = { summary, destinations: clusters };

  // --- Build markdown ------
  const md: string[] = [];
  md.push("# Place destination clusters");
  md.push("");
  md.push(`Generated: ${summary.generated_at}`);
  md.push("");
  md.push("## Summary");
  md.push("");
  md.push(`| Metric | Count |`);
  md.push(`|---|---|`);
  md.push(`| Published places | ${summary.total_published_places} |`);
  md.push(`| Destinations with at least one place | ${summary.total_destinations_with_places} |`);
  md.push(`| Hub-ready (≥${HUB_READY_THRESHOLD} places) | ${summary.hub_ready} |`);
  md.push(`| Already curated /[city] hubs | ${summary.curated_hubs} |`);
  md.push(`| **Sprint candidates** (hub-ready, no curated hub yet) | **${summary.sprint_candidates}** |`);
  md.push(`| Destinations missing a destinations-table row | ${summary.orphan_destinations_without_row} |`);
  md.push("");

  // Sprint candidates first — what to plan
  const sprintCandidates = clusters.filter((c) => c.sprint_candidate);
  if (sprintCandidates.length > 0) {
    md.push("## Sprint candidates");
    md.push("");
    md.push(`Destinations with ≥${HUB_READY_THRESHOLD} published places that don't yet have a curated /[city] hub. Prioritise by place count, then editorial significance.`);
    md.push("");
    md.push(`| Destination | Slug | Places | Top hero candidate | Has destinations row |`);
    md.push(`|---|---|---|---|---|`);
    for (const c of sprintCandidates) {
      md.push(`| ${c.title} | \`${c.slug}\` | ${c.place_count} | \`${c.top_hero_candidate ?? "—"}\` | ${c.has_destination_row ? "yes" : "**no — missing**"} |`);
    }
    md.push("");
  }

  // Already-curated hubs — for context
  const curated = clusters.filter((c) => c.is_curated_hub);
  if (curated.length > 0) {
    md.push("## Already curated");
    md.push("");
    md.push(`| Destination | Slug | Places | Top hero candidate |`);
    md.push(`|---|---|---|---|`);
    for (const c of curated) {
      md.push(`| ${c.title} | \`${c.slug}\` | ${c.place_count} | \`${c.top_hero_candidate ?? "—"}\` |`);
    }
    md.push("");
  }

  // Below threshold — content gaps
  const belowThreshold = clusters.filter((c) => !c.hub_ready);
  if (belowThreshold.length > 0) {
    md.push(`## Below hub-ready threshold (<${HUB_READY_THRESHOLD} places)`);
    md.push("");
    md.push(`Destinations with too few places to justify a curated hub yet. Listed for editorial planning — these need more content before a hub makes sense.`);
    md.push("");
    md.push(`| Destination | Slug | Places |`);
    md.push(`|---|---|---|`);
    for (const c of belowThreshold) {
      md.push(`| ${c.title} | \`${c.slug}\` | ${c.place_count} |`);
    }
    md.push("");
  }

  // Full per-destination breakdown
  md.push("## Full breakdown");
  md.push("");
  for (const c of clusters) {
    md.push(`### ${c.title} \`${c.slug}\``);
    md.push("");
    const tags: string[] = [];
    if (c.is_curated_hub) tags.push("curated hub");
    if (c.sprint_candidate) tags.push("**sprint candidate**");
    if (!c.hub_ready) tags.push("below threshold");
    if (!c.has_destination_row) tags.push("**no destinations row**");
    if (tags.length > 0) md.push(tags.join(" · "));
    md.push("");
    md.push(`- Places: ${c.place_count}`);
    md.push(`- Hub-ready: ${c.hub_ready ? "yes" : "no"}`);
    md.push(`- Top hero candidate: \`${c.top_hero_candidate ?? "—"}\``);
    md.push("");
    md.push(`Place slugs:`);
    md.push(c.places.map((p) => `- \`${p.slug}\` — ${p.title}${p.featured ? " ★" : ""}`).join("\n"));
    md.push("");
  }

  // --- Write outputs ------
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const outDir = join(__dirname, "output");
  mkdirSync(outDir, { recursive: true });

  const jsonPath = join(outDir, "place-destination-clusters.json");
  const mdPath = join(outDir, "place-destination-clusters.md");
  writeFileSync(jsonPath, JSON.stringify(json, null, 2));
  writeFileSync(mdPath, md.join("\n"));

  console.log(`Wrote ${jsonPath}`);
  console.log(`Wrote ${mdPath}`);
  console.log(
    `${summary.total_destinations_with_places} destinations · ${summary.hub_ready} hub-ready · ${summary.curated_hubs} curated · ${summary.sprint_candidates} sprint candidates`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
