"use client";

import { useState } from "react";
import { cloudinaryUrl } from "@/lib/cloudinary";
import Link from "next/link";

// ─── Types ──────────────────────────────────────────────────────────────────

interface Journey {
  slug: string;
  title: string;
  description?: string;
  heroImage?: string;
  duration?: string;
  destinations?: string;
  journeyType?: string;
  price?: number;
}

interface Story {
  slug: string;
  title: string;
  subtitle?: string;
  excerpt?: string;
  heroImage?: string;
  category?: string;
  read_time?: string;
}

interface Destination {
  slug: string;
  title: string;
  subtitle?: string;
  hero_image?: string;
  region?: string;
}

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  journeyTitle?: string;
}

interface HomeContentProps {
  journeys: Journey[];
  epicJourneys: Journey[];
  stories: Story[];
  places: any[];
  mapPlaces: any[];
  testimonials: Testimonial[];
  settings: Record<string, string>;
  destinations: Destination[];
}

// ─── Vertical tile card — reused throughout ─────────────────────────────────

function StoryTile({ story, imageWidth = 600 }: { story: Story; imageWidth?: number }) {
  return (
    <Link href={`/stories/${story.slug}`} className="group block min-w-0">
      <div className="aspect-[3/4] relative overflow-hidden bg-[#f0eeeb] mb-4">
        {story.heroImage && (
          <img
            src={cloudinaryUrl(story.heroImage, imageWidth)}
            alt={story.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
          />
        )}
      </div>
      {story.category && (
        <span className="text-[10px] text-[#0a0a0a]/40 tracking-[0.1em] uppercase block mb-1">
          {story.category}
        </span>
      )}
      <h3 className="text-[13px] tracking-[0.04em] text-[#0a0a0a] group-hover:text-[#0a0a0a]/50 transition-colors leading-snug uppercase">
        {story.title}
      </h3>
      {story.subtitle && (
        <p className="text-[12px] text-[#0a0a0a]/45 mt-1 leading-relaxed line-clamp-2">
          {story.subtitle}
        </p>
      )}
    </Link>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function HomeContent({
  journeys,
  stories,
  destinations = [],
}: HomeContentProps) {
  // Editorial slots
  const lead = stories[0];
  const issueRow = stories.slice(1, 7);       // 6 tiles — "Inside the Edit"
  const feature = stories[7];                   // Centered feature moment
  const secondRow = stories.slice(8, 14);       // 6 more tiles
  const featuredJourneys = journeys.slice(0, 6);

  return (
    <main className="min-h-screen bg-white">

      {/* ══════════════════════════════════════════════════
          1. HERO — Full viewport, single lead story
          Title bottom-left, latest stories index bottom-right
          ══════════════════════════════════════════════════ */}
      {lead && (
        <Link href={`/stories/${lead.slug}`} className="group block">
          <section className="relative h-screen min-h-[700px] overflow-hidden bg-[#0a0a0a]">
            {lead.heroImage && (
              <img
                src={cloudinaryUrl(lead.heroImage, 2400)}
                alt={lead.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-[1200ms]"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* Latest stories index — bottom right */}
            <div className="absolute bottom-0 right-0 bg-white/95 backdrop-blur-sm px-6 py-5 hidden lg:block w-[320px]">
              <span className="text-[10px] tracking-[0.12em] uppercase text-[#0a0a0a]/40 block mb-3">
                Latest Stories
              </span>
              <div className="space-y-2">
                {issueRow.slice(0, 5).map((s) => (
                  <div key={s.slug} className="flex items-baseline gap-3">
                    <span className="text-[10px] text-[#0a0a0a]/30 tracking-[0.04em] uppercase shrink-0 w-[80px]">
                      {s.category}
                    </span>
                    <span className="text-[12px] text-[#0a0a0a]/80 leading-tight truncate">
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lead story text — bottom left */}
            <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-10 lg:px-14 pb-10 md:pb-14 lg:pb-16">
              <div className="max-w-xl lg:max-w-lg">
                <h1 className="text-white text-[clamp(1.6rem,4.5vw,3rem)] font-light tracking-[-0.01em] leading-[1.1] uppercase mb-2">
                  {lead.title}
                </h1>
                {lead.subtitle && (
                  <p className="text-white/55 text-sm md:text-[15px] leading-relaxed">
                    {lead.subtitle}
                  </p>
                )}
              </div>
            </div>
          </section>
        </Link>
      )}

      {/* ══════════════════════════════════════════════════
          2. "THE EDIT" — Section label + rule + 6 vertical tiles
          Full-width row, not scrolling
          ══════════════════════════════════════════════════ */}
      {issueRow.length > 0 && (
        <section className="px-6 md:px-10 lg:px-14 pt-20 md:pt-28 pb-16 md:pb-24">
          {/* Section header with rule */}
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="text-[15px] md:text-base font-light tracking-[-0.01em] text-[#0a0a0a]">
              The Edit
            </h2>
            <Link
              href="/stories"
              className="text-[11px] text-[#0a0a0a]/35 tracking-[0.04em] hover:text-[#0a0a0a]/60 transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="border-t border-[#0a0a0a] mb-10" />

          {/* 6-tile row — fills the width */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
            {issueRow.map((story) => (
              <StoryTile key={story.slug} story={story} />
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          3. FEATURE MOMENT — Centered large type + portrait
          The editorial pause between tile rows
          ══════════════════════════════════════════════════ */}
      {feature && (
        <section className="py-16 md:py-28">
          <Link href={`/stories/${feature.slug}`} className="group block text-center">
            <div className="max-w-3xl mx-auto px-6 md:px-10 mb-10 md:mb-14">
              <h2 className="text-[clamp(1.8rem,4vw,3.2rem)] font-light text-[#0a0a0a] leading-[1.15] tracking-[-0.02em] uppercase mb-4 group-hover:text-[#0a0a0a]/60 transition-colors">
                {feature.title}
              </h2>
              {feature.subtitle && (
                <p className="text-[#0a0a0a]/50 text-base md:text-lg leading-relaxed font-light">
                  {feature.subtitle}
                </p>
              )}
              {feature.category && (
                <span className="text-[10px] text-[#0a0a0a]/30 tracking-[0.1em] uppercase mt-4 block">
                  {feature.category}
                </span>
              )}
            </div>
            {feature.heroImage && (
              <div className="max-w-md mx-auto px-6">
                <div className="aspect-[3/4] relative overflow-hidden bg-[#f0eeeb]">
                  <img
                    src={cloudinaryUrl(feature.heroImage, 800)}
                    alt={feature.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>
              </div>
            )}
          </Link>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          4. FULL-BLEED STORY — Image with text overlay
          ══════════════════════════════════════════════════ */}
      {secondRow[0] && (
        <Link href={`/stories/${secondRow[0].slug}`} className="group block">
          <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-[#0a0a0a]">
            {secondRow[0].heroImage && (
              <img
                src={cloudinaryUrl(secondRow[0].heroImage, 2400)}
                alt={secondRow[0].title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-[1200ms]"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
            <div className="relative z-10 px-6 md:px-10 lg:px-14 pt-10 md:pt-14">
              <span className="text-white/40 text-[11px] tracking-[0.1em] uppercase block mb-2">
                {secondRow[0].category}
              </span>
              <h2 className="text-white text-lg md:text-xl font-light leading-snug max-w-md">
                {secondRow[0].subtitle || secondRow[0].title}
              </h2>
            </div>
          </section>
        </Link>
      )}

      {/* ══════════════════════════════════════════════════
          5. SECOND TILE ROW — remaining stories
          ══════════════════════════════════════════════════ */}
      {secondRow.length > 1 && (
        <section className="px-6 md:px-10 lg:px-14 pt-20 md:pt-28 pb-16 md:pb-24">
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="text-[15px] md:text-base font-light tracking-[-0.01em] text-[#0a0a0a]">
              More from The Edit
            </h2>
            <Link
              href="/stories"
              className="text-[11px] text-[#0a0a0a]/35 tracking-[0.04em] hover:text-[#0a0a0a]/60 transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="border-t border-[#0a0a0a] mb-10" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {secondRow.slice(1).map((story) => (
              <StoryTile key={story.slug} story={story} />
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          6. JOURNEYS — Same tile language, own section
          ══════════════════════════════════════════════════ */}
      {featuredJourneys.length > 0 && (
        <section className="px-6 md:px-10 lg:px-14 py-16 md:py-24 border-t border-[#0a0a0a]/[0.08]">
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="text-[15px] md:text-base font-light tracking-[-0.01em] text-[#0a0a0a]">
              Private Journeys
            </h2>
            <Link
              href="/journeys"
              className="text-[11px] text-[#0a0a0a]/35 tracking-[0.04em] hover:text-[#0a0a0a]/60 transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="border-t border-[#0a0a0a] mb-10" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
            {featuredJourneys.map((j) => (
              <Link key={j.slug} href={`/journeys/${j.slug}`} className="group block min-w-0">
                <div className="aspect-[3/4] relative overflow-hidden bg-[#f0eeeb] mb-4">
                  {j.heroImage && (
                    <img
                      src={cloudinaryUrl(j.heroImage, 600)}
                      alt={j.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    />
                  )}
                  {j.duration && (
                    <div className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 text-[10px] tracking-[0.06em] uppercase text-[#0a0a0a]">
                      {j.duration}
                    </div>
                  )}
                </div>
                <h3 className="text-[13px] tracking-[0.04em] text-[#0a0a0a] group-hover:text-[#0a0a0a]/50 transition-colors leading-snug uppercase">
                  {j.title}
                </h3>
                {j.destinations && (
                  <p className="text-[12px] text-[#0a0a0a]/40 mt-1">{j.destinations}</p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          7. SPLIT FEATURE — Text left, tall image right
          Photo essay pattern from Kinfolk
          ══════════════════════════════════════════════════ */}
      {stories[7] && stories[7].heroImage && (
        <section className="border-t border-[#0a0a0a]/[0.08]">
          <Link href={`/stories/${stories[7].slug}`} className="group block">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
              <div className="flex flex-col justify-center px-6 md:px-10 lg:px-14 py-16 lg:py-24">
                {stories[7].category && (
                  <span className="text-[10px] text-[#0a0a0a]/35 tracking-[0.1em] uppercase block mb-4">
                    {stories[7].category}
                  </span>
                )}
                <h2 className="text-[clamp(1.4rem,3vw,2.2rem)] font-light text-[#0a0a0a] leading-[1.15] tracking-[-0.01em] uppercase mb-3 group-hover:text-[#0a0a0a]/60 transition-colors">
                  {stories[7].title}
                </h2>
                {stories[7].subtitle && (
                  <p className="text-[#0a0a0a]/45 text-sm md:text-[15px] leading-relaxed max-w-md">
                    {stories[7].subtitle}
                  </p>
                )}
              </div>
              <div className="relative min-h-[400px] lg:min-h-0 overflow-hidden bg-[#f0eeeb]">
                <img
                  src={cloudinaryUrl(stories[7].heroImage!, 1200)}
                  alt={stories[7].title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          8. DESTINATIONS — compact text links
          ══════════════════════════════════════════════════ */}
      {destinations.length > 0 && (
        <section className="px-6 md:px-10 lg:px-14 py-12 md:py-16 border-t border-[#0a0a0a]/[0.08]">
          <h2 className="text-[11px] text-[#0a0a0a]/30 tracking-[0.1em] uppercase mb-5">
            By City
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-1.5">
            {destinations.slice(0, 12).map((d) => (
              <Link
                key={d.slug}
                href={`/${d.slug}`}
                className="text-sm text-[#0a0a0a]/50 hover:text-[#0a0a0a] transition-colors py-1"
              >
                {d.title}
              </Link>
            ))}
          </div>
        </section>
      )}

    </main>
  );
}
