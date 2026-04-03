import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Time to Visit Morocco | Month by Month Guide",
  description: "When to visit Morocco depends on where you're going. Spring and autumn work everywhere. Summer is perfect on the coast, brutal inland. Winter is ski season in the Atlas and ideal in the south.",
  alternates: { canonical: "https://www.slowmorocco.com/morocco/best-time-to-visit" },
  openGraph: {
    title: "Best Time to Visit Morocco",
    description: "Spring and autumn work everywhere. Summer is perfect on the Atlantic coast, brutal in Fes and Marrakech. Winter closes the mountain passes and opens the desert.",
    url: "https://www.slowmorocco.com/morocco/best-time-to-visit",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the best time to visit Morocco?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "March to May and September to November are ideal for most of Morocco. Mild temperatures, manageable crowds, and good light. Summer works on the Atlantic coast but is very hot inland. Winter is cold in the mountains but excellent in the south and on the coast."
      }
    },
    {
      "@type": "Question",
      "name": "Is Morocco good to visit in summer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Summer in Fes and Marrakech reaches 40–45°C. The medinas are difficult in the heat. The Atlantic coast — Essaouira, Agadir, Dakhla — is kept cool by the trade winds and is excellent in summer. The Sahara in July and August is dangerous."
      }
    },
    {
      "@type": "Question",
      "name": "Can you visit Morocco in winter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Winter in Morocco is regional. The Atlas Mountains receive snow and the Tizi n'Tichka pass sometimes closes. Marrakech and Fes are cold at night but sunny. Agadir, Dakhla and the far south are warm and calm. The Sahara in winter has cold nights but perfect days."
      }
    },
    {
      "@type": "Question",
      "name": "When is Ramadan in Morocco?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ramadan shifts by approximately 11 days each year. In 2026 it falls around late February to late March. During Ramadan many restaurants close during the day, the rhythm of cities changes, and some tourist sites have reduced hours. It is also one of the most atmospheric times to visit."
      }
    }
  ]
};

