"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mapboxgl: any = null;

interface PlacePin {
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

interface Props {
  places: PlacePin[];
  total: number;
}

// ── Category colours ───────────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  // original
  Architecture:      "#c9a96e",
  Nature:            "#7aad6e",
  Culture:           "#e07b5a",
  History:           "#9b8db0",
  Food:              "#d4885c",
  Sacred:            "#6eaab0",
  Craft:             "#b09b6e",
  Market:            "#d4b96e",
  Museum:            "#8db09b",
  // new from expansion
  Neighborhoods:     "#a8c4d4",
  Monuments:         "#c9a96e",
  Natural:           "#7aad6e",
  Kasbahs:           "#c4956a",
  Villages:          "#b5a882",
  Towns:             "#9aab8e",
  Historic:          "#9b8db0",
  Workshops:         "#b09b6e",
  "Working areas":   "#b09b6e",
  "Squares & Markets": "#d4b96e",
  "Historic Quarter":  "#9b8db0",
  Museums:           "#8db09b",
};

const DEFAULT_COLOR = "#c9a96e";

function getCategoryColor(cat: string): string {
  if (!cat) return DEFAULT_COLOR;
  const exact = CATEGORY_COLORS[cat];
  if (exact) return exact;
  for (const [key, val] of Object.entries(CATEGORY_COLORS)) {
    if (cat.toLowerCase().includes(key.toLowerCase())) return val;
  }
  return DEFAULT_COLOR;
}

// ── Cluster helpers ────────────────────────────────────────────────────────────
const CLUSTER_RADIUS_PX = 40;

function latLngToPixel(
  lat: number,
  lng: number,
  map: any
): { x: number; y: number } {
  const pt = map.project([lng, lat]);
  return { x: pt.x, y: pt.y };
}

