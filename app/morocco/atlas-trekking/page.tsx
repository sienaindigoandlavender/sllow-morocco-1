import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Atlas Mountains Trekking in Morocco: Toubkal and Beyond",
  description: "Trekking in Morocco's High Atlas — from a day hike in the Ourika Valley to the Toubkal summit (4,167m). What routes exist, when to go, and what guides are required.",
  alternates: { canonical: "https://www.slowmorocco.com/morocco/atlas-trekking" },
};

export default function AtlasTrekkingPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="px-6 md:px-14 pt-20 pb-12 border-b border-foreground/[0.08]">
        <Link href="/morocco" className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors mb-8 block">← Morocco</Link>
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Experiences</p>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.1] mb-6 max-w-2xl">Trekking in the Atlas Mountains</h1>
        <p className="text-base text-foreground/55 leading-relaxed max-w-xl">The High Atlas runs 700 kilometres across Morocco. Jebel Toubkal at 4,167 metres is the highest peak in North Africa. Day hikes and multi-day treks depart from villages 90 minutes from Marrakech.</p>
      </div>
      <div className="px-6 md:px-14 py-16 max-w-3xl space-y-12">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-6">Routes by difficulty</p>
          <div className="space-y-px">
            {[
              { route: "Ourika Valley day hike", time: "1 day · Easy", desc: "35km south of Marrakech. The valley road follows the Ourika River through Berber villages to the Setti Fatma waterfalls — a series of seven cascades, the first accessible without climbing. No guide needed. Monday market at Aït Benhaddou further up the valley." },
              { route: "Imlil village walks", time: "1–2 days · Easy to moderate", desc: "Imlil is the trailhead village at 1,700 metres, 90 minutes from Marrakech. Day walks to Aroumd, the Azzadene valley, and the Tizi n'Mzik pass (2,489m) are achievable without summit ambitions. The village itself — mule tracks, terraced fields, walnut orchards — is the experience." },
              { route: "Toubkal summit", time: "2 days · Strenuous", desc: "Day 1: Imlil to Toubkal refuge (3,207m), 5–6 hours. Day 2: Summit push (2–3 hours from the refuge) then descent to Imlil. No technical climbing required outside winter. In summer the route is a steep scree walk. A guide is mandatory — registered with the Bureau des Guides in Imlil." },
              { route: "Toubkal circuit", time: "4–6 days · Moderate to strenuous", desc: "A loop around the Toubkal massif through Ait Bou Guemez and the Azzadene valley. Muleteers carry equipment. Villages provide accommodation in gîtes. The landscape changes from high-altitude scree to terraced farmland to cedar forest. The most complete introduction to the High Atlas." },
              { route: "Ait Bou Guemez (Happy Valley)", time: "3–5 days · Moderate", desc: "A long valley east of Marrakech accessible via Azilal. Less visited than Toubkal, genuinely remote, Amazigh villages that have had less tourist contact. The correct choice for people who want the Atlas without the summit economy of Imlil." },
            ].map((item) => (
              <div key={item.route} className="border border-foreground/[0.08] p-6">
                <div className="flex items-baseline gap-4 mb-3">
                  <h2 className="font-serif text-lg text-foreground">{item.route}</h2>
                  <span className="text-[10px] tracking-wide text-foreground/35 bg-foreground/[0.04] px-2 py-0.5">{item.time}</span>
                </div>
                <p className="text-sm text-foreground/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">When to go</p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">April to June and September to November. The summit is accessible year-round but requires crampons and ice axe from December to April — not a casual addition to a Morocco trip. July and August are hot on the lower trails and crowded at the Toubkal refuge.</p>
          <p className="text-sm text-foreground/65 leading-relaxed">The almond blossom in February and the walnut harvest in October are worth timing a valley walk around.</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Guides</p>
          <p className="text-sm text-foreground/65 leading-relaxed">The Bureau des Guides in Imlil is the registered authority for High Atlas mountain guides. A licensed guide for Toubkal costs approximately 600–800 MAD per day. For multi-day treks, add muleeer costs (350–500 MAD per day per mule). Arrange through the Bureau des Guides rather than through touts in Imlil village.</p>
        </div>
        <div className="flex flex-wrap gap-4 pt-4 border-t border-foreground/[0.08]">
          <Link href="/imlil" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Imlil destination guide →</Link>
          <Link href="/stories/four-peaks-morocco" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Read: The four peaks →</Link>
        </div>
      </div>
    </div>
  );
}
