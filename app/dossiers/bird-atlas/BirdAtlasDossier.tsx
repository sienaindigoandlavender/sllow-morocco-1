"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as d3 from "d3";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

interface EBirdObs {
  speciesCode: string;
  comName: string;
  sciName: string;
  locName: string;
  obsDt: string;
  howMany: number | null;
  lat: number;
  lng: number;
}

interface Site {
  name: string;
  lat: number;
  lng: number;
  type: "wetland" | "coastal" | "strait" | "mountain" | "desert" | "forest";
  elevation?: string;
  species: string;
  significance: string;
  peak: string;
  threatened?: string;
  ramsar?: boolean;
}

// ─────────────────────────────────────────────
// SITE DATA
// ─────────────────────────────────────────────

const SITES: Site[] = [
  {
    name: "Strait of Gibraltar",
    lat: 35.98, lng: -5.60, type: "strait",
    species: "Black Kite, White Stork, Honey Buzzard, Booted Eagle, Egyptian Vulture",
    significance: "14km crossing. 300,000+ raptors and 400,000+ storks annually. One of the top five raptor migration bottlenecks on Earth.",
    peak: "Aug–Oct southbound · Mar–May northbound",
  },
  {
    name: "Merja Zerga",
    lat: 34.87, lng: -6.27, type: "wetland",
    species: "Greater Flamingo, Spoonbill, Marbled Duck, Marsh Harrier",
    significance: "Ramsar wetland. 50,000+ wintering waterbirds. Last confirmed sightings of Slender-billed Curlew.",
    peak: "Nov–Mar", ramsar: true,
    threatened: "Slender-billed Curlew (CR)",
  },
  {
    name: "Souss-Massa NP",
    lat: 30.07, lng: -9.63, type: "coastal",
    species: "Northern Bald Ibis, Audouin's Gull, Moussier's Redstart",
    significance: "Last viable wild population of Northern Bald Ibis. ~700 individuals. Morocco holds 95% of the species.",
    peak: "Year-round (breeding Feb–Jun)", ramsar: true,
    threatened: "Northern Bald Ibis (EN)",
  },
  {
    name: "Tamri Estuary",
    lat: 30.72, lng: -9.83, type: "coastal",
    species: "Northern Bald Ibis, Lesser Crested Tern",
    significance: "Second Northern Bald Ibis colony. Cliff-nesting site north of Agadir.",
    peak: "Feb–Jun",
    threatened: "Northern Bald Ibis (EN)",
  },
  {
    name: "Lac de Sidi Bourhaba",
    lat: 34.23, lng: -6.65, type: "wetland",
    species: "Crested Coot, Marbled Duck, White-headed Duck",
    significance: "Ramsar site. Critical breeding lake for three globally threatened duck species.",
    peak: "Oct–Mar", ramsar: true,
    threatened: "White-headed Duck (EN)",
  },
  {
    name: "Oualidia Lagoon",
    lat: 32.73, lng: -9.03, type: "wetland",
    species: "Greater Flamingo, Grebes, Little Egret, Kingfisher",
    significance: "Atlantic lagoon. Major wintering site. Flamingos and oyster beds in the same frame.",
    peak: "Oct–Apr",
  },
  {
    name: "Oued Massa",
    lat: 29.98, lng: -9.65, type: "wetland",
    species: "Glossy Ibis, Marbled Duck, Flamingo",
    significance: "Only Moroccan breeding site for Glossy Ibis (12–14 pairs).",
    peak: "Mar–Jun", ramsar: true,
  },
  {
    name: "Khnifiss Lagoon",
    lat: 28.03, lng: -12.26, type: "coastal",
    species: "Flamingo, Spoonbill, Waders, Caspian Tern",
    significance: "Largest lagoon in southern Morocco. Near Tarfaya. Critical Atlantic staging post.",
    peak: "Sep–Mar", ramsar: true,
  },
  {
    name: "Dayet Aoua",
    lat: 33.44, lng: -5.05, type: "wetland",
    species: "Crested Coot, Ferruginous Duck, White Stork",
    significance: "Middle Atlas lake at 1,450m. Key breeding wetland in cedar forest.",
    peak: "Mar–Jun",
  },
  {
    name: "Middle Atlas Forests",
    lat: 33.40, lng: -5.15, type: "forest", elevation: "1,200–2,000m",
    species: "Levaillant's Woodpecker, Atlas Flycatcher, Crossbill, Firecrest",
    significance: "Cedar and oak forest. Maghreb endemic bird hotspot.",
    peak: "Apr–Jul",
  },
  {
    name: "Toubkal / High Atlas",
    lat: 31.06, lng: -7.92, type: "mountain", elevation: "3,000–4,167m",
    species: "Crimson-winged Finch, Alpine Chough, Bearded Vulture",
    significance: "One of last Bearded Vulture breeding sites in North Africa.",
    peak: "May–Aug",
    threatened: "Bearded Vulture (regional CR)",
  },
  {
    name: "Merzouga / Erg Chebbi",
    lat: 31.10, lng: -3.97, type: "desert",
    species: "Desert Sparrow, Egyptian Nightjar, Houbara Bustard",
    significance: "Saharan IBA. Desert specialist species. Houbara Bustard conservation zone.",
    peak: "Oct–Apr",
    threatened: "Houbara Bustard (VU)",
  },
];

