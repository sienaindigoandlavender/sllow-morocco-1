"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { cloudinaryUrl } from "@/lib/cloudinary";

interface Story {
  slug: string;
  title: string;
  subtitle?: string;
  mood?: string;
  heroImage?: string;
  excerpt?: string;
}

interface StoriesContentProps {
  initialStories: Story[];
  dataLoaded?: boolean;
}

const STORIES_PER_PAGE = 24;

export default function StoriesContent({
  initialStories,
  dataLoaded = true,
}: StoriesContentProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"default" | "alpha">("default");

  const categories = useMemo(() => {
    const cats = new Set(initialStories.map((s) => s.mood).filter((m): m is string => !!m));
    return ["all", ...Array.from(cats).sort()];
  }, [initialStories]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: initialStories.length };
    initialStories.forEach((s) => {
      if (s.mood) counts[s.mood] = (counts[s.mood] || 0) + 1;
    });
    return counts;
  }, [initialStories]);

  const filteredStories = useMemo(() => {
    let result = initialStories;
    if (activeFilter !== "all") {
      result = result.filter(
        (s) => s.mood?.toLowerCase() === activeFilter.toLowerCase()
      );
    }
    if (sortBy === "alpha") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }
    return result;
  }, [initialStories, activeFilter, sortBy]);

  const totalPages = Math.ceil(filteredStories.length / STORIES_PER_PAGE);
  const paginatedStories = filteredStories.slice(
    (currentPage - 1) * STORIES_PER_PAGE,
    currentPage * STORIES_PER_PAGE
  );

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-background min-h-screen">

      {/* ── Page header — serif title, rule line ─────────────────────── */}
      <section className="pt-28 md:pt-36 pb-8 px-8 md:px-10 lg:px-14">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-3">
          Stories
        </h1>
        <p className="text-sm text-foreground/45 max-w-xl mb-10">
          The history, craft, food, music, and people that make Morocco make sense.
        </p>
        <div className="h-[1px] bg-foreground/12" />
      </section>

      {/* ── Filter bar — categories + count + sort ───────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 pb-10 sticky top-16 md:top-20 bg-background z-40">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveFilter(cat); setCurrentPage(1); }}
                className={`text-[11px] tracking-[0.12em] uppercase whitespace-nowrap transition-colors flex items-baseline gap-1.5 ${
                  activeFilter === cat
                    ? "text-foreground"
                    : "text-foreground/35 hover:text-foreground/60"
                }`}
              >
                {cat === "all" ? "All" : cat}
                <span className={`text-[9px] ${activeFilter === cat ? "text-foreground/40" : "text-foreground/20"}`}>
                  {categoryCounts[cat] || 0}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-5 flex-shrink-0 ml-6">
            <button
              onClick={() => { setSortBy(sortBy === "default" ? "alpha" : "default"); setCurrentPage(1); }}
              className={`text-[11px] tracking-[0.12em] uppercase transition-colors ${
                sortBy === "alpha" ? "text-foreground" : "text-foreground/35 hover:text-foreground/60"
              }`}
            >
              A–Z
            </button>
          </div>
        </div>
      </section>

      {/* ── Grid — 6 across, Kinfolk portrait cards ──────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 pb-16 md:pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 md:gap-x-5 gap-y-10">
          {paginatedStories.map((story) => (
            <article key={story.slug} itemScope itemType="https://schema.org/Article">
              <Link href={`/stories/${story.slug}`} className="group block">
                <div className="aspect-[29/39] relative overflow-hidden bg-[#e8e6e1] mb-3.5">
                  {story.heroImage && (
                    <img
                      src={cloudinaryUrl(story.heroImage, 480)}
                      alt={story.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[1.2s] ease-out"
                      itemProp="image"
                    />
                  )}
                </div>
                {story.mood && (
                  <p className="text-[10px] text-foreground/40 mb-1.5">
                    {story.mood}
                  </p>
                )}
                <h3 className="text-[12px] tracking-[0.04em] uppercase leading-[1.35] text-foreground group-hover:text-foreground/60 transition-colors duration-500" itemProp="headline">
                  {story.title}
                </h3>
                {story.subtitle && (
                  <p className="text-[11.5px] text-foreground/45 leading-[1.5] mt-1 line-clamp-2" itemProp="description">
                    {story.subtitle}
                  </p>
                )}
              </Link>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 mt-16 pt-10 border-t border-foreground/[0.08]">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-[11px] text-foreground/35 hover:text-foreground disabled:opacity-20 transition-colors"
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .reduce<(number | string)[]>((acc, page) => {
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 2 && page <= currentPage + 2)
                ) {
                  if (acc.length > 0 && typeof acc[acc.length - 1] === "number" && (acc[acc.length - 1] as number) !== page - 1) {
                    acc.push("...");
                  }
                  acc.push(page);
                }
                return acc;
              }, [])
              .map((item, i) =>
                item === "..." ? (
                  <span key={`ellipsis-${i}`} className="px-1 text-[11px] text-foreground/20">…</span>
                ) : (
                  <button
                    key={item}
                    onClick={() => goToPage(item as number)}
                    className={`min-w-[32px] py-2 text-[11px] transition-colors ${
                      currentPage === item ? "text-foreground" : "text-foreground/30 hover:text-foreground/60"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-[11px] text-foreground/35 hover:text-foreground disabled:opacity-20 transition-colors"
            >
              →
            </button>
          </div>
        )}
      </section>

      {/* ── SEO paragraph ────────────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 pb-16 border-t border-foreground/[0.08] pt-14">
        <p className="text-[12.5px] text-foreground/35 leading-[1.7] max-w-2xl">
          Cultural essays, artisan profiles, and deep-cuts from life in Morocco.
        </p>
      </section>

    </div>
  );
}
