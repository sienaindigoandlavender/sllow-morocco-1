"use client";

import { cloudinaryUrl } from "@/lib/cloudinary";
import Link from "next/link";
import dynamic from "next/dynamic";

// Lazy load map — it's heavy
const HomeCityMap = dynamic(() => import("@/components/HomeCityMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#0d0d0d] flex items-center justify-center">
      <p className="text-[10px] tracking-[0.4em] uppercase text-white/15">Morocco</p>
    </div>
  ),
});

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

interface Place {
  slug: string;
  title: string;
  heroImage?: string;
  destination?: string;
  category?: string;
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
  places: Place[];
  mapPlaces: any[];
  testimonials: Testimonial[];
  settings: Record<string, string>;
  destinations: Destination[];
}

// ─── Vertical tile — reused for stories, places, journeys ───────────────────

function StoryTile({ story }: { story: Story }) {
  return (
    <Link href={`/stories/${story.slug}`} className="group block min-w-0">
      <div className="aspect-[3/4] relative overflow-hidden bg-[#f0eeeb] mb-4">
        {story.heroImage && (
          <img
            src={cloudinaryUrl(story.heroImage, 600)}
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
      <h3 className="text-[13px] tracking-[0.04em] text-[#0a0a0a] group-hover:text-[#0a0a0a]/50 transition-colors leading-snug">
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

// ─── Section header with rule line ──────────────────────────────────────────

function SectionHeader({ title, href, linkText = "View All" }: { title: string; href: string; linkText?: string }) {
  return (
    <>
      <div className="flex items-baseline justify-between mb-2">
        <h2 className="text-[15px] md:text-base font-light tracking-[-0.01em] text-[#0a0a0a]">
          {title}
        </h2>
        <Link
          href={href}
          className="text-[11px] text-[#0a0a0a]/35 tracking-[0.04em] hover:text-[#0a0a0a]/60 transition-colors"
        >
          {linkText}
        </Link>
      </div>
      <div className="border-t border-[#0a0a0a] mb-10" />
    </>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function HomeContent({
  journeys,
  stories,
  places,
  destinations = [],
}: HomeContentProps) {
  const lead = stories[0];
  const issueRow = stories.slice(1, 7);
  const feature = stories[7];
  const secondRow = stories.slice(8, 14);
  const featuredJourneys = journeys.slice(0, 6);
  const featuredPlaces = places.slice(0, 6);

  return (
    <main className="min-h-screen bg-white">

      {/* ══════════════════════════════════════════════════
          1. HERO — Full viewport, single lead story
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

            {/* Lead story text — bottom left */}
            <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-10 lg:px-14 pb-10 md:pb-14 lg:pb-16">
              <div className="max-w-xl lg:max-w-lg">
                <h1 className="text-white text-[clamp(1.6rem,4.5vw,3rem)] font-light tracking-[-0.01em] leading-[1.1] mb-2">
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
          2. THE EDIT — 6 vertical tiles, full-width row
          ══════════════════════════════════════════════════ */}
      {issueRow.length > 0 && (
        <section className="px-6 md:px-10 lg:px-14 pt-20 md:pt-28 pb-16 md:pb-24">
          <SectionHeader title="The Edit" href="/stories" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
            {issueRow.map((story) => (
              <StoryTile key={story.slug} story={story} />
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          3. MAP — Interactive Morocco, visual break
          Dark, full-width, city dots with hover info
          ══════════════════════════════════════════════════ */}
      <section className="relative h-[60vh] min-h-[450px] md:h-[65vh]">
        <HomeCityMap />
        {/* Map CTA overlay — bottom right */}
        <div className="absolute bottom-6 right-6 z-10">
          <Link
            href="/places/map"
            className="text-[10px] tracking-[0.1em] uppercase text-white/40 hover:text-white/70 transition-colors bg-black/40 backdrop-blur-sm px-4 py-2"
          >
            Explore 200+ places on map →
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. FEATURE MOMENT — Centered large type + portrait
          Editorial pause
          ══════════════════════════════════════════════════ */}
      {feature && (
        <section className="py-16 md:py-28">
          <Link href={`/stories/${feature.slug}`} className="group block text-center">
            <div className="max-w-3xl mx-auto px-6 md:px-10 mb-10 md:mb-14">
              <h2 className="text-[clamp(1.8rem,4vw,3.2rem)] font-light text-[#0a0a0a] leading-[1.15] tracking-[-0.02em] mb-4 group-hover:text-[#0a0a0a]/60 transition-colors">
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
          5. PLACES — 6 vertical tiles
          ══════════════════════════════════════════════════ */}
      {featuredPlaces.length > 0 && (
        <section className="px-6 md:px-10 lg:px-14 py-16 md:py-24 border-t border-[#0a0a0a]/[0.08]">
          <SectionHeader title="Places" href="/places" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
            {featuredPlaces.map((p) => (
              <Link key={p.slug} href={`/places/${p.slug}`} className="group block min-w-0">
                <div className="aspect-[3/4] relative overflow-hidden bg-[#f0eeeb] mb-4">
                  {p.heroImage && (
                    <img
                      src={cloudinaryUrl(p.heroImage, 600)}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    />
                  )}
                </div>
                {p.category && (
                  <span className="text-[10px] text-[#0a0a0a]/40 tracking-[0.1em] uppercase block mb-1">
                    {p.category}
                  </span>
                )}
                <h3 className="text-[13px] tracking-[0.04em] text-[#0a0a0a] group-hover:text-[#0a0a0a]/50 transition-colors leading-snug">
                  {p.title}
                </h3>
                {p.destination && (
                  <p className="text-[12px] text-[#0a0a0a]/40 mt-1">{p.destination}</p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          6. FULL-BLEED STORY — Image with text overlay
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
          7. MORE STORIES — second tile row
          ══════════════════════════════════════════════════ */}
      {secondRow.length > 1 && (
        <section className="px-6 md:px-10 lg:px-14 pt-20 md:pt-28 pb-16 md:pb-24">
          <SectionHeader title="More from The Edit" href="/stories" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {secondRow.slice(1).map((story) => (
              <StoryTile key={story.slug} story={story} />
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          8. THOUGHT STARTERS — Square image left, large title right
          Kinfolk "Thought Starters" register
          ══════════════════════════════════════════════════ */}
      {stories.length > 14 && (
        <section className="px-6 md:px-10 lg:px-14 py-16 md:py-24 border-t border-[#0a0a0a]/[0.08]">
          <SectionHeader title="Going Deeper" href="/stories" />
          <div className="divide-y divide-[#0a0a0a]/[0.08]">
            {stories.slice(14, 17).map((story) => (
              <Link
                key={story.slug}
                href={`/stories/${story.slug}`}
                className="group flex gap-6 md:gap-10 py-8 md:py-10 items-start"
              >
                {/* Square image — left */}
                {story.heroImage && (
                  <div className="w-[140px] md:w-[180px] shrink-0 aspect-square relative overflow-hidden bg-[#f0eeeb]">
                    <img
                      src={cloudinaryUrl(story.heroImage, 400)}
                      alt={story.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  </div>
                )}
                {/* Title + subtitle — center, large */}
                <div className="flex-1 min-w-0 pt-1">
                  <h3 className="text-[clamp(1.2rem,2.5vw,2rem)] font-light text-[#0a0a0a] leading-[1.15] tracking-[-0.01em] group-hover:text-[#0a0a0a]/50 transition-colors">
                    {story.title}
                  </h3>
                  {story.subtitle && (
                    <p className="text-[clamp(1rem,2vw,1.5rem)] font-light text-[#0a0a0a]/50 leading-[1.2] mt-1">
                      {story.subtitle}
                    </p>
                  )}
                </div>
                {/* Category — far right */}
                {story.category && (
                  <span className="text-[10px] text-[#0a0a0a]/30 tracking-[0.06em] uppercase shrink-0 hidden md:block pt-2">
                    {story.category}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          9. JOURNEYS — Same tile language
          ══════════════════════════════════════════════════ */}
      {featuredJourneys.length > 0 && (
        <section className="px-6 md:px-10 lg:px-14 py-16 md:py-24 border-t border-[#0a0a0a]/[0.08]">
          <SectionHeader title="Private Journeys" href="/journeys" />
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
                <h3 className="text-[13px] tracking-[0.04em] text-[#0a0a0a] group-hover:text-[#0a0a0a]/50 transition-colors leading-snug">
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

    </main>
  );
}
