"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * Morocco, on one line — 315,000 years, Jbel Irhoud to 2030.
 * House serif, black on white; the signal red is a scalpel — the active marker,
 * the scale break, the depth tick. Where an era has a story, the block links to it
 * (title underlines on hover, a small arrow appears); the rest stay plain text.
 */

type Era = { date: string; title: string; desc: string; year: number; href: string | null };

const ERAS: Era[] = [
  { date: "315k BCE", title: "Jbel Irhoud", desc: "The oldest Homo sapiens found anywhere. A modern face on an archaic braincase.", year: -315000, href: "/stories/the-first-skull" },
  { date: "82k BCE", title: "Taforalt", desc: "A cave in the Rif with shell beads and the oldest known cemetery in North Africa.", year: -82000, href: null },
  { date: "10k BCE", title: "The green Sahara", desc: "Rivers, lakes, elephants and giraffe. The carvings at Oukaimeden and the Draa show animals t", year: -10000, href: "/stories/the-green-sahara" },
  { date: "5,000 BCE", title: "The Sahara dries", desc: "The rain belt moves south. What is left is the desert, and the people move to the coasts and", year: -5000, href: null },
  { date: "1,100 BCE", title: "Phoenicians at Lixus", desc: "Trading posts on the Atlantic. Purple dye from murex shells, worth more than its weight in s", year: -1100, href: "/stories/the-purple-traders" },
  { date: "40 BCE", title: "Mauretania becomes Roman", desc: "Volubilis, olive presses, mosaics. The frontier stops where the rain stops.", year: -40, href: "/stories/the-edge-of-the-empire" },
  { date: "429", title: "The Vandals cross", desc: "Rome's grain province gone in a decade.", year: 429, href: null },
  { date: "681", title: "The Arab conquest begins", desc: "Uqba ibn Nafi reaches the Atlantic. Dihya holds the Aurès for five years.", year: 681, href: "/stories/the-warrior-queen" },
  { date: "788", title: "Idris I", desc: "The first Moroccan dynasty. An unbroken run of monarchy begins that has not stopped since.", year: 788, href: "/stories/the-holiest-town" },
  { date: "859", title: "Al-Qarawiyyin founded", desc: "Fatima al-Fihri endows a mosque and school in Fes. It has never closed.", year: 859, href: "/stories/the-queen-who-built-fez" },
  { date: "1062", title: "Marrakech founded", desc: "The Almoravids build a capital on a plain with no river, and dig khettara to water it.", year: 1062, href: "/stories/the-berber-caliphate" },
  { date: "1147", title: "The Almohads", desc: "Koutoubia, Giralda, Hassan Tower. One architectural school, three cities, two countries.", year: 1147, href: "/stories/the-three-sisters" },
  { date: "1269", title: "The Marinids", desc: "Fes becomes the intellectual capital. The madrasas are built to a standard nothing has match", year: 1269, href: "/stories/the-golden-madrasas" },
  { date: "1492", title: "Granada falls", desc: "The exiles cross the strait, bringing the tile, the music, the pastry and the grief.", year: 1492, href: "/stories/the-fall-of-al-andalus" },
  { date: "1578", title: "Three Kings at Ksar el-Kebir", desc: "Three kings ride in. One rides out. Portugal loses its king and its independence.", year: 1578, href: "/stories/the-battle-of-three-kings" },
  { date: "1591", title: "Ahmad al-Mansur takes Timbuktu", desc: "Saharan gold pays for El Badi. The Saadians gild a palace and it is torn down a century late", year: 1591, href: "/stories/the-golden-one" },
  { date: "1777", title: "Morocco recognises the United States", desc: "Mohammed III opens the ports. Congress does not answer for seven years.", year: 1777, href: "/stories/the-first-friend" },
  { date: "1912", title: "Treaty of Fes", desc: "A protectorate, not a colony. The sultan stays, the medinas stay, and the ville nouvelle is", year: 1912, href: "/stories/french-protectorate" },
  { date: "1953", title: "Mohammed V exiled", desc: "Removed to break the independence movement. It made him its symbol instead.", year: 1953, href: null },
  { date: "1956", title: "Independence", desc: "2 March. The northern zone follows in April, Tangier in October, Sidi Ifni in 1969.", year: 1956, href: "/stories/french-protectorate" },
  { date: "1975", title: "The Green March", desc: "350,000 people walk south carrying flags and copies of the Quran.", year: 1975, href: "/stories/the-green-march" },
  { date: "1999", title: "Mohammed VI", desc: "Accession. The Mudawana family code reform follows in 2004.", year: 1999, href: null },
  { date: "2011", title: "Tamazight becomes official", desc: "The constitution names it alongside Arabic. Tifinagh goes on the road signs.", year: 2011, href: "/stories/amazigh-identity-map" },
  { date: "2018", title: "Al Boraq", desc: "The first high-speed line in Africa. Tangier to Casablanca at 320.", year: 2018, href: "/stories/tgv-rail-network" },
  { date: "2023", title: "Yennayer", desc: "The Amazigh new year becomes a paid national holiday by royal decree.", year: 2023, href: "/stories/yennayer-amazigh-new-year" },
  { date: "2030", title: "The World Cup", desc: "Co-hosted with Spain and Portugal. The target is 26 million visitors.", year: 2030, href: "/stories/world-cup-2030" }
];

const RED = "#E3120B";
const HINGE_AFTER_YEAR = -5000;

