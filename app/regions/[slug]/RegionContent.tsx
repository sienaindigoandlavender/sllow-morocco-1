"use client";

import { cloudinaryUrl } from "@/lib/cloudinary";
import Link from "next/link";

interface Region {
  slug: string;
  title: string;
  subtitle: string | null;
  hero_image: string | null;
  description: string | null;
}

interface Destination {
  slug: string;
  title: string;
  subtitle: string | null;
  hero_image: string | null;
  excerpt: string | null;
}

interface Place {
  slug: string;
  title: string;
  hero_image: string | null;
  excerpt: string | null;
  category: string | null;
  destination: string | null;
}

interface Journey {
  slug: string;
  title: string;
  hero_image_url: string | null;
  short_description: string | null;
  arc_description: string | null;
  duration_days: number | null;
  price_eur: number | null;
  category: string | null;
  focus_type: string | null;
}

interface Story {
  slug: string;
  title: string;
  hero_image: string | null;
  excerpt: string | null;
  category: string | null;
}

interface Props {
  region: Region;
  destinations: Destination[];
  places: Place[];
  journeys: Journey[];
  stories: Story[];
  regionSlug: string;
}

const REGION_INTROS: Record<string, { claim: string; body: string }> = {
  cities: {
    claim: "Four dynasties. Four capitals.",
    body: "Morocco's imperial cities were each built to outshine the last. Marrakech, Fes, Meknes, Rabat — a thousand years of architectural ambition compressed into labyrinthine medinas, monumental gates, and the particular silence of a tiled courtyard at noon. The cities are where Moroccan history is legible and where it is most deliberately obscured.",
  },
  mountains: {
    claim: "Three ranges. Infinite altitude.",
    body: "The High Atlas, Middle Atlas, and Anti-Atlas cross Morocco diagonally, northeast to southwest. Imlil sits at the foot of Toubkal, North Africa's highest peak at 4,167 metres. The Rif runs along the north. Between the ranges: cedar forests, Berber villages that have farmed the same terraces for centuries, and a cold that surprises everyone who forgot Morocco has winter.",
  },
  coastal: {
    claim: "3,500 kilometres. Two seas.",
    body: "Atlantic to the west, Mediterranean to the north, the Strait of Gibraltar where they meet. Essaouira's ramparts face into a permanent gale. Agadir's beach stretches for eleven kilometres. Tangier sits at the crossing point between two continents and has the particular restlessness of a city that has always been on the way to somewhere else.",
  },
  desert: {
    claim: "South of the Atlas. The silence begins.",
    body: "Beyond the mountains, the pre-Saharan plateau gives way to hammada — flat stone desert — and then to the great ergs, the sand seas. Erg Chebbi near Merzouga, Erg Chigaga near M'Hamid. Kasbahs built from the earth they stand on, already beginning the slow return. Oases threaded along ancient caravan routes. The Sahara is not empty — it is full of things that require stillness to see.",
  },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] tracking-[0.3em] uppercase font-mono text-foreground/30 mb-8">
      {children}
    </p>
  );
}

