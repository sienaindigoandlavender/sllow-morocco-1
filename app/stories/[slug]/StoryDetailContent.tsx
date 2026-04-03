"use client";

import { cloudinaryUrl } from "@/lib/cloudinary";
import Link from "next/link";
import StoryBody from "@/components/StoryBody";
import ShareTools from "@/components/ShareTools";
import SeasonalBadge from "@/components/SeasonalBadge";
import dynamic from "next/dynamic";
import NewsletterCapture from "@/components/NewsletterCapture";

const StoryMapRenderer = dynamic(() => import("@/components/StoryMapRenderer"), { ssr: false });

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

interface StoryImage {
  id: number;
  story_slug: string;
  image_url: string;
  caption: string | null;
  attribution: string | null;
  license: string | null;
  license_url: string | null;
  source_url: string | null;
  position: number;
  width: number | null;
  height: number | null;
}

interface RelatedJourney {
  slug: string;
  title: string;
  heroImage?: string;
  duration?: number;
  price?: number;
  score: number;
}

interface NavItem {
  slug: string;
  title: string;
}

interface StoryDetailContentProps {
  story: Story;
  images: StoryImage[];
  relatedStories: Story[];
  relatedJourneys: RelatedJourney[];
  slug: string;
  mapData?: any;
  externalLinks?: Array<{ label: string; url: string; type?: string }> | null;
  prevStory?: NavItem | null;
  nextStory?: NavItem | null;
}

