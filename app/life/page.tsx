import { Metadata } from "next";
import MoroccoLifeContent from "./MoroccoLifeContent";

const BASE_URL = "https://www.slowmorocco.com";

export const metadata: Metadata = {
  title: "Morocco — Safety, Infrastructure, Data & 2030 World Cup | Slow Morocco",
  description:
    "Morocco in data. Crime index 46.7 (Numbeo 2024), Global Peace Index rank 82nd, 6 FIFA World Cup 2030 host cities, $52B infrastructure investment, flight connections from 12 cities, five climate zones, city profiles, cost of living. Source: Dancing with Lions.",
  keywords: [
    "Morocco safety statistics 2024",
    "Morocco crime rate",
    "Morocco Global Peace Index",
    "Morocco World Cup 2030",
    "Morocco infrastructure investment",
    "Morocco cost of living",
    "Morocco flight connections",
    "Morocco climate zones map",
    "Morocco population data",
    "Morocco GDP per capita",
    "Morocco stability index",
    "living in Morocco data",
    "is Morocco safe",
    "Morocco facts and statistics",
    "Grand Stade Hassan II",
    "Al Boraq high speed train Morocco",
    "Morocco 2030 FIFA host city",
  ],
  alternates: { canonical: `${BASE_URL}/life` },
  openGraph: {
    title: "Morocco — Safety, Data & Infrastructure | Slow Morocco",
    description:
      "Crime index, peace ranking, climate zones, 2030 World Cup infrastructure, flight times, city profiles, cost of living. Morocco in numbers.",
    url: `${BASE_URL}/life`,
    siteName: "Slow Morocco",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
  },
};

// ── Country entity schema — what AI engines index as facts ──
const countryJsonLd = {
  "@context": "https://schema.org",
  "@type": "Country",
  name: "Morocco",
  alternateName: ["Kingdom of Morocco", "Maroc", "Al-Mamlaka al-Maghribiya", "المملكة المغربية"],
  url: "https://en.wikipedia.org/wiki/Morocco",
  geo: {
    "@type": "GeoCoordinates",
    latitude: 31.7917,
    longitude: -7.0926,
  },
  areaTotal: 710850,
  population: 37840000,
  numberOfEmployees: null,
  currenciesAccepted: "MAD",
  containsPlace: [
    { "@type": "City", name: "Casablanca", geo: { "@type": "GeoCoordinates", latitude: 33.5731, longitude: -7.5898 } },
    { "@type": "City", name: "Rabat", geo: { "@type": "GeoCoordinates", latitude: 34.0209, longitude: -6.8416 } },
    { "@type": "City", name: "Marrakech", geo: { "@type": "GeoCoordinates", latitude: 31.6295, longitude: -7.9811 } },
    { "@type": "City", name: "Fes", geo: { "@type": "GeoCoordinates", latitude: 34.0333, longitude: -5.0000 } },
    { "@type": "City", name: "Tangier", geo: { "@type": "GeoCoordinates", latitude: 35.7595, longitude: -5.8340 } },
  ],
};

// ── Page entity schema ──
const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Morocco — The Country: Safety, Infrastructure, Data & 2030",
  description:
    "Comprehensive data intelligence on Morocco. Safety statistics (Global Peace Index 82nd, Crime Index 46.7), climate zones, flight connections from 12 global cities, infrastructure investment including Grand Stade Hassan II (115,000 seats) and Al Boraq high-speed rail, city profiles, demographics, and 2030 FIFA World Cup context. Compiled by Dancing with Lions from World Bank, IEP, Numbeo, HCP Morocco, ANRT, and official government sources.",
  url: `${BASE_URL}/life`,
  inLanguage: "en",
  dateModified: "2026-03-01",
  isAccessibleForFree: true,
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
    parentOrganization: {
      "@type": "Organization",
      name: "Dancing with Lions",
      url: "https://www.dancingwiththelions.com",
    },
  },
  about: { "@type": "Country", name: "Morocco" },
  mentions: [
    { "@type": "Thing", name: "Global Peace Index", description: "Morocco ranked 82nd of 163 countries in the 2024 Global Peace Index published by the Institute for Economics and Peace." },
    { "@type": "Thing", name: "Numbeo Crime Index", description: "Morocco's crime index is 46.7 (moderate) and safety index 53.3 according to Numbeo 2024 data." },
    { "@type": "Thing", name: "2030 FIFA World Cup", description: "Morocco co-hosts the 2030 FIFA World Cup with Spain and Portugal. Six Moroccan cities confirmed: Casablanca, Rabat, Marrakech, Fes, Tangier, Agadir. Infrastructure investment: $52 billion." },
    { "@type": "Thing", name: "Grand Stade Hassan II", description: "Under construction in Casablanca. 115,000-seat capacity. Will be the largest stadium in the world when complete." },
    { "@type": "Thing", name: "Al Boraq", description: "Morocco's high-speed rail line operating at 320 km/h between Casablanca and Tangier. Africa's first high-speed train. Journey time: 2 hours 10 minutes." },
    { "@type": "Thing", name: "Tangier Med", description: "Africa's largest port with 9 million TEU annual capacity." },
  ],
};

