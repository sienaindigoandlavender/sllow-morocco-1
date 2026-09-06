"use client";

import Link from "next/link";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { formatDistance } from "@/lib/geo";
import { categorySlug } from "@/lib/place-categories";

interface Item {
  slug: string;
  title: string;
  category: string;
  destinationLabel: string;
  heroImage: string;
  excerpt: string;
  distanceKm: number;
  visitDurationMinutes: number | null;
}

interface Props {
  originSlug: string;
  originTitle: string;
  originDestination: string;
  radiusKm: number;
  places: Item[];
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

/** Rough walking time at 4.5 km/h, rounded to the nearest 5 minutes. */
function walkMinutes(km: number): number {
  return Math.max(5, Math.round((km / 4.5) * 60 / 5) * 5);
}

export default function NearbyContent({
  originSlug,
  originTitle,
  originDestination,
  radiusKm,
  places,
  lastUpdated,
}: Props) {
  const updated = formatUpdated(lastUpdated);

  return (
    <main className="bg-background text-foreground min-h-screen">

      {/* ── Header ────────────────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 pt-24 md:pt-28 pb-6">
        <Link
          href={`/places/${originSlug}`}
          className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground transition-colors mb-6 inline-block"
        >
          ← {originTitle}
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
          {places.length} places within walking distance of {originTitle}
        </h1>

        <p className="text-sm text-foreground/55 max-w-2xl mb-4 leading-relaxed">
          Everything in the atlas inside {radiusKm}km of {originTitle}
          {originDestination ? `, ${originDestination}` : ""}, nearest first.
          Distances are straight-line — the medina will add to every one of
          them.
        </p>

        {updated && (
          <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30">
            Updated {updated}
          </p>
        )}
      </section>

      {/* ── List ──────────────────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 pb-16 border-t border-foreground/[0.08] pt-4">
        <ol>
          {places.map((p, i) => {
            const catSlug = categorySlug(p.category);
            return (
              <li
                key={p.slug}
                className="border-b border-foreground/[0.08] py-7"
              >
                <div className="flex gap-5 md:gap-8">
                  <span className="text-[11px] tabular-nums text-foreground/25 pt-1 w-6 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <Link
                    href={`/places/${p.slug}`}
                    className="group flex gap-5 md:gap-8 flex-1 min-w-0"
                  >
                    <div className="w-24 md:w-36 flex-shrink-0">
                      <div className="aspect-[29/39] relative overflow-hidden bg-[#e8e6e1]">
                        {p.heroImage ? (
                          <img
                            src={cloudinaryUrl(p.heroImage, 360)}
                            alt={p.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[1.2s] ease-out"
                          />
                        ) : null}
                      </div>
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] tracking-[0.15em] uppercase text-foreground/35 mb-2">
                        {formatDistance(p.distanceKm)} · about{" "}
                        {walkMinutes(p.distanceKm)} min on foot
                      </p>
                      <h2 className="font-serif text-xl md:text-2xl text-foreground group-hover:text-foreground/60 transition-colors mb-2">
                        {p.title}
                      </h2>
                      {p.excerpt && (
                        <p className="text-[13px] text-foreground/55 leading-relaxed line-clamp-3 max-w-2xl">
                          {p.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                </div>

                {(catSlug || p.visitDurationMinutes) && (
                  <div className="flex items-center gap-5 mt-3 pl-11 md:pl-14">
                    {catSlug && (
                      <Link
                        href={`/places/category/${catSlug}`}
                        className="text-[10px] tracking-[0.15em] uppercase text-foreground/30 hover:text-foreground transition-colors"
                      >
                        {p.category}
                      </Link>
                    )}
                    {p.visitDurationMinutes ? (
                      <span className="text-[10px] tracking-[0.15em] uppercase text-foreground/25">
                        {p.visitDurationMinutes} min visit
                      </span>
                    ) : null}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      <section className="px-8 md:px-10 lg:px-14 py-10 border-t border-foreground/[0.08]">
        <Link
          href="/places"
          className="text-[10px] tracking-[0.2em] uppercase text-foreground/35 hover:text-foreground transition-colors"
        >
          All places →
        </Link>
      </section>
    </main>
  );
}
