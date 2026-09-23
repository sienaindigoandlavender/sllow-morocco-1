import type { Metadata } from "next";
import { getStories } from "@/lib/supabase";
import StoriesContent from "./StoriesContent";

export async function generateMetadata(
  { searchParams }: { searchParams?: Record<string, string | string[] | undefined> }
): Promise<Metadata> {
  const stories = (await getStories({ published: true })).filter((s: any) => s.category !== 'Glossary');
  const n = stories.length;

  // Filtered views (/stories?q=… , /stories?city=…) are this same page with a
  // client-side filter applied — identical server HTML. Google was indexing
  // them as duplicates of /stories ("duplicate without user-selected
  // canonical"). Keep the canonical on the clean URL and noindex any param
  // view so only /stories itself is indexed.
  const isFiltered = !!searchParams && Object.keys(searchParams).length > 0;

  const title = n > 0 ? `${n} Stories from Morocco` : "The Edit — Cultural Stories";
  const description =
    n > 0
      ? `${n} original cultural essays on Morocco — craft, music, architecture, history, food, and nature, written from inside the country rather than about it.`
      : "Original cultural essays on Morocco — craft, music, architecture, history, food, and nature.";

  return {
    title,
    description,
    alternates: { canonical: "https://www.slowmorocco.com/stories" },
    robots: isFiltered ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${title} | Slow Morocco`,
      description,
      url: "https://www.slowmorocco.com/stories",
    },
  };
}

// Revalidate every hour
export const revalidate = 3600;

interface StoryItem {
  slug: string;
  title: string;
  createdAt?: string;
  subtitle?: string;
  mood?: string;
  heroImage?: string;
  excerpt?: string;
}

async function fetchStories(): Promise<{ stories: StoryItem[]; lastUpdated: string | null }> {
  try {
    const storiesData = (await getStories({ published: true })).filter((s: any) => s.category !== 'Glossary');
    const stories = storiesData.map((story) => ({
      slug: story.slug,
      title: story.title,
      subtitle: story.subtitle || undefined,
      mood: story.category || undefined,
      heroImage: story.hero_image || undefined,
      excerpt: story.excerpt || undefined,
      createdAt: story.created_at || undefined,
    }));

    const lastUpdated =
      storiesData
        .map((s: any) => s.updated_at)
        .filter(Boolean)
        .sort()
        .pop() || null;

    return { stories, lastUpdated };
  } catch (error) {
    console.error("Error fetching stories:", error);
    return { stories: [], lastUpdated: null };
  }
}

export default async function StoriesPage() {
  const { stories, lastUpdated } = await fetchStories();
  const dataLoaded = stories.length > 0;

  return (
    <StoriesContent
      initialStories={stories}
      lastUpdated={lastUpdated}
      dataLoaded={dataLoaded}
    />
  );
}
