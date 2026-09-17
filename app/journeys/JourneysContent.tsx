"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { cloudinaryUrl } from "@/lib/cloudinary";

interface SearchableItem {
  type: 'journey' | 'daytrip' | 'overnight';
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  price: number;
  durationDays?: number;
  durationHours?: number;
  focus?: string;
  category?: string;
  destinations?: string;
  startCity?: string;
  hidden?: boolean;
}

interface JourneysContentProps {
  initialJourneys: SearchableItem[];
  visibleJourneys: SearchableItem[];
  dayTrips: SearchableItem[];
  overnightTrips: SearchableItem[];
  dataLoaded?: boolean;
}

const ITEMS_PER_PAGE = 24;

export default function JourneysContent({
  initialJourneys,
  visibleJourneys: initialVisibleJourneys,
  dayTrips: initialDayTrips,
  overnightTrips: initialOvernightTrips,
  dataLoaded = true,
}: JourneysContentProps) {
  const [allJourneys] = useState<SearchableItem[]>(initialJourneys);
  const [visibleJourneys] = useState<SearchableItem[]>(initialVisibleJourneys);
  const [dayTrips] = useState<SearchableItem[]>(initialDayTrips);
  const [overnightTrips] = useState<SearchableItem[]>(initialOvernightTrips);
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"default" | "alpha">("default");

  const allItems = useMemo(() =>
    [...visibleJourneys],
    [visibleJourneys]
  );

  const filteredItems = useMemo(() => {
    let result = allItems;
    if (activeFilter === "journeys") result = result.filter((i) => i.type === "journey");
    if (sortBy === "alpha") result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    return result;
  }, [allItems, activeFilter, sortBy]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filters = [
    { id: "all", label: "All" },
    { id: "journeys", label: "Multi-Day" },
  ];

  return (
    <main className="bg-background min-h-screen">

      {/* ── Page header ──────────────────────────────────────────────── */}
      <section className="pt-28 md:pt-36 pb-8 px-8 md:px-10 lg:px-14">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-3">
          Journeys
        </h1>
        <p className="text-sm text-foreground/60 max-w-xl mb-10">
          The traditions we write about, entered in person. A small number of nights and passages we arrange ourselves, for readers who want to stand inside what they have read.
        </p>
        <div className="h-[1px] bg-foreground/12" />
      </section>

      {/* ── Filter bar ───────────────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 pb-10 sticky top-16 md:top-20 bg-background z-40">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => { setActiveFilter(f.id); setCurrentPage(1); }}
                className={`text-[11px] tracking-[0.12em] uppercase whitespace-nowrap transition-colors ${
                  activeFilter === f.id
                    ? "text-foreground"
                    : "text-foreground/60 hover:text-foreground/70"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-5 flex-shrink-0 ml-6">
            <button
              onClick={() => { setSortBy(sortBy === "default" ? "alpha" : "default"); setCurrentPage(1); }}
              className={`text-[11px] tracking-[0.12em] uppercase transition-colors ${
                sortBy === "alpha" ? "text-foreground" : "text-foreground/60 hover:text-foreground/70"
              }`}
            >
              A–Z
            </button>
          </div>
        </div>
      </section>

      {/* ── Grid ─────────────────────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 pb-16 md:pb-24">
        {!dataLoaded || filteredItems.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-foreground/60 mb-4">No journeys match your current filter.</p>
            <button
              onClick={() => { setActiveFilter("all"); setCurrentPage(1); }}
              className="text-[11px] text-foreground/60 hover:text-foreground/70 underline transition-colors"
            >
              Clear filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 md:gap-x-5 gap-y-10">
            {paginatedItems.map((item) => {
              const href = item.type === "daytrip"
                ? `/day-trips/${item.slug}`
                : item.type === "overnight"
                ? `/overnight/${item.slug}`
                : `/journeys/${item.slug}`;

              const durationLabel = item.type === "daytrip"
                ? `${item.durationHours || ""}h`
                : item.type === "overnight"
                ? "2 Days"
                : `${item.durationDays || ""} Days`;

              return (
                <article key={`${item.type}-${item.slug}`} itemScope itemType="https://schema.org/TouristTrip">
                  <Link href={href} className="group block">
                    <div className="aspect-[3/4] relative overflow-hidden bg-[#f0eeeb] mb-4">
                      {item.heroImage && (
                        <img
                          src={cloudinaryUrl(item.heroImage, 480)}
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                          itemProp="image"
                        />
                      )}
                    </div>
                    <span className="block text-[10px] text-[#0a0a0a]/55 tracking-[0.1em] uppercase mb-1 font-sans" itemProp="duration">
                      {durationLabel}
                    </span>
                    <h3 className="text-[13px] tracking-[0.04em] text-[#0a0a0a] group-hover:text-[#0a0a0a]/70 transition-colors leading-snug" itemProp="name">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-[12px] text-[#0a0a0a]/55 leading-relaxed mt-1 mb-0 line-clamp-2 font-sans" itemProp="description">
                        {item.description}
                      </p>
                    )}
                  </Link>
                </article>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 mt-16 pt-10 border-t border-foreground/[0.08]">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-[11px] text-foreground/60 hover:text-foreground disabled:opacity-20 transition-colors"
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`min-w-[32px] py-2 text-[11px] transition-colors ${
                  currentPage === page ? "text-foreground" : "text-foreground/60 hover:text-foreground/70"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-[11px] text-foreground/60 hover:text-foreground disabled:opacity-20 transition-colors"
            >
              →
            </button>
          </div>
        )}
      </section>

      {/* ── SEO paragraph ────────────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 pb-16 border-t border-foreground/[0.08] pt-14">
        <p className="text-[12.5px] text-foreground/60 leading-[1.7] max-w-2xl">
          Private journeys, day trips from Marrakech, and overnight experiences across Morocco. Every route is a starting point you can shape around what matters to you.
        </p>
      </section>

    </main>
  );
}
