import { Metadata } from "next";
import { getPlaces } from "@/lib/supabase";
import AllPlacesMap from "./AllPlacesMap";

export const metadata: Metadata = {
  title: "All Places on One Map | Slow Morocco",
  description:
    "Every place in the Slow Morocco atlas — Morocco mapped in one view. Medinas, kasbahs, oases, tanneries, shrines, souks, and more.",
  openGraph: {
    title: "All Places on One Map — Slow Morocco",
    description:
      "Every medina, kasbah, oasis, tannery, shrine, and souk in the atlas.",
    url: "https://www.slowmorocco.com/places/map",
  },
  alternates: {
    canonical: "https://www.slowmorocco.com/places/map",
  },
};

export const revalidate = 3600;

export default async function AllPlacesMapPage() {
  const places = await getPlaces({ published: true });

  // Only places with coordinates
  const mappable = places.filter(
    (p) => p.latitude != null && p.longitude != null
  );

  const placeData = mappable.map((p) => ({
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

  return <AllPlacesMap places={placeData} total={places.length} />;
}
