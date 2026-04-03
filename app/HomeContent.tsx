"use client";

import { useState, useEffect } from "react";
import { cloudinaryUrl } from "@/lib/cloudinary";
import Link from "next/link";
import HomePlacesMap from "./HomePlacesMap";
import NewsletterCapture from "@/components/NewsletterCapture";

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
  epicPrice?: number;
}

interface Story {
  slug: string;
  title: string;
  subtitle?: string;
  excerpt?: string;
  heroImage?: string;
  mood?: string;
  category?: string;
  read_time?: number;
}

interface Place {
  slug: string;
  title: string;
  heroImage?: string;
  destination?: string;
  category?: string;
}

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  journeyTitle?: string;
}

interface MapPlace {
  slug: string;
  title: string;
  category: string;
  destination: string;
  latitude: number;
  longitude: number;
}

interface HomeContentProps {
  journeys: Journey[];
  epicJourneys: Journey[];
  stories: Story[];
  places: Place[];
  mapPlaces: MapPlace[];
  testimonials: Testimonial[];
  settings: Record<string, string>;
}

// ─── Story Card ─────────────────────────────────────────────────────────────

function StoryCard({ story, priority = false }: { story: Story; priority?: boolean }) {
  return (
    <Link href={`/stories/${story.slug}`} className="group block">
      <div className="aspect-[29/39] relative overflow-hidden bg-[#e8e6e1] mb-3.5">
        {story.heroImage && (
          <img
            src={cloudinaryUrl(story.heroImage, 480)}
            alt={story.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[1.2s] ease-out"
          />
        )}
      </div>
      {story.category && (
        <p className="text-[10px] text-foreground/40 mb-1.5">
          {story.category}
        </p>
      )}
      <h3 className="text-[12px] tracking-[0.04em] uppercase leading-[1.35] text-foreground group-hover:text-foreground/60 transition-colors duration-500">
        {story.title}
      </h3>
      {story.subtitle && (
        <p className="text-[11.5px] text-foreground/45 leading-[1.5] mt-1 line-clamp-2">
          {story.subtitle}
        </p>
      )}
    </Link>
  );
}

// ─── Journey Card ───────────────────────────────────────────────────────────

function JourneyCard({ journey }: { journey: Journey }) {
  return (
    <Link href={`/journeys/${journey.slug}`} className="group block">
      <div className="aspect-[29/39] relative overflow-hidden bg-[#e8e6e1] mb-3.5">
        {journey.heroImage && (
          <img
            src={cloudinaryUrl(journey.heroImage, 480)}
            alt={journey.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[1.2s] ease-out"
          />
        )}
      </div>
      <p className="text-[10px] text-foreground/40 mb-1.5">
        {journey.duration ? `${journey.duration} Journey` : "Private Journey"}
      </p>
      <h3 className="text-[12px] tracking-[0.04em] uppercase leading-[1.35] text-foreground group-hover:text-foreground/60 transition-colors duration-500">
        {journey.title}
      </h3>
      {journey.description && (
        <p className="text-[11.5px] text-foreground/45 leading-[1.5] mt-1 line-clamp-2">
          {journey.description}
        </p>
      )}
    </Link>
  );
}

// ─── Place Card ─────────────────────────────────────────────────────────────

function PlaceCard({ place }: { place: Place }) {
  return (
    <Link href={`/places/${place.slug}`} className="group block">
      <div className="aspect-[29/39] relative overflow-hidden bg-[#e8e6e1] mb-3.5">
        {place.heroImage && (
          <img
            src={cloudinaryUrl(place.heroImage, 480)}
            alt={place.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[1.2s] ease-out"
          />
        )}
      </div>
      {place.destination && (
        <p className="text-[10px] text-foreground/40 mb-1.5 capitalize">
          {place.destination}
        </p>
      )}
      <h3 className="text-[12px] tracking-[0.04em] uppercase leading-[1.35] text-foreground group-hover:text-foreground/60 transition-colors duration-500">
        {place.title}
      </h3>
    </Link>
  );
}

// ─── Editorial Section Header (with rule line) ──────────────────────────────

function SectionHeader({ title, linkHref, linkLabel }: {
  title: string;
  linkHref?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="font-serif text-xl md:text-2xl text-foreground">
          {title}
        </h2>
        {linkHref && linkLabel && (
          <Link
            href={linkHref}
            className="text-[11px] text-foreground/40 hover:text-foreground/70 transition-colors"
          >
            {linkLabel}
          </Link>
        )}
      </div>
      <div className="h-[1px] bg-foreground/15" />
    </div>
  );
}

// ─── Main ───────────────────────────────────────────────────────────────────

export default function HomeContent({
  journeys,
  epicJourneys,
  stories,
  places,
  mapPlaces,
  testimonials,
  settings,
}: HomeContentProps) {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const heroImage = settings.hero_image_url;

  // Auto-rotate testimonials every 6 seconds
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Editorial curation
  const leadStory = stories[0];
  const rowOne = stories.slice(1, 7);
  const rowTwo = stories.slice(7, 13);
  const interstitialJourney = journeys[0];
  const journeyRow = journeys
    .filter((j) => j.slug !== interstitialJourney?.slug)
    .slice(0, 6);

  return (
    <div className="bg-background min-h-screen">

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Magazine cover
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative h-screen h-[100svh] min-h-[700px] overflow-hidden">
        {leadStory?.heroImage ? (
          <img
            src={cloudinaryUrl(leadStory.heroImage, 1920)}
            alt={leadStory.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : heroImage ? (
          <img
            src={cloudinaryUrl(heroImage, 1920)}
            alt="Slow Morocco"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[#2a2520]" />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70" />

        {/* Cover content */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="px-8 md:px-12 lg:px-16 pb-16 md:pb-20 flex items-end justify-between gap-12">
            {leadStory && (
              <Link
                href={`/stories/${leadStory.slug}`}
                className="group max-w-2xl lg:max-w-3xl"
              >
                {leadStory.category && (
                  <p className="text-[10px] tracking-[0.25em] uppercase text-white/50 mb-4">
                    {leadStory.category}
                  </p>
                )}
                <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-4 group-hover:text-white/80 transition-colors duration-500">
                  {leadStory.title}
                </h2>
                {leadStory.subtitle && (
                  <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-xl">
                    {leadStory.subtitle}
                  </p>
                )}
                <span className="inline-block mt-6 text-[11px] tracking-[0.15em] uppercase text-white/50 group-hover:text-white transition-colors border-b border-white/25 pb-0.5">
                  Read
                </span>
              </Link>
            )}

            {/* Latest Stories sidebar — desktop only */}
            <div className="hidden lg:block flex-shrink-0 w-[280px]">
              <p className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-4">
                From the Archive
              </p>
              <div className="space-y-2.5">
                {stories.slice(1, 9).map((story, i) => (
                  <Link
                    key={story.slug}
                    href={`/stories/${story.slug}`}
                    className={`flex items-baseline gap-3 group/item ${
                      i === 0 ? "text-white" : "text-white/50 hover:text-white/80"
                    } transition-colors`}
                  >
                    <span className="text-[10px] text-white/30 tracking-[0.15em] uppercase flex-shrink-0 w-16">
                      {story.category || ""}
                    </span>
                    <span className={`text-[12px] leading-snug ${
                      i === 0 ? "text-white font-medium" : ""
                    }`}>
                      {story.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          STORIES ROW ONE — 6 across, Kinfolk editorial strip
          ═══════════════════════════════════════════════════════════════════ */}
      {rowOne.length > 0 && (
        <section className="px-8 md:px-10 lg:px-14 pt-14 md:pt-20 pb-16 md:pb-24">
          <SectionHeader
            title="Stories from Slow Morocco."
            linkHref="/stories"
            linkLabel="View All"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 md:gap-x-5 gap-y-10">
            {rowOne.map((story, i) => (
              <StoryCard key={story.slug} story={story} priority={i < 2} />
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          FULL-BLEED INTERSTITIAL — A journey as editorial feature
          ═══════════════════════════════════════════════════════════════════ */}
      {interstitialJourney && (
        <section className="relative h-[70vh] min-h-[450px] max-h-[850px]">
          {interstitialJourney.heroImage && (
            <img
              src={cloudinaryUrl(interstitialJourney.heroImage, 1920)}
              alt={interstitialJourney.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
          <Link
            href={`/journeys/${interstitialJourney.slug}`}
            className="absolute inset-0 flex flex-col justify-end group"
          >
            <div className="px-8 md:px-12 lg:px-16 pb-14 md:pb-20 max-w-3xl">
              <p className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-4">
                {interstitialJourney.duration ? `${interstitialJourney.duration} Journey` : "Private Journey"}
              </p>
              <h2 className="font-serif text-3xl md:text-5xl text-white leading-[1.1] mb-3 group-hover:text-white/80 transition-colors duration-500">
                {interstitialJourney.title}
              </h2>
              {interstitialJourney.description && (
                <p className="text-sm text-white/50 leading-relaxed max-w-lg">
                  {interstitialJourney.description}
                </p>
              )}
            </div>
          </Link>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          JOURNEYS — 6 across, same editorial treatment
          ═══════════════════════════════════════════════════════════════════ */}
      {journeyRow.length > 0 && (
        <section className="px-8 md:px-10 lg:px-14 pt-14 md:pt-20 pb-16 md:pb-24">
          <SectionHeader
            title="Private journeys across Morocco."
            linkHref="/journeys"
            linkLabel="View All"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 md:gap-x-5 gap-y-10">
            {journeyRow.map((journey) => (
              <JourneyCard key={journey.slug} journey={journey} />
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          TESTIMONIALS — quiet, centered, editorial
          ═══════════════════════════════════════════════════════════════════ */}
      {testimonials.length > 0 && (
        <section className="py-20 md:py-28 border-t border-foreground/[0.08]">
          <div className="px-8 md:px-10 lg:px-14">
            <div className="max-w-3xl mx-auto text-center">
              <div className="transition-opacity duration-700 ease-in-out">
                <blockquote className="font-serif text-xl md:text-2xl lg:text-[1.7rem] leading-[1.5] text-foreground/70 mb-6">
                  &ldquo;{testimonials[testimonialIndex]?.quote}&rdquo;
                </blockquote>
                <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/35">
                  — {testimonials[testimonialIndex]?.author}
                  {testimonials[testimonialIndex]?.journeyTitle && (
                    <span className="text-foreground/20 ml-2">· {testimonials[testimonialIndex].journeyTitle}</span>
                  )}
                </p>
              </div>
              {testimonials.length > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setTestimonialIndex(idx)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                        idx === testimonialIndex ? "bg-foreground/40 scale-110" : "bg-foreground/10"
                      }`}
                      aria-label={`Testimonial ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          PLACES — 6 across, editorial
          ═══════════════════════════════════════════════════════════════════ */}
      {places.length > 0 && (
        <section className="px-8 md:px-10 lg:px-14 pt-14 md:pt-20 pb-16 md:pb-24 border-t border-foreground/[0.08]">
          <SectionHeader
            title="Places worth knowing."
            linkHref="/places"
            linkLabel="View All"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 md:gap-x-5 gap-y-10">
            {places.map((place) => (
              <PlaceCard key={place.slug} place={place} />
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          MAP STRIP — all places on one map
          ═══════════════════════════════════════════════════════════════════ */}
      {mapPlaces.length > 0 && (
        <HomePlacesMap places={mapPlaces} />
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          THOUGHT STARTERS — horizontal editorial list
          ═══════════════════════════════════════════════════════════════════ */}
      {rowTwo.length > 0 && (
        <section className="border-t border-foreground/[0.08]">
          <div className="px-8 md:px-10 lg:px-14 pt-14 md:pt-16 pb-4">
            <SectionHeader title="Keep Reading." linkHref="/stories" linkLabel="View All" />
          </div>
          <div className="divide-y divide-foreground/[0.06]">
            {rowTwo.map((story) => (
              <Link
                key={story.slug}
                href={`/stories/${story.slug}`}
                className="group flex items-center gap-6 md:gap-10 px-8 md:px-10 lg:px-14 py-5 md:py-6 hover:bg-foreground/[0.02] transition-colors"
              >
                {/* Thumbnail */}
                <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 overflow-hidden bg-foreground/5">
                  {story.heroImage && (
                    <img
                      src={cloudinaryUrl(story.heroImage, 160)}
                      alt={story.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  )}
                </div>
                {/* Category + Title + Subtitle */}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-1.5">
                    {story.category || ""}
                  </p>
                  <h3 className="font-serif text-base md:text-lg lg:text-xl text-foreground leading-snug group-hover:text-foreground/60 transition-colors duration-300">
                    {story.title}
                  </h3>
                  {story.excerpt && (
                    <p className="hidden md:block text-sm text-foreground/40 mt-1 leading-relaxed line-clamp-1">
                      {story.excerpt}
                    </p>
                  )}
                </div>
                {/* Arrow */}
                <span className="hidden md:block text-foreground/20 group-hover:text-foreground/50 transition-colors text-lg flex-shrink-0">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          START HERE CTA
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="px-8 md:px-10 lg:px-14 py-20 md:py-28 border-t border-foreground/[0.08]">
        <div className="max-w-2xl">
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Start Here</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-[1.15] mb-6">
            Not sure where to begin?
          </h2>
          <p className="text-sm text-foreground/50 leading-relaxed mb-8 max-w-lg">
            Five questions. A framework specific to your trip — not a generic itinerary, but the mental map you need before any good decision can be made.
          </p>
          <Link
            href="/start-here"
            className="inline-block px-8 py-3 border border-foreground text-sm tracking-[0.15em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            Get my orientation →
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          DERB — City Guide Banner
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#1C1917] text-[#FAF9F6] py-16 md:py-20 border-t border-foreground/[0.08]">
        <div className="max-w-3xl mx-auto px-8 md:px-10 lg:px-14 text-center">
          <p className="text-[#C2410C] text-[10px] tracking-[0.35em] uppercase mb-6">Before You Go</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#FAF9F6] mb-6" style={{ fontStyle: 'italic' }}>
            Why does everyone say &ldquo;Balak&rdquo;?
          </h2>
          <p className="text-[#A8A29E] text-sm leading-relaxed max-w-md mx-auto mb-8">
            Derb answers the questions Morocco gives you before you think to ask them. Taxis, tipping, the call to prayer at 4am, why Google Maps fails in the medina.
          </p>
          <a
            href="https://www.derb.so"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#C2410C] text-xs tracking-[0.2em] uppercase hover:gap-3 transition-all"
          >
            Open Derb <span className="transition-transform">→</span>
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          NEWSLETTER — The Edit
          ═══════════════════════════════════════════════════════════════════ */}
      <div style={{ background: "#C4724A" }}>
        <NewsletterCapture />
      </div>

    </div>
  );
}
