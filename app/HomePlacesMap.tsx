"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mapboxgl: any = null;

interface PlacePin {
  slug: string;
  title: string;
  category: string;
  destination: string;
  latitude: number;
  longitude: number;
}

interface Props {
  places: PlacePin[];
}

const CATEGORY_COLORS: Record<string, string> = {
  Architecture:        "#c9a96e",
  Nature:              "#7aad6e",
  Culture:             "#e07b5a",
  History:             "#9b8db0",
  Food:                "#d4885c",
  Sacred:              "#6eaab0",
  Craft:               "#b09b6e",
  Market:              "#d4b96e",
  Museum:              "#8db09b",
  Neighborhoods:       "#a8c4d4",
  Monuments:           "#c9a96e",
  Natural:             "#7aad6e",
  Kasbahs:             "#c4956a",
  Villages:            "#b5a882",
  Towns:               "#9aab8e",
  Historic:            "#9b8db0",
  Workshops:           "#b09b6e",
  "Working areas":     "#b09b6e",
  "Squares & Markets": "#d4b96e",
  "Historic Quarter":  "#9b8db0",
  Museums:             "#8db09b",
};

const DEFAULT_COLOR = "#c9a96e";

function getCategoryColor(cat: string): string {
  if (!cat) return DEFAULT_COLOR;
  if (CATEGORY_COLORS[cat]) return CATEGORY_COLORS[cat];
  for (const [key, val] of Object.entries(CATEGORY_COLORS)) {
    if (cat.toLowerCase().includes(key.toLowerCase())) return val;
  }
  return DEFAULT_COLOR;
}

export default function HomePlacesMap({ places }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const markers = useRef<any[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [hoveredPlace, setHoveredPlace] = useState<PlacePin | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    async function initMap() {
      if (!mapboxgl) {
        const mb = await import("mapbox-gl");
        mapboxgl = mb.default;
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
        if (!document.getElementById("mapbox-gl-css-home")) {
          const link = document.createElement("link");
          link.id = "mapbox-gl-css-home";
          link.rel = "stylesheet";
          link.href = "https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css";
          document.head.appendChild(link);
        }
      }

      if (!mapContainer.current) return;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [-5.8, 31.2],
        zoom: 4.8,
        minZoom: 4,
        maxZoom: 4.8,
        interactive: false, // non-interactive — strip is a visual statement
        attributionControl: false,
      });

      map.current.on("load", () => setMapLoaded(true));
    }

    initMap();
  }, []);

  // Place dots once map is loaded
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    markers.current.forEach((m) => m.remove());
    markers.current = [];

    places.forEach((place) => {
      const color = getCategoryColor(place.category);

      const el = document.createElement("div");
      el.style.cssText = `
        width: 7px; height: 7px;
        border-radius: 50%;
        background: ${color};
        border: 1px solid rgba(255,255,255,0.25);
        cursor: default;
        transition: transform 0.15s;
      `;

      const marker = new mapboxgl.Marker({ element: el, anchor: "center" })
        .setLngLat([place.longitude, place.latitude])
        .addTo(map.current);

      markers.current.push(marker);
    });
  }, [mapLoaded, places]);

  return (
    <section className="relative border-t border-foreground/[0.08]" style={{ height: "500px" }}>

      {/* Map fills container */}
      <div
        ref={mapContainer}
        style={{ position: "absolute", inset: 0 }}
      />

      {/* Dark gradient overlay — bottom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      {/* Dark gradient overlay — top */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%)",
          pointerEvents: "none",
        }}
      />

      {/* Count — top left */}
      <div
        style={{
          position: "absolute",
          top: "1.5rem",
          left: "2rem",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            fontSize: "10px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            fontFamily: "var(--font-sans, sans-serif)",
          }}
        >
          {places.length} places mapped
        </p>
      </div>

      {/* Text — bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "2rem",
          zIndex: 10,
          maxWidth: "420px",
        }}
      >
        <p
          style={{
            fontSize: "clamp(20px, 3vw, 30px)",
            fontFamily: "var(--font-serif, serif)",
            color: "rgba(255,255,255,0.9)",
            lineHeight: 1.25,
            marginBottom: "1rem",
            fontWeight: 400,
          }}
        >
          Every medina, kasbah, oasis, and souk — mapped.
        </p>
        <Link
          href="/places/map"
          style={{
            display: "inline-block",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            textDecoration: "none",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
            paddingBottom: "2px",
            transition: "color 0.2s, border-color 0.2s",
            fontFamily: "var(--font-sans, sans-serif)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.6)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
          }}
        >
          Explore the map →
        </Link>
      </div>

    </section>
  );
}