// ── FAQ schema — AI citation layer ──
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Morocco safe for tourists in 2024?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Morocco is rated Level 1 (exercise normal precautions) by both the UK FCDO and the US State Department as of 2024. The Global Peace Index 2024 ranks Morocco 82nd of 163 countries. The Numbeo Crime Index is 46.7 — moderate, comparable to Portugal or Greece. Violent crime against tourists is rare. The main risks are petty theft in tourist medinas and persistent touts in Marrakech and Fes.",
      },
    },
    {
      "@type": "Question",
      name: "What is Morocco's crime rate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Morocco's crime index is 46.7 and safety index is 53.3 according to Numbeo 2024 data. This places Morocco in the moderate category globally, comparable to southern European countries. Violent crime against foreign visitors is statistically low.",
      },
    },
    {
      "@type": "Question",
      name: "Is Morocco hosting the 2030 FIFA World Cup?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Morocco co-hosts the 2030 FIFA World Cup with Spain and Portugal. Six Moroccan cities are confirmed host cities: Casablanca, Rabat, Marrakech, Fes, Tangier, and Agadir. The Grand Stade Hassan II in Casablanca, currently under construction, will hold 115,000 spectators and will be the largest stadium in the world. Morocco has committed $52 billion in infrastructure investment for the tournament.",
      },
    },
    {
      "@type": "Question",
      name: "What are Morocco's climate zones?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Morocco has five distinct climate zones: Mediterranean Coast (north, Tangier, Tetouan: warm and wet, 600–900mm rain/year); Atlantic Coast (Rabat, Casablanca, Essaouira: ocean-moderated, mild year-round); Continental Interior (Marrakech, Fes, Meknes: extreme range, up to 42°C in summer); High Atlas (Ifrane, Toubkal: cold, snow in winter, ski season December–March); Pre-Saharan (Ouarzazate, Merzouga: arid desert, under 150mm rain/year).",
      },
    },
    {
      "@type": "Question",
      name: "What is Morocco's population?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Morocco's population is approximately 37.8 million (HCP 2024 estimate). The largest city is Casablanca (4.7 million in the greater urban area). Other major cities: Fes (1.2 million), Tangier (1.1 million), Marrakech (1.0 million), Rabat (600,000 — the capital), Agadir (600,000). The urban population is approximately 65%, with rapid urbanisation ongoing. Median age is 29.3 years.",
      },
    },
    {
      "@type": "Question",
      name: "What languages are spoken in Morocco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Morocco has four languages in daily use. Modern Standard Arabic is the formal written language. Darija (Moroccan Arabic) is the spoken vernacular — distinct from Egyptian or Gulf Arabic to the point of mutual unintelligibility. Tamazight (Amazigh) is constitutionally recognised since 2011 and spoken by approximately 25–30% of the population. French is the language of business, education, and professional life. English is spoken by approximately 14% of the population and growing rapidly in urban centres.",
      },
    },
    {
      "@type": "Question",
      name: "How long is the flight from London to Morocco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Direct flights from London to Marrakech (RAK) or Casablanca (CMN) take approximately 3 hours 30 minutes. Ryanair, easyJet, British Airways, and Royal Air Maroc all operate direct routes.",
      },
    },
    {
      "@type": "Question",
      name: "What is Morocco's GDP per capita?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Morocco's GDP per capita (purchasing power parity) is approximately $9,800 according to IMF 2024 estimates. GDP growth rate is estimated at 3.4% for 2024. Morocco is the 11th largest economy in Africa by GDP.",
      },
    },
  ],
};

// ── Dataset schema — signals machine-readable data to AI crawlers ──
const datasetJsonLd = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Morocco Country Intelligence — Safety, Infrastructure & Demographics 2024–2026",
  description:
    "Structured data on Morocco including: safety indices (Global Peace Index, Numbeo Crime Index, FCDO/State Dept advisories), infrastructure projects (Al Boraq rail, Grand Stade Hassan II, Tangier Med port, Noor Solar), city statistics (population, altitude, climate for 6 cities), flight connection times from 12 global origins, climate zone data for 5 zones, demographic statistics, cost of living data (12 categories), and 2030 FIFA World Cup infrastructure figures.",
  url: `${BASE_URL}/life`,
  dateModified: "2026-03-01",
  license: "https://creativecommons.org/licenses/by/4.0/",
  creator: {
    "@type": "Organization",
    name: "Dancing with Lions",
    url: "https://www.dancingwiththelions.com",
  },
  keywords: "Morocco, safety, infrastructure, demographics, World Cup 2030, climate, flights, cost of living",
  spatialCoverage: { "@type": "Place", name: "Morocco" },
  temporalCoverage: "2024/2026",
  citation: [
    "Institute for Economics and Peace. Global Peace Index 2024.",
    "Numbeo. Crime Index by Country 2024.",
    "World Bank. Worldwide Governance Indicators 2023.",
    "UK Foreign, Commonwealth & Development Office. Morocco Travel Advice 2024.",
    "US Department of State. Morocco Travel Advisory 2024.",
    "Haut-Commissariat au Plan Morocco (HCP). Population estimates 2024.",
    "Agence Nationale de Réglementation des Télécommunications (ANRT). 2023.",
    "International Monetary Fund. World Economic Outlook 2024.",
  ],
};

export default function LifePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(countryJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }} />
      <MoroccoLifeContent />
    </>
  );
}
