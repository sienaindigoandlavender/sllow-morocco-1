import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPlaceBySlug, getPlaceImages, getJourneys, getStories, getDestinations, getPlaces, convertDriveUrl } from "@/lib/supabase";
import PlaceDetailContent from "./PlaceDetailContent";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const place = await getPlaceBySlug(slug);
  if (!place) return { title: "Place Not Found" };

  const isAttraction = !!place.attraction_sections;
  const title = isAttraction
    ? `${place.title}, Marrakech — Visitor Guide | Slow Morocco`
    : `${place.title} | Slow Morocco`;
  const description = place.notes || place.excerpt || `${place.title}, ${place.destination || "Morocco"} — travel guide by Slow Morocco.`;

  return {
    title,
    description: typeof description === "string" ? description.slice(0, 160) : "",
    alternates: { canonical: `${BASE_URL}/places/${slug}` },
    openGraph: {
      title: place.title,
      description: typeof description === "string" ? description.slice(0, 160) : "",
      url: `${BASE_URL}/places/${slug}`,
      siteName: "Slow Morocco",
      type: "website",
    },
  };
}

interface FormattedPlace {
  slug: string;
  title: string;
  destination: string;
  category: string;
  address: string;
  openingHours: string;
  fees: string;
  notes: string;
  heroImage: string;
  heroCaption: string;
  excerpt: string;
  body: string;
  sources: string;
  tags: string;
  journeyBridge: string;
  attractionSections: Record<string, { title: string; body: string }> | null;
  faqData: Array<{ q: string; a: string }> | null;
  schemaType: string | null;
  relatedStorySlugs: string[] | null;
  latitude: number | null;
  longitude: number | null;
  visitDurationMinutes: number | null;
  bestTimeToVisit: string | null;
  gettingThere: string | null;
  nearbySlugs: string[] | null;
}

interface PlaceImage {
  url: string;
  caption: string;
  order: number;
}

interface NearbyPlace {
  slug: string;
  title: string;
  category: string;
  heroImage: string;
  excerpt: string;
}

async function getPlaceData(slug: string) {
  const place = await getPlaceBySlug(slug);
  if (!place) return null;

  const images = await getPlaceImages(slug);

  const formattedPlace: FormattedPlace = {
    slug: place.slug || "",
    title: place.title || "",
    destination: place.destination || "",
    category: place.category || "",
    address: place.address || "",
    openingHours: place.opening_hours || "",
    fees: place.fees || "",
    notes: place.notes || "",
    heroImage: place.hero_image ? convertDriveUrl(place.hero_image) : "",
    heroCaption: place.hero_caption || "",
    excerpt: place.excerpt || "",
    body: (place.body || "").replace(/<br\s*\/?>/gi, '\n'),
    sources: place.sources || "",
    tags: place.tags || "",
    journeyBridge: place.journey_bridge || "",
    attractionSections: place.attraction_sections || null,
    faqData: place.faq_data || null,
    schemaType: place.schema_type || null,
    relatedStorySlugs: place.related_story_slugs || null,
    latitude: place.latitude || null,
    longitude: place.longitude || null,
    visitDurationMinutes: place.visit_duration_minutes || null,
    bestTimeToVisit: place.best_time_to_visit || null,
    gettingThere: place.getting_there || null,
    nearbySlugs: place.nearby_slugs || null,
  };

  const formattedImages: PlaceImage[] = images.map((img) => ({
    url: img.image_url ? convertDriveUrl(img.image_url) : "",
    caption: img.caption || "",
    order: img.image_order,
  }));

  return { place: formattedPlace, images: formattedImages };
}

