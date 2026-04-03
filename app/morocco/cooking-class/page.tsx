import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Moroccan Cooking Class: What to Know Before You Book",
  description: "A Moroccan cooking class in Marrakech or Fes — what a good one looks like, what you'll learn, and the difference between a market tour with cooking and a kitchen session at a riad.",
  alternates: { canonical: "https://www.slowmorocco.com/morocco/cooking-class" },
};

export default function CookingClassGuidePage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="px-6 md:px-14 pt-20 pb-12 border-b border-foreground/[0.08]">
        <Link href="/morocco" className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors mb-8 block">← Morocco</Link>
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Experiences</p>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.1] mb-6 max-w-2xl">Moroccan Cooking Class</h1>
        <p className="text-base text-foreground/55 leading-relaxed max-w-xl">Moroccan cooking is regional, seasonal, and learned slowly. A cooking class gives you the logic — the layering of spices, the role of preserved lemons, why couscous is steamed three times.</p>
      </div>
      <div className="px-6 md:px-14 py-16 max-w-3xl space-y-12">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">What a good class covers</p>
          <div className="space-y-3">
            {[
              "A souk walk to buy ingredients — learning what ras el hanout actually contains (it varies by maker), how to choose preserved lemons, what distinguishes cumin from cumin beldi",
              "Tagine construction — the layering logic (aromatics first, then protein, then vegetables, then spice), why the cone lid is that shape, how coal versus gas changes the cooking",
              "Couscous technique — the three-steam method, the difference between hand-rolled and machine-rolled, why it should never be boiled",
              "Pastilla or briouats — the sweet-savoury pastry tradition that signals Andalusian influence, the warka (pastry leaf) technique",
              "Harira — the soup that breaks the Ramadan fast, the balance of lemon and tomato and flour",
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-foreground/20 mt-1 flex-shrink-0">—</span>
                <p className="text-sm text-foreground/65 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Two formats</p>
          <div className="grid md:grid-cols-2 gap-px bg-foreground/[0.06]">
            {[
              { type: "Riad kitchen class", desc: "Half-day or full-day in a riad kitchen. You cook, eat what you made, take recipes home. Intimate, unhurried, usually 4–8 people maximum. The cook is often the riad owner or a family member. The most consistent quality." },
              { type: "Market + kitchen", desc: "Starts in the souk, moves to a kitchen. Adds the ingredient-sourcing context — you understand what goes into the food before you make it. Longer, more walking, more interesting for people who want to understand the food system not just the technique." },
            ].map((item) => (
              <div key={item.type} className="bg-background p-6">
                <p className="text-sm font-medium text-foreground mb-3">{item.type}</p>
                <p className="text-sm text-foreground/58 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Booking</p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">Ask your riad first — many run their own cooking sessions or know reliable local teachers. This is preferable to booking through aggregators, where quality varies widely. Expect to pay 400–600 MAD per person for a riad kitchen class, 600–900 MAD for a market-plus-cooking session. Group sizes above 10 people reduce the quality significantly.</p>
          <p className="text-sm text-foreground/65 leading-relaxed">In Fes, the cooking class tradition is deeper — Fassi cuisine is considered the most refined in Morocco, and several families in the medina offer sessions in domestic kitchens rather than purpose-built cooking schools. These are the best ones.</p>
        </div>
        <div className="flex flex-wrap gap-4 pt-4 border-t border-foreground/[0.08]">
          <Link href="/stories/couscous-friday" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Read: The Friday couscous →</Link>
          <Link href="/stories/moroccan-tagine-guide" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Read: The tagine →</Link>
          <Link href="/stories/moroccan-spice-guide" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Read: The spice map →</Link>
        </div>
      </div>
    </div>
  );
}