export default function StoryDetailContent({
  story,
  images,
  relatedStories,
  relatedJourneys,
  slug,
  mapData,
  externalLinks,
  prevStory,
  nextStory,
}: StoryDetailContentProps) {
  const sources = story.sources
    ? story.sources.split(";;").map((s) => s.trim()).filter(Boolean)
    : [];

  const facts = story.the_facts
    ? story.the_facts.split(";;").map((f) => f.trim()).filter(Boolean)
    : [];

  const tags = story.tags
    ? story.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const culturalKeywords = ["gnawa", "amazigh", "berber", "artisan", "maalem", "zellige", "medina", "kasbah", "riad", "souk", "hammam", "khettara"];
  const culturalEntities = tags.filter(tag =>
    culturalKeywords.some(keyword => tag.toLowerCase().includes(keyword))
  );

  const sovereignEntity = {
    "@type": "Organization",
    "@id": "https://www.slowmorocco.com/#organization",
    name: "Slow Morocco",
    url: "https://www.slowmorocco.com",
  };

  const datePublished = story.year ? `${story.year}-01-01T00:00:00Z` : new Date().toISOString();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://www.slowmorocco.com/stories/${slug}#article`,
    headline: story.title,
    alternativeHeadline: story.subtitle || undefined,
    description: story.excerpt || story.subtitle || story.title,
    image: story.heroImage ? cloudinaryUrl(story.heroImage, 1200) : undefined,
    author: sovereignEntity,
    publisher: sovereignEntity,
    datePublished,
    dateModified: datePublished,
    mainEntityOfPage: `https://www.slowmorocco.com/stories/${slug}`,
    isPartOf: {
      "@type": "WebSite",
      name: "Slow Morocco",
      url: "https://www.slowmorocco.com",
    },
    about: culturalEntities.length > 0
      ? culturalEntities.map((entity) => ({ "@type": "Thing", name: entity }))
      : undefined,
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      {/* ══════════════════════════════════════════════════════════════
          HERO — Full-bleed image with title overlaid (Kinfolk style)
          ══════════════════════════════════════════════════════════════ */}
      {story.heroImage ? (
        <section className="relative h-[100svh] min-h-[600px]">
          <img
            src={cloudinaryUrl(story.heroImage, 1920)}
            alt={story.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/15" />

          {/* Title on image — bottom left, massive */}
          <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-12 lg:px-16 pb-14 md:pb-20">
            {story.category && (
              <p className="text-[10px] tracking-[0.25em] uppercase text-white/50 mb-4">
                {story.category}
              </p>
            )}
            <h1
              className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-[1.1] max-w-5xl"
            >
              {story.title}
            </h1>
            {story.subtitle && (
              <p className="font-serif text-white/60 text-lg md:text-xl mt-4 max-w-2xl leading-relaxed">
                {story.subtitle}
              </p>
            )}
          </div>
        </section>
      ) : (
        <section className="bg-[#0a0a0a] pt-32 md:pt-40 pb-16 md:pb-24">
          <div className="px-8 md:px-12 lg:px-16 max-w-5xl">
            {story.category && (
              <p className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-4">
                {story.category}
              </p>
            )}
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-[1.1] max-w-5xl">
              {story.title}
            </h1>
            {story.subtitle && (
              <p className="font-serif text-white/50 text-lg md:text-xl mt-4 max-w-2xl leading-relaxed">
                {story.subtitle}
              </p>
            )}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          META BAR — category, author, read time, share
          ══════════════════════════════════════════════════════════════ */}
      <div className="border-b border-foreground/10">
        <div className="max-w-3xl mx-auto px-8 md:px-12 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11px] tracking-[0.12em] uppercase text-foreground/35">
            {story.category && (
              <Link
                href={`/stories/category/${story.category.toLowerCase()}`}
                className="hover:text-foreground/60 transition-colors"
              >
                {story.category}
              </Link>
            )}
            {story.readTime && <span>{story.readTime} min</span>}
          </div>
          <ShareTools
            title={story.title}
            description={story.subtitle || story.excerpt}
            imageUrl={story.heroImage}
          />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          BODY — Single centered column, no sidebar
          ══════════════════════════════════════════════════════════════ */}
      <article className="max-w-3xl mx-auto px-8 md:px-12 py-14 md:py-20">

        {/* Body text */}
        {story.body && <StoryBody content={story.body} inlineImages={images} currentSlug={slug} />}

        {/* Seasonal */}
        {story.category && (
          <div className="my-10">
            <SeasonalBadge category={story.category} region={story.region} variant="story" />
          </div>
        )}

        {/* Map */}
        {mapData?.markers?.length > 0 && (
          <>
            <hr className="border-foreground/10 my-12" />
            <StoryMapRenderer mapData={mapData} title={story.title} />
          </>
        )}

        {/* Journey bridge */}
        {story.journeyBridge && (
          <div className="my-12 py-8 border-t border-b border-foreground/10">
            <p className="text-foreground/60 italic font-serif text-lg leading-relaxed">
              {story.journeyBridge}
            </p>
            <Link
              href="/plan-your-trip"
              className="inline-block mt-4 text-[10px] tracking-[0.2em] uppercase text-foreground/35 hover:text-foreground/60 transition-colors"
            >
              Tell us about your trip →
            </Link>
          </div>
        )}

        {/* Embed */}
        {story.embedUrl && (
          <>
            <hr className="border-foreground/10 my-12" />
            <iframe
              src={story.embedUrl}
              title={`${story.title} — Interactive Module`}
              className="w-full border-0"
              style={{ height: "80vh", minHeight: "600px" }}
              loading="lazy"
              allow="fullscreen"
            />
            <p className="text-[11px] text-foreground/30 mt-3 text-center">
              Data and visualisation by{" "}
              <a href={story.embedUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                Dancing with Lions
              </a>
            </p>
          </>
        )}

        {/* Facts */}
        {facts.length > 0 && (
          <>
            <hr className="border-foreground/10 my-12" />
            <div>
              <h3 className="text-[10px] tracking-[0.25em] uppercase text-foreground/35 mb-6">
                The Facts
              </h3>
              <ul className="space-y-3">
                {facts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/60 leading-relaxed">
                    <span className="text-foreground/20 mt-0.5 flex-shrink-0">—</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Sources */}
        {sources.length > 0 && (
          <>
            <hr className="border-foreground/10 my-12" />
            <div>
              <h3 className="text-[10px] tracking-[0.25em] uppercase text-foreground/35 mb-4">
                Sources
              </h3>
              <ul className="space-y-2">
                {sources.map((source, i) => (
                  <li key={i} className="text-sm text-foreground/35 leading-relaxed">{source}</li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Further reading */}
        {externalLinks && externalLinks.length > 0 && (
          <div className="mt-8">
            <h3 className="text-[10px] tracking-[0.25em] uppercase text-foreground/35 mb-4">
              Further Reading
            </h3>
            <div className="flex flex-wrap gap-2">
              {externalLinks.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="text-[11px] tracking-[0.1em] uppercase text-foreground/35 hover:text-foreground/60 border border-foreground/10 hover:border-foreground/25 px-3 py-1.5 transition-colors">
                  {link.label} ↗
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Footer credits + tags */}
        <hr className="border-foreground/10 my-12" />
        <footer>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-foreground/30 mb-8">
            {story.year && <span>{story.year}</span>}
            <span>© Slow Morocco</span>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <Link
                  key={i}
                  href={`/stories?q=${encodeURIComponent(tag)}`}
                  className="text-[10px] tracking-[0.12em] uppercase text-foreground/30 hover:text-foreground/50 border border-foreground/10 hover:border-foreground/25 px-3 py-1.5 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </footer>

      </article>

      {/* ══════════════════════════════════════════════════════════════
          PREV / NEXT NAVIGATION
          ══════════════════════════════════════════════════════════════ */}
      {(prevStory || nextStory) && (
        <div className="max-w-3xl mx-auto px-8 md:px-12 border-t border-foreground/10">
          <div className="grid grid-cols-2 divide-x divide-foreground/10 py-1">
            <div className="pr-8 py-8">
              {prevStory && (
                <Link href={`/stories/${prevStory.slug}`} className="group block">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-2">← Previous</p>
                  <p className="font-serif text-base text-foreground/70 group-hover:text-foreground transition-colors duration-300 leading-snug">
                    {prevStory.title}
                  </p>
                </Link>
              )}
            </div>
            <div className="pl-8 py-8 text-right">
              {nextStory && (
                <Link href={`/stories/${nextStory.slug}`} className="group block">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-2">Next →</p>
                  <p className="font-serif text-base text-foreground/70 group-hover:text-foreground transition-colors duration-300 leading-snug">
                    {nextStory.title}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          THE EDIT — Newsletter capture
          ══════════════════════════════════════════════════════════════ */}
      <div className="max-w-3xl mx-auto px-8 md:px-12">
        <NewsletterCapture />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          RELATED STORIES — sage editorial panel
          ══════════════════════════════════════════════════════════════ */}
      {relatedStories.length > 0 && (
        <section className="bg-[#c8c4b8]/30 py-20 md:py-28">
          <div className="px-8 md:px-16 lg:px-20">
            <div className="text-center mb-14 md:mb-16">
              <p className="text-[11px] tracking-[0.3em] uppercase text-foreground/30 mb-3">
                Keep Reading
              </p>
              <h2 className="font-serif text-2xl md:text-[1.75rem] text-foreground/80">
                More from the archive.
              </h2>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10">
              {relatedStories.slice(0, 3).map((s) => (
                <Link key={s.slug} href={`/stories/${s.slug}`} className="group">
                  <div className="aspect-[29/39] relative overflow-hidden bg-[#d5d0c8] mb-4">
                    {s.heroImage ? (
                      <img
                        src={cloudinaryUrl(s.heroImage, 480)}
                        alt={s.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[1.2s] ease-out"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[#d5d0c8]" />
                    )}
                  </div>
                  {s.category && (
                    <p className="text-[10px] text-foreground/40 mb-1.5">
                      {s.category}
                    </p>
                  )}
                  <h3 className="text-[12px] tracking-[0.04em] uppercase leading-[1.35] text-foreground group-hover:text-foreground/60 transition-colors duration-500">
                    {s.title}
                  </h3>
                  {s.excerpt && (
                    <p className="text-[11.5px] text-foreground/45 leading-[1.5] mt-1 line-clamp-2">
                      {s.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/stories"
                className="text-[11px] tracking-[0.15em] uppercase text-foreground/35 hover:text-foreground/60 transition-colors"
              >
                All stories
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          RELATED JOURNEYS — dark editorial panel
          ══════════════════════════════════════════════════════════════ */}
      {relatedJourneys.length > 0 && (
        <section className="py-20 md:py-28 border-t border-foreground/[0.08]">
          <div className="px-8 md:px-16 lg:px-20">
            <div className="text-center mb-14 md:mb-16">
              <p className="text-[11px] tracking-[0.3em] uppercase text-foreground/30 mb-3">
                Private Journeys
              </p>
              <h2 className="font-serif text-2xl md:text-[1.75rem] text-foreground/80">
                Travel through this region.
              </h2>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10">
              {relatedJourneys.slice(0, 3).map((journey) => (
                <Link key={journey.slug} href={`/journeys/${journey.slug}`} className="group">
                  <div className="aspect-[29/39] relative overflow-hidden bg-[#e8e6e1] mb-4">
                    {journey.heroImage && (
                      <img
                        src={cloudinaryUrl(journey.heroImage, 480)}
                        alt={journey.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[1.2s] ease-out"
                      />
                    )}
                  </div>
                  <p className="text-[10px] text-foreground/40 mb-1.5">
                    {journey.duration && journey.duration > 0
                      ? `${journey.duration}-Day Journey`
                      : "Private Journey"}
                  </p>
                  <h3 className="text-[12px] tracking-[0.04em] uppercase leading-[1.35] text-foreground group-hover:text-foreground/60 transition-colors duration-500">
                    {journey.title}
                  </h3>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/journeys"
                className="text-[11px] tracking-[0.15em] uppercase text-foreground/35 hover:text-foreground/60 transition-colors"
              >
                All journeys
              </Link>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
