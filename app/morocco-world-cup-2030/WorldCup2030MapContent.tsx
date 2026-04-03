"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Script from "next/script";

// =============================================
// DATA
// =============================================

interface Site {
  name: string;
  city: string;
  cat: string;
  lat: number;
  lng: number;
  desc: string;
  detail?: string;
}

const categories: Record<string, { label: string; color: string }> = {
  stadium: { label: "Stadiums", color: "#C17F28" },
  rail: { label: "Rail", color: "#2D6E4F" },
  highway: { label: "Highways", color: "#A0522D" },
  airport: { label: "Airports", color: "#5D3A5E" },
  hotel: { label: "Hotels", color: "#6B7F5E" },
};

const sites: Site[] = [
  // ── STADIUMS ──────────────────────────────────────────────────────────────

  // Casablanca
  {
    name: "Grand Stade Hassan II",
    city: "Casablanca",
    cat: "stadium",
    lat: 33.65,
    lng: -7.35,
    desc: "The largest football stadium in the world. 115,000 seats. Tent-roof inspired by the moussem tradition. Designed by Oualalou + Choi and Populous. A leading candidate to host the 2030 final.",
    detail: "El Mansouria, 38 km north of Casablanca. $500M. Completion 2028. New build.",
  },
  // Rabat
  {
    name: "Prince Moulay Abdellah Stadium",
    city: "Rabat",
    cat: "stadium",
    lat: 33.92,
    lng: -6.91,
    desc: "Built in 24 months. LED pixel facade like The Sphere. Opened for AFCON 2025. The fastest major stadium construction in Africa.",
    detail: "68,700 seats. $320M. Completed September 2025. Semi-final venue.",
  },
  // Tangier
  {
    name: "Ibn Batouta Stadium",
    city: "Tangier",
    cat: "stadium",
    lat: 35.73,
    lng: -5.88,
    desc: "Roof completed in 69 days. Expanded from 45,000 to 75,600 seats for AFCON 2025. Named after the 14th-century explorer who left Tangier and saw the world.",
    detail: "75,600 seats. $180M renovation. Completed 2025. Semi-final venue.",
  },
  // Marrakech
  {
    name: "Marrakech Stadium",
    city: "Marrakech",
    cat: "stadium",
    lat: 31.62,
    lng: -8.05,
    desc: "Expanding from 45,860 to 70,000. Between the Atlas Mountains and the medina. Also hosted 2025 Africa Cup of Nations group matches.",
    detail: "70,000 seats. $150M renovation. Completion 2028. Quarter-final venue.",
  },
  // Fes
  {
    name: "Fez Stadium",
    city: "Fes",
    cat: "stadium",
    lat: 34.04,
    lng: -4.96,
    desc: "Renovated for AFCON 2025. Dual football and athletics venue in the spiritual capital. New roof and capacity expansion planned for 2030.",
    detail: "55,800 seats. $90M. Completed 2025 (AFCON). Round of 16 venue.",
  },
  // Agadir
  {
    name: "Adrar Stadium",
    city: "Agadir",
    cat: "stadium",
    lat: 30.39,
    lng: -9.53,
    desc: "Atlantic coast venue between ocean and Atlas foothills. Opened in 2013 after nine years of construction. Expanding from 46,000 and adding a new roof.",
    detail: "Up to 70,000 seats. $120M renovation. Completion 2028. Quarter-final venue.",
  },

  // ── RAIL ──────────────────────────────────────────────────────────────────

  {
    name: "Al Boraq HSR Extension",
    city: "Kénitra–Marrakech",
    cat: "rail",
    lat: 33.26,
    lng: -7.58,
    desc: "Africa's first high-speed rail network extension. 430 km at 350 km/h. Tangier to Marrakech in 2h40m. The existing Tangier–Kénitra line opened in 2018.",
    detail: "$5.3B. Under construction. Completion 2029.",
  },
  {
    name: "168 New Trains",
    city: "National",
    cat: "rail",
    lat: 33.57,
    lng: -7.59,
    desc: "18 high-speed and 150 multi-service trains ordered from Alstom (France), Talgo (Spain), and Hyundai Rotem (South Korea). The largest rolling stock procurement in African history.",
    detail: "$2.9B. ONCF procurement. Delivery through 2029.",
  },
  {
    name: "40 Railway Stations",
    city: "National",
    cat: "rail",
    lat: 34.02,
    lng: -6.84,
    desc: "Station modernisation programme. New stadium-adjacent stations at Rabat and Casablanca. Every host city connected by upgraded rail.",
    detail: "$1.4B. Under construction. Completion by 2030.",
  },
  {
    name: "Tangier Railway Hub",
    city: "Tangier",
    cat: "rail",
    lat: 35.76,
    lng: -5.81,
    desc: "Northern terminus of the Al Boraq HSR. Tangier Ville station already serves the existing high-speed line to Kénitra. Europe connection via the Strait.",
    detail: "Existing + expansion. 320 km/h services operational since 2018.",
  },
  {
    name: "Marrakech HSR Terminal",
    city: "Marrakech",
    cat: "rail",
    lat: 31.63,
    lng: -8.01,
    desc: "Southern terminus of the extended Al Boraq line. Will bring Casablanca–Marrakech journey time under one hour. A new station district is planned.",
    detail: "New build. Part of $5.3B HSR extension. Completion 2029.",
  },

  // ── HIGHWAYS ──────────────────────────────────────────────────────────────

  {
    name: "Continental Rabat–Casablanca Highway",
    city: "Rabat–Casablanca",
    cat: "highway",
    lat: 33.75,
    lng: -7.08,
    desc: "Direct access route to the Grand Stade Hassan II. New expressway corridor connecting the capital to the country's economic engine.",
    detail: "$500M. Under construction. Completion 2028.",
  },
  {
    name: "Tit Mellil–Berrechid Bypass",
    city: "South Casablanca",
    cat: "highway",
    lat: 33.45,
    lng: -7.45,
    desc: "Southern Casablanca bypass connecting the A7 motorway to the new stadium zone. Designed to handle match-day traffic for 115,000 spectators.",
    detail: "$400M. Planned. Completion 2029.",
  },
  {
    name: "National Highway Expansion",
    city: "National",
    cat: "highway",
    lat: 32.30,
    lng: -6.50,
    desc: "Expanding the highway network from 1,850 km to 3,000 km. Dedicated access roads to all six host stadiums. Autoroutes du Maroc programme.",
    detail: "$1.3B total. Under construction. Completion 2030.",
  },
  {
    name: "Tangier–Tetouan Expressway",
    city: "Tangier",
    cat: "highway",
    lat: 35.60,
    lng: -5.55,
    desc: "Upgraded connection between Tangier and the northern Rif. Supports stadium access and the Tangier Med port corridor.",
    detail: "Part of national expansion programme.",
  },
  {
    name: "Marrakech Southern Ring Road",
    city: "Marrakech",
    cat: "highway",
    lat: 31.58,
    lng: -7.95,
    desc: "New ring road connecting the airport, stadium, and Ouarzazate road. Keeps tournament traffic out of the medina.",
    detail: "Part of national expansion programme.",
  },

  // ── AIRPORTS ──────────────────────────────────────────────────────────────

  {
    name: "Mohammed V Airport Terminal 3",
    city: "Casablanca",
    cat: "airport",
    lat: 33.37,
    lng: -7.59,
    desc: "New terminal at Morocco's main international gateway. Target: 80 million passengers per year by 2030 (from 38 million). The largest airport construction project in Africa.",
    detail: "$1.2B. Under construction. Completion 2029.",
  },
  {
    name: "Marrakech Menara Airport",
    city: "Marrakech",
    cat: "airport",
    lat: 31.61,
    lng: -8.04,
    desc: "Terminal expansion and modernisation. Morocco's second-busiest airport, handling 6 million passengers annually. Capacity doubling for 2030.",
    detail: "Part of $2.8B national airport programme.",
  },
  {
    name: "Tangier Ibn Battouta Airport",
    city: "Tangier",
    cat: "airport",
    lat: 35.73,
    lng: -5.92,
    desc: "Expansion of the northern gateway. Increasing capacity for European arrivals — Tangier is 45 minutes from Spain by ferry.",
    detail: "Part of $2.8B national airport programme.",
  },
  {
    name: "Fès-Saïss Airport",
    city: "Fes",
    cat: "airport",
    lat: 33.93,
    lng: -4.98,
    desc: "Runway and terminal upgrades for the spiritual capital. Currently handles 1.5 million passengers. Expansion planned for World Cup surge.",
    detail: "Part of $2.8B national airport programme.",
  },
  {
    name: "Agadir Al Massira Airport",
    city: "Agadir",
    cat: "airport",
    lat: 30.38,
    lng: -9.55,
    desc: "Charter and low-cost hub expansion. Agadir is Morocco's main beach resort destination — already serves 3 million passengers annually.",
    detail: "Part of $2.8B national airport programme.",
  },
  {
    name: "Rabat–Salé Airport",
    city: "Rabat",
    cat: "airport",
    lat: 34.05,
    lng: -6.75,
    desc: "Capital city airport modernisation. Increasing international capacity for diplomatic and tournament traffic.",
    detail: "Part of $2.8B national airport programme.",
  },
  {
    name: "Royal Air Maroc Fleet Expansion",
    city: "Casablanca",
    cat: "airport",
    lat: 33.50,
    lng: -7.66,
    desc: "National carrier growing from 50 to 200+ aircraft. New routes to all host cities. The largest fleet expansion in RAM's history.",
    detail: "$4B+. Under expansion. Target: 200+ aircraft by 2030.",
  },

  // ── HOTELS ────────────────────────────────────────────────────────────────

  {
    name: "Casablanca Hotel Cluster",
    city: "Casablanca",
    cat: "hotel",
    lat: 33.59,
    lng: -7.62,
    desc: "Concentration of new hotel builds around the Corniche and stadium zone. International chains and boutique properties. Target: 10,000+ new rooms.",
    detail: "Part of 330,000 total rooms target by 2030.",
  },
  {
    name: "Marrakech Capacity Expansion",
    city: "Marrakech",
    cat: "hotel",
    lat: 31.64,
    lng: -7.99,
    desc: "Morocco's tourism capital adding riad restorations and resort developments. Palmeraie and Agdal zones expanding. Already the country's largest hotel market.",
    detail: "Part of 330,000 total rooms target by 2030.",
  },
  {
    name: "Tangier Marina Bay Development",
    city: "Tangier",
    cat: "hotel",
    lat: 35.78,
    lng: -5.80,
    desc: "Waterfront hotel and leisure development. Tangier's transformation from transit point to destination accelerated by World Cup selection.",
    detail: "Part of 330,000 total rooms target by 2030.",
  },
  {
    name: "National Hotel Renovation Programme",
    city: "National",
    cat: "hotel",
    lat: 32.00,
    lng: -5.00,
    desc: "25,000 existing hotel rooms renovated via government interest-free loan programme (2024–2025). Upgrading Morocco's existing stock to international tournament standards.",
    detail: "$2B+ mixed public/private. 150,000 new rooms target nationally.",
  },
];

