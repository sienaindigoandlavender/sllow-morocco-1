"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Script from "next/script";

// ─────────────────────────────────────────────
// PALETTE
// Red: #E3120B  Black: #0a0a0a  Body: #1a1a1a  Muted: #666  Border: #e5e5e5  BG: #fff
// ─────────────────────────────────────────────

const safetyData = [
  { label: "Global Peace Index rank", value: "82nd", context: "of 163 countries · 2024", source: "IEP" },
  { label: "Crime Index", value: "46.7", context: "moderate — comparable to Portugal", source: "Numbeo 2024" },
  { label: "Safety Index", value: "53.3", context: "out of 100", source: "Numbeo 2024" },
  { label: "Political Stability percentile", value: "41st", context: "World Bank Governance Indicators", source: "World Bank 2023" },
  { label: "FCDO Travel Advisory", value: "Level 1", context: "exercise normal precautions", source: "UK FCDO 2024" },
  { label: "US State Dept Advisory", value: "Level 1", context: "exercise normal precautions", source: "US DOS 2024" },
];

const infrastructureData = [
  { label: "Al Boraq high-speed rail", value: "320 km/h", context: "Casablanca → Tangier in 2h 10m. Africa's first and only TGV.", status: "live" },
  { label: "Casablanca CMN expansion", value: "Phase 2", context: "New terminal: 18M passengers/year capacity by 2027.", status: "construction" },
  { label: "Tangier Med Port", value: "9M TEU/year", context: "Largest port in Africa and the Mediterranean.", status: "live" },
  { label: "Noor Solar Complex", value: "580 MW", context: "Ouarzazate. World's largest concentrated solar plant.", status: "live" },
  { label: "Grand Stade Hassan II", value: "115,000 seats", context: "Casablanca. Will be the largest stadium on earth when complete.", status: "construction" },
  { label: "2030 World Cup host cities", value: "6", context: "Casablanca, Rabat, Marrakech, Fes, Tangier, Agadir.", status: "live" },
  { label: "4G coverage", value: "98%", context: "of the population · Maroc Telecom / Orange / Inwi.", status: "live" },
  { label: "UM6P university", value: "Ranked #1", context: "Mohammed VI Polytechnic, Ben Guerir. Africa's top research university.", status: "live" },
];

const cityData = [
  {
    name: "Casablanca",
    population: "4.7M",
    role: "Economic capital",
    altitude: "50m",
    climate: "Mediterranean",
    notes: "60% of Morocco's industrial output. Africa's 4th largest stock exchange. Mohammed V airport is the national hub. The most European-feeling city in the country.",
  },
  {
    name: "Rabat",
    population: "600K",
    role: "Political capital",
    altitude: "75m",
    climate: "Mediterranean",
    notes: "Government, embassies, the royal palace. UNESCO-listed medina and the Hassan Tower. Quieter than Casablanca — deliberately so.",
  },
  {
    name: "Marrakech",
    population: "1.0M",
    role: "Tourism capital",
    altitude: "466m",
    climate: "Semi-arid",
    notes: "Jemaa el-Fna is UNESCO Intangible Cultural Heritage. 300 days of sun per year. Average July high: 42°C. The most-visited city in Africa.",
  },
  {
    name: "Fes",
    population: "1.2M",
    role: "Cultural capital",
    altitude: "410m",
    climate: "Continental",
    notes: "The University of al-Qarawiyyin (859 CE) is the oldest continuously operating university in the world. The medina is the largest car-free urban area on earth.",
  },
  {
    name: "Tangier",
    population: "1.1M",
    role: "Gateway city",
    altitude: "15m",
    climate: "Mediterranean",
    notes: "14km from Spain at the Strait of Gibraltar. Fastest-growing city in Morocco. Free trade zone. Al Boraq terminus. Emerging tech hub.",
  },
  {
    name: "Agadir",
    population: "600K",
    role: "Atlantic resort",
    altitude: "45m",
    climate: "Atlantic semi-arid",
    notes: "Rebuilt after the 1960 earthquake. 300+ sunny days per year. Morocco's largest beach resort. Gateway to the Anti-Atlas and Souss Valley.",
  },
];

