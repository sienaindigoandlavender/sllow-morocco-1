import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The French Protectorate in Morocco (1912-1956): What It Means for Visitors",
  description: "44 years of French rule left visible marks on every Moroccan city — the Ville Nouvelle, the road network, the legal system, the language. Understanding the protectorate explains modern Morocco.",
  alternates: { canonical: "https://www.slowmorocco.com/morocco/french-protectorate" },
};

export default function FrenchProtectoratePage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="px-6 md:px-14 pt-20 pb-12 border-b border-foreground/[0.08]">
        <Link href="/morocco" className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors mb-8 block">← Morocco</Link>
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Cultural context</p>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.1] mb-6 max-w-2xl">The French Protectorate in Morocco</h1>
        <p className="text-base text-foreground/55 leading-relaxed max-w-xl">From 1912 to 1956, France controlled Morocco without formally colonizing it. The legal distinction — a protectorate, not a colony — changed how France governed and left a different kind of mark than Algeria received.</p>
      </div>
      <div className="px-6 md:px-14 py-16 max-w-3xl space-y-12">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">What a protectorate meant</p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">Under the Treaty of Fes (1912), Morocco nominally retained its sultan, its institutions, and its sovereignty. France took control of foreign policy, the military, and economic development. The sultan signed laws; France wrote them. This fiction of sovereignty had practical consequences: Morocco was never officially colonized, the traditional structures (makhzen, ulema, rural qaid networks) remained in place, and Moroccans were not made French subjects.</p>
          <p className="text-sm text-foreground/65 leading-relaxed">The first Resident-General, Hubert Lyautey, was a pragmatist who believed in preserving Moroccan institutions while modernizing infrastructure. His policy of "politique des égards" — respect for existing structures — shaped the protectorate's early years and explains why the medinas were not demolished, as they were in Algeria.</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">What it left — what you can see today</p>
          <div className="space-y-3">
            {[
              { legacy: "The Ville Nouvelle", desc: "Every major Moroccan city has a Ville Nouvelle — the French-built new town adjacent to the medina. Wide boulevards, Art Deco architecture, cafés, French-style administrative buildings. Casablanca's Ville Nouvelle is the largest. Rabat's is the most elegant. The visual contrast with the medina tells the entire story of the protectorate in one glance." },
              { legacy: "The road and rail network", desc: "The entire modern road and rail infrastructure dates from the protectorate — including the route nationale that makes driving Morocco's interior possible. The Tizi n'Tichka road was built by the French. The ONCF rail network was built by the French." },
              { legacy: "The French language", desc: "French remains the language of business, higher education, the legal system, and the elite. Signs are in Arabic and French. Government documents are in Arabic and French. This is not a colonial hangover — it is a functional choice that was made and maintained after independence." },
              { legacy: "The legal system", desc: "Morocco's civil and commercial law derives from French law. The court system, the legal profession, and the administrative state are structured on the French model. Islamic personal status law (marriage, divorce, inheritance) operates in parallel." },
              { legacy: "The exile of Mohammed V", desc: "In 1953, France exiled Sultan Mohammed V to Madagascar — an attempt to break the growing independence movement. It backfired. The sultan became a symbol of resistance and returned in 1955. Independence followed in 1956. The exile is remembered as the turning point." },
            ].map((item) => (
              <div key={item.legacy} className="border border-foreground/[0.08] p-5">
                <p className="text-sm font-medium text-foreground mb-2">{item.legacy}</p>
                <p className="text-sm text-foreground/58 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Morocco vs Algeria</p>
          <p className="text-sm text-foreground/65 leading-relaxed">The contrast with Algeria — colonized (not protected), settled by a million French citizens, its Arabic identity systematically suppressed — explains the difference in post-independence trajectories. Morocco maintained its monarchy, its traditional institutions, and a French-educated elite that chose to remain. Algeria experienced a brutal war of independence, the mass departure of settlers, and decades of instability. The word "protectorate" was a legal fiction, but the fiction had real consequences.</p>
        </div>
        <div className="flex flex-wrap gap-4 pt-4 border-t border-foreground/[0.08]">
          <Link href="/stories/french-protectorate" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Read: The French Protectorate in Morocco →</Link>
          <Link href="/stories/dynasty-timeline" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Read: Moroccan dynasties →</Link>
        </div>
      </div>
    </div>
  );
}
