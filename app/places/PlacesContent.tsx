"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { cloudinaryUrl } from "@/lib/cloudinary";
import Link from "next/link";
import AllPlacesMap from "./map/AllPlacesMap";
import { PLACE_CATEGORIES } from "@/lib/place-categories";
import { dek } from "@/lib/dek";
import VisitedTally from "@/components/VisitedTally";

interface MapPin {
  slug: string;
  title: string;
  category: string;
  destination: string;
  excerpt: string;
  hero_image: string;
  latitude: number;
  longitude: number;
  related_story_slugs: string[];
  journey_bridge: string;
}

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
  featured?: boolean;
}

interface Cluster {
  slug: string;
  title: string;
  href: string;
  count: number;
  places: Place[];
}

interface PlacesContentProps {
  initialRegions: Region[];
  initialDestinations: Destination[];
  initialPlaces: Place[];
  mapPlaces?: MapPin[];
  clusters?: Cluster[];
  featured?: Place[];
  categoryCounts?: Record<string, number>;
  lastUpdated?: string | null;
  dataLoaded?: boolean;
}

const ITEMS_PER_PAGE = 24;

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

export default function PlacesContent({
  initialRegions,
  initialDestinations,
  initialPlaces,
  mapPlaces = [],
  clusters = [],
  featured = [],
  categoryCounts = {},
  lastUpdated = null,
  dataLoaded = true,
}: PlacesContentProps) {
  const searchParams = useSearchParams();
  const regionParam = searchParams.get("region");
  /* City guides link here as /places?destination=marrakech. Nothing
     read that parameter, so every one of those links landed on an
     unfiltered list and Google logged them as soft 404s. */
  const destinationParam = searchParams.get("destination");

  const regions = initialRegions;
  const destinations = initialDestinations;
  const places = initialPlaces;

  const [selectedRegion, setSelectedRegion] = useState<string>(regionParam || "all");
  const [selectedDestination, setSelectedDestination] = useState<string>(destinationParam || "all");
  const [sortBy, setSortBy] = useState<"default" | "alpha">("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

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

  // Match on name, city, category, and the opening of the excerpt — someone
  // typing "tannery" or "waterfall" doesn't know the entry's title.
  const matches = (p: Place, q: string) => {
    const dest = destinations.find((d) => d.slug === p.destination);
    return [p.title, p.destination, dest?.title, p.category, p.excerpt]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(q);
  };

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
    const q = query.trim().toLowerCase();
    if (q) result = result.filter((p) => matches(p, q));
    if (sortBy === "alpha") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places, selectedRegion, selectedDestination, filteredDestinations, sortBy, query]);

  // If a search finds nothing inside the current filter but would find
  // something across the whole catalogue, say so rather than showing an
  // empty grid and letting them guess why.
  const hiddenByFilter = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || filteredPlaces.length > 0) return 0;
    if (selectedRegion === "all" && selectedDestination === "all") return 0;
    return places.filter((p) => matches(p, q)).length;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filteredPlaces.length, places, selectedRegion, selectedDestination]);

  const totalPages = Math.ceil(filteredPlaces.length / ITEMS_PER_PAGE);
  const paginatedPlaces = filteredPlaces.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => { setCurrentPage(1); }, [selectedRegion, selectedDestination, sortBy, query]);

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
      <section className="pt-24 md:pt-28 pb-6 px-8 md:px-10 lg:px-14">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
          {places.length > 0 ? `${places.length} places in Morocco` : "Places"}
        </h1>
            {/* How many of these the reader has stood in front of.
                Nothing at all until the first one is marked. */}
            <div className="mt-4">
              <VisitedTally slugs={places.map((p: any) => p.slug)} label="visited" />
            </div>

        <div className="grid lg:grid-cols-[minmax(0,42rem)_minmax(0,20rem)] gap-y-8 gap-x-16 items-start">
          <div>
            <p className="text-sm text-foreground/55 mb-3 leading-relaxed">
              Morocco mapped by what's worth slowing down for — medinas, kasbahs, oases, shrines, souks, and ruins, with local context for every entry.
            </p>
            <p className="text-sm text-foreground/45 mb-4 leading-relaxed">
              Filter by region below, or scan the full index at the foot of the page. Every place connects to its stories and the journeys that pass through it.
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
              htmlFor="places-search"
              className="block text-[10px] tracking-[0.25em] uppercase text-foreground/35 mb-3"
            >
              Search the atlas
            </label>
            <div className="relative">
              <input
                id="places-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tannery, waterfall, Fes…"
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
            <p
              className="text-[11px] text-foreground/35 mt-2 h-4"
              aria-live="polite"
            >
              {query.trim()
                ? `${filteredPlaces.length} ${filteredPlaces.length === 1 ? "match" : "matches"}`
                : ""}
            </p>
            <Link
              href="/places/random"
              prefetch={false}
              rel="nofollow"
              className="inline-block mt-4 text-[10px] tracking-[0.2em] uppercase text-foreground/35 hover:text-foreground transition-colors"
            >
              Take me somewhere →
            </Link>
          </div>
        </div>
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
                    {place.category ? `, ${place.category}` : ""}
                  </p>
                  <h3 className="text-[12px] tracking-[0.04em] uppercase leading-[1.35] text-foreground group-hover:text-foreground/60 transition-colors duration-500">
                    {place.title}
                  </h3>
                  {dek(place.excerpt) && (
                    <p className="text-[11px] leading-[1.45] text-foreground/45 mt-1.5">
                      {dek(place.excerpt)}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center">
            {query.trim() ? (
              <>
                <p className="text-foreground/40 mb-4">
                  Nothing matching “{query.trim()}”
                  {selectedRegion !== "all" || selectedDestination !== "all"
                    ? " in this filter."
                    : " in the atlas."}
                </p>
                {hiddenByFilter > 0 ? (
                  <button
                    onClick={() => { setSelectedRegion("all"); setSelectedDestination("all"); }}
                    className="text-[11px] text-foreground/40 hover:text-foreground/70 underline transition-colors"
                  >
                    {hiddenByFilter} {hiddenByFilter === 1 ? "match" : "matches"} elsewhere — search all places
                  </button>
                ) : (
                  <button
                    onClick={() => setQuery("")}
                    className="text-[11px] text-foreground/40 hover:text-foreground/70 underline transition-colors"
                  >
                    Clear search
                  </button>
                )}
              </>
            ) : (
              <>
                <p className="text-foreground/40 mb-4">No places found for this selection.</p>
                <button
                  onClick={() => { setSelectedRegion("all"); setSelectedDestination("all"); }}
                  className="text-[11px] text-foreground/40 hover:text-foreground/70 underline transition-colors"
                >
                  Clear filter
                </button>
              </>
            )}
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
                className={`min-w-[32px] py-2 text-[11px] tabular-nums transition-colors ${
                  currentPage === page
                    ? "text-[#8F3A24] font-medium"
                    : "text-foreground/30 hover:text-foreground/60"
                }`}
                aria-current={currentPage === page ? "page" : undefined}
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

      {/* ── Featured places — text-link strip ─────────────────────────── */}
      {featured.length > 0 && (
        <section className="px-8 md:px-10 lg:px-14 py-12 border-t border-foreground/[0.08]">
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/35 mb-5">
            Featured places
          </p>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 lg:gap-x-14">
            {featured.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/places/${p.slug}`}
                  className="block text-sm text-foreground/75 hover:text-foreground border-b border-foreground/[0.08] hover:border-foreground/40 py-2.5 transition-colors"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Map preview banner ────────────────────────────────────── */}
      {/* ── The atlas, live ───────────────────────────────────────────
          Every place with coordinates, on one map. Falls back to
          nothing if no place has been geocoded yet.
          ──────────────────────────────────────────────────────────── */}
      {mapPlaces.length > 0 && (
        <section className="px-8 md:px-10 lg:px-14 py-12 border-t border-foreground/[0.08]">
          <div className="flex items-baseline justify-between mb-5">
            <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/35">
              The atlas
            </p>
            <Link
              href="/places/map"
              className="text-[10px] tracking-[0.15em] uppercase text-foreground/35 hover:text-foreground transition-colors"
            >
              Open full screen →
            </Link>
          </div>
          <AllPlacesMap places={mapPlaces} total={mapPlaces.length} embedded />
        </section>
      )}

      {/* ── Browse by category ────────────────────────────────────────
          Fifteen routes, each an indexable landing page. Counts come
          straight off the table.
          ──────────────────────────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 py-12 border-t border-foreground/[0.08]">
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/35 mb-6">
          Browse by category
        </p>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 lg:gap-x-14">
          {PLACE_CATEGORIES.filter((c) => (categoryCounts[c.label] || 0) > 0)
            .sort(
              (a, b) =>
                (categoryCounts[b.label] || 0) - (categoryCounts[a.label] || 0),
            )
            .map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/places/category/${c.slug}`}
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

      {/* ── Full text-link index, grouped by destination ──────────────
          Every published place is a static link in the initial HTML so
          crawlers can follow them without depending on the client-side
          paginated grid above.
          ──────────────────────────────────────────────────────────── */}
      {clusters.length > 0 && (
        <section className="px-8 md:px-10 lg:px-14 py-14 border-t border-foreground/[0.08]">
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/35 mb-3">
            All places, by destination
          </p>
          <p className="text-[12.5px] text-foreground/45 max-w-2xl leading-relaxed mb-10">
            Every place in the atlas, listed in full. The grid above paginates — this index doesn't. Use it to scan the whole catalogue or jump straight to a destination.
          </p>
          <div className="space-y-12">
            {clusters.map((c) => (
              <div key={c.slug}>
                <Link
                  href={c.href}
                  className="group flex items-baseline justify-between gap-4 border-b border-foreground/25 hover:border-foreground/60 pb-2 mb-5 transition-colors"
                >
                  <span className="text-sm tracking-[0.04em] text-foreground group-hover:text-foreground/70 transition-colors">
                    {c.title}
                  </span>
                  <span className="text-[10px] tabular-nums text-foreground/30 group-hover:text-foreground/50 transition-colors">
                    {c.count}
                  </span>
                </Link>
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 lg:gap-x-14 gap-y-0.5">
                  {c.places.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/places/${p.slug}`}
                        className="block text-[13px] text-foreground/55 hover:text-foreground py-1 transition-colors"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── SEO paragraph ────────────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 pb-16 border-t border-foreground/[0.08] pt-14">
        <p className="text-[12.5px] text-foreground/35 leading-[1.7] max-w-2xl">
          From the tanneries of Fès and the kasbahs of the Draa Valley to the Atlantic ramparts of Essaouira and the mountain villages above Chefchaouen — the atlas covers Morocco as it's actually experienced, not as it's usually sold.
        </p>
      </section>

    </div>
  );
}
