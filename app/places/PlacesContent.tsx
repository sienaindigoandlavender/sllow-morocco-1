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

      {/* ── Map preview banner ────────────────────────────────────── */}
      <MapPreviewBanner />

      {/* ── SEO paragraph ────────────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 pb-16 border-t border-foreground/[0.08] pt-14">
        <p className="text-[12.5px] text-foreground/35 leading-[1.7] max-w-2xl">
          Places across Morocco — from the medinas of Fes and Marrakech to the kasbahs of the south and the Atlantic coast.
        </p>
      </section>

    </div>
  );
}

// ─── City dot positions (% of banner, tuned to Morocco SVG outline) ────────
const PREVIEW_DOTS = [
  { left: "42%", top: "52%", delay: "0s",    label: "Marrakech" },
  { left: "58%", top: "22%", delay: "0.4s",  label: "Fes" },
  { left: "41%", top: "30%", delay: "0.8s",  label: "Casablanca" },
  { left: "27%", top: "50%", delay: "1.2s",  label: "Essaouira" },
  { left: "50%", top: "6%",  delay: "1.6s",  label: "Tangier" },
  { left: "50%", top: "56%", delay: "2.0s",  label: "Ouarzazate" },
  { left: "68%", top: "52%", delay: "2.4s",  label: "Merzouga" },
  { left: "54%", top: "12%", delay: "2.8s",  label: "Chefchaouen" },
  { left: "46%", top: "22%", delay: "3.2s",  label: "Rabat" },
  { left: "27%", top: "62%", delay: "3.6s",  label: "Agadir" },
];

function MapPreviewBanner() {
  return (
    <section className="px-8 md:px-10 lg:px-14 py-10">
      <style>{`
        @keyframes previewGlow {
          0%, 100% { box-shadow: 0 0 4px 2px #c9a96e; }
          50%      { box-shadow: 0 0 12px 6px #c9a96e; }
        }
      `}</style>
      <Link href="/places/map" className="group block relative overflow-hidden rounded" style={{ height: "340px", background: "#141414" }}>
        {/* Morocco SVG outline as background texture */}
        <svg
          viewBox="0 0 800 500"
          className="absolute"
          style={{ top: "-5%", left: "10%", width: "80%", height: "110%", opacity: 0.08 }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M320 30 L380 25 L420 35 L440 28 L480 40 L520 32 L540 45 L560 50
               L570 80 L560 110 L550 130 L555 160 L540 190 L530 220
               L520 250 L510 270 L500 290 L480 310 L460 330 L440 350
               L420 370 L400 385 L380 395 L360 400 L340 410 L320 420
               L300 430 L280 435 L260 440 L240 445 L220 448 L200 450
               L180 445 L160 430 L150 410 L155 390 L160 370 L170 350
               L180 330 L195 310 L210 290 L225 270 L240 250 L250 230
               L260 210 L265 190 L270 170 L275 150 L280 130 L285 110
               L290 90 L300 60 L310 45 Z"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1.5"
            fill="rgba(255,255,255,0.03)"
          />
        </svg>
        {/* Subtle grid lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        {/* Glowing dots */}
        {PREVIEW_DOTS.map((dot, i) => (
          <span
            key={i}
            className="absolute z-10"
            style={{
              left: dot.left,
              top: dot.top,
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#c9a96e",
              border: "1.5px solid rgba(255,255,255,0.3)",
              animation: "previewGlow 3s ease-in-out infinite",
              animationDelay: dot.delay,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
        {/* Gradient overlay at bottom for text readability */}
        <div className="absolute inset-0 z-10" style={{
          background: "linear-gradient(to top, rgba(14,14,14,0.9) 0%, rgba(14,14,14,0.2) 50%, transparent 100%)",
        }} />
        {/* CTA text */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-8 pb-8">
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-2">
            Interactive Map
          </p>
          <h3 className="font-serif text-white/80 group-hover:text-white text-2xl md:text-3xl transition-colors">
            Explore all places on one map
          </h3>
          <p className="text-white/35 text-sm mt-2 max-w-md">
            Every medina, kasbah, oasis, and souk — mapped and searchable.
          </p>
        </div>
      </Link>
    </section>
  );
}
