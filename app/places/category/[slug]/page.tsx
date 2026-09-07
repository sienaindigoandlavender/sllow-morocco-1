import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPlaces, getDestinations, getJourneys, getStories, convertDriveUrl } from "@/lib/supabase";
import { hasCoords } from "@/lib/geo";
import {
  PLACE_CATEGORIES,
  CATEGORY_BY_SLUG,
  MIN_FOR_INDEX,
} from "@/lib/place-categories";
import PlaceCategoryContent from "./PlaceCategoryContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";

export async function generateStaticParams() {
  return PLACE_CATEGORIES.map((c) => ({ slug: c.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

async function load(slug: string) {
  const cat = CATEGORY_BY_SLUG[slug];
  if (!cat) return null;

  // One query, filtered in memory — the page needs sibling counts anyway,
  // so a category-filtered query would just mean fetching twice.
  const [allPlaces, destinations, allJourneys, allStories] = await Promise.all([
    getPlaces({ published: true }),
    getDestinations({ published: true }),
    cat.journeys?.length ? getJourneys({ published: true }) : Promise.resolve([]),
    cat.stories?.length ? getStories({ published: true }) : Promise.resolve([]),
  ]);

  const places = allPlaces.filter(
    (p) => (p.category || "").toLowerCase() === cat.label.toLowerCase(),
  );

  const counts: Record<string, number> = {};
  for (const p of allPlaces) {
    if (p.category) counts[p.category] = (counts[p.category] || 0) + 1;
  }

  return { cat, places, destinations, counts, allJourneys, allStories };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await load(slug);
  if (!data) return {};

  const { cat, places } = data;
  const count = places.length;
  const title = `${count} ${cat.label} Places in Morocco`;
  const description =
    cat.description.length > 155
      ? cat.description.slice(0, 152).replace(/[\s,;:—-]+$/, "") + "…"
      : cat.description;

  return {
    title,
    description,
    // A category with almost nothing in it is a doorway page. Keep it
    // usable for readers, keep it out of the index.
    robots: count < MIN_FOR_INDEX ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${title} — Slow Morocco`,
      description,
      url: `${BASE_URL}/places/category/${slug}`,
    },
    alternates: { canonical: `${BASE_URL}/places/category/${slug}` },
  };
}

export default async function PlaceCategoryPage({ params }: Props) {
  const { slug } = await params;
  const data = await load(slug);
  if (!data) notFound();

  const { cat, places, destinations, counts, allJourneys, allStories } = data;

  const destLookup = new Map(destinations.map((d) => [d.slug, d.title]));

  const items = places.map((p) => ({
    slug: p.slug,
    title: p.title,
    destination: p.destination || "",
    destinationLabel:
      destLookup.get(p.destination || "") ||
      (p.destination || "").replace(/-/g, " "),
    heroImage: p.hero_image ? convertDriveUrl(p.hero_image) : "",
    excerpt: p.excerpt || "",
  }));

  // Pins for the embedded atlas, this category only.
  const mapPlaces = places.filter(hasCoords as any).map((p: any) => ({
    slug: p.slug,
    title: p.title,
    category: p.category || "",
    destination: p.destination || "",
    excerpt: p.excerpt || "",
    hero_image: p.hero_image || "",
    latitude: p.latitude as number,
    longitude: p.longitude as number,
    related_story_slugs: p.related_story_slugs || [],
    journey_bridge: p.journey_bridge || "",
  }));

  // Journeys that cover this category, in the order listed on the
  // category rather than the order the table returns them.
  const journeyList = (cat.journeys || [])
    .map((slug) => (allJourneys as any[]).find((j) => j.slug === slug))
    .filter(Boolean)
    .map((j: any) => ({
      slug: j.slug,
      title: j.title,
      blurb: j.short_description || "",
      days: j.duration_days ?? null,
    }));

  // Essays on this subject, in the order listed on the category.
  // A story that has been unpublished or merged simply drops out.
  const storyList = (cat.stories || [])
    .map((slug) => (allStories as any[]).find((st) => st.slug === slug))
    .filter(Boolean)
    .map((st: any) => ({
      slug: st.slug,
      title: st.title,
      subtitle: st.subtitle || st.excerpt || "",
      readTime: st.read_time ?? null,
    }));

  const lastUpdated = places
    .map((p) => p.updated_at)
    .filter(Boolean)
    .sort()
    .pop() as string | undefined;

  return (
    <PlaceCategoryContent
      categorySlug={slug}
      label={cat.label}
      description={cat.description}
      places={items}
      mapPlaces={mapPlaces}
      journeys={journeyList}
      stories={storyList}
      ksourArchive={!!cat.ksourArchive}
      counts={counts}
      lastUpdated={lastUpdated || null}
    />
  );
}
