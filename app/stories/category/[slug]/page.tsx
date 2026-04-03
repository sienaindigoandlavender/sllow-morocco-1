import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getStories } from "@/lib/supabase";
import StoryCategoryContent from "./StoryCategoryContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";

// Categories with enough content for standalone pages
const CATEGORIES: Record<string, { label: string; description: string; count?: number }> = {
  history:      { label: "History", description: "A thousand years of dynasties, trade routes, and the slow accumulation of identity. Morocco's past is not behind it — it is the texture of its present." },
  architecture: { label: "Architecture", description: "Zellige, pisé, cedar, stucco. The geometry of Moroccan space — from the medina's logic to the kasbah's slow return to earth." },
  culture:      { label: "Culture", description: "Ritual, language, hospitality, ceremony. The practices that hold a society together and reveal themselves only to those who stay long enough." },
  people:       { label: "People", description: "The artisans, nomads, musicians, and farmers who make Morocco what it is. Stories about individuals, not archetypes." },
  systems:      { label: "Systems", description: "Water engineering, trade networks, caravan routes, agricultural cycles. How Morocco has organised itself to survive and thrive." },
  food:         { label: "Food", description: "Couscous, saffron, preserved lemons, argan oil. The ingredients and rituals that make Moroccan cuisine one of the world's great culinary traditions." },
  nature:       { label: "Nature", description: "Atlas cedar forests, Saharan dunes, Atlantic coastline, endemic species. The landscapes that contain everything else." },
  art:          { label: "Art", description: "From the painters who came to Morocco and rewrote European colour theory to the artisans whose geometric patterns encode a worldview." },
  design:       { label: "Design", description: "The moucharabieh, the hammam, the souk — Moroccan design as a solution to climate, privacy, and community." },
  music:        { label: "Music", description: "Gnawa trance, Andalusian classical, Aita, chaabi. The musical traditions that carry history in their rhythms." },
  craft:        { label: "Craft", description: "Leather tanning, carpet weaving, brass-working, pottery. The trades passed hand to hand across generations." },
  movies:       { label: "Movies", description: "Morocco as set, subject, and backdrop. The films made here and the industry that grew from the light." },
  sacred:       { label: "Sacred", description: "Sufi brotherhoods, moussem pilgrimages, Jewish shrines, and the spiritual geography of a country that takes religion seriously." },
  wildlife:     { label: "Wildlife", description: "Barbary macaques, flamingos, migratory raptors, and the endangered species that still find refuge in Morocco's varied landscapes." },
  knowledge:    { label: "Knowledge", description: "The libraries, the scholars, the transmission of learning across the medieval Mediterranean world." },
  economy:      { label: "Economy", description: "Phosphate, argan, tourism, remittances, rail. The forces shaping modern Morocco and its place in the world." },
  "before-you-go": { label: "Before You Go", description: "The things you wish someone had told you before you landed. Practical, honest, written by someone who lives here." },
};

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({ slug }));
}

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = CATEGORIES[params.slug];
  if (!cat) return {};

  return {
    title: `${cat.label} — Stories — Slow Morocco`,
    description: cat.description,
    openGraph: {
      title: `${cat.label} — Slow Morocco`,
      description: cat.description,
      url: `${BASE_URL}/stories/category/${params.slug}`,
    },
    alternates: { canonical: `${BASE_URL}/stories/category/${params.slug}` },
  };
}

export default async function StoryCategoryPage({ params }: Props) {
  const cat = CATEGORIES[params.slug];
  if (!cat) notFound();

  const stories = await getStories({
    published: true,
    category: cat.label, // Match exact label as stored in DB
  });

  return (
    <StoryCategoryContent
      categorySlug={params.slug}
      categoryLabel={cat.label}
      description={cat.description}
      stories={stories}
      allCategories={CATEGORIES}
    />
  );
}