const flightRoutes = [
  { from: "London", time: "3h 30m", airports: "LHR / LGW / STN → RAK / CMN", carriers: "easyJet, Ryanair, British Airways, RAM" },
  { from: "Paris", time: "3h 15m", airports: "CDG / ORY → RAK / CMN / FEZ", carriers: "Air France, Transavia, RAM, easyJet" },
  { from: "Madrid", time: "1h 45m", airports: "MAD → CMN / RAK / TNG", carriers: "Iberia, Vueling, Ryanair, RAM" },
  { from: "Amsterdam", time: "3h 30m", airports: "AMS → RAK / CMN / FEZ", carriers: "Transavia, KLM, RAM" },
  { from: "Frankfurt", time: "3h 40m", airports: "FRA → CMN / RAK", carriers: "Lufthansa, RAM, Ryanair" },
  { from: "New York", time: "8h 30m", airports: "JFK / IAD → CMN", carriers: "Royal Air Maroc (direct, year-round)" },
  { from: "Montreal", time: "7h 30m", airports: "YUL → CMN", carriers: "Royal Air Maroc (seasonal)" },
  { from: "Dubai", time: "7h 00m", airports: "DXB → CMN / RAK", carriers: "Emirates, flydubai, RAM" },
  { from: "Doha", time: "7h 15m", airports: "DOH → CMN", carriers: "Qatar Airways" },
  { from: "Istanbul", time: "4h 30m", airports: "IST → CMN / RAK", carriers: "Turkish Airlines, RAM" },
  { from: "Riyadh", time: "5h 30m", airports: "RUH → CMN", carriers: "Saudia, RAM" },
  { from: "Dakar", time: "4h 00m", airports: "DSS → CMN", carriers: "RAM, Air Senegal" },
];

const demographicData = [
  { label: "Total population", value: "37.8 million", source: "HCP 2024" },
  { label: "Urban / rural", value: "65% / 35%", source: "World Bank 2023" },
  { label: "Median age", value: "29.3 years", source: "UN 2024" },
  { label: "Official languages", value: "Arabic, Tamazight", source: "Constitution 2011" },
  { label: "Widely spoken", value: "Darija, French", source: "" },
  { label: "English speakers", value: "~14%", source: "EF EPI 2023" },
  { label: "Literacy rate", value: "75.9%", source: "World Bank 2022" },
  { label: "Internet penetration", value: "88%", source: "ANRT 2023" },
  { label: "GDP per capita (PPP)", value: "$9,800", source: "IMF 2024" },
  { label: "GDP growth rate", value: "3.4%", source: "IMF 2024 estimate" },
];

const climateZones = [
  { zone: "Mediterranean Coast", region: "Tangier, Tetouan, Al Hoceima", summer: "26°C", winter: "13°C", rain: "600–900mm/yr", note: "Morocco's warmest, wettest region. Closest in feel to southern Spain." },
  { zone: "Atlantic Coast", region: "Rabat, Casablanca, Essaouira", summer: "23°C", winter: "14°C", rain: "400–600mm/yr", note: "Ocean-moderated. Mild year-round. Essaouira's wind is notorious." },
  { zone: "Continental Interior", region: "Marrakech, Fes, Meknes", summer: "38°C", winter: "10°C", rain: "200–400mm/yr", note: "Extreme seasonal range. Marrakech averages 42°C in July." },
  { zone: "High Atlas", region: "Ifrane, Azilal, Toubkal area", summer: "22°C", winter: "−5°C", rain: "800mm+ / snow", note: "Ski season December–March. Ifrane holds Africa's cold record: −23.9°C (1935)." },
  { zone: "Pre-Saharan", region: "Ouarzazate, Zagora, Merzouga", summer: "42°C", winter: "10°C", rain: "<150mm/yr", note: "Hot, dry days. Cold nights year-round. The Sahara begins here." },
];

