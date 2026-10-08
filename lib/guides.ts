// ─────────────────────────────────────────────────────────────
// Private "Getting there" guides.
//
// These are guest-facing logistics pages that live on the site (so a guest
// lands in the real Slow Morocco chrome and can wander into the other content)
// but are kept OUT of search and the AI crawlers — see noindex in the route.
//
// To add a destination: add one entry to GUIDES below. No new component, no
// new route. The page appears at /guides/<slug>.
// ─────────────────────────────────────────────────────────────

export interface GuideStep {
  title: string;
  body: string;
}

// Stops along the route map. coords are [lng, lat] for the interactive map.
export interface RouteStop {
  name: string;
  note?: string;
  coords?: [number, number];
}

export interface GuideOption {
  num: number;
  title: string;
  tag?: string;
  body: string;
  cost?: string;
  steps?: GuideStep[];
}

export type GuideSection =
  | { kind: "lead"; body: string }
  | { kind: "options"; kicker: string; heading: string; intro?: string; options: GuideOption[] }
  | { kind: "steps"; kicker: string; heading: string; intro?: string; steps: GuideStep[] }
  | { kind: "prose"; kicker: string; heading: string; body: string }
  | { kind: "notes"; kicker: string; heading: string; notes: { bold: string; rest: string }[] }
  | { kind: "closing"; body: string };

export interface Guide {
  slug: string;
  title: string;
  metaDescription: string;
  kicker: string;
  standfirst: string;
  route?: RouteStop[];
  sections: GuideSection[];
}

export const GUIDES: Guide[] = [
  {
    slug: "marrakech-to-imlil",
    title: "Marrakech to Imlil",
    metaDescription:
      "The way from Marrakech to Imlil in the High Atlas — grand taxi via Asni, or a private car.",
    kicker: "Getting there · The High Atlas",
    standfirst:
      "The grand taxis to Imlil leave from Bab er Robb. Here is how to reach them from the station, and how to find the riad.",
    route: [
      { name: "Gare Guéliz", note: "arrival", coords: [-8.0206, 31.6307] },
      { name: "Bab er Robb", note: "grand taxis to Imlil", coords: [-7.9930, 31.6180] },
      { name: "Riad di Siena", note: "via Café Medina Rouge", coords: [-7.9903, 31.6267] },
    ],
    sections: [
      {
        kind: "steps",
        kicker: "Getting to the taxis",
        heading: "Station to Bab er Robb",
        steps: [
          {
            title: "Petit taxi across town",
            body: "From the Guéliz station, take a petit taxi to Bab er Robb, by Sidi Mimoun — between Hotel Tazi and the road to the Kasbah neighbourhood. About 10 minutes, 20–30 dh.",
          },
          {
            title: "Grand taxi to Imlil",
            body: "The shared taxis for Imlil leave from Bab er Robb. Take a seat, or the whole car.",
          },
        ],
      },
      {
        kind: "steps",
        kicker: "Getting to the riad",
        heading: "Bab er Robb to Riad di Siena",
        steps: [
          { title: "Drops you at Bab er Robb", body: "By Sidi Mimoun, between Hotel Tazi and the road to the Kasbah neighbourhood." },
          { title: "Walk to Café Medina Rouge", body: "10–15 minutes, past the horse-carriage stand." },
          { title: "Into the lanes to the riad", body: "Follow the directions we send you — not Google Maps. riaddisiena.com/directions" },
        ],
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function guideSlugs(): string[] {
  return GUIDES.map((g) => g.slug);
}
