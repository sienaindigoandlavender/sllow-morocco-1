export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Slow Morocco",
    description: "Thoughtful private journeys across Morocco — designed for travellers who prefer depth over speed.",
    url: "https://www.slowmorocco.com",
    email: "hello@slowmorocco.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Marrakech",
      addressCountry: "MA",
    },
    areaServed: {
      "@type": "Country",
      name: "Morocco",
    },
    image: "https://res.cloudinary.com/drstfu5yr/image/upload/v1735000000/slow-morocco-og.jpg",
    priceRange: "€€€",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Morocco Private Journeys",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "Imperial Cities of Morocco",
            description: "Private journey through Fes, Meknes, and Rabat — Morocco's intellectual and spiritual capitals.",
            url: "https://www.slowmorocco.com/journeys",
            touristType: ["Cultural tourism", "Heritage travel"],
            provider: {
              "@type": "TravelAgency",
              name: "Slow Morocco",
              url: "https://www.slowmorocco.com",
            },
            duration: "P5D",
            offers: {
              "@type": "Offer",
              price: "1800",
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "Sahara Desert Explorer",
            description: "Private journey to the Erg Chebbi dunes of Merzouga via the Draa Valley.",
            url: "https://www.slowmorocco.com/sahara-tour-from-marrakech",
            touristType: ["Adventure travel", "Nature tourism"],
            provider: {
              "@type": "TravelAgency",
              name: "Slow Morocco",
              url: "https://www.slowmorocco.com",
            },
            duration: "P3D",
            offers: {
              "@type": "Offer",
              price: "900",
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "High Atlas Mountains",
            description: "Trekking through Berber villages and high passes of the Moroccan Atlas.",
            url: "https://www.slowmorocco.com/journeys",
            touristType: ["Adventure travel", "Cultural tourism"],
            provider: {
              "@type": "TravelAgency",
              name: "Slow Morocco",
              url: "https://www.slowmorocco.com",
            },
            duration: "P4D",
            offers: {
              "@type": "Offer",
              price: "1200",
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
            },
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
