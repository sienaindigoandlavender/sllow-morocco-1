import { NextRequest, NextResponse } from "next/server";

/**
 * Google Indexing API Integration
 * 
 * Submits URLs to Google for fast indexing/recrawling.
 * Quota: 200 URL notifications per day.
 * 
 * Setup required:
 * 1. Create a Google Cloud project
 * 2. Enable the "Web Search Indexing API"
 * 3. Create a Service Account and download the JSON key
 * 4. Add the service account email as a Site Owner in GSC
 *    (Settings → Users and permissions → Add user → Owner)
 * 5. Set env vars:
 *    GOOGLE_INDEXING_CLIENT_EMAIL=...@...iam.gserviceaccount.com
 *    GOOGLE_INDEXING_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
 *    GOOGLE_INDEX_SECRET=<any-secret-for-auth>
 * 
 * Usage:
 *   GET  /api/google-index          → list all URLs that would be submitted
 *   POST /api/google-index          → submit all URLs (UPDATE_URL type)
 *   POST /api/google-index          → with body { urls: [...] } for specific URLs
 *   POST /api/google-index          → with body { type: "URL_DELETED" } for removal
 */

const BASE_URL = "https://www.slowmorocco.com";
const GOOGLE_INDEXING_ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish";
const GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";

// All redirect source paths that should be re-crawled so Google discovers the 301
const REDIRECT_PATHS = [
  // Place redirects
  "/marrakech", "/casablanca", "/essaouira", "/tangier", "/tangier-2",
  "/rabat", "/chefchaouen", "/fes-meknes", "/agadir", "/dakhla",
  "/oualidia", "/el-jadida", "/asilah", "/tiznit", "/taroudant",
  "/tafraoute", "/tata", "/taliouine", "/amizmiz", "/ouirgane",
  "/ourika-valley", "/agafay", "/al-hoceima", "/ergoud-merzouga",
  "/dades-valley-todra-gorge", "/zagora-the-draa-valley",
  "/tamegroute-tamnougalt", "/ouarzazate-skoura-details",
  "/mhamid-erg-chegaga", "/marrakech-beyond", "/marrakech-to-erg-chigaga",
  // Journey redirects (with duration)
  "/3-day-fes-to-merzouga", "/3-day-fes-to-marrakech-via-merzouga",
  "/3-day-marrakech-to-merzouga", "/3-day-marrakech-to-the-sahara",
  "/3-day-the-ounila-valley", "/3-day-atlas-valleys-escape-three-days-in-the-high-silence",
  "/5-day-agadir-to-erg-chigaga", "/5-day-tbourida-by-the-sea-riders-and-the-ocean-wind",
  "/5-day-the-imilchil-weddings-a-festival-of-promise",
  "/6-day-the-romans-in-morocco-stones-of-empire",
  "/7-day-atlas-to-desert-journey-seven-days-between-stone-and-sand",
  "/7-day-northern-morocco-journey-seven-days-of-white-and-blue",
  "/7-day-the-amazigh-weavers-road-the-language-of-wool",
  "/7-day-the-hidden-oases-six-days-of-palm-shade-and-clay",
  "/7-day-the-spice-road-table-of-morocco",
  "/7-day-traditional-medicine-healing-arts",
  "/8-day-mythic-morocco-at-the-edge-of-the-known-world",
  "/8-day-the-coastal-line-sea-and-song",
  "/8-day-the-desert-circle-eight-days-of-earth-and-echo",
  "/8-day-the-northern-line-exile-and-light",
  "/8-day-the-roads-of-transhumance-following-the-shepherds-path",
  "/8-day-the-writers-morocco-voices-in-the-light",
  "/9-day-the-atlas-sanctuaries", "/9-day-the-southern-remnants",
  "/10-day-andalusian-crossroads-ten-days-between-cities-and-silence",
  "/10-day-the-rock-art-roads",
  "/10-day-the-southern-oases-caravan-route-ten-days-of-earth-and-memory",
  "/10-day-the-sufi-roads", "/12-day-eastern-morocco",
  "/12-day-the-sacred-architecture-of-light",
  "/12-day-the-southern-loop-from-dunes-to-the-sea",
  "/13-day-the-saharan-frontier-twelve-days-of-wind-and-distance",
  "/15-day-the-atlantic-descent-casablanca-to-dakhla",
  "/15-day-the-compass-of-morocco", "/15-day-the-slow-journey-across-morocco",
  // Journey redirects (without duration)
  "/the-amazigh-weavers-road-the-language-of-wool",
  "/the-anti-atlas-journey-seven-days-of-stone-and-silence",
  "/the-atlantic-descent-casablanca-to-dakhla",
  "/the-atlas-sanctuaries",
  "/the-birds-and-the-wind-moroccos-migration-path",
  "/the-birds-and-the-wind-moroccos-migration-path-1",
  "/the-birds-and-the-wind-moroccos-migration-path-2",
  "/the-birds-and-the-wind-moroccos-migration-path-3",
  "/the-birds-and-the-wind-moroccos-migration-path-4",
  "/the-hidden-oases-six-days-of-palm-shade-and-clay",
  "/the-painters-morocco-light-color-and-solitude",
  "/the-roads-of-transhumance-following-the-shepherds-path",
  "/the-rock-art-roads", "/the-romans-in-morocco-stones-of-empire",
  "/the-saharan-frontier-twelve-days-of-wind-and-distance",
  "/the-slow-journey-across-morocco",
  "/the-southern-loop-from-dunes-to-the-sea-1",
  "/the-southern-oases-caravan-route-ten-days-of-earth-and-memory",
  "/the-southern-remnants", "/the-spice-road-table-of-morocco",
  "/the-sufi-roads", "/the-writers-morocco-voices-in-the-light",
  "/tbourida-by-the-sea-riders-and-the-ocean-wind",
  "/atlantic-road-journey-seven-days-by-the-ocean",
  "/atlas-to-desert-journey-seven-days-between-stone-and-sand",
  "/andalusian-crossroads-ten-days-between-cities-and-silence",
  "/northern-morocco-journey-seven-days-of-white-and-blue",
  "/northern-highlands-journey-seven-days-of-green-silence",
  "/day-trip-from-marrakech-at-benhaddou-and-the-road-of-kasbahs",
  // Sahara treks
  "/sahara-trek-1-marrakech-to-merzouga-3-days-/-return-to-marrakech",
  "/sahara-trek-2-marrakech-to-erg-chigaga-and-back",
  "/sahara-trek-3-marrakech-to-fs-via-merzouga",
  "/sahara-trek-5-fs-to-marrakech-via-merzouga",
  "/sahara-trek-6-agadir-to-erg-chigaga-and-back",
  "/sahara-trek-7-agadir-to-erg-chigaga-and-back",
  "/sahara-trek-7-agadir-to-erg-chigaga-and-back-1",
  // Region/category → journeys
  "/anti-atlas", "/high-atlas", "/middle-atlas", "/atlas-sahara",
  "/the-sahara-desert", "/the-atlas-mountains",
  "/the-atlas-the-mountains-of-morocco", "/north-coast",
  "/imperial-cities-middle-atlas", "/regions", "/special-interests",
  "/epic-journeys", "/across-morocco-journeys", "/across-morocco-2",
  "/journeys-1", "/the-classic-routes-description",
  "/the-elemental-circuits-description", "/the-hidden-morocco-description",
  "/the-sacred-roads-description",
  // Static page redirects
  "/home", "/about-us", "/about-us-main", "/about-2",
  "/our-approach", "/our-approach-main", "/our-approach-footer",
  "/our-ethos", "/our-philosophy", "/our-mission", "/our-mission-main",
  "/founders-note", "/founders-note-main", "/sustainability-and-community",
  "/privacy-policy", "/privacy-policy-1", "/terms-of-service",
  "/booking-conditions", "/refund-policy", "/code-of-conduct", "/faqs-2",
  "/payment", "/appointments", "/travel-gently", "/places-1", "/es", "/es/",
  // Journal → stories
  "/journal", "/media",
  // Squarespace junk
  "/journal/blog-post-title-one-ej23z", "/journal/blog-post-title-two-5makw",
  "/journal/blog-post-title-two-lkww3", "/journal/blog-post-title-three-rnsp4",
  "/journal/blog-post-title-three-agzsl", "/journal/blog-post-title-four-tm7fb",
  "/journal/blog-post-title-four-a4aaz",
  // Misc
  "/ait-bahamou", "/agadirs-of-the-anti-atlas-the-berber-banks",
  "/atlantic-coast-escape-5-days-of-sea-and-silence",
  "/atlantic-south-anti-atlas",
  "/atlas-valleys-escape-three-days-in-the-high-silence",
  "/mythic-morocco-at-the-edge-of-the-known-world",
  "/rif-mountains", "/sahara-southern-morocco", "/the-anti-atlas-arc",
  "/the-atlantic-coastal-morocco", "/the-atlantic-coastal-morocco-1",
  "/the-cities-of-morocco", "/the-coastal-line-sea-and-song",
  "/the-desert-circle-eight-days-of-earth-and-echo",
  "/the-northern-line-exile-and-light",
  "/the-sacred-architecture-of-light",
  "/the-sky-and-the-sand-in-the-footsteps-of-saint-exupry",
  "/the-table-the-vine-i-from-the-mountains-to-the-sea",
  "/the-table-the-vine-ii-the-northern-cellars",
  "/traditional-medicine-healing-arts",
  "/wild-morocco-from-forests-to-the-atlantic",
  // GSC Feb 2026 fixes
  "/cities", "/the-atlantic-ocean", "/the-atlantic-ocean-1", "/the-sahara",
  "/the-slow-way-2", "/accessibility-comfort", "/accessibility-commitment",
  "/behind-the-scenes", "/coastal-havens", "/contact-us", "/destinations",
  "/getting-started", "/guest-experiences", "/our-commitment",
  "/payments-refunds", "/travel-notes", "/traveling-with-a-companion",
  "/what-we-do", "/who-we-are",
];

