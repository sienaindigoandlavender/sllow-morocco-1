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

// ─── Helpers ────────────────────────────────────────────────────────────────

// Turn a raw destinations string like "marrakech,ouarzazate,draa-valley,merzouga"
// into a clean route line: "Marrakech → Ouarzazate → Draa Valley → Merzouga".
// If the value already looks human-written (contains spaces or separators), leave it.
function formatRoute(raw?: string): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const looksHumanWritten = /[\s·→•]/.test(trimmed) && !/,/.test(trimmed);
  if (looksHumanWritten) return trimmed;

  return trimmed
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) =>
      part
        .split("-")
        .map((word) => (word ? word[0].toUpperCase() + word.slice(1).toLowerCase() : word))
        .join(" ")
    )
    .join(" → ");
}

// ─── Vertical tile — reused for stories ─────────────────────────────────────

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
}: HomeContentProps) {
  const lead = stories[0];
  const editStories = stories.slice(1, 5);          // 4 items
  const deeperStories = stories.slice(5, 8);        // 3 items
  const featuredJourneys = journeys.slice(0, 3);    // 3 items
  const featuredPlaces = places.slice(0, 6);        // 6 items

  return (
    <main className="min-h-screen bg-white">

      {/* ══════════════════════════════════════════════════
          1. HERO — Lead story. Stage, not a link.
          ══════════════════════════════════════════════════ */}
      {lead && (
        <section className="relative h-screen min-h-[720px] overflow-hidden bg-[#0a0a0a]">
          {lead.heroImage && (
            <img
              src={cloudinaryUrl(lead.heroImage, 2400)}
              alt={lead.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-10 lg:px-14 pb-10 md:pb-14 lg:pb-16">
            <Link
              href={`/stories/${lead.slug}`}
              className="group block max-w-xl lg:max-w-lg"
            >
              <h1 className="text-white text-[clamp(1.6rem,4.5vw,3rem)] font-light tracking-[-0.01em] leading-[1.1] mb-2 group-hover:text-white/80 transition-colors">
                {lead.title}
              </h1>
              {lead.subtitle && (
                <p className="text-white/55 text-sm md:text-[15px] leading-relaxed">
                  {lead.subtitle}
                </p>
              )}
            </Link>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          2. ORIENTATION — Three pathways (editorial table of contents)
          ══════════════════════════════════════════════════ */}
      <section className="px-6 md:px-10 lg:px-14 py-14 md:py-20 border-b border-[#0a0a0a]/[0.08]">
        <div className="grid md:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
          <Link href="/stories" className="group block">
            <span className="text-[10px] text-[#0a0a0a]/40 tracking-[0.14em] uppercase block mb-4">
              01
            </span>
            <h3 className="text-[18px] md:text-[19px] font-light tracking-[-0.01em] text-[#0a0a0a] mb-3 group-hover:text-[#0a0a0a]/50 transition-colors">
              Explore Morocco
            </h3>
            <p className="text-[13.5px] text-[#0a0a0a]/55 leading-relaxed">
              Stories, places, and systems that decode the country.
            </p>
          </Link>

          <Link href="/journeys" className="group block">
            <span className="text-[10px] text-[#0a0a0a]/40 tracking-[0.14em] uppercase block mb-4">
              02
            </span>
            <h3 className="text-[18px] md:text-[19px] font-light tracking-[-0.01em] text-[#0a0a0a] mb-3 group-hover:text-[#0a0a0a]/50 transition-colors">
              Private Journeys
            </h3>
            <p className="text-[13.5px] text-[#0a0a0a]/55 leading-relaxed">
              Thoughtful itineraries shaped around pace, region, and interest.
            </p>
          </Link>

          <Link href="/plan-your-trip" className="group block">
            <span className="text-[10px] text-[#0a0a0a]/40 tracking-[0.14em] uppercase block mb-4">
              03
            </span>
            <h3 className="text-[18px] md:text-[19px] font-light tracking-[-0.01em] text-[#0a0a0a] mb-3 group-hover:text-[#0a0a0a]/50 transition-colors">
              Plan Your Trip
            </h3>
            <p className="text-[13.5px] text-[#0a0a0a]/55 leading-relaxed">
              Practical guidance before you go.
            </p>
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. FEATURED PRIVATE JOURNEYS — Three journeys, clean route lines
          Appears early so visitors see the service layer immediately.
          ══════════════════════════════════════════════════ */}
      {featuredJourneys.length > 0 && (
        <section className="px-6 md:px-10 lg:px-14 py-16 md:py-24">
          <SectionHeader title="Private Journeys" href="/journeys" />
          <p className="text-[#0a0a0a]/55 text-[14px] md:text-[15px] leading-relaxed max-w-2xl mb-12 md:mb-14">
            Curated private journeys — not packaged tours. Each route is designed around a distinct Morocco: the first passage, the desert arc, and the deeper country.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {featuredJourneys.map((j) => {
              const route = formatRoute(j.destinations);
              return (
                <Link key={j.slug} href={`/journeys/${j.slug}`} className="group block min-w-0">
                  <div className="aspect-[4/5] relative overflow-hidden bg-[#f0eeeb] mb-5">
                    {j.heroImage && (
                      <img
                        src={cloudinaryUrl(j.heroImage, 900)}
                        alt={j.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    )}
                    {j.duration && (
                      <div className="absolute bottom-3 left-3 bg-white/90 px-2.5 py-1 text-[10px] tracking-[0.08em] uppercase text-[#0a0a0a]">
                        {j.duration}
                      </div>
                    )}
                  </div>
                  <h3 className="text-[16px] md:text-[17px] font-light tracking-[-0.01em] text-[#0a0a0a] group-hover:text-[#0a0a0a]/55 transition-colors leading-snug mb-2">
                    {j.title}
                  </h3>
                  {route && (
                    <p className="text-[12.5px] text-[#0a0a0a]/55 leading-relaxed">
                      {route}
                    </p>
                  )}
                  <span className="text-[11px] text-[#0a0a0a]/35 tracking-[0.08em] uppercase block mt-3">
                    Bespoke · Private journey
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          4. THE EDIT — Trimmed editorial row (4 stories only)
          ══════════════════════════════════════════════════ */}
      {editStories.length > 0 && (
        <section className="px-6 md:px-10 lg:px-14 py-16 md:py-24 border-t border-[#0a0a0a]/[0.08]">
          <SectionHeader title="The Edit" href="/stories" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {editStories.map((story) => (
              <StoryTile key={story.slug} story={story} />
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          5. PLACES — Six vertical tiles + embedded Morocco map
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

          {/* Morocco map — visual anchor for Places */}
          <div className="relative mt-12 md:mt-16 h-[50vh] min-h-[400px] md:h-[55vh] overflow-hidden bg-[#0a0a0a]">
            <HomeCityMap />
            <div className="absolute bottom-5 right-5 z-10">
              <Link
                href="/places/map"
                className="text-[10px] tracking-[0.1em] uppercase text-white/45 hover:text-white transition-colors bg-black/40 backdrop-blur-sm px-4 py-2"
              >
                Explore places on the map →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          6. THE VISA — Dedicated editorial note
          ══════════════════════════════════════════════════ */}
      <section className="px-6 md:px-10 lg:px-14 py-16 md:py-24 border-t border-[#0a0a0a]/[0.08]">
        <Link href="/visa-info" className="group block max-w-3xl">
          <span className="text-[10px] text-[#0a0a0a]/40 tracking-[0.14em] uppercase block mb-4">
            The Visa
          </span>
          <h2 className="text-[clamp(1.4rem,3vw,2.2rem)] font-light tracking-[-0.01em] text-[#0a0a0a] leading-[1.2] mb-6 group-hover:text-[#0a0a0a]/55 transition-colors">
            Citizens of 65+ countries enter visa-free — here is what you actually need.
          </h2>
          <span className="text-[11px] tracking-[0.12em] uppercase text-[#0a0a0a]/45 group-hover:text-[#0a0a0a] transition-colors">
            Read the visa guide →
          </span>
        </Link>
      </section>

      {/* ══════════════════════════════════════════════════
          7. EDITORIAL INTERLUDE — The month begins when the moon says so
          ══════════════════════════════════════════════════ */}
      <section className="px-6 md:px-10 lg:px-14 py-20 md:py-32 border-t border-[#0a0a0a]/[0.08]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[clamp(1.5rem,3.4vw,2.6rem)] font-light tracking-[-0.015em] text-[#0a0a0a] leading-[1.2]">
            The month begins when the moon says so. The city stops. Then the smell of harira.
          </h2>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          8. GOING DEEPER — Kinfolk-style list: square image + large title
          ══════════════════════════════════════════════════ */}
      {deeperStories.length > 0 && (
        <section className="px-6 md:px-10 lg:px-14 py-16 md:py-24 border-t border-[#0a0a0a]/[0.08]">
          <SectionHeader title="Going Deeper" href="/stories" />
          <div className="divide-y divide-[#0a0a0a]/[0.08]">
            {deeperStories.map((story) => (
              <Link
                key={story.slug}
                href={`/stories/${story.slug}`}
                className="group flex gap-6 md:gap-10 py-8 md:py-10 items-start"
              >
                {story.heroImage && (
                  <div className="w-[120px] md:w-[180px] shrink-0 aspect-square relative overflow-hidden bg-[#f0eeeb]">
                    <img
                      src={cloudinaryUrl(story.heroImage, 400)}
                      alt={story.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0 pt-1">
                  <h3 className="text-[clamp(1.15rem,2.5vw,2rem)] font-light text-[#0a0a0a] leading-[1.15] tracking-[-0.01em] group-hover:text-[#0a0a0a]/50 transition-colors">
                    {story.title}
                  </h3>
                  {story.subtitle && (
                    <p className="text-[clamp(0.95rem,2vw,1.5rem)] font-light text-[#0a0a0a]/50 leading-[1.2] mt-1">
                      {story.subtitle}
                    </p>
                  )}
                </div>
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
          9. PRIVATE JOURNEYS CTA STRIP — Final invitation
          ══════════════════════════════════════════════════ */}
      <section className="px-6 md:px-10 lg:px-14 py-16 md:py-24 border-t border-[#0a0a0a]/[0.08]">
        <div className="max-w-2xl">
          <h2 className="text-[clamp(1.3rem,2.6vw,1.9rem)] font-light tracking-[-0.01em] text-[#0a0a0a] leading-[1.2] mb-4">
            Private Journeys
          </h2>
          <p className="text-[#0a0a0a]/55 text-[14px] md:text-[15px] leading-relaxed mb-6">
            Quietly designed routes across Morocco, shaped around how you want to move through the country.
          </p>
          <Link
            href="/journeys"
            className="inline-block text-[11px] tracking-[0.12em] uppercase text-[#0a0a0a]/55 hover:text-[#0a0a0a] transition-colors"
          >
            View Journeys →
          </Link>
        </div>
      </section>

    </main>
  );
}
