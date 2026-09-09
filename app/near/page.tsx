import { Metadata } from "next";
import { getPlaces } from "@/lib/supabase";
import NearContent from "./NearContent";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "What Is Near You | Slow Morocco",
  description:
    "Open this where you are standing. The places we have written about within walking distance, what the light is doing, and which souk is trading today.",
  robots: { index: false, follow: true },
};

export default async function NearPage() {
  const places = await getPlaces({ published: true });

  // Only the fields the client needs. Bodies stay on the server.
  const points = places
    .filter((p: any) => p.latitude != null && p.longitude != null)
    .map((p: any) => ({
      slug: p.slug,
      title: p.title,
      destination: p.destination,
      category: p.category,
      excerpt: p.excerpt,
      hero_image: p.hero_image,
      latitude: Number(p.latitude),
      longitude: Number(p.longitude),
      visit_duration_minutes: p.visit_duration_minutes ?? null,
      best_time_to_visit: p.best_time_to_visit ?? null,
    }));

  return <NearContent places={points} />;
}
