import { Metadata } from "next";
import WorldCup2030MapContent from "./WorldCup2030MapContent";

const BASE_URL = "https://www.slowmorocco.com";

export const metadata: Metadata = {
  title: "Morocco World Cup 2030 — Interactive Stadium & Infrastructure Map | Slow Morocco",
  description:
    "Morocco's six World Cup 2030 host cities mapped: stadiums, high-speed rail, airports, highways, and hotel capacity. From the 115,000-seat Grand Stade Hassan II in Casablanca to the Atlas foothills of Marrakech. $41 billion in infrastructure. Research by Dancing with Lions.",
  keywords: [
    "Morocco World Cup 2030",
    "World Cup 2030 stadiums",
    "Grand Stade Hassan II",
    "Morocco stadiums map",
    "Casablanca World Cup",
    "Rabat World Cup",
    "Marrakech World Cup",
    "Tangier World Cup",
    "Fes World Cup",
    "Agadir World Cup",
    "Morocco infrastructure 2030",
    "Al Boraq high-speed rail",
    "FIFA 2030 Morocco",
    "Morocco Spain Portugal World Cup",
    "World Cup host cities Morocco",
  ],
  alternates: { canonical: `${BASE_URL}/morocco-world-cup-2030` },
  openGraph: {
    title: "Morocco World Cup 2030 — Interactive Stadium & Infrastructure Map",
    description:
      "Six host cities. Six stadiums. $41 billion in infrastructure. Morocco's World Cup 2030 mapped.",
    url: `${BASE_URL}/morocco-world-cup-2030`,
    siteName: "Slow Morocco",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Morocco World Cup 2030 — Interactive Map",
    description:
      "Six host cities. Six stadiums. $41B in infrastructure. Morocco's World Cup 2030 mapped.",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
  },
};

// JSON-LD — TouristMap schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristMap",
  name: "Morocco World Cup 2030 — Interactive Stadium & Infrastructure Map",
  description:
    "Interactive map of Morocco's six FIFA World Cup 2030 host cities, documenting stadiums, high-speed rail expansion, airport upgrades, highway construction, and hotel capacity. Morocco will co-host the 2030 FIFA World Cup alongside Spain and Portugal — the first World Cup to span two continents. Six Moroccan cities will host matches across six stadiums with a combined investment exceeding $41 billion in infrastructure.",
  url: `${BASE_URL}/morocco-world-cup-2030`,
  inLanguage: "en",
  isAccessibleForFree: true,
  publisher: {
    "@type": "Organization",
    name: "Slow Morocco",
    url: BASE_URL,
    parentOrganization: {
      "@type": "Organization",
      name: "Dancing with Lions",
      url: "https://www.dancingwithlions.com",
    },
  },
  author: {
    "@type": "Person",
    name: "Jacqueline Ng",
    jobTitle: "Founder",
    worksFor: {
      "@type": "Organization",
      name: "Dancing with Lions",
    },
  },
  about: [
    {
      "@type": "Thing",
      name: "FIFA World Cup 2030 in Morocco",
      description:
        "Morocco will co-host the 2030 FIFA World Cup alongside Spain and Portugal. Six Moroccan cities — Casablanca, Rabat, Tangier, Marrakech, Fes, and Agadir — will host matches across six stadiums. The centrepiece is the Grand Stade Hassan II in Casablanca, which at 115,000 seats will be the largest football stadium in the world. Morocco is investing over $41 billion in infrastructure including stadiums, high-speed rail, airports, highways, and hotel capacity.",
    },
    {
      "@type": "Thing",
      name: "Grand Stade Hassan II",
      description:
        "The Grand Stade Hassan II in Casablanca will be the largest football stadium in the world at 115,000 seats. Designed by Oualalou + Choi and Populous, the stadium features a tent-roof inspired by Morocco's moussem tradition. Located on a 100-hectare site in El Mansouria, 38 km north of Casablanca. Budget: $500 million. Completion expected 2028. Leading candidate to host the 2030 World Cup final.",
    },
    {
      "@type": "Thing",
      name: "Al Boraq High-Speed Rail",
      description:
        "Africa's first high-speed rail network. The existing Tangier–Kénitra line (opened 2018, 320 km/h) is being extended south to Marrakech via Rabat and Casablanca. The $5.3 billion extension will enable Tangier to Marrakech in 2h40m. Morocco has ordered 168 new trains from Alstom, Talgo, and Hyundai Rotem for $2.9 billion. Forty railway stations are being built or renovated.",
    },
  ],
  spatialCoverage: {
    "@type": "Place",
    name: "Morocco",
    geo: {
      "@type": "GeoShape",
      box: "27.6 -13.2 35.9 -1.0",
    },
  },
  temporalCoverage: "2024/2030",
  mapType: "https://schema.org/TransitMap",
  numberOfItems: 30,
  keywords:
    "Morocco World Cup 2030, Grand Stade Hassan II, Casablanca stadium, Al Boraq HSR, Morocco stadiums, FIFA 2030, Morocco infrastructure, World Cup host cities",
};

// FAQPage schema for AI engines
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which cities in Morocco are hosting the 2030 World Cup?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Six Moroccan cities will host 2030 World Cup matches: Casablanca (Grand Stade Hassan II, 115,000 seats — potential final venue), Rabat (Prince Moulay Abdellah Stadium, 68,700 seats), Tangier (Ibn Batouta Stadium, 75,600 seats), Marrakech (Marrakech Stadium, 70,000 seats), Fes (Fez Stadium, 55,800 seats), and Agadir (Adrar Stadium, up to 70,000 seats).",
      },
    },
    {
      "@type": "Question",
      name: "What is the largest stadium for the 2030 World Cup?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Grand Stade Hassan II in Casablanca will be the largest football stadium in the world at 115,000 seats. Designed by Oualalou + Choi and Populous, the $500 million stadium features a tent-roof inspired by Morocco's moussem tradition. It is located in El Mansouria, 38 km north of Casablanca, and is expected to be completed by 2028.",
      },
    },
    {
      "@type": "Question",
      name: "How much is Morocco investing in World Cup 2030 infrastructure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Morocco is investing approximately $41 billion in infrastructure for the 2030 World Cup. This includes $9.6 billion in rail (Al Boraq HSR extension and 168 new trains), $6.8 billion in airports (Mohammed V Terminal 3 and national expansion), $5.1 billion in stadiums, $2.4 billion in hotels (target: 330,000 rooms by 2030), and $1.3 billion in highways.",
      },
    },
    {
      "@type": "Question",
      name: "Will there be high-speed rail between World Cup host cities in Morocco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Morocco's Al Boraq high-speed rail — Africa's first HSR network, opened in 2018 between Tangier and Kénitra — is being extended south through Rabat and Casablanca to Marrakech. The $5.3 billion extension will enable travel from Tangier to Marrakech in 2 hours 40 minutes at speeds up to 350 km/h. Morocco has also ordered 168 new trains for $2.9 billion.",
      },
    },
    {
      "@type": "Question",
      name: "When does the 2030 World Cup start?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 2030 FIFA World Cup is expected to begin on June 13, 2030. The tournament will be co-hosted by Morocco, Spain, and Portugal — the first World Cup to span two continents. Twenty stadiums across seventeen cities will host matches, with six stadiums in Morocco, eleven in Spain, and three in Portugal.",
      },
    },
  ],
};

export default function MoroccoWorldCup2030Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <WorldCup2030MapContent />
    </>
  );
}
