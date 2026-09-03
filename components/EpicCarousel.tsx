"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/**
 * EPIC feature — homepage.
 * A distinct treatment, not a sliding banner: a dark, framed panel that sits
 * in white space (separated from the hero). On the left, a large rotating
 * statement for the active journey; on the right, a vertical index of all five
 * that the reader can hover/tap to explore. Reads as "a table of the
 * extraordinary," curated and premium — deliberately unlike the editorial tiles.
 * Ready for background imagery later (see IMG note).
 */

type EpicJourney = {
  slug: string;
  tier: string;
  title: string;
  tagline: string;
};

const JOURNEYS: EpicJourney[] = [
  { slug: "gnawa-road", tier: "The Sacred", title: "The Gnawa Road", tagline: "Not a performance. A passage. A private lila — the full troupe, the full night, the real thing." },
  { slug: "navigation-by-stars", tier: "The Desert", title: "Navigation by Stars", tagline: "No GPS. No phone. The sky read the way humans read it for ten thousand years." },
  { slug: "tracking-the-sahara", tier: "The Wild", title: "Tracking the Sahara", tagline: "The desert is not empty. It is written in a language your tracker can read." },
  { slug: "architecture-pilgrimage", tier: "The Built", title: "The Architecture Pilgrimage", tagline: "Kasbahs, ksour, pisé. Structural literacy, not sightseeing." },
  { slug: "little-prince-route", tier: "The Poetic", title: "The Little Prince Route", tagline: "Sleep where he slept. Walk the desert that wrote the book." },
];

const INTERVAL = 5500;

export default function EpicCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((i) => (i + 1) % JOURNEYS.length), INTERVAL);
    return () => clearInterval(t);
  }, [paused]);

  const j = JOURNEYS[active];

  return (
    // outer wrapper provides the WHITE SPACE that separates this from the hero
    <div className="bg-white px-4 md:px-8 lg:px-14 py-14 md:py-24">
      <section
        className="relative bg-[#0a0a0a] text-white overflow-hidden rounded-sm"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label="EPIC journeys"
      >
        {/* grain */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* IMG NOTE: when Midjourney images are ready, drop a
            <img> here (absolute inset-0, object-cover, opacity ~40%) keyed to
            JOURNEYS[active].slug for a cinematic background. */}

        <div className="relative z-10 grid md:grid-cols-[1.4fr_1fr]">
          {/* LEFT — the active journey, large */}
          <div className="px-7 md:px-12 lg:px-16 py-14 md:py-20 lg:py-24 flex flex-col justify-between min-h-[380px] md:min-h-[460px]">
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#78716C]">
              Slow Morocco Presents — EPIC
            </p>

            <Link href="/epic" className="group block mt-10 md:mt-0">
              <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#8B2635] block mb-5">
                {j.tier}
              </span>
              <h2 className="font-serif text-[clamp(2rem,5.5vw,4rem)] font-light leading-[0.95] tracking-[-0.01em] mb-6 transition-opacity duration-500 group-hover:opacity-80">
                {j.title}
              </h2>
              <p className="font-serif text-lg md:text-xl text-[#a8a29e] italic leading-relaxed max-w-lg">
                {j.tagline}
              </p>
            </Link>

            <Link
              href="/epic"
              className="mt-10 md:mt-0 inline-flex self-start font-sans text-[11px] tracking-[0.3em] uppercase border border-[#8B2635] text-[#8B2635] px-8 py-3.5 hover:bg-[#8B2635] hover:text-white transition-all duration-500"
            >
              Explore EPIC
            </Link>
          </div>

          {/* RIGHT — the vertical index of all five */}
          <div className="border-t md:border-t-0 md:border-l border-white/[0.08]">
            {JOURNEYS.map((item, i) => (
              <button
                key={item.slug}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-label={item.title}
                className={`group w-full text-left px-7 md:px-9 py-4 md:py-[18px] border-b border-white/[0.08] last:border-b-0 flex items-center justify-between transition-colors duration-300 ${
                  i === active ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
                }`}
              >
                <span className="flex items-baseline gap-4">
                  <span className={`font-sans text-[10px] tabular-nums transition-colors ${i === active ? "text-[#8B2635]" : "text-[#3a3a3a]"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`font-serif text-base md:text-lg font-light transition-colors ${i === active ? "text-white" : "text-[#78716C] group-hover:text-[#a8a29e]"}`}>
                    {item.title}
                  </span>
                </span>
                <span className={`font-sans text-[9px] tracking-[0.25em] uppercase transition-opacity duration-300 ${i === active ? "text-[#8B2635] opacity-100" : "opacity-0"}`}>
                  {item.tier}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
