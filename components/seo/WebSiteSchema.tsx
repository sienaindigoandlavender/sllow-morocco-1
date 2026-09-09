export default function WebSiteSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.slowmorocco.com/#website",
    name: "Slow Morocco",
    /* This used to read "Private Cultural Journeys" and describe the
       site as a tour operator. It is a publication, and this is the
       one place Google reads for what the site actually is. */
    alternateName: "Morocco, decoded",
    url: "https://www.slowmorocco.com",
    description:
      "A cultural archive of Morocco: the architecture, the food, the water, the crafts and the history, documented and sourced.",
    publisher: {
      "@type": "Organization",
      "@id": "https://www.slowmorocco.com/#organization",
      name: "Slow Morocco",
      parentOrganization: {
        "@type": "Organization",
        name: "Dance with Lions",
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        /* Was /glossary?q=, which has no search handler — Google
           crawled the template literally and logged a 404. */
        urlTemplate: "https://www.slowmorocco.com/stories?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
