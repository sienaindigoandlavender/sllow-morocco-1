"use client";

import ControlBar from "@/components/ControlBar";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { cloudinaryUrl } from "@/lib/cloudinary";
import Link from "next/link";
import MoroccoMapWrapper from "@/components/MoroccoMapWrapper";
import PageBanner from "@/components/PageBanner";

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

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-xs tracking-[0.1em] uppercase text-foreground/40 hover:text-foreground disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
      >
        ←
      </button>
      {pages.map((page, i) =>
        page === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="px-2 py-2 text-xs text-foreground/30"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`min-w-[36px] py-2 text-xs tracking-[0.1em] transition-colors ${
              currentPage === page
                ? "bg-foreground text-background"
                : "text-foreground/50 hover:text-foreground"
            }`}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-xs tracking-[0.1em] uppercase text-foreground/40 hover:text-foreground disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
      >
        →
      </button>
    </div>
  );
}

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

  // Filter states
  const [selectedRegion, setSelectedRegion] = useState<string>(
    regionParam || "all"
  );
  const [selectedDestination, setSelectedDestination] =
    useState<string>("all");
  const [sortBy, setSortBy] = useState<"default" | "alpha">("default");
  const [currentPage, setCurrentPage] = useState(1);

  // Update region when URL param changes
  useEffect(() => {
    if (regionParam) {
      setSelectedRegion(regionParam);
      setSelectedDestination("all");
    }
  }, [regionParam]);

  // Filter destinations based on selected region
  const filteredDestinations =
    selectedRegion === "all"
      ? destinations
      : destinations.filter((d) => d.region.includes(selectedRegion));

  // Filter and sort places
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
  }, [
    places,
    selectedRegion,
    selectedDestination,
    filteredDestinations,
    sortBy,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredPlaces.length / ITEMS_PER_PAGE);
  const paginatedPlaces = filteredPlaces.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRegion, selectedDestination, sortBy]);

  // Reset destination when region changes
  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    setSelectedDestination("all");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Immersive Hero Banner */}
      <PageBanner
        slug="places"
        fallback={{
          title: "Places",
          subtitle:
            "The villages, valleys, and hidden corners that make Morocco worth slowing down for.",
          label: "Discover",
        }}
      />

      {/* Map Section */}
      {places.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-6 lg:px-16">
            <p className="text-xs tracking-[0.3em] uppercase text-foreground/40 mb-6">
              Discover Morocco
            </p>
            <MoroccoMapWrapper
              stories={places.map((p) => ({
                slug: `places/${p.slug}`,
                title: p.title,
                subtitle: p.excerpt,
                category: p.category,
                region:
                  destinations.find((d) => d.slug === p.destination)?.title ||
                  p.destination,
              }))}
            />
          </div>
        </section>
      )}

      {/* Region Cards */}
      <section className="py-12 border-y border-foreground/10">
        <div className="container mx-auto px-6 lg:px-16">
          <h2 className="text-xs tracking-[0.2em] uppercase text-foreground/40 mb-6 text-center">
            Explore by Region
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {regions.map((region) => (
              <button
                key={region.slug}
                onClick={() =>
                  handleRegionChange(
                    region.slug === selectedRegion ? "all" : region.slug
                  )
                }
                className={`relative aspect-[4/3] overflow-hidden group ${
                  selectedRegion === region.slug ? "ring-2 ring-white" : ""
                }`}
              >
                {region.heroImage ? (
                  <img
                    src={cloudinaryUrl(region.heroImage)}
                    alt={region.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
                ) : (
                  <div className="absolute inset-0 bg-foreground/5" />
                )}
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <span className="font-serif text-lg md:text-xl">
                    {region.title}
                  </span>
                  <span className="text-xs text-foreground/60 mt-1 hidden md:block">
                    {region.subtitle}
                  </span>
                </div>
                {selectedRegion === region.slug && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-[#0a0a0a]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Destination Filter */}
      {filteredDestinations.length > 0 && (
        <section className="py-8 border-b border-foreground/10">
          <div className="container mx-auto px-6 lg:px-16">
            <h2 className="text-xs tracking-[0.2em] uppercase text-foreground/40 mb-4 text-center">
              {selectedRegion === "all"
                ? "All Destinations"
                : `Destinations in ${
                    regions.find((r) => r.slug === selectedRegion)?.title ||
                    selectedRegion
                  }`}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setSelectedDestination("all")}
                className={`text-xs tracking-[0.15em] uppercase px-4 py-2 border transition-colors ${
                  selectedDestination === "all"
                    ? "bg-white text-[#0a0a0a] border-foreground"
                    : "bg-transparent text-foreground/60 border-foreground/20 hover:border-foreground/40"
                }`}
              >
                All
              </button>
              {filteredDestinations.map((dest) => (
                <button
                  key={dest.slug}
                  onClick={() =>
                    setSelectedDestination(
                      dest.slug === selectedDestination ? "all" : dest.slug
                    )
                  }
                  className={`text-xs tracking-[0.15em] uppercase px-4 py-2 border transition-colors ${
                    selectedDestination === dest.slug
                      ? "bg-white text-[#0a0a0a] border-foreground"
                      : "bg-transparent text-foreground/60 border-foreground/20 hover:border-foreground/40"
                  }`}
                >
                  {dest.title}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Places Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-16">
          {!dataLoaded ? (
            <div className="text-center py-20">
              <p className="text-foreground/50">
                Places are being updated. Check back soon.
              </p>
            </div>
          ) : filteredPlaces.length > 0 ? (
            <>
              {/* Top pagination */}
              <div className="mb-8">
                <ControlBar
                  count={filteredPlaces.length}
                  noun="place"
                  sortBy={sortBy}
                  onSortChange={() => { setSortBy(sortBy === "default" ? "alpha" : "default"); setCurrentPage(1); }}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  showCount={false}
                  showSort={false}
                />
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {paginatedPlaces.map((place) => {
                  const dest = destinations.find(
                    (d) => d.slug === place.destination
                  );
                  return (
                    <Link
                      key={place.slug}
                      href={`/places/${place.slug}`}
                      className="group"
                    >
                      <div className="relative aspect-[3/4] mb-3 overflow-hidden bg-foreground/5">
                        {place.heroImage && (
                          <img
                            src={cloudinaryUrl(place.heroImage)}
                            alt={place.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
                        )}
                      </div>
                      <p className="text-[10px] tracking-[0.15em] uppercase text-foreground/40 mb-1">
                        {dest?.title || place.destination}
                      </p>
                      <h2 className="font-serif text-base md:text-lg text-foreground group-hover:text-foreground/70 transition-colors">
                        {place.title}
                      </h2>
                    </Link>
                  );
                })}
              </div>

              {/* Bottom pagination — centered */}
              {totalPages > 1 && (
                <div className="mt-12">
                  <ControlBar
                    count={filteredPlaces.length}
                    noun="place"
                    sortBy={sortBy}
                    onSortChange={() => { setSortBy(sortBy === "default" ? "alpha" : "default"); setCurrentPage(1); }}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    showCount={false}
                    showSort={false}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-foreground/50">
                No places found for this selection.
              </p>
              <button
                onClick={() => {
                  setSelectedRegion("all");
                  setSelectedDestination("all");
                }}
                className="mt-4 text-sm text-foreground/40 hover:text-foreground underline transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
