import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Things to Do in Marrakech | Beyond the Tourist Circuit",
  description: "Marrakech beyond Jemaa el-Fna. The Bahia Palace as a story about power. The Saadian Tombs as a story about dynasties. The tanneries as a working city. What to actually see and understand.",
  alternates: { canonical: "https://www.slowmorocco.com/morocco/things-to-do-in-marrakech" },
  openGraph: {
    title: "Things to Do in Marrakech",
    description: "The Bahia Palace, the Saadian Tombs, the souks, the Koutoubia. What each place actually is — and why it was built.",
    url: "https://www.slowmorocco.com/morocco/things-to-do-in-marrakech",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the best things to do in Marrakech?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Bahia Palace, Saadian Tombs, Ben Youssef Madrasa, Jemaa el-Fna, the souks, and the Koutoubia Mosque are the main sites. The Jardin Majorelle is popular but the Bahia Palace offers more cultural depth. Allow at least 3-4 days to move through the medina without rushing."
      }
    },
    {
      "@type": "Question",
      "name": "How many days do you need in Marrakech?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Three to four days is ideal for a first visit. Two days is possible but rushed. One day is a medina walk and Jemaa el-Fna — you will see it but not understand it. Four days allows the souks, the major monuments, a hammam, a cooking class, and time to get lost without anxiety."
      }
    },
    {
      "@type": "Question",
      "name": "Is Jardin Majorelle worth visiting in Marrakech?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Jardin Majorelle is crowded and the garden itself is not large. The Yves Saint Laurent Museum inside is worth seeing for design and fashion context. The Bahia Palace and Ben Youssef Madrasa offer more architectural and historical depth for the same entry fee."
      }
    }
  ]
};

const PLACES = [
  {
    name: "Jemaa el-Fna",
    category: "Square",
    slug: "jemaa-el-fna",
    description: "The square whose name means 'assembly of the dead' — a reference to public executions held here before the French protectorate. Now it is storytellers, snake charmers, juice vendors, and the largest open-air restaurant in the world after sunset. UNESCO declared it a Masterpiece of the Oral and Intangible Heritage of Humanity in 2001 — the first such designation for a public space rather than a building. Come in the afternoon when it is beginning to fill. Come again at 10pm when it is at full volume.",
    link: "/stories/the-assembly-of-the-dead",
    linkText: "Read: The assembly of the dead"
  },
  {
    name: "The Koutoubia Mosque",
    category: "Monument",
    slug: "koutoubia-mosque",
    description: "The minaret that became the template for two other towers in the Almohad empire — the Giralda in Seville and the Hassan Tower in Rabat. Both were built to the same specifications, which is why they look like relatives. The Koutoubia was built twice: the first version was torn down after someone realized the mihrab (prayer niche pointing toward Mecca) was slightly misaligned. Rather than adjust the prayers, they rebuilt the entire mosque. The ruins of the first version are visible to the north of the current building.",
    link: "/stories/the-koutoubia-mistake",
    linkText: "Read: The minaret they built twice"
  },
  {
    name: "Bahia Palace",
    category: "Palace",
    slug: "palais-bahia",
    description: "Grand Vizier Ba Ahmad ibn Musa built this palace in the 1890s with a specific architectural problem to solve: four wives and twenty-four concubines, all of whom required apartments that did not overlook each other's courtyards. The result is eight acres of rooms, gardens, and courtyards arranged so that no woman could see another. The name means 'brilliance' or 'beautiful.' The French took it as their administrative headquarters when they arrived in 1912 — the furniture they removed was never returned.",
    link: "/stories/the-harem-geometry",
    linkText: "Read: The harem problem"
  },
  {
    name: "Saadian Tombs",
    category: "Mausoleum",
    slug: "saadian-tombs",
    description: "The Saadian dynasty built this mausoleum complex in the 16th century for their royal dead. When the Alaouites came to power, Sultan Moulay Ismail — who despised the Saadians — walled up the entrance rather than demolish it (tombs, even of enemies, are sacred). It sat sealed for two centuries until French aerial photography in 1917 revealed what was inside. The zellige tilework and carved plaster are among the finest examples of Moroccan craft from that period. Arrive early — the site is small and fills quickly.",
    link: "/stories/the-saadian-dynasty",
    linkText: "Read: The Saadian legacy"
  },
  {
    name: "Ben Youssef Madrasa",
    category: "Architecture",
    slug: "ben-youssef-madrasa",
    description: "The largest madrasa in North Africa was built in the 14th century, rebuilt by the Saadians in 1564, and housed up to 900 students at its peak. Students slept in the small cells on the upper floors and studied Quranic law in the courtyard below. The ornamentation follows a three-register system: zellige tiles at the base, carved stucco in the middle, and cedarwood lattice screens above. Look at the proportions of the central basin — it is positioned to reflect the carved plaster on the qibla wall opposite.",
    link: "/stories/the-golden-madrasas",
    linkText: "Read: The architecture of the madrasa"
  },
  {
    name: "The Souks",
    category: "Market",
    slug: "marrakech-souks",
    description: "The souks of the Marrakech medina are organized by trade — spice sellers, leather workers, carpet sellers, metalworkers — each in their own quarter, as they have been for centuries. The organization is spatial memory: you find the copper souk by smell, the tanneries by the drying hides on the walls. Go in the morning when it is cooler and the light is better. Get lost deliberately. The medina is approximately one square kilometer — you cannot get so lost that you cannot find your way out within twenty minutes.",
    link: "/stories/moroccan-souk-guide",
    linkText: "Read: How to move through a souk"
  },
  {
    name: "A Hammam",
    category: "Experience",
    slug: null,
    description: "The public hammam is one of the oldest institutions in Moroccan city life — a social space, a hygienic necessity before indoor plumbing, and a weekly ritual. Traditional hammams (as opposed to tourist spa hammams) are cheap, intense, and nothing like a spa. You are scrubbed with a kessa mitt until a layer of skin lifts off. The water is very hot. You leave extraordinarily clean. Ask your riad to recommend a local hammam rather than a tourist one — the experience is different and the price is a fraction.",
    link: "/stories/the-hammam",
    linkText: "Read: Inside the hammam"
  },
  {
    name: "Jardin Majorelle",
    category: "Garden",
    slug: "jardin-majorelle",
    description: "French painter Jacques Majorelle spent forty years creating this garden — a cobalt blue pavilion surrounded by an intentionally overcrowded collection of plants from five continents. Yves Saint Laurent bought it in 1980 to save it from a hotel development. The garden is beautiful but small and very crowded. The Berber Museum inside the pavilion is genuinely interesting. If you visit, go first thing in the morning or in the late afternoon. The Yves Saint Laurent Museum next door has a thoughtful permanent collection.",
    link: "/stories/the-blue-garden",
    linkText: "Read: The painter who invented a blue"
  },
];

