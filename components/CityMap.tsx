"use client";

import { useEffect, useRef, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mapboxgl: any = null;

interface Attraction {
  title: string;
  slug: string;
  coordinates: [number, number];
  category?: string;
}

interface CityMapProps {
  citySlug: string;
  cityTitle: string;
  center: [number, number];
  zoom?: number;
  attractions: Attraction[];
}

export default function CityMap({
  cityTitle,
  center,
  zoom = 13,
  attractions,
}: CityMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);

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
      }

      if (!mapContainer.current) return;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center,
        zoom,
        attributionControl: false,
      });

      map.current.addControl(
        new mapboxgl.AttributionControl({ compact: true }),
        "bottom-left"
      );

      map.current.on("load", () => {
        setLoaded(true);

        // Add attraction markers
        attractions.forEach((a) => {
          const el = document.createElement("div");
          el.style.cssText = `
            width: 8px;
            height: 8px;
            background: #c9a96e;
            border-radius: 50%;
            border: 1.5px solid rgba(255,255,255,0.4);
            cursor: pointer;
            transition: transform 0.2s;
          `;
          el.addEventListener("mouseenter", () => {
            el.style.transform = "scale(1.8)";
          });
          el.addEventListener("mouseleave", () => {
            el.style.transform = "scale(1)";
          });

          const popup = new mapboxgl.Popup({
            offset: 12,
            closeButton: false,
            className: "city-map-popup",
          }).setHTML(`
            <div style="font-family: inherit; padding: 4px 2px;">
              <p style="font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #c9a96e; margin: 0 0 2px;">${a.category || ""}</p>
              <p style="font-size: 13px; color: #fff; margin: 0; font-weight: 400;">${a.title}</p>
            </div>
          `);

          new mapboxgl.Marker({ element: el })
            .setLngLat(a.coordinates)
            .setPopup(popup)
            .addTo(map.current);
        });
      });
    }

    initMap();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [center, zoom, attractions]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
      {!loaded && (
        <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/20">
            {cityTitle}
          </p>
        </div>
      )}
      <style>{`
        .city-map-popup .mapboxgl-popup-content {
          background: #1a1a1a;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0;
          padding: 10px 14px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.4);
        }
        .city-map-popup .mapboxgl-popup-tip {
          border-top-color: #1a1a1a;
        }
      `}</style>
    </div>
  );
}
