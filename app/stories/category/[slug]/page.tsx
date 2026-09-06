import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getStories } from "@/lib/supabase";
import StoryCategoryContent from "./StoryCategoryContent";
import { STORY_CATEGORY_MAP as CATEGORIES, MIN_FOR_INDEX } from "@/lib/story-categories";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({ slug }));
}

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = CATEGORIES[params.slug];
  if (!cat) return {};

  const stories = await getStories({ published: true, category: cat.label });
  const count = stories.length;
  const title = count > 0 ? `${count} ${cat.label} Stories` : `${cat.label} — Stories`;

  return {
    title,
    description: cat.description,
    // A category page with one or two entries is a doorway page.
    // Usable for readers, out of the index.
    robots: count < MIN_FOR_INDEX ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${title} — Slow Morocco`,
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
