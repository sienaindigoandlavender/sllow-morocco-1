"use client";

import { useEffect, useRef, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mapboxgl: any = null;

export interface FilmLocation {
  name: string;
  role: string;
  coords: [number, number];
  note: string;
}

interface Props {
  locations: FilmLocation[];
  caption?: string;
  className?: string;
}

export default function FilmLocationsMap({ locations, caption, className = "" }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const map = useRef<any>(null);
  const [mapError, setMapError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || map.current || !mapContainer.current) return;

    const initMap = async () => {
      try {
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
            await new Promise((resolve) => setTimeout(resolve, 200));
          }
        }

        if (!mapContainer.current) return;

        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/outdoors-v12",
          attributionControl: true,
        });

        map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
        map.current.scrollZoom.disable();
        map.current.touchZoomRotate.enable();

        locations.forEach((loc) => {
          const el = document.createElement("div");
          el.style.cssText =
            "width:14px;height:14px;background:#0a0a0a;border:2px solid #ffffff;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,0.4);cursor:pointer;";

          const popup = new mapboxgl.Popup({ offset: 14, closeButton: false, maxWidth: "260px" }).setHTML(
            `<div style="font-family:inherit;padding:2px 2px;">
              <p style="margin:0 0 2px;font-size:13px;font-weight:600;color:#0a0a0a;">${loc.name}</p>
              <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#8a8a8a;">${loc.role}</p>
              <p style="margin:0;font-size:12px;line-height:1.5;color:#404040;">${loc.note}</p>
            </div>`
          );

          new mapboxgl.Marker(el).setLngLat(loc.coords).setPopup(popup).addTo(map.current);
        });

        const bounds = new mapboxgl.LngLatBounds();
        locations.forEach((l) => bounds.extend(l.coords));
        map.current.fitBounds(bounds, {
          padding: { top: 60, bottom: 40, left: 60, right: 60 },
          maxZoom: 9,
        });
      } catch {
        setMapError(true);
      }
    };

    initMap();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mounted, locations]);

  if (mapError) return null;

  return (
    <div className={className}>
      <div
        ref={mapContainer}
        className="w-full h-[420px] md:h-[480px] rounded-sm overflow-hidden"
        aria-label="Filming locations map"
      />
      {caption && (
        <p className="text-[10px] tracking-[0.15em] uppercase text-foreground/30 mt-3">{caption}</p>
      )}
    </div>
  );
}
