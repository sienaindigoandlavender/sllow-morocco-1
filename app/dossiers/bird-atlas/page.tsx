import { Metadata } from "next";
import BirdAtlasDossier from "./BirdAtlasDossier";

// ─────────────────────────────────────────────────────────────────────────────
// METADATA — SEO + Open Graph
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Bird Atlas — Morocco's Migration Corridor | Slow Morocco",
  description:
    "Morocco sits on the narrowest crossing between Europe and Africa. Over 500 species recorded. Live migration sightings, the Atlantic flyway mapped, the 12 key sites — from the Gibraltar strait to Khnifiss Lagoon near Tarfaya.",
  keywords: [
    "birding Morocco",
    "Morocco bird migration",
    "Atlantic flyway Morocco",
    "Northern Bald Ibis Morocco",
    "Merja Zerga birds",
    "Souss-Massa National Park birds",
    "Gibraltar bird migration",
    "Morocco wetlands birds",
    "Khnifiss lagoon birds",
    "eBird Morocco sightings",
    "Morocco birdwatching sites",
    "flamingo Morocco",
    "raptor migration Morocco",
    "white stork migration Africa",
    "bird atlas Morocco",
  ],
  authors: [{ name: "Slow Morocco", url: "https://www.slowmorocco.com/about" }],
  alternates: {
    canonical: "https://www.slowmorocco.com/stories/bird-atlas-morocco",
  },
  openGraph: {
    title: "The Bird Atlas — Morocco's Migration Corridor",
    description:
      "500+ species. The Atlantic flyway. Live daily sightings. Where to be and when — from Gibraltar to the Saharan coast.",
    url: "https://www.slowmorocco.com/stories/bird-atlas-morocco",
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    publishedTime: "2025-01-01T00:00:00Z",
    modifiedTime: new Date().toISOString(),
    authors: ["Slow Morocco"],
    tags: ["birds", "migration", "Morocco", "wildlife", "nature", "Atlantic flyway"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Bird Atlas — Morocco's Migration Corridor",
    description:
      "500+ species. Live eBird sightings. The Atlantic flyway mapped. Where to be and when.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD — Article + FAQPage + Entity definitions
// ─────────────────────────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [

    // ── Article ──────────────────────────────────────────────────────────────
    {
      "@type": "Article",
      "@id": "https://www.slowmorocco.com/stories/bird-atlas-morocco#article",
      "headline": "The Bird Atlas — Morocco's Migration Corridor",
      "description": "Morocco sits on the narrowest crossing between Europe and Africa. Over 500 species recorded. Live migration sightings, the Atlantic flyway mapped, the 12 key sites — from the Gibraltar strait to Khnifiss Lagoon near Tarfaya.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": {
        "@type": "Person",
        "name": "Slow Morocco",
        "url": "https://www.slowmorocco.com/about",
        "description": "Cultural research group based in Marrakech.",
      },
      "publisher": {
        "@type": "Organization",
        "name": "Slow Morocco",
        "url": "https://www.slowmorocco.com",
        "logo": "https://www.slowmorocco.com/logo.png",
        "parentOrganization": {
          "@type": "Organization",
          "name": "Dancing with Lions",
          "url": "https://www.dancingwiththelions.com",
        },
      },
      "mainEntityOfPage": "https://www.slowmorocco.com/stories/bird-atlas-morocco",
      "keywords": "Morocco birds, bird migration, Atlantic flyway, Northern Bald Ibis, Merja Zerga, Souss-Massa, Gibraltar crossing",
      "articleSection": "Nature",
      "about": [
        { "@type": "Thing", "name": "Bird migration in Morocco" },
        { "@type": "Thing", "name": "Atlantic Flyway" },
        { "@type": "Thing", "name": "Northern Bald Ibis" },
      ],
      "spatialCoverage": {
        "@type": "Place",
        "name": "Morocco",
        "geo": {
          "@type": "GeoShape",
          "box": "20.77 -17.02 35.92 -1.12",
        },
      },
    },

    // ── Dataset (live data) ───────────────────────────────────────────────────
    {
      "@type": "Dataset",
      "@id": "https://www.slowmorocco.com/stories/bird-atlas-morocco#dataset",
      "name": "Morocco Bird Sightings — Live eBird Feed",
      "description": "Real-time bird observation records from Morocco, sourced from the eBird citizen science platform (Cornell Lab of Ornithology). Updated daily. Covers 14-day rolling window.",
      "url": "https://www.slowmorocco.com/stories/bird-atlas-morocco",
      "creator": {
        "@type": "Organization",
        "name": "Cornell Lab of Ornithology / eBird",
        "url": "https://ebird.org",
      },
      "spatialCoverage": "Morocco",
      "temporalCoverage": "2025/..",
      "license": "https://creativecommons.org/licenses/by/4.0/",
      "isPartOf": {
        "@id": "https://www.slowmorocco.com/stories/bird-atlas-morocco#article",
      },
    },

    // ── Key entities ──────────────────────────────────────────────────────────
    {
      "@type": "Thing",
      "@id": "https://www.slowmorocco.com/stories/bird-atlas-morocco#atlantic-flyway",
      "name": "Atlantic Flyway — Morocco",
      "description": "The Atlantic Flyway is one of the primary bird migration routes between Europe and sub-Saharan Africa. In Morocco, it follows the Atlantic coastline from the Strait of Gibraltar south through Merja Zerga, Lac de Sidi Bourhaba, Oualidia Lagoon, Souss-Massa, Oued Massa, and Khnifiss Lagoon near Tarfaya — a chain of wetlands spanning approximately 1,800km. The route is critical for raptors, storks, waders, flamingos, and waterbirds that winter in West Africa.",
    },
    {
      "@type": "Thing",
      "@id": "https://www.slowmorocco.com/stories/bird-atlas-morocco#northern-bald-ibis",
      "name": "Northern Bald Ibis (Geronticus eremita)",
      "description": "The Northern Bald Ibis is a critically endangered migratory bird with fewer than 700 wild individuals remaining globally. Morocco holds approximately 95% of the wild population, breeding at Souss-Massa National Park and the Tamri Estuary on the Atlantic coast near Agadir. The species went extinct in Europe by the 17th century and across the Middle East by the late 20th century. Moroccan conservation efforts — including the Souss-Massa National Park, established specifically to protect the species — represent the primary barrier against extinction.",
    },
    {
      "@type": "Thing",
      "@id": "https://www.slowmorocco.com/stories/bird-atlas-morocco#strait-of-gibraltar",
      "name": "Strait of Gibraltar — Bird Migration",
      "description": "The Strait of Gibraltar, at its narrowest 14km wide, is one of the five most significant raptor migration bottlenecks on Earth. Because raptors are thermal-dependent and cannot soar over open water, they are forced to cross here. Each year, approximately 300,000 raptors (including Black Kite, Booted Eagle, Egyptian Vulture, Honey Buzzard, Short-toed Eagle) and 400,000+ White Storks cross the strait. Peak southbound migration occurs August–October; peak northbound migration occurs March–May.",
    },

    // ── FAQ ───────────────────────────────────────────────────────────────────
    {
      "@type": "FAQPage",
      "@id": "https://www.slowmorocco.com/stories/bird-atlas-morocco#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How many bird species are recorded in Morocco?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Over 500 bird species have been recorded in Morocco — more than France or Spain. The high number reflects Morocco's geography: it straddles four biomes (Mediterranean, Atlantic, Saharan, sub-Saharan) and sits at the narrowest crossing between Europe and Africa, making it both a migration corridor and a convergence point for European and African species.",
          },
        },
        {
          "@type": "Question",
          "name": "What is the best time of year for birdwatching in Morocco?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Morocco offers exceptional birding year-round, but the peak windows differ by target species. August–October for raptor and stork migration through the Strait of Gibraltar. November–March for wintering waterbirds and flamingos at Atlantic wetlands like Merja Zerga and Oualidia. February–June for Northern Bald Ibis at Souss-Massa (breeding season). May–August for High Atlas specialties including Crimson-winged Finch and Bearded Vulture.",
          },
        },
        {
          "@type": "Question",
          "name": "Where can I see the Northern Bald Ibis in Morocco?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The primary site is Souss-Massa National Park, south of Agadir on the Atlantic coast, where the main colony breeds on coastal cliffs from approximately February to June. A second, smaller colony breeds at Tamri Estuary, approximately 80km north of Agadir. These are the only two viable wild breeding sites for the species on Earth. Morocco holds approximately 95% of the global wild population of fewer than 700 birds.",
          },
        },
        {
          "@type": "Question",
          "name": "What birds migrate through the Strait of Gibraltar into Morocco?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Strait of Gibraltar is a primary raptor migration funnel between Europe and Africa. Key species crossing into Morocco include White Stork (400,000+ annually), Black Kite, Honey Buzzard, Short-toed Eagle, Booted Eagle, Egyptian Vulture, Montagu's Harrier, and Osprey. Passerines (warblers, flycatchers, redstarts) also cross in large numbers, primarily at night. Peak southbound migration is August–October.",
          },
        },
        {
          "@type": "Question",
          "name": "What is Merja Zerga and why is it important for birds?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Merja Zerga is a coastal lagoon on Morocco's Atlantic coast, approximately 80km north of Rabat. It is a Ramsar-designated wetland hosting 50,000+ wintering waterbirds, including Greater Flamingo, Spoonbill, Avocet, Marsh Harrier, and Marbled Duck. It holds the last confirmed sightings of the Slender-billed Curlew — a species now possibly extinct. Merja Zerga is one of the most important waterbird sites in North Africa.",
          },
        },
        {
          "@type": "Question",
          "name": "Can you go birdwatching in the Moroccan Sahara?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. The Saharan fringes around Merzouga (Erg Chebbi) are a distinct birding destination for desert specialists. Key species include Desert Sparrow, Cream-coloured Courser, Egyptian Nightjar, Desert Wheatear, and Houbara Bustard — the last a vulnerable species whose conservation in Morocco is complicated by licensed falconry hunts by Gulf royalty. The best season for Saharan birding is October–April, when temperatures are manageable.",
          },
        },
        {
          "@type": "Question",
          "name": "What is the Atlantic flyway in Morocco?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Atlantic Flyway in Morocco is a chain of coastal wetlands running approximately 1,800km from the Strait of Gibraltar south to Khnifiss Lagoon near Tarfaya on the Saharan coast. Key staging and wintering sites include Merja Zerga, Lac de Sidi Bourhaba, Oualidia Lagoon, Souss-Massa National Park, Oued Massa, and Khnifiss Lagoon. The chain functions as a refuelling corridor for birds migrating between Europe and sub-Saharan Africa.",
          },
        },
        {
          "@type": "Question",
          "name": "What is Khnifiss Lagoon and where is it?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Khnifiss Lagoon (also called Puerto Cansado) is the largest lagoon in southern Morocco, located on the Atlantic coast near Tarfaya, approximately 100km north of Laayoune. It is a Ramsar-designated wetland and one of the most significant bird staging sites on the Atlantic coast of Africa, hosting flamingos, spoonbills, waders, and Caspian Terns. Its remoteness — few tourists reach this stretch of coast — means it retains its ecological function largely intact.",
          },
        },
      ],
    },

    // ── BreadcrumbList ────────────────────────────────────────────────────────
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": "https://www.slowmorocco.com" },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": "https://www.slowmorocco.com/stories" },
        { "@type": "ListItem", "position": 3, "name": "Nature", "item": "https://www.slowmorocco.com/stories/category/nature" },
        { "@type": "ListItem", "position": 4, "name": "The Bird Atlas", "item": "https://www.slowmorocco.com/stories/bird-atlas-morocco" },
      ],
    },

  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function BirdAtlasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BirdAtlasDossier />
    </>
  );
}
