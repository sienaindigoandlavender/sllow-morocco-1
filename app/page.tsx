import type { Metadata } from "next";
import { getJourneys, getStories, getPlaces, getWebsiteSettings, getTestimonials, getDestinations } from "@/lib/supabase";
import HomeContent from "./HomeContent";
import { bySeason, seasonNow } from "@/lib/seasonal";
import { SEASONAL_HOMEPAGE } from "@/lib/flags";

export const metadata: Metadata = {
  title: { absolute: "Slow Morocco | Morocco, Decoded" },
  description: "The mosque that pointed the wrong way. The alphabet that refused to die. The salt road that built an empire. Morocco has secrets. We decode them.",
  alternates: { canonical: "https://www.slowmorocco.com" },
  openGraph: {
    title: "Slow Morocco | Morocco, Decoded",
    description: "The mosque that pointed the wrong way. The alphabet that refused to die. The salt road that built an empire. Morocco has secrets. We decode them.",
    url: "https://www.slowmorocco.com",
  },
};

export const revalidate = 3600;

export default async function HomePage() {
  let journeys: any[] = [];
  let epicJourneys: any[] = [];
  let stories: any[] = [];
  let places: any[] = [];
  let mapPlaces: any[] = [];
  let testimonials: any[] = [];
  let heroItem: any = null;
  let destinations: any[] = [];
  let settings: Record<string, string> = {};

  try {
    const [journeysData, storiesData, placesData, settingsData, testimonialsData, destinationsData] = await Promise.all([
      getJourneys({ published: true }),
      getStories({ published: true }),
      getPlaces({ published: true }),
      getWebsiteSettings(),
      getTestimonials({ published: true }),
      getDestinations({ published: true }),
    ]);

    // Format journeys
    const allJourneys = journeysData.map((j) => ({
      slug: j.slug || "",
      title: j.title || "",
      duration: j.duration_days ? `${j.duration_days}-Day` : "",
      durationDays: j.duration_days || 0,
      description: j.short_description || "",
      heroImage: j.hero_image_url || "",
      price: j.price_eur || 0,
      destinations: j.destinations || "",
      journeyType: j.journey_type || "regular",
      epicPrice: j.epic_price_eur || undefined,
    }));

    journeys = allJourneys.filter(
      (j) =>
        j.journeyType !== "epic" &&
        j.journeyType !== "daytrip" &&
        j.journeyType !== "overnight"
    );
    epicJourneys = allJourneys.filter((j) => j.journeyType === "epic").slice(0, 5);

    // Format stories — rotate the lead (hero) story every 3 hours
    const allStories = storiesData
      .filter((s) => s.hero_image)
      .map((s) => ({
        slug: s.slug,
        title: s.title,
        subtitle: s.subtitle,
        excerpt: s.excerpt,
        heroImage: s.hero_image,
        mood: s.category,
        category: s.category,
        read_time: s.read_time,
      }));

    // Time-seeded shuffle: changes every 3 hours, same for all visitors in that window
    const THREE_HOURS = 3 * 60 * 60 * 1000;
    const timeBucket = Math.floor(Date.now() / THREE_HOURS);

    // Simple seeded shuffle — deterministic per time bucket
    const seededShuffle = <T,>(arr: T[], seed: number): T[] => {
      const shuffled = [...arr];
      let s = seed;
      for (let i = shuffled.length - 1; i > 0; i--) {
        s = (s * 1664525 + 1013904223) & 0xFFFFFFFF;
        const j = ((s >>> 0) % (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    /* Shuffle for variety on a three-hour bucket. With SEASONAL_HOMEPAGE
       on, the month then decides what leads — in April the rose valley
       first, in November saffron. Off, the shuffle stands on its own,
       which draws on the whole archive instead of four named slugs. */
    const shuffledStories = seededShuffle(allStories, timeBucket);
    stories = (SEASONAL_HOMEPAGE ? bySeason(shuffledStories) : shuffledStories).slice(0, 17);
    journeys = seededShuffle(journeys, timeBucket + 7).slice(0, 8);

    // ── Combined hero pool: rotate across journeys, places AND editorials ──
    // "Morocco, decoded" is the constant masthead; the featured item beneath it
    // rotates every 3 hours across all three content types, each linking to its
    // own page. Only items with a hero image qualify.
    type HeroItem = {
      kind: "journey" | "place" | "story";
      slug: string;
      title: string;
      subtitle: string;
      heroImage: string;
      href: string;
      label: string;
    };
    /* Destination values are slugs. These are the ones a straight
       title-case gets wrong. */
    const TOWN: Record<string, string> = {
      "kelaat-mgouna": "Kelaat M'Gouna",
      "mhamid": "M'hamid",
      "el-jadida": "El Jadida",
      "ait-benhaddou": "Aït Benhaddou",
      "dades-valley": "The Dadès",
      "draa-valley": "The Draa",
      "ourika-valley": "The Ourika",
      "todra-gorge": "Todra",
      "atlas-mountains": "The High Atlas",
      "moulay-idriss": "Moulay Idriss",
      "sidi-ifni": "Sidi Ifni",
    };
    const townName = (d?: string | null) =>
      !d ? "" : TOWN[d] ?? d.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

    const heroPool: HeroItem[] = [
      ...allJourneys
        .filter((j) => j.heroImage && j.journeyType !== "daytrip" && j.journeyType !== "overnight")
        .map((j) => ({
          kind: "journey" as const, slug: j.slug, title: j.title,
          subtitle: j.description || j.destinations || "",
          heroImage: j.heroImage as string, href: `/journeys/${j.slug}`, label: "Journey",
        })),
      ...allStories
        .filter((s) => s.heroImage)
        .map((s) => ({
          kind: "story" as const, slug: s.slug, title: s.title,
          subtitle: s.subtitle || "", heroImage: s.heroImage as string,
          href: `/stories/${s.slug}`, label: s.category || "Editorial",
        })),
      ...placesData
        .filter((p) => p.hero_image)
        .map((p) => ({
          kind: "place" as const, slug: p.slug, title: p.title,
          // destination stores a slug, not a display name. Printing it
          // raw put "atlas-mountains" under the masthead.
          subtitle: townName(p.destination), heroImage: p.hero_image as string,
          href: `/places/${p.slug}`, label: p.category || "Place",
        })),
    ];
    /* The hero rotates every three hours across the whole pool —
       journeys, places and stories together.

       It used to be narrowed to the four slugs the month names, so the
       season line and the picture behind it would agree. Four pictures
       over four weeks is not a rotation, so that narrowing now only
       happens when SEASONAL_HOMEPAGE is on. */
    const seasonalPool = SEASONAL_HOMEPAGE
      ? heroPool.filter((h) => seasonNow().slugs.includes(h.slug))
      : [];
    heroItem =
      seededShuffle(seasonalPool.length ? seasonalPool : heroPool, timeBucket)[0] || null;

    // Format settings
    settingsData.forEach((row) => {
      if (row.key) settings[row.key] = row.value || "";
    });

    // Format places (hero cards — 6 with images)
    places = placesData
      .filter((p) => p.hero_image)
      .slice(0, 6)
      .map((p) => ({
        slug: p.slug,
        title: p.title,
        heroImage: p.hero_image as string,
        destination: p.destination || "",
        category: p.category || "",
      }));

    // Map places — all with coordinates for the homepage strip
    mapPlaces = placesData
      .filter((p) => p.latitude != null && p.longitude != null)
      .map((p) => ({
        slug: p.slug,
        title: p.title,
        category: p.category || "",
        destination: p.destination || "",
        latitude: p.latitude as number,
        longitude: p.longitude as number,
      }));

    // Format testimonials
    testimonials = testimonialsData.map((t) => ({
      id: t.testimonial_id,
      quote: t.quote,
      author: t.author,
      journeyTitle: t.journey_title || "",
    }));

    // Format destinations
    destinations = destinationsData.map((d) => ({
      slug: d.slug,
      title: d.title,
      subtitle: d.subtitle || "",
      hero_image: d.hero_image || "",
      region: d.region || "",
    }));
  } catch (error) {
    console.error("Homepage data fetch error:", error);
  }

  return (
    <HomeContent
      season={SEASONAL_HOMEPAGE ? seasonNow().line : undefined}
      journeys={journeys}
      epicJourneys={epicJourneys}
      heroItem={heroItem}
      stories={stories}
      places={places}
      mapPlaces={mapPlaces}
      testimonials={testimonials}
      settings={settings}
      destinations={destinations}
    />
  );
}
