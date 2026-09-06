import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPlaces, getDestinations, convertDriveUrl } from "@/lib/supabase";
import { within, hasCoords, WALKING_RADIUS_KM, MIN_NEIGHBOURS } from "@/lib/geo";
import NearbyContent from "./NearbyContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";

/**
 * Only places with at least MIN_NEIGHBOURS others inside
 * WALKING_RADIUS_KM get a page. Anything thinner would be a
 * doorway page with three links on it.
 */
export async function generateStaticParams() {
  const places = await getPlaces({ published: true });
  const mappable = places.filter(hasCoords as any);

  return mappable
    .filter(
      (p: any) => within(p, mappable as any, WALKING_RADIUS_KM).length >= MIN_NEIGHBOURS,
    )
    .map((p: any) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

async function load(slug: string) {
  const [places, destinations] = await Promise.all([
    getPlaces({ published: true }),
    getDestinations({ published: true }),
  ]);

  const origin = places.find((p) => p.slug === slug);
  if (!origin || !hasCoords(origin as any)) return null;

  const mappable = places.filter(hasCoords as any);
  const neighbours = within(origin as any, mappable as any, WALKING_RADIUS_KM);
  if (neighbours.length < MIN_NEIGHBOURS) return null;

  return { origin, neighbours, destinations };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await load(slug);
  if (!data) return {};

  const { origin, neighbours } = data;
  const names = neighbours.slice(0, 3).map((n: any) => n.title);
  const title = `${neighbours.length} Places Within Walking Distance of ${origin.title}`;
  const description = `Everything worth stopping for within ${WALKING_RADIUS_KM}km of ${origin.title}, including ${names.join(", ")}.`;

  return {
    title,
    description:
      description.length > 158
        ? description.slice(0, 155).replace(/[\s,;:—-]+$/, "") + "…"
        : description,
    openGraph: {
      title: `${title} — Slow Morocco`,
      description,
      url: `${BASE_URL}/places/near/${slug}`,
    },
    alternates: { canonical: `${BASE_URL}/places/near/${slug}` },
  };
}

export default async function NearPlacePage({ params }: Props) {
  const { slug } = await params;
  const data = await load(slug);
  if (!data) notFound();

  const { origin, neighbours, destinations } = data;
  const destLookup = new Map(destinations.map((d) => [d.slug, d.title]));

  const items = neighbours.map((p: any) => ({
    slug: p.slug,
    title: p.title,
    category: p.category || "",
    destinationLabel:
      destLookup.get(p.destination || "") ||
      (p.destination || "").replace(/-/g, " "),
    heroImage: p.hero_image ? convertDriveUrl(p.hero_image) : "",
    excerpt: p.excerpt || "",
    distanceKm: p.distanceKm,
    visitDurationMinutes: p.visit_duration_minutes ?? null,
  }));

  return (
    <NearbyContent
      originSlug={origin.slug}
      originTitle={origin.title}
      originDestination={
        destLookup.get(origin.destination || "") ||
        (origin.destination || "").replace(/-/g, " ")
      }
      radiusKm={WALKING_RADIUS_KM}
      places={items}
      lastUpdated={(origin.updated_at as string) || null}
    />
  );
}
