"use client";

import Link from "next/link";

/**
 * Homepage doorway into the full timeline. House serif, black on white; the signal
 * red touches only the key phrase and a single travelling pulse. Taps to /timeline.
 */

const DOTS = [
  { label: "Jbel Irhoud", sub: "315k BCE", pos: 0 },
  { label: "The dynasties", sub: "from 788", pos: 62 },
  { label: "Today", sub: "2030", pos: 100 },
];

export default function TimelineTeaser() {
  return (
    <Link href="/timeline" className="group block no-underline">
      <section className="w-full px-6 md:px-10 lg:px-14 py-16 md:py-24 bg-[#f2f1ef] border-t border-[#0a0a0a]/10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-[#0a0a0a]/30" />
            
          </div>

          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-[-0.02em] leading-[1.05] text-[#0a0a0a] mb-10">
            Most countries begin with a founding.{" "}
            <span style={{ color: "#E3120B" }}>This one begins with a skull.</span>
          </h2>

          <div className="relative h-16 md:h-20">
            <div className="absolute left-0 right-0 top-1/2 h-px bg-[#0a0a0a]/15" />
            <div className="tl-glow absolute top-1/2 h-px w-24 -translate-y-1/2" />
            {DOTS.map((d, i) => (
              <div key={d.label} className="absolute top-1/2 -translate-y-1/2" style={{ left: `${d.pos}%` }}>
                <span className="relative block -translate-x-1/2 rounded-full" style={{ width: 8, height: 8 }}>
                  <span className="tl-ping absolute inset-0 rounded-full" style={{ background: "#E3120B", animationDelay: `${i}s` }} />
                  <span className="absolute inset-0 rounded-full bg-[#0a0a0a]" />
                </span>
                <span className="absolute left-0 -translate-x-1/2 mt-3 whitespace-nowrap text-center">
                  <span className="block text-[11px] md:text-xs text-[#0a0a0a] leading-none">{d.label}</span>
                  <span className="block text-[9px] md:text-[10px] tracking-[0.12em] uppercase text-[#0a0a0a]/45 mt-1">{d.sub}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12 inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-[#0a0a0a]/60 group-hover:text-[#0a0a0a] transition-colors duration-300">
            Walk the 315,000 years
            <span className="transition-transform duration-300 group-hover:translate-x-1" style={{ color: "#E3120B" }}>→</span>
          </div>
        </div>

        <style>{`
          @keyframes tl-travel {
            0% { left: -8%; opacity: 0; } 12% { opacity: 1; } 88% { opacity: 1; } 100% { left: 104%; opacity: 0; }
          }
          .tl-glow { background: linear-gradient(90deg, transparent, rgba(227,18,11,0.6), transparent); animation: tl-travel 9s ease-in-out infinite; }
          @keyframes tl-ping { 0% { transform: scale(1); opacity: 0.5; } 70%,100% { transform: scale(3.5); opacity: 0; } }
          .tl-ping { animation: tl-ping 3.4s cubic-bezier(0,0,0.2,1) infinite; }
          @media (prefers-reduced-motion: reduce) { .tl-glow { display: none; } .tl-ping { animation: none; opacity: 0; } }
        `}</style>
      </section>
    </Link>
  );
}
