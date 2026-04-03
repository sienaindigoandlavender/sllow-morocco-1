import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Surfing in Morocco: Atlantic Coast Guide",
  description: "Morocco's Atlantic coast has consistent swell year-round. Taghazout near Agadir is the established surf hub. Essaouira has wind. Dakhla in the far south is for kite and wing foil. What each offers.",
  alternates: { canonical: "https://www.slowmorocco.com/morocco/surfing" },
};

export default function SurfingGuidePage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="px-6 md:px-14 pt-20 pb-12 border-b border-foreground/[0.08]">
        <Link href="/morocco" className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors mb-8 block">← Morocco</Link>
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Experiences</p>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.1] mb-6 max-w-2xl">Surfing Morocco's Atlantic Coast</h1>
        <p className="text-base text-foreground/55 leading-relaxed max-w-xl">The Atlantic swell runs consistently along Morocco's coast from October to April. The country has been a surf destination since the 1970s — long enough to have developed infrastructure, short enough that quieter spots still exist.</p>
      </div>
      <div className="px-6 md:px-14 py-16 max-w-3xl space-y-12">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-6">Where to go</p>
          <div className="space-y-px">
            {[
              {
                spot: "Taghazout",
                level: "All levels",
                desc: "The established surf hub 20km north of Agadir. Consistent point breaks — Anchor Point, Killer Point, Hash Point — with long, peeling rights that work from October to April. The village has been transformed by surf tourism over 20 years: camps, schools, board rental, yoga retreats. The surf is still excellent. The village character is changing.",
                best: "October to April · Right-handers · All levels at different breaks",
              },
              {
                spot: "Tamraght",
                level: "Beginners to intermediate",
                desc: "Adjacent to Taghazout, smaller scale, more beach break. The surrounding coast has spots for beginners that are less crowded than the main Taghazout lineup. Several surf schools operate here — a reasonable base for a first Morocco surf trip.",
                best: "Year-round · Beach break · Beginners",
              },
              {
                spot: "Essaouira",
                level: "Wind and wave",
                desc: "The Alizé trade winds hit Essaouira with consistent force from May to October. This makes it Morocco's main kitesurfing and windsurfing destination. Ocean surfing is more difficult in the summer wind season — the chop interferes with clean lines. Spring and autumn offer better surfing conditions alongside manageable wind.",
                best: "Windsurf/kite: May–October · Ocean surf: March–May, October–November",
              },
              {
                spot: "Dakhla",
                level: "Kite, wing foil, freestyle",
                desc: "The lagoon at Dakhla is 40km long and protected from ocean swell — flat water in the lagoon, waves on the ocean side. It has become one of the world's top kitesurfing and wing foil destinations. The wind is consistent and thermal. The town is remote — 1,600km south of Casablanca — which keeps crowds lower than you'd expect for the quality.",
                best: "Year-round wind · Lagoon flat water · Advanced kitesurfers and wing foilers",
              },
            ].map((item) => (
              <div key={item.spot} className="border border-foreground/[0.08] p-6">
                <div className="flex items-baseline gap-4 mb-3">
                  <h2 className="font-serif text-xl text-foreground">{item.spot}</h2>
                  <span className="text-[10px] bg-foreground/[0.04] text-foreground/35 px-2 py-0.5 tracking-wide">{item.level}</span>
                </div>
                <p className="text-sm text-foreground/60 leading-relaxed mb-3">{item.desc}</p>
                <p className="text-[11px] text-foreground/35">{item.best}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Season</p>
          <p className="text-sm text-foreground/65 leading-relaxed">October to April for ocean surfing — consistent North Atlantic swells, offshore winds, water temperature around 18–22°C. A summer wetsuit (3/2mm) is adequate. Crowds peak at Christmas and Easter — the shoulder months (October/November and March/April) offer the best combination of swell and space.</p>
        </div>
        <div className="flex flex-wrap gap-4 pt-4 border-t border-foreground/[0.08]">
          <Link href="/taghazout" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Taghazout guide →</Link>
          <Link href="/dakhla" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Dakhla guide →</Link>
          <Link href="/stories/surf-coast-morocco" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Read: The surf coast →</Link>
        </div>
      </div>
    </div>
  );
}
