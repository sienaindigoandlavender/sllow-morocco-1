import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Amazigh People of Morocco: Identity, Language and Culture",
  description: "The Amazigh (Berber) people are the indigenous inhabitants of North Africa. In Morocco, they represent 60-70% of the population. Who they are, what Tamazight is, and where their culture is most alive.",
  alternates: { canonical: "https://www.slowmorocco.com/morocco/amazigh" },
};

export default function AmazighGuidePage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="px-6 md:px-14 pt-20 pb-12 border-b border-foreground/[0.08]">
        <Link href="/morocco" className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors mb-8 block">← Morocco</Link>
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Cultural context</p>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.1] mb-6 max-w-2xl">The Amazigh People</h1>
        <p className="text-base text-foreground/55 leading-relaxed max-w-xl">The Amazigh — called Berber in older literature, a term many now reject — are the indigenous inhabitants of North Africa. They predate the Arab conquest by millennia. In Morocco, they are not a minority.</p>
      </div>
      <div className="px-6 md:px-14 py-16 max-w-3xl space-y-12">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Who they are</p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">Between 60 and 70 percent of Moroccans have Amazigh heritage — in the mountains and rural south, the percentage is higher. The word "Amazigh" means "free person" in Tamazight. The colonial term "Berber" derives from the Greek "barbaros" (foreigner) and is increasingly rejected.</p>
          <p className="text-sm text-foreground/65 leading-relaxed">Three major Amazigh groups exist in Morocco, each with a distinct dialect of Tamazight: Tarifit speakers in the Rif Mountains of the north, Tamazight speakers in the Middle Atlas, and Tashelhit speakers in the High Atlas and Souss Valley south of Marrakech. These dialects are related but not mutually intelligible.</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Tamazight — the language</p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">Tamazight became an official language of Morocco in 2011 — the first country to grant it that status. It is now taught in schools and used on road signs in some regions. The script — Tifinagh — is one of the oldest alphabets in the world, still used by the Tuareg in the Sahara and increasingly revived in Morocco.</p>
          <p className="text-sm text-foreground/65 leading-relaxed">The Amazigh identity movement has grown significantly since the 2000s — a recovery of cultural identity that had been suppressed under post-independence Arabisation policies. The Royal Institute of Amazigh Culture (IRCAM) in Rabat leads the standardization and documentation effort.</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Where to encounter Amazigh culture</p>
          <div className="space-y-3">
            {[
              { place: "Imlil and the High Atlas", desc: "The villages of the Toubkal region are predominantly Tashelhit-speaking. The architecture — flat-roofed earthen houses, communal granaries (agadir), terraced fields — is distinct from Arab urban Morocco. The moussem (seasonal festival) calendar follows agricultural cycles, not Islamic dates." },
              { place: "Ait Bou Guemez (Happy Valley)", desc: "A long valley east of Marrakech where Tamazight-speaking Amazigh communities have had less tourist contact than the Toubkal area. The valley's communal organisation — water rights, seasonal migration, collective grain storage — is Amazigh in origin and still functioning." },
              { place: "Rif Mountains (Chefchaouen, Ketama)", desc: "Tarifit-speaking communities in the north. The Rif has a distinct identity from the rest of Morocco — politically, culturally, and linguistically. The Hirak Rif movement (2016-17) was an assertion of Amazigh identity and regional rights." },
              { place: "Tafraout and the Anti-Atlas", desc: "Tashelhit-speaking Souss Amazigh — the traders and merchants who built commercial networks across Morocco and beyond. The almond trees around Tafraout bloom in February. The painted boulders (L'hermitage des roches bleues) are a contemporary art installation that feels ancient." },
            ].map((item) => (
              <div key={item.place} className="border border-foreground/[0.08] p-5">
                <p className="text-sm font-medium text-foreground mb-2">{item.place}</p>
                <p className="text-sm text-foreground/58 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">In the crafts</p>
          <p className="text-sm text-foreground/65 leading-relaxed">The geometric patterns in Amazigh textiles — carpets, blankets, pottery — are not decorative. They are a writing system. The diamond, the eye, the zigzag carry meanings that vary by region, by weaver, by occasion. A Beni Ouarain carpet from the Middle Atlas and a Glaoua carpet from the High Atlas carry completely different visual languages. This is what distinguishes Amazigh craft from Arab urban craft — one is geometric and rural, the other is arabesque and urban.</p>
        </div>
        <div className="flex flex-wrap gap-4 pt-4 border-t border-foreground/[0.08]">
          <Link href="/stories/amazigh-identity-map" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Read: Amazigh identity map →</Link>
          <Link href="/stories/carpet-atlas" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Read: Moroccan carpets →</Link>
          <Link href="/darija" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Darija dictionary →</Link>
        </div>
      </div>
    </div>
  );
}
