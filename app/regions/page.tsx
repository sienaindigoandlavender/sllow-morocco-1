import { Metadata } from "next";
import Link from "next/link";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { getRegions } from "@/lib/supabase";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Regions of Morocco — Slow Morocco",
  description:
    "Morocco in four landscapes: imperial cities and ancient medinas, Atlas peaks and hidden valleys, Atlantic coast, and the Sahara desert.",
  alternates: { canonical: "https://www.slowmorocco.com/regions" },
};

const REGION_INTROS: Record<string, { body: string; claim: string }> = {
  cities: {
    claim: "Four dynasties. Four capitals.",
    body: "Marrakech, Fes, Meknes, Rabat — each built to outshine the last. The imperial cities carry a thousand years of architectural ambition in their medinas and never let you forget it.",
  },
  mountains: {
    claim: "Three ranges. Infinite altitude.",
    body: "The High Atlas, Middle Atlas, and Anti-Atlas run northeast to southwest across the country. Cedar forests, Berber villages, and North Africa's highest peak at 4,167 metres.",
  },
  coastal: {
    claim: "3,500 kilometres of shoreline.",
    body: "Atlantic to the west, Mediterranean to the north. Essaouira's wind, Agadir's beach, Tangier's crossing point. The coast that has been receiving ships for three thousand years.",
  },
  desert: {
    claim: "The Sahara begins here.",
    body: "South of the Atlas, the pre-Saharan plateau gives way to dune fields, kasbahs, and oases strung along ancient caravan routes. The silence is the main event.",
  },
};

export default async function RegionsPage() {
  const regions = await getRegions();

  return (
    <main className="bg-background text-foreground">

      {/* Hero */}
      <section className="px-8 md:px-16 lg:px-20 pt-24 pb-16 border-b border-border">
        <p className="text-[10px] tracking-[0.35em] uppercase font-mono text-foreground/30 mb-4">
          Where to go
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground max-w-3xl">
          Four regions. One country.
        </h1>
      </section>

      {/* Region grid */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {regions.map((region, i) => {
          const intro = REGION_INTROS[region.slug] || { claim: region.subtitle || "", body: region.description || "" };
          return (
            <Link
              key={region.slug}
              href={`/regions/${region.slug}`}
              className="group relative aspect-[4/3] overflow-hidden border-b border-r border-border"
            >
              {region.hero_image && (
                <img
                  src={cloudinaryUrl(region.hero_image)}
                  alt={region.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <p className="text-[9px] tracking-[0.3em] uppercase font-mono text-white/40 mb-2">
                  {region.subtitle}
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-white mb-3">
                  {region.title}
                </h2>
                <p className="text-sm text-white/60 leading-relaxed max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {intro.body}
                </p>
                <p className="text-[10px] tracking-[0.2em] uppercase font-mono text-white/30 mt-4">
                  Explore →
                </p>
              </div>
            </Link>
          );
        })}
      </section>

      {/* Bridge to Morocco page */}
      <section className="px-8 md:px-16 lg:px-20 py-16 border-t border-border">
        <div className="flex items-center justify-between">
          <p className="text-sm text-foreground/40 max-w-md">
            Looking for the full country overview — cities, visa, when to go?
          </p>
          <Link
            href="/morocco"
            className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/40 hover:text-foreground transition-colors"
          >
            Morocco overview →
          </Link>
        </div>
      </section>

    </main>
  );
}
