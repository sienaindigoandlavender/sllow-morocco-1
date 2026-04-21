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
}: HomeContentProps) {
  const lead = stories[0];
  const editStories = stories.slice(1, 5);          // 4 items only
  const deeperStories = stories.slice(5, 8);        // 3 items for Deeper reading
  const featuredJourneys = journeys.slice(0, 3);    // 3 journeys only

  return (
    <main className="min-h-screen bg-white">

      {/* ══════════════════════════════════════════════════
          1. HERO — Lead story + supporting line + two CTAs
          The hero is a stage; only the story block links to it.
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

          {/* Hero text — bottom left */}
          <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-10 lg:px-14 pb-10 md:pb-14 lg:pb-16">
            <Link
              href={`/stories/${lead.slug}`}
              className="group block max-w-xl lg:max-w-lg mb-8 md:mb-10"
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

            {/* Service layer — supporting line + two CTAs */}
            <div className="max-w-2xl">
              <p className="text-white/70 text-[13px] md:text-sm leading-relaxed mb-5">
                Stories, places, and private journeys for travellers who want to understand Morocco more deeply.
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <Link
                  href="/stories"
                  className="inline-block border border-white/30 px-5 md:px-6 py-2.5 text-[11px] tracking-[0.14em] uppercase text-white hover:bg-white hover:text-[#0a0a0a] transition-colors"
                >
                  Explore Morocco
                </Link>
                <Link
                  href="/journeys"
                  className="inline-block border border-white bg-white px-5 md:px-6 py-2.5 text-[11px] tracking-[0.14em] uppercase text-[#0a0a0a] hover:bg-transparent hover:text-white transition-colors"
                >
                  Private Journeys
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          2. ORIENTATION — Three entry points for first-time visitors
          Clean 3-column, no cards, no borders, editorial register
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
            <p className="text-[13.5px] text-[#0a0a0a]/55 leading-relaxed mb-5">
              Deep essays on the country's history, craft, kitchens, and quieter corners.
            </p>
            <span className="text-[11px] tracking-[0.12em] uppercase text-[#0a0a0a]/45 group-hover:text-[#0a0a0a] transition-colors">
              Read the stories →
            </span>
          </Link>

          <Link href="/journeys" className="group block">
            <span className="text-[10px] text-[#0a0a0a]/40 tracking-[0.14em] uppercase block mb-4">
              02
            </span>
            <h3 className="text-[18px] md:text-[19px] font-light tracking-[-0.01em] text-[#0a0a0a] mb-3 group-hover:text-[#0a0a0a]/50 transition-colors">
              Private Journeys
            </h3>
            <p className="text-[13.5px] text-[#0a0a0a]/55 leading-relaxed mb-5">
              Bespoke itineraries, designed around the people and places you've read about.
            </p>
            <span className="text-[11px] tracking-[0.12em] uppercase text-[#0a0a0a]/45 group-hover:text-[#0a0a0a] transition-colors">
              View journeys →
            </span>
          </Link>

          <Link href="/plan-your-trip" className="group block">
            <span className="text-[10px] text-[#0a0a0a]/40 tracking-[0.14em] uppercase block mb-4">
              03
            </span>
            <h3 className="text-[18px] md:text-[19px] font-light tracking-[-0.01em] text-[#0a0a0a] mb-3 group-hover:text-[#0a0a0a]/50 transition-colors">
              Plan Your Trip
            </h3>
            <p className="text-[13.5px] text-[#0a0a0a]/55 leading-relaxed mb-5">
              Tell us what you want to understand. We'll design the trip around it.
            </p>
            <span className="text-[11px] tracking-[0.12em] uppercase text-[#0a0a0a]/45 group-hover:text-[#0a0a0a] transition-colors">
              Start a conversation →
            </span>
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
          5. PRACTICAL MOROCCO — Travel intelligence utility block
          Visa / Before You Go / Places, followed by the Morocco map.
          ══════════════════════════════════════════════════ */}
      <section className="px-6 md:px-10 lg:px-14 py-16 md:py-24 border-t border-[#0a0a0a]/[0.08]">
        <SectionHeader title="Practical Morocco" href="/start-here" linkText="More" />
        <div className="grid md:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
          <Link href="/visa-info" className="group block">
            <h3 className="text-[17px] md:text-[18px] font-light tracking-[-0.01em] text-[#0a0a0a] mb-3 group-hover:text-[#0a0a0a]/50 transition-colors">
              Visa
            </h3>
            <p className="text-[13.5px] text-[#0a0a0a]/55 leading-relaxed mb-5">
              Who needs one, how long it takes, which passports walk straight in.
            </p>
            <span className="text-[11px] tracking-[0.12em] uppercase text-[#0a0a0a]/45 group-hover:text-[#0a0a0a] transition-colors">
              Read the visa guide →
            </span>
          </Link>

          <Link href="/start-here" className="group block">
            <h3 className="text-[17px] md:text-[18px] font-light tracking-[-0.01em] text-[#0a0a0a] mb-3 group-hover:text-[#0a0a0a]/50 transition-colors">
              Before You Go
            </h3>
            <p className="text-[13.5px] text-[#0a0a0a]/55 leading-relaxed mb-5">
              Money, language, seasons, and the quiet assumptions that trip travellers up.
            </p>
            <span className="text-[11px] tracking-[0.12em] uppercase text-[#0a0a0a]/45 group-hover:text-[#0a0a0a] transition-colors">
              Practical notes →
            </span>
          </Link>

          <Link href="/places" className="group block">
            <h3 className="text-[17px] md:text-[18px] font-light tracking-[-0.01em] text-[#0a0a0a] mb-3 group-hover:text-[#0a0a0a]/50 transition-colors">
              Places
            </h3>
            <p className="text-[13.5px] text-[#0a0a0a]/55 leading-relaxed mb-5">
              Over a hundred entries across medinas, valleys, coast, and the long south.
            </p>
            <span className="text-[11px] tracking-[0.12em] uppercase text-[#0a0a0a]/45 group-hover:text-[#0a0a0a] transition-colors">
              Browse places →
            </span>
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          6. MAP — Interactive Morocco, visual extension of the practical block
          ══════════════════════════════════════════════════ */}
      <section className="relative h-[55vh] min-h-[420px] md:h-[60vh]">
        <HomeCityMap />
        <div className="absolute bottom-6 right-6 z-10">
          <Link
            href="/places/map"
            className="text-[10px] tracking-[0.1em] uppercase text-white/40 hover:text-white/70 transition-colors bg-black/40 backdrop-blur-sm px-4 py-2"
          >
            Explore places on the map →
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          7. DEEPER READING — Kinfolk-style list: square image + large title
          One restrained secondary editorial block.
          ══════════════════════════════════════════════════ */}
      {deeperStories.length > 0 && (
        <section className="px-6 md:px-10 lg:px-14 py-16 md:py-24 border-t border-[#0a0a0a]/[0.08]">
          <SectionHeader title="Deeper Reading" href="/stories" />
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
          8. FINAL CTA — Restrained invitation to Private Journeys
          ══════════════════════════════════════════════════ */}
      <section className="px-6 md:px-10 lg:px-14 py-20 md:py-28 border-t border-[#0a0a0a]/[0.08]">
        <div className="max-w-2xl">
          <p className="text-[#0a0a0a] text-[clamp(1.2rem,2.4vw,1.8rem)] font-light leading-[1.25] tracking-[-0.01em] mb-8">
            For travellers who want a slower, sharper, more considered Morocco.
          </p>
          <div className="flex flex-wrap gap-3 md:gap-4">
            <Link
              href="/journeys"
              className="inline-block border border-[#0a0a0a] bg-[#0a0a0a] px-6 py-3 text-[11px] tracking-[0.14em] uppercase text-white hover:bg-transparent hover:text-[#0a0a0a] transition-colors"
            >
              View Private Journeys
            </Link>
            <Link
              href="/plan-your-trip"
              className="inline-block border border-[#0a0a0a]/20 px-6 py-3 text-[11px] tracking-[0.14em] uppercase text-[#0a0a0a] hover:border-[#0a0a0a] transition-colors"
            >
              Start Planning
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
