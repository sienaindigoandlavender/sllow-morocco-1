import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Morocco 7-Day Itinerary: A First Trip That Actually Works",
  description: "A 7-day Morocco itinerary built around geographic logic, not Instagram. Marrakech to Fes with real travel times, what each place is, and how to sequence it without spending every day in a car.",
  alternates: { canonical: "https://www.slowmorocco.com/morocco/7-day-itinerary" },
  openGraph: {
    title: "Morocco 7-Day Itinerary",
    description: "Marrakech to Fes via the desert, or the imperial cities circuit. Built around real distances and what each place actually gives you.",
    url: "https://www.slowmorocco.com/morocco/7-day-itinerary",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How many days do you need in Morocco?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Seven days is enough for a meaningful first trip covering two or three cities. Ten days allows you to add the desert or the coast without rushing. Two weeks lets you move slowly enough to understand what you're seeing. One week should not include more than three destinations."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best Morocco itinerary for first-timers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Marrakech (3 nights) then Fes (3 nights) is the classic first-trip circuit and works well. Alternatively, Marrakech with a loop through Ouarzazate and the desert covers more landscape. The key is not trying to combine north and south — Marrakech to Fes to Chefchaouen to Tangier in 7 days involves too much travel time."
      }
    },
    {
      "@type": "Question",
      "name": "Should I start my Morocco trip in Marrakech or Fes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most people start in Marrakech because flight connections are better and the city absorbs first-timer shock more gracefully than Fes. Fes medina is larger, more complex, and harder to navigate — starting there is possible but more disorienting. Marrakech first, Fes second is the standard logic and it holds."
      }
    }
  ]
};

const ROUTE_A = [
  {
    day: "Days 1–3",
    place: "Marrakech",
    desc: "Arrive, settle, and spend three days in the medina. Day 1: Jemaa el-Fna and the Koutoubia — get oriented. Day 2: Bahia Palace, Saadian Tombs, Ben Youssef Madrasa — the monuments. Day 3: the souks without a destination — the spice market, the copper quarter, the leather workers near Bab Debbagh. Evening: Jemaa el-Fna after dark.",
  },
  {
    day: "Day 4",
    place: "Marrakech → Ouarzazate",
    desc: "The road south crosses the High Atlas via Tizi n'Tichka (2,260 metres). Stop at Aït Benhaddou — the UNESCO kasbah used in dozens of films. Overnight in Ouarzazate. 3.5 hours driving.",
  },
  {
    day: "Day 5",
    place: "Ouarzazate → Dades Valley",
    desc: "The Dades Gorge is 120 kilometres east of Ouarzazate — a canyon carved by the Dades River with kasbahs built into the cliff faces. The road through the gorge is one of the best drives in Morocco. Overnight in the gorge.",
  },
  {
    day: "Day 6",
    place: "Dades → Fes (or back to Marrakech)",
    desc: "If you have 7 days and want Fes, this is a long day (6 hours via Midelt). Alternatively, return to Marrakech via Ouarzazate — beautiful in reverse. If doing the Sahara properly, add 2 days to reach Merzouga before doubling back.",
  },
  {
    day: "Day 7",
    place: "Fes or Marrakech",
    desc: "Final day in your base city. The Fes medina requires at least two days to begin to understand — one day gives you a surface reading. If returning to Marrakech, use the last day for what you missed: a hammam, the Mellah, the Museum of Photography.",
  },
];

const ROUTE_B = [
  {
    day: "Days 1–2",
    place: "Marrakech",
    desc: "Two focused days: the monuments (Bahia Palace, Saadian Tombs, Ben Youssef Madrasa) and the souks. Evening both nights at Jemaa el-Fna. Two days is enough to establish your bearings.",
  },
  {
    day: "Day 3",
    place: "Marrakech → Fes",
    desc: "Train from Marrakech to Fes — 8 hours, first class around €25. The train goes via Casablanca and Meknes. Arrive in Fes by evening. Alternatively, fly (1 hour, connection through Casablanca). The train is the better experience.",
  },
  {
    day: "Days 4–5",
    place: "Fes",
    desc: "Two full days in Fes el-Bali. Day 4: Al-Qarawiyyin mosque and university, the Chouara tanneries (best viewed from the leather shops above), Bou Inania Madrasa. Day 5: get lost in the Andalusian quarter. The Fes medina is 9,400 streets — the largest intact medieval city in the world. You cannot see it all. Pick a direction and walk.",
  },
  {
    day: "Day 6",
    place: "Fes → Chefchaouen",
    desc: "3.5 hours by bus or private transfer. Chefchaouen requires one night — the blue medina, the Ras el-Ma spring, and the kasbah museum. The blue paint is recent (20th century) and widespread — do not believe it is ancient. The town itself is old; the color is not.",
  },
  {
    day: "Day 7",
    place: "Chefchaouen → Tangier or back",
    desc: "Tangier is 2 hours from Chefchaouen. Fly home from Tangier Ibn Battouta Airport or return to Casablanca (4.5 hours) for international connections. Tangier deserves a separate trip — it is a city with its own logic that rewards time.",
  },
];