const FLYWAY_ATLANTIC: [number, number][] = [
  [-5.60, 35.98], [-5.80, 35.60], [-6.27, 34.87], [-6.65, 34.23],
  [-9.03, 32.73], [-9.83, 30.72], [-9.63, 30.07], [-9.65, 29.98],
  [-12.26, 28.03], [-13.20, 27.00],
];

const FLYWAY_INLAND: [number, number][] = [
  [-5.60, 35.98], [-5.00, 34.03], [-5.15, 33.40], [-5.05, 33.44],
  [-7.92, 31.06], [-6.80, 30.50], [-3.97, 31.10], [-2.50, 28.50],
];

const SEASONAL_DATA = [
  { species: "White Stork",       vals: [0,1,3,5,4,2,1,3,5,4,2,0], color: "#c8c8c8", stroke: "#666" },
  { species: "Greater Flamingo",  vals: [5,5,4,3,2,1,1,2,3,4,5,5], color: "#f4a0c0", stroke: "#b04070" },
  { species: "Bald Ibis",         vals: [2,4,5,5,5,4,3,2,1,1,1,1], color: "#1a1a1a", stroke: "#000" },
  { species: "Black Kite",        vals: [0,1,3,4,3,1,0,2,5,4,1,0], color: "#8B4513", stroke: "#5a2d0c" },
  { species: "Egyptian Vulture",  vals: [0,0,1,3,4,4,3,2,3,2,0,0], color: "#d4c878", stroke: "#a09030" },
  { species: "Booted Eagle",      vals: [1,1,2,3,3,2,1,2,4,4,2,1], color: "#6B8E23", stroke: "#3a5010" },
  { species: "Marbled Duck",      vals: [3,3,4,5,4,3,2,2,3,3,3,3], color: "#a0905c", stroke: "#6a6030" },
  { species: "Bearded Vulture",   vals: [3,4,5,5,4,3,3,3,3,3,3,3], color: "#c87030", stroke: "#804010" },
  { species: "Houbara Bustard",   vals: [4,4,3,2,1,0,0,0,1,3,4,4], color: "#d4b870", stroke: "#a08030" },
];

const TYPE_COLORS: Record<string, string> = {
  wetland: "#4a9aba", coastal: "#2d7a5a", strait: "#c9a96e",
  mountain: "#8a7a9a", desert: "#d4945a", forest: "#4a7a4a",
};

const MONTHS_SHORT = ["J","F","M","A","M","J","J","A","S","O","N","D"];

// ─────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

function useCounter(target: number, duration = 2000, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return val;
}

// ─────────────────────────────────────────────
// FADE IN WRAPPER
// ─────────────────────────────────────────────

function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, vis } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(22px)",
      transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// ANIMATED STAT
// ─────────────────────────────────────────────

