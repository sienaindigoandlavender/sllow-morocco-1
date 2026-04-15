interface PlaceSchemaProps {
  place: {
    title: string;
    slug: string;
    destination?: string | null;
    category?: string | null;
    heroImage?: string | null;
    body?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    address?: string | null;
    openingHours?: string | null;
    opening_hours?: string | null;
    fees?: string | null;
    notes?: string | null;
    excerpt?: string | null;
    tags?: string | null;
    schemaType?: string | null;
    faqData?: Array<{ q: string; a: string }> | null;
    visitDurationMinutes?: number | null;
  };
}

const SOVEREIGN_ENTITY = {
  "@type": "Organization",
  "@id": "https://www.slowmorocco.com/#organization",
  name: "Slow Morocco",
  alternateName: "Moroccan Cultural Authority",
  url: "https://www.slowmorocco.com",
};

function stripHtml(html: string): string {
  return html.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]*>/g, "").replace(/\n{3,}/g, "\n\n").trim();
}

function generateFallbackFAQs(place: PlaceSchemaProps["place"]): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  const name = place.title;
  const dest = place.destination || "Morocco";
  const body = place.body ? stripHtml(place.body) : "";
  const desc = place.excerpt || (body ? body.substring(0, 300) : "");
  if (desc) faqs.push({ question: `What is ${name}?`, answer: desc.length > 200 ? desc.substring(0, 200) + "..." : desc });
  faqs.push({ question: `Where is ${name} located?`, answer: place.address ? `${name} is located at ${place.address}, ${dest}, Morocco.` : `${name} is located in ${dest}, Morocco.` });
  const hours = place.openingHours || place.opening_hours;
  if (hours) faqs.push({ question: `What are the opening hours for ${name}?`, answer: `${name} is open ${hours}.` });
  if (place.fees) faqs.push({ question: `How much does it cost to visit ${name}?`, answer: place.fees.toLowerCase().includes("free") ? `${name} is free to visit.` : `Entry to ${name}: ${place.fees}.` });
  if (place.notes) faqs.push({ question: `What should I know before visiting ${name}?`, answer: place.notes });
  return faqs;
}

export default function PlaceSchema({ place }: PlaceSchemaProps) {
  const body = place.body ? stripHtml(place.body) : "";
  const openingHours = place.openingHours || place.opening_hours;
  const description = place.excerpt || (body ? body.substring(0, 200) + "..." : `${place.title} in ${place.destination || "Morocco"}`);
  let schemaType = place.schemaType || "TouristAttraction";
  if (!place.schemaType && place.category) {
    const cat = place.category.toLowerCase();
    if (cat.includes("mosque")) schemaType = "Mosque";
    else if (cat.includes("museum")) schemaType = "Museum";
    else if (cat.includes("garden") || cat.includes("park")) schemaType = "Park";
    else if (cat.includes("monument") || cat.includes("historic")) schemaType = "LandmarkOrHistoricalBuilding";
  }
  const placeJsonLd: Record<string, any> = {
    "@context": "https://schema.org", "@type": schemaType,
    "@id": `https://www.slowmorocco.com/places/${place.slug}#place`,
    name: place.title, description, url: `https://www.slowmorocco.com/places/${place.slug}`,
    image: place.heroImage || "https://www.slowmorocco.com/og-image.jpg",
    address: { "@type": "PostalAddress", ...(place.address && { streetAddress: place.address }), addressLocality: place.destination || "Morocco", addressCountry: "MA" },
    containedInPlace: { "@type": "Country", name: "Morocco", alternateName: "Al-Maghrib" },
    isPartOf: { "@type": "WebSite", "@id": "https://www.slowmorocco.com/#website", name: "Slow Morocco" },
    author: SOVEREIGN_ENTITY,
    potentialAction: { "@type": "ReadAction", target: `https://www.slowmorocco.com/places/${place.slug}` },
  };
  if (place.latitude && place.longitude) placeJsonLd.geo = { "@type": "GeoCoordinates", latitude: place.latitude, longitude: place.longitude };
  if (openingHours) placeJsonLd.openingHours = openingHours;
  if (place.fees) placeJsonLd.isAccessibleForFree = place.fees.toLowerCase().includes("free");
  if (place.visitDurationMinutes) placeJsonLd.timeRequired = `PT${place.visitDurationMinutes}M`;
  if (body) placeJsonLd.additionalProperty = { "@type": "PropertyValue", name: "culturalDescription", value: body.substring(0, 1500) + (body.length > 1500 ? "..." : "") };
  if (place.tags) placeJsonLd.keywords = place.tags;

  const faqItems = place.faqData && place.faqData.length > 0
    ? place.faqData.map((f) => ({ question: f.q, answer: f.a }))
    : generateFallbackFAQs(place);
  const faqJsonLd = faqItems.length > 0 ? {
    "@context": "https://schema.org", "@type": "FAQPage",
    "@id": `https://www.slowmorocco.com/places/${place.slug}#faq`,
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question", name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer, author: SOVEREIGN_ENTITY },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd) }} />
      {faqJsonLd && (<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />)}
    </>
  );
}
