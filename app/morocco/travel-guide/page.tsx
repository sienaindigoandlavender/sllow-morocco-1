import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Morocco Travel Guide: Visa, Money, Transport & Practical Information",
  description: "Everything you need to plan a trip to Morocco. Visa requirements, currency, getting around, what to wear, language, health, and how the country actually works.",
  alternates: { canonical: "https://www.slowmorocco.com/morocco/travel-guide" },
  openGraph: {
    title: "Morocco Travel Guide: Practical Planning",
    description: "Visa, currency, transport, language, health, what to wear. Everything you need before you arrive — written from experience living in Morocco.",
    url: "https://www.slowmorocco.com/morocco/travel-guide",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do I need a visa to visit Morocco?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Citizens of the US, UK, EU, Canada, Australia, and most Western countries do not need a visa for stays under 90 days. You receive a stamp on arrival. Your passport must be valid for at least 6 months beyond your entry date. Check current requirements before travel — rules change."
      }
    },
    {
      "@type": "Question",
      "name": "What currency does Morocco use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Morocco uses the Moroccan dirham (MAD). The dirham is a closed currency — it cannot be taken out of Morocco or purchased abroad in significant quantities. Exchange at the airport, banks, or ATMs on arrival. As of 2026, approximately 1 EUR = 11 MAD, 1 USD = 10 MAD."
      }
    },
    {
      "@type": "Question",
      "name": "How do you get around Morocco?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Train is the best option between major cities — Casablanca, Rabat, Fes, Marrakech, Tangier. The ONCF network is reliable and affordable. CTM buses cover routes the train doesn't. Between cities not on the train network, private transfers or rental car are the main options. Petit taxis within cities use meters."
      }
    },
    {
      "@type": "Question",
      "name": "What language is spoken in Morocco?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Everyday language is Darija (Moroccan Arabic), which is distinct from Modern Standard Arabic. Tamazight (Amazigh/Berber) is spoken widely in rural areas and the mountains. French is used in business, signage, and by most educated Moroccans. Spanish is common in the north. English is spoken in tourist areas."
      }
    }
  ]
};

const SECTIONS = [
  {
    title: "Visa and entry",
    content: `Citizens of the US, UK, EU, Canada, Australia, New Zealand, and most Western countries do not need a visa for stays under 90 days. You receive a stamp on arrival. Your passport must be valid for at least 6 months beyond your entry date.

A few things immigration will ask: where you are staying (have a hotel address ready), how long you are visiting, sometimes to see your onward ticket. Having these prepared makes entry faster.

Check current requirements before travel — rules change and some nationalities require visas that others do not.`
  },
  {
    title: "Money",
    content: `Morocco uses the dirham (MAD). The dirham is a closed currency — you cannot buy dirhams abroad or take significant quantities out of Morocco. Exchange on arrival at the airport, at banks (BCP, Attijariwafa, BMCE), or at ATMs.

ATMs are reliable in cities and most towns. Carry cash for the medinas — many small vendors and traditional restaurants do not take cards. Large riads and restaurants accept cards; small ones often do not.

As of 2026: approximately 1 EUR = 11 MAD, 1 USD = 10 MAD, 1 GBP = 13 MAD.

Tipping: expected but not mandatory. For restaurants, 10% is appropriate. For guides, 50–100 MAD per day per person is standard. Drivers, porters, and hammam attendants all expect tips — 20–50 MAD is reasonable.`
  },
  {
    title: "Getting around",
    content: `Train (ONCF) is the best option between major cities. The network connects Casablanca, Rabat, Fes, Marrakech, Tangier, Meknes, and Oujda. First class is comfortable and affordable — Marrakech to Fes is around €25 first class, 8 hours. Book at oncf.ma or at the station.

CTM buses cover routes the train doesn't — Essaouira, Ouarzazate, Chefchaouen, Agadir. Reliable and used by Moroccans. Book online or at the terminal.

Petit taxis (small, colored by city) operate within cities on meters. Insist the meter is on. Grand taxis (larger, shared) run fixed routes between towns — you pay per seat or hire the whole vehicle.

Rental cars: driving in Morocco is manageable once you understand that lane markings are suggestions. The road between Marrakech and Ouarzazate (Tizi n'Tichka pass) is spectacular and worth driving. City driving, particularly in Casablanca, is best avoided.`
  },
  {
    title: "Language",
    content: `Everyday language is Darija (Moroccan Arabic), which sounds quite different from the Arabic spoken in the Middle East. It is a mix of Arabic, Amazigh, French, and Spanish — if you speak some Arabic, you will recognize pieces but not follow conversations.

French is the practical second language. Almost all educated Moroccans speak it. Menus, road signs, and official documents are in Arabic and French. If you speak French, Morocco is easy to navigate.

Tamazight (Amazigh) is an official language spoken widely in rural areas, the Atlas, the Rif, and the south.

In the north — Tangier, Tetouan, Chefchaouen — Spanish is common. In tourist areas of Marrakech, Fes, and Essaouira, English is widely spoken.

A few words of Darija go a long way. Shukran (thank you), labas (how are you / fine), bslama (goodbye). The Darija dictionary on this site has 10,000+ entries if you want to go further.`
  },
  {
    title: "What to wear",
    content: `Morocco is a Muslim country. Modest dress is appropriate everywhere — shoulders and knees covered for both men and women. In tourist areas of Marrakech this is less enforced, but it remains a matter of respect.

In the medinas, loose comfortable clothes in neutral colors attract less attention than bright or revealing clothing. In rural areas and smaller towns, modesty is more important.

For women: loose trousers or long skirts, tops that cover the shoulders. Scarves are useful — to cover shoulders, as shade, in hammams, in mosques (where women are sometimes permitted).

For the desert: layers are essential. Desert days are very hot; desert nights, even in summer, can be cold.

For the Atlas: trekking clothes appropriate to the season. In winter the mountains are genuinely cold.`
  },
  {
    title: "Health",
    content: `Tap water is not safe to drink in most of Morocco. Bottled water is widely available and cheap. A filtered water bottle reduces plastic waste significantly.

No vaccinations are mandatory for most nationalities, but standard travel vaccinations are recommended: hepatitis A and B, typhoid. Check with your doctor before travel.

Pharmacies (pharmacies) are common in all cities and well-stocked. Many medications available by prescription elsewhere are sold over the counter in Morocco. Pharmacists speak French.

Morocco's public health system is limited. Private hospitals in Casablanca and Marrakech are adequate for most situations. Travel insurance with medical evacuation coverage is recommended for trips beyond the cities.

Sunscreen, rehydration salts, and any prescription medications you need should be brought from home.`
  },
  {
    title: "Connectivity",
    content: `Morocco has good mobile coverage in cities and on main highways. Coverage in the mountains and deep desert is limited.

SIM cards from Maroc Telecom, Orange, or Inwi are available at the airport and in any phone shop. A local SIM with a data plan is significantly cheaper than roaming. Bring an unlocked phone.

WiFi is available in most riads, hotels, and cafés. Speed varies. For navigation in medinas, download offline maps before arrival — Google Maps has good coverage but requires data; Maps.me works offline.`
  },
];

