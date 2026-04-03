import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Navigate a Moroccan Souk | Marrakech and Fes",
  description: "The souk is not a maze — it has a logic. Trades are grouped spatially: spice sellers in one quarter, leather workers in another. How to move through it, what to buy, and how to bargain without anxiety.",
  alternates: { canonical: "https://www.slowmorocco.com/morocco/souk-guide" },
};

export default function SoukGuidePage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="px-6 md:px-14 pt-20 pb-12 border-b border-foreground/[0.08]">
        <Link href="/morocco" className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors mb-8 block">← Morocco</Link>
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Experiences</p>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.1] mb-6 max-w-2xl">How to Navigate a Moroccan Souk</h1>
        <p className="text-base text-foreground/55 leading-relaxed max-w-xl">The Marrakech souks cover roughly one square kilometre of narrow streets. The Fes medina has 9,400 of them. Both have an organizing logic that becomes legible once you know what to look for.</p>
      </div>
      <div className="px-6 md:px-14 py-16 max-w-3xl space-y-12">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">The spatial logic</p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">Islamic medinas organize trade by type — a system that has not fundamentally changed since the medieval period. The most prestigious trades (books, textiles) were historically nearest the central mosque. The trades that produce smell, noise, or fire (tanneries, blacksmiths, dyers) were pushed to the periphery.</p>
          <p className="text-sm text-foreground/65 leading-relaxed">In Marrakech: the spice souk (Rahba Kedima) opens off the main artery near Jemaa el-Fna. The carpet souk is above it, behind a gate. The metalworkers are further in, near Bab Debbagh. The leather workers are at the edge of the medina. Navigate by trade, not by street names — most streets have none.</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">On bargaining</p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">Bargaining is expected in the tourist souks — the opening price is rarely the final price. A rough heuristic: offer 40–50% of the first price quoted and negotiate from there. You will not insult anyone. This is the game, both parties know the rules.</p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">Fixed-price shops exist and are marked. Cooperatives and government-run artisan shops (Ensemble Artisanal) have fixed prices — useful as a benchmark before entering the souks.</p>
          <p className="text-sm text-foreground/65 leading-relaxed">Do not bargain for food. Do not enter a shop if you have no intention of buying — the tea invitation is an obligation, not a courtesy. If you are not interested, do not enter.</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">What is worth buying</p>
          <div className="space-y-3">
            {[
              { item: "Argan oil", note: "Buy from a women's cooperative — they control quality and the price is fair. The cooperatives outside Essaouira are the source. What you buy in the Marrakech souks is often diluted." },
              { item: "Spices", note: "Buy loose from a spice seller, not pre-packaged. Ras el hanout is a house blend — ask what is in it. Cumin beldi (wild cumin) is different from supermarket cumin and worth bringing home." },
              { item: "Leather goods", note: "Marrakech leather is mid-quality at tourist prices. For better leather at more honest prices, the artisan cooperatives in Fes and the Ensemble Artisanal in Marrakech are more reliable than souk vendors." },
              { item: "Textiles", note: "Handira wedding blankets from the Middle Atlas. Beni Ouarain rugs from the north. Both are genuine craft objects with a specific origin — ask where a carpet is from and how it was made. If the seller cannot answer specifically, it is machine-made." },
              { item: "Ceramics", note: "Fes blue and white, Safi painted, Tamegroute green-glazed. Each region has a distinct tradition. The cheapest ceramics in tourist shops are often from China — look for the roughness of hand-thrown work and the irregularity of hand-painted decoration." },
            ].map((item) => (
              <div key={item.item} className="border border-foreground/[0.08] p-5">
                <p className="text-sm font-medium text-foreground mb-2">{item.item}</p>
                <p className="text-sm text-foreground/58 leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 pt-4 border-t border-foreground/[0.08]">
          <Link href="/stories/moroccan-souk-guide" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Read: The souk guide →</Link>
          <Link href="/stories/carpet-atlas" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Read: Moroccan carpets →</Link>
        </div>
      </div>
    </div>
  );
}
