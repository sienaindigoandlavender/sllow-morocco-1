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
    [...visibleJourneys, ...dayTrips, ...overnightTrips],
    [visibleJourneys, dayTrips, overnightTrips]
  );

  const filteredItems = useMemo(() => {
    let result = allItems;
    if (activeFilter === "journeys") result = result.filter((i) => i.type === "journey");
    else if (activeFilter === "daytrips") result = result.filter((i) => i.type === "daytrip");
    else if (activeFilter === "overnight") result = result.filter((i) => i.type === "overnight");
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
    { id: "daytrips", label: "Day Trips" },
    { id: "overnight", label: "Overnight" },
  ];

  return (
    <main className="bg-background min-h-screen">

      {/* ── Page header ──────────────────────────────────────────────── */}
      <section className="pt-28 md:pt-36 pb-8 px-8 md:px-10 lg:px-14">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-3">
          Journeys
        </h1>
        <p className="text-sm text-foreground/45 max-w-xl mb-10">
          Every journey is private and fully customizable. Choose a starting point — we shape it around you.
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
                    : "text-foreground/35 hover:text-foreground/60"
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
                sortBy === "alpha" ? "text-foreground" : "text-foreground/35 hover:text-foreground/60"
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
            <p className="text-foreground/40 mb-4">No journeys match your current filter.</p>
            <button
              onClick={() => { setActiveFilter("all"); setCurrentPage(1); }}
              className="text-[11px] text-foreground/40 hover:text-foreground/70 underline transition-colors"
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
                    <div className="aspect-[29/39] relative overflow-hidden bg-[#e8e6e1] mb-3.5">
                      {item.heroImage && (
                        <img
                          src={cloudinaryUrl(item.heroImage, 480)}
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[1.2s] ease-out"
                          itemProp="image"
                        />
                      )}
                    </div>
                    <p className="text-[10px] text-foreground/40 mb-1.5" itemProp="duration">
                      {durationLabel}
                    </p>
                    <h3 className="text-[12px] tracking-[0.04em] uppercase leading-[1.35] text-foreground group-hover:text-foreground/60 transition-colors duration-500" itemProp="name">
                      {item.title}
                    </h3>
                    {item.price > 0 && item.type === 'journey' && (
                      <p className="text-[11px] text-foreground/60 mt-1" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                        <span itemProp="price" content={String(item.price)}>
                          From €{item.price.toLocaleString()}
                        </span>
                        <span itemProp="priceCurrency" content="EUR"> per person</span>
                      </p>
                    )}
                    {item.description && (
                      <p className="text-[11.5px] text-foreground/45 leading-[1.5] mt-1 line-clamp-2" itemProp="description">
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
              className="px-3 py-2 text-[11px] text-foreground/35 hover:text-foreground disabled:opacity-20 transition-colors"
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`min-w-[32px] py-2 text-[11px] transition-colors ${
                  currentPage === page ? "text-foreground" : "text-foreground/30 hover:text-foreground/60"
                }`}
              >
                {page}
              </button>
            ))}
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
          Private journeys, day trips from Marrakech, and overnight experiences across Morocco. Every route is a starting point you can shape around what matters to you.
        </p>
      </section>

    </main>
  );
}
