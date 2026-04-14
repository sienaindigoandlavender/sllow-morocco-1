/**
 * Journey Consolidation Redirects
 * ================================
 *
 * 301 redirects for /journeys/:slug URLs that have been consolidated into
 * broader Pillar Category Pages (city guides at /[city], places at
 * /places/:slug, or stories at /stories/:slug).
 *
 * WHY: March 2026 pivot — the site ran 275 individual journeys. Too many were
 * thin, duplicative, or directly poached by competitors. The fix is to keep
 * the narrative at the Place/Story level and funnel the old itinerary URLs
 * there, so external links and GSC-indexed URLs still land somewhere
 * authoritative.
 *
 * HOW TO EXTEND: Add an entry below. `from` is the /journeys path. `to` is
 * the destination — prefer the geographical pillar when it exists, fall
 * back to a related story. If nothing specific fits, point to the broader
 * /journeys index (the last resort — try harder first).
 *
 * These merge into next.config.js redirects() and return HTTP 301 at the
 * edge, preserving SEO authority accumulated on the old URLs.
 *
 * Shape: { from, to, reason } where reason is one of
 *   "duplicate" | "thin" | "consolidated" | "poached"
 */

const JOURNEY_REDIRECTS = [
  // ─── Fes / Meknes pillar ────────────────────────────────────────────
  { from: "/journeys/fes-meknes-wine-3-days", to: "/fes", reason: "consolidated" },
  { from: "/journeys/fes-weekend", to: "/fes", reason: "thin" },
  { from: "/journeys/fes-meknes-volubilis", to: "/fes", reason: "consolidated" },
  { from: "/journeys/fes-spiritual-3-days", to: "/fes", reason: "consolidated" },
  { from: "/journeys/fes-craft-quarter", to: "/stories/fes-tanneries-guide", reason: "consolidated" },

  // ─── Marrakech pillar ───────────────────────────────────────────────
  { from: "/journeys/marrakech-weekend", to: "/marrakech", reason: "thin" },
  { from: "/journeys/marrakech-3-days", to: "/marrakech", reason: "thin" },
  { from: "/journeys/marrakech-long-weekend", to: "/marrakech", reason: "duplicate" },
  { from: "/journeys/marrakech-medina-immersion", to: "/stories/marrakech-medina-guide", reason: "consolidated" },
  { from: "/journeys/marrakech-gardens-day", to: "/marrakech", reason: "thin" },

  // ─── The South / Sahara pillar ──────────────────────────────────────
  { from: "/journeys/merzouga-weekend", to: "/merzouga", reason: "thin" },
  { from: "/journeys/draa-valley-short", to: "/draa-valley", reason: "thin" },
  { from: "/journeys/dades-todra-3-days", to: "/dades-valley", reason: "consolidated" },
  { from: "/journeys/ouarzazate-skoura", to: "/ouarzazate", reason: "consolidated" },
  { from: "/journeys/zagora-weekend", to: "/draa-valley", reason: "consolidated" },

  // ─── Atlantic / Coast pillar ────────────────────────────────────────
  { from: "/journeys/essaouira-weekend", to: "/essaouira", reason: "thin" },
  { from: "/journeys/casablanca-rabat-day", to: "/casablanca", reason: "thin" },
  { from: "/journeys/agadir-weekend", to: "/agadir", reason: "thin" },
  { from: "/journeys/dakhla-trip", to: "/dakhla", reason: "thin" },

  // ─── North / Rif pillar ─────────────────────────────────────────────
  { from: "/journeys/chefchaouen-weekend", to: "/chefchaouen", reason: "thin" },
  { from: "/journeys/tangier-weekend", to: "/tangier", reason: "thin" },
  { from: "/journeys/tangier-tetouan", to: "/tangier", reason: "consolidated" },

  // ─── Atlas / Imlil pillar ───────────────────────────────────────────
  { from: "/journeys/imlil-weekend", to: "/destinations", reason: "thin" },
  { from: "/journeys/toubkal-trek", to: "/destinations", reason: "thin" },

  // ─── Thematic routes absorbed into their anchor story ───────────────
  { from: "/journeys/romans-in-morocco-6-days", to: "/stories/edge-of-rome", reason: "poached" },
  { from: "/journeys/amazigh-identity-route", to: "/stories/amazigh-identity", reason: "consolidated" },
  { from: "/journeys/green-march-trail", to: "/stories/the-green-march", reason: "consolidated" },
  { from: "/journeys/jewish-morocco-route", to: "/jewish-heritage-morocco", reason: "consolidated" },
];

/**
 * Returns the redirect list in the shape Next.js `redirects()` expects.
 * Every entry is a permanent 301.
 */
function journeyRedirectsForNextConfig() {
  return JOURNEY_REDIRECTS.map((r) => ({
    source: r.from,
    destination: r.to,
    permanent: true,
  }));
}

module.exports = {
  JOURNEY_REDIRECTS,
  journeyRedirectsForNextConfig,
};
