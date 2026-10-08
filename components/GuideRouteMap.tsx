"use client";

import { useEffect, useRef } from "react";
import { applyMoroccoWorldview } from "@/lib/mapbox-worldview";
import type { RouteStop } from "@/lib/guides";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mapboxgl: any = null;

const INK = "#1C1917";
const RED = "#E3120B";

export default function GuideRouteMap({ stops }: { stops: RouteStop[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);

  const points = stops.filter((s) => Array.isArray(s.coords));

  useEffect(() => {
    let cancelled = false;
    const coords = stops.filter((s) => Array.isArray(s.coords)).map((s) => s.coords as [number, number]);
    if (coords.length < 2 || !containerRef.current) return;

    (async () => {
      const mb = await import("mapbox-gl");
      if (cancelled) return;
      mapboxgl = mb.default;
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

      // Mapbox stylesheet (injected once, matching the site's approach)
      if (!document.getElementById("mapbox-gl-css")) {
        const link = document.createElement("link");
        link.id = "mapbox-gl-css";
        link.rel = "stylesheet";
        link.href = "https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css";
        document.head.appendChild(link);
      }

      const bounds = new mapboxgl.LngLatBounds();
      coords.forEach((c) => bounds.extend(c));

      const map = new mapboxgl.Map({
        container: containerRef.current,
        style: "mapbox://styles/mapbox/light-v11", // light, not the dark brick view
        bounds,
        fitBoundsOptions: { padding: 56 },
        cooperativeGestures: true, // page scroll stays with the page; map needs a deliberate grab
      });
      mapRef.current = map;

      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");

      map.on("load", () => {
        applyMoroccoWorldview(map);

        map.addSource("route", {
          type: "geojson",
          data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: coords } },
        });
        map.addLayer({
          id: "route-line",
          type: "line",
          source: "route",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: { "line-color": INK, "line-width": 2.5, "line-opacity": 0.7 },
        });

        stops
          .filter((s) => Array.isArray(s.coords))
          .forEach((s, i, arr) => {
            const last = i === arr.length - 1;
            const el = document.createElement("div");
            el.style.width = last ? "16px" : "12px";
            el.style.height = last ? "16px" : "12px";
            el.style.borderRadius = "50%";
            el.style.background = last ? RED : INK;
            el.style.border = "2px solid #ffffff";
            el.style.boxShadow = "0 0 0 1px rgba(0,0,0,0.18)";
            el.style.cursor = "pointer";

            const label = s.note ? `${s.name} · ${s.note}` : s.name;
            const popup = new mapboxgl.Popup({ offset: 14, closeButton: false }).setText(label);
            new mapboxgl.Marker({ element: el })
              .setLngLat(s.coords as [number, number])
              .setPopup(popup)
              .addTo(map);
          });
      });
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stops]);

  if (points.length < 2) return null;

  return (
    <figure className="my-12">
      <div
        ref={containerRef}
        className="w-full h-[360px] md:h-[440px] border border-border bg-secondary"
        aria-label={`Route map: ${stops.map((s) => s.name).join(" to ")}`}
      />
      <figcaption className="font-sans text-[11px] tracking-[0.06em] text-foreground/50 mt-3">
        {stops[0]?.name} to {stops[stops.length - 1]?.name} — tap a stop for details.
      </figcaption>
    </figure>
  );
}
