import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Getting Around Morocco: Trains, Buses, Taxis and Transfers",
  description: "How to get from the airport, how trains work in Morocco, what CTM buses cover, and when a private transfer makes sense. The practical transport layer for a Morocco trip.",
  alternates: { canonical: "https://www.slowmorocco.com/morocco/getting-around" },
};

export default function GettingAroundPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="px-6 md:px-14 pt-20 pb-12 border-b border-foreground/[0.08]">
        <Link href="/morocco" className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors mb-8 block">← Morocco</Link>
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Practical</p>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.1] mb-6 max-w-2xl">Getting Around Morocco</h1>
        <p className="text-base text-foreground/55 leading-relaxed max-w-xl">Morocco has a reliable train network between major cities, a good bus network for everywhere else, and a taxi system that works once you understand the rules.</p>
      </div>
      <div className="px-6 md:px-14 py-16 max-w-3xl space-y-12">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-6">Train (ONCF)</p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-6">Morocco's national rail network connects Casablanca, Rabat, Kenitra, Meknes, Fes, Marrakech, Tangier, and Oujda. The trains are reliable, comfortable in first class, and significantly cheaper than private transfers. The Al Boraq high-speed line runs Tangier to Casablanca in 2 hours 10 minutes.</p>
          <div className="space-y-2 mb-6">
            {[
              { route: "Marrakech → Casablanca", time: "3h", price: "~€12 second class, €18 first" },
              { route: "Casablanca → Fes", time: "4h 30min", price: "~€15 second, €22 first" },
              { route: "Marrakech → Fes", time: "8h (via Casablanca)", price: "~€25 first class" },
              { route: "Tangier → Casablanca (Al Boraq)", time: "2h 10min", price: "~€22" },
              { route: "Casablanca → Rabat", time: "55min", price: "~€5" },
            ].map((item) => (
              <div key={item.route} className="flex justify-between items-baseline py-3 border-b border-foreground/[0.06] text-sm">
                <span className="text-foreground/70">{item.route}</span>
                <span className="text-foreground/40 text-[11px]">{item.time} · {item.price}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-foreground/55 leading-relaxed">Book at oncf.ma or at any train station. First class is worth the extra cost — reserved seats, more space, quieter carriages.</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Buses (CTM and Supratours)</p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">CTM is Morocco's main long-distance bus company — reliable, air-conditioned, and covers destinations the train does not: Essaouira, Agadir, Ouarzazate, Chefchaouen, Dakhla. Supratours (ONCF's bus arm) connects train stations to nearby towns.</p>
          <p className="text-sm text-foreground/65 leading-relaxed">Book online at ctm.ma or at any CTM terminal. Arrive 20 minutes early — buses leave on time. The luggage hold is locked at departure; do not pack medication or valuables in hold luggage.</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Taxis</p>
          <div className="space-y-4">
            {[
              { type: "Petit taxi", desc: "Small colored taxis (red in Marrakech, blue in Rabat, yellow in Fes) for journeys within a city. Metered — insist the meter is on before you move. They do not run between cities. Maximum 3 passengers." },
              { type: "Grand taxi", desc: "Larger shared taxis running fixed routes between cities and towns. You pay per seat — 6 passengers is standard capacity. Faster than buses for short inter-city routes. Negotiate the price per seat before getting in if not metered." },
              { type: "From airports", desc: "Both petit taxis and airport transfer vehicles operate from Moroccan airports. From Marrakech Menara: metered petit taxi to the medina should cost 80–100 MAD (€7–9). Private transfers arranged through your riad are more predictable. Ignore the unofficial drivers inside the terminal." },
            ].map((item) => (
              <div key={item.type} className="border border-foreground/[0.08] p-5">
                <p className="text-sm font-medium text-foreground mb-2">{item.type}</p>
                <p className="text-sm text-foreground/58 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Driving</p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">Renting a car unlocks the south and the mountains — routes the train and bus cannot reach. The Tizi n'Tichka pass, the Dades Gorge road, the coast south of Agadir are all significantly better by private vehicle.</p>
          <p className="text-sm text-foreground/65 leading-relaxed">City driving — particularly Casablanca — is best avoided. Parking in medinas is impossible. For a trip that combines cities and landscape, arrive by train or flight and rent a car for the rural sections only.</p>
        </div>
        <div className="flex flex-wrap gap-4 pt-4 border-t border-foreground/[0.08]">
          <Link href="/morocco/travel-guide" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Morocco travel guide →</Link>
          <Link href="/morocco/7-day-itinerary" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">7-day itinerary →</Link>
        </div>
      </div>
    </div>
  );
}
