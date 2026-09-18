"use client";

import Link from "next/link";
import KinfolkTile from "@/components/KinfolkTile";
import { cloudinaryUrl } from "@/lib/cloudinary";

interface Story {
  slug: string;
  title: string;
  subtitle: string | null;
  hero_image: string | null;
  excerpt: string | null;
  category: string | null;
  read_time: number | null;
  year: number | null;
  tags: string | null;
}

interface CategoryMeta {
  label: string;
  description: string;
}

interface Props {
  categorySlug: string;
  categoryLabel: string;
  description: string;
  stories: Story[];
  allCategories: Record<string, CategoryMeta>;
}

export default function StoryCategoryContent({
  categorySlug,
  categoryLabel,
  description,
  stories,
  allCategories,
}: Props) {
  // Sort: featured first (no easy flag here so keep DB order), then by year desc
  const sorted = [...stories].sort((a, b) => (b.year || 0) - (a.year || 0));

  // Other categories for the nav strip (exclude current)
  const otherCats = Object.entries(allCategories)
    .filter(([slug]) => slug !== categorySlug)
    .sort((a, b) => a[1].label.localeCompare(b[1].label));

  return (
    <main className="bg-background text-foreground">

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 pt-24 pb-16 border-b border-border">
        <Link
          href="/stories"
          className="text-[9px] tracking-[0.3em] uppercase font-mono text-foreground/60 hover:text-foreground transition-colors mb-6 inline-block"
        >
          ← All Stories
        </Link>
        <div className="flex items-end justify-between gap-8">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase font-mono text-foreground/60 mb-3">
              {stories.length} {stories.length === 1 ? "story" : "stories"}
            </p>
            <h1 className="font-serif text-5xl md:text-7xl">{categoryLabel}</h1>
          </div>
        </div>
        <p className="mt-6 text-base text-foreground/70 leading-relaxed max-w-2xl">
          {description}
        </p>
      </section>

      {/* ── Stories grid ──────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 py-16 md:py-20">
        {sorted.length === 0 ? (
          <p className="text-sm text-foreground/60">No stories in this category yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
            {sorted.map((story) => (
              <KinfolkTile
                key={story.slug}
                href={`/stories/${story.slug}`}
                image={story.hero_image}
                kicker={story.category || undefined}
                title={story.title}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── Other categories ──────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 py-12 border-t border-border">
        <p className="text-[10px] tracking-[0.3em] uppercase font-mono text-foreground/60 mb-6">
          Other categories
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {otherCats.map(([slug, cat]) => (
            <Link
              key={slug}
              href={`/stories/category/${slug}`}
              className="font-serif text-lg text-foreground/60 hover:text-foreground transition-colors"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