// Static pages on the live site
const STATIC_PAGES = [
  "", "/journeys", "/stories", "/places", "/about", "/plan-your-trip",
  "/manifesto", "/faq", "/contact", "/whats-included", "/visa-info",
  "/day-trips", "/guides", "/epic", "/glossary",
  "/overnight/agafay-desert", "/go/gentle",
  "/health-safety", "/travel-insurance", "/cancellation-policy",
  "/terms", "/privacy", "/disclaimer", "/intellectual-property",
];

/**
 * Create a JWT and exchange it for a Google OAuth2 access token
 */
async function getAccessToken(): Promise<string> {
  const clientEmail = process.env.GOOGLE_INDEXING_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_INDEXING_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error("Missing GOOGLE_INDEXING_CLIENT_EMAIL or GOOGLE_INDEXING_PRIVATE_KEY");
  }

  // Build JWT header + payload
  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/indexing",
    aud: GOOGLE_TOKEN_ENDPOINT,
    iat: now,
    exp: now + 3600,
  };

  const encode = (obj: object) =>
    Buffer.from(JSON.stringify(obj)).toString("base64url");

  const unsignedToken = `${encode(header)}.${encode(payload)}`;

  // Sign with RS256
  const crypto = await import("crypto");
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(unsignedToken);
  const signature = sign.sign(privateKey, "base64url");

  const jwt = `${unsignedToken}.${signature}`;

  // Exchange JWT for access token
  const tokenRes = await fetch(GOOGLE_TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    throw new Error(`Token exchange failed: ${err}`);
  }

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}

