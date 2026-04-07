"use client";

import { useEffect, useState, useMemo, useRef, useCallback } from "react";
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

// ─── Key Moroccan cities for preview dots ──────────────────────────────────
const PREVIEW_DOTS = [
  { lat: 31.6295, lng: -7.9811, label: "Marrakech" },
  { lat: 34.0331, lng: -5.0003, label: "Fes" },
  { lat: 33.5731, lng: -7.5898, label: "Casablanca" },
  { lat: 31.5085, lng: -9.7595, label: "Essaouira" },
  { lat: 35.7595, lng: -5.8340, label: "Tangier" },
  { lat: 30.9335, lng: -6.9370, label: "Ouarzazate" },
  { lat: 31.0802, lng: -4.0131, label: "Merzouga" },
  { lat: 35.1688, lng: -5.2636, label: "Chefchaouen" },
  { lat: 34.0209, lng: -6.8416, label: "Rabat" },
  { lat: 30.4278, lng: -9.5981, label: "Agadir" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let previewMapboxgl: any = null;

function MapPreviewBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [ready, setReady] = useState(false);

  const initPreview = useCallback(async () => {
    if (!containerRef.current || mapRef.current) return;

    if (!previewMapboxgl) {
      const mb = await import("mapbox-gl");
      previewMapboxgl = mb.default;
      previewMapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
      if (!document.getElementById("mapbox-gl-css")) {
        const link = document.createElement("link");
        link.id = "mapbox-gl-css";
        link.rel = "stylesheet";
        link.href = "https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css";
        document.head.appendChild(link);
      }
      if (!document.getElementById("preview-pulse-css")) {
        const style = document.createElement("style");
        style.id = "preview-pulse-css";
        style.textContent = `
          @keyframes previewGlow {
            0%, 100% { box-shadow: 0 0 4px 2px #c9a96e; }
            50%      { box-shadow: 0 0 10px 5px #c9a96e; }
          }
        `;
        document.head.appendChild(style);
      }
    }

    if (!containerRef.current) return;

    const m = new previewMapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-6.5, 31.5],
      zoom: 4.8,
      interactive: false,
      attributionControl: false,
    });

    mapRef.current = m;

    m.on("load", () => {
      PREVIEW_DOTS.forEach((dot, i) => {
        const el = document.createElement("div");
        el.style.cssText = `
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #c9a96e;
          border: 1.5px solid rgba(255,255,255,0.35);
          animation: previewGlow 3s ease-in-out infinite;
          animation-delay: ${i * 0.3}s;
        `;
        new previewMapboxgl.Marker({ element: el, anchor: "center" })
          .setLngLat([dot.lng, dot.lat])
          .addTo(m);
      });
      setReady(true);
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { initPreview(); observer.disconnect(); } },
      { rootMargin: "200px" }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [initPreview]);

  return (
    <section className="px-8 md:px-10 lg:px-14 py-10">
      <Link href="/places/map" className="group block relative overflow-hidden rounded" style={{ height: "320px" }}>
        {/* Map container */}
        <div ref={containerRef} className="absolute inset-0" style={{ opacity: ready ? 1 : 0, transition: "opacity 0.8s" }} />
        {/* Fallback dark bg while loading */}
        <div className="absolute inset-0 bg-[#1a1a1a]" style={{ zIndex: ready ? -1 : 0 }} />
        {/* Gradient overlay */}
        <div className="absolute inset-0 z-10" style={{
          background: "linear-gradient(to top, rgba(14,14,14,0.85) 0%, rgba(14,14,14,0.3) 50%, rgba(14,14,14,0.15) 100%)",
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
