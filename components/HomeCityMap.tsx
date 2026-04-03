"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mapboxgl: any = null;

interface City {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  coordinates: [number, number];
}

const CITIES: City[] = [
  {
    slug: "marrakech",
    title: "Marrakech",
    subtitle: "The red city",
    excerpt: "The ochre walls. The call to prayer. The thousand-year maze.",
    coordinates: [-7.9811, 31.6295],
  },
  {
    slug: "fes",
    title: "Fes",
    subtitle: "The oldest maze",
    excerpt: "Nine thousand alleys. The world's largest car-free urban area.",
    coordinates: [-4.9998, 34.0331],
  },
  {
    slug: "tangier",
    title: "Tangier",
    subtitle: "Where two seas meet",
    excerpt: "Mediterranean and Atlantic. Africa and Europe across fourteen kilometres.",
    coordinates: [-5.8128, 35.7595],
  },
  {
    slug: "rabat",
    title: "Rabat",
    subtitle: "The quiet capital",
    excerpt: "Roman ruins, a twelfth-century tower, and a UNESCO medina at human scale.",
    coordinates: [-6.8498, 34.0209],
  },
  {
    slug: "essaouira",
    title: "Essaouira",
    subtitle: "Wind and light",
    excerpt: "Portuguese ramparts. Atlantic gales. Artists and musicians.",
    coordinates: [-9.7595, 31.5085],
  },
  {
    slug: "casablanca",
    title: "Casablanca",
    subtitle: "Art Deco and sea",
    excerpt: "Morocco's engine wearing its Art Deco inheritance like a suit that still fits.",
    coordinates: [-7.5898, 33.5731],
  },
  {
    slug: "meknes",
    title: "Meknes",
    subtitle: "Moulay Ismail's city",
    excerpt: "Forty-kilometre walls. Twelve thousand horses. The Moroccan Versailles.",
    coordinates: [-5.5548, 33.8935],
  },
  {
    slug: "ouarzazate",
    title: "Ouarzazate",
    subtitle: "Gateway to the south",
    excerpt: "Where the Atlas drops into the pre-Sahara and the light turns amber.",
    coordinates: [-6.9063, 30.9189],
  },
  {
    slug: "agadir",
    title: "Agadir",
    subtitle: "Atlantic coast",
    excerpt: "Eleven kilometres of beach. The argan forest begins where the city ends.",
    coordinates: [-9.5981, 30.4278],
  },
  {
    slug: "dakhla",
    title: "Dakhla",
    subtitle: "End of the map",
    excerpt: "A Saharan peninsula. Turquoise lagoon. The wind never stops.",
    coordinates: [-15.9329, 23.6848],
  },
  {
    slug: "chefchaouen",
    title: "Chefchaouen",
    subtitle: "The blue city",
    excerpt: "Washed in indigo and cobalt. Every alley a photograph. The Rif Mountains behind.",
    coordinates: [-5.2636, 35.1714],
  },
];

export default function HomeCityMap() {
  const router = useRouter();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [activeCity, setActiveCity] = useState<City | null>(null);
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
        center: [-8.0, 29.5],
        zoom: 4.6,
        minZoom: 4,
        maxZoom: 9,
        attributionControl: false,
        scrollZoom: false,
      });

      map.current.addControl(
        new mapboxgl.AttributionControl({ compact: true }),
        "bottom-left"
      );

      // Restrict pan to Morocco region
      map.current.setMaxBounds([
        [-20, 20],  // SW
        [5, 40],    // NE
      ]);

      map.current.on("load", () => {
        setLoaded(true);

        CITIES.forEach((city) => {
          // Outer ring
          const ring = document.createElement("div");
          ring.style.cssText = `
            width: 20px;
            height: 20px;
            position: relative;
            cursor: pointer;
          `;

          const inner = document.createElement("div");
          inner.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 6px;
            height: 6px;
            background: #d4a85a;
            border-radius: 50%;
            transition: all 0.25s ease;
            box-shadow: 0 0 0 0 rgba(212,168,90,0.4);
          `;

          const pulse = document.createElement("div");
          pulse.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: rgba(212,168,90,0.25);
            animation: cityPulse 2.5s ease-out infinite;
            animation-delay: ${Math.random() * 2}s;
          `;

          ring.appendChild(pulse);
          ring.appendChild(inner);

          ring.addEventListener("mouseenter", () => {
            inner.style.width = "10px";
            inner.style.height = "10px";
            inner.style.background = "#e8c07a";
            setActiveCity(city);
          });

          ring.addEventListener("mouseleave", () => {
            inner.style.width = "6px";
            inner.style.height = "6px";
            inner.style.background = "#d4a85a";
            setActiveCity(null);
          });

          ring.addEventListener("click", () => {
            router.push(`/${city.slug}`);
          });

          new mapboxgl.Marker({ element: ring, anchor: "center" })
            .setLngLat(city.coordinates)
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
  }, [router]);

  return (
    <div className="relative w-full h-full bg-[#0d0d0d]">
      {/* Pulse animation */}
      <style>{`
        @keyframes cityPulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(3.5); opacity: 0; }
        }
      `}</style>

      {/* Map */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Loading state */}
      {!loaded && (
        <div className="absolute inset-0 bg-[#0d0d0d] flex items-center justify-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/15 font-mono">
            Morocco
          </p>
        </div>
      )}

      {/* City info panel — bottom left, appears on hover */}
      <div
        className={`absolute bottom-8 left-8 transition-all duration-300 pointer-events-none ${
          activeCity ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <div className="bg-black/70 backdrop-blur-sm border border-white/10 px-6 py-5 max-w-xs">
          <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-1 font-mono">
            {activeCity?.subtitle}
          </p>
          <p className="font-serif text-xl text-white mb-2">
            {activeCity?.title}
          </p>
          <p className="text-xs text-white/50 leading-relaxed">
            {activeCity?.excerpt}
          </p>
          <p className="text-[9px] tracking-[0.2em] uppercase text-white/25 mt-3 font-mono">
            Click to explore →
          </p>
        </div>
      </div>

      {/* Instruction hint — fades after load */}
      {loaded && (
        <div className="absolute top-6 right-6 pointer-events-none">
          <p className="text-[9px] tracking-[0.25em] uppercase text-white/20 font-mono">
            10 cities · click to explore
          </p>
        </div>
      )}
    </div>
  );
}
