"use client";

import Link from "next/link";

/**
 * The six ways to read the country — themed doorways into the archive, replacing
 * the old fixed row of stories. Calm, generous, no comparison. Each opens onto its
 * category. The blurbs describe what is there, never what others miss.
 */

const THEMES = [
  { slug: "food", label: "Food", blurb: "Couscous rolled by hand, saffron by the gram, five hundred years of Andalusia in a tagine." },
  { slug: "architecture", label: "Architecture", blurb: "Zellige, pisé, cedar and stucco — how to read a Moroccan building from the street inward." },
  { slug: "history", label: "History", blurb: "A thousand years of dynasties that came from the margins and rode into the centre." },
  { slug: "culture", label: "Culture", blurb: "Gnawa nights, the hammam, the wedding that lasts a week — the practices that hold a society together." },
  { slug: "nature", label: "Nature", blurb: "Atlas cedar, Saharan dune, Atlantic coast, and the wolf the shepherds always knew was a wolf." },
  { slug: "design", label: "Design", blurb: "The moucharabieh, the courtyard, the souk — design as an answer to heat, privacy and community." },
];

export default function ThemesBanner() {
  return (
    <section className="px-6 md:px-10 lg:px-14 py-20 md:py-28 border-t border-[#0a0a0a]/[0.08]">
      <div className="max-w-2xl mb-12 md:mb-20">
        <div className="flex items-center gap-3 mb-5">
          <span className="h-px w-10 bg-[#0a0a0a]/30" />
          <span className="text-[11px] tracking-[0.24em] uppercase text-[#0a0a0a]/50">
            Read the country
          </span>
        </div>
        <h2 className="font-serif text-[clamp(1.6rem,3.4vw,2.6rem)] font-light tracking-[-0.015em] text-[#0a0a0a] leading-[1.2]">
          Six ways in. Follow whichever pulls you.
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 md:gap-y-20">
        {THEMES.map((t, i) => (
          <Link key={t.slug} href={`/stories/category/${t.slug}`} className="group block">
            <span className="text-[clamp(2rem,4vw,3rem)] font-light text-[#0a0a0a]/15 tracking-[-0.02em] leading-none block mb-4 tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-light tracking-[-0.015em] text-[#0a0a0a] mb-3 group-hover:text-[#0a0a0a]/55 transition-colors">
              {t.label}
            </h3>
            <p className="text-[14px] md:text-[15px] text-[#0a0a0a]/60 leading-relaxed max-w-xs">
              {t.blurb}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
