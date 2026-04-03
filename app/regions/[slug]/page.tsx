import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getRegions, getDestinations, getPlaces, getJourneys, getStories } from "@/lib/supabase";
import RegionContent from "./RegionContent";

export const revalidate = 3600;

const REGION_SLUGS = ["cities", "mountains", "coastal", "desert"];

// Journey focus_type keywords per region
const REGION_FOCUS: Record<string, string[]> = {
  cities:    ["CULTURE", "City Break", "Heritage", "ART", "CRAFT", "FOOD", "ARCHITECTURE"],
  mountains: ["MOUNTAINS", "TREKKING", "HIKING", "TREKKING", "ADVENTURE"],
  coastal:   ["SEA", "COASTAL", "SURF", "Coast"],
  desert:    ["DESERT", "Desert"],
};

// Story tag keywords per region
const REGION_TAGS: Record<string, string[]> = {
  cities:    ["marrakech", "fes", "tangier", "rabat", "meknes", "casablanca", "medina", "imperial", "zellige", "hammam", "souk", "caftan", "palace", "mosque"],
  mountains: ["atlas", "amazigh", "berber", "rif", "cedar", "imlil", "toubkal", "high atlas", "middle atlas", "anti-atlas"],
  coastal:   ["atlantic", "essaouira", "coast", "sardines", "harbor", "agadir", "tangier", "mediterranean", "fishing"],
  desert:    ["sahara", "saharan", "caravan", "oasis", "kasbah", "draa", "merzouga", "khettara", "trans-saharan", "nomad"],
};

export async function generateStaticParams() {
  return REGION_SLUGS.map((slug) => ({ slug }));
}

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const regions = await getRegions();
  const region = regions.find((r) => r.slug === params.slug);
  if (!region) return {};

  return {
    title: `${region.title} — Morocco Regions — Slow Morocco`,
    description: region.description || region.subtitle || undefined,
    alternates: { canonical: `https://www.slowmorocco.com/regions/${params.slug}` },
    openGraph: {
      title: `${region.title} — Slow Morocco`,
      images: region.hero_image ? [{ url: region.hero_image }] : [],
    },
  };
}

async function fetchRegionData(slug: string) {
  const [regions, allDestinations, allJourneys, allStories] = await Promise.all([
    getRegions(),
    getDestinations({ published: true }),
    getJourneys({ published: true }),
    getStories({ published: true }),
  ]);

  const region = regions.find((r) => r.slug === slug);
  if (!region) return null;

  // Destinations in this region (comma-separated region field)
  const destinations = allDestinations.filter((d) =>
    (d.region || "").split(",").map((s) => s.trim()).includes(slug)
  );
  const destinationSlugs = destinations.map((d) => d.slug);

  // Places — fetch per destination then flatten
  const placesArrays = await Promise.all(
    destinationSlugs.map((dest) => getPlaces({ published: true, destination: dest }))
  );
  const places = placesArrays.flat();

  // Journeys — match by focus_type or category
  const focusKeywords = REGION_FOCUS[slug] || [];
  const journeys = allJourneys.filter((j) => {
    const focus = (j.focus_type || "").toLowerCase();
    const category = (j.category || "").toLowerCase();
    return focusKeywords.some(
      (k) => focus.includes(k.toLowerCase()) || category.includes(k.toLowerCase())
    );
  });

  // Stories — match by tags
  const tagKeywords = REGION_TAGS[slug] || [];
  const stories = allStories.filter((s) => {
    const tags = (s.tags || "").toLowerCase();
    return tagKeywords.some((k) => tags.includes(k.toLowerCase()));
  });

  return { region, destinations, places, journeys, stories };
}

export default async function RegionPage({ params }: Props) {
  if (!REGION_SLUGS.includes(params.slug)) notFound();

  const data = await fetchRegionData(params.slug);
  if (!data) notFound();

  return (
    <RegionContent
      region={data.region}
      destinations={data.destinations}
      places={data.places}
      journeys={data.journeys}
      stories={data.stories}
      regionSlug={params.slug}
    />
  );
}
