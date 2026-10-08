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
      "The road into the High Atlas ends at Imlil, and no train or bus will carry you the last stretch. Here is the honest way up — and back down into the medina.",
    route: [
      { name: "Marrakech", note: "450 m", coords: [-7.9891, 31.6258] },
      { name: "Bab er Robb", note: "grand taxis", coords: [-7.9930, 31.6180] },
      { name: "Asni", note: "change", coords: [-7.9800, 31.2547] },
      { name: "Imlil", note: "1,740 m", coords: [-7.9196, 31.1362] },
    ],
    sections: [
      {
        kind: "lead",
        body:
          "Imlil sits sixty-five kilometres south of Marrakech and nearly thirteen hundred metres higher, at the mouth of the valley that climbs to Toubkal — at 4,167 metres, the highest peak in North Africa. No bus runs from the city into the mountains; the valley doesn't allow it. So the shape is always the same: you reach Marrakech, and from there a car or a grand taxi carries you the last stretch.",
      },
      {
        kind: "options",
        kicker: "Up to the mountains",
        heading: "From Marrakech to Imlil",
        intro:
          "The trains and the long-distance buses (Supratours, CTM) arrive in Guéliz, the newer part of the city. The grand taxis for the mountains leave from Bab er Robb, on the far side of the medina — so first you cross town, then you climb. Two ways to make it.",
        options: [
          {
            num: 1,
            title: "Hire a car straight up",
            tag: "No changes",
            body:
              "The calm option with luggage: a private car, or a chartered grand taxi, straight to Imlil with no stops — about an hour and a half. Many guesthouses in Imlil will send a driver to meet your arrival if you ask the night before; otherwise you can arrange one at the Bab er Robb rank.",
            cost: "Roughly 400–700 dh for the car — a flat price for the vehicle, not per person.",
          },
          {
            num: 2,
            title: "The shared grand taxi",
            tag: "The local road",
            body:
              "Cheaper, slower, more of an adventure — old cream Mercedes that leave when their six seats are full. Three small moves.",
            steps: [
              {
                title: "Petit taxi to Bab er Robb",
                body:
                  "From wherever you arrive, a small city taxi across to the grand-taxi rank at Bab er Robb, by Sidi Mimoun — about ten minutes, 20–30 dh. City taxis can't leave Marrakech, so this is as far as one takes you.",
              },
              {
                title: "Grand taxi to Asni",
                body:
                  "Share a grand taxi up to Asni, the market town at the foot of the range. Around 45 minutes; roughly 35–50 dh a seat. Agree the fare before you sit down.",
              },
              {
                title: "Change at Asni for Imlil",
                body:
                  "At Asni, change to a second grand taxi for the last climb up the Mizane valley. Around 45 minutes; roughly 30 dh a seat. A few direct Marrakech–Imlil taxis exist, but Asni is the dependable connection.",
              },
            ],
          },
        ],
      },
      {
        kind: "prose",
        kicker: "Back down",
        heading: "Imlil to the medina",
        body:
          "Coming down, the grand taxis run the same road in reverse and set you back at Bab er Robb, by Sidi Mimoun. Travel in the morning — they thin out as the day wears on. If you're staying inside the medina, most riads are a ten-to-fifteen-minute walk from there, past the horse-carriage stand and on into the lanes. One warning worth more than any map: Google Maps is unreliable in the medina and will often point you to the wrong door. Follow your riad's own directions, or call ahead and let them steer you in.",
      },
      {
        kind: "notes",
        kicker: "Good to know",
        heading: "Small things that help",
        notes: [
          { bold: "Saturday is Asni's souk day.", rest: "Taxis to Asni run thick and fast — but the market town itself will be gloriously, happily busy." },
          { bold: "Grands taxis fill to six before they leave.", rest: "In a hurry, you can pay for the empty seats and go now, or charter the whole car for your own price." },
          { bold: "You climb from about 450 m to 1,740 m.", rest: "Ears pop on the way up; bring a layer, the mountain air is cooler than the city's." },
          { bold: "Imlil is the trailhead for Toubkal.", rest: "From the village square, the mules and the mountain begin." },
        ],
      },
      {
        kind: "closing",
        body:
          "The tarmac ends at Imlil. The footpaths to Toubkal start at the village square.",
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
