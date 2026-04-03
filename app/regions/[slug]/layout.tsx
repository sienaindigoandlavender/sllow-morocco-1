import { getRegions } from "@/lib/supabase";

const BASE_URL = "https://www.slowmorocco.com";

export default async function RegionLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const regions = await getRegions();
  const region = regions.find((r) => r.slug === params.slug);

  const schema = region ? {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${region.title} — Morocco`,
    "description": region.description || region.subtitle || undefined,
    "url": `${BASE_URL}/regions/${params.slug}`,
    "publisher": {
      "@type": "Organization",
      "name": "Slow Morocco",
      "sameAs": [BASE_URL, "https://www.dancingwiththelions.com"],
    },
    "about": {
      "@type": "Place",
      "name": region.title,
      "containedInPlace": {
        "@type": "Country",
        "name": "Morocco",
      },
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Regions", "item": `${BASE_URL}/regions` },
        { "@type": "ListItem", "position": 3, "name": region.title, "item": `${BASE_URL}/regions/${params.slug}` },
      ],
    },
  } : null;

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      {children}
    </>
  );
}
