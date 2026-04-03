export default function MoroccoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const BASE_URL = "https://www.slowmorocco.com";

  const countrySchema = {
    "@context": "https://schema.org",
    "@type": "Country",
    "name": "Morocco",
    "alternateName": ["Al-Mamlaka al-Maghribiyya", "Maroc", "المغرب"],
    "description":
      "Morocco is a country in North Africa bordering the Atlantic Ocean and Mediterranean Sea, with the Sahara Desert to the south and the Atlas Mountains through its centre. Capital: Rabat. Largest city: Casablanca.",
    "url": "https://www.wikidata.org/wiki/Q1028",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 31.7917,
      "longitude": -7.0926,
    },
    "containsPlace": [
      { "@type": "City", "name": "Marrakech" },
      { "@type": "City", "name": "Casablanca" },
      { "@type": "City", "name": "Fes" },
      { "@type": "City", "name": "Rabat" },
      { "@type": "City", "name": "Tangier" },
      { "@type": "City", "name": "Essaouira" },
      { "@type": "City", "name": "Meknes" },
      { "@type": "City", "name": "Ouarzazate" },
      { "@type": "City", "name": "Agadir" },
      { "@type": "City", "name": "Dakhla" },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Morocco — Country Guide",
    "description":
      "Morocco travel guide: cities, culture, when to visit, visas, currency, and language. Written from experience living in Morocco.",
    "url": `${BASE_URL}/morocco`,
    "publisher": {
      "@type": "Organization",
      "name": "Slow Morocco",
      "sameAs": [BASE_URL, "https://www.dancingwiththelions.com"],
    },
    "author": {
      "@type": "Person",
      "name": "Slow Morocco",
      "description": "Cultural research group based in Marrakech.",
    },
    "about": {
      "@type": "Country",
      "name": "Morocco",
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Morocco", "item": `${BASE_URL}/morocco` },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do I need a visa to visit Morocco?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Citizens of the US, UK, EU, Canada, Australia, and most Western countries do not need a visa to enter Morocco. They receive a 90-day stamp on arrival. Always check current entry requirements before travelling.",
        },
      },
      {
        "@type": "Question",
        "name": "What currency does Morocco use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Morocco uses the Moroccan dirham (MAD). The dirham is a closed currency — it cannot be taken out of Morocco or obtained abroad. Exchange at the airport, banks, or ATMs on arrival. As of 2025, approximately 1 EUR = 11 DH, 1 USD = 10 DH.",
        },
      },
      {
        "@type": "Question",
        "name": "What language is spoken in Morocco?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Morocco has three everyday languages: Darija (Moroccan Arabic), Tamazight (Berber), and French. Spanish is common in the north. Modern Standard Arabic is used in formal contexts. In tourist areas, English is widely spoken.",
        },
      },
      {
        "@type": "Question",
        "name": "What is the best time to visit Morocco?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "March to May and September to November are ideal for most of Morocco — mild temperatures, low crowds. Summer (June–August) is very hot inland but comfortable on the Atlantic coast. Winter is cold in the mountains but perfect in Agadir and Dakhla.",
        },
      },
      {
        "@type": "Question",
        "name": "Is Morocco safe to travel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Morocco is generally safe for tourists. It is one of the most visited countries in Africa with well-established tourism infrastructure. Standard precautions apply in the medinas — watch for pickpockets and be aware of unofficial guides.",
        },
      },
      {
        "@type": "Question",
        "name": "What religion is practised in Morocco?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Islam is the official state religion and practised by approximately 99% of Moroccans. Morocco follows Maliki Sunni Islam with a distinctive Sufi tradition. Religious sites are generally not open to non-Muslims, with some exceptions.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(countrySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
