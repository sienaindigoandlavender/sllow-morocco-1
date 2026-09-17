"use client";

import Link from "next/link";

/**
 * The six ways to read the country — themed doorways into the archive. Each card
 * carries a defining image (portrait, matching the Kinfolk tiles), a numbered
 * index, and a quiet sensory blurb. No comparison, no bravado — only what is here.
 */

const THEMES = [
  { slug: "food", label: "Food", image: "https://res.cloudinary.com/do2ojyohc/image/upload/v1789649120/tagine_erzdsr.png", blurb: "Couscous rolled by hand, saffron by the gram, five hundred years of Andalusia in a tagine." },
  { slug: "architecture", label: "Architecture", image: "https://res.cloudinary.com/do2ojyohc/image/upload/v1789649247/architecture_dgzb7p.png", blurb: "Zellige, pisé, cedar and stucco — how to read a Moroccan building from the street inward." },
  { slug: "history", label: "History", image: "https://res.cloudinary.com/do2ojyohc/image/upload/v1789649344/history_gvgo0a.png", blurb: "A thousand years of dynasties that came from the margins and rode into the centre." },
  { slug: "culture", label: "Culture", image: "https://res.cloudinary.com/do2ojyohc/image/upload/v1789649413/music_bynnkp.png", blurb: "Gnawa nights, the hammam, the wedding that lasts a week — the practices that hold a society together." },
  { slug: "nature", label: "Nature", image: "https://res.cloudinary.com/do2ojyohc/image/upload/v1789649472/wolf_iolckf.png", blurb: "Atlas cedar, Saharan dune, Atlantic coast, and the wolf the shepherds always knew was a wolf." },
  { slug: "design", label: "Design", image: "https://res.cloudinary.com/do2ojyohc/image/upload/v1789649518/design_bdwhre.png", blurb: "The moucharabieh, the courtyard, the souk — design as an answer to heat, privacy and community." },
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
          The country keeps its meaning in six rooms.
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16">
        {THEMES.map((t, i) => (
          <Link key={t.slug} href={`/stories/category/${t.slug}`} className="group block min-w-0">
            <div className="aspect-[3/4] relative overflow-hidden bg-[#f0eeeb] mb-5">
              <img
                src={t.image}
                alt={t.label}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 text-white text-[clamp(1.5rem,3vw,2.25rem)] font-light tracking-[-0.02em] leading-none mix-blend-difference tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-light tracking-[-0.015em] text-[#0a0a0a] mb-2 group-hover:text-[#0a0a0a]/55 transition-colors">
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
