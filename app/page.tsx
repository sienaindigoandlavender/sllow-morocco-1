import type { Metadata } from "next";
import { getJourneys, getStories, getPlaces, getWebsiteSettings, getTestimonials, getDestinations } from "@/lib/supabase";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "Slow Morocco | Morocco, Decoded",
  description: "Private journeys through a country most guides only scratch the surface of. 223 places, 105 journeys, 308 stories.",
  alternates: { canonical: "https://www.slowmorocco.com" },
  openGraph: {
    title: "Slow Morocco | Morocco, Decoded",
    description: "Private journeys through a country most guides only scratch the surface of. 223 places, 105 journeys, 308 stories.",
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

    journeys = allJourneys.filter((j) => j.journeyType !== "epic");
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

    stories = seededShuffle(allStories, timeBucket).slice(0, 14);
    journeys = seededShuffle(journeys, timeBucket + 7).slice(0, 8);

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
        heroImage: p.hero_image,
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
      journeys={journeys}
      epicJourneys={epicJourneys}
      stories={stories}
      places={places}
      mapPlaces={mapPlaces}
      testimonials={testimonials}
      settings={settings}
      destinations={destinations}
    />
  );
}
