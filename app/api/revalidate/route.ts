import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

/* ═══════════════════════════════════════════════════════════════
   ON-DEMAND REVALIDATION

   Two ways in:

   1. Supabase Database Webhook (automatic)
      POST with header  x-revalidate-secret: <REVALIDATE_SECRET>
      Body is Supabase's standard webhook payload:
        { type, table, schema, record, old_record }

   2. Manual bust (by hand, from a browser or curl)
      GET /api/revalidate?secret=<REVALIDATE_SECRET>&path=/places/diabat-ruins
      GET /api/revalidate?secret=<...>&all=1        ← nukes every cached page

   Requires env var REVALIDATE_SECRET on Vercel (all environments).
   ═══════════════════════════════════════════════════════════════ */

function authorized(req: NextRequest): boolean {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) return false;
  const header = req.headers.get("x-revalidate-secret");
  const query = req.nextUrl.searchParams.get("secret");
  return header === expected || query === expected;
}

type Row = Record<string, any> | null | undefined;

/**
 * Given a table and the changed row, return every path whose cached HTML
 * is now stale. Order doesn't matter; duplicates are de-duped by the caller.
 */
function pathsFor(table: string, record: Row, oldRecord: Row): string[] {
  const r = record || oldRecord || {};
  const prev = oldRecord || {};
  const slug: string | undefined = r.slug || prev.slug;
  const paths: string[] = ["/sitemap.xml"];

  switch (table) {
    case "places": {
      if (slug) paths.push(`/places/${slug}`, `/api/places/${slug}`);
      // A slug rename leaves the old path cached too.
      if (prev.slug && prev.slug !== slug) paths.push(`/places/${prev.slug}`);
      paths.push("/places", "/places/map", "/api/places", "/");
      // Destination hub pages (/marrakech, /essaouira …), old and new.
      for (const d of [r.destination, prev.destination]) {
        if (d) paths.push(`/${d}`);
      }
      paths.push("/destinations", "/collections");
      break;
    }

    case "place_images": {
      const ps = r.place_slug || prev.place_slug;
      if (ps) paths.push(`/places/${ps}`, `/api/places/${ps}`);
      paths.push("/places");
      break;
    }

    case "stories": {
      if (slug) paths.push(`/stories/${slug}`, `/api/stories/${slug}`);
      if (prev.slug && prev.slug !== slug) paths.push(`/stories/${prev.slug}`);
      paths.push("/stories", "/api/stories", "/");
      for (const c of [r.category, prev.category]) {
        if (c) paths.push(`/stories/category/${String(c).toLowerCase()}`);
      }
      paths.push("/collections");
      break;
    }

    case "story_images": {
      const ss = r.story_slug || prev.story_slug;
      if (ss) paths.push(`/stories/${ss}`);
      break;
    }

    case "journeys": {
      if (slug) paths.push(`/journeys/${slug}`);
      if (prev.slug && prev.slug !== slug) paths.push(`/journeys/${prev.slug}`);
      paths.push("/journeys", "/about/journeys", "/");
      break;
    }

    case "routes": {
      // Routes are embedded in journey pages; cheapest correct answer is the
      // whole journeys tree.
      paths.push("/journeys", "/about/journeys");
      break;
    }

    case "day_trips":
    case "day_trip_addons": {
      if (slug) paths.push(`/day-trips/${slug}`, `/api/day-trips/${slug}`);
      paths.push("/day-trips", "/api/day-trips");
      break;
    }

    case "destinations": {
      if (slug) paths.push(`/${slug}`);
      paths.push("/destinations", "/api/destinations", "/places", "/");
      break;
    }

    case "regions": {
      if (slug) paths.push(`/regions/${slug}`);
      paths.push("/regions", "/api/regions");
      break;
    }

    case "gentle_journeys":
    case "gentle_settings": {
      paths.push("/go/gentle", "/api/gentle-journeys");
      break;
    }

    case "testimonials": {
      paths.push("/", "/api/testimonials", "/about");
      break;
    }

    case "website_guides": {
      paths.push("/api/guides", "/");
      break;
    }

    case "page_banners": {
      const ps = r.page_slug || prev.page_slug;
      if (ps) paths.push(`/${ps}`);
      paths.push("/api/page-banners", "/");
      break;
    }

    // Anything that renders inside the shared shell touches every page.
    case "website_settings":
    case "footer_links":
    case "website_team":
      return ["__ALL__"];

    default:
      // Unmapped table — safest is a full sweep rather than a silent miss.
      return ["__ALL__"];
  }

  return paths;
}

function revalidateAll(): void {
  // Invalidates the root layout, which cascades to every page beneath it.
  revalidatePath("/", "layout");
}

async function handle(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const params = req.nextUrl.searchParams;

  // --- Manual bust -------------------------------------------------------
  if (params.get("all") === "1") {
    revalidateAll();
    return NextResponse.json({ ok: true, revalidated: "all", ts: Date.now() });
  }

  const manualPath = params.get("path");
  if (manualPath) {
    revalidatePath(manualPath);
    return NextResponse.json({ ok: true, revalidated: [manualPath], ts: Date.now() });
  }

  const manualTable = params.get("table");
  const manualSlug = params.get("slug");
  if (manualTable) {
    const paths = Array.from(new Set(pathsFor(manualTable, { slug: manualSlug }, null)));
    if (paths[0] === "__ALL__") {
      revalidateAll();
      return NextResponse.json({ ok: true, revalidated: "all", ts: Date.now() });
    }
    paths.forEach((p) => revalidatePath(p));
    return NextResponse.json({ ok: true, revalidated: paths, ts: Date.now() });
  }

  // --- Supabase webhook --------------------------------------------------
  let body: any = null;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "no path, table, or webhook body supplied" },
      { status: 400 }
    );
  }

  const table: string | undefined = body?.table;
  if (!table) {
    return NextResponse.json({ ok: false, error: "missing table in payload" }, { status: 400 });
  }

  const paths = Array.from(new Set(pathsFor(table, body?.record, body?.old_record)));

  if (paths[0] === "__ALL__") {
    revalidateAll();
    return NextResponse.json({ ok: true, table, revalidated: "all", ts: Date.now() });
  }

  paths.forEach((p) => {
    try {
      revalidatePath(p);
    } catch {
      // One bad path shouldn't abort the rest.
    }
  });

  return NextResponse.json({
    ok: true,
    table,
    type: body?.type ?? null,
    revalidated: paths,
    ts: Date.now(),
  });
}

export async function POST(req: NextRequest) {
  return handle(req);
}

export async function GET(req: NextRequest) {
  return handle(req);
}
