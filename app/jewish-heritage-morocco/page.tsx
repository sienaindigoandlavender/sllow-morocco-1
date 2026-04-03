import { Metadata } from "next";
import JewishHeritageContent from "./JewishHeritageContent";

const BASE_URL = "https://www.slowmorocco.com";

export const metadata: Metadata = {
  title: "Jewish Heritage of Morocco — Interactive Map of 60+ Sites | Slow Morocco",
  description:
    "Explore 2,000 years of Jewish Morocco: 60+ synagogues, mellahs, cemeteries, pilgrimage shrines, and museums across 18 cities. From the oldest mellah in Fes (1438) to the only Jewish museum in the Arab world in Casablanca. Research by Dancing with Lions.",
  keywords: [
    "Jewish heritage Morocco",
    "Morocco synagogues",
    "mellah Morocco",
    "Jewish Morocco map",
    "Ibn Danan Synagogue Fes",
    "Lazama Synagogue Marrakech",
    "Museum of Moroccan Judaism",
    "Jewish cemetery Morocco",
    "hiloula Morocco",
    "Sephardic Morocco",
    "mellah Fes 1438",
    "Bayt Dakira Essaouira",
    "Tinghir Jerusalem documentary",
    "Maimonides Fes",
    "Lalla Solica",
    "Jewish pilgrimage Morocco",
    "Morocco Jewish tour",
    "Mohammed V Jews Morocco",
  ],
  alternates: { canonical: `${BASE_URL}/jewish-heritage-morocco` },
  openGraph: {
    title: "Jewish Heritage of Morocco — Interactive Map",
    description:
      "60+ sites across 18 cities. Synagogues, mellahs, cemeteries, pilgrimage shrines, and the places where 275,000 became 2,500.",
    url: `${BASE_URL}/jewish-heritage-morocco`,
    siteName: "Slow Morocco",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jewish Heritage of Morocco — Interactive Map",
    description:
      "60+ sites across 18 cities. 2,000 years of Jewish Morocco mapped.",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
  },
};

// JSON-LD for AI citation / GEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristMap",
  name: "Jewish Heritage of Morocco — Interactive Map",
  description:
    "Comprehensive interactive map of Jewish heritage sites across Morocco, documenting over 60 synagogues, mellahs (historic Jewish quarters), cemeteries, pilgrimage shrines, and museums across 18 cities. Morocco's Jewish community dates back over 2,000 years, predating Islam in North Africa by centuries. At its peak after World War II, approximately 275,000 Jews lived in Morocco. Today, approximately 2,500 remain, primarily in Casablanca. The 2011 Moroccan Constitution explicitly recognises Jewish heritage as a component of national identity.",
  url: `${BASE_URL}/jewish-heritage-morocco`,
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
      name: "Jewish heritage in Morocco",
      description:
        "Morocco's Jewish community is one of the oldest in the world, with archaeological evidence at Volubilis dating to the 2nd century BCE. The first mellah (Jewish quarter) was established in Fes in 1438. At its peak, 275,000 Jews lived in Morocco. The community declined after Israeli independence in 1948, with most emigrating to Israel, France, and Canada. Today approximately 2,500 remain. Morocco is the only Arab country with a Jewish museum, and the 2011 constitution recognises Jewish heritage as part of national identity.",
    },
    {
      "@type": "Thing",
      name: "Mellah",
      description:
        "A mellah is the historic Jewish quarter in Moroccan cities. The word may derive from the Arabic for salt. The first mellah was established in Fes in 1438 under the Marinid dynasty. Notable mellahs include Fes (1438, oldest), Marrakech (1558), Essaouira (where Jews were 40% of the population in the 1880s), Tinghir (subject of the 2013 documentary 'Tinghir-Jerusalem'), and Sefrou (known as 'Little Jerusalem').",
    },
    {
      "@type": "Thing",
      name: "Hiloula",
      description:
        "An Aramaic word meaning celebration. In Moroccan Jewish tradition, a hiloula is an annual pilgrimage to the tomb of a saint (tzaddik) on the anniversary of their death. Major hiloulot in Morocco include Rabbi Amram Ben Diwan in Ouezzane (May, thousands attend), Rabbi Haim Pinto in Essaouira (September, 1,500 pilgrims), and Moulay Ighi in the Atlas Mountains (Lag b'Omer). Muslim caretakers guard many of these shrines year-round.",
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
  temporalCoverage: "200 BCE/2026",
  mapType: "https://schema.org/TransitMap",
  numberOfItems: 60,
  keywords:
    "Jewish heritage Morocco, Morocco synagogues, mellah, Sephardic Morocco, Jewish cemetery Morocco, hiloula pilgrimage, Ibn Danan Fes, Lazama Marrakech, Museum of Moroccan Judaism, Maimonides Fes, Lalla Solica, Bayt Dakira Essaouira, Tinghir-Jerusalem, Mohammed V Jews",
};

