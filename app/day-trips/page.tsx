import type { Metadata } from "next";
import { getDayTrips } from "@/lib/supabase";
import DayTripsContent from "./DayTripsContent";

export const metadata: Metadata = {
  title: "Day Trips",
  description: "Private day trips from Marrakech, Fes, and Casablanca — Atlas Mountains, Essaouira coast, Ouzoud waterfalls, and more. Half-day and full-day excursions.",
  alternates: { canonical: "https://www.slowmorocco.com/day-trips" },
  openGraph: {
    title: "Day Trips | Slow Morocco",
    description: "Private day trips from Marrakech, Fes, and Casablanca — Atlas Mountains, Essaouira coast, and more.",
    url: "https://www.slowmorocco.com/day-trips",
  },
};

export const revalidate = 3600;

export default async function DayTripsPage() {
  let dayTrips: any[] = [];
  let dataLoaded = false;

  try {
    const data = await getDayTrips({ published: true });
    dayTrips = data.map((t) => ({
      slug: t.slug || "",
      title: t.title || "",
      shortDescription: t.short_description || "",
      durationHours: t.duration_hours || 0,
      priceMAD: t.final_price_mad || 0,
      priceEUR: t.final_price_eur || 0,
      category: t.category || "",
      heroImage: t.hero_image_url || "",
      region: t.region || "",
    }));
    dataLoaded = true;
  } catch (error) {
    console.error("Error fetching day trips:", error);
  }

  return <DayTripsContent initialDayTrips={dayTrips} dataLoaded={dataLoaded} />;
}