function clusterPlaces(
  places: PlacePin[],
  map: any
): Array<{ places: PlacePin[]; lat: number; lng: number }> {
  const pixels = places.map((p) => ({
    place: p,
    ...latLngToPixel(p.latitude, p.longitude, map),
    used: false,
  }));

  const clusters: Array<{ places: PlacePin[]; lat: number; lng: number }> = [];

  for (let i = 0; i < pixels.length; i++) {
    if (pixels[i].used) continue;
    const group = [pixels[i]];
    pixels[i].used = true;

    for (let j = i + 1; j < pixels.length; j++) {
      if (pixels[j].used) continue;
      const dx = pixels[i].x - pixels[j].x;
      const dy = pixels[i].y - pixels[j].y;
      if (Math.sqrt(dx * dx + dy * dy) < CLUSTER_RADIUS_PX) {
        group.push(pixels[j]);
        pixels[j].used = true;
      }
    }

    const lat = group.reduce((s, g) => s + g.place.latitude, 0) / group.length;
    const lng = group.reduce((s, g) => s + g.place.longitude, 0) / group.length;
    clusters.push({ places: group.map((g) => g.place), lat, lng });
  }

  return clusters;
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function AllPlacesMap({ places, total }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const markers = useRef<any[]>([]);
  const renderTimer = useRef<any>(null);

  const [selected, setSelected] = useState<PlacePin | null>(null);
  const [clusterGroup, setClusterGroup] = useState<PlacePin[] | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(places.length);
  const [showSearch, setShowSearch] = useState(false);

  // deduplicated, sorted category list
  const categories = [
    "All",
    ...Array.from(new Set(places.map((p) => p.category).filter(Boolean))).sort(),
  ];

  // filtered place set
  const filtered = useCallback(() => {
    let pool = activeCategory === "All"
      ? places
      : places.filter((p) => p.category === activeCategory);

    if (search.trim().length > 1) {
      const q = search.toLowerCase();
      pool = pool.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.destination.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return pool;
  }, [places, activeCategory, search]);

  // ── Map init ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    async function initMap() {
      if (!mapboxgl) {
        const mb = await import("mapbox-gl");
        mapboxgl = mb.default;
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
        if (!document.getElementById("mapbox-gl-css")) {
          const link = document.createElement("link");
          link.id = "mapbox-gl-css";
          link.rel = "stylesheet";
          link.href = "https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css";
          document.head.appendChild(link);
        }
        // Inject pulse animation for map dots
        if (!document.getElementById("map-pulse-css")) {
          const style = document.createElement("style");
          style.id = "map-pulse-css";
          style.textContent = `
            @keyframes dotPulse {
              0%   { transform: translate(-50%,-50%) scale(1); opacity: 0.6; }
              100% { transform: translate(-50%,-50%) scale(3.5); opacity: 0; }
            }
          `;
          document.head.appendChild(style);
        }
      }

      if (!mapContainer.current) return;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [-6.5, 31.5],
        zoom: 5.2,
        minZoom: 3,
        maxZoom: 16,
        attributionControl: false,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({ showCompass: false }),
        "bottom-right"
      );

      map.current.on("load", () => setMapLoaded(true));
      map.current.on("click", () => {
        setSelected(null);
        setClusterGroup(null);
      });

      // Re-cluster on move/zoom
      map.current.on("moveend", () => {
        if (renderTimer.current) clearTimeout(renderTimer.current);
        renderTimer.current = setTimeout(() => {
          setMapLoaded((v) => {
            if (v) renderMarkers();
            return v;
          });
        }, 50);
      });
    }

    initMap();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Render markers ────────────────────────────────────────────────────────────
  const renderMarkers = useCallback(() => {
    if (!map.current) return;

    markers.current.forEach((m) => m.remove());
    markers.current = [];

    const pool = filtered();
    setCount(pool.length);

    const clusters = clusterPlaces(pool, map.current);

    clusters.forEach((cluster) => {
      const isSingle = cluster.places.length === 1;
      const place = cluster.places[0];
      const color = getCategoryColor(place.category);

      const el = document.createElement("div");

      if (isSingle) {
        // Glowing dot — fixed-size container, child elements for dot + pulse ring
        el.style.cssText = `width:20px;height:20px;position:relative;cursor:pointer;`;

        const inner = document.createElement("div");
        inner.style.cssText = `
          position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
          width:6px;height:6px;background:${color};border-radius:50%;
          transition:all 0.25s ease;
          box-shadow:0 0 0 0 rgba(255,255,255,0.4);
        `;

        const pulse = document.createElement("div");
        pulse.style.cssText = `
          position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
          width:6px;height:6px;border-radius:50%;
          background:${color.replace(')', ',0.25)').replace('rgb', 'rgba').replace('#', '')};
          opacity:0.25;
          animation:dotPulse 2.5s ease-out infinite;
          animation-delay:${Math.random() * 2}s;
        `;
        // Set pulse background via computed rgba
        pulse.style.background = color;
        pulse.style.opacity = "0.25";

        el.appendChild(pulse);
        el.appendChild(inner);

        el.addEventListener("mouseenter", () => {
          inner.style.width = "10px";
          inner.style.height = "10px";
          inner.style.boxShadow = `0 0 8px 3px ${color}`;
        });
        el.addEventListener("mouseleave", () => {
          inner.style.width = "6px";
          inner.style.height = "6px";
          inner.style.boxShadow = "0 0 0 0 rgba(255,255,255,0.4)";
        });
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          setClusterGroup(null);
          setSelected(place);
          map.current.easeTo({
            center: [place.longitude, place.latitude],
            zoom: Math.max(map.current.getZoom(), 8),
            duration: 500,
            offset: [-170, 0],
          });
        });
      } else {
        // Cluster bubble
        const size = Math.min(14 + cluster.places.length * 1.8, 38);
        el.style.cssText = `
          width: ${size}px; height: ${size}px;
          border-radius: 50%;
          background: rgba(201,169,110,0.85);
          border: 1.5px solid rgba(255,255,255,0.4);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          font-size: ${Math.max(9, size * 0.38)}px;
          font-weight: 500;
          color: #0e0e0e;
          transition: transform 0.15s;
          font-family: sans-serif;
        `;
        el.textContent = String(cluster.places.length);
        el.addEventListener("mouseenter", () => {
          el.style.transform = "scale(1.15)";
        });
        el.addEventListener("mouseleave", () => {
          el.style.transform = "scale(1)";
        });
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          setSelected(null);
          // If zoom is low, zoom in to dissolve cluster
          const zoom = map.current.getZoom();
          if (zoom < 9) {
            map.current.easeTo({
              center: [cluster.lng, cluster.lat],
              zoom: zoom + 2.5,
              duration: 500,
            });
          } else {
            // Show list
            setClusterGroup(cluster.places);
          }
        });
      }

      const marker = new mapboxgl.Marker({ element: el, anchor: "center" })
        .setLngLat([cluster.lng, cluster.lat])
        .addTo(map.current);

      markers.current.push(marker);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered]);

  // Re-render when map loads or filters change
  useEffect(() => {
    if (!mapLoaded) return;
    renderMarkers();
  }, [mapLoaded, renderMarkers]);

  // ── UI ────────────────────────────────────────────────────────────────────────
  return (
    <div
      className="relative w-full bg-[#0e0e0e]"
      style={{ height: "100dvh", overflow: "hidden" }}
    >
      {/* Map fills entire screen */}
      <div ref={mapContainer} style={{ position: "absolute", inset: 0 }} />

      {/* Header bar */}
      <div
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, transparent 100%)",
        }}
      >
        <div className="flex items-center gap-4">
          <Link
            href="/places"
            className="text-[10px] tracking-[0.25em] uppercase text-white/50 hover:text-white/80 transition-colors"
          >
            ← All Places
          </Link>
          <span className="text-white/20">|</span>
          <p className="text-[10px] tracking-[0.25em] uppercase text-white/50">
            {count} of {total} places
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search toggle */}
          <button
            onClick={() => setShowSearch((v) => !v)}
            className="text-white/40 hover:text-white/80 transition-colors"
            aria-label="Search places"
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.2"/>
              <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </button>
          <p className="font-serif text-white/70 text-sm tracking-wide hidden md:block">
            Morocco — All Places
          </p>
        </div>
      </div>

      {/* Search bar */}
      {showSearch && (
        <div
          className="absolute top-14 left-1/2 z-30"
          style={{ transform: "translateX(-50%)", width: "min(400px, 90vw)" }}
        >
          <input
            autoFocus
            type="text"
            placeholder="Search places, cities, categories…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 16px",
              background: "rgba(14,14,14,0.92)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "6px",
              color: "rgba(255,255,255,0.85)",
              fontSize: "13px",
              outline: "none",
              backdropFilter: "blur(12px)",
              fontFamily: "var(--font-sans, sans-serif)",
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setShowSearch(false);
                setSearch("");
              }
            }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.4)",
                cursor: "pointer",
                fontSize: "16px",
                lineHeight: 1,
              }}
            >
              ×
            </button>
          )}
        </div>
      )}

      {/* Category filter pills */}
      <div
        className="absolute bottom-6 left-0 right-0 z-20 flex items-center gap-2 px-6 overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase transition-all duration-200 rounded-full flex-shrink-0 whitespace-nowrap"
            style={{
              background:
                activeCategory === cat ? "#ffffff" : "rgba(0,0,0,0.6)",
              color:
                activeCategory === cat
                  ? "#0e0e0e"
                  : "rgba(255,255,255,0.5)",
              border: `1px solid ${
                activeCategory === cat
                  ? "#ffffff"
                  : "rgba(255,255,255,0.15)"
              }`,
              backdropFilter: "blur(8px)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div
        className="absolute top-16 left-4 z-20 hidden md:flex flex-col gap-2 p-3 rounded"
        style={{
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.08)",
          maxHeight: "calc(100dvh - 120px)",
          overflowY: "auto",
        }}
      >
        {Object.entries(CATEGORY_COLORS)
          .filter(([cat]) =>
            categories.includes(cat)
          )
          .map(([cat, color]) => (
            <div
              key={cat}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() =>
                setActiveCategory(activeCategory === cat ? "All" : cat)
              }
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: color }}
              />
              <span
                className="text-[10px] tracking-[0.1em] uppercase"
                style={{
                  color:
                    activeCategory === cat || activeCategory === "All"
                      ? "rgba(255,255,255,0.7)"
                      : "rgba(255,255,255,0.25)",
                }}
              >
                {cat}
              </span>
            </div>
          ))}
      </div>

      {/* Cluster list panel */}
      {clusterGroup && !selected && (
        <div
          className="absolute top-0 right-0 bottom-0 z-30 flex flex-col"
          style={{
            width: "300px",
            background: "#0e0e0e",
            borderLeft: "1px solid rgba(255,255,255,0.08)",
            overflowY: "auto",
          }}
        >
          <div
            className="flex items-center justify-between px-6 py-5"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="text-[10px] tracking-[0.2em] uppercase text-white/40">
              {clusterGroup.length} places nearby
            </p>
            <button
              onClick={() => setClusterGroup(null)}
              className="text-white/30 hover:text-white/70 transition-colors text-xl leading-none"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              ×
            </button>
          </div>
          <div className="flex-1">
            {clusterGroup.map((p) => (
              <button
                key={p.slug}
                onClick={() => {
                  setClusterGroup(null);
                  setSelected(p);
                  map.current?.easeTo({
                    center: [p.longitude, p.latitude],
                    zoom: Math.max(map.current.getZoom(), 9),
                    duration: 400,
                    offset: [-150, 0],
                  });
                }}
                className="w-full text-left px-6 py-4 transition-colors hover:bg-white/5"
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  cursor: "pointer",
                }}
              >
                <p
                  className="text-[9px] tracking-[0.2em] uppercase mb-1"
                  style={{ color: getCategoryColor(p.category) }}
                >
                  {p.category}
                </p>
                <p className="text-white/80 text-sm font-serif">{p.title}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Single place panel */}
      <div
        className="absolute top-0 right-0 bottom-0 z-30 flex flex-col transition-transform duration-300 ease-out"
        style={{
          width: "340px",
          background: "#0e0e0e",
          transform: selected ? "translateX(0)" : "translateX(100%)",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {selected && (
          <>
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 text-white/40 hover:text-white/80 transition-colors text-2xl leading-none"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              ×
            </button>

            <div
              className="relative w-full flex-shrink-0"
              style={{ height: "200px", background: "#1a1a1a" }}
            >
              {selected.hero_image ? (
                <img
                  src={selected.hero_image}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                  style={{ opacity: 0.85 }}
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: "#1f1f1f" }}
                >
                  <span
                    className="text-[9px] tracking-[0.2em] uppercase"
                    style={{ color: getCategoryColor(selected.category) }}
                  >
                    {selected.category}
                  </span>
                </div>
              )}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, #0e0e0e 0%, transparent 60%)",
                }}
              />
            </div>

            <div className="flex-1 overflow-y-auto px-7 pt-5 pb-8">
              {selected.category && (
                <p
                  className="text-[10px] tracking-[0.2em] uppercase mb-3"
                  style={{ color: getCategoryColor(selected.category) }}
                >
                  {selected.category}
                  {selected.destination && (
                    <span className="text-white/25">
                      {" "}· {selected.destination}
                    </span>
                  )}
                </p>
              )}
              <h2 className="font-serif text-white text-2xl leading-tight mb-4">
                {selected.title}
              </h2>
              {selected.excerpt && (
                <p className="text-white/50 text-sm leading-relaxed mb-8">
                  {selected.excerpt.length > 120
                    ? selected.excerpt.slice(0, 120).trim() + '\u2026'
                    : selected.excerpt}
                </p>
              )}
              <Link
                href={`/places/${selected.slug}`}
                className="inline-block text-[11px] tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors border-b border-white/15 hover:border-white/40 pb-0.5"
              >
                Read more →
              </Link>

              {/* Connected stories */}
              {selected.related_story_slugs.length > 0 && (
                <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-white/25 mb-3">
                    Stories
                  </p>
                  {selected.related_story_slugs.slice(0, 3).map((storySlug) => (
                    <Link
                      key={storySlug}
                      href={`/stories/${storySlug}`}
                      className="block text-white/50 hover:text-white/80 text-sm py-1.5 transition-colors"
                    >
                      {storySlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} →
                    </Link>
                  ))}
                </div>
              )}

              {/* Journey link */}
              {selected.journey_bridge && (
                <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-white/25 mb-2">
                    Journey
                  </p>
                  <Link
                    href={`/journeys/${selected.journey_bridge}`}
                    className="text-[#c9a96e] hover:text-[#d4b96e] text-sm transition-colors"
                  >
                    View journey →
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
