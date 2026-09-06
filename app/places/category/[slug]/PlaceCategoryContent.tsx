"use client";

import Link from "next/link";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { PLACE_CATEGORIES } from "@/lib/place-categories";

interface Item {
  slug: string;
  title: string;
  destination: string;
  destinationLabel: string;
  heroImage: string;
  excerpt: string;
}

interface Props {
  categorySlug: string;
  label: string;
  description: string;
  places: Item[];
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
              </Link>
            ))}
          </div>
        )}
      </section>

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
