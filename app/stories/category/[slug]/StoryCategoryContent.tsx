"use client";

import Link from "next/link";
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
          className="text-[9px] tracking-[0.3em] uppercase font-mono text-foreground/30 hover:text-foreground transition-colors mb-6 inline-block"
        >
          ← All Stories
        </Link>
        <div className="flex items-end justify-between gap-8">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase font-mono text-foreground/30 mb-3">
              {stories.length} {stories.length === 1 ? "story" : "stories"}
            </p>
            <h1 className="font-serif text-5xl md:text-7xl">{categoryLabel}</h1>
          </div>
        </div>
        <p className="mt-6 text-base text-foreground/60 leading-relaxed max-w-2xl">
          {description}
        </p>
      </section>

      {/* ── Stories grid ──────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 py-16 md:py-20">
        {sorted.length === 0 ? (
          <p className="text-sm text-foreground/40">No stories in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {sorted.map((story, i) => (
              <article key={story.slug} className={i === 0 ? "md:col-span-2 lg:col-span-1" : ""}>
                <Link href={`/stories/${story.slug}`} className="group">
                  {/* Image */}
                  <div className="aspect-[3/4] relative overflow-hidden bg-[#f0f0f0] mb-5">
                    {story.hero_image && (
                      <img
                        src={cloudinaryUrl(story.hero_image, 600)}
                        alt={story.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    )}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-2">
                    {story.year && (
                      <span className="text-[9px] tracking-[0.2em] uppercase font-mono text-foreground/30">
                        {story.year}
                      </span>
                    )}
                    {story.read_time && (
                      <span className="text-[9px] tracking-[0.2em] uppercase font-mono text-foreground/30">
                        {story.read_time} min
                      </span>
                    )}
                  </div>

                  <h2 className="font-serif text-xl mb-2 group-hover:text-foreground/60 transition-colors leading-snug">
                    {story.title}
                  </h2>
                  {story.subtitle && (
                    <p className="text-sm text-foreground/50 mb-2 italic">
                      {story.subtitle}
                    </p>
                  )}
                  {story.excerpt && (
                    <p className="text-sm text-foreground/60 leading-relaxed line-clamp-2">
                      {story.excerpt}
                    </p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ── Other categories ──────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 py-12 border-t border-border">
        <p className="text-[10px] tracking-[0.3em] uppercase font-mono text-foreground/30 mb-6">
          Other categories
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {otherCats.map(([slug, cat]) => (
            <Link
              key={slug}
              href={`/stories/category/${slug}`}
              className="font-serif text-lg text-foreground/40 hover:text-foreground transition-colors"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
