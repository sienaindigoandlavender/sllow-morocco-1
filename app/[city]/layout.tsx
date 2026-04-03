import { getDestinationBySlug } from "@/lib/supabase";

const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  marrakech:   { lat: 31.6295, lng: -7.9811 },
  fes:         { lat: 34.0331, lng: -4.9998 },
  tangier:     { lat: 35.7595, lng: -5.8128 },
  rabat:       { lat: 34.0209, lng: -6.8498 },
  essaouira:   { lat: 31.5085, lng: -9.7595 },
  casablanca:  { lat: 33.5731, lng: -7.5898 },
  meknes:      { lat: 33.8935, lng: -5.5548 },
  ouarzazate:  { lat: 30.9189, lng: -6.9063 },
  agadir:      { lat: 30.4278, lng: -9.5981 },
  dakhla:      { lat: 23.6848, lng: -15.9329 },
  chefchaouen: { lat: 35.1688, lng: -5.2636 },
};

export default async function CityGuideLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { city: string };
}) {
  const destination = await getDestinationBySlug(params.city);
  const coords = CITY_COORDS[params.city];
  const BASE_URL = "https://www.slowmorocco.com";

  const citySchema = destination && coords ? {
    "@context": "https://schema.org",
    "@type": "City",
    "name": destination.title,
    "description": destination.excerpt || undefined,
    "image": destination.hero_image || undefined,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": coords.lat,
      "longitude": coords.lng,
    },
    "containedInPlace": {
      "@type": "Country",
      "name": "Morocco",
      "sameAs": "https://www.wikidata.org/wiki/Q1028",
    },
    "url": `${BASE_URL}/${params.city}`,
  } : null;

  const webPageSchema = destination ? {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${destination.title} Guide — Slow Morocco`,
    "description": destination.excerpt || undefined,
    "url": `${BASE_URL}/${params.city}`,
    "publisher": {
      "@type": "Organization",
      "name": "Slow Morocco",
      "sameAs": [
        "https://www.slowmorocco.com",
        "https://www.dancingwiththelions.com",
      ],
    },
    "about": {
      "@type": "City",
      "name": destination.title,
      "containedInPlace": {
        "@type": "Country",
        "name": "Morocco",
      },
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Slow Morocco",
          "item": BASE_URL,
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": destination.title,
          "item": `${BASE_URL}/${params.city}`,
        },
      ],
    },
  } : null;

  return (
    <>
      {citySchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema) }}
        />
      )}
      {webPageSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        />
      )}
      {children}
    </>
  );
}