// =============================================
// COMPONENT
// =============================================

export default function WorldCup2030MapContent() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selected, setSelected] = useState<Site | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapLoaded || !mapContainer.current || mapRef.current) return;

    const mapboxgl = (window as any).mapboxgl;
    if (!mapboxgl) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-6.5, 32.5],
      zoom: 5.5,
      maxZoom: 15,
      minZoom: 4,
    });

    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "bottom-right"
    );

    mapRef.current = map;

    map.on("load", () => {
      // HSR line: Tangier → Kénitra → Rabat → Casablanca → Marrakech
      map.addSource("hsr-line", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [-5.80, 35.77],
              [-6.35, 34.26],
              [-6.85, 33.97],
              [-7.59, 33.57],
              [-8.01, 31.63],
            ],
          },
        },
      });

      map.addLayer({
        id: "hsr-line",
        type: "line",
        source: "hsr-line",
        paint: {
          "line-color": "#2D6E4F",
          "line-width": 2.5,
          "line-dasharray": [4, 3],
          "line-opacity": 0.5,
        },
      });

      // Add markers
      sites.forEach((site) => {
        const el = document.createElement("div");
        const isStadium = site.cat === "stadium";
        const size = isStadium ? 14 : 10;

        el.style.cssText = `
          width: ${size}px; height: ${size}px; border-radius: 50%; cursor: pointer;
          border: 2px solid rgba(255,255,255,${isStadium ? 0.5 : 0.25});
          box-shadow: 0 0 ${isStadium ? 12 : 8}px rgba(0,0,0,0.4);
          transition: all 0.3s;
          background: ${categories[site.cat].color};
        `;
        el.setAttribute("role", "button");
        el.setAttribute("aria-label", `${site.name}, ${site.city}`);
        el.setAttribute("tabindex", "0");

        el.addEventListener("mouseenter", () => {
          el.style.transform = "scale(1.6)";
          el.style.borderColor = "rgba(255,255,255,0.8)";
        });
        el.addEventListener("mouseleave", () => {
          el.style.transform = "scale(1)";
          el.style.borderColor = `rgba(255,255,255,${isStadium ? 0.5 : 0.25})`;
        });

        const handleSelect = (e: Event) => {
          e.stopPropagation();
          setSelected(site);
          setPanelOpen(true);
          map.flyTo({
            center: [site.lng, site.lat],
            zoom: site.cat === "stadium" ? 11 : 9,
            duration: 1200,
          });
        };

        el.addEventListener("click", handleSelect);
        el.addEventListener("keydown", (e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") handleSelect(e);
        });

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([site.lng, site.lat])
          .addTo(map);

        markersRef.current.push({ marker, el, site });
      });
    });

    map.on("click", () => {
      setPanelOpen(false);
    });

    return () => map.remove();
  }, [mapLoaded]);

  // Filter markers
  useEffect(() => {
    markersRef.current.forEach(({ el, site }) => {
      if (!activeFilter || site.cat === activeFilter) {
        el.style.opacity = "1";
        el.style.transform = "scale(1)";
      } else {
        el.style.opacity = "0.12";
        el.style.transform = "scale(0.6)";
      }
    });

    // Toggle HSR line visibility
    const map = mapRef.current;
    if (map && map.getLayer("hsr-line")) {
      const showRail = !activeFilter || activeFilter === "rail";
      map.setPaintProperty("hsr-line", "line-opacity", showRail ? 0.5 : 0.08);
    }
  }, [activeFilter]);

  const toggleFilter = (cat: string) => {
    setActiveFilter((prev) => (prev === cat ? null : cat));
  };

  // Countdown to kickoff
  const kickoff = new Date("2030-06-13T17:00:00Z");
  const now = new Date();
  const diff = kickoff.getTime() - now.getTime();
  const daysToKickoff = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));

  const stadiumCount = sites.filter((s) => s.cat === "stadium").length;

  return (
    <>
      <Script
        src="https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.js"
        onLoad={() => setMapLoaded(true)}
      />
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css"
        rel="stylesheet"
      />

      <main className="relative bg-[#1a1a1a] min-h-screen text-[#f5f0e8]">
        {/* Map — full screen behind navbar */}
        <div
          ref={mapContainer}
          className="fixed inset-0 top-[72px] md:top-[88px]"
          role="application"
          aria-label="Interactive map of Morocco's World Cup 2030 stadiums and infrastructure"
        />

        {/* Header overlay — below main navbar */}
        <header
          className="fixed top-[72px] md:top-[88px] left-0 right-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,26,26,0.9) 0%, rgba(26,26,26,0.5) 70%, transparent 100%)",
          }}
        >
          <div className="container mx-auto px-8 md:px-16 lg:px-20 pt-8 pb-24">
            <div className="pointer-events-auto max-w-xl">
              <Link
                href="/stories"
                className="text-[9px] tracking-[0.3em] uppercase text-white/40 hover:text-white/70 transition-colors"
              >
                &larr; The Edit
              </Link>
              <h1 className="font-serif text-3xl md:text-5xl mt-3 leading-tight">
                World Cup 2030
                <br />
                <span className="text-[0.65em] text-white/50">Morocco &middot; Spain &middot; Portugal</span>
              </h1>
              <p className="text-sm text-white/50 mt-3 max-w-lg leading-relaxed hidden md:block">
                Every stadium, railway line, highway, airport, and hotel project
                across Morocco&rsquo;s six host cities &mdash; the complete
                infrastructure picture for the first World Cup across two
                continents.
              </p>
              <div className="flex items-center gap-6 mt-3">
                <p className="text-[11px] text-white/30">
                  <span className="text-[#C17F28]">{stadiumCount}</span>{" "}
                  stadiums &middot;{" "}
                  <span className="text-[#C17F28]">{sites.length}</span>{" "}
                  projects &middot;{" "}
                  <span className="text-[#C17F28]">$41B</span> infrastructure
                </p>
                {daysToKickoff > 0 && (
                  <p className="text-[11px] text-white/20">
                    <span className="text-[#8B3A3A] font-mono">{daysToKickoff.toLocaleString()}</span>{" "}
                    days to kickoff
                  </p>
                )}
              </div>
            </div>

            {/* Filters — inline row below header text */}
            <nav
              className="pointer-events-auto flex flex-wrap gap-2 mt-6"
              aria-label="Filter by category"
            >
              {Object.entries(categories).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => toggleFilter(key)}
                  aria-pressed={activeFilter === key}
                  className={`flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.12em] uppercase backdrop-blur-sm border transition-all ${
                    activeFilter === key
                      ? "bg-[#f5f5f5] text-[#1a1a1a] border-[#f5f0e8]"
                      : "bg-[#1a1a1a]/60 text-white/50 border-white/10 hover:border-white/25 hover:text-white/80"
                  }`}
                >
                  <span
                    className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                    style={{ background: val.color }}
                  />
                  {val.label}
                </button>
              ))}
            </nav>
          </div>
        </header>

        {/* Info Panel */}
        <aside
          className={`fixed bottom-0 left-0 w-full md:w-[420px] max-h-[55vh] z-10 bg-[#1a1a1a]/92 backdrop-blur-xl border-t border-white/10 md:border-r md:border-white/10 p-8 overflow-y-auto transition-transform duration-500 ${
            panelOpen && selected ? "translate-y-0" : "translate-y-full"
          }`}
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(245,240,232,0.15) transparent",
          }}
          aria-live="polite"
        >
          <button
            onClick={() => setPanelOpen(false)}
            className="absolute top-4 right-4 text-white/40 hover:text-white text-lg"
            aria-label="Close panel"
          >
            &times;
          </button>
          {selected && (
            <article>
              <p
                className="text-[9px] tracking-[0.25em] uppercase mb-2"
                style={{ color: categories[selected.cat].color }}
              >
                {categories[selected.cat].label}
              </p>
              <h2 className="font-serif text-2xl md:text-3xl leading-tight mb-1">
                {selected.name}
              </h2>
              <p className="text-xs text-white/40 mb-4">{selected.city}</p>
              <p className="text-sm text-white/65 leading-relaxed font-light">
                {selected.desc}
              </p>
              {selected.detail && (
                <p className="mt-4 pt-4 border-t border-white/[0.08] text-xs text-white/30 italic">
                  {selected.detail}
                </p>
              )}
              <Link
                href="/stories/world-cup-2030"
                className="inline-block mt-6 text-[10px] tracking-[0.15em] uppercase text-white/30 hover:text-white/60 transition-colors border-b border-white/15 pb-1"
              >
                Full infrastructure data &rarr;
              </Link>
            </article>
          )}
        </aside>

        {/* Bottom attribution */}
        <footer className="fixed bottom-6 right-6 lg:right-10 z-10 text-[10px] text-white/20 text-right leading-relaxed hidden md:block">
          &copy; Slow Morocco &middot; Dancing with Lions
          <br />
          Data: FIFA, FRMF, ONCF, ADM, HCP
        </footer>

        {/* Story CTA */}
        <div className="fixed bottom-6 left-6 lg:left-10 z-10 hidden md:block">
          <Link
            href="/stories/world-cup-2030"
            className="text-[10px] tracking-[0.15em] uppercase text-white/30 hover:text-white/60 transition-colors border-b border-white/15 pb-1"
          >
            Full infrastructure report &rarr;
          </Link>
        </div>
      </main>
    </>
  );
}
