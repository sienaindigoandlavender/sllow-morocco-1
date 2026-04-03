import { Metadata } from "next";
import MoroccoTravelContent from "./MoroccoTravelContent";

const BASE_URL = "https://www.slowmorocco.com";

export const metadata: Metadata = {
  title: "Morocco Travel Guide 2026 — Visa, Transport, Money, Health & Packing",
  description:
    "Complete Morocco travel guide. Visa-free for US, UK, EU, Canada, Australia. Currency: dirham (MAD), 1 EUR ≈ 11.1 DH. Train, bus, taxi, rental car routes explained. No vaccinations required. Best months March–May and September–November. Written from experience living in Morocco.",
  keywords: [
    "Morocco travel guide 2026",
    "Morocco visa requirements",
    "do I need a visa for Morocco",
    "Morocco dirham currency",
    "how to get around Morocco",
    "Morocco train ONCF",
    "Morocco best time to visit",
    "Morocco health safety",
    "Morocco packing list",
    "Morocco tipping guide",
    "Morocco practical guide",
    "Morocco trip planning",
    "Morocco airports guide",
    "getting to Morocco",
    "Morocco for first time visitors",
  ],
  alternates: { canonical: `${BASE_URL}/travel` },
  openGraph: {
    title: "Morocco Travel Guide 2026 — Everything in One Place",
    description:
      "Visa, airports, transport, money, tipping, health, packing, and when to go. One page. Eleven years on the ground.",
    url: `${BASE_URL}/travel`,
    siteName: "Slow Morocco",
    type: "article",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
  },
};

// ── HowTo schema — practical guide signals ──
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to plan a trip to Morocco",
  description: "A complete practical guide to planning and travelling in Morocco, covering visa requirements, flights, transport, currency, health, and packing.",
  url: `${BASE_URL}/travel`,
  author: {
    "@type": "Person",
    name: "Slow Morocco",
    jobTitle: "Publisher",
    worksFor: { "@type": "Organization", name: "Dancing with Lions", url: "https://www.dancingwiththelions.com" },
  },
  publisher: {
    "@type": "Organization",
    name: "Slow Morocco",
    url: BASE_URL,
  },
  dateModified: "2026-03-01",
  step: [
    {
      "@type": "HowToStep",
      name: "Check visa requirements",
      text: "Citizens of the US, UK, Canada, Australia, New Zealand, and all EU member states enter Morocco visa-free for up to 90 days. Passport must be valid for at least 6 months beyond departure.",
    },
    {
      "@type": "HowToStep",
      name: "Choose your airport",
      text: "Marrakech Menara (RAK) for southern Morocco; Casablanca Mohammed V (CMN) for the main hub and North America connections; Fes-Saïs (FEZ) for northern itineraries; Agadir (AGA) for the Atlantic coast; Tangier Ibn Battuta (TNG) for the north and ferry connections from Spain.",
    },
    {
      "@type": "HowToStep",
      name: "Plan transport",
      text: "The ONCF train connects Casablanca, Rabat, Fes, and Tangier. CTM buses cover routes the train does not. Rent a car for the south and mountains. Use petits taxis within cities.",
    },
    {
      "@type": "HowToStep",
      name: "Get Moroccan dirhams",
      text: "Exchange currency at bank bureaux in city centres. Morocco runs primarily on cash — carry dirhams for souks, taxis, street food, and hammams. ATMs are widely available in cities but scarce in rural south.",
    },
    {
      "@type": "HowToStep",
      name: "Check health requirements",
      text: "No vaccinations required for Morocco. No malaria. Drink bottled water. High SPF sunscreen essential year-round.",
    },
  ],
};