export default function ThingsToDoMarrakechPage() {
  return (
    <>
      <Script id="marrakech-jsonld" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-background min-h-screen">

        <div className="px-6 md:px-14 pt-20 pb-12 border-b border-foreground/[0.08]">
          <Link href="/morocco" className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors mb-8 block">
            ← Morocco
          </Link>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Marrakech</p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.1] mb-6 max-w-2xl">
            Things to Do in Marrakech
          </h1>
          <p className="text-base text-foreground/55 leading-relaxed max-w-xl">
            Marrakech is not a list of attractions. It is a medina — a living city organized around trade, faith, and craft. What follows is not what to photograph but what to understand.
          </p>
        </div>

        {/* How long */}
        <div className="px-6 md:px-14 py-16 max-w-3xl">
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-6">How long to allow</p>
          <div className="grid md:grid-cols-3 gap-px bg-foreground/[0.06] mb-12">
            {[
              { days: "2 days", desc: "The medina, Jemaa el-Fna, one palace, one hammam. A surface reading." },
              { days: "3–4 days", desc: "The souks in depth, the major monuments, a day trip to the Atlas or Ourika Valley. You begin to understand the layout." },
              { days: "5–7 days", desc: "You stop navigating and start noticing. The quarter changes character street by street. This is when Marrakech starts to make sense." },
            ].map((item) => (
              <div key={item.days} className="bg-background p-6">
                <p className="font-serif text-lg text-foreground mb-2">{item.days}</p>
                <p className="text-sm text-foreground/55 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Places */}
        <div className="px-6 md:px-14 py-8 border-t border-foreground/[0.08]">
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-12">What to see — and what it is</p>
          <div className="max-w-3xl space-y-px">
            {PLACES.map((place) => (
              <div key={place.name} className="border border-foreground/[0.08] p-8">
                <div className="flex items-baseline gap-4 mb-4">
                  <h2 className="font-serif text-xl text-foreground">{place.name}</h2>
                  <span className="text-[10px] tracking-[0.1em] uppercase text-foreground/30 bg-foreground/[0.04] px-2 py-0.5">{place.category}</span>
                </div>
                <p className="text-sm text-foreground/60 leading-relaxed mb-4">{place.description}</p>
                {place.link && (
                  <div className="flex gap-4">
                    <Link href={place.link} className="text-[11px] tracking-[0.1em] uppercase text-foreground/35 hover:text-foreground transition-colors border-b border-foreground/10 hover:border-foreground/30 pb-0.5">
                      {place.linkText} →
                    </Link>
                    {place.slug && (
                      <Link href={`/places/${place.slug}`} className="text-[11px] tracking-[0.1em] uppercase text-foreground/35 hover:text-foreground transition-colors border-b border-foreground/10 hover:border-foreground/30 pb-0.5">
                        Place details →
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Day trips */}
        <div className="px-6 md:px-14 py-16 border-t border-foreground/[0.08]">
          <div className="max-w-2xl">
            <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Day trips from Marrakech</p>
            <p className="text-sm text-foreground/60 leading-relaxed mb-6">
              The Ourika Valley is 35 kilometres south — the first Atlas villages, Berber markets on Monday, and the Setti Fatma waterfalls. The Ouzoud Falls are 150 kilometres northeast — the largest waterfalls in Morocco, with Barbary macaques in the trees above. Imlil is the trailhead for Mount Toubkal and a village that operates at a completely different pace from the city.
            </p>
            <Link href="/day-trips" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground transition-colors border-b border-foreground/15 hover:border-foreground/40 pb-0.5">
              See all day trips from Marrakech →
            </Link>
          </div>
        </div>

        {/* Related */}
        <div className="px-6 md:px-14 py-12 border-t border-foreground/[0.08]">
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-6">Continue planning</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/morocco/best-time-to-visit" className="text-sm text-foreground/50 hover:text-foreground transition-colors border-b border-foreground/15 hover:border-foreground/40 pb-0.5">Best time to visit →</Link>
            <Link href="/morocco/travel-guide" className="text-sm text-foreground/50 hover:text-foreground transition-colors border-b border-foreground/15 hover:border-foreground/40 pb-0.5">Morocco travel guide →</Link>
            <Link href="/morocco/is-morocco-safe" className="text-sm text-foreground/50 hover:text-foreground transition-colors border-b border-foreground/15 hover:border-foreground/40 pb-0.5">Is Morocco safe? →</Link>
            <Link href="/start-here" className="text-sm text-foreground/50 hover:text-foreground transition-colors border-b border-foreground/15 hover:border-foreground/40 pb-0.5">Get your orientation →</Link>
          </div>
        </div>

      </div>
    </>
  );
}