export default function SevenDayItineraryPage() {
  return (
    <>
      <Script id="itinerary-jsonld" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-background min-h-screen">

        <div className="px-6 md:px-14 pt-20 pb-12 border-b border-foreground/[0.08]">
          <Link href="/morocco" className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors mb-8 block">
            ← Morocco
          </Link>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Planning</p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.1] mb-6 max-w-2xl">
            Morocco 7-Day Itinerary
          </h1>
          <p className="text-base text-foreground/55 leading-relaxed max-w-xl">
            Seven days is enough for a meaningful first trip. The question is what you're choosing between — and what you're willing to leave for next time.
          </p>
        </div>

        {/* The geographic reality */}
        <div className="px-6 md:px-14 py-16 max-w-3xl">
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-6">Before you plan anything</p>
          <p className="font-serif text-xl text-foreground leading-relaxed mb-6">
            Morocco is larger than it looks on a map. Marrakech to Fes is eight hours by train. Marrakech to the Sahara dunes at Merzouga is nine hours by road.
          </p>
          <p className="text-sm text-foreground/60 leading-relaxed mb-4">
            The most common mistake in a first-week itinerary is trying to combine north and south — Marrakech, the desert, Fes, Chefchaouen, Tangier — in seven days. Each leg is a half-day of travel. You spend the week in cars and trains and see nothing properly.
          </p>
          <p className="text-sm text-foreground/60 leading-relaxed">
            The better approach is to choose one circuit and do it well. Two routes below — one south-focused, one north-focused. Both work in seven days. Neither includes everything.
          </p>
        </div>

        {/* Route A */}
        <div className="px-6 md:px-14 py-16 border-t border-foreground/[0.08]">
          <div className="max-w-3xl">
            <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-2">Route A</p>
            <h2 className="font-serif text-2xl text-foreground mb-2">Marrakech and the South</h2>
            <p className="text-sm text-foreground/45 mb-10">For people drawn to landscape, kasbahs, and the desert threshold. No Sahara dunes in 7 days — but the kasbah road and the Dades Gorge.</p>
            <div className="space-y-px">
              {ROUTE_A.map((item) => (
                <div key={item.day} className="border border-foreground/[0.08] p-6">
                  <div className="flex items-baseline gap-6 mb-3">
                    <span className="text-[10px] tracking-[0.15em] uppercase text-foreground/30 w-20 flex-shrink-0">{item.day}</span>
                    <h3 className="font-serif text-lg text-foreground">{item.place}</h3>
                  </div>
                  <p className="text-sm text-foreground/58 leading-relaxed pl-26">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Route B */}
        <div className="px-6 md:px-14 py-16 border-t border-foreground/[0.08]">
          <div className="max-w-3xl">
            <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-2">Route B</p>
            <h2 className="font-serif text-2xl text-foreground mb-2">The Imperial Cities</h2>
            <p className="text-sm text-foreground/45 mb-10">For people drawn to history, medinas, and Islamic architecture. Marrakech, Fes, Chefchaouen — three distinct cities, three distinct registers.</p>
            <div className="space-y-px">
              {ROUTE_B.map((item) => (
                <div key={item.day} className="border border-foreground/[0.08] p-6">
                  <div className="flex items-baseline gap-6 mb-3">
                    <span className="text-[10px] tracking-[0.15em] uppercase text-foreground/30 w-20 flex-shrink-0">{item.day}</span>
                    <h3 className="font-serif text-lg text-foreground">{item.place}</h3>
                  </div>
                  <p className="text-sm text-foreground/58 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* If you want the Sahara */}
        <div className="px-6 md:px-14 py-16 border-t border-foreground/[0.08]">
          <div className="max-w-2xl">
            <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">If you want the Sahara</p>
            <p className="text-sm text-foreground/60 leading-relaxed mb-4">
              The Erg Chebbi dunes at Merzouga are 550 kilometres from Marrakech. A proper desert trip — Marrakech, Ouarzazate, Draa Valley, Merzouga, return — takes three days minimum and is better as four. Build your week around this as the centerpiece, not as an addition.
            </p>
            <Link href="/sahara-tour-from-marrakech" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground transition-colors border-b border-foreground/15 hover:border-foreground/40 pb-0.5">
              3-day Sahara tour from Marrakech →
            </Link>
          </div>
        </div>

        {/* Build your own */}
        <div className="px-6 md:px-14 py-16 border-t border-foreground/[0.08] bg-foreground/[0.02]">
          <div className="max-w-xl">
            <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Build your own</p>
            <h2 className="font-serif text-2xl text-foreground mb-4">Not sure which route fits?</h2>
            <p className="text-sm text-foreground/50 leading-relaxed mb-8">
              Answer five questions and get an orientation specific to your trip — which cities, what order, what you'll understand when you arrive.
            </p>
            <Link href="/start-here" className="inline-block px-8 py-3 border border-foreground text-sm tracking-[0.15em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors">
              Get my orientation →
            </Link>
          </div>
        </div>

        <div className="px-6 md:px-14 py-12 border-t border-foreground/[0.08]">
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-6">Continue planning</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/morocco/best-time-to-visit" className="text-sm text-foreground/50 hover:text-foreground transition-colors border-b border-foreground/15 hover:border-foreground/40 pb-0.5">Best time to visit →</Link>
            <Link href="/morocco/travel-guide" className="text-sm text-foreground/50 hover:text-foreground transition-colors border-b border-foreground/15 hover:border-foreground/40 pb-0.5">Morocco travel guide →</Link>
            <Link href="/morocco/things-to-do-in-marrakech" className="text-sm text-foreground/50 hover:text-foreground transition-colors border-b border-foreground/15 hover:border-foreground/40 pb-0.5">Things to do in Marrakech →</Link>
            <Link href="/journeys" className="text-sm text-foreground/50 hover:text-foreground transition-colors border-b border-foreground/15 hover:border-foreground/40 pb-0.5">Private journeys →</Link>
          </div>
        </div>

      </div>
    </>
  );
}
