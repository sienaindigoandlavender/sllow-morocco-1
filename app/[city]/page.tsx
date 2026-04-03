import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  getDestinations,
  getDestinationBySlug,
  getPlaces,
  getStories,
  getJourneys,
  getCityGuideImages,
  convertDriveUrl,
} from "@/lib/supabase";
import CityGuideContent from "./CityGuideContent";

export const revalidate = 3600;

// Generate pages for ALL published destinations from Supabase
export async function generateStaticParams() {
  const destinations = await getDestinations({ published: true });
  return destinations.map((d) => ({ city: d.slug }));
}

interface Props {
  params: { city: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const destination = await getDestinationBySlug(params.city);
  if (!destination || !destination.published) {
    return { title: "Not Found — Slow Morocco" };
  }

  const BASE_URL = "https://www.slowmorocco.com";
  const titleSuffix = destination.subtitle
    ? `${destination.title} — ${destination.subtitle} | Slow Morocco`
    : `${destination.title}, Morocco — Slow Morocco`;
  const description =
    destination.excerpt ||
    `Everything you need to know before you go to ${destination.title}. Places, stories, and cultural context from Slow Morocco.`;

  return {
    title: titleSuffix,
    description,
    openGraph: {
      title: titleSuffix,
      description,
      url: `${BASE_URL}/${params.city}`,
      images: destination.hero_image
        ? [{ url: convertDriveUrl(destination.hero_image) }]
        : [],
    },
    alternates: {
      canonical: `${BASE_URL}/${params.city}`,
    },
  };
}

async function fetchCityData(citySlug: string) {
  const [destination, allDestinations, allJourneys, places, stories, galleryImages] = await Promise.all([
    getDestinationBySlug(citySlug),
    getDestinations({ published: true }),
    getJourneys({ published: true }),
    getPlaces({ published: true, destination: citySlug }),
    getStories({ published: true }),
    getCityGuideImages(citySlug),
  ]);

  if (!destination || !destination.published) return null;

  // All published destination slugs for journey filtering
  const allDestSlugs = allDestinations.map((d) => d.slug.toLowerCase());

  // Featured journeys — city is start point or first/only destination
  const featuredJourneys = allJourneys.filter((j) => {
    const dests = (j.destinations || "").toLowerCase();
    const start = (j.start_city || "").toLowerCase();
    const slug = citySlug.toLowerCase();
    const destList = dests.split(",").map((d: string) => d.trim());
    return (
      start === slug ||
      destList[0] === slug ||
      (destList.length === 1 && destList[0] === slug)
    );
  });

  // Connecting journeys — city appears in route but not as start/primary
  const featuredSlugs = new Set(featuredJourneys.map((j) => j.slug));
  const connectingJourneys = allJourneys.filter((j) => {
    if (featuredSlugs.has(j.slug)) return false;
    const dests = (j.destinations || "").toLowerCase();
    const slug = citySlug.toLowerCase();
    if (!dests.includes(slug)) return false;
    const otherCities = allDestSlugs.filter((c) => c !== slug);
    return otherCities.some((c) => dests.includes(c));
  });

  // Filter stories by tags or region matching city
  const cityStories = stories.filter((s) => {
    const tags = (s.tags || "").toLowerCase();
    const region = (s.region || "").toLowerCase();
    const slug = citySlug.toLowerCase();
    const title = destination.title.toLowerCase();
    return tags.includes(slug) || tags.includes(title) || region.includes(slug) || region.includes(title);
  });

  return { destination, featuredJourneys, connectingJourneys, places, stories: cityStories, galleryImages };
}

export default async function CityGuidePage({ params }: Props) {
  const data = await fetchCityData(params.city);
  if (!data) notFound();

  // Convert Google Drive URLs before passing to client component
  const destination = {
    ...data.destination,
    hero_image: data.destination.hero_image ? convertDriveUrl(data.destination.hero_image) : null,
  };

  const galleryImages = data.galleryImages.map((img) => ({
    ...img,
    image_url: img.image_url ? convertDriveUrl(img.image_url) : null,
  }));

  return (
    <CityGuideContent
      destination={destination}
      journeys={data.featuredJourneys}
      connectingJourneys={data.connectingJourneys}
      places={data.places}
      stories={data.stories}
      citySlug={params.city}
      galleryImages={galleryImages}
    />
  );
}