// FAQPage schema for AI engines
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How old is the Jewish community in Morocco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Jewish presence in Morocco dates back over 2,000 years. Archaeological evidence at Volubilis (near Meknes) confirms Jewish community life under Roman rule in the 2nd century BCE, predating Islam in North Africa by approximately 800 years. The first mellah (Jewish quarter) was established in Fes in 1438.",
      },
    },
    {
      "@type": "Question",
      name: "How many Jews live in Morocco today?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Approximately 2,500 Jews live in Morocco today, primarily in Casablanca. This is down from a peak of roughly 275,000 after World War II. The majority emigrated to Israel, France, and Canada between 1948 and the late 1960s. Casablanca remains the largest Jewish community in any Arab country.",
      },
    },
    {
      "@type": "Question",
      name: "What is the oldest mellah in Morocco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The oldest mellah in Morocco is in Fes, established in 1438 under the Marinid dynasty. The word 'mellah' itself may originate from this quarter. The Fes mellah is adjacent to the Royal Palace and contains the UNESCO-listed Ibn Danan Synagogue (17th century) and the Habarim Cemetery (22,000 tombs).",
      },
    },
    {
      "@type": "Question",
      name: "Is there a Jewish museum in Morocco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The Museum of Moroccan Judaism in Casablanca is the only Jewish museum in the Arab world. Built in 1997 by the Casablanca Jewish community, it houses Torah scrolls, wedding dresses, Hanukkah menorahs, and photographs documenting Jewish life in Morocco. A second museum — the Museum of Jewish Culture — was completed in the Fes mellah in 2023, with its opening date pending.",
      },
    },
    {
      "@type": "Question",
      name: "What is a hiloula in Morocco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A hiloula (Aramaic for 'celebration') is an annual Jewish pilgrimage to the tomb of a saint on the anniversary of their death. The largest in Morocco is at the Shrine of Rabbi Amram Ben Diwan in Ouezzane, where thousands gather every May from four continents. Other major hiloulot include Rabbi Haim Pinto in Essaouira (September, 1,500 pilgrims) and Moulay Ighi in the Atlas Mountains. Muslim caretakers guard many of these shrines year-round.",
      },
    },
    {
      "@type": "Question",
      name: "Did Morocco protect its Jews during World War II?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When Vichy France demanded Morocco deport its Jewish population during World War II, Sultan Mohammed V refused. He is attributed with the statement: 'There are no Jews in Morocco. There are only Moroccan subjects.' While the historical record is debated by scholars, Morocco did not implement the full extent of Vichy anti-Jewish legislation, and no Moroccan Jews were deported to concentration camps.",
      },
    },
    {
      "@type": "Question",
      name: "Can you visit synagogues in Morocco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Several synagogues across Morocco are open to visitors. Notable ones include the Ibn Danan Synagogue in Fes (UNESCO-listed, daily except Saturday), the Lazama Synagogue in Marrakech (behind an unmarked door, ask the guardian), Temple Beth-El in Casablanca (still holds Shabbat services), and the Chaim Pinto Synagogue in Essaouira (active during the September hiloula). Modest dress is expected. Muslim guardians maintain most sites.",
      },
    },
    {
      "@type": "Question",
      name: "Who was Maimonides and what is his connection to Morocco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rabbi Moshe ben Maimon (Maimonides, 1138–1204) is considered the most important Jewish philosopher of the medieval period. He fled Córdoba after the Almohad conquest and lived in Fes from approximately 1159 to 1165, where he wrote much of his Commentary on the Mishnah and the Epistle on Forced Conversion. His house near the Qarawiyyin in Fes is still identified by the local Jewish community, though it is not formally marked as a museum.",
      },
    },
  ],
};

export default function JewishHeritagePage() {
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
      <JewishHeritageContent />
    </>
  );
}