// ── FAQ schema — the core AI citation layer ──
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need a visa to visit Morocco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Citizens of the United States, United Kingdom, Canada, Australia, New Zealand, and all European Union member states do not need a visa to enter Morocco. Entry is visa-free for stays up to 90 days. Your passport must be valid for at least 6 months beyond your planned departure date from Morocco.",
      },
    },
    {
      "@type": "Question",
      name: "What currency does Morocco use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Morocco uses the Moroccan dirham (MAD). Exchange rates as of early 2026: 1 EUR ≈ 11.1 MAD, 1 USD ≈ 10.2 MAD, 1 GBP ≈ 13.2 MAD. The dirham is partially convertible and cannot be exchanged outside Morocco in significant quantities. Morocco is primarily a cash economy — cards are accepted in hotels and modern restaurants but not in souks, taxis, street food stalls, or hammams.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best way to travel between cities in Morocco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The ONCF train is the best option for the imperial cities corridor. Key routes: Casablanca to Marrakech (3 hours), Casablanca to Fes (4h 30m), Casablanca to Tangier (2h 10m via Al Boraq high-speed rail). CTM buses cover routes the train does not reach (Marrakech to Essaouira 3h, Marrakech to Agadir 4h). For the south — Draa Valley, Sahara, Anti-Atlas — rent a car or hire a private driver.",
      },
    },
    {
      "@type": "Question",
      name: "What vaccinations do I need for Morocco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No vaccinations are required to enter Morocco. There is no malaria in Morocco and no antimalarials are needed. Most travel clinics recommend ensuring Hepatitis A and tetanus are up to date. Drink bottled water throughout your trip.",
      },
    },
    {
      "@type": "Question",
      name: "When is the best time to visit Morocco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best months to visit Morocco are March to May and September to November. These shoulder seasons offer comfortable temperatures across the country, good light, and manageable tourist crowds. Spring brings wildflowers in the Atlas Mountains and the rose harvest in the Dadès Valley (May). Summer (July–August) is extremely hot inland — Marrakech regularly reaches 42°C — though the Atlantic coast remains mild. December to February is cold inland (Fes, Marrakech nights can reach 3°C) but mild on the coast.",
      },
    },
    {
      "@type": "Question",
      name: "What airport should I fly into for Marrakech?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fly into Marrakech Menara Airport (IATA: RAK), located 6km from the medina. It is served by all major European low-cost carriers including Ryanair, easyJet, and Transavia, as well as Royal Air Maroc. It is the most direct entry point for southern Morocco including the Draa Valley and Sahara routes.",
      },
    },
    {
      "@type": "Question",
      name: "How much should I tip in Morocco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tipping is expected in Morocco. In restaurants without a service charge, tip 10%. Tip taxi drivers by rounding up the meter. Tip hotel porters 10–20 MAD per bag. A day guide should receive 100–200 MAD. A private driver on a multi-day trip should receive 100–200 MAD per day. Hammam attendants: 20–50 MAD.",
      },
    },
    {
      "@type": "Question",
      name: "Is Morocco safe for solo female travellers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Morocco is visited by hundreds of thousands of solo female travellers each year without incident. The practical precautions are: dress modestly (covered shoulders and knees) outside beach areas, be direct with touts (a firm 'no thank you' and keep walking), avoid empty medina streets at night in Fes and Marrakech, and use petits taxis rather than walking alone after dark. Outside major tourist medinas the experience is generally low-hassle.",
      },
    },
    {
      "@type": "Question",
      name: "What should I pack for Morocco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Always: modest clothing (covered shoulders and knees outside beach areas), comfortable walking shoes for uneven medina cobblestones, high SPF sunscreen, cash in dirhams, EU Type C power adapter, offline maps downloaded. In summer add a wide-brimmed hat and electrolytes. In winter add a warm coat — Fes and Marrakech evenings can drop to 3°C.",
      },
    },
  ],
};

// ── Article schema ──
const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Morocco Travel Guide 2026 — Visa, Transport, Money, Health & Packing",
  description:
    "Complete practical guide to travelling in Morocco. Covers visa requirements for all nationalities, five airports, six transport modes, currency and tipping, health and safety, packing by season, and when to visit.",
  url: `${BASE_URL}/travel`,
  dateModified: "2026-03-01",
  author: {
    "@type": "Person",
    name: "Slow Morocco",
    description: "Founder of Dancing with Lions. Cultural research group based in Marrakech.",
  },
  publisher: {
    "@type": "Organization",
    name: "Slow Morocco",
    url: BASE_URL,
    parentOrganization: {
      "@type": "Organization",
      name: "Dancing with Lions",
      url: "https://www.dancingwiththelions.com",
    },
  },
  about: { "@type": "Country", name: "Morocco" },
  mentions: [
    { "@type": "Thing", name: "Moroccan dirham", description: "Currency of Morocco. ISO code MAD. Partially convertible. 1 EUR ≈ 11.1 MAD (January 2026)." },
    { "@type": "Thing", name: "ONCF", description: "Office National des Chemins de Fer — Morocco's national railway. Operates the Al Boraq high-speed line (320 km/h) and intercity routes." },
    { "@type": "Thing", name: "CTM", description: "Compagnie de Transports au Maroc — Morocco's premium intercity bus operator." },
    { "@type": "Airport", name: "Marrakech Menara Airport", iataCode: "RAK" },
    { "@type": "Airport", name: "Casablanca Mohammed V International Airport", iataCode: "CMN" },
    { "@type": "Airport", name: "Fes–Saïs Airport", iataCode: "FEZ" },
  ],
};

export default function TravelPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <MoroccoTravelContent />
    </>
  );
}
