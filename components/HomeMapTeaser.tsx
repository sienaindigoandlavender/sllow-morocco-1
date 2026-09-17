"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

/**
 * Map teaser for the homepage — the Atlas Obscura doorway. A calm, light-toned
 * map of Morocco with a handful of recognisable places pulsing gently (Jardin
 * Majorelle, Hassan II Mosque, Chefchaouen, Aït Benhaddou...). Familiar anchors
 * pull the visitor in; the whole atlas opens at /places/map.
 */

const PINS = [
  { name: "Jardin Majorelle", lat: 31.6416, lng: -8.0032 },
  { name: "Jemaa el-Fna", lat: 31.6258, lng: -7.9891 },
  { name: "Hassan II Mosque", lat: 33.6086, lng: -7.6328 },
  { name: "Hassan Tower", lat: 34.0135, lng: -6.8235 },
  { name: "Cape Spartel", lat: 35.792, lng: -5.927 },
  { name: "Chefchaouen", lat: 35.1688, lng: -5.2691 },
  { name: "Volubilis", lat: 34.0741, lng: -5.5553 },
  { name: "Aït Benhaddou", lat: 31.047, lng: -7.13 },
  { name: "Erg Chebbi", lat: 31.098, lng: -3.968 },
  { name: "Essaouira", lat: 31.5089, lng: -9.7601 },
];

export default function HomeMapTeaser() {
  const mapEl = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let map: any;
    let cancelled = false;

    (async () => {
      const mapboxgl = (await import("mapbox-gl")).default;
      if (cancelled || !mapEl.current) return;

      if (!document.getElementById("mapbox-gl-css")) {
        const link = document.createElement("link");
        link.id = "mapbox-gl-css";
        link.rel = "stylesheet";
        link.href = "https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css";
        document.head.appendChild(link);
      }

      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

      map = new mapboxgl.Map({
        container: mapEl.current,
        style: "mapbox://styles/mapbox/light-v11", // light + warm, NOT the dark brick view
        center: [-6.6, 32.2],
        zoom: 4.7,
        minZoom: 4,
        maxZoom: 7,
        interactive: false, // a teaser — calm, not a full explorer
        attributionControl: false,
      });

      map.on("load", () => {
        // warm the base a touch: soften land, tint water
        try {
          map.setPaintProperty("water", "fill-color", "#dfe6e6");
        } catch {}

        PINS.forEach((p, i) => {
          const el = document.createElement("div");
          el.className = "hm-pin";
          el.style.animationDelay = `${(i % 5) * 0.6}s`;
          el.innerHTML = '<span class="hm-ping"></span><span class="hm-dot"></span>';
          new mapboxgl.Marker({ element: el }).setLngLat([p.lng, p.lat]).addTo(map);
        });
      });
    })();

    return () => {
      cancelled = true;
      if (map) map.remove();
    };
  }, []);

  return (
    <section className="w-full px-6 md:px-10 lg:px-14 py-16 md:py-24 bg-[#faf8f5] border-t border-[#0a0a0a]/[0.08]">
      <div className="max-w-3xl mb-8 md:mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-10 bg-[#0a0a0a]/30" />
          <span className="text-[11px] tracking-[0.24em] uppercase text-[#0a0a0a]/50 font-sans">
            The atlas
          </span>
        </div>
        <h2 className="font-serif text-3xl md:text-5xl font-light tracking-[-0.02em] leading-[1.05] text-[#0a0a0a]">
          Every place we know, on one map.
        </h2>
        <p className="mt-5 max-w-xl text-base md:text-lg leading-relaxed text-[#0a0a0a]/65">
          The ones you have heard of, and the hundred or so you have not — medinas,
          kasbahs, oases, shrines, souks, the whole country pinned in one view.
        </p>
      </div>

      <Link href="/places/map" className="group block relative">
        <div
          ref={mapEl}
          className="w-full h-[360px] md:h-[520px] rounded-sm overflow-hidden ring-1 ring-[#0a0a0a]/10"
          aria-label="Map of Morocco"
        />
        <div className="mt-6 inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-[#0a0a0a]/60 group-hover:text-[#0a0a0a] transition-colors font-sans">
          Open the full map
          <span className="transition-transform duration-300 group-hover:translate-x-1" style={{ color: "#E3120B" }}>→</span>
        </div>
      </Link>

      <style>{`
        .hm-pin { position: relative; width: 12px; height: 12px; }
        .hm-dot { position: absolute; inset: 0; margin: auto; width: 9px; height: 9px; border-radius: 9999px; background: #E3120B; box-shadow: 0 0 0 2px #faf8f5; }
        .hm-ping { position: absolute; inset: 0; margin: auto; width: 9px; height: 9px; border-radius: 9999px; background: #E3120B; animation: hm-ping 3.4s cubic-bezier(0,0,0.2,1) infinite; }
        @keyframes hm-ping { 0% { transform: scale(1); opacity: 0.55; } 70%,100% { transform: scale(4); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .hm-ping { animation: none; opacity: 0; } }
      `}</style>
    </section>
  );
}
