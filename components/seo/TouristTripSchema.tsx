interface TouristTripSchemaProps {
  journey: {
    title: string;
    slug: string;
    description: string;
    heroImage?: string;
    durationDays: number;
    duration: string;
    startCity: string;
    destinations?: string;
    price?: number;
    epicPrice?: number;
  };
}

export default function TouristTripSchema({ journey }: TouristTripSchemaProps) {
  const price = journey.epicPrice || journey.price;
  const destinations = journey.destinations?.split(",").map((d) => d.trim()).filter(Boolean) || [];

  const jsonLd: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: journey.title,
    description: journey.description,
    url: `https://www.slowmorocco.com/journeys/${journey.slug}`,
    image: journey.heroImage || "https://www.slowmorocco.com/og-image.jpg",
    touristType: ["Cultural tourism", "Luxury travel", "Adventure travel"],
    provider: {
      "@type": "TravelAgency",
      name: "Slow Morocco",
      url: "https://www.slowmorocco.com",
      email: "hello@slowmorocco.com",
    },
    duration: `P${journey.durationDays}D`,
  };

  // Itinerary — ListItem requires an `item` property, not just `name`
  if (destinations.length > 0) {
    jsonLd.itinerary = {
      "@type": "ItemList",
      numberOfItems: destinations.length,
      itemListElement: destinations.map((dest, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Place",
          name: dest,
          address: {
            "@type": "PostalAddress",
            addressCountry: "MA",
          },
        },
      })),
    };
  }

  // Offers — only if price exists and is > 0
  if (price && price > 0) {
    jsonLd.offers = {
      "@type": "Offer",
      price: String(price),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `https://www.slowmorocco.com/journeys/${journey.slug}`,
      seller: {
        "@type": "TravelAgency",
        name: "Slow Morocco",
        url: "https://www.slowmorocco.com",
      },
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
