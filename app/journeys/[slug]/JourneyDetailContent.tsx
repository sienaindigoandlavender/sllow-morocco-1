"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import { linkGlossaryTermsText } from "@/lib/glossary-linker";
import ShareTools from "@/components/ShareTools";

const ItineraryMap = dynamic(() => import("@/components/ItineraryMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[350px] md:h-[400px] bg-[#f5f5f5] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
    </div>
  ),
});

interface Journey {
  slug: string;
  title: string;
  duration: string;
  durationDays: number;
  description: string;
  arcDescription: string;
  heroImage: string;
  startCity: string;
  focus: string;
  destinations: string;
  journeyId: string;
  journeyType?: string;
  epicPrice?: number;
  price?: number;
}

interface ItineraryDay {
  dayNumber: number;
  cityName: string;
  description: string;
  imageUrl: string;
}

// Day image that hides itself if the URL is broken
function DayImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <div className="relative aspect-[3/4] w-full max-w-lg overflow-hidden mb-8">
      <img
        src={cloudinaryUrl(src)}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

// Journeys Carousel Component
function JourneysCarousel({ journeys }: { journeys: Journey[] }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;
    const cardWidth = 280 + 24;
    const scrollAmount = direction === "left" ? -cardWidth * 2 : cardWidth * 2;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollPosition(containerRef.current.scrollLeft);
    }
  };

  if (journeys.length === 0) return null;

  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = containerRef.current
    ? scrollPosition < containerRef.current.scrollWidth - containerRef.current.clientWidth - 10
    : true;

  return (
    <div className="relative">
      <button
        onClick={() => scroll("left")}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center transition-opacity ${
          canScrollLeft ? "opacity-100 hover:bg-muted" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto scrollbar-hide px-12"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {journeys.map((journey) => (
          <Link
            key={journey.slug}
            href={`/journeys/${journey.slug}`}
            className="flex-shrink-0 w-[280px] group"
          >
            <div className="relative aspect-[4/5] mb-3 overflow-hidden bg-[#f0f0f0]">
              {journey.heroImage && (
                <img
                  src={cloudinaryUrl(journey.heroImage)}
                  alt={journey.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
              )}
            </div>
            <h3 className="font-serif text-lg mb-1">{journey.title}</h3>
            <div className="flex items-baseline justify-between">
              <p className="text-xs text-muted-foreground tracking-wide">
                {journey.durationDays} Days
              </p>
            </div>
          </Link>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center transition-opacity ${
          canScrollRight ? "opacity-100 hover:bg-muted" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

interface RelatedStory {
  slug: string;
  title: string;
  category?: string;
  heroImage?: string;
  excerpt?: string;
  score: number;
}

interface NavItem {
  slug: string;
  title: string;
}

interface JourneyDetailContentProps {
  journey: Journey;
  itinerary: ItineraryDay[];
  otherJourneys: Journey[];
  relatedStories: RelatedStory[];
  slug: string;
  prevJourney?: NavItem | null;
  nextJourney?: NavItem | null;
}

export default function JourneyDetailContent({
  journey,
  itinerary,
  otherJourneys,
  relatedStories,
  slug,
  prevJourney,
  nextJourney,
}: JourneyDetailContentProps) {

  // EPIC Journey Layout
  if (journey.journeyType === 'epic') {
    return (
      <div className="bg-background min-h-screen text-foreground">
        {/* Hero Image */}
        <section className="relative h-[70vh] md:h-[80vh]">
          {journey.heroImage ? (
            <img
              src={cloudinaryUrl(journey.heroImage)}
              alt={journey.title}
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            />
          ) : (
            <div className="absolute inset-0 bg-foreground/10" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="container mx-auto max-w-4xl">
              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] mb-4">
                {journey.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
            <Link
              href="/journeys"
              className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-foreground/60 hover:text-foreground transition-colors mb-16"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Journeys
            </Link>

            <div className="mb-20">
              <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed font-display italic">
                {linkGlossaryTermsText(journey.description)}
              </p>
            </div>

            {journey.arcDescription && (
              <div className="mb-20">
                <p className="text-foreground/50 leading-relaxed text-lg whitespace-pre-line">
                  {linkGlossaryTermsText(journey.arcDescription)}
                </p>
              </div>
            )}

            <div className="border-t border-foreground/10 pt-16 mb-16">
              <h2 className="text-xs tracking-[0.3em] uppercase text-[#8B2635] mb-8">
                Sacred Knowledge
              </h2>
              <p className="text-foreground/50 leading-relaxed">
                This is not a tour. This is transmission — access to knowledge held by 
                a handful of people alive today. Knowledge that took lifetimes to acquire 
                and cannot be found in any book, on any website, or through any other operator.
              </p>
              <p className="text-foreground/50 leading-relaxed mt-4">
                We earned the trust that makes these journeys possible — 
                not as visitors, but as people who stayed. We do not share itineraries publicly. 
                We do not reveal our sources. We protect what is rare because that is how it stays rare.
              </p>
            </div>

            <div className="border-t border-foreground/10 pt-16 mb-16">
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 mb-6">
                <span className="font-serif text-4xl md:text-5xl text-foreground">
                  Price on request
                </span>
                <span className="text-sm text-foreground/60">
                  Private journey for two guests
                </span>
              </div>
              <p className="text-foreground/60 text-sm">
                Additional guests considered on a case-by-case basis.
              </p>
            </div>

            <div className="border-t border-foreground/10 pt-16 mb-20">
              <h2 className="text-xs tracking-[0.3em] uppercase text-foreground/60 mb-8">
                How This Works
              </h2>
              <div className="space-y-6 text-foreground/70 leading-relaxed">
                <p>
                  <strong className="text-foreground">1. You inquire.</strong> Tell us who you are, 
                  why this journey calls to you, and when you'd like to travel.
                </p>
                <p>
                  <strong className="text-foreground">2. We respond.</strong> If we believe this 
                  journey is right for you, we'll arrange a conversation.
                </p>
                <p>
                  <strong className="text-foreground">3. You commit.</strong> A non-refundable 
                  deposit of <span className="text-[#8B2635] font-medium">€1,000</span> secures 
                  your place and unlocks the full itinerary, logistics, and preparation details.
                </p>
                <p>
                  <strong className="text-foreground">4. We build.</strong> Your journey is crafted 
                  specifically for your dates, interests, and pace.
                </p>
              </div>
              <p className="text-foreground/60 text-sm mt-8 italic">
                The deposit is applied to your final balance. It is non-refundable because 
                the itinerary itself is the value — once shared, it cannot be unshared.
              </p>
            </div>

            <div className="bg-foreground/[0.03] p-8 md:p-12">
              <h2 className="font-serif text-2xl md:text-3xl mb-8">
                Request This Journey
              </h2>
              
              <form 
                action="/api/plan-your-trip" 
                method="POST"
                className="space-y-6"
              >
                <input type="hidden" name="journey" value={journey.title} />
                <input type="hidden" name="journeyType" value="epic" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-foreground/60 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full bg-transparent border-b border-foreground/15 py-3 text-foreground focus:border-foreground focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-foreground/60 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full bg-transparent border-b border-foreground/15 py-3 text-foreground focus:border-foreground focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-foreground/60 mb-2">
                      Preferred Dates
                    </label>
                    <input
                      type="text"
                      name="dates"
                      placeholder="e.g., March 2025"
                      className="w-full bg-transparent border-b border-foreground/15 py-3 text-foreground placeholder:text-foreground/25 focus:border-foreground focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-foreground/60 mb-2">
                      Number of Guests
                    </label>
                    <input
                      type="number"
                      name="guests"
                      min="1"
                      max="8"
                      placeholder="2"
                      className="w-full bg-transparent border-b border-foreground/15 py-3 text-foreground placeholder:text-foreground/25 focus:border-foreground focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-foreground/60 mb-2">
                    Tell us about yourself
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="What draws you to this journey? Any relevant experience?"
                    className="w-full bg-transparent border-b border-foreground/15 py-3 text-foreground placeholder:text-foreground/25 focus:border-foreground focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full md:w-auto bg-foreground text-background px-12 py-4 text-xs tracking-[0.2em] uppercase hover:bg-foreground/90 transition-colors"
                  >
                    Request Details
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Regular Journey Layout
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Image with title overlay */}
      <section className="relative h-[100svh] min-h-[600px] bg-[#f0f0f0]">
        {journey.heroImage && (
          <img
            src={cloudinaryUrl(journey.heroImage)}
            alt={journey.title}
            className="absolute inset-0 w-full h-full object-cover"
            />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/15" />

        {/* Title on image — days + title only */}
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-12 lg:px-16 pb-14 md:pb-20">
          <p className="text-[10px] tracking-[0.25em] uppercase text-white/50 mb-4">
            {journey.durationDays} Days
          </p>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-[1.1] max-w-5xl">
            {journey.title}
          </h1>
        </div>
      </section>

      {/* Blurb — below the hero */}
      {(journey.arcDescription || journey.description) && (
        <section className="border-b border-foreground/10">
          <div className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16 py-10 md:py-14">
            <p className="font-serif text-foreground/60 text-lg md:text-xl leading-relaxed">
              {journey.arcDescription || journey.description}
            </p>
          </div>
        </section>
      )}

      {/* Meta bar */}
      <div className="border-b border-foreground/10">
        <div className="max-w-3xl mx-auto px-8 md:px-12 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11px] tracking-[0.12em] uppercase text-foreground/35">
            <Link href="/journeys" className="hover:text-foreground/60 transition-colors">Journeys</Link>
            <span>{journey.durationDays} Days</span>
            {journey.startCity && <span>From {journey.startCity}</span>}
          </div>
          <ShareTools
            title={journey.title}
            description={journey.arcDescription || journey.description}
            imageUrl={journey.heroImage}
          />
        </div>
      </div>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl">

          {itinerary.length > 0 && (
            <div className="mb-16">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                Your Route
              </p>
              <ItineraryMap itinerary={itinerary} />
            </div>
          )}

          <div className="space-y-20">
            {itinerary
              .sort((a, b) => a.dayNumber - b.dayNumber)
              .map((day) => (
                <div key={day.dayNumber}>
                  {day.imageUrl && (
                    <DayImage src={day.imageUrl} alt={`Day ${day.dayNumber} - ${day.cityName}`} />
                  )}

                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                    Day {day.dayNumber}
                  </p>

                  <h2 className="font-serif text-2xl md:text-3xl mb-4">
                    {day.cityName}
                  </h2>

                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {linkGlossaryTermsText(day.description)}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ── Other Journeys — sage editorial panel (journeys first) ──── */}
      {otherJourneys.length > 0 && (
        <section className="bg-[#c8c4b8]/30 py-20 md:py-28">
          <div className="px-8 md:px-10 lg:px-14">
            <div className="text-center mb-14 md:mb-16">
              <p className="text-[11px] tracking-[0.3em] uppercase text-foreground/30 mb-3">
                Explore More
              </p>
              <h2 className="font-serif text-2xl md:text-[1.75rem] text-foreground/80">
                Other journeys across Morocco.
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 md:gap-x-5 gap-y-10">
              {otherJourneys.slice(0, 6).map((journey) => (
                <Link key={journey.slug} href={`/journeys/${journey.slug}`} className="group block">
                  <div className="aspect-[29/39] relative overflow-hidden bg-[#d5d0c8] mb-3.5">
                    {journey.heroImage && (
                      <img
                        src={cloudinaryUrl(journey.heroImage, 480)}
                        alt={journey.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[1.2s] ease-out"
                      />
                    )}
                  </div>
                  <p className="text-[10px] text-foreground/40 mb-1.5">
                    {journey.durationDays} Days
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

      {/* ── Related Stories — dark editorial panel ─────────────────── */}
      {relatedStories.length > 0 && (
        <section className="py-20 md:py-28 border-t border-foreground/[0.08]">
          <div className="px-8 md:px-10 lg:px-14">
            <div className="text-center mb-14 md:mb-16">
              <p className="text-[11px] tracking-[0.3em] uppercase text-foreground/30 mb-3">
                From the Archive
              </p>
              <h2 className="font-serif text-2xl md:text-[1.75rem] text-foreground/80">
                Stories from this route.
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 md:gap-x-5 gap-y-10">
              {relatedStories.slice(0, 6).map((story) => (
                <Link key={story.slug} href={`/stories/${story.slug}`} className="group block">
                  <div className="aspect-[29/39] relative overflow-hidden bg-[#e8e6e1] mb-3.5">
                    {story.heroImage ? (
                      <img
                        src={cloudinaryUrl(story.heroImage, 480)}
                        alt={story.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[1.2s] ease-out"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[#e8e6e1]" />
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
    </div>
  );
}
