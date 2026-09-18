"use client";

import Link from "next/link";

/**
 * Homepage doorway into the festival calendar (the {{calendar}} story).
 * Same register as TimelineTeaser: house serif, black on #f2f1ef, a single
 * signal-red accent and one travelling pulse. Surfaces the current month's
 * headline festival, computed client-side, and taps through to the story.
 */

// Lead festival per month (0 = Jan). Quiet months carry a line instead.
const LEAD: { name: string; where: string }[] = [
  { name: "The quiet months", where: "the country to itself" },
  { name: "The quiet months", where: "the almond about to flower" },
  { name: "Almond Blossom", where: "Tafraout" },
  { name: "Ahwach", where: "Ouarzazate" },
  { name: "The Rose Festival", where: "Kelaat M'Gouna" },
  { name: "Gnaoua", where: "Essaouira" },
  { name: "Arts Populaires", where: "Marrakech" },
  { name: "Moulay Abdellah Amghar", where: "El Jadida" },
  { name: "The Imilchil Marriage Festival", where: "the High Atlas" },
  { name: "The Erfoud Date Festival", where: "the Tafilalet" },
  { name: "Jazzablanca", where: "Casablanca" },
  { name: "The Marrakech Film Festival", where: "Jemaa el-Fna" },
];

export default function FestivalCalendarTeaser() {
  const lead = LEAD[new Date().getMonth()];

  return (
    <Link href="/stories/the-festival-calendar" className="group block no-underline">
      <section className="w-full px-6 md:px-10 lg:px-14 py-16 md:py-24 bg-[#f2f1ef] border-t border-[#0a0a0a]/10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-[#0a0a0a]/30" />
            <span className="text-[10px] tracking-[0.24em] uppercase text-[#0a0a0a]/55">
              The festival year
            </span>
          </div>

          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-[-0.02em] leading-[1.05] text-[#0a0a0a] mb-10">
            Morocco does not have a festival season.{" "}
            <span style={{ color: "#E3120B" }}>It has a festival year.</span>
          </h2>

          {/* This month */}
          <div className="flex items-center gap-3">
            <span className="relative block rounded-full" style={{ width: 8, height: 8 }}>
              <span className="fy-ping absolute inset-0 rounded-full" style={{ background: "#E3120B" }} />
              <span className="absolute inset-0 rounded-full bg-[#0a0a0a]" />
            </span>
            <span className="text-[11px] md:text-xs tracking-[0.12em] uppercase text-[#0a0a0a]/50">
              This month
            </span>
            <span className="h-px flex-1 bg-[#0a0a0a]/15" />
          </div>
          <p className="mt-3 font-serif text-xl md:text-2xl font-light text-[#0a0a0a] leading-snug">
            {lead.name}
            <span className="text-[#0a0a0a]/40">, {lead.where}</span>
          </p>

          <div className="mt-12 inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-[#0a0a0a]/60 group-hover:text-[#0a0a0a] transition-colors duration-300">
            See the whole year
            <span className="transition-transform duration-300 group-hover:translate-x-1" style={{ color: "#E3120B" }}>→</span>
          </div>
        </div>

        <style>{`
          @keyframes fy-ping { 0% { transform: scale(1); opacity: 0.5; } 70%,100% { transform: scale(3.5); opacity: 0; } }
          .fy-ping { animation: fy-ping 3.4s cubic-bezier(0,0,0.2,1) infinite; }
          @media (prefers-reduced-motion: reduce) { .fy-ping { animation: none; opacity: 0; } }
        `}</style>
      </section>
    </Link>
  );
}
