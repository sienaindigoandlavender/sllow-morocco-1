"use client";

import { useEffect, useRef, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mapboxgl: any = null;

interface Location {
  name: string;
  role: string;
  coords: [number, number];
  note: string;
}

const LOCATIONS: Location[] = [
  {
    name: "Aït Benhaddou",
    role: "Troy",
    coords: [-7.1318, 31.0472],
    note: "The first scenes of the entire production — Troy burned here in February 2025.",
  },
  {
    name: "Marrakech",
    role: "Production base",
    coords: [-7.9811, 31.6295],
    note: "The Moroccan leg's base of operations.",
  },
  {
    name: "Tahannaout",
    role: "Filming location",
    coords: [-7.9509, 31.3622],
    note: "A market town in Al Haouz, twenty minutes south of Marrakech.",
  },
  {
    name: "Agafay",
    role: "The mythical world's harsher edges",
    coords: [-8.35, 31.4833],
    note: "The rocky desert plateau southwest of Marrakech.",
  },
  {
    name: "Essaouira",
    role: "Poseidon's seas",
    coords: [-9.7595, 31.5085],
    note: "The storm seas are Essaouira's own Atlantic — wind and swell included.",
  },
  {
    name: "The White Dune, Dakhla",
    role: "Calypso's island (Ogygia)",
    coords: [-15.775, 23.905],
    note: "Matt Damon and Zendaya filmed here in July 2025 — the shoot's contested chapter.",
  },
];

export default function OdysseyLocationsMap({ className = "" }: { className?: string }) {
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
          center: [-9.5, 28.2],
          zoom: 4.3,
          attributionControl: true,
        });

        map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
        map.current.scrollZoom.disable();
        map.current.touchZoomRotate.enable();

        LOCATIONS.forEach((loc) => {
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

        // Fit to all markers with padding
        const bounds = new mapboxgl.LngLatBounds();
        LOCATIONS.forEach((l) => bounds.extend(l.coords));
        map.current.fitBounds(bounds, { padding: { top: 60, bottom: 40, left: 50, right: 50 } });
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
  }, [mounted]);

  if (mapError) return null;

  return (
    <div className={className}>
      <div
        ref={mapContainer}
        className="w-full h-[420px] md:h-[480px] rounded-sm overflow-hidden"
        aria-label="Map of The Odyssey's filming locations in Morocco"
      />
      <p className="text-[10px] tracking-[0.15em] uppercase text-foreground/30 mt-3">
        Tap a marker · Aït Benhaddou to the White Dune is a 1,300 km span
      </p>
    </div>
  );
}
