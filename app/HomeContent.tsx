"use client";

import { cloudinaryUrl } from "@/lib/cloudinary";
import Link from "next/link";
import EpicCarousel from "@/components/EpicCarousel";
import TimelineTeaser from "@/components/TimelineTeaser";
import { TRIP_FUNNEL_PUBLIC } from "@/lib/flags";
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
  heroItem?: {
    kind: string; slug: string; title: string; subtitle: string;
    heroImage: string; href: string; label: string;
  } | null;
  epicJourneys: Journey[];
  stories: Story[];
  /* One sentence naming what month it is in Morocco. Sits under the
     masthead. Editorial copy from lib/seasonal.ts, not generated. */
  season?: string;
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
    .map(prettifyLabel)
    .join(" → ");
}

// Turn a slug-shaped string like "draa-valley" / "imperial_city" into
// "Draa Valley" / "Imperial City". Leaves already-human strings alone.
function prettifyLabel(raw?: string): string {
  if (!raw) return "";
  const trimmed = raw.trim();
  if (!trimmed) return "";
  if (/\s/.test(trimmed) && !/[-_]/.test(trimmed)) return trimmed;
  return trimmed
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Overrides for Moroccan place slugs where the proper spelling carries
// a diacritic, apostrophe, or English-vs-French rendering that plain
// title-casing cannot produce.
const PLACE_LABELS: Record<string, string> = {
  "ait-benhaddou":  "Aït Benhaddou",
  "mhamid":         "M'hamid",
  "m-hamid":        "M'hamid",
  "fes":            "Fez",
  "tetouan":        "Tétouan",
  "oukaimeden":     "Oukaïmeden",
  "kelaat-mgouna":  "Kelaat M'Gouna",
  "kelaa-mgouna":   "Kelaa M'Gouna",
};

function prettifyPlace(raw?: string): string {
  if (!raw) return "";
  const key = raw.trim().toLowerCase();
  if (!key) return "";
  return PLACE_LABELS[key] ?? prettifyLabel(raw);
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
        <span className="text-[10px] text-[#0a0a0a]/55 tracking-[0.1em] uppercase block mb-1">
          {story.category}
        </span>
      )}
      <h3 className="text-[13px] tracking-[0.04em] text-[#0a0a0a] group-hover:text-[#0a0a0a]/70 transition-colors leading-snug">
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

