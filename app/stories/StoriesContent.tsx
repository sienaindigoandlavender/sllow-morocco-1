"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { dek } from "@/lib/dek";
import { STORY_CATEGORIES, storyCategorySlug } from "@/lib/story-categories";

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
  lastUpdated?: string | null;
  dataLoaded?: boolean;
}

const STORIES_PER_PAGE = 24;

function formatUpdated(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function StoriesContent({
  initialStories,
  lastUpdated = null,
  dataLoaded = true,
}: StoriesContentProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"default" | "alpha">("default");
  const [query, setQuery] = useState("");

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

  // Match on title, subtitle, category, and excerpt — someone searching
  // "gnawa" or "tannery" doesn't know the essay's title.
  const matches = (s: Story, q: string) =>
    [s.title, s.subtitle, s.mood, s.excerpt]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(q);

  const filteredStories = useMemo(() => {
    let result = initialStories;
    if (activeFilter !== "all") {
      result = result.filter(
        (s) => s.mood?.toLowerCase() === activeFilter.toLowerCase()
      );
    }
    const q = query.trim().toLowerCase();
    if (q) result = result.filter((s) => matches(s, q));
    if (sortBy === "alpha") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialStories, activeFilter, sortBy, query]);

  // Nothing here, but something elsewhere? Say so instead of showing a
  // blank grid and letting the reader guess why.
  const hiddenByFilter = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || filteredStories.length > 0 || activeFilter === "all") return 0;
    return initialStories.filter((s) => matches(s, q)).length;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filteredStories.length, initialStories, activeFilter]);

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
      <section className="pt-24 md:pt-28 pb-8 px-8 md:px-10 lg:px-14">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
          {initialStories.length > 0
            ? `${initialStories.length} stories from Morocco`
            : "Stories"}
        </h1>

        <div className="grid lg:grid-cols-[minmax(0,42rem)_minmax(0,20rem)] gap-y-8 gap-x-16 items-start mb-10">
          <div>
            <p className="text-sm text-foreground/45 mb-4 leading-relaxed">
              The history, craft, food, music, and people that make Morocco make sense.
            </p>
            {formatUpdated(lastUpdated) && (
              <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30">
                Updated {formatUpdated(lastUpdated)}
              </p>
            )}
          </div>

          {/* Search — filters the grid live, no submit */}
          <div className="lg:pt-1">
            <label
              htmlFor="stories-search"
              className="block text-[10px] tracking-[0.25em] uppercase text-foreground/35 mb-3"
            >
              Search the edit
            </label>
            <div className="relative">
              <input
                id="stories-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Gnawa, argan, zellige…"
                autoComplete="off"
                className="w-full bg-transparent border-b border-foreground/20 focus:border-foreground/60 pb-2 pr-7 text-sm text-foreground placeholder:text-foreground/25 outline-none transition-colors"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-0 bottom-2 text-foreground/30 hover:text-foreground text-base leading-none transition-colors"
                >
                  ×
                </button>
              )}
            </div>
            <p className="text-[11px] text-foreground/35 mt-2 h-4" aria-live="polite">
              {query.trim()
                ? `${filteredStories.length} ${filteredStories.length === 1 ? "match" : "matches"}`
                : ""}
            </p>
            <Link
              href="/stories/random"
              prefetch={false}
              rel="nofollow"
              className="inline-block mt-4 text-[10px] tracking-[0.2em] uppercase text-foreground/35 hover:text-foreground transition-colors"
            >
              Read something at random →
            </Link>
          </div>
        </div>

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
        {filteredStories.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-foreground/40 mb-4">
              {query.trim()
                ? `Nothing matching “${query.trim()}”${activeFilter !== "all" ? " in this category." : " in the edit."}`
                : "No stories in this category yet."}
            </p>
            {hiddenByFilter > 0 ? (
              <button
                onClick={() => setActiveFilter("all")}
                className="text-[11px] text-foreground/40 hover:text-foreground/70 underline transition-colors"
              >
                {hiddenByFilter} {hiddenByFilter === 1 ? "match" : "matches"} elsewhere — search everything
              </button>
            ) : query.trim() ? (
              <button
                onClick={() => setQuery("")}
                className="text-[11px] text-foreground/40 hover:text-foreground/70 underline transition-colors"
              >
                Clear search
              </button>
            ) : null}
          </div>
        ) : (
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
                {(story.subtitle || dek(story.excerpt)) && (
                  <p className="text-[11.5px] text-foreground/45 leading-[1.5] mt-1 line-clamp-2" itemProp="description">
                    {story.subtitle || dek(story.excerpt)}
                  </p>
                )}
              </Link>
            </article>
          ))}
        </div>
        )}

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
                    className={`min-w-[32px] py-2 text-[11px] tabular-nums transition-colors ${
                      currentPage === item
                        ? "text-[#8F3A24] font-medium"
                        : "text-foreground/30 hover:text-foreground/60"
                    }`}
                    aria-current={currentPage === item ? "page" : undefined}
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

      {/* ── Browse by category ────────────────────────────────────────
          Seventeen routes, each an indexable landing page. Nothing on
          this page linked to them before.
          ──────────────────────────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 py-12 border-t border-foreground/[0.08]">
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/35 mb-6">
          Browse by category
        </p>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 lg:gap-x-14">
          {STORY_CATEGORIES.filter((c) => (categoryCounts[c.label] || 0) > 0)
            .sort(
              (a, b) => (categoryCounts[b.label] || 0) - (categoryCounts[a.label] || 0),
            )
            .map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/stories/category/${c.slug}`}
                  className="group flex items-baseline justify-between gap-3 border-b border-foreground/[0.08] hover:border-foreground/40 py-2.5 transition-colors"
                >
                  <span className="text-sm text-foreground/75 group-hover:text-foreground transition-colors">
                    {c.label}
                  </span>
                  <span className="text-[10px] tabular-nums text-foreground/25 group-hover:text-foreground/50 transition-colors">
                    {categoryCounts[c.label]}
                  </span>
                </Link>
              </li>
            ))}
        </ul>
      </section>

      {/* ── Full text index, grouped by category ──────────────────────
          Every published essay as a static link in the initial HTML,
          so crawlers don't depend on the client-side paginated grid.
          ──────────────────────────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 py-14 border-t border-foreground/[0.08]">
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/35 mb-3">
          All stories, by category
        </p>
        <p className="text-[12.5px] text-foreground/45 max-w-2xl leading-relaxed mb-10">
          Every essay in the edit, listed in full. The grid above paginates — this index doesn't.
        </p>
        <div className="space-y-12">
          {STORY_CATEGORIES.filter((c) => (categoryCounts[c.label] || 0) > 0)
            .sort(
              (a, b) => (categoryCounts[b.label] || 0) - (categoryCounts[a.label] || 0),
            )
            .map((c) => {
              const inCat = initialStories
                .filter((s) => s.mood?.toLowerCase() === c.label.toLowerCase())
                .sort((a, b) => a.title.localeCompare(b.title));
              return (
                <div key={c.slug}>
                  <Link
                    href={`/stories/category/${c.slug}`}
                    className="group flex items-baseline justify-between gap-4 border-b border-foreground/25 hover:border-foreground/60 pb-2 mb-5 transition-colors"
                  >
                    <span className="text-sm tracking-[0.04em] text-foreground group-hover:text-foreground/70 transition-colors">
                      {c.label}
                    </span>
                    <span className="text-[10px] tabular-nums text-foreground/30 group-hover:text-foreground/50 transition-colors">
                      {inCat.length}
                    </span>
                  </Link>
                  <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 lg:gap-x-14 gap-y-0.5">
                    {inCat.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/stories/${s.slug}`}
                          className="block text-[13px] text-foreground/55 hover:text-foreground py-1 transition-colors"
                        >
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
        </div>
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
