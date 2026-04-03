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
  synagogue: { label: "Synagogues", color: "#C4A265" },
  mellah: { label: "Mellahs", color: "#8B2635" },
  cemetery: { label: "Cemeteries", color: "#e8e0d4" },
  museum: { label: "Museums", color: "#2B4B6F" },
  zaouia: { label: "Pilgrimage Shrines", color: "#6B8F71" },
  historical: { label: "Historical Sites", color: "#9B7CB5" },
};

const sites: Site[] = [
  // CASABLANCA
  { name: "Museum of Moroccan Judaism", city: "Casablanca", cat: "museum", lat: 33.5731, lng: -7.6186, desc: "The only Jewish museum in the Arab world. Torah scrolls, wedding dresses, photographs of communities that emptied between 1948 and 1967. Built 1997 by the community itself.", detail: "81 Rue Chasseur Jules Gros, Oasis. Mon–Fri 10am–5pm. 20 MAD." },
  { name: "Temple Beth-El", city: "Casablanca", cat: "synagogue", lat: 33.5888, lng: -7.6310, desc: "Stained glass like Chagall. Seats five hundred. Still holds Shabbat services on Friday evenings. The largest active synagogue in the Arab world.", detail: "Boulevard Moulay Youssef. Visitors welcome weekdays by arrangement." },
  { name: "Ettedgui Synagogue", city: "Casablanca", cat: "synagogue", lat: 33.5870, lng: -7.6250, desc: "King Mohammed VI attended the rededication personally in 2016. A sitting monarch in a synagogue — in an Arab country. The photographs were distributed worldwide.", detail: "Rededicated 2016 under royal patronage." },
  { name: "Casablanca Jewish Cemetery", city: "Casablanca", cat: "cemetery", lat: 33.5820, lng: -7.6120, desc: "White stone markers in French, Hebrew, and Spanish. The annual hiloula at the tomb of the Jewish saint Eliahou draws the community together.", detail: "Annual hiloula at tomb of Saint Eliahou." },
  { name: "Mellah of Casablanca", city: "Casablanca", cat: "mellah", lat: 33.5845, lng: -7.6180, desc: "Young by Moroccan standards — barely a century old. Jews no longer live here, but kosher butchers remain in the old market.", detail: "Where 275,000 became 2,500." },

  // RABAT
  { name: "Mellah of Rabat", city: "Rabat", cat: "mellah", lat: 34.0209, lng: -6.8340, desc: "Smaller, quieter than the others. Near the Kasbah of the Udayas. Where Mohammed V refused Vichy France\u2019s demand to deport Moroccan Jews.", detail: "\u201CThere are no Jews in Morocco. There are only Moroccan subjects.\u201D" },
  { name: "Talmud Torah Synagogue", city: "Rabat", cat: "synagogue", lat: 34.0195, lng: -6.8330, desc: "Restored and maintained. Rabat\u2019s Jewish community numbers approximately 400 — small but present, in the capital where their protection was decided." },
  { name: "Rabat Jewish Cemetery", city: "Rabat", cat: "cemetery", lat: 34.0222, lng: -6.8305, desc: "Near the Kasbah of the Udayas. Tombstones facing Jerusalem, as they do in every Jewish cemetery in Morocco. Walking distance from the palace." },

  // FES
  { name: "Mellah of Fes", city: "Fes", cat: "mellah", lat: 34.0585, lng: -4.9780, desc: "Established 1438. The first mellah in Morocco. The word itself may originate here — mellah, salt. Balconied houses distinguish Jewish homes from Muslim ones.", detail: "Adjacent to Royal Palace. Enter via Bab el-Mellah." },
  { name: "Ibn Danan Synagogue", city: "Fes", cat: "synagogue", lat: 34.0580, lng: -4.9775, desc: "Hidden behind a tiny unmarked door. 17th century. Carved plaster, painted wood, horseshoe arches. Downstairs: a mikveh fed by underground springs.", detail: "UNESCO-listed. Daily except Saturday, 9am–5pm. 10 MAD." },
  { name: "Slat al-Fassiyine Synagogue", city: "Fes", cat: "synagogue", lat: 34.0582, lng: -4.9770, desc: "The toshavim built this one. Indigenous Moroccan Jews, here centuries before the megorashim arrived from Spain. The architecture remembers the division.", detail: "14th century. Restored 2013." },
  { name: "Habarim Jewish Cemetery", city: "Fes", cat: "cemetery", lat: 34.0575, lng: -4.9760, desc: "22,000 whitewashed tombs, all facing Jerusalem. Resting place of Lalla Solica — killed at 16 for refusing to convert. More Jewish saints here than in any other cemetery in Morocco.", detail: "Fully restored 2015 under royal patronage. 3 synagogues within grounds." },
  { name: "Maimonides\u2019 House", city: "Fes", cat: "historical", lat: 34.0620, lng: -4.9740, desc: "Where the most important Jewish philosopher lived from 1159 to 1165. He wrote much of the Commentary on the Mishnah here. Not marked. The community knows.", detail: "Near the Qarawiyyin. Not formally open to visitors." },
  { name: "Future Museum of Jewish Culture", city: "Fes", cat: "museum", lat: 34.0590, lng: -4.9785, desc: "Completed 2023 in the oldest mellah in Morocco. When it opens, Morocco will have two Jewish museums. No other Arab country has one.", detail: "Opening date pending." },

  // MEKNES
  { name: "Mellah of Meknes", city: "Meknes", cat: "mellah", lat: 33.8935, lng: -5.5547, desc: "In the shadow of Bab Mansour — the grandest gate in Morocco. Streets still named after rabbis. Hebraic epitaphs predate Islam.", detail: "11 synagogues remain, none in daily use." },
  { name: "Tomb of Rabbi David Benmidan", city: "Meknes", cat: "zaouia", lat: 33.8920, lng: -5.5540, desc: "A place of pilgrimage in the mellah. Draws Jewish visitors from around the world." },
  { name: "Meknes Jewish Cemeteries", city: "Meknes", cat: "cemetery", lat: 33.8910, lng: -5.5530, desc: "Two cemeteries. Tombs of saints: Haim Messas, David Boussidan, Raphael Berdugo." },

  // MARRAKECH
  { name: "Mellah of Marrakech", city: "Marrakech", cat: "mellah", lat: 31.6210, lng: -7.9850, desc: "Founded 1558, adjacent to the Royal Palace. Fewer than 75 Jews remain. King Mohammed VI ordered the original name restored to the quarter.", detail: "Second oldest mellah. $20M restoration ordered 2016." },
  { name: "Slat al-Azama Synagogue", city: "Marrakech", cat: "synagogue", lat: 31.6208, lng: -7.9845, desc: "Founded 1492 — the same year Jews were expelled from Spain. The name carries the catastrophe. Still holds occasional services.", detail: "Near Place des Ferblantiers. Daily except Saturday. 20 MAD." },
  { name: "Lazama Synagogue", city: "Marrakech", cat: "synagogue", lat: 31.6215, lng: -7.9842, desc: "The main working synagogue. Behind an unmarked door — knock and wait. Blue and white zellige, carved cedar bimah. The guardian is Muslim. He keeps the key.", detail: "Derb Manchoura, Mellah. Daily except Saturday, 9am–6pm. 20 MAD." },
  { name: "Miaara Jewish Cemetery", city: "Marrakech", cat: "cemetery", lat: 31.6195, lng: -7.9860, desc: "Established 1537 — twenty-one years before the mellah itself. Hundreds of whitewashed tombs. All facing Jerusalem, four thousand kilometres east.", detail: "Predates the mellah by 21 years." },

  // ESSAOUIRA
  { name: "Bayt Dakira", city: "Essaouira", cat: "museum", lat: 31.5130, lng: -9.7700, desc: "House of Memory. Opened 2020. André Azoulay — senior adviser to the King, himself a Jewish Essaouiran — championed the project.", detail: "Daily 10am–6pm. 30 MAD." },
  { name: "Chaim Pinto Synagogue", city: "Essaouira", cat: "synagogue", lat: 31.5125, lng: -9.7695, desc: "Named after a rabbi born in Agadir in 1749. Every September, 1,500 pilgrims. Joseph Sebag may be the city\u2019s last permanent Jewish resident. When the pilgrims leave, he stays.", detail: "Annual hiloula in September. Active." },
  { name: "Simon Attias Synagogue", city: "Essaouira", cat: "synagogue", lat: 31.5132, lng: -9.7688, desc: "Named after one of the great Jewish merchants who ran trade networks from sub-Saharan Africa to London. Now a museum and research centre.", detail: "Daily 10am–5pm. 20 MAD." },
  { name: "Essaouira Jewish Cemetery", city: "Essaouira", cat: "cemetery", lat: 31.5110, lng: -9.7680, desc: "Atlantic clifftop. Cubist tombstones with Amazigh geometric designs — unlike any other Jewish cemetery in the world. The wind never stops." },
  { name: "Mellah of Essaouira", city: "Essaouira", cat: "mellah", lat: 31.5127, lng: -9.7702, desc: "By the late 1880s, Jews were 40% of the population. Stars of David still carved above doorways. The sultan appointed Jewish families to run international trade.", detail: "Stars of David still visible on facades." },

  // TINGHIR
  { name: "Mellah of Tinghir", city: "Tinghir", cat: "mellah", lat: 31.5140, lng: -5.5320, desc: "Kamal Hachkar went back to make a film about the Jews who left. The mellah was crumbling but not empty. The mezuzah marks are still on the doorframes. Nobody filled them in.", detail: "Subject of 'Tinghir-Jerusalem' (2013). Best New Director, Tangier Film Festival." },
  { name: "Tinghir Jewish Cemetery", city: "Tinghir", cat: "cemetery", lat: 31.5148, lng: -5.5310, desc: "Overlooks the palmery. Tombstones facing Jerusalem, four thousand kilometres east across the Sahara." },

  // SEFROU
  { name: "Mellah of Sefrou", city: "Sefrou", cat: "mellah", lat: 33.8300, lng: -4.8350, desc: "They called it Little Jerusalem. A mountain town where the Jewish community ran the cherry trade. The cherry festival continues. The merchants are gone.", detail: "30km south of Fes. Easy half-day trip." },

  // TETOUAN
  { name: "Mellah of Tetouan", city: "Tetouan", cat: "mellah", lat: 35.5689, lng: -5.3722, desc: "UNESCO-listed medina. The mellah is integrated — not walled off. This is where Haketia was spoken: a Judaeo-Spanish dialect with Arabic inflections, distinct from Ladino.", detail: "Accessible from Tangier (1 hour) or Chefchaouen (1.5 hours)." },

  // PILGRIMAGE SHRINES
  { name: "Shrine of Rabbi Amram Ben Diwan", city: "Ouezzane", cat: "zaouia", lat: 34.7935, lng: -5.5600, desc: "The largest Jewish pilgrimage in Morocco. The rabbi came from Palestine in the 1770s. Thousands attend every May. Candle auctions — enormous tapers, bidding in the thousands of dirhams.", detail: "Hiloula in May. Accessible from Chefchaouen (1.5h) or Fes (3h)." },
  { name: "Shrine of Moulay Ighi", city: "Atlas Mountains", cat: "zaouia", lat: 31.3500, lng: -7.4500, desc: "The rabbi sensed his death, walked to the hilltop, and commanded the earth to close. The myrtle bush beside his grave has never caught fire despite centuries of candles. Muslims attend the hiloula.", detail: "Sharp turn off N9 between Marrakech and Ouarzazate. Easy to miss." },
  { name: "Shrine of Rabbi Haim Ben Diwan", city: "Ouirgane", cat: "zaouia", lat: 31.1530, lng: -8.0800, desc: "White compound in the mountains. Three tombs. Muslim caretaker opens the gates in May. Jewish pilgrims enter a space that is simultaneously theirs and his." },
  { name: "Tomb of Rabbi Shlomo Bel Hench", city: "Ourika Valley", cat: "zaouia", lat: 31.3500, lng: -7.8600, desc: "500-year-old tomb of a former chief rabbi. Believed to have healing properties. People have travelled here seeking cures for centuries.", detail: "40km south of Marrakech. Combine with valley day trip." },
  { name: "Tomb of Shmuel AbuHatzeira", city: "Erfoud", cat: "zaouia", lat: 31.4316, lng: -4.2280, desc: "In the oasis town alongside the trilobite trade. A pilgrimage stop in the deep south." },

  // HISTORICAL
  { name: "Volubilis", city: "Near Meknes", cat: "historical", lat: 34.0734, lng: -5.5543, desc: "Roman columns against sky. Jews lived here under Roman rule — the evidence is archaeological, not anecdotal. The oldest Jewish presence in Morocco may be the oldest in all of Africa.", detail: "Daily 8am–sunset. 70 MAD. Allow 2 hours." },
  { name: "Taroudant Jewish Quarter", city: "Taroudant", cat: "mellah", lat: 30.4710, lng: -8.8770, desc: "Locals believe the community dates to the 11th century. Fortified walls once sheltered both communities." },
  { name: "Kasbah Taourirt Quarter", city: "Ouarzazate", cat: "mellah", lat: 30.9200, lng: -6.8930, desc: "The Glaoui stronghold. The Jewish community was among the last to leave the south. Their departure coincided with independence." },
  { name: "Demnate Mellah", city: "Demnate", cat: "mellah", lat: 31.7340, lng: -7.0040, desc: "A small mellah in the foothills of the Atlas. The Jewish community here was primarily Amazigh-speaking." },
  { name: "Midelt Mellah", city: "Midelt", cat: "mellah", lat: 32.6800, lng: -4.7330, desc: "At the crossroads between the Middle Atlas and the High Atlas. Transit point for communities moving between Fes and the south." },
];

