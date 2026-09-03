"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

/**
 * EPIC Carousel — homepage feature band.
 * Deliberately distinct from the white editorial tiles: dark, cinematic,
 * serif, deep-red accent — signalling "this is the extraordinary layer."
 * Rotates through the EPIC journeys and links to /epic.
 */

type EpicSlide = {
  slug: string;
  tier: string;
  title: string;
  tagline: string;
};

const SLIDES: EpicSlide[] = [
  {
    slug: "gnawa-road",
    tier: "The Sacred",
    title: "The Gnawa Road",
    tagline: "Not a performance. A passage. A private lila, the full night, the real thing.",
  },
  {
    slug: "navigation-by-stars",
    tier: "The Desert",
    title: "Navigation by Stars",
    tagline: "No GPS. No phone. The sky read the way humans read it for ten thousand years.",
  },
  {
    slug: "tracking-the-sahara",
    tier: "The Wild",
    title: "Tracking the Sahara",
    tagline: "The desert is not empty. It is written in a language your tracker can read.",
  },
  {
    slug: "architecture-pilgrimage",
    tier: "The Built",
    title: "The Architecture Pilgrimage",
    tagline: "Kasbahs, ksour, pisé. Structural literacy, not sightseeing.",
  },
  {
    slug: "little-prince-route",
    tier: "The Poetic",
    title: "The Little Prince Route",
    tagline: "Sleep where he slept. Walk the desert that wrote the book.",
  },
];

const INTERVAL = 6000;

export default function EpicCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((n: number) => {
    setIndex((n + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => clearInterval(t);
  }, [paused]);

  const active = SLIDES[index];

  return (
    <section
      className="relative bg-[#0a0a0a] text-white overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="EPIC journeys"
    >
      {/* subtle grain, matching the /epic page */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 px-6 md:px-10 lg:px-14 py-20 md:py-28">
        {/* label */}
        <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#78716C] mb-10 md:mb-14">
          Slow Morocco Presents — EPIC
        </p>

        {/* slide */}
        <Link href="/epic" className="group block max-w-3xl min-h-[200px] md:min-h-[240px]">
          <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#8B2635] block mb-5">
            {active.tier}
          </span>
          <h2 className="font-serif text-[clamp(2.25rem,6vw,4.5rem)] font-light leading-[0.95] tracking-[-0.01em] mb-6 transition-opacity duration-500 group-hover:opacity-80">
            {active.title}
          </h2>
          <p className="font-serif text-lg md:text-2xl text-[#a8a29e] italic leading-relaxed max-w-2xl">
            {active.tagline}
          </p>
        </Link>

        {/* controls row */}
        <div className="flex items-center justify-between mt-12 md:mt-16">
          {/* dots */}
          <div className="flex items-center gap-3">
            {SLIDES.map((s, i) => (
              <button
                key={s.slug}
                onClick={() => go(i)}
                aria-label={`Show ${s.title}`}
                className={`h-[2px] transition-all duration-500 ${
                  i === index ? "w-8 bg-[#8B2635]" : "w-4 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/epic"
            className="font-sans text-[11px] tracking-[0.3em] uppercase border border-[#8B2635] text-[#8B2635] px-8 py-3.5 hover:bg-[#8B2635] hover:text-white transition-all duration-500 shrink-0"
          >
            The EPIC journeys
          </Link>
        </div>
      </div>
    </section>
  );
}
