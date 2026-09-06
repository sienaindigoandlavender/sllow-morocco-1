import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPlaces, getDestinations, convertDriveUrl } from "@/lib/supabase";
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
  const [allPlaces, destinations] = await Promise.all([
    getPlaces({ published: true }),
    getDestinations({ published: true }),
  ]);

  const places = allPlaces.filter(
    (p) => (p.category || "").toLowerCase() === cat.label.toLowerCase(),
  );

  const counts: Record<string, number> = {};
  for (const p of allPlaces) {
    if (p.category) counts[p.category] = (counts[p.category] || 0) + 1;
  }

  return { cat, places, destinations, counts };
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

  const { cat, places, destinations, counts } = data;

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
      counts={counts}
      lastUpdated={lastUpdated || null}
    />
  );
}