/**
 * Submit a single URL to the Google Indexing API
 */
async function submitUrl(
  accessToken: string,
  url: string,
  type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED"
): Promise<{ url: string; success: boolean; status?: number; error?: string }> {
  try {
    const res = await fetch(GOOGLE_INDEXING_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ url, type }),
    });

    if (res.ok) {
      return { url, success: true, status: res.status };
    }

    // 429 = quota exceeded
    const errText = await res.text();
    return { url, success: false, status: res.status, error: errText };
  } catch (e) {
    return {
      url,
      success: false,
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
}

/**
 * Fetch dynamic URLs from the site's own APIs
 */
async function getDynamicUrls(): Promise<string[]> {
  const urls: string[] = [];

  const endpoints = [
    { path: "/api/journeys", key: "journeys", prefix: "/journeys" },
    { path: "/api/stories", key: "stories", prefix: "/story" },
    { path: "/api/places", key: "places", prefix: "/places" },
    { path: "/api/day-trips", key: "dayTrips", prefix: "/day-trips" },
  ];

  for (const ep of endpoints) {
    try {
      const res = await fetch(`${BASE_URL}${ep.path}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        const items = data[ep.key] || [];
        items.forEach((item: { slug?: string }) => {
          if (item.slug) {
            urls.push(`${BASE_URL}${ep.prefix}/${item.slug}`);
          }
        });
      }
    } catch (e) {
      console.error(`Failed to fetch ${ep.path}:`, e);
    }
  }

  return urls;
}

// ─── GET: Preview URLs ────────────────────────────────────────────────
export async function GET() {
  const staticUrls = STATIC_PAGES.map((p) => `${BASE_URL}${p}`);
  const redirectUrls = REDIRECT_PATHS.map((p) => `${BASE_URL}${p}`);

  let dynamicUrls: string[] = [];
  try {
    dynamicUrls = await getDynamicUrls();
  } catch (e) {
    console.error("Failed to fetch dynamic URLs:", e);
  }

  const allLiveUrls = [...staticUrls, ...dynamicUrls];
  const allRedirectUrls = redirectUrls;

  return NextResponse.json({
    status: "ready",
    note: "POST to submit. Use ?mode=live (real pages), ?mode=redirects (old 404s), or ?mode=all (both). Default: live.",
    quota: "200 URL notifications per day",
    counts: {
      live: allLiveUrls.length,
      redirects: allRedirectUrls.length,
      total: allLiveUrls.length + allRedirectUrls.length,
    },
    liveUrls: allLiveUrls,
    redirectUrls: allRedirectUrls,
  });
}

// ─── POST: Submit to Google Indexing API ──────────────────────────────
export async function POST(request: NextRequest) {
  // Auth check
  const authHeader = request.headers.get("authorization");
  const expectedToken = process.env.GOOGLE_INDEX_SECRET;

  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Determine mode
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("mode") || "live";
  const limit = parseInt(searchParams.get("limit") || "200", 10);

  // Check for custom URL list in body
  let body: { urls?: string[]; type?: string } = {};
  try {
    body = await request.json().catch(() => ({}));
  } catch {
    body = {};
  }

  const notificationType: "URL_UPDATED" | "URL_DELETED" =
    body.type === "URL_DELETED" ? "URL_DELETED" : "URL_UPDATED";

  let urlsToSubmit: string[];

  if (body.urls && Array.isArray(body.urls) && body.urls.length > 0) {
    urlsToSubmit = body.urls;
  } else {
    const staticUrls = STATIC_PAGES.map((p) => `${BASE_URL}${p}`);
    const redirectUrls = REDIRECT_PATHS.map((p) => `${BASE_URL}${p}`);

    let dynamicUrls: string[] = [];
    try {
      dynamicUrls = await getDynamicUrls();
    } catch (e) {
      console.error("Failed to fetch dynamic URLs:", e);
    }

    switch (mode) {
      case "redirects":
        urlsToSubmit = redirectUrls;
        break;
      case "all":
        urlsToSubmit = [...staticUrls, ...dynamicUrls, ...redirectUrls];
        break;
      case "live":
      default:
        urlsToSubmit = [...staticUrls, ...dynamicUrls];
        break;
    }
  }

  // Respect daily quota
  const cappedUrls = urlsToSubmit.slice(0, Math.min(limit, 200));

  // Get access token
  let accessToken: string;
  try {
    accessToken = await getAccessToken();
  } catch (e) {
    return NextResponse.json(
      {
        error: "Failed to authenticate with Google",
        detail: e instanceof Error ? e.message : String(e),
        setup: {
          step1: "Create Google Cloud project + enable Web Search Indexing API",
          step2: "Create Service Account, download JSON key",
          step3: "Add service account email as Owner in GSC",
          step4: "Set GOOGLE_INDEXING_CLIENT_EMAIL and GOOGLE_INDEXING_PRIVATE_KEY env vars",
        },
      },
      { status: 500 }
    );
  }

  // Submit URLs with small delay to avoid rate limiting
  const results: Awaited<ReturnType<typeof submitUrl>>[] = [];
  let successCount = 0;
  let failCount = 0;
  let quotaExceeded = false;

  for (const url of cappedUrls) {
    if (quotaExceeded) break;

    const result = await submitUrl(accessToken, url, notificationType);
    results.push(result);

    if (result.success) {
      successCount++;
    } else {
      failCount++;
      if (result.status === 429) {
        quotaExceeded = true;
      }
    }

    // Small delay between requests (50ms)
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  return NextResponse.json({
    success: !quotaExceeded,
    mode,
    type: notificationType,
    submitted: successCount,
    failed: failCount,
    quotaExceeded,
    totalAvailable: urlsToSubmit.length,
    capped: cappedUrls.length,
    remaining: urlsToSubmit.length - cappedUrls.length,
    results: results.slice(0, 20), // Show first 20 for brevity
    tip: quotaExceeded
      ? "Daily quota reached. Try again tomorrow."
      : cappedUrls.length < urlsToSubmit.length
      ? `${urlsToSubmit.length - cappedUrls.length} URLs remaining. Run again tomorrow with ?mode=${mode}&limit=200`
      : "All URLs submitted!",
  });
}