const worldCupStats = [
  { n: "6", l: "Host cities in Morocco" },
  { n: "115,000", l: "Grand Stade Hassan II seats" },
  { n: "$52B", l: "Infrastructure investment" },
  { n: "26M", l: "Tourism target by 2030" },
];

const priceData = [
  { item: "Street food meal (harira + bread)", price: "15–25 DH", eur: "~€1.50" },
  { item: "Restaurant lunch, mid-range", price: "80–150 DH", eur: "~€7–14" },
  { item: "Restaurant dinner, good", price: "150–300 DH", eur: "~€14–28" },
  { item: "Mint tea, café", price: "8–15 DH", eur: "~€0.75" },
  { item: "Petit taxi, 3km city ride", price: "15–25 DH", eur: "~€1.50" },
  { item: "Bottled water, 1 litre", price: "5–8 DH", eur: "~€0.50" },
  { item: "Public hammam entry", price: "15–25 DH", eur: "~€1.50" },
  { item: "Tourist hammam", price: "100–250 DH", eur: "~€9–23" },
  { item: "Guesthouse room, medina budget", price: "200–400 DH", eur: "~€18–37" },
  { item: "Riad room, mid-range", price: "600–1,200 DH", eur: "~€55–110" },
  { item: "Museum entry, average", price: "30–70 DH", eur: "~€3–7" },
  { item: "SIM card + 10GB data", price: "30–50 DH", eur: "~€3–5" },
];

// ─────────────────────────────────────────────
// SECTION DIVIDER
// ─────────────────────────────────────────────