const MONTHS = [
  {
    month: "January",
    temp: "8–18°C",
    summary: "Cold nights across the country. The Atlas sees snow — Oukaimeden is skiable. Agadir and the south are warm and quiet. Marrakech is pleasant by day. Low season means empty medinas.",
    good: ["Agadir", "Dakhla", "Marrakech (daytime)", "Atlas skiing"],
    avoid: ["High Atlas passes (may close)", "Desert at night (very cold)"],
  },
  {
    month: "February",
    temp: "10–20°C",
    summary: "Almond trees flower in the Draa Valley and around Tafraout. The countryside turns briefly green. Ramadan often falls in February in coming years — check the date. Essaouira's Atlantic coast picks up wind.",
    good: ["Draa Valley (almond blossom)", "Tafraout", "Marrakech", "Fes"],
    avoid: ["High passes (still cold)"],
  },
  {
    month: "March",
    temp: "12–22°C",
    summary: "The best month to start. Wildflowers across the plains south of Marrakech. The Atlas is still snowcapped but passes are open. Crowds have not arrived. Storks return to Marrakech — you'll see them on the minarets.",
    good: ["Everywhere", "Marrakech", "Fes", "Desert routes"],
    avoid: ["Nothing significant"],
  },
  {
    month: "April",
    temp: "15–26°C",
    summary: "Rose harvest in the Dades Valley — the valley around Kelaat M'Gouna turns pink in late April and early May. One of the most specific seasonal experiences in Morocco. Book accommodation early for this.",
    good: ["Dades Valley (rose harvest)", "Marrakech", "Essaouira", "Fes"],
    avoid: ["Nothing significant"],
  },
  {
    month: "May",
    temp: "18–30°C",
    summary: "Getting warm in the cities. Cherry festival in Sefrou (near Fes) in June — worth planning around. Chefchaouen is comfortable. The desert is beginning to heat up but still manageable in the mornings.",
    good: ["Chefchaouen", "Essaouira", "Fes", "Northern Morocco"],
    avoid: ["Merzouga/Sahara (heat building)"],
  },
  {
    month: "June",
    temp: "22–38°C",
    summary: "The Gnawa Music Festival in Essaouira — four days of Gnawa masters, the largest gathering of the tradition. Atlantic winds keep Essaouira cool while Marrakech is already very hot. The Sahara is approaching dangerous temperatures.",
    good: ["Essaouira (Gnawa festival)", "Atlantic coast", "Dakhla (kite season)"],
    avoid: ["Fes and Marrakech (midday)", "Sahara desert"],
  },
  {
    month: "July",
    temp: "25–42°C",
    summary: "Peak summer. Fes and Marrakech are brutal midday — 40°C in the medinas, streets emptied between noon and 4pm. The Atlantic coast is Morocco's beach season. Agadir and Dakhla are full. The Sahara is dangerous.",
    good: ["Agadir", "Essaouira", "Dakhla", "Chefchaouen (north is cooler)"],
    avoid: ["Fes", "Marrakech (midday)", "Any desert route", "Atlas trekking"],
  },
  {
    month: "August",
    temp: "25–42°C",
    summary: "Same as July. Moroccan families take summer holidays — the coast is busy, the cities are quieter than usual as residents leave. The Marrakech Folklore Festival typically falls in August.",
    good: ["Atlantic coast", "Northern Morocco", "Tangier"],
    avoid: ["Sahara", "Inland cities (midday heat)"],
  },
  {
    month: "September",
    temp: "20–34°C",
    summary: "The second best month. Heat eases from mid-September. The date harvest begins in the Draa Valley and Tafilalt. Saffron fields in Taliouine begin their brief flowering — the harvest runs October to November.",
    good: ["Marrakech", "Fes", "Draa Valley (dates)", "Desert routes reopening"],
    avoid: ["Nothing significant"],
  },
  {
    month: "October",
    temp: "16–28°C",
    summary: "Saffron harvest in Taliouine — 150,000 flowers to produce one kilogram, all picked by hand before sunrise. One of the most specific agricultural events in Morocco. The desert is ideal again — warm days, cool nights.",
    good: ["Taliouine (saffron harvest)", "Merzouga/Sahara", "Everywhere"],
    avoid: ["Nothing"],
  },
  {
    month: "November",
    temp: "12–22°C",
    summary: "Quiet season begins. Temperatures drop, particularly at night. Marrakech is pleasant. The Atlas starts to see first snowfall on high peaks. Low season pricing. Some desert camps begin to reduce operations.",
    good: ["Marrakech", "Fes", "Essaouira", "Agadir"],
    avoid: ["High Atlas (cold nights)"],
  },
  {
    month: "December",
    temp: "8–18°C",
    summary: "Quiet and cold, but not unpleasant. Marrakech has clear winter light. The Atlas ski season opens at Oukaimeden. Agadir and the south are warm — a European winter escape. Riads and camps are far below capacity.",
    good: ["Agadir", "Marrakech", "Atlas skiing (Oukaimeden)", "Dakhla"],
    avoid: ["Atlas passes after snowfall", "Erg Chebbi at night (very cold)"],
  },
];

