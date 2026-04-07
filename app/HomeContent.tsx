"use client";

import { useState, useEffect } from "react";
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
  heroImage?: string;
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
  places: any[];
  mapPlaces: any[];
  testimonials: Testimonial[];
  settings: Record<string, string>;
  destinations: Destination[];
}

// ─── City list for tab grid ─────────────────────────────────────────────────

const CITY_SLUGS = [
  "marrakech", "fes", "essaouira", "chefchaouen", "tangier",
  "casablanca", "rabat", "ouarzazate", "merzouga", "dakhla"
];

// ─── Main Component ─────────────────────────────────────────────────────────

export default function HomeContent({
  journeys,
  epicJourneys,
  stories,
  testimonials,
  destinations = [],
}: HomeContentProps) {
  const [activeTab, setActiveTab] = useState<"cities" | "journeys" | "day-trips">("cities");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);

  const heroImages = [
    "https://res.cloudinary.com/dngrqk2wz/image/upload/w_2400,q_auto,f_auto/v1775334808/1_oqxsit.png",
    "https://res.cloudinary.com/dngrqk2wz/image/upload/w_2400,q_auto,f_auto/v1775335043/Bernadeta_Kupiec_-_Morocco-605_ajx3h2.jpg",
    "https://res.cloudinary.com/dngrqk2wz/image/upload/w_2400,q_auto,f_auto/v1775334905/2_hmpek7.png",
    "https://res.cloudinary.com/dngrqk2wz/image/upload/w_2400,q_auto,f_auto/v1775334910/3_tzxa54.png",
    "https://res.cloudinary.com/dngrqk2wz/image/upload/w_2400,q_auto,f_auto/v1775334915/4_dkhnnl.png",
  ];

  // Slow crossfade — 6 seconds per image
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const cityDestinations = destinations.filter((d) => CITY_SLUGS.includes(d.slug));
  const topJourneys = journeys.slice(0, 6);
  const featuredStories = stories.filter((s) => s.heroImage).slice(0, 3);

  return (
    <main className="min-h-screen bg-white">

      {/* ══════════════════════════════════════════════════
          HERO — Crossfading images, quiet and immersive
          ══════════════════════════════════════════════════ */}
      <section className="relative h-[110vh] min-h-[700px] overflow-hidden bg-[#0a0a0a]">
        {heroImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="Morocco"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[2000ms] ease-in-out ${
              i === heroIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-end px-8 md:px-10 lg:px-14 pb-16 md:pb-24">
          <div>
            <h1 className="text-white/90 text-lg md:text-xl tracking-[0.15em] uppercase font-normal mb-3">
              Morocco, decoded
            </h1>
            <p className="text-white/40 text-sm md:text-base max-w-md mb-10 leading-relaxed tracking-[0.01em]">
              Private journeys through a country most guides only scratch the surface of.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/places"
                className="inline-flex items-center px-6 py-3 bg-white/90 text-[#1C1917] text-xs tracking-[0.08em] uppercase hover:bg-white transition-colors"
              >
                Explore Places
              </Link>
              <Link
                href="/journeys"
                className="inline-flex items-center px-6 py-3 border border-white/25 text-white/70 text-xs tracking-[0.08em] uppercase hover:bg-white/10 hover:text-white transition-colors"
              >
                Plan a Journey
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          NAVIGATE — Tabbed entry points
          ══════════════════════════════════════════════════ */}
      <section className="px-8 md:px-10 lg:px-14 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-light tracking-[-0.01em] text-[#1C1917] mb-10">
          Start here
        </h2>

        <div className="flex gap-8 mb-10 border-b border-[#1C1917]/10">
          {(["cities", "journeys", "day-trips"] as const).map((key) => {
            const labels = { cities: "By City", journeys: "Journeys", "day-trips": "Day Trips" };
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`pb-3 text-sm tracking-[0.04em] transition-colors ${
                  activeTab === key
                    ? "text-[#1C1917] border-b-2 border-[#1C1917]"
                    : "text-[#1C1917]/40 hover:text-[#1C1917]/60"
                }`}
              >
                {labels[key]}
              </button>
            );
          })}
        </div>

        {/* Cities */}
        {activeTab === "cities" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {cityDestinations.map((dest) => (
              <Link key={dest.slug} href={`/${dest.slug}`} className="group block">
                <div className="aspect-[4/5] relative overflow-hidden bg-[#f0eeeb] mb-3">
                  {dest.hero_image && (
                    <img
                      src={cloudinaryUrl(dest.hero_image, 400)}
                      alt={dest.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  )}
                </div>
                <h3 className="text-sm tracking-[0.04em] text-[#1C1917] group-hover:text-[#1C1917]/60 transition-colors">
                  {dest.title}
                </h3>
                {dest.subtitle && (
                  <p className="text-[11px] text-[#1C1917]/40 mt-0.5 line-clamp-1">{dest.subtitle}</p>
                )}
              </Link>
            ))}
            <Link
              href="/places"
              className="group flex items-center justify-center aspect-[4/5] border border-[#1C1917]/10 hover:border-[#1C1917]/20 transition-colors"
            >
              <span className="text-sm text-[#1C1917]/40 group-hover:text-[#1C1917]/60 transition-colors tracking-[0.04em]">
                All places →
              </span>
            </Link>
          </div>
        )}

        {/* Journeys */}
        {activeTab === "journeys" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topJourneys.map((j) => (
              <Link key={j.slug} href={`/journeys/${j.slug}`} className="group block">
                <div className="aspect-[16/10] relative overflow-hidden bg-[#f0eeeb] mb-3">
                  {j.heroImage && (
                    <img
                      src={cloudinaryUrl(j.heroImage, 600)}
                      alt={j.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  )}
                  {j.duration && (
                    <div className="absolute top-3 left-3 bg-white/90 px-2.5 py-1 text-[10px] tracking-[0.06em] uppercase text-[#1C1917]">
                      {j.duration}
                    </div>
                  )}
                </div>
                <h3 className="text-sm tracking-[0.02em] text-[#1C1917] group-hover:text-[#1C1917]/60 transition-colors">
                  {j.title}
                </h3>
                {j.destinations && (
                  <p className="text-[11px] text-[#1C1917]/40 mt-0.5">{j.destinations}</p>
                )}
                {j.price && j.price > 0 && (
                  <p className="text-[11px] text-[#1C1917]/40 mt-0.5">From €{j.price.toLocaleString()} per person</p>
                )}
              </Link>
            ))}
            <Link
              href="/journeys"
              className="group flex items-center justify-center aspect-[16/10] border border-[#1C1917]/10 hover:border-[#1C1917]/20 transition-colors"
            >
              <span className="text-sm text-[#1C1917]/40 group-hover:text-[#1C1917]/60 transition-colors tracking-[0.04em]">
                All journeys →
              </span>
            </Link>
          </div>
        )}

        {/* Day Trips */}
        {activeTab === "day-trips" && (
          <div className="max-w-2xl">
            <p className="text-[#1C1917]/60 text-base leading-relaxed mb-8">
              Half-day and full-day trips from Marrakech into the Atlas Mountains, Essaouira, Ouzoud Falls, and the Agafay Desert. Private transport, local guides, no groups.
            </p>
            <Link
              href="/day-trips"
              className="inline-flex items-center px-8 py-3.5 bg-[#1C1917] text-white text-sm tracking-[0.06em] uppercase hover:bg-[#1C1917]/80 transition-colors"
            >
              View Day Trips
            </Link>
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════════════════
          TESTIMONIALS
          ══════════════════════════════════════════════════ */}
      {testimonials.length > 0 && (
        <section className="py-16 md:py-24 border-t border-[#1C1917]/[0.06]">
          <div className="max-w-3xl mx-auto px-8 md:px-10 text-center">
            <p className="font-serif text-xl md:text-2xl italic text-[#1C1917]/70 leading-relaxed">
              &ldquo;{testimonials[testimonialIndex]?.quote}&rdquo;
            </p>
            <p className="text-[11px] text-[#1C1917]/35 tracking-[0.1em] uppercase mt-6">
              {testimonials[testimonialIndex]?.author}
              {testimonials[testimonialIndex]?.journeyTitle && (
                <span> — {testimonials[testimonialIndex].journeyTitle}</span>
              )}
            </p>
            {testimonials.length > 1 && (
              <div className="flex justify-center gap-1.5 mt-6">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIndex(i)}
                    className={`w-1 h-1 rounded-full transition-colors ${
                      i === testimonialIndex ? "bg-[#1C1917]/40" : "bg-[#1C1917]/10"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          DEPTH SIGNAL — 3 stories as proof, not as feed
          ══════════════════════════════════════════════════ */}
      {featuredStories.length > 0 && (
        <section className="px-8 md:px-10 lg:px-14 py-16 md:py-24 border-t border-[#1C1917]/[0.06]">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-light tracking-[-0.01em] text-[#1C1917]">
              The depth behind the guide
            </h2>
            <Link
              href="/stories"
              className="text-[11px] text-[#1C1917]/40 tracking-[0.06em] uppercase hover:text-[#1C1917]/60 transition-colors hidden md:block"
            >
              All Stories →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {featuredStories.map((story) => (
              <Link key={story.slug} href={`/stories/${story.slug}`} className="group block">
                <div className="aspect-[16/10] relative overflow-hidden bg-[#f0eeeb] mb-3">
                  {story.heroImage && (
                    <img
                      src={cloudinaryUrl(story.heroImage, 600)}
                      alt={story.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  )}
                </div>
                {story.category && (
                  <p className="text-[10px] text-[#1C1917]/35 tracking-[0.06em] uppercase mb-1">{story.category}</p>
                )}
                <h3 className="text-sm tracking-[0.02em] text-[#1C1917] group-hover:text-[#1C1917]/60 transition-colors leading-snug">
                  {story.title}
                </h3>
                {story.subtitle && (
                  <p className="text-[11px] text-[#1C1917]/40 mt-1 line-clamp-2 leading-relaxed">{story.subtitle}</p>
                )}
              </Link>
            ))}
          </div>
          <Link
            href="/stories"
            className="text-[11px] text-[#1C1917]/40 tracking-[0.06em] uppercase hover:text-[#1C1917]/60 transition-colors mt-8 block md:hidden"
          >
            All Stories →
          </Link>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          CONVERT
          ══════════════════════════════════════════════════ */}
      <section className="bg-[#1C1917] text-white py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-8 md:px-10 lg:px-14 text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-[-0.01em] mb-4">
            Ready to go?
          </h2>
          <p className="text-white/50 text-base leading-relaxed mb-10">
            Tell us what you&apos;re drawn to. We&apos;ll build something around it.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3.5 bg-white text-[#1C1917] text-sm tracking-[0.06em] uppercase hover:bg-white/90 transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              href="/start-here"
              className="inline-flex items-center px-8 py-3.5 border border-white/20 text-white text-sm tracking-[0.06em] uppercase hover:bg-white/10 transition-colors"
            >
              Start Here
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