async function getRelatedContent(place: FormattedPlace) {
  const destination = place.destination?.toLowerCase();
  const placeTags = (place.tags || "").toLowerCase();

  let relatedJourneys: any[] = [];
  let relatedStories: any[] = [];

  try {
    const allJourneys = await getJourneys({ published: true });
    if (destination) {
      relatedJourneys = allJourneys
        .filter((j) => {
          const destinations = j.destinations?.toLowerCase() || "";
          const isEpic = j.journey_type === "epic";
          return destinations.includes(destination) && !isEpic;
        })
        .map((j) => ({
          slug: j.slug || "",
          title: j.title || "",
          heroImage: j.hero_image_url ? convertDriveUrl(j.hero_image_url) : "",
          description: j.short_description || "",
          durationDays: j.duration_days || 0,
        }));
    }
  } catch {}

  try {
    const allStories = await getStories({ published: true });

    if (place.relatedStorySlugs && place.relatedStorySlugs.length > 0) {
      const slugSet = new Set(place.relatedStorySlugs);
      const pinnedStories = allStories
        .filter((s) => slugSet.has(s.slug))
        .map((s) => ({
          slug: s.slug,
          title: s.title,
          category: s.category,
          heroImage: s.hero_image ? convertDriveUrl(s.hero_image) : "",
        }));

      const pinnedSlugs = new Set(pinnedStories.map((s) => s.slug));
      const additionalStories = allStories
        .filter((s) => {
          if (pinnedSlugs.has(s.slug)) return false;
          const storyTags = (s.tags || "").toLowerCase();
          const storyRegion = (s.region || "").toLowerCase();
          if (destination && (storyTags.includes(destination) || storyRegion.includes(destination))) return true;
          const placeTagList = placeTags.split(",").map((t: string) => t.trim()).filter(Boolean);
          for (const tag of placeTagList) {
            if (storyTags.includes(tag)) return true;
          }
          return false;
        })
        .slice(0, 6 - pinnedStories.length)
        .map((s) => ({
          slug: s.slug,
          title: s.title,
          category: s.category,
          heroImage: s.hero_image ? convertDriveUrl(s.hero_image) : "",
        }));

      relatedStories = [...pinnedStories, ...additionalStories];
    } else {
      const matchedStories = allStories.filter((s) => {
        const storyTags = (s.tags || "").toLowerCase();
        const storyRegion = (s.region || "").toLowerCase();
        if (destination && (storyTags.includes(destination) || storyRegion.includes(destination))) return true;
        const placeTagList = placeTags.split(",").map((t: string) => t.trim()).filter(Boolean);
        for (const tag of placeTagList) {
          if (storyTags.includes(tag)) return true;
        }
        return false;
      }).map((s) => ({
        slug: s.slug,
        title: s.title,
        category: s.category,
        heroImage: s.hero_image ? convertDriveUrl(s.hero_image) : "",
      }));

      relatedStories = matchedStories.length > 0
        ? matchedStories.slice(0, 6)
        : allStories.slice(0, 6).map((s) => ({
            slug: s.slug,
            title: s.title,
            category: s.category,
            heroImage: s.hero_image ? convertDriveUrl(s.hero_image) : "",
          }));
    }
  } catch {}

  return { relatedJourneys, relatedStories };
}

async function getNearbyPlaces(slugs: string[] | null): Promise<NearbyPlace[]> {
  if (!slugs || slugs.length === 0) return [];
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data, error } = await supabase
      .from("places")
      .select("slug, title, category, hero_image, excerpt")
      .in("slug", slugs)
      .eq("published", true);
    if (error || !data) return [];
    return data.map((p: any) => ({
      slug: p.slug,
      title: p.title,
      category: p.category || "",
      heroImage: p.hero_image ? convertDriveUrl(p.hero_image) : "",
      excerpt: p.excerpt || "",
    }));
  } catch {
    return [];
  }
}

export default async function PlaceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getPlaceData(slug);

  if (!data) {
    notFound();
  }

  const { relatedJourneys, relatedStories } = await getRelatedContent(data.place);
  const nearbyPlaces = await getNearbyPlaces(data.place.nearbySlugs);

  // Find prev/next places
  const allPlaces = await getPlaces({ published: true });
  const currentIndex = allPlaces.findIndex((p) => p.slug === slug);
  const prevPlace = currentIndex > 0 ? { slug: allPlaces[currentIndex - 1].slug, title: allPlaces[currentIndex - 1].title } : null;
  const nextPlace = currentIndex < allPlaces.length - 1 ? { slug: allPlaces[currentIndex + 1].slug, title: allPlaces[currentIndex + 1].title } : null;

  return (
    <PlaceDetailContent
      place={data.place}
      images={data.images}
      relatedJourneys={relatedJourneys}
      relatedStories={relatedStories}
      nearbyPlaces={nearbyPlaces}
      prevPlace={prevPlace}
      nextPlace={nextPlace}
    />
  );
}
