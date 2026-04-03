import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Desert Camp in Morocco: Erg Chebbi vs Erg Chigaga",
  description: "Two major desert camp areas in Morocco — Erg Chebbi near Merzouga and Erg Chigaga near M'Hamid. What each offers, how to get there, and what a night in the Sahara actually involves.",
  alternates: { canonical: "https://www.slowmorocco.com/morocco/desert-camp" },
};

export default function DesertCampGuidePage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="px-6 md:px-14 pt-20 pb-12 border-b border-foreground/[0.08]">
        <Link href="/morocco" className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors mb-8 block">← Morocco</Link>
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Experiences</p>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.1] mb-6 max-w-2xl">Desert Camp in Morocco</h1>
        <p className="text-base text-foreground/55 leading-relaxed max-w-xl">Morocco has two major erg fields where sand dunes are large enough to warrant an overnight camp. They are different experiences and require different journeys to reach.</p>
      </div>
      <div className="px-6 md:px-14 py-16 max-w-3xl space-y-12">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-6">The two options</p>
          <div className="grid md:grid-cols-2 gap-px bg-foreground/[0.06]">
            {[
              {
                name: "Erg Chebbi — Merzouga",
                distance: "550km from Marrakech · 9 hours",
                desc: "The more visited of the two. Dunes rise to 150 metres. The village of Merzouga sits at the edge of the erg — camps are a 20-minute camel or 4x4 ride from the village. Accessible, well-organised, and still genuinely dramatic. The sunrise from the top of a dune in still air is disorienting in the best sense. High season (October–April) means more camps occupied, but the erg is large enough to find solitude with the right camp.",
                best: "First-time desert visitors. Better road access. More camp variety.",
              },
              {
                name: "Erg Chigaga — M'Hamid",
                distance: "600km from Marrakech · 10+ hours",
                desc: "Further, more remote, and quieter. The erg is larger than Chebbi — over 40 kilometres wide — and requires a 4x4 or camel trek of 2–3 hours from M'Hamid to reach the central dunes. Fewer camps means more space. The road to M'Hamid ends at the town — past that is piste (unpaved track). The Draa Valley runs alongside the road from Ouarzazate, which is worth the journey regardless of the destination.",
                best: "Repeat visitors wanting more remoteness. Those combining with the Draa Valley route.",
              },
            ].map((item) => (
              <div key={item.name} className="bg-background p-8">
                <h2 className="font-serif text-xl text-foreground mb-1">{item.name}</h2>
                <p className="text-[11px] text-foreground/35 tracking-wide mb-4">{item.distance}</p>
                <p className="text-sm text-foreground/60 leading-relaxed mb-4">{item.desc}</p>
                <p className="text-[11px] text-foreground/40"><span className="text-foreground/60 font-medium">Best for:</span> {item.best}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">What to expect in camp</p>
          <div className="space-y-3">
            {[
              { point: "Accommodation", desc: "Camps range from basic Berber tents to luxury glamping with private bathrooms and electricity. The basic camps are more atmospheric. Decide what matters: comfort or immersion. Most camps are somewhere in between — a proper bed, running water, and no phone signal." },
              { point: "The camel ride", desc: "The classic approach is a 45-minute camel ride at sunset to the camp. It is slower and more meditative than a 4x4. Camels are also harder on the lower back than expected. The 4x4 gets you there faster and leaves more time in the dunes." },
              { point: "Night in the desert", desc: "The silence is the thing people don't anticipate. Not quiet — silent. The stars are extraordinary on a clear night away from the village lights. The cold is real: even in autumn, temperatures drop to 5–10°C after midnight. Bring a layer you didn't think you'd need." },
              { point: "Sunrise", desc: "Wake before dawn. Climb the nearest dune. The light moves across the sand in a way that has no equivalent — a shadow line travelling at walking pace. This is why people come." },
            ].map((item) => (
              <div key={item.point} className="border border-foreground/[0.08] p-5">
                <p className="text-sm font-medium text-foreground mb-2">{item.point}</p>
                <p className="text-sm text-foreground/58 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">When to go</p>
          <p className="text-sm text-foreground/65 leading-relaxed">October to April. July and August in the Sahara reach 45°C and are dangerous for sustained outdoor activity. March and October are the peak months — mild, clear, good light. December and January have cold nights but perfect days.</p>
        </div>
        <div className="flex flex-wrap gap-4 pt-4 border-t border-foreground/[0.08]">
          <Link href="/sahara-tour-from-marrakech" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">3-day Sahara tour →</Link>
          <Link href="/stories/not-all-desert-is-sand" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Read: Not all desert is sand →</Link>
          <Link href="/merzouga" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Merzouga destination guide →</Link>
        </div>
      </div>
    </div>
  );
}