function SectionHeader({ title, href, linkText = "More" }: { title: string; href: string; linkText?: string }) {
  return (
    <>
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-[15px] md:text-base font-light tracking-[-0.01em] text-[#0a0a0a]">
          {title}
        </h2>
        <Link
          href={href}
          className="text-[11px] tracking-[0.08em] uppercase text-[#0a0a0a]/55 hover:text-[#0a0a0a] transition-colors"
        >
          {linkText} →
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
  season,
  places,
  heroItem,
}: HomeContentProps) {
  // The full shuffled archive arrives in `stories`. Spread the sections ACROSS it
  // (not the same top slice) so more of the archive is on the page at once, and it
  // all rotates through over the day. Guard against a short pool with modulo.
  const pool = stories.length ? stories : [];
  const at = (n: number) => pool[n % (pool.length || 1)];
  const lead = pool[0];
  const editStories = [1, 2, 3, 4].map((n) => at(n)).filter(Boolean);          // 4, top of pool
  const deeperStories = [5, 6, 7].map((n) => at(n)).filter(Boolean);           // 3, next
  // A small cluster of further reads, drawn from DEEPER in the shuffle so they
  // differ from the features above and rotate independently.
  const moreReads = [12, 18, 25, 33, 41].map((n) => at(n)).filter(Boolean);    // 5, spread deep
  const featuredJourneys = journeys.slice(0, 3);    // 3 items
  const featuredPlaces = places.slice(0, 6);        // 6 items

  return (
    <main className="min-h-screen bg-white">

      {/* ══════════════════════════════════════════════════
          1. HERO — "Morocco, decoded" masthead over a rotating feature
             (journey / place / editorial), changing every 3 hours.
          ══════════════════════════════════════════════════ */}
      {(heroItem || lead) && (
        <section className="relative h-screen min-h-[720px] overflow-hidden bg-[#0a0a0a]">
          <img
            src={cloudinaryUrl((heroItem?.heroImage || lead?.heroImage) as string, 2400)}
            alt={heroItem?.title || lead?.title || ""}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/30" />

          {/* Masthead — the constant declaration */}
          <div className="relative z-10 h-full flex flex-col justify-between px-6 md:px-10 lg:px-14 pt-10 md:pt-14 lg:pt-16 pb-16 md:pb-24 lg:pb-28">
            <div className="flex items-center gap-4 md:gap-6">
              <h1 className="text-white text-[clamp(2rem,6vw,4.5rem)] font-light tracking-[-0.02em] leading-none">
                Morocco, decoded
              </h1>
              <Link
                href="/journeys"
                aria-label="Explore the journeys"
                className="group shrink-0 mt-2 md:mt-3 text-white/50 hover:text-white transition-colors"
              >
                <svg
                  width="34" height="34" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.25"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="transition-transform duration-500 group-hover:rotate-45"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
                </svg>
              </Link>
            </div>

            {/* What month it is. One line, no chrome, and it changes
                twelve times a year. */}
            {season && (
              <p className="text-white/70 text-[clamp(0.95rem,1.6vw,1.15rem)] font-light leading-snug max-w-2xl -mt-4 md:-mt-6">
                {season}
              </p>
            )}

            {/* Bottom row: rotating feature (left) + a few further reads (right) */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              {/* Rotating feature — links to its own page by type */}
              <Link
                href={heroItem?.href || `/stories/${lead?.slug}`}
                className="group block max-w-xl lg:max-w-lg"
              >
                <span className="text-white/60 text-[11px] tracking-[0.25em] uppercase mb-3 block">
                  {heroItem?.label || "Editorial"}
                </span>
                <h2 className="text-white text-[clamp(1.4rem,3.5vw,2.4rem)] font-light tracking-[-0.01em] leading-[1.12] mb-2 group-hover:text-white/80 transition-colors">
                  {heroItem?.title || lead?.title}
                </h2>
                {(heroItem?.subtitle || lead?.subtitle) && (
                  <p className="text-white/55 text-sm md:text-[15px] leading-relaxed">
                    {heroItem?.subtitle || lead?.subtitle}
                  </p>
                )}
              </Link>

              {/* Further reads — a small cluster, bottom-right, rotating from deep in the archive */}
              {moreReads.length > 0 && (
                <div className="hidden md:block shrink-0 max-w-[15rem] lg:max-w-[17rem] border-t border-white/20 pt-4">
                  <span className="text-white/50 text-[10px] tracking-[0.25em] uppercase mb-3 block">
                    Also worth your time
                  </span>
                  <ul className="space-y-2.5">
                    {moreReads.map((r: any) => (
                      <li key={r.slug}>
                        <Link
                          href={`/stories/${r.slug}`}
                          className="group flex items-baseline gap-2 text-white/75 hover:text-white transition-colors"
                        >
                          <span className="text-white/30 group-hover:text-white/60 transition-colors text-xs mt-px">→</span>
                          <span className="text-[13px] leading-snug font-light tracking-[-0.01em]">{r.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          1b. EPIC — the extraordinary layer (dark, cinematic band)
          ══════════════════════════════════════════════════ */}
      <EpicCarousel />

      {/* ══════════════════════════════════════════════════
          2. THE TWO WAYS IN — Know deeply / Travel deeply
          ══════════════════════════════════════════════════ */}
      <section className="px-6 md:px-10 lg:px-14 pt-16 md:pt-24 pb-10 md:pb-16 border-b border-[#0a0a0a]/[0.08]">
        <div className="max-w-2xl mb-12 md:mb-16">
          <h2 className="font-serif text-[clamp(1.5rem,3.2vw,2.3rem)] font-light tracking-[-0.015em] text-[#0a0a0a] leading-[1.25]">
            Two ways into Morocco.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
          <Link href="/stories" className="group block">
            <span className="text-[clamp(2.75rem,5vw,4rem)] font-light text-[#0a0a0a]/20 tracking-[-0.02em] leading-none block mb-5 md:mb-6">
              01
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-light tracking-[-0.015em] text-[#0a0a0a] mb-3 group-hover:text-[#0a0a0a]/55 transition-colors">
              Know Morocco deeply
            </h3>
            <p className="text-[14px] md:text-[15px] text-[#0a0a0a]/60 leading-relaxed max-w-md">
              Hundreds of decoded essays — the history, the craft, the food, the meaning
              beneath the surface. Read the country before you ever set foot in it.
            </p>
            <span className="mt-5 inline-block text-[11px] tracking-[0.14em] uppercase text-[#0a0a0a]/45 group-hover:text-[#0a0a0a] transition-colors">
              Start reading →
            </span>
          </Link>

          {TRIP_FUNNEL_PUBLIC && (
            <Link href="/journeys" className="group block">
              <span className="text-[clamp(2.75rem,5vw,4rem)] font-light text-[#0a0a0a]/20 tracking-[-0.02em] leading-none block mb-5 md:mb-6">
                02
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-light tracking-[-0.015em] text-[#0a0a0a] mb-3 group-hover:text-[#0a0a0a]/55 transition-colors">
                Travel Morocco deeply
              </h3>
              <p className="text-[14px] md:text-[15px] text-[#0a0a0a]/60 leading-relaxed max-w-md">
                When reading is no longer enough, we take you — private journeys down the old
                roads and the slow ones, run by the people who wrote everything you just read.
              </p>
              <span className="mt-5 inline-block text-[11px] tracking-[0.14em] uppercase text-[#0a0a0a]/45 group-hover:text-[#0a0a0a] transition-colors">
                Travel with us →
              </span>
            </Link>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. FEATURED PRIVATE JOURNEYS — Three journeys, clean route lines
          Appears early so visitors see the service layer immediately.
          ══════════════════════════════════════════════════ */}
      {TRIP_FUNNEL_PUBLIC && featuredJourneys.length > 0 && (
        <section className="px-6 md:px-10 lg:px-14 pt-8 md:pt-12 pb-16 md:pb-24">
          <SectionHeader title="Private Journeys" href="/journeys" linkText="Explore journeys" />
          <p className="text-[#0a0a0a]/55 text-[14px] md:text-[15px] leading-relaxed max-w-2xl mb-12 md:mb-14">
            Private journeys are written, not packaged. Each route traces a different Morocco: the first passage, the desert arc, the deeper country.
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
          <SectionHeader title="The Edit" href="/stories" linkText="Read the stories" />
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
          <SectionHeader title="Places" href="/places" linkText="Explore places" />
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
                  <span className="text-[10px] text-[#0a0a0a]/55 tracking-[0.1em] uppercase block mb-1">
                    {prettifyLabel(p.category)}
                  </span>
                )}
                <h3 className="text-[13px] tracking-[0.04em] text-[#0a0a0a] group-hover:text-[#0a0a0a]/70 transition-colors leading-snug">
                  {p.title}
                </h3>
                {p.destination && (
                  <p className="text-[12px] text-[#0a0a0a]/55 mt-1">{prettifyPlace(p.destination)}</p>
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
          <SectionHeader title="Going Deeper" href="/stories" linkText="Read deeper" />
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
                  <span className="text-[10px] text-[#0a0a0a]/50 tracking-[0.06em] uppercase shrink-0 hidden md:block pt-2">
                    {story.category}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </section>

      )}

      {/* MOROCCO ON ONE LINE — animated doorway into /timeline */}
      <TimelineTeaser />

      {/* LEARN TO READ MOROCCO - glossary cluster-essays */}
      <section className="px-6 md:px-10 lg:px-14 py-16 md:py-24 border-t border-[#0a0a0a]/[0.08]">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-[15px] md:text-base font-light tracking-[-0.01em] text-[#0a0a0a]">
            Learn to Read Morocco
          </h2>
        </div>
        <p className="text-[13px] md:text-sm text-[#0a0a0a]/55 leading-relaxed max-w-xl mb-8">
          The vocabulary of a country, decoded. Learn the terms, and the whole place becomes legible.
        </p>
        <div className="divide-y divide-[#0a0a0a]/[0.08]">
          {[
            { slug: "the-vocabulary-of-the-moroccan-table", title: "The Vocabulary of the Moroccan Table", kicker: "Food & Drink" },
            { slug: "how-to-read-a-moroccan-building", title: "How to Read a Moroccan Building", kicker: "Architecture" },
            { slug: "the-language-of-the-loom", title: "The Language of the Loom", kicker: "Textiles" },
            { slug: "the-trades-that-built-the-medina", title: "The Trades That Built the Medina", kicker: "Craft" },
            { slug: "the-words-that-have-no-translation", title: "The Words That Have No Translation", kicker: "Culture" },
            { slug: "the-map-named", title: "The Map, Named", kicker: "Cities & Regions" },
            { slug: "seven-words-for-a-thousand-years-of-power", title: "Seven Words for a Thousand Years of Power", kicker: "History" },
            { slug: "reading-the-land", title: "Reading the Land", kicker: "Geography" },
            { slug: "what-morocco-wears", title: "What Morocco Wears", kicker: "Dress" },
          ].map((g) => (
            <Link key={g.slug} href={`/stories/${g.slug}`} className="group flex items-baseline justify-between gap-6 py-4">
              <span className="text-[15px] md:text-base font-light tracking-[-0.01em] text-[#0a0a0a] leading-snug group-hover:text-[#0a0a0a]/55 transition-colors">
                {g.title}
              </span>
              <span className="text-[10px] tracking-[0.14em] uppercase text-[#0a0a0a]/35 group-hover:text-[#0a0a0a]/70 transition-colors whitespace-nowrap shrink-0">
                {g.kicker}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          9. PRIVATE JOURNEYS CTA STRIP — Final invitation
          ══════════════════════════════════════════════════ */}
      {TRIP_FUNNEL_PUBLIC && (
      <section className="px-6 md:px-10 lg:px-14 py-16 md:py-24 border-t border-[#0a0a0a]/[0.08]">
        <div className="max-w-2xl">
          <h2 className="text-[clamp(1.3rem,2.6vw,1.9rem)] font-light tracking-[-0.01em] text-[#0a0a0a] leading-[1.2] mb-4">
            Private Journeys
          </h2>
          <p className="text-[#0a0a0a]/55 text-[14px] md:text-[15px] leading-relaxed mb-8">
            Quietly designed routes into a slower, deeper Morocco. Private, and shaped around how you want to move through the country.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/plan-your-trip"
              className="inline-block text-[11px] tracking-[0.12em] uppercase text-[#0a0a0a] hover:text-[#0a0a0a]/55 transition-colors"
            >
              Plan a private journey →
            </Link>
            <Link
              href="/journeys"
              className="inline-block text-[11px] tracking-[0.12em] uppercase text-[#0a0a0a]/55 hover:text-[#0a0a0a] transition-colors"
            >
              Explore journeys →
            </Link>
          </div>
        </div>
      </section>
      )}

    </main>
  );
}
