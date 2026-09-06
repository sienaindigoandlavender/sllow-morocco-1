import { redirect } from "next/navigation";
import { getPlaces } from "@/lib/supabase";

/**
 * /places/random — bounces to a random published place.
 *
 * force-dynamic is not optional here. Under ISR this route would be
 * rendered once and every visitor for the next hour would land on the
 * same "random" place.
 *
 * The route is a redirect, so it can't carry a noindex tag. It's kept
 * out of the sitemap and disallowed in robots.txt instead.
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RandomPlacePage() {
  const places = await getPlaces({ published: true });

  if (places.length === 0) redirect("/places");

  const pick = places[Math.floor(Math.random() * places.length)];
  redirect(`/places/${pick.slug}`);
}