function AnimStat({ value, suffix = "", label, accent }: {
  value: number; suffix?: string; label: string; accent: string;
}) {
  const { ref, vis } = useInView();
  const n = useCounter(value, 1800, vis);
  return (
    <div ref={ref}>
      <div className="font-serif leading-none mb-2"
        style={{ fontSize: "clamp(3rem,6vw,4.5rem)", color: accent }}>
        {n.toLocaleString()}{suffix}
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">{label}</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// SEASONAL PRESENCE CHART
// ─────────────────────────────────────────────

function SeasonalChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { ref, vis } = useInView(0.2);
  const [hov, setHov] = useState<string | null>(null);

  useEffect(() => {
    if (!svgRef.current || !vis) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const W = 900, H = 320;
    const m = { top: 16, right: 16, bottom: 40, left: 152 };
    const w = W - m.left - m.right;
    const h = H - m.top - m.bottom;

    svg.attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");
    const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);

    const xScale = d3.scaleBand().domain(MONTHS_SHORT).range([0, w]).padding(0.1);
    const yScale = d3.scaleBand().domain(SEASONAL_DATA.map(d => d.species)).range([0, h]).padding(0.18);

    // Subtle month grid
    g.selectAll(".mgrid").data(MONTHS_SHORT).enter()
      .append("line").attr("class", "mgrid")
      .attr("x1", d => (xScale(d) ?? 0) + xScale.bandwidth() / 2)
      .attr("x2", d => (xScale(d) ?? 0) + xScale.bandwidth() / 2)
      .attr("y1", 0).attr("y2", h)
      .attr("stroke", "#f0f0f0").attr("stroke-width", 1);

    // Cells
    SEASONAL_DATA.forEach((row, ri) => {
      row.vals.forEach((val, mi) => {
        if (val === 0) return;
        const x = xScale(MONTHS_SHORT[mi]) ?? 0;
        const y = yScale(row.species) ?? 0;
        const bw = xScale.bandwidth();
        const bh = yScale.bandwidth();
        const opacity = val / 5;

        g.append("rect")
          .attr("x", x).attr("y", y)
          .attr("width", bw).attr("height", bh)
          .attr("rx", 2)
          .attr("fill", row.color)
          .attr("stroke", row.stroke)
          .attr("stroke-width", 0.4)
          .attr("opacity", 0)
          .on("mouseenter", () => setHov(`${row.species} · ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][mi]}`))
          .on("mouseleave", () => setHov(null))
          .transition().duration(500).delay(ri * 55 + mi * 18)
          .attr("opacity", opacity);
      });
    });

    // Species labels
    g.selectAll(".ylabel").data(SEASONAL_DATA).enter()
      .append("text").attr("class", "ylabel")
      .attr("x", -10)
      .attr("y", d => (yScale(d.species) ?? 0) + yScale.bandwidth() / 2 + 4)
      .attr("text-anchor", "end")
      .attr("font-family", "monospace").attr("font-size", 11)
      .attr("fill", "#444")
      .text(d => d.species);

    // Month labels
    g.selectAll(".xlabel").data(MONTHS_SHORT).enter()
      .append("text").attr("class", "xlabel")
      .attr("x", d => (xScale(d) ?? 0) + xScale.bandwidth() / 2)
      .attr("y", h + 22)
      .attr("text-anchor", "middle")
      .attr("font-family", "monospace").attr("font-size", 11)
      .attr("fill", "#aaa")
      .text(d => d);

  }, [vis]);

  return (
    <div ref={ref}>
      <div className="h-5 mb-2">
        {hov && (
          <p className="font-mono text-xs text-neutral-400">
            <span className="text-neutral-900">{hov.split(" · ")[0]}</span>
            {" · "}{hov.split(" · ")[1]}
          </p>
        )}
      </div>
      <svg ref={svgRef} className="w-full" />
      <p className="font-mono text-[10px] text-neutral-300 mt-4">
        Shade intensity = relative abundance · hover to inspect
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// LIVE DISPATCH (eBird feed)
// ─────────────────────────────────────────────

function LiveDispatch() {
  const [obs, setObs] = useState<EBirdObs[]>([]);
  const [loading, setLoading] = useState(true);
  const [ts, setTs] = useState("");
  const { ref, vis } = useInView(0.1);

  useEffect(() => {
    fetch("/api/ebird?endpoint=data/obs/MA/recent&maxResults=25&back=14")
      .then(r => r.ok ? r.json() : [])
      .then(data => { setObs(data); setTs(new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long" })); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between border-b border-neutral-200 pb-3 mb-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
          What is in the air right now
        </p>
        {ts && <span className="font-mono text-[10px] text-neutral-300">{ts} · eBird live</span>}
      </div>

      {loading && (
        <div className="space-y-px">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-11 bg-neutral-50 animate-pulse" style={{ animationDelay: `${i * 0.08}s` }} />
          ))}
        </div>
      )}

      {!loading && obs.length === 0 && (
        <p className="font-mono text-xs text-neutral-300 py-6">No recent sightings returned.</p>
      )}

      {!loading && obs.length > 0 && (
        <div>
          {obs.slice(0, 20).map((o, i) => (
            <div key={i}
              className="flex items-baseline justify-between py-3 border-b border-neutral-100"
              style={{
                opacity: vis ? 1 : 0,
                transform: vis ? "none" : "translateX(-8px)",
                transition: `opacity 0.4s ease ${i * 0.035}s, transform 0.4s ease ${i * 0.035}s`,
              }}
            >
              <div>
                <span className="font-mono text-[13px] text-neutral-900">{o.comName}</span>
                <span className="font-mono text-[11px] text-neutral-400 italic ml-2">{o.sciName}</span>
              </div>
              <div className="text-right ml-6 shrink-0">
                <p className="font-mono text-[11px] text-neutral-500 truncate" style={{ maxWidth: 180 }}>{o.locName}</p>
                <p className="font-mono text-[10px] text-neutral-300">
                  {o.howMany ? `${o.howMany} ind.` : "present"} · {o.obsDt.split(" ")[0]}
                </p>
              </div>
            </div>
          ))}
          <p className="font-mono text-[10px] text-neutral-300 pt-3">
            {obs.length} records · Cornell Lab of Ornithology / eBird
          </p>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// MAP
// ─────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mapboxgl: any = null;

function MigrationMap() {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const siteMarkers = useRef<any[]>([]);
  const liveMarkers = useRef<any[]>([]);
  const [selected, setSelected] = useState<Site | null>(null);
  const [ready, setReady] = useState(false);
  const [showRoutes, setShowRoutes] = useState(true);
  const [showLive, setShowLive] = useState(true);
  const [liveObs, setLiveObs] = useState<EBirdObs[]>([]);

  useEffect(() => {
    if (!container.current || map.current) return;
    async function init() {
      if (!mapboxgl) {
        const mb = await import("mapbox-gl");
        mapboxgl = mb.default;
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
        if (!document.getElementById("mapbox-gl-css")) {
          const l = document.createElement("link");
          l.id = "mapbox-gl-css"; l.rel = "stylesheet";
          l.href = "https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css";
          document.head.appendChild(l);
        }
      }
      if (!container.current) return;
      map.current = new mapboxgl.Map({
        container: container.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [-7.0, 31.8], zoom: 4.8,
        minZoom: 3, maxZoom: 13,
        attributionControl: false,
      });
      map.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "bottom-right");
      map.current.on("click", () => setSelected(null));
      map.current.on("load", () => {
        // Atlantic flyway
        map.current.addSource("af", { type: "geojson", data: { type: "Feature", geometry: { type: "LineString", coordinates: FLYWAY_ATLANTIC } } });
        map.current.addLayer({ id: "af-glow", type: "line", source: "af", paint: { "line-color": "#c9a96e", "line-width": 8, "line-opacity": 0.12 } });
        map.current.addLayer({ id: "af", type: "line", source: "af", paint: { "line-color": "#c9a96e", "line-width": 2, "line-opacity": 0.75, "line-dasharray": [5, 4] } });
        // Inland route
        map.current.addSource("il", { type: "geojson", data: { type: "Feature", geometry: { type: "LineString", coordinates: FLYWAY_INLAND } } });
        map.current.addLayer({ id: "il-glow", type: "line", source: "il", paint: { "line-color": "#9b8db0", "line-width": 8, "line-opacity": 0.12 } });
        map.current.addLayer({ id: "il", type: "line", source: "il", paint: { "line-color": "#9b8db0", "line-width": 2, "line-opacity": 0.75, "line-dasharray": [5, 4] } });
        setReady(true);
      });
    }
    init();
  }, []);

  // Site markers
  useEffect(() => {
    if (!ready) return;
    siteMarkers.current.forEach(m => m.remove());
    siteMarkers.current = [];
    SITES.forEach(site => {
      const color = TYPE_COLORS[site.type];
      const el = document.createElement("div");
      el.style.cssText = `width:12px;height:12px;border-radius:50%;background:${color};border:2px solid rgba(255,255,255,0.55);cursor:pointer;transition:transform 0.15s;box-shadow:0 0 10px ${color}88;`;
      el.addEventListener("mouseenter", () => { el.style.transform = "scale(1.9)"; });
      el.addEventListener("mouseleave", () => { el.style.transform = "scale(1)"; });
      el.addEventListener("click", e => {
        e.stopPropagation();
        setSelected(site);
        map.current.easeTo({ center: [site.lng, site.lat], zoom: Math.max(map.current.getZoom(), 7), duration: 700, offset: [130, 0] });
      });
      siteMarkers.current.push(new mapboxgl.Marker({ element: el, anchor: "center" }).setLngLat([site.lng, site.lat]).addTo(map.current));
    });
  }, [ready]);

  // Live eBird
  useEffect(() => {
    fetch("/api/ebird?endpoint=data/obs/MA/recent&maxResults=80&back=14")
      .then(r => r.ok ? r.json() : [])
      .then(d => setLiveObs(d.filter((o: EBirdObs) => o.lat && o.lng)))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!ready) return;
    liveMarkers.current.forEach(m => m.remove());
    liveMarkers.current = [];
    if (!showLive) return;
    liveObs.forEach(o => {
      const el = document.createElement("div");
      el.style.cssText = "width:6px;height:6px;border-radius:50%;background:#4ade80;opacity:0.75;box-shadow:0 0 5px #4ade80;";
      const popup = new mapboxgl.Popup({ offset: 8, closeButton: false })
        .setHTML(`<div style="font-family:monospace;font-size:11px;padding:4px 8px;background:#0a0a0a;color:#fff;border-radius:3px"><strong>${o.comName}</strong><br/><span style="color:#888">${o.locName}</span></div>`);
      liveMarkers.current.push(new mapboxgl.Marker({ element: el, anchor: "center" }).setLngLat([o.lng, o.lat]).setPopup(popup).addTo(map.current));
    });
  }, [ready, liveObs, showLive]);

  // Toggle routes
  useEffect(() => {
    if (!ready) return;
    const o = showRoutes ? 0.75 : 0;
    const go = showRoutes ? 0.12 : 0;
    try {
      ["af","il"].forEach(id => {
        map.current.setPaintProperty(id, "line-opacity", o);
        map.current.setPaintProperty(`${id}-glow`, "line-opacity", go);
      });
    } catch {}
  }, [showRoutes, ready]);

  return (
    <div className="relative" style={{ height: 580 }}>
      <div ref={container} style={{ position: "absolute", inset: 0 }} />

      {/* Toggle controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {[
          { label: "Flyways", active: showRoutes, toggle: () => setShowRoutes(v => !v), color: "#c9a96e", icon: "line" },
          { label: "Live sightings", active: showLive, toggle: () => setShowLive(v => !v), color: "#4ade80", icon: "dot" },
        ].map(btn => (
          <button key={btn.label} onClick={btn.toggle}
            className="flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider rounded transition-all"
            style={{
              background: btn.active ? `${btn.color}18` : "rgba(0,0,0,0.55)",
              border: `1px solid ${btn.active ? btn.color : "rgba(255,255,255,0.12)"}`,
              color: btn.active ? btn.color : "rgba(255,255,255,0.35)",
              backdropFilter: "blur(8px)",
            }}>
            {btn.icon === "line"
              ? <svg width="18" height="6"><line x1="0" y1="3" x2="18" y2="3" stroke={btn.color} strokeWidth="1.5" strokeDasharray="4 3"/></svg>
              : <span className="w-2 h-2 rounded-full" style={{ background: btn.active ? btn.color : "#555" }} />
            }
            {btn.label}
          </button>
        ))}
      </div>

      {/* Flyway legend */}
      <div className="absolute top-4 right-4 z-10 p-3 rounded"
        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <svg width="22" height="6"><line x1="0" y1="3" x2="22" y2="3" stroke="#c9a96e" strokeWidth="1.5" strokeDasharray="4 3"/></svg>
            <span className="font-mono text-[10px] text-white/55">Atlantic flyway</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="22" height="6"><line x1="0" y1="3" x2="22" y2="3" stroke="#9b8db0" strokeWidth="1.5" strokeDasharray="4 3"/></svg>
            <span className="font-mono text-[10px] text-white/55">Atlas inland route</span>
          </div>
          <div className="mt-1 pt-2 border-t border-white/10 flex flex-col gap-1.5">
            {Object.entries(TYPE_COLORS).map(([t, c]) => (
              <div key={t} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: c }} />
                <span className="font-mono text-[10px] text-white/45 capitalize">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Site detail panel */}
      <div className="absolute top-0 right-0 bottom-0 z-20 transition-transform duration-300"
        style={{ width: 300, background: "#0a0a0a", borderLeft: "1px solid rgba(255,255,255,0.07)", transform: selected ? "translateX(0)" : "translateX(100%)" }}>
        {selected && (
          <div className="p-6 pt-10 h-full overflow-y-auto">
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-white/35 hover:text-white text-2xl leading-none">×</button>
            <p className="font-mono text-[9px] uppercase tracking-widest mb-1" style={{ color: TYPE_COLORS[selected.type] }}>
              {selected.type}{selected.elevation ? ` · ${selected.elevation}` : ""}
              {selected.ramsar && <span className="ml-2 text-blue-400">Ramsar</span>}
            </p>
            <h3 className="font-serif text-white text-xl leading-tight mb-5">{selected.name}</h3>
            <p className="font-mono text-[11px] text-white/55 leading-relaxed mb-5">{selected.significance}</p>
            <div className="space-y-4">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-white/25 mb-1">Species</p>
                <p className="font-mono text-[11px] text-white/65 leading-relaxed">{selected.species}</p>
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-white/25 mb-1">Peak season</p>
                <p className="font-mono text-[11px] text-white/65">{selected.peak}</p>
              </div>
              {selected.threatened && (
                <div className="mt-4 p-3 rounded" style={{ background: "rgba(185,28,28,0.15)", border: "1px solid rgba(185,28,28,0.3)" }}>
                  <p className="font-mono text-[10px] text-red-400/80">⚠ {selected.threatened}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN DOSSIER
// ─────────────────────────────────────────────

export default function BirdAtlasDossier() {
  const heroR = useInView(0.1);

  return (
    <div className="min-h-screen bg-white text-neutral-900">

      {/* ━━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-32 pb-20 border-b border-neutral-100">
        <Link href="/stories"
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-300 hover:text-neutral-600 transition-colors inline-block mb-10">
          ← Stories
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end">
          <div className="lg:col-span-7" ref={heroR.ref}>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-4">
              Dossier · Natural History
            </p>
            <h1 className="font-serif leading-[0.9] tracking-tight mb-6"
              style={{
                fontSize: "clamp(3.2rem,9vw,6rem)",
                opacity: heroR.vis ? 1 : 0,
                transform: heroR.vis ? "none" : "translateY(28px)",
                transition: "opacity 1.1s ease, transform 1.1s ease",
              }}>
              <em>The Bird<br />Atlas</em>
            </h1>
            <p className="font-serif italic text-xl text-neutral-400 leading-snug">
              Morocco is where Europe ends<br />and Africa begins. Every migration<br />has to cross here.
            </p>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <div className="grid grid-cols-2 gap-8">
                <AnimStat value={500} suffix="+" label="species recorded" accent="#c9a96e" />
                <AnimStat value={400000} suffix="+" label="storks cross annually" accent="#2d7a5a" />
                <AnimStat value={14} suffix="km" label="the crossing width" accent="#9b8db0" />
                <AnimStat value={95} suffix="%" label="of wild Bald Ibis" accent="#c04040" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ━━━ OPENING PROSE ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-20 border-b border-neutral-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-serif text-2xl leading-relaxed text-neutral-800 mb-8">
                Fourteen kilometres. That is the width of the Strait of Gibraltar — the gap two continents 
                leave between them. Every bird that migrates between Europe and Africa has to cross it or 
                go swimming. Most do not go swimming.
              </p>
              <p className="text-[14px] leading-[1.85] text-neutral-600 mb-6">
                Each autumn, hundreds of millions of birds funnel through this corridor. Raptors cannot flap 
                across open water — they depend on thermals, and thermals only rise over land. So they 
                gather above Jbel Moussa, circle upward in columns until they are almost invisible, then glide 
                across in silence. The sky above the strait in September looks like a slow-motion river. 
                White storks cross in flocks of thousands on the same thermals. Black kites fill the air 
                so densely they cast moving shadows on the ground.
              </p>
              <p className="text-[14px] leading-[1.85] text-neutral-600">
                Morocco is not just a destination on the route. It is the crossing, the wintering ground, 
                and the refuge of species that exist almost nowhere else. More bird species have been 
                recorded here than in France or Spain — not because Morocco is exceptional, but because 
                of where it sits: at the hinge of two continents, where Mediterranean, Atlantic, Saharan, 
                and sub-Saharan biomes collide in a geography not much larger than California.
              </p>
            </Reveal>
          </div>

          {/* Pull quote */}
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.2}>
              <div className="sticky top-24">
                <div className="border-l-2 border-neutral-900 pl-6 mb-10">
                  <p className="font-serif italic text-2xl leading-snug text-neutral-800">
                    "The sky above the strait in September looks like a slow-motion river."
                  </p>
                </div>
                <div className="space-y-5">
                  {[
                    { label: "Atlantic corridor", desc: "Merja Zerga to Khnifiss — 1,800km of wetland chain" },
                    { label: "Night crossing", desc: "Passerines cross at night, raptors by day — a 10-million year arms race" },
                    { label: "The ibis question", desc: "700 birds left on Earth. Most of them here." },
                  ].map((item) => (
                    <div key={item.label} className="border-t border-neutral-100 pt-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400 mb-1">{item.label}</p>
                      <p className="text-[12px] text-neutral-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ━━━ FILM ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-b border-neutral-100">
        <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
          <iframe
            src="https://player.vimeo.com/video/58291553?autoplay=0&title=0&byline=0&portrait=0&color=c9a96e"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="A Bird Ballet — Neels Castillon"
          />
        </div>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-5">
          <p className="font-mono text-[10px] text-neutral-300">
            <em>A Bird Ballet</em> — Neels Castillon, Marseille, 2013.
            Starlings in murmuration. The same species crosses Morocco every autumn on its way south.
          </p>
        </div>
      </section>

      {/* ━━━ MAP — FULL WIDTH ━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-b border-neutral-100">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-10">
          <Reveal>
            <div className="flex items-baseline justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-1">
                  The Routes
                </p>
                <p className="text-[13px] text-neutral-500">
                  Atlantic flyway and Atlas inland route. Click any site for detail. Green dots are live eBird sightings.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
        <MigrationMap />
      </section>

      {/* ━━━ THE ATLANTIC CHAIN ━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-24 border-b border-neutral-100">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-300 mb-16">
            The Chain
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {[
            {
              title: "Merja Zerga",
              sub: "34°52'N — Atlantic coast",
              body: "A Ramsar wetland an hour north of Rabat. In January, greater flamingos stand in flocks of thousands against grey Atlantic water — pink geometry in grey light. Spoonbills, avocets, and marsh harriers use the lagoon as a refuelling stop between Europe and the Sahel. The last confirmed sighting of the Slender-billed Curlew — possibly the rarest bird in the world, possibly now extinct — was recorded here.",
              accent: "#4a9aba",
            },
            {
              title: "Souss-Massa",
              sub: "30°04'N — south of Agadir",
              body: "The Northern Bald Ibis is not beautiful. It is bald, black, and equipped with a curved red bill that gives it the expression of someone who has just received bad news. It is also one of the rarest birds on Earth — fewer than 700 individuals survive in the wild — and Morocco holds 95% of them. Souss-Massa is where most of them breed, on coastal cliffs above a national park that exists specifically to protect them.",
              accent: "#2d7a5a",
            },
            {
              title: "Khnifiss Lagoon",
              sub: "28°01'N — near Tarfaya",
              body: "The largest lagoon in southern Morocco, remote enough that most of the 13 million tourists who enter Morocco annually never hear its name. The Atlantic coast between Agadir and the Saharan border is one of the least-visited coastlines in North Africa, which is precisely why it still works as a migration staging post. Flamingos, spoonbills, and Caspian terns use it like a motorway service station — fuel up, move on.",
              accent: "#d4945a",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="border-t-2 pt-6" style={{ borderColor: item.accent }}>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] mb-1" style={{ color: item.accent }}>{item.sub}</p>
                <h3 className="font-serif text-2xl mb-4">{item.title}</h3>
                <p className="text-[13px] leading-[1.85] text-neutral-600">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ━━━ SEASONAL PRESENCE ━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-24 border-b border-neutral-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-4">When to go</p>
              <h2 className="font-serif text-4xl leading-tight mb-6">
                <em>Nine species,<br />twelve months</em>
              </h2>
              <p className="text-[13px] leading-[1.85] text-neutral-600 mb-6">
                Morocco is not a seasonal destination for birds — it is a year-round one. Something extraordinary 
                is always happening. The question is which extraordinary thing you are there to see.
              </p>
              <p className="text-[13px] leading-[1.85] text-neutral-600">
                September is the crossing — raptors and storks above the strait. January is flamingos 
                and wintering waterbirds at the Atlantic lagoons. March is the Bald Ibis at Souss-Massa, 
                arriving to breed on the same cliffs they have used for thousands of years. 
                May is the High Atlas, when the Bearded Vulture is still at the nest.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={0.15}>
              <SeasonalChart />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ━━━ LIVE DISPATCH ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-24 border-b border-neutral-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-4">Dispatch</p>
              <h2 className="font-serif text-4xl leading-tight mb-6">
                <em>What is being<br />seen today</em>
              </h2>
              <p className="text-[13px] leading-[1.85] text-neutral-600">
                Observations submitted by birders in Morocco in the last 14 days, 
                via the eBird citizen science network. Updated daily. 
                The list changes with the season — check it in September and it reads 
                like a roll call of everything Europe is sending south.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={0.1}>
              <LiveDispatch />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ━━━ WIND EMBED ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-24 border-b border-neutral-100">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-8">
            <div className="lg:col-span-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-4">Migration conditions now</p>
              <h2 className="font-serif text-4xl leading-tight">
                <em>Birds read wind<br />the way sailors do</em>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="text-[13px] leading-[1.85] text-neutral-600">
                North winds push autumn migration south through the strait. South winds halt it. 
                The Saharan sirocco can ground thousands of birds for days — you can find 
                exhausted warblers sitting on every surface in Tarifa waiting for the weather to turn. 
                The map below shows current wind conditions over Morocco.
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-sm overflow-hidden border border-neutral-100" style={{ height: 440 }}>
            <iframe
              src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=km/h&zoom=5&overlay=wind&product=ecmwf&level=surface&lat=32.5&lon=-7.0&detail=true&pressure=true&message=true"
              style={{ width: "100%", height: "100%", border: "none" }}
              title="Wind conditions over Morocco"
            />
          </div>
          <p className="font-mono text-[10px] text-neutral-300 mt-3">
            Windy.com · ECMWF forecast model · live
          </p>
        </Reveal>
      </section>

      {/* ━━━ THREE SPECIES ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-24 border-b border-neutral-100">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-300 mb-16">
            The species Morocco cannot afford to lose
          </p>
        </Reveal>
        <div className="space-y-16">
          {[
            {
              name: "Northern Bald Ibis",
              status: "Endangered", statusColor: "#dc2626",
              opening: "It went extinct everywhere else first.",
              body: "Europe lost it in the 17th century. The Middle East lost it in the 20th. Morocco held on. The species is bald, black, and equipped with a curved red bill — it has never won any beauty competitions — but it breeds on coastal cliffs at Souss-Massa and Tamri with the consistency of something that has been doing this for a million years. The global wild population stands at around 700 individuals. Nearly all of them are here.",
            },
            {
              name: "Marbled Duck",
              status: "Vulnerable", statusColor: "#d97706",
              opening: "A duck that needs a specific kind of wetland.",
              body: "Not any wetland — shallow, vegetated, warm. The Marbled Duck has been declining across its Mediterranean range for decades as marshes drain and water tables drop. Morocco's Atlantic lagoon chain — Merja Zerga, Sidi Bourhaba, Dayet Aoua in the Middle Atlas — is critical to the western population. Each drained wetland removes a breeding or wintering site with no substitute available. The global population is estimated at 15,000–20,000 birds.",
            },
            {
              name: "Houbara Bustard",
              status: "Vulnerable", statusColor: "#d97706",
              opening: "The most politically complex bird in Morocco.",
              body: "The Houbara Bustard has been hunted with falcons for centuries across the Arab world. Moroccan populations face pressure from legal, licensed falconry hunts by Gulf royalty — a diplomatic relationship that complicates straightforward conservation. The bird is a steppe and desert specialist, and the Saharan fringes around Merzouga remain one of the last viable North African sites. Whether the populations there are sustainable depends entirely on decisions made in palaces rather than field stations.",
            },
          ].map((sp, i) => (
            <Reveal key={sp.name} delay={i * 0.08}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16 border-b border-neutral-100 last:border-0 last:pb-0">
                <div className="lg:col-span-3">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] mb-1" style={{ color: sp.statusColor }}>{sp.status}</p>
                  <h3 className="font-serif text-2xl text-neutral-900">{sp.name}</h3>
                </div>
                <div className="lg:col-span-8 lg:col-start-5">
                  <p className="font-serif italic text-xl text-neutral-700 mb-4">{sp.opening}</p>
                  <p className="text-[13px] leading-[1.85] text-neutral-600">{sp.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ━━━ JOURNEY CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
        <Reveal>
          <div className="flex items-center justify-between gap-8 flex-wrap">
            <p className="font-serif italic text-xl text-neutral-600 max-w-lg">
              The birding routes we build cross wetlands most tourists never see.
            </p>
            <Link href="/plan-your-trip"
              className="font-mono text-[11px] uppercase tracking-[0.15em] border border-neutral-900 px-7 py-3.5 hover:bg-neutral-900 hover:text-white transition-all duration-200 whitespace-nowrap">
              Plan a birding journey →
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ━━━ SOURCES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-t border-neutral-200" style={{ background: "#f5f5f0" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(0,0,0,0.4)" }}>
              Live data
            </p>
            <p className="text-[11px] leading-[1.8]" style={{ color: "rgba(0,0,0,0.6)" }}>
              Sightings feed: eBird / Cornell Lab of Ornithology, updated daily.
              Wind data: Windy.com / ECMWF forecast model, live.
            </p>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(0,0,0,0.4)" }}>
              Reference sources
            </p>
            <p className="text-[11px] leading-[1.8]" style={{ color: "rgba(0,0,0,0.6)" }}>
              Bergier & Thévenot, <em>Oiseaux du Maroc</em> (2006).
              BirdLife International IBA database. IUCN Red List 2024.
              GREPOM. HawkWatch International Gibraltar counts.
            </p>
          </div>
        </div>
        <p className="font-mono text-[10px] mt-10" style={{ color: "#92702a" }}>
          © Slow Morocco
        </p>
      </section>

    </div>
  );
}
