/**
 * One-off destination cluster audit — runs on Vercel where the Supabase env
 * vars already exist. Ports the logic from scripts/audit-place-clusters.ts.
 *
 * Auth: header `x-audit-key` must match AUDIT_KEY constant below. The key
 * is hardcoded for a one-time run; this route is removed in a follow-up
 * commit immediately after the audit is captured.
 *
 * Default: returns the markdown report. Pass ?format=json for the raw shape.
 *
 * Read-only. Anon key is enough.
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const AUDIT_KEY = "28173fff6dd3726d49d7f6db42e89388a7dbc8d7f5caf9da";

const CURATED_HUB_SLUGS = new Set([
  "marrakech", "fes", "tangier", "rabat", "essaouira", "casablanca",
  "meknes", "ouarzazate", "agadir", "dakhla", "chefchaouen",
]);

const HUB_READY_THRESHOLD = 3;

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

function displayFromSlug(slug: string): string {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function topHeroCandidate(places: PlaceRow[]): string | null {
  if (places.length === 0) return null;
  const sorted = [...places].sort((a, b) => {
    const aImg = a.hero_image ? 1 : 0;
    const bImg = b.hero_image ? 1 : 0;
    if (aImg !== bImg) return bImg - aImg;
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    const aSort = a.sort_order ?? Number.POSITIVE_INFINITY;
    const bSort = b.sort_order ?? Number.POSITIVE_INFINITY;
    if (aSort !== bSort) return aSort - bSort;
    return a.title.localeCompare(b.title);
  });
  return sorted[0]?.slug ?? null;
}

export async function GET(req: NextRequest) {
  if (req.headers.get("x-audit-key") !== AUDIT_KEY) {
    return NextResponse.json({ error: "unauthorised" }, { status: 401, headers: { "x-robots-tag": "noindex" } });
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "Supabase env not configured" }, { status: 500, headers: { "x-robots-tag": "noindex" } });
  }

  const sb = createClient(url, key, { auth: { persistSession: false } });
  const [placesRes, destsRes] = await Promise.all([
    sb.from("places").select("slug, title, destination, featured, sort_order, hero_image").eq("published", true).order("slug"),
    sb.from("destinations").select("slug, title, hero_image").eq("published", true),
  ]);

  if (placesRes.error) {
    return NextResponse.json({ error: placesRes.error.message }, { status: 500, headers: { "x-robots-tag": "noindex" } });
  }
  if (destsRes.error) {
    return NextResponse.json({ error: destsRes.error.message }, { status: 500, headers: { "x-robots-tag": "noindex" } });
  }

  const places = (placesRes.data || []) as PlaceRow[];
  const destinations = (destsRes.data || []) as DestinationRow[];
  const destBySlug = new Map(destinations.map((d) => [d.slug, d]));

  const grouped = new Map<string, PlaceRow[]>();
  for (const p of places) {
    if (!p.destination) continue;
    const arr = grouped.get(p.destination) || [];
    arr.push(p);
    grouped.set(p.destination, arr);
  }

  const clusters: ClusterReport[] = Array.from(grouped.entries())
    .map(([slug, items]) => {
      const dest = destBySlug.get(slug);
      const title = dest?.title || displayFromSlug(slug);
      const place_count = items.length;
      const hub_ready = place_count >= HUB_READY_THRESHOLD;
      const is_curated_hub = CURATED_HUB_SLUGS.has(slug);
      return {
        slug, title, place_count, hub_ready, is_curated_hub,
        sprint_candidate: hub_ready && !is_curated_hub,
        top_hero_candidate: topHeroCandidate(items),
        has_destination_row: Boolean(dest),
        destination_hero_image: dest?.hero_image ?? null,
        places: items
          .map((p) => ({
            slug: p.slug, title: p.title, featured: !!p.featured,
            sort_order: p.sort_order, has_hero: Boolean(p.hero_image),
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

  if (req.nextUrl.searchParams.get("format") === "json") {
    return NextResponse.json({ summary, destinations: clusters }, {
      headers: { "x-robots-tag": "noindex", "cache-control": "no-store" },
    });
  }

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

  const sprintCandidates = clusters.filter((c) => c.sprint_candidate);
  if (sprintCandidates.length > 0) {
    md.push("## Sprint candidates");
    md.push("");
    md.push(`Destinations with ≥${HUB_READY_THRESHOLD} published places that don't yet have a curated /[city] hub.`);
    md.push("");
    md.push(`| Destination | Slug | Places | Top hero candidate | Has destinations row |`);
    md.push(`|---|---|---|---|---|`);
    for (const c of sprintCandidates) {
      md.push(`| ${c.title} | \`${c.slug}\` | ${c.place_count} | \`${c.top_hero_candidate ?? "—"}\` | ${c.has_destination_row ? "yes" : "**no — missing**"} |`);
    }
    md.push("");
  }

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

  const belowThreshold = clusters.filter((c) => !c.hub_ready);
  if (belowThreshold.length > 0) {
    md.push(`## Below hub-ready threshold (<${HUB_READY_THRESHOLD} places)`);
    md.push("");
    md.push(`| Destination | Slug | Places |`);
    md.push(`|---|---|---|`);
    for (const c of belowThreshold) {
      md.push(`| ${c.title} | \`${c.slug}\` | ${c.place_count} |`);
    }
    md.push("");
  }

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

  return new NextResponse(md.join("\n"), {
    status: 200,
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex",
    },
  });
}
