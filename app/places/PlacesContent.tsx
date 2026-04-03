"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { cloudinaryUrl } from "@/lib/cloudinary";
import Link from "next/link";

interface Region {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
}

interface Destination {
  slug: string;
  title: string;
  subtitle: string;
  region: string;
  heroImage: string;
  excerpt: string;
}

interface Place {
  slug: string;
  title: string;
  destination: string;
  category: string;
  heroImage: string;
  excerpt: string;
}

interface PlacesContentProps {
  initialRegions: Region[];
  initialDestinations: Destination[];
  initialPlaces: Place[];
  dataLoaded?: boolean;
}

const ITEMS_PER_PAGE = 24;

export default function PlacesContent({
  initialRegions,
  initialDestinations,
  initialPlaces,
  dataLoaded = true,
}: PlacesContentProps) {
  const searchParams = useSearchParams();
  const regionParam = searchParams.get("region");

  const regions = initialRegions;
  const destinations = initialDestinations;
  const places = initialPlaces;

  const [selectedRegion, setSelectedRegion] = useState<string>(regionParam || "all");
  const [selectedDestination, setSelectedDestination] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"default" | "alpha">("default");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (regionParam) {
      setSelectedRegion(regionParam);
      setSelectedDestination("all");
    }
  }, [regionParam]);

  const filteredDestinations =
    selectedRegion === "all"
      ? destinations
      : destinations.filter((d) => d.region.includes(selectedRegion));

  const filteredPlaces = useMemo(() => {
    let result: Place[];
    if (selectedDestination !== "all") {
      result = places.filter((p) => p.destination === selectedDestination);
    } else if (selectedRegion !== "all") {
      const destSlugs = filteredDestinations.map((d) => d.slug);
      result = places.filter((p) => destSlugs.includes(p.destination));
    } else {
      result = [...places];
    }
    if (sortBy === "alpha") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }
    return result;
  }, [places, selectedRegion, selectedDestination, filteredDestinations, sortBy]);

  const totalPages = Math.ceil(filteredPlaces.length / ITEMS_PER_PAGE);
  const paginatedPlaces = filteredPlaces.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => { setCurrentPage(1); }, [selectedRegion, selectedDestination, sortBy]);

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    setSelectedDestination("all");
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Build filter list: All + regions + destinations under active region
  const regionFilters = [
    { id: "all", label: "All" },
    ...regions.map((r) => ({ id: r.slug, label: r.title })),
  ];

  const destinationFilters = filteredDestinations.length > 0
    ? [{ id: "all", label: "All Cities" }, ...filteredDestinations.map((d) => ({ id: d.slug, label: d.title }))]
    : [];

  return (
    <div className="bg-background text-foreground min-h-screen">

      {/* ── Page header ──────────────────────────────────────────────── */}
      <section className="pt-28 md:pt-36 pb-8 px-8 md:px-10 lg:px-14">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-3">
          Places
        </h1>
        <p className="text-sm text-foreground/45 max-w-xl mb-10">
          The villages, valleys, and hidden corners that make Morocco worth slowing down for.
        </p>
        <div className="h-[1px] bg-foreground/12" />
      </section>

      {/* ── Filter bar — regions ──────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 pb-4 sticky top-16 md:top-20 bg-background z-40">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {regionFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => handleRegionChange(f.id)}
                className={`text-[11px] tracking-[0.12em] uppercase whitespace-nowrap transition-colors ${
                  selectedRegion === f.id
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

      {/* ── Destination sub-filter (when region selected) ─────────────── */}
      {selectedRegion !== "all" && destinationFilters.length > 1 && (
        <section className="px-8 md:px-10 lg:px-14 pb-8">
          <div className="flex items-center gap-4 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {destinationFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => { setSelectedDestination(f.id); setCurrentPage(1); }}
                className={`text-[10.5px] tracking-[0.1em] whitespace-nowrap transition-colors ${
                  selectedDestination === f.id
                    ? "text-foreground"
                    : "text-foreground/30 hover:text-foreground/50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ── Grid ─────────────────────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 pb-16 md:pb-24">
        {filteredPlaces.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 md:gap-x-5 gap-y-10">
            {paginatedPlaces.map((place) => {
              const dest = destinations.find((d) => d.slug === place.destination);
              return (
                <Link key={place.slug} href={`/places/${place.slug}`} className="group block">
                  <div className="aspect-[29/39] relative overflow-hidden bg-[#e8e6e1] mb-3.5">
                    {place.heroImage ? (
                      <img
                        src={cloudinaryUrl(place.heroImage, 480)}
                        alt={place.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[1.2s] ease-out"
                      />
                    ) : null}
                  </div>
                  <p className="text-[10px] text-foreground/40 mb-1.5">
                    {dest?.title || place.destination}
                  </p>
                  <h3 className="text-[12px] tracking-[0.04em] uppercase leading-[1.35] text-foreground group-hover:text-foreground/60 transition-colors duration-500">
                    {place.title}
                  </h3>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-foreground/40 mb-4">No places found for this selection.</p>
            <button
              onClick={() => { setSelectedRegion("all"); setSelectedDestination("all"); }}
              className="text-[11px] text-foreground/40 hover:text-foreground/70 underline transition-colors"
            >
              Clear filter
            </button>
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
          Places across Morocco — from the medinas of Fes and Marrakech to the kasbahs of the south and the Atlantic coast.
        </p>
      </section>

    </div>
  );
}
