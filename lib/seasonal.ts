/* ═══════════════════════════════════════════════════════════════
   SEASONAL — what is true in Morocco this month.

   The site opens differently in March than in September. Not
   decoratively: the stories that lead are the ones that are
   actually happening. Roses in April, saffron in November, the
   desert reopening in October.

   No new images and no new writing. This reorders what exists.

   The month lines are editorial and belong here rather than in a
   database, because they are prose and they will be rewritten.
   ═══════════════════════════════════════════════════════════════ */

import { TZ } from "@/lib/moroccan-calendar";

export interface Season {
  month: number;
  /** One sentence for the top of the homepage. Present tense. */
  line: string;
  /** Story slugs that are about this month specifically. Ordered. */
  slugs: string[];
  /** Fallback keywords, used when the slugs above are thin. */
  keywords: string[];
}

export const SEASONS: Season[] = [
  { month: 1, line: "January. The olives are still pressing, the Atlas passes are shut, and Jbel Saghro is the only range you can walk.",
    slugs: ["olive-oil-economy", "beyond-toubkal", "yennayer-amazigh-new-year", "the-hammada"],
    keywords: ["olive", "snow", "winter", "Yennayer"] },

  { month: 2, line: "February. Almond blossom across the Anti-Atlas, and the south is at its best before anyone arrives.",
    slugs: ["beyond-toubkal", "the-man-who-painted-the-boulders", "argan-triangle", "the-three-deserts"],
    keywords: ["almond", "blossom", "Anti-Atlas", "Tafraout"] },

  { month: 3, line: "March. The Atlas is green, the desert is still cool, and the almond is finishing.",
    slugs: ["the-transhumance", "the-three-deserts", "beyond-toubkal", "the-nomads-calendar"],
    keywords: ["spring", "green", "almond", "migration"] },

  { month: 4, line: "April. The roses come in at Kelaat M'Gouna, and the whole valley smells of them for three weeks.",
    slugs: ["the-rose-valley", "moroccan-perfume-traditions", "the-transhumance", "the-oasis-engineers"],
    keywords: ["rose", "Dades", "distillation", "spring"] },

  { month: 5, line: "May. The roses finish, the flocks go up to the high pasture, and the cherries start in the Middle Atlas.",
    slugs: ["the-transhumance", "the-rose-valley", "the-cedar-forest", "the-nomads-calendar"],
    keywords: ["transhumance", "pasture", "rose", "cherry"] },

  { month: 6, line: "June. The wheat comes in, the coast is the only bearable place, and the sun stands at 82 degrees at noon.",
    slugs: ["bread-of-morocco", "the-blue-boats", "calendar-of-light", "surf-coast-morocco"],
    keywords: ["wheat", "harvest", "coast", "sun"] },

  { month: 7, line: "July. Figs, melons, and forty degrees inland. The Atlantic is twenty degrees cooler than Marrakech.",
    slugs: ["weather-portraits-morocco", "atlantic-coast-morocco", "the-blue-boats", "seasonal-produce-wheel"],
    keywords: ["fig", "heat", "Atlantic", "Essaouira"] },

  { month: 8, line: "August. Figs and grapes, the moussem season, and the high pastures still full.",
    slugs: ["the-festival-calendar", "the-transhumance", "seasonal-produce-wheel", "atlantic-coast-morocco"],
    keywords: ["moussem", "fig", "grape", "festival"] },

  { month: 9, line: "September. The grapes are in, the first dates are cut, and the desert becomes bearable again.",
    slugs: ["date-palm-oases", "the-three-deserts", "seasonal-produce-wheel", "the-oasis-engineers"],
    keywords: ["date", "grape", "pomegranate", "desert"] },

  { month: 10, line: "October. Dates in the Draa and the Tafilalet, saffron starting at Taliouine, and the flocks coming down.",
    slugs: ["date-palm-oases", "the-saffron-harvest", "the-transhumance", "the-three-deserts"],
    keywords: ["date", "saffron", "harvest", "Draa"] },

  { month: 11, line: "November. Saffron for three weeks at Taliouine, and the first olives go to the press.",
    slugs: ["the-saffron-harvest", "olive-oil-economy", "moroccan-spice-guide", "seasonal-produce-wheel"],
    keywords: ["saffron", "olive", "Taliouine", "pressing"] },

  { month: 12, line: "December. Olives, citrus, and the shortest day — when the sun reaches only 35 degrees over Marrakech.",
    slugs: ["olive-oil-economy", "calendar-of-light", "the-hammada", "beyond-toubkal"],
    keywords: ["olive", "citrus", "winter", "solstice"] },
];

/** The current month in Morocco, wherever the reader is. */
export function moroccanMonth(d: Date = new Date()): number {
  return Number(
    new Intl.DateTimeFormat("en-US", { timeZone: TZ, month: "numeric" }).format(d),
  );
}

export function seasonNow(d: Date = new Date()): Season {
  const m = moroccanMonth(d);
  return SEASONS.find((s) => s.month === m) ?? SEASONS[8];
}

/**
 * Order a set of stories so the seasonal ones lead. Anything named
 * in the month's slug list comes first, in that order; anything
 * matching a keyword follows; the rest keep their existing order.
 *
 * Nothing is hidden. This is a reordering, not a filter.
 */
export function bySeason<T extends { slug: string; title?: string; excerpt?: string | null }>(
  stories: T[],
  d: Date = new Date(),
): T[] {
  const season = seasonNow(d);
  const rank = new Map<string, number>(season.slugs.map((s, i): [string, number] => [s, i]));
  const kw = season.keywords.map((k) => k.toLowerCase());

  const score = (s: T): number => {
    const named = rank.get(s.slug);
    if (named !== undefined) return named;                 // 0..n, best
    const hay = `${s.title ?? ""} ${s.excerpt ?? ""}`.toLowerCase();
    if (kw.some((k) => hay.includes(k))) return 100;        // keyword match
    return 1000;                                           // everything else
  };

  return [...stories].sort((a, b) => score(a) - score(b));
}

/** Just the seasonal ones, for a dedicated strip. Never more than four. */
export function seasonalPicks<T extends { slug: string }>(
  stories: T[],
  d: Date = new Date(),
): T[] {
  const season = seasonNow(d);
  const found = season.slugs
    .map((slug) => stories.find((s) => s.slug === slug))
    .filter((s): s is T => Boolean(s));
  return found.slice(0, 4);
}