export default function BestTimeToVisitPage() {
  return (
    <>
      <Script id="best-time-jsonld" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-background min-h-screen">

        {/* Header */}
        <div className="px-6 md:px-14 pt-20 pb-12 border-b border-foreground/[0.08]">
          <Link href="/morocco" className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors mb-8 block">
            ← Morocco
          </Link>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Planning</p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.1] mb-6 max-w-2xl">
            Best Time to Visit Morocco
          </h1>
          <p className="text-base text-foreground/55 leading-relaxed max-w-xl">
            Morocco is not one climate. It is five. The answer depends entirely on where you're going — and what you want to find when you get there.
          </p>
        </div>

        {/* The honest overview */}
        <div className="px-6 md:px-14 py-16 max-w-3xl">
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-6">The short answer</p>
          <div className="space-y-6">
            <div className="flex gap-6 border-b border-foreground/[0.06] pb-6">
              <div className="w-32 flex-shrink-0">
                <p className="text-sm font-medium text-foreground">March – May</p>
                <p className="text-[11px] text-foreground/40 mt-1">Best overall</p>
              </div>
              <p className="text-sm text-foreground/65 leading-relaxed">Works everywhere. Wildflowers south of Marrakech in March. Rose harvest in the Dades Valley in late April. Storks on the minarets. The country at its most alive before the heat arrives.</p>
            </div>
            <div className="flex gap-6 border-b border-foreground/[0.06] pb-6">
              <div className="w-32 flex-shrink-0">
                <p className="text-sm font-medium text-foreground">June – August</p>
                <p className="text-[11px] text-foreground/40 mt-1">Coast only</p>
              </div>
              <p className="text-sm text-foreground/65 leading-relaxed">Fes and Marrakech reach 40–45°C. The medinas are difficult. The Atlantic coast — Essaouira, Agadir, Dakhla — is kept cool by the trade winds and is excellent. The Gnawa festival is in Essaouira in June. The Sahara in July and August is dangerous.</p>
            </div>
            <div className="flex gap-6 border-b border-foreground/[0.06] pb-6">
              <div className="w-32 flex-shrink-0">
                <p className="text-sm font-medium text-foreground">Sept – Nov</p>
                <p className="text-[11px] text-foreground/40 mt-1">Best overall</p>
              </div>
              <p className="text-sm text-foreground/65 leading-relaxed">Saffron harvest in Taliouine in October — the valley's entire crop picked by hand before sunrise over three weeks. Date harvest in the Draa Valley. The Sahara is ideal again. The best month is October.</p>
            </div>
            <div className="flex gap-6">
              <div className="w-32 flex-shrink-0">
                <p className="text-sm font-medium text-foreground">Dec – Feb</p>
                <p className="text-[11px] text-foreground/40 mt-1">South and coast</p>
              </div>
              <p className="text-sm text-foreground/65 leading-relaxed">Cold nights in the cities and mountains. Atlas ski season opens at Oukaimeden. Agadir and Dakhla are warm and quiet — a genuine winter escape. Low season means empty medinas and real riad prices.</p>
            </div>
          </div>
        </div>

        {/* Month by month */}
        <div className="px-6 md:px-14 py-16 border-t border-foreground/[0.08]">
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-12">Month by month</p>
          <div className="max-w-3xl space-y-px">
            {MONTHS.map((m) => (
              <div key={m.month} className="border border-foreground/[0.08] p-6">
                <div className="flex items-baseline gap-6 mb-3">
                  <h2 className="font-serif text-lg text-foreground w-28 flex-shrink-0">{m.month}</h2>
                  <span className="text-xs text-foreground/35 tracking-wide">{m.temp}</span>
                </div>
                <p className="text-sm text-foreground/60 leading-relaxed mb-4 pl-0 md:pl-34">{m.summary}</p>
                <div className="flex flex-wrap gap-4 text-[11px]">
                  <div className="flex gap-2 flex-wrap">
                    {m.good.map((g, i) => (
                      <span key={i} className="px-2 py-0.5 bg-foreground/[0.04] text-foreground/50">{g}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ramadan note */}
        <div className="px-6 md:px-14 py-16 border-t border-foreground/[0.08]">
          <div className="max-w-2xl">
            <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">On Ramadan</p>
            <p className="text-sm text-foreground/65 leading-relaxed mb-4">
              Ramadan shifts by approximately 11 days each year. In 2026 it falls around late February to late March. During Ramadan, many restaurants close during the day, alcohol is not served at non-tourist establishments, and the rhythm of the city changes entirely.
            </p>
            <p className="text-sm text-foreground/65 leading-relaxed mb-6">
              It is not a difficult time to visit. It is a different time to visit. The medinas come alive after sunset — the food stalls, the music, the communal breaking of the fast. If you plan around the evening rather than fighting the quiet afternoons, Ramadan is one of the most atmospheric times in Morocco.
            </p>
            <Link href="/stories/ramadan-moon" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 hover:border-foreground/40 pb-0.5 transition-colors">
              Read: Ramadan in Morocco →
            </Link>
          </div>
        </div>

        {/* Related guides */}
        <div className="px-6 md:px-14 py-12 border-t border-foreground/[0.08]">
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-6">Continue planning</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/morocco/travel-guide" className="text-sm text-foreground/50 hover:text-foreground transition-colors border-b border-foreground/15 hover:border-foreground/40 pb-0.5">Morocco travel guide →</Link>
            <Link href="/morocco/is-morocco-safe" className="text-sm text-foreground/50 hover:text-foreground transition-colors border-b border-foreground/15 hover:border-foreground/40 pb-0.5">Is Morocco safe? →</Link>
            <Link href="/start-here" className="text-sm text-foreground/50 hover:text-foreground transition-colors border-b border-foreground/15 hover:border-foreground/40 pb-0.5">Get your orientation →</Link>
          </div>
        </div>

      </div>
    </>
  );
}