function SectionHeader({ number, title, subtitle }: { number: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-10">
      <div className="h-px bg-[#E3120B] mb-4 w-full" />
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs text-[#E3120B] shrink-0">{number}</span>
        <h2 className="font-serif text-2xl md:text-4xl text-[#0a0a0a] tracking-tight leading-tight">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="mt-3 text-sm text-[#666] leading-relaxed max-w-2xl ml-8 md:ml-12">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export default function MoroccoLifeContent() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const [activeClimate, setActiveClimate] = useState<number | null>(null);

  const cityCoords: Record<string, [number, number]> = {
    Casablanca: [-7.589, 33.573],
    Rabat: [-6.832, 34.020],
    Marrakech: [-7.989, 31.629],
    Fes: [-4.999, 34.037],
    Tangier: [-5.800, 35.759],
    Agadir: [-9.598, 30.427],
  };

  useEffect(() => {
    if (!mapLoaded || !mapContainer.current || mapRef.current) return;
    const mapboxgl = (window as any).mapboxgl;
    if (!mapboxgl) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-6.0, 32.0],
      zoom: 4.8,
      maxZoom: 12,
      minZoom: 4,
    });

    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "bottom-right"
    );

    mapRef.current = map;

    map.on("load", () => {
      Object.entries(cityCoords).forEach(([city, coords]) => {
        const el = document.createElement("div");
        el.style.cssText = `
          width: 10px; height: 10px; border-radius: 50%;
          background: #E3120B; cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 0 0 1px #E3120B;
          transition: transform 0.2s;
        `;
        el.addEventListener("click", () => setActiveCity(city));
        el.addEventListener("mouseenter", () => { el.style.transform = "scale(1.8)"; });
        el.addEventListener("mouseleave", () => { el.style.transform = "scale(1)"; });

        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
          offset: 14,
          className: "life-popup-light",
        }).setHTML(`<span style="font-family:monospace;font-size:9px;color:#E3120B;letter-spacing:0.15em;text-transform:uppercase">${city}</span>`);

        new mapboxgl.Marker(el).setLngLat(coords).setPopup(popup).addTo(map);
      });

      // Al Boraq line
      map.addSource("alboraq", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [
              [-7.589, 33.573],
              [-6.832, 34.020],
              [-5.800, 35.759],
            ],
          },
          properties: {},
        },
      });

      map.addLayer({
        id: "alboraq-line",
        type: "line",
        source: "alboraq",
        paint: {
          "line-color": "#E3120B",
          "line-width": 2,
          "line-dasharray": [3, 2],
        },
      });
    });

    return () => {
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
  }, [mapLoaded]);

  return (
    <>
      <Script
        src="https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.js"
        onLoad={() => setMapLoaded(true)}
      />
      <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.css" />

      <style>{`
        .life-popup-light .mapboxgl-popup-content {
          background: #fff;
          border: 1px solid #e5e5e5;
          padding: 4px 10px;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
        }
        .life-popup-light .mapboxgl-popup-tip { display: none; }
        .data-row:hover .source-tag { opacity: 1; }
      `}</style>

      <div className="bg-white text-[#0a0a0a] min-h-screen">

        {/* ── MASTHEAD ── */}
        <div className="border-b-4 border-[#E3120B]">
          <div className="px-8 md:px-[8%] py-3 flex items-center justify-between">
            <Link href="/" className="text-[9px] tracking-[0.3em] uppercase font-mono text-[#666] hover:text-[#0a0a0a] transition-colors">
              Slow Morocco
            </Link>
            <span className="text-[9px] tracking-[0.2em] uppercase font-mono text-[#E3120B]">Country Intelligence</span>
          </div>
        </div>

        {/* ── HERO ── */}
        <section className="px-8 md:px-[8%] pt-16 pb-16 border-b border-[#e5e5e5]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-8">
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#0a0a0a] leading-[0.9] tracking-tight mb-6">
                Morocco.<br />The Country.
              </h1>
              <p className="text-base text-[#444] leading-relaxed max-w-xl">
                In the summer of 2022, Morocco reached the World Cup semi-final.
                The players prayed on the pitch in Qatar. A hundred million people
                watched and asked: what is this country? This page answers that
                question in data. Not tourism copy. Data.
              </p>
            </div>
            <div className="md:col-span-4 grid grid-cols-2 gap-px bg-[#e5e5e5]">
              {[
                { n: "37.8M", l: "Population" },
                { n: "82nd", l: "Peace Index" },
                { n: "6", l: "2030 WC cities" },
                { n: "$9,800", l: "GDP per capita" },
              ].map((s) => (
                <div key={s.l} className="bg-white p-5">
                  <p className="font-mono text-2xl text-[#E3120B] leading-none mb-1">{s.n}</p>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-[#999] font-mono">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="px-8 md:px-[8%] py-16 space-y-20">

          {/* ── 01 SAFETY ── */}
          <section>
            <SectionHeader
              number="01"
              title="Safety & Security"
              subtitle="Morocco ranks as one of the safest countries in Africa and the Arab world. The data below is sourced. The gap between global perception and statistical reality is where Morocco sits."
            />
            <div className="border border-[#e5e5e5]">
              {safetyData.map((d, i) => (
                <div
                  key={d.label}
                  className="data-row grid grid-cols-3 gap-4 px-6 py-4 border-b border-[#e5e5e5] last:border-0 hover:bg-[#fafafa] transition-colors"
                >
                  <p className="text-sm text-[#333]">{d.label}</p>
                  <p className="font-mono text-sm font-bold text-[#0a0a0a]">{d.value}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-[#888]">{d.context}</p>
                    <span className="source-tag text-[9px] font-mono text-[#E3120B] opacity-0 transition-opacity shrink-0 ml-2">
                      {d.source}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[10px] font-mono text-[#aaa]">
              Sources: IEP Global Peace Index 2024 · Numbeo 2024 · World Bank WGI 2023 · UK FCDO / US State Dept 2024
            </p>
          </section>

          {/* ── 02 TERRAIN ── */}
          <section>
            <SectionHeader
              number="02"
              title="Terrain & Cities"
              subtitle="Morocco spans from the Strait of Gibraltar to the Sahara — five climate zones, three mountain ranges, 2,500km of coastline. The red line is the Al Boraq high-speed rail. Click a city."
            />
            <div
              ref={mapContainer}
              className="w-full border border-[#e5e5e5]"
              style={{ height: "55vh", minHeight: 380 }}
            >
              {!mapLoaded && (
                <div className="w-full h-full bg-[#f5f5f5] flex items-center justify-center">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#aaa] font-mono">Loading</p>
                </div>
              )}
            </div>

            {/* City selector */}
            <div className="flex flex-wrap gap-2 mt-4 mb-0">
              {cityData.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setActiveCity(activeCity === c.name ? null : c.name)}
                  className={`text-[9px] tracking-[0.2em] uppercase font-mono px-4 py-2 border transition-colors ${
                    activeCity === c.name
                      ? "bg-[#E3120B] text-white border-[#E3120B]"
                      : "border-[#e5e5e5] text-[#888] hover:border-[#E3120B] hover:text-[#E3120B]"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {activeCity && cityData.filter((c) => c.name === activeCity).map((c) => (
              <div key={c.name} className="mt-4 border border-[#E3120B] p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-[9px] tracking-[0.2em] uppercase font-mono text-[#E3120B] mb-1">{c.role}</p>
                  <p className="font-serif text-2xl text-[#0a0a0a]">{c.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 md:col-span-1">
                  {[
                    { l: "Population", v: c.population },
                    { l: "Altitude", v: c.altitude },
                    { l: "Climate", v: c.climate },
                  ].map((item) => (
                    <div key={item.l}>
                      <p className="text-[9px] uppercase tracking-[0.15em] font-mono text-[#aaa] mb-0.5">{item.l}</p>
                      <p className="font-mono text-sm text-[#333]">{item.v}</p>
                    </div>
                  ))}
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-[#555] leading-relaxed">{c.notes}</p>
                </div>
              </div>
            ))}
          </section>

          {/* ── 03 CLIMATE ── */}
          <section>
            <SectionHeader
              number="03"
              title="Climate Zones"
              subtitle="Five distinct climate zones in a country smaller than Texas. The coast is mild. The interior is extreme. The Atlas gets snow. The desert begins south of Marrakech."
            />
            <div className="border border-[#e5e5e5]">
              {climateZones.map((z, i) => (
                <div
                  key={z.zone}
                  className="border-b border-[#e5e5e5] last:border-0 cursor-pointer hover:bg-[#fafafa] transition-colors"
                  onClick={() => setActiveClimate(activeClimate === i ? null : i)}
                >
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 px-6 py-4">
                    <p className="text-sm font-medium text-[#0a0a0a]">{z.zone}</p>
                    <p className="text-sm text-[#666]">{z.region}</p>
                    <div className="flex gap-3">
                      <span className="font-mono text-xs text-[#E3120B]">↑ {z.summer}</span>
                      <span className="font-mono text-xs text-[#888]">↓ {z.winter}</span>
                    </div>
                    <p className="font-mono text-xs text-[#888]">{z.rain}</p>
                    <p className="text-[10px] text-[#aaa] text-right">{activeClimate === i ? "−" : "+"}</p>
                  </div>
                  {activeClimate === i && (
                    <div className="px-6 pb-5">
                      <p className="text-sm text-[#555] leading-relaxed border-t border-[#f0f0f0] pt-3">{z.note}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── 04 FLIGHTS ── */}
          <section>
            <SectionHeader
              number="04"
              title="Flight Connections"
              subtitle="Direct routes from every major hub. Closer to Europe than most people assume. Direct from New York. Direct from the Gulf. The geography that makes Morocco inevitable."
            />
            <div className="border border-[#e5e5e5]">
              {flightRoutes.map((r) => (
                <div
                  key={r.from}
                  className="grid grid-cols-3 gap-4 px-6 py-4 border-b border-[#e5e5e5] last:border-0 hover:bg-[#fafafa] transition-colors"
                >
                  <p className="text-sm font-medium text-[#0a0a0a]">{r.from}</p>
                  <p className="font-mono text-sm text-[#E3120B] font-bold">{r.time}</p>
                  <p className="text-xs text-[#888] leading-relaxed">{r.carriers}</p>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[10px] font-mono text-[#aaa]">
              Approximate flight times · Direct routes · 2025–2026 winter schedule
            </p>
          </section>

          {/* ── 05 INFRASTRUCTURE ── */}
          <section>
            <SectionHeader
              number="05"
              title="Infrastructure"
              subtitle="What Morocco is building. Most visitors do not know the scale. These are facts, not tourism board copy."
            />
            <div className="border border-[#e5e5e5]">
              {infrastructureData.map((d) => (
                <div
                  key={d.label}
                  className="grid grid-cols-3 gap-4 px-6 py-4 border-b border-[#e5e5e5] last:border-0 hover:bg-[#fafafa] transition-colors"
                >
                  <p className="text-sm text-[#333]">{d.label}</p>
                  <p className="font-mono text-sm font-bold text-[#0a0a0a]">{d.value}</p>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs text-[#888] leading-relaxed">{d.context}</p>
                    <span className={`text-[8px] tracking-[0.15em] uppercase font-mono shrink-0 px-2 py-0.5 border ${
                      d.status === "live"
                        ? "text-[#16a34a] border-[#16a34a]/30 bg-[#f0fdf4]"
                        : "text-[#E3120B] border-[#E3120B]/30 bg-[#fff5f5]"
                    }`}>
                      {d.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 06 DEMOGRAPHICS ── */}
          <section>
            <SectionHeader
              number="06"
              title="Demographics"
              subtitle="Who lives here, what they speak, and what the country earns."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#e5e5e5] border border-[#e5e5e5] mb-8">
              {demographicData.map((d) => (
                <div key={d.label} className="bg-white px-6 py-5">
                  <p className="text-[9px] tracking-[0.2em] uppercase font-mono text-[#aaa] mb-1">{d.label}</p>
                  <p className="font-mono text-base font-bold text-[#0a0a0a]">{d.value}</p>
                  {d.source && <p className="text-[9px] font-mono text-[#E3120B] mt-0.5">{d.source}</p>}
                </div>
              ))}
            </div>

            <div className="border-l-4 border-[#E3120B] pl-6">
              <p className="text-[9px] tracking-[0.2em] uppercase font-mono text-[#E3120B] mb-3">Language reality</p>
              <p className="text-sm text-[#555] leading-relaxed max-w-2xl">
                Morocco has four languages in daily use. Modern Standard Arabic is formal and
                written. Darija — Moroccan Arabic — is the spoken vernacular, distinct from
                Egyptian or Gulf Arabic to the point of mutual unintelligibility. Tamazight
                (Amazigh) is constitutionally recognised since 2011 and spoken by 25–30% of
                the population. French is the language of business, education, and professional
                life. English is growing rapidly in Casablanca, Tangier, and the technology
                sector.
              </p>
            </div>
          </section>

          {/* ── 07 WORLD CUP ── */}
          <section>
            <SectionHeader
              number="07"
              title="2030 FIFA World Cup"
              subtitle="Morocco co-hosts with Spain and Portugal. It is the largest infrastructure investment in the country's modern history. The preparation is visible on the ground now."
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#e5e5e5] border border-[#e5e5e5] mb-8">
              {worldCupStats.map((s) => (
                <div key={s.l} className="bg-white p-6">
                  <p className="font-mono text-3xl font-bold text-[#E3120B] leading-none mb-2">{s.n}</p>
                  <p className="text-[9px] tracking-[0.2em] uppercase font-mono text-[#999]">{s.l}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#e5e5e5] border border-[#e5e5e5]">
              {[
                {
                  heading: "The host cities",
                  body: "Casablanca, Rabat, Marrakech, Fes, Tangier, Agadir. Each building or upgrading a stadium. Each expanding airport capacity. The country is modernising its infrastructure and preserving what makes it worth visiting — simultaneously.",
                },
                {
                  heading: "The Grand Stade",
                  body: "The Grand Stade Hassan II in Casablanca will hold 115,000 spectators. It will be the largest stadium on earth when completed. Construction is underway. The stadium sits on the Atlantic coast west of the city centre.",
                },
                {
                  heading: "The context",
                  body: "Morocco bid for the World Cup five times. The 2030 tournament is not just a sporting event — it is a statement. $52 billion committed across transport, stadiums, hospitality, and digital infrastructure. The country chose not to hide the ambition.",
                },
              ].map((item) => (
                <div key={item.heading} className="bg-white p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#0a0a0a] mb-3">{item.heading}</p>
                  <p className="text-sm text-[#555] leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
            <Link
              href="/morocco-world-cup-2030"
              className="inline-block mt-6 text-[10px] tracking-[0.15em] uppercase text-[#999] hover:text-[#333] transition-colors border-b border-[#ddd] pb-1"
            >
              Interactive stadium &amp; infrastructure map &rarr;
            </Link>
          </section>

          {/* ── 08 COST OF LIVING ── */}
          <section>
            <SectionHeader
              number="08"
              title="What Things Cost"
              subtitle="Street-level Marrakech prices, 2025–2026. Morocco is significantly cheaper than Western Europe for most daily expenses."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#e5e5e5] border border-[#e5e5e5]">
              {priceData.map((r) => (
                <div key={r.item} className="bg-white px-6 py-4 flex justify-between items-center">
                  <p className="text-sm text-[#555]">{r.item}</p>
                  <div className="text-right shrink-0 ml-4">
                    <p className="font-mono text-sm font-bold text-[#0a0a0a]">{r.price}</p>
                    <p className="font-mono text-[10px] text-[#aaa]">{r.eur}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[10px] font-mono text-[#aaa]">
              1 EUR ≈ 11.1 MAD · 1 USD ≈ 10.2 MAD · 1 GBP ≈ 13.2 MAD · January 2026
            </p>
          </section>

          {/* ── FURTHER READING ── */}
          <section>
            <div className="h-px bg-[#e5e5e5] mb-10" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#e5e5e5] border border-[#e5e5e5] mb-8">
              {[
                { href: "/morocco-travel-guide", label: "Morocco Travel Guide", desc: "Visas, transport, money, health — the practical layer." },
                { href: "/stories", label: "222 Cultural Stories", desc: "The country explained through its history, food, people, and architecture." },
                { href: "/places", label: "100 Places", desc: "Documented locations from Tangier to Dakhla." },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group bg-white px-8 py-6 hover:bg-[#fafafa] transition-colors"
                >
                  <p className="text-sm font-bold text-[#0a0a0a] group-hover:text-[#E3120B] transition-colors mb-1">
                    {link.label} →
                  </p>
                  <p className="text-xs text-[#888]">{link.desc}</p>
                </Link>
              ))}
            </div>

            <div className="border-t border-[#e5e5e5] pt-6">
              <p className="text-[10px] font-mono text-[#aaa] leading-relaxed">
                Compiled by Dancing with Lions · dancingwiththelions.com · Data sourced from World Bank, IEP, Numbeo, HCP Morocco, ANRT, IMF, and official government sources · Last reviewed March 2026 · © Dancing with Lions 2026
              </p>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
