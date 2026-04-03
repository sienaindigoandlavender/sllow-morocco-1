import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What to Eat in Morocco and Tipping Culture",
  description: "Moroccan food by region — what to order, where to eat it, and what it costs. Plus the tipping expectations that nobody tells you upfront.",
  alternates: { canonical: "https://www.slowmorocco.com/morocco/food-and-tipping" },
};

export default function FoodAndTippingPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="px-6 md:px-14 pt-20 pb-12 border-b border-foreground/[0.08]">
        <Link href="/morocco" className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors mb-8 block">← Morocco</Link>
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Practical</p>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.1] mb-6 max-w-2xl">Food and Tipping in Morocco</h1>
        <p className="text-base text-foreground/55 leading-relaxed max-w-xl">Moroccan cuisine is one of the most complex on the continent — regional, seasonal, and built on a spice logic that takes years to read. What to order and how to pay for it.</p>
      </div>
      <div className="px-6 md:px-14 py-16 max-w-3xl space-y-12">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-6">What to eat</p>
          <div className="space-y-px">
            {[
              { dish: "Tagine", note: "Not a single dish — a cooking vessel. The cone lid creates condensation that bastes the contents. Chicken with preserved lemon and olives is the benchmark. Lamb with prunes and almonds is the Fassi version. Order from somewhere that actually cooks it — not a restaurant that microwaves pre-made tagines for tourists." },
              { dish: "Couscous", note: "Eaten on Fridays as a family meal after the midday prayer. Seven-vegetable couscous (the national version) is served on a communal plate. The grain should be light, separate, steamed three times — not the boiled mush of European supermarkets." },
              { dish: "Harira", note: "The soup that breaks the Ramadan fast — tomato, lentils, chickpeas, flour, lemon, fresh coriander. Available year-round but best during Ramadan when it is made fresh daily for iftar. A bowl with a hard-boiled egg and chebakia (honey-sesame pastry) is the traditional combination." },
              { dish: "Pastilla", note: "Warqa (paper-thin pastry) layered with pigeon (or chicken), almonds, eggs, and spices — then dusted with cinnamon and icing sugar. The sweet-savoury combination is distinctly Moroccan and Andalusian in origin. Order it in Fes, where the tradition is strongest." },
              { dish: "Mechoui", note: "Whole lamb slow-roasted in an underground oven until the meat falls from the bone. Ordered by weight from mechoui stalls — typically in the medinas. In Marrakech, the mechoui stalls near the Bab Khemis and in Djemaa el-Fna are the reference." },
              { dish: "Msemen and baghrir", note: "The breakfast layer — msemen are folded flatbreads cooked on a griddle, eaten with amlou (almond-argan paste) or honey. Baghrir are semolina pancakes full of holes, soaked in butter and honey. Both are made by hand and taste completely different from anything else." },
            ].map((item) => (
              <div key={item.dish} className="border border-foreground/[0.08] p-6">
                <h2 className="font-serif text-lg text-foreground mb-2">{item.dish}</h2>
                <p className="text-sm text-foreground/60 leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Where to eat</p>
          <div className="space-y-4">
            {[
              { place: "Riad restaurants", desc: "Many riads have restaurants serving fixed menus at dinner. The cooking is often the best you will eat — home-style Moroccan food cooked by the riad family or a household cook, not a restaurant kitchen. Book ahead." },
              { place: "Street food in the medina", desc: "The stalls with the most Moroccan customers are the benchmark. Harira from a stall in the medina costs 5–10 MAD. Mechoui by weight. Brochettes (skewers) outside the main squares. The Jemaa el-Fna food stalls are theatrical but not always the best food." },
              { place: "Local restaurants (no menu in French)", desc: "A restaurant with a handwritten menu only in Darija and Arabic, full of Moroccan men at lunch, is almost always better and cheaper than anything near a tourist site. Follow the civil servants and office workers." },
            ].map((item) => (
              <div key={item.place} className="border border-foreground/[0.08] p-5">
                <p className="text-sm font-medium text-foreground mb-2">{item.place}</p>
                <p className="text-sm text-foreground/58 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Tipping</p>
          <div className="space-y-2">
            {[
              { context: "Restaurant (tourist)", amount: "10% — not included by default, often expected" },
              { context: "Restaurant (local)", amount: "Round up or leave 5–10 MAD — not expected but appreciated" },
              { context: "Licensed guide (full day)", amount: "100–150 MAD per person" },
              { context: "Private driver (full day)", amount: "100–200 MAD" },
              { context: "Hammam attendant", amount: "20–50 MAD" },
              { context: "Riad porter / help with bags", amount: "20–30 MAD" },
              { context: "Parking guardian (someone who 'watches' your car)", amount: "5–10 MAD on return — expected, built into the system" },
              { context: "Toilet attendant", amount: "2–5 MAD" },
            ].map((item) => (
              <div key={item.context} className="flex justify-between items-baseline py-3 border-b border-foreground/[0.06] text-sm">
                <span className="text-foreground/65">{item.context}</span>
                <span className="text-foreground/40 text-[11px] text-right ml-4">{item.amount}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 pt-4 border-t border-foreground/[0.08]">
          <Link href="/stories/moroccan-tagine-guide" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Read: The tagine →</Link>
          <Link href="/stories/couscous-friday" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Read: The Friday couscous →</Link>
          <Link href="/morocco/cooking-class" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Cooking classes →</Link>
        </div>
      </div>
    </div>
  );
}
