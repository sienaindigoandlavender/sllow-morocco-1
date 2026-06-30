import type { Metadata } from "next";
import Script from "next/script";
import SaharaLandingContentIT from "./SaharaLandingContentIT";

export const metadata: Metadata = {
  title: "Tour del Deserto del Sahara di 3 Giorni da Marrakech",
  description: "Viaggio privato di 3 giorni nel deserto da Marrakech attraverso Ouarzazate, la Valle del Draa, fino alle dune di Erg Chebbi a Merzouga. €450 a persona, minimo 2. Autista privato, campo nel deserto incluso.",
  alternates: { canonical: "https://www.slowmorocco.com/tour-sahara-da-marrakech" },
  openGraph: {
    title: "Tour del Deserto del Sahara di 3 Giorni da Marrakech",
    description: "Viaggio privato di 3 giorni nel deserto da Marrakech fino alle dune di Erg Chebbi. Attraverso Ouarzazate, le oasi della Valle del Draa e fino al Sahara. €450 a persona.",
    url: "https://www.slowmorocco.com/tour-sahara-da-marrakech",
    siteName: "Slow Morocco",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Tour del Deserto del Sahara di 3 Giorni da Marrakech",
  "description": "Viaggio privato di 3 giorni nel deserto da Marrakech attraverso Ouarzazate, la Valle del Draa, fino alle dune di Erg Chebbi a Merzouga. Autista privato, 2 notti di alloggio incluse.",
  "url": "https://www.slowmorocco.com/tour-sahara-da-marrakech",
  "provider": {
    "@type": "TravelAgency",
    "name": "Slow Morocco",
    "url": "https://www.slowmorocco.com",
  },
  "offers": {
    "@type": "Offer",
    "price": "450",
    "priceCurrency": "EUR",
    "description": "A persona, minimo 2 partecipanti. Autista privato e 2 notti di alloggio incluse.",
    "availability": "https://schema.org/InStock",
  },
  "itinerary": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Giorno 1: Marrakech a Ouarzazate via Tizi n'Tichka e Aït Benhaddou",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Giorno 2: Ouarzazate attraverso la Valle del Draa fino a Merzouga",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Giorno 3: Alba sulle dune di Erg Chebbi, ritorno a Marrakech",
      },
    ],
  },
  "touristType": "Cultural Tourism",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "4",
    "bestRating": "5",
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Angela A." },
      "reviewBody": "Un'introduzione brillante al Marocco. Ben organizzato e curato. Non avrei potuto desiderare un'introduzione migliore.",
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Rhonda" },
      "reviewBody": "Il deserto è stato indimenticabile. Tantissimi dettagli curati oltre ogni aspettativa.",
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
    },
  ],
  "mainEntityOfPage": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Quanto dista Merzouga da Marrakech?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Merzouga si trova a circa 550 chilometri da Marrakech — circa 9 ore di strada. Non è un'escursione di un giorno. Chi propone il Sahara come gita giornaliera da Marrakech sta in realtà vendendo l'altopiano di Agafay, un deserto roccioso fuori città.",
        },
      },
      {
        "@type": "Question",
        "name": "Qual è il periodo migliore per un tour nel deserto del Sahara da Marrakech?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Da ottobre ad aprile. Il deserto in estate raggiunge i 45°C — poco piacevole. Primavera e autunno offrono le condizioni migliori. Ottobre coincide con la raccolta dei datteri nella Valle del Draa.",
        },
      },
      {
        "@type": "Question",
        "name": "È un tour privato o di gruppo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Privato. Il vostro veicolo, il vostro autista, i vostri tempi. Nessun minibus condiviso, nessuna fermata fissa nei negozi turistici.",
        },
      },
      {
        "@type": "Question",
        "name": "Cosa è incluso nel prezzo del tour di 3 giorni nel Sahara?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Autista privato per tre giorni, due notti di alloggio (Ouarzazate e un campo nel deserto a Merzouga) e tutti i trasferimenti. I pasti non sono inclusi.",
        },
      },
    ],
  },
};

export default function SaharaLandingPageIT() {
  return (
    <>
      <Script
        id="sahara-jsonld-it"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SaharaLandingContentIT />
    </>
  );
}
