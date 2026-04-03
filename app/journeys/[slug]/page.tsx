import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getJourneyBySlug, getRoutesByIds, getJourneys, getStories, getAllPlaceFirstImages } from "@/lib/supabase";
import { findRelatedStories } from "@/lib/content-matcher";
import JourneyDetailContent from "./JourneyDetailContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const journey = await getJourneyBySlug(slug);
  if (!journey) return { title: "Journey Not Found" };

  const title = `${journey.title} | Slow Morocco`;
  const duration = journey.duration_days ? `${journey.duration_days}-day` : "";
  const description = journey.short_description || journey.arc_description || `${duration} cultural journey through Morocco. ${journey.destinations || ""}`.trim();

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/journeys/${slug}` },
    openGraph: {
      title: journey.title,
      description,
      url: `${BASE_URL}/journeys/${slug}`,
      siteName: "Slow Morocco",
      type: "website",
      ...(journey.hero_image_url ? { images: [{ url: journey.hero_image_url, width: 1200, height: 630 }] } : {}),
    },
  };
}

interface Journey {
  slug: string;
  title: string;
  duration: string;
  durationDays: number;
  description: string;
  arcDescription: string;
  heroImage: string;
  startCity: string;
  focus: string;
  destinations: string;
  journeyId: string;
  journeyType?: string;
  epicPrice?: number;
  price?: number;
}

interface ItineraryDay {
  dayNumber: number;
  cityName: string;
  fromCity: string;
  toCity: string;
  description: string;
  imageUrl: string;
  travelTime: string;
  difficulty: string;
  activities: string;
  meals: string;
  routeType: string;
}

async function getJourneyData(slug: string) {
  const journeyData =
    (await getJourneyBySlug(slug)) ||
    (await getJourneyBySlug(decodeURIComponent(slug)));

  if (!journeyData) return null;

  const journey: Journey = {
    slug: journeyData.slug || "",
    title: journeyData.title || "",
    duration: journeyData.duration_days
      ? `${journeyData.duration_days}-Day`
      : "",
    durationDays: journeyData.duration_days || 0,
    description: journeyData.short_description || "",
    arcDescription: journeyData.arc_description || "",
    heroImage: journeyData.hero_image_url || "",
    price: journeyData.price_eur || 0,
    startCity: journeyData.start_city || "",
    focus: journeyData.focus_type || "",
    destinations: journeyData.destinations || "",
    journeyId: journeyData.id || "",
    journeyType: journeyData.journey_type || "regular",
    epicPrice: journeyData.epic_price_eur || undefined,
  };

  // Build itinerary from Route_Sequence
  const routeSequence = journeyData.route_sequence || "";
  const routeIds = routeSequence
    .split(",")
    .map((id: string) => id.trim())
    .filter((id: string) => id.length > 0);

  const [routes, placeImages] = await Promise.all([
    getRoutesByIds(routeIds),
    getAllPlaceFirstImages(),
  ]);

  // Helper: reject URLs from the deleted old Supabase instance
  function isValidImageUrl(url: string | null | undefined): string {
    if (!url) return "";
    if (url.includes("soqcqlzerhgacdaggtch")) return "";
    return url;
  }

  // Helper: find a place image by city name (try slug variants)
  function findPlaceImage(cityName: string): string {
    if (!cityName) return "";
    const slug = cityName.toLowerCase().replace(/\s+/g, "-");
    return placeImages[slug] || placeImages[cityName] || "";
  }

  const itinerary: ItineraryDay[] = routeIds.map(
    (routeId: string, index: number) => {
      const route = routes.find((r) => r.id === routeId);
      if (!route) {
        return {
          dayNumber: index + 1, cityName: "", fromCity: "", toCity: "",
          description: "", imageUrl: "", travelTime: "", difficulty: "",
          activities: "", meals: "", routeType: "",
        };
      }
      const imageUrl = isValidImageUrl(route.image_url)
        || isValidImageUrl(route.hero_image_url)
        || findPlaceImage(route.to_city || "")
        || findPlaceImage(route.from_city || "")
        || "";
      return {
        dayNumber: index + 1,
        cityName: route.to_city || "",
        fromCity: route.from_city || "",
        toCity: route.to_city || "",
        description: route.route_narrative || "",
        imageUrl,
        travelTime: String(route.travel_time_hours || ""),
        difficulty: route.difficulty_level || "",
        activities: route.activities || "",
        meals: route.meals || "",
        routeType: route.route_type || "",
      };
    }
  );

  return { journey, itinerary };
}

async function getOtherJourneys(currentSlug: string) {
  try {
    const allJourneys = await getJourneys({ published: true });
    return allJourneys
      .filter((j) => j.slug !== currentSlug)
      .map((j) => ({
        slug: j.slug || "",
        title: j.title || "",
        duration: j.duration_days ? `${j.duration_days}-Day` : "",
        durationDays: j.duration_days || 0,
        description: j.short_description || "",
        arcDescription: j.arc_description || "",
        heroImage: j.hero_image_url || "",
        price: j.price_eur || 0,
        startCity: j.start_city || "",
        focus: j.focus_type || "",
        destinations: j.destinations || "",
        journeyId: j.id || "",
        journeyType: j.journey_type || "regular",
        epicPrice: j.epic_price_eur || undefined,
      }));
  } catch {
    return [];
  }
}

async function getRelatedStoriesSSR(journey: Journey) {
  try {
    const allStories = await getStories({ published: true });
    const storiesForMatcher = allStories.map((s) => ({
      slug: s.slug || "",
      title: s.title || "",
      region: s.region || "",
      tags: s.tags || "",
      category: s.category || "",
      heroImage: s.hero_image || "",
      excerpt: s.excerpt || "",
    }));

    return findRelatedStories(
      journey.destinations,
      journey.focus,
      storiesForMatcher,
      4
    );
  } catch {
    return [];
  }
}

export default async function JourneyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getJourneyData(slug);

  if (!data) {
    notFound();
  }

  const otherJourneys = await getOtherJourneys(slug);
  const relatedStories = await getRelatedStoriesSSR(data.journey);

  // Find prev/next journeys
  const allJourneys = await getJourneys({ published: true });
  const visibleJourneys = allJourneys.filter((j) => j.show_on_journeys_page !== false && j.journey_type !== "epic");
  const currentIndex = visibleJourneys.findIndex((j) => j.slug === slug);
  const prevJourney = currentIndex > 0 ? { slug: visibleJourneys[currentIndex - 1].slug, title: visibleJourneys[currentIndex - 1].title } : null;
  const nextJourney = currentIndex < visibleJourneys.length - 1 ? { slug: visibleJourneys[currentIndex + 1].slug, title: visibleJourneys[currentIndex + 1].title } : null;

  return (
    <JourneyDetailContent
      journey={data.journey}
      itinerary={data.itinerary}
      otherJourneys={otherJourneys}
      relatedStories={relatedStories}
      slug={slug}
      prevJourney={prevJourney}
      nextJourney={nextJourney}
    />
  );
}
