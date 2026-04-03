import { Metadata } from "next";
import MoroccoContent from "./MoroccoContent";
import { getDestinations, getStories, getAllCityGuideFirstImages } from "@/lib/supabase";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";

export const metadata: Metadata = {
  title: "Morocco — Country Guide, Cities, Culture & Travel",
  description:
    "Morocco sits at the edge of two continents and three seas. 37 million people, eleven UNESCO sites, one of the world's great medina traditions. A country that has been receiving travellers for a thousand years and still surprises them.",
  openGraph: {
    title: "Morocco — Slow Morocco",
    description:
      "From the Strait of Gibraltar to the Sahara. Atlantic coast to the Algerian steppe. Eleven UNESCO sites. A country that contains more than it should.",
    url: `${BASE_URL}/morocco`,
  },
  alternates: { canonical: `${BASE_URL}/morocco` },
};

export default async function MoroccoPage() {
  const [destinations, stories, cityImages] = await Promise.all([
    getDestinations({ published: true }),
    getStories({ published: true, featured: true, limit: 3 }),
    getAllCityGuideFirstImages(),
  ]);

  // Filter to city destinations only
  const cities = destinations.filter((d) =>
    (d.region || "").toLowerCase().includes("cit")
  );

  return <MoroccoContent cities={cities} stories={stories} cityImages={cityImages} />;
}