export default function MoroccoTimeline() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("tl-in");
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const pct = Math.round((active / (ERAS.length - 1)) * 100);

  const EraBlock = ({ e, i, isActive }: { e: Era; i: number; isActive: boolean }) => (
    <>
      <span
        className="absolute rounded-full transition-all duration-300"
        style={{
          left: "0px", top: "2.9rem",
          width: isActive ? "11px" : "7px", height: isActive ? "11px" : "7px",
          background: isActive ? RED : "#0a0a0a", opacity: isActive ? 1 : 0.4,
          transform: "translateX(-1px)",
        }}
        aria-hidden
      />
      <div className="text-sm md:text-base tracking-[0.02em] mb-1 transition-colors duration-300"
           style={{ color: isActive ? RED : "rgba(10,10,10,0.5)" }}>
        {e.date}
      </div>
      <h2 className="font-serif text-2xl md:text-4xl font-light tracking-[-0.015em] leading-[1.08] mb-2 inline-flex items-start gap-2">
        <span className={e.href ? "tl-link-title" : ""}>{e.title}</span>
        {e.href && (
          <span className="tl-arrow text-lg md:text-xl mt-1 transition-all duration-300" style={{ color: RED }}>
            →
          </span>
        )}
      </h2>
      <p className="text-sm md:text-base leading-relaxed max-w-xl text-[#0a0a0a]/70">{e.desc}</p>
    </>
  );

  return (
    <section className="relative w-full bg-white text-[#0a0a0a]">
      <div className="hidden md:block fixed top-0 right-0 h-full w-px bg-[#0a0a0a]/10 z-10">
        <div className="absolute right-0 w-px bg-[#0a0a0a]/40 transition-all duration-500" style={{ top: 0, height: `${pct}%` }} />
        <div className="absolute right-0 w-[7px] h-[7px] -translate-x-[3px] transition-all duration-500"
             style={{ top: `calc(${pct}% - 3px)`, background: RED }} />
      </div>

      <div className="mx-auto max-w-3xl px-6 md:px-10 pt-24 pb-20 md:pt-36 md:pb-28">
        <div className="flex items-center gap-3 mb-8">
          <span className="h-px w-10 bg-[#0a0a0a]/30" />
          <span className="text-[11px] tracking-[0.24em] uppercase text-[#0a0a0a]/50">Morocco, on one line</span>
        </div>
        <h1 className="font-serif text-4xl md:text-6xl font-light tracking-[-0.02em] leading-[1.02]">
          Most countries begin their timeline with a founding.
          <br />
          <span style={{ color: RED }}>This one begins with a skull.</span>
        </h1>
        <p className="mt-8 md:mt-10 max-w-xl text-base md:text-lg leading-relaxed text-[#0a0a0a]/70">
          The oldest <em>Homo sapiens</em> ever found is Moroccan — by about a hundred thousand
          years, dug out of a mine ninety kilometres from Marrakech. Three hundred thousand years
          later, a World Cup. Three hundred thousand years, on one scrolling line.
        </p>
        <div className="mt-12 flex items-baseline gap-4 text-[11px] tracking-[0.16em] uppercase text-[#0a0a0a]/45">
          <span>315,000 BCE</span><span className="flex-1 h-px bg-[#0a0a0a]/15" /><span>2030 CE</span>
        </div>
        <p className="mt-6 text-[12px] text-[#0a0a0a]/45 italic">Tap any moment marked with an arrow to read its story.</p>
      </div>

      <div className="relative mx-auto max-w-3xl px-6 md:px-10 pb-32">
        <div className="absolute top-0 bottom-0 w-px bg-[#0a0a0a]/15" style={{ left: "calc(1.5rem + 3px)" }} aria-hidden />

        {ERAS.map((e, i) => {
          const isActive = i === active;
          return (
            <div key={e.title}>
              {e.href ? (
                <Link
                  href={e.href}
                  ref={(el) => { itemRefs.current[i] = el as unknown as HTMLDivElement; }}
                  data-idx={i}
                  className="tl-item tl-linked group relative block pl-10 md:pl-14 py-9 md:py-12 no-underline"
                >
                  <EraBlock e={e} i={i} isActive={isActive} />
                </Link>
              ) : (
                <div
                  ref={(el) => { itemRefs.current[i] = el; }}
                  data-idx={i}
                  className="tl-item relative pl-10 md:pl-14 py-9 md:py-12"
                >
                  <EraBlock e={e} i={i} isActive={isActive} />
                </div>
              )}

              {e.year === HINGE_AFTER_YEAR && (
                <div className="relative pl-10 md:pl-14 py-7">
                  <div className="border-l pl-4 py-1 max-w-md" style={{ borderColor: RED }}>
                    <div className="text-[11px] tracking-[0.1em] uppercase leading-relaxed text-[#0a0a0a]/55">
                      Scale break. Above, the line is logarithmic — three hundred thousand years.
                      Below, a few centuries per screen.
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div className="pl-10 md:pl-14 pt-16 max-w-xl">
          <span className="block h-px w-16 mb-6" style={{ background: RED }} />
          <p className="font-serif text-xl md:text-3xl font-light tracking-[-0.015em] leading-tight">
            From Idris I in 788 to now: an unbroken twelve hundred years of Moroccan dynasties.
          </p>
          <p className="mt-4 text-base md:text-lg text-[#0a0a0a]/70 leading-relaxed">
            Most timelines begin with a founding. This one began with a skull, and has not stopped since.
          </p>
        </div>
      </div>

      <style>{`
        .tl-item { opacity: 0; transform: translateY(20px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .tl-item.tl-in { opacity: 1; transform: translateY(0); }
        .tl-arrow { opacity: 0; transform: translateX(-4px); }
        .tl-linked:hover .tl-arrow { opacity: 1; transform: translateX(0); }
        .tl-linked:hover .tl-link-title { text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 4px; text-decoration-color: ${RED}; }
        @media (prefers-reduced-motion: reduce) {
          .tl-item { opacity: 1; transform: none; transition: none; }
        }
      `}</style>
    </section>
  );
}