export default function MoroccoTravelGuidePage() {
  return (
    <>
      <Script id="travel-guide-jsonld" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-background min-h-screen">

        <div className="px-6 md:px-14 pt-20 pb-12 border-b border-foreground/[0.08]">
          <Link href="/morocco" className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors mb-8 block">
            ← Morocco
          </Link>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Planning</p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.1] mb-6 max-w-2xl">
            Morocco Travel Guide
          </h1>
          <p className="text-base text-foreground/55 leading-relaxed max-w-xl">
            Visa, money, transport, language, health. Everything practical before you arrive.
          </p>
        </div>

        <div className="px-6 md:px-14 py-16 max-w-3xl">
          <div className="space-y-px">
            {SECTIONS.map((section) => (
              <div key={section.title} className="border border-foreground/[0.08] p-8">
                <h2 className="font-serif text-xl text-foreground mb-5 capitalize">{section.title}</h2>
                <div className="space-y-3">
                  {section.content.split('\n\n').filter(p => p.trim()).map((para, i) => (
                    <p key={i} className="text-sm text-foreground/60 leading-relaxed">{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 md:px-14 py-12 border-t border-foreground/[0.08]">
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-6">Continue planning</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/morocco/best-time-to-visit" className="text-sm text-foreground/50 hover:text-foreground transition-colors border-b border-foreground/15 hover:border-foreground/40 pb-0.5">Best time to visit →</Link>
            <Link href="/morocco/is-morocco-safe" className="text-sm text-foreground/50 hover:text-foreground transition-colors border-b border-foreground/15 hover:border-foreground/40 pb-0.5">Is Morocco safe? →</Link>
            <Link href="/morocco/things-to-do-in-marrakech" className="text-sm text-foreground/50 hover:text-foreground transition-colors border-b border-foreground/15 hover:border-foreground/40 pb-0.5">Things to do in Marrakech →</Link>
            <Link href="/darija" className="text-sm text-foreground/50 hover:text-foreground transition-colors border-b border-foreground/15 hover:border-foreground/40 pb-0.5">Darija dictionary →</Link>
            <Link href="/start-here" className="text-sm text-foreground/50 hover:text-foreground transition-colors border-b border-foreground/15 hover:border-foreground/40 pb-0.5">Plan your trip →</Link>
          </div>
        </div>

      </div>
    </>
  );
}
