"use client";

import Link from "next/link";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { PLACE_CATEGORIES } from "@/lib/place-categories";
import AllPlacesMap from "../../map/AllPlacesMap";
import { dek } from "@/lib/dek";

interface Item {
  slug: string;
  title: string;
  destination: string;
  destinationLabel: string;
  heroImage: string;
  excerpt: string;
}

interface MapPin {
  slug: string;
  title: string;
  category: string;
  destination: string;
  excerpt: string;
  hero_image: string;
  latitude: number;
  longitude: number;
  related_story_slugs: string[];
  journey_bridge: string;
}

interface JourneyItem {
  slug: string;
  title: string;
  blurb: string;
  days: number | null;
}

interface StoryItem {
  slug: string;
  title: string;
  subtitle: string;
  readTime: number | null;
}

interface Props {
  categorySlug: string;
  label: string;
  description: string;
  places: Item[];
  mapPlaces?: MapPin[];
  journeys?: JourneyItem[];
  stories?: StoryItem[];
  ksourArchive?: boolean;
  counts: Record<string, number>;
  lastUpdated: string | null;
}

function formatUpdated(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function PlaceCategoryContent({
  categorySlug,
  label,
  description,
  places,
  mapPlaces = [],
  journeys = [],
  stories = [],
  ksourArchive = false,
  counts,
  lastUpdated,
}: Props) {
  const updated = formatUpdated(lastUpdated);

  const siblings = PLACE_CATEGORIES.filter((c) => c.slug !== categorySlug).sort(
    (a, b) => (counts[b.label] || 0) - (counts[a.label] || 0),
  );

  return (
    <main className="bg-background text-foreground min-h-screen">

      {/* ── Header ────────────────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 pt-24 md:pt-28 pb-6">
        <Link
          href="/places"
          className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground transition-colors mb-6 inline-block"
        >
          ← All places
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
          {places.length} {label} {places.length === 1 ? "place" : "places"} in Morocco
        </h1>

        <p className="text-sm text-foreground/55 max-w-2xl mb-4 leading-relaxed">
          {description}
        </p>

        {updated && (
          <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30">
            Updated {updated}
          </p>
        )}
      </section>

      {/* ── Grid ──────────────────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 pb-16 border-t border-foreground/[0.08] pt-10">
        {places.length === 0 ? (
          <p className="text-sm text-foreground/40 py-16">
            Nothing filed under {label} yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 md:gap-x-5 gap-y-10">
            {places.map((p) => (
              <Link key={p.slug} href={`/places/${p.slug}`} className="group block">
                <div className="aspect-[29/39] relative overflow-hidden bg-[#e8e6e1] mb-3.5">
                  {p.heroImage ? (
                    <img
                      src={cloudinaryUrl(p.heroImage, 480)}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[1.2s] ease-out"
                    />
                  ) : null}
                </div>
                <p className="text-[10px] text-foreground/40 mb-1.5 capitalize">
                  {p.destinationLabel}
                </p>
                <h2 className="text-[12px] tracking-[0.04em] uppercase leading-[1.35] text-foreground group-hover:text-foreground/60 transition-colors duration-500">
                  {p.title}
                </h2>
                {dek(p.excerpt) && (
                  <p className="text-[11px] leading-[1.45] text-foreground/45 mt-1.5">
                    {dek(p.excerpt)}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── The category, mapped ──────────────────────────────────────
          Same component as /places/map, carrying only this category's
          pins. Hidden when nothing in the category has coordinates.
          ──────────────────────────────────────────────────────────── */}
      {mapPlaces.length > 0 && (
        <section className="px-8 md:px-10 lg:px-14 py-12 border-t border-foreground/[0.08]">
          <div className="flex items-baseline justify-between mb-5">
            <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/35">
              {label} on the map
            </p>
            <Link
              href="/places/map"
              className="text-[10px] tracking-[0.15em] uppercase text-foreground/35 hover:text-foreground transition-colors"
            >
              The full atlas →
            </Link>
          </div>
          <AllPlacesMap places={mapPlaces} total={mapPlaces.length} embedded />
        </section>
      )}

      {/* ── Essays on this subject ────────────────────────────────── */}
      {stories.length > 0 && (
        <section className="px-8 md:px-10 lg:px-14 py-12 border-t border-foreground/[0.08]">
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/35 mb-6">
            Read on {label.toLowerCase()}
          </p>
          <ul className="grid md:grid-cols-2 gap-x-10 lg:gap-x-14">
            {stories.map((st) => (
              <li key={st.slug}>
                <Link
                  href={`/stories/${st.slug}`}
                  className="group block border-b border-foreground/[0.08] hover:border-foreground/40 py-4 transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-3 mb-1.5">
                    <span className="font-serif text-base text-foreground group-hover:text-foreground/60 transition-colors">
                      {st.title}
                    </span>
                    {st.readTime ? (
                      <span className="text-[10px] tabular-nums text-foreground/25 whitespace-nowrap">
                        {st.readTime} min
                      </span>
                    ) : null}
                  </div>
                  {st.subtitle && (
                    <p className="text-[12px] text-foreground/45 leading-[1.5] line-clamp-2">
                      {st.subtitle}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Journeys covering this category ───────────────────────── */}
      {journeys.length > 0 && (
        <section className="px-8 md:px-10 lg:px-14 py-12 border-t border-foreground/[0.08]">
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/35 mb-6">
            Journeys through {label.toLowerCase()}
          </p>
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-14">
            {journeys.map((j) => (
              <li key={j.slug}>
                <Link
                  href={`/journeys/${j.slug}`}
                  className="group block border-b border-foreground/[0.08] hover:border-foreground/40 py-4 transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-3 mb-1.5">
                    <span className="text-sm text-foreground group-hover:text-foreground/60 transition-colors">
                      {j.title}
                    </span>
                    {j.days ? (
                      <span className="text-[10px] tabular-nums text-foreground/25 whitespace-nowrap">
                        {j.days} days
                      </span>
                    ) : null}
                  </div>
                  {j.blurb && (
                    <p className="text-[12px] text-foreground/45 leading-[1.5] line-clamp-2">
                      {j.blurb}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Ksour Archive cross-link ──────────────────────────────────
          Story pages already carry this, triggered on keywords. The
          category pages are the most on-topic pages on the site and
          were the only ones not linking out to it.
          ──────────────────────────────────────────────────────────── */}
      {ksourArchive && (
        <section className="px-8 md:px-10 lg:px-14 py-12 border-t border-foreground/[0.08]">
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/35 mb-4">
            In the Archive
          </p>
          <p className="text-sm text-foreground/55 leading-relaxed max-w-2xl">
            The earthen building tradition behind these places — kasbahs,
            ksour, agadirs and the pisé engineering that holds them up — is
            documented in depth at the{" "}
            <a
              href="https://www.ksour.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-foreground/20 hover:decoration-foreground/60 transition-colors"
            >
              Ksour Archive
            </a>
            .
          </p>
        </section>
      )}

      {/* ── Other categories ──────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 py-12 border-t border-foreground/[0.08]">
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/35 mb-6">
          Browse by category
        </p>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 lg:gap-x-14">
          {siblings.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/places/category/${c.slug}`}
                className="group flex items-baseline justify-between gap-3 border-b border-foreground/[0.08] hover:border-foreground/40 py-2.5 transition-colors"
              >
                <span className="text-sm text-foreground/75 group-hover:text-foreground transition-colors">
                  {c.label}
                </span>
                <span className="text-[10px] tabular-nums text-foreground/25 group-hover:text-foreground/50 transition-colors">
                  {counts[c.label] || 0}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