export default function RegionContent({
  region,
  destinations,
  places,
  journeys,
  stories,
  regionSlug,
}: Props) {
  const intro = REGION_INTROS[regionSlug] || {
    claim: region.subtitle || "",
    body: region.description || "",
  };

  return (
    <main className="bg-background text-foreground">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[65vh] min-h-[480px] max-h-[720px]">
        {region.hero_image && (
          <img
            src={cloudinaryUrl(region.hero_image)}
            alt={region.title}
            className="absolute inset-0 w-full h-full object-cover"
            />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/65" />
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 lg:px-20 pb-14">
          <Link
            href="/regions"
            className="text-[9px] tracking-[0.3em] uppercase font-mono text-white/30 hover:text-white/60 transition-colors mb-4 inline-block"
          >
            ← Regions
          </Link>
          <p className="text-[10px] tracking-[0.3em] uppercase font-mono text-white/40 mb-3">
            {intro.claim}
          </p>
          <h1 className="font-serif text-6xl md:text-8xl text-white">
            {region.title}
          </h1>
        </div>
      </section>

      {/* ── Intro ─────────────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 py-16 md:py-20 max-w-3xl">
        <p className="font-serif text-xl md:text-2xl leading-relaxed text-foreground">
          {intro.body}
        </p>
      </section>

      {/* ── Destinations ──────────────────────────────────────────────────── */}
      {destinations.length > 0 && (
        <section className="px-8 md:px-16 lg:px-20 pb-20 border-t border-border pt-16">
          <SectionLabel>Cities & destinations</SectionLabel>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {destinations.map((dest) => (
              <Link
                key={dest.slug}
                href={`/${dest.slug}`}
                className="group relative aspect-[3/4] overflow-hidden bg-foreground/5"
              >
                {dest.hero_image && (
                  <img
                    src={cloudinaryUrl(dest.hero_image)}
                    alt={dest.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
            />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {dest.subtitle && (
                    <p className="text-[9px] tracking-[0.2em] uppercase font-mono text-white/40 mb-1">
                      {dest.subtitle}
                    </p>
                  )}
                  <p className="font-serif text-lg text-white">{dest.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Places ────────────────────────────────────────────────────────── */}
      {places.length > 0 && (
        <section className="px-8 md:px-16 lg:px-20 pb-20 border-t border-border pt-16">
          <SectionLabel>Places</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {places.slice(0, 9).map((place) => (
              <Link
                key={place.slug}
                href={`/places/${place.slug}`}
                className="group"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-foreground/5 mb-4">
                  {place.hero_image && (
                    <img
                      src={cloudinaryUrl(place.hero_image)}
                      alt={place.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
                  )}
                </div>
                {place.category && (
                  <p className="text-[9px] tracking-[0.25em] uppercase font-mono text-foreground/30 mb-1">
                    {place.category}
                  </p>
                )}
                <h3 className="font-serif text-lg group-hover:text-foreground/60 transition-colors">
                  {place.title}
                </h3>
                {place.excerpt && (
                  <p className="text-xs text-foreground/40 mt-1 leading-relaxed line-clamp-2">
                    {place.excerpt}
                  </p>
                )}
              </Link>
            ))}
          </div>
          {places.length > 9 && (
            <div className="mt-10">
              <Link
                href={`/places?region=${regionSlug}`}
                className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/40 hover:text-foreground transition-colors"
              >
                All places in {region.title} →
              </Link>
            </div>
          )}
        </section>
      )}

      {/* ── Stories ───────────────────────────────────────────────────────── */}
      {stories.length > 0 && (
        <section className="px-8 md:px-16 lg:px-20 pb-20 border-t border-border pt-16">
          <SectionLabel>Stories</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {stories.slice(0, 6).map((story) => (
              <article key={story.slug}>
                <Link href={`/stories/${story.slug}`} className="group">
                  <div className="aspect-[3/4] relative overflow-hidden bg-foreground/5 mb-5">
                    {story.hero_image && (
                      <img
                        src={cloudinaryUrl(story.hero_image)}
                        alt={story.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
                    )}
                  </div>
                  {story.category && (
                    <p className="text-[10px] tracking-[0.3em] uppercase font-mono text-foreground/30 mb-2">
                      {story.category}
                    </p>
                  )}
                  <h3 className="font-serif text-xl mb-2 group-hover:text-foreground/60 transition-colors">
                    {story.title}
                  </h3>
                  {story.excerpt && (
                    <p className="text-sm text-foreground/50 leading-relaxed line-clamp-2">
                      {story.excerpt}
                    </p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ── Journeys ──────────────────────────────────────────────────────── */}
      {journeys.length > 0 && (
        <section className="px-8 md:px-16 lg:px-20 pb-20 border-t border-border pt-16">
          <SectionLabel>Journeys in {region.title}</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {journeys.slice(0, 6).map((journey) => (
              <article key={journey.slug}>
                <Link href={`/journeys/${journey.slug}`} className="group">
                  <div className="aspect-[4/3] relative overflow-hidden bg-foreground/5 mb-5">
                    {journey.hero_image_url && (
                      <img
                        src={cloudinaryUrl(journey.hero_image_url)}
                        alt={journey.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
                    )}
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    {journey.duration_days ? (
                      <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/30">
                        {journey.duration_days}d
                      </span>
                    ) : null}
                    {journey.category && (
                      <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/30">
                        {journey.category}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl mb-2 group-hover:text-foreground/60 transition-colors">
                    {journey.title}
                  </h3>
                  {(journey.short_description || journey.arc_description) && (
                    <p className="text-sm text-foreground/50 leading-relaxed line-clamp-2">
                      {journey.short_description || journey.arc_description}
                    </p>
                  )}
                </Link>
              </article>
            ))}
          </div>
          {journeys.length > 6 && (
            <div className="mt-10">
              <Link
                href="/journeys"
                className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/40 hover:text-foreground transition-colors"
              >
                All journeys →
              </Link>
            </div>
          )}
        </section>
      )}

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 py-20 border-t border-border">
        <div className="max-w-xl">
          <p className="text-[10px] tracking-[0.3em] uppercase font-mono text-foreground/30 mb-4">
            Private journeys
          </p>
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            Ready to go?
          </h2>
          <p className="text-sm text-foreground/50 leading-relaxed mb-8">
            Every journey we design is private, built around what you want to see, and shaped by deep experience inside Morocco.
          </p>
          <Link
            href="/plan-your-trip"
            className="inline-block text-[11px] tracking-[0.2em] uppercase border border-foreground px-8 py-4 hover:bg-foreground hover:text-background transition-colors"
          >
            Plan Your Trip
          </Link>
        </div>
      </section>

    </main>
  );
}
