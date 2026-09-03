import { permanentRedirect } from "next/navigation";
import { Metadata } from "next";
import { getStoryBySlug, getStories, getJourneys, getStoryImages, getPlaces } from "@/lib/supabase";
import { findRelatedJourneys } from "@/lib/content-matcher";
import { getCollectionsForStory } from "@/lib/collections";
import { mapStory, type StoryView as Story } from "@/lib/story-view";
import StoryDetailContent from "./StoryDetailContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";

// redirect_to may be a full URL, an absolute path, or a bare story slug.
function resolveRedirectTarget(value: string): string {
  const v = value.trim();
  if (/^https?:\/\//i.test(v)) return v;
  if (v.startsWith("/")) return v;
  return `/stories/${v}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) return { title: "Story Not Found" };

  const title = `${story.seo_title || story.title}`;
  const description = story.seo_description || story.excerpt || story.subtitle || `${story.title} — a cultural essay by Slow Morocco.`;

  const robots = story.index_status === "noindex" ? { index: false, follow: true } : undefined;

  return {
    title,
    description,
    ...(robots ? { robots } : {}),
    alternates: { canonical: `${BASE_URL}/stories/${slug}` },
    openGraph: {
      title: story.title,
      description,
      url: `${BASE_URL}/stories/${slug}`,
      siteName: "Slow Morocco",
      type: "article",
    },
  };
}

async function getStoryData(slug: string) {
  const storyData = await getStoryBySlug(slug);
  if (!storyData) return null;

  const story = mapStory(storyData);

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

    // Score each candidate by how strongly it relates: shared category,
    // number of shared tags, and shared region each add weight. Ranking by
    // relevance (rather than first-match) tightens the topical cluster —
    // Google reads a well-linked cluster of closely-related pages as topical
    // authority, which lifts the whole group.
    const storyTags = (currentStory.tags || "")
      .toLowerCase()
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const scored = stories
      .filter((s) => s.slug !== currentSlug)
      .map((s) => {
        let score = 0;
        if (s.category && currentStory.category && s.category === currentStory.category) {
          score += 3; // same category is the strongest single signal
        }
        if (s.tags && storyTags.length) {
          const sTags = s.tags.toLowerCase().split(",").map((t) => t.trim());
          const shared = sTags.filter((t) => storyTags.includes(t)).length;
          score += shared * 2; // each shared tag adds weight
        }
        if (s.region && currentStory.region && s.region === currentStory.region) {
          score += 1; // same region is a weaker signal
        }
        return { story: s, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score);

    // Surface up to six, most-related first, for a richer internal-link cluster.
    return scored.slice(0, 6).map((x) => x.story);
  } catch {
    return [];
  }
}

async function getRelatedPlacesSSR(storySlug: string) {
  try {
    const allPlaces = await getPlaces({ published: true });
    // Curator-pinned only: places whose related_story_slugs include this story.
    // Region fallback is intentionally omitted per spec — protects editorial quality.
    return allPlaces
      .filter((p: any) => Array.isArray(p.related_story_slugs) && p.related_story_slugs.includes(storySlug))
      .slice(0, 3)
      .map((p: any) => ({
        slug: p.slug,
        title: p.title,
        category: p.category || "",
        destination: p.destination || "",
        heroImage: p.hero_image || "",
      }));
  } catch {
    return [];
  }
}

// Editorially curated from the story side: stories.mentioned_place_slugs is a
// hand-picked array of place slugs the writer wants to surface for this story.
// Order is preserved (the array order is the editorial order).
async function getMentionedPlacesSSR(slugs: string[] | null | undefined) {
  if (!slugs || slugs.length === 0) return [];
  try {
    const allPlaces = await getPlaces({ published: true });
    const bySlug = new Map(allPlaces.map((p: any) => [p.slug, p]));
    return slugs
      .map((s) => bySlug.get(s))
      .filter((p: any) => Boolean(p))
      .map((p: any) => ({
        slug: p.slug,
        title: p.title,
        category: p.category || "",
        destination: p.destination || "",
        heroImage: p.hero_image || "",
      }));
  } catch {
    return [];
  }
}

async function getRelatedJourneysSSR(story: Story) {
  try {
    const allJourneys = await getJourneys({ published: true });
    const journeysForMatcher = allJourneys
      .filter((j) => j.journey_type !== "daytrip" && j.journey_type !== "overnight")
      .map((j) => ({
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

  // Honour index_status/redirect_to before doing any other fetching.
  const rawStory = await getStoryBySlug(slug);
  if (rawStory?.index_status === "redirect" && rawStory.redirect_to) {
    permanentRedirect(resolveRedirectTarget(rawStory.redirect_to));
  }

  const storyResult = await getStoryData(slug);

  if (!storyResult) {
    // Story was deleted/unpublished in Supabase. 301 to the index
    // instead of serving a 404 — same pattern as /places/[slug].
    // This retires the GSC 404s for /stories/maghreb-compared,
    // /stories/the-horses-of-morocco, /stories/the-atlantic-spine,
    // /stories/the, etc. without manual next.config entries.
    permanentRedirect("/stories");
  }

  const { story, mapData, externalLinks } = storyResult;
  const relatedStories = await getRelatedStories(story, slug);
  const relatedJourneys = await getRelatedJourneysSSR(story);
  const relatedPlaces = await getRelatedPlacesSSR(slug);
  const inCollections = getCollectionsForStory(slug);
  const mentionedPlaces = await getMentionedPlacesSSR(rawStory?.mentioned_place_slugs);
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
    description: story.excerpt || "",
    url: `${BASE_URL}/stories/${slug}`,
    dateModified: new Date().toISOString(),
    author: {
      "@type": "Person",
      name: "J. Ng",
      worksFor: { "@type": "Organization", name: "Dancing with Lions", url: "https://www.dancewithlions.com" },
    },
    publisher: {
      "@type": "Organization",
      name: "Slow Morocco",
      url: BASE_URL,
      parentOrganization: { "@type": "Organization", name: "Dancing with Lions", url: "https://www.dancewithlions.com" },
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
        relatedPlaces={relatedPlaces}
        inCollections={inCollections}
        mentionedPlaces={mentionedPlaces}
        slug={slug}
        mapData={mapData}
        externalLinks={externalLinks}
        prevStory={prevStory}
        nextStory={nextStory}
      />
    </>
  );
}
