import type { Metadata } from "next";
import { getStories } from "@/lib/supabase";
import StoriesContent from "./StoriesContent";

export async function generateMetadata(): Promise<Metadata> {
  const stories = await getStories({ published: true });
  const n = stories.length;

  const title = n > 0 ? `${n} Stories from Morocco` : "The Edit — Cultural Stories";
  const description =
    n > 0
      ? `${n} original cultural essays on Morocco — craft, music, architecture, history, food, and nature, written from inside the country rather than about it.`
      : "Original cultural essays on Morocco — craft, music, architecture, history, food, and nature.";

  return {
    title,
    description,
    alternates: { canonical: "https://www.slowmorocco.com/stories" },
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
  subtitle?: string;
  mood?: string;
  heroImage?: string;
  excerpt?: string;
}

async function fetchStories(): Promise<{ stories: StoryItem[]; lastUpdated: string | null }> {
  try {
    const storiesData = await getStories({ published: true });
    const stories = storiesData.map((story) => ({
      slug: story.slug,
      title: story.title,
      subtitle: story.subtitle || undefined,
      mood: story.category || undefined,
      heroImage: story.hero_image || undefined,
      excerpt: story.excerpt || undefined,
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
