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

// ─── Main Component ─────────────────────────────────────────────────────────

export default function HomeContent({
  journeys,
  stories,
  destinations = [],
}: HomeContentProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Split stories into editorial layout slots
  const lead = stories[0];
  const secondary = stories.slice(1, 3);
  const grid = stories.slice(3, 9);
  const more = stories.slice(9, 14);

  // Pick 3 journeys to feature quietly
  const featuredJourneys = journeys.slice(0, 3);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) setSubscribed(true);
    } catch {}
  };

  return (
    <main className="min-h-screen bg-white">

      {/* ══════════════════════════════════════════════════
          LEAD STORY — Full-bleed hero, magazine cover
          ══════════════════════════════════════════════════ */}
      {lead && (
        <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-[#0a0a0a]">
          {lead.heroImage && (
            <img
              src={cloudinaryUrl(lead.heroImage, 2400)}
              alt={lead.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="relative z-10 h-full flex flex-col justify-end px-8 md:px-10 lg:px-14 pb-14 md:pb-20">
            <Link href={`/stories/${lead.slug}`} className="group block max-w-2xl">
              {lead.category && (
                <span className="text-white/40 text-[11px] tracking-[0.12em] uppercase block mb-3">
                  {lead.category}
                </span>
              )}
              <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] leading-[1.1] mb-4 group-hover:text-white/80 transition-colors">
                {lead.title}
              </h1>
              {lead.subtitle && (
                <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-lg">
                  {lead.subtitle}
                </p>
              )}
              {lead.read_time && (
                <span className="text-white/25 text-[11px] tracking-[0.06em] uppercase mt-4 block">
                  {lead.read_time} min read
                </span>
              )}
            </Link>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          TWO-UP — Secondary stories, asymmetric
          ══════════════════════════════════════════════════ */}
      {secondary.length > 0 && (
        <section className="px-8 md:px-10 lg:px-14 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {secondary.map((story, i) => (
              <Link key={story.slug} href={`/stories/${story.slug}`} className="group block">
                <div className={`relative overflow-hidden bg-[#f0eeeb] mb-5 ${i === 0 ? "aspect-[4/5]" : "aspect-[3/4]"}`}>
                  {story.heroImage && (
                    <img
                      src={cloudinaryUrl(story.heroImage, 800)}
                      alt={story.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    />
                  )}
                </div>
                {story.category && (
                  <span className="text-[10px] text-[#1C1917]/30 tracking-[0.1em] uppercase block mb-2">
                    {story.category}
                  </span>
                )}
                <h2 className="text-xl md:text-2xl font-light tracking-[-0.01em] text-[#1C1917] group-hover:text-[#1C1917]/60 transition-colors leading-snug mb-2">
                  {story.title}
                </h2>
                {story.subtitle && (
                  <p className="text-sm text-[#1C1917]/40 leading-relaxed line-clamp-2">
                    {story.subtitle}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          IDENTITY LINE
          ══════════════════════════════════════════════════ */}
      <section className="border-y border-[#1C1917]/[0.06] py-12 md:py-16">
        <div className="px-8 md:px-10 lg:px-14 max-w-3xl">
          <p className="text-[#1C1917]/70 text-base md:text-lg leading-relaxed">
            Slow Morocco publishes original essays on Moroccan history, craft, music, architecture, food, and ecology.
            Written from Marrakech. Based on years of research, not a weekend trip.
          </p>
          <Link
            href="/stories"
            className="text-[11px] text-[#1C1917]/35 tracking-[0.08em] uppercase mt-6 block hover:text-[#1C1917]/60 transition-colors"
          >
            The Edit — 300+ essays →
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          EDITORIAL GRID — 6 stories, varied sizes
          ══════════════════════════════════════════════════ */}
      {grid.length > 0 && (
        <section className="px-8 md:px-10 lg:px-14 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-14">
            {grid.map((story, i) => (
              <Link
                key={story.slug}
                href={`/stories/${story.slug}`}
                className={`group block ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
              >
                <div className={`relative overflow-hidden bg-[#f0eeeb] mb-4 ${
                  i === 0 ? "aspect-[16/10]" : "aspect-[4/3]"
                }`}>
                  {story.heroImage && (
                    <img
                      src={cloudinaryUrl(story.heroImage, i === 0 ? 1200 : 600)}
                      alt={story.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    />
                  )}
                </div>
                {story.category && (
                  <span className="text-[10px] text-[#1C1917]/30 tracking-[0.1em] uppercase block mb-1.5">
                    {story.category}
                  </span>
                )}
                <h3 className={`font-light tracking-[-0.01em] text-[#1C1917] group-hover:text-[#1C1917]/60 transition-colors leading-snug ${
                  i === 0 ? "text-xl md:text-2xl" : "text-sm md:text-base"
                }`}>
                  {story.title}
                </h3>
                {story.subtitle && (
                  <p className={`text-[#1C1917]/40 leading-relaxed mt-1 line-clamp-2 ${
                    i === 0 ? "text-sm" : "text-[12px]"
                  }`}>
                    {story.subtitle}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          THE LETTER — newsletter, not booking
          ══════════════════════════════════════════════════ */}
      <section className="bg-[#1C1917] text-white py-16 md:py-24">
        <div className="max-w-xl mx-auto px-8 md:px-10 lg:px-14 text-center">
          <h2 className="text-2xl md:text-3xl font-light tracking-[-0.01em] mb-3">
            The Slow Morocco Letter
          </h2>
          <p className="text-white/40 text-sm leading-relaxed mb-8">
            Written from the medina. Sent when it matters. No schedule, no spam, no
            &ldquo;top 10 things to do.&rdquo;
          </p>
          {subscribed ? (
            <p className="text-white/60 text-sm">You&apos;re in.</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-sm mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 bg-transparent border-b border-white/20 text-white text-sm py-2.5 px-0 placeholder:text-white/20 focus:outline-none focus:border-white/50 transition-colors"
              />
              <button
                type="submit"
                className="text-[11px] tracking-[0.08em] uppercase text-white/60 hover:text-white transition-colors whitespace-nowrap"
              >
                Join →
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          MORE STORIES — text-only list, Monocle density
          ══════════════════════════════════════════════════ */}
      {more.length > 0 && (
        <section className="px-8 md:px-10 lg:px-14 py-16 md:py-24">
          <div className="max-w-3xl">
            <h2 className="text-[11px] text-[#1C1917]/30 tracking-[0.1em] uppercase mb-8">
              Also in The Edit
            </h2>
            <div className="divide-y divide-[#1C1917]/[0.06]">
              {more.map((story) => (
                <Link
                  key={story.slug}
                  href={`/stories/${story.slug}`}
                  className="group flex items-baseline justify-between py-5 gap-4"
                >
                  <div className="flex-1">
                    <h3 className="text-base text-[#1C1917] group-hover:text-[#1C1917]/60 transition-colors">
                      {story.title}
                    </h3>
                    {story.subtitle && (
                      <p className="text-[12px] text-[#1C1917]/35 mt-0.5 line-clamp-1">
                        {story.subtitle}
                      </p>
                    )}
                  </div>
                  {story.category && (
                    <span className="text-[10px] text-[#1C1917]/25 tracking-[0.06em] uppercase shrink-0">
                      {story.category}
                    </span>
                  )}
                </Link>
              ))}
            </div>
            <Link
              href="/stories"
              className="text-[11px] text-[#1C1917]/35 tracking-[0.08em] uppercase mt-8 block hover:text-[#1C1917]/60 transition-colors"
            >
              All stories →
            </Link>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          JOURNEYS — quiet, present but not the pitch
          ══════════════════════════════════════════════════ */}
      {featuredJourneys.length > 0 && (
        <section className="px-8 md:px-10 lg:px-14 py-16 md:py-24 border-t border-[#1C1917]/[0.06]">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <h2 className="text-[11px] text-[#1C1917]/30 tracking-[0.1em] uppercase mb-2">
                Private Journeys
              </h2>
              <p className="text-[#1C1917]/40 text-sm">
                We also take people there.
              </p>
            </div>
            <Link
              href="/journeys"
              className="text-[11px] text-[#1C1917]/30 tracking-[0.06em] uppercase hover:text-[#1C1917]/60 transition-colors hidden md:block"
            >
              All journeys →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {featuredJourneys.map((j) => (
              <Link key={j.slug} href={`/journeys/${j.slug}`} className="group block">
                <div className="aspect-[16/10] relative overflow-hidden bg-[#f0eeeb] mb-3">
                  {j.heroImage && (
                    <img
                      src={cloudinaryUrl(j.heroImage, 600)}
                      alt={j.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
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
              </Link>
            ))}
          </div>
          <Link
            href="/journeys"
            className="text-[11px] text-[#1C1917]/35 tracking-[0.06em] uppercase hover:text-[#1C1917]/60 transition-colors mt-8 block md:hidden"
          >
            All journeys →
          </Link>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          DESTINATIONS — compact, navigational
          ══════════════════════════════════════════════════ */}
      {destinations.length > 0 && (
        <section className="px-8 md:px-10 lg:px-14 py-12 md:py-16 border-t border-[#1C1917]/[0.06]">
          <h2 className="text-[11px] text-[#1C1917]/30 tracking-[0.1em] uppercase mb-6">
            By City
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {destinations.slice(0, 12).map((d) => (
              <Link
                key={d.slug}
                href={`/${d.slug}`}
                className="text-sm text-[#1C1917]/50 hover:text-[#1C1917] transition-colors py-1"
              >
                {d.title}
              </Link>
            ))}
            <Link
              href="/destinations"
              className="text-sm text-[#1C1917]/25 hover:text-[#1C1917]/50 transition-colors py-1"
            >
              All →
            </Link>
          </div>
        </section>
      )}

    </main>
  );
}
