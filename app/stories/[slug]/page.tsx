import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getStoryBySlug, getStories, getJourneys, getStoryImages } from "@/lib/supabase";
import { findRelatedJourneys } from "@/lib/content-matcher";
import StoryDetailContent from "./StoryDetailContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) return { title: "Story Not Found" };

  const title = `${story.title} | Slow Morocco`;
  const description = story.excerpt || story.subtitle || `${story.title} — a cultural essay by Slow Morocco.`;

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/stories/${slug}` },
    openGraph: {
      title: story.title,
      description,
      url: `${BASE_URL}/stories/${slug}`,
      siteName: "Slow Morocco",
      type: "article",
      ...(story.hero_image ? { images: [{ url: story.hero_image, width: 1200, height: 630 }] } : {}),
    },
  };
}

interface Story {
  slug: string;
  title: string;
  subtitle?: string;
  category?: string;
  sourceType?: string;
  heroImage?: string;
  heroCaption?: string;
  excerpt?: string;
  body?: string;
  readTime?: string;
  year?: string;
  textBy?: string;
  imagesBy?: string;
  sources?: string;
  the_facts?: string;
  tags?: string;
  region?: string;
  country?: string;
  era?: string;
  theme?: string;
  embedUrl?: string;
  journeyBridge?: string;
}

async function getStoryData(slug: string) {
  const storyData = await getStoryBySlug(slug);
  if (!storyData) return null;

  const story: Story = {
    slug: storyData.slug,
    title: storyData.title,
    subtitle: storyData.subtitle ?? undefined,
    category: storyData.category ?? undefined,
    sourceType: storyData.source_type ?? undefined,
    heroImage: storyData.hero_image ?? undefined,
    heroCaption: storyData.hero_caption ?? undefined,
    excerpt: storyData.excerpt ?? undefined,
    body: storyData.body ? storyData.body.replace(/<br\s*\/?>/gi, '\n') : undefined,
    readTime: storyData.read_time ? String(storyData.read_time) : undefined,
    year: storyData.year ? String(storyData.year) : undefined,
    textBy: storyData.text_by ?? undefined,
    imagesBy: storyData.images_by ?? undefined,
    sources: storyData.sources ?? undefined,
    tags: storyData.tags ?? undefined,
    the_facts: storyData.the_facts ?? undefined,
    region: storyData.region ?? undefined,
    country: storyData.country ?? undefined,
    era: storyData.era ?? undefined,
    theme: storyData.theme ?? undefined,
    embedUrl: storyData.embed_url ?? undefined,
    journeyBridge: storyData.journey_bridge ?? undefined,
  };

  // Pass through raw fields for the map renderer
  const mapData = storyData.map_data || null;
  const externalLinks = storyData.external_links || null;
  const relatedJourneySlug = storyData.related_journey_slug || null;

  return { story, mapData, externalLinks, relatedJourneySlug };
}

async function getRelatedStories(currentStory: Story, currentSlug: string) {
  try {
    const allStories = await getStories({ published: true });
    const stories = allStories.map((s) => ({
      slug: s.slug,
      title: s.title,
      subtitle: s.subtitle || undefined,
      category: s.category || undefined,
      sourceType: undefined,
      heroImage: s.hero_image || undefined,
      heroCaption: undefined,
      excerpt: s.excerpt || undefined,
      body: undefined,
      readTime: undefined,
      year: undefined,
      textBy: undefined,
      imagesBy: undefined,
      sources: undefined,
      the_facts: undefined,
      tags: s.tags || undefined,
      region: s.region || undefined,
    } satisfies Story));

    const related = stories.filter((s) => {
      if (s.slug === currentSlug) return false;
      if (s.category && currentStory.category && s.category === currentStory.category) return true;
      if (s.tags && currentStory.tags) {
        const sTags = s.tags.toLowerCase().split(",").map((t) => t.trim());
        const storyTags = currentStory.tags.toLowerCase().split(",").map((t) => t.trim());
        if (sTags.some((t) => storyTags.includes(t))) return true;
      }
      if (s.region && currentStory.region && s.region === currentStory.region) return true;
      return false;
    });

    return related.slice(0, 3);
  } catch {
    return [];
  }
}

async function getRelatedJourneysSSR(story: Story) {
  try {
    const allJourneys = await getJourneys({ published: true });
    const journeysForMatcher = allJourneys.map((j) => ({
      slug: j.slug || "",
      title: j.title || "",
      destinations: j.destinations || "",
      focus: j.focus_type || "",
      heroImage: j.hero_image_url || "",
      duration: j.duration_days || 0,
      price: j.price_eur || 0,
    }));

    return findRelatedJourneys(
      story.region || "",
      story.tags || "",
      story.category || "",
      journeysForMatcher,
      3
    );
  } catch {
    return [];
  }
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const storyResult = await getStoryData(slug);

  if (!storyResult) {
    notFound();
  }

  const { story, mapData, externalLinks } = storyResult;
  const relatedStories = await getRelatedStories(story, slug);
  const relatedJourneys = await getRelatedJourneysSSR(story);
  const storyImages = await getStoryImages(slug);

  // Find prev/next stories
  const allStoriesList = await getStories({ published: true });
  const currentIndex = allStoriesList.findIndex((s) => s.slug === slug);
  const prevStory = currentIndex > 0 ? { slug: allStoriesList[currentIndex - 1].slug, title: allStoriesList[currentIndex - 1].title } : null;
  const nextStory = currentIndex < allStoriesList.length - 1 ? { slug: allStoriesList[currentIndex + 1].slug, title: allStoriesList[currentIndex + 1].title } : null;

  const BASE_URL = "https://www.slowmorocco.com";
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    description: story.excerpt || story.subtitle || "",
    url: `${BASE_URL}/stories/${slug}`,
    dateModified: new Date().toISOString(),
    author: {
      "@type": "Person",
      name: "J. Ng",
      worksFor: { "@type": "Organization", name: "Dancing with Lions", url: "https://www.dancingwiththelions.com" },
    },
    publisher: {
      "@type": "Organization",
      name: "Slow Morocco",
      url: BASE_URL,
      parentOrganization: { "@type": "Organization", name: "Dancing with Lions", url: "https://www.dancingwiththelions.com" },
    },
    about: { "@type": "Place", name: "Morocco" },
    ...(story.category || story.tags ? { keywords: [story.category, ...(story.tags ? story.tags.replace(/[{}]/g, '').split(',').map((t: string) => t.trim()) : [])].filter(Boolean).join(', ') } : {}),
    ...(story.heroImage ? { image: story.heroImage } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <StoryDetailContent
        story={story}
        images={storyImages}
        relatedStories={relatedStories}
        relatedJourneys={relatedJourneys}
        slug={slug}
        mapData={mapData}
        externalLinks={externalLinks}
        prevStory={prevStory}
        nextStory={nextStory}
      />
    </>
  );
}