// =============================================
// COMPONENT
// =============================================

export default function JewishHeritageContent() {
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
      center: [-6.5, 32.0],
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
      sites.forEach((site) => {
        const el = document.createElement("div");
        el.style.cssText = `
          width: 12px; height: 12px; border-radius: 50%; cursor: pointer;
          border: 2px solid rgba(255,255,255,0.3);
          box-shadow: 0 0 10px rgba(0,0,0,0.4);
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
          el.style.borderColor = "rgba(255,255,255,0.3)";
        });

        const handleSelect = (e: Event) => {
          e.stopPropagation();
          setSelected(site);
          setPanelOpen(true);
          map.flyTo({
            center: [site.lng, site.lat],
            zoom: 13,
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
  }, [activeFilter]);

  const toggleFilter = (cat: string) => {
    setActiveFilter((prev) => (prev === cat ? null : cat));
  };

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
          aria-label="Interactive map of Jewish heritage sites in Morocco"
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
                2,000 Years in
                <br />
                Every Quarter
              </h1>
              <p className="text-sm text-white/50 mt-3 max-w-lg leading-relaxed hidden md:block">
                An interactive map of Jewish heritage across Morocco &mdash;
                synagogues, mellahs, cemeteries, pilgrimage shrines, and the
                places where 275,000 became 2,500.
              </p>
              <p className="text-[11px] text-white/30 mt-3">
                <span className="text-[#8B7355]">{sites.length}</span> sites
                across <span className="text-[#8B7355]">18</span> cities
              </p>
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
                href="/journeys/morocco-jewish-heritage-8-days"
                className="inline-block mt-6 text-[10px] tracking-[0.15em] uppercase text-white/30 hover:text-white/60 transition-colors border-b border-white/15 pb-1"
              >
                Travel the Jewish Heritage journey &rarr;
              </Link>
            </article>
          )}
        </aside>

        {/* Bottom attribution */}
        <footer className="fixed bottom-6 right-6 lg:right-10 z-10 text-[10px] text-white/20 text-right leading-relaxed hidden md:block">
          &copy; Slow Morocco &middot; Dancing with Lions
          <br />
          Data: UNESCO, WJC, Diarna Archive
        </footer>

        {/* Journey CTA */}
        <div className="fixed bottom-6 left-6 lg:left-10 z-10 hidden md:block">
          <Link
            href="/journeys/morocco-jewish-heritage-8-days"
            className="text-[10px] tracking-[0.15em] uppercase text-white/30 hover:text-white/60 transition-colors border-b border-white/15 pb-1"
          >
            Travel this route &rarr;
          </Link>
        </div>
      </main>
    </>
  );
}
