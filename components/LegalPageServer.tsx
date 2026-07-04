import {
  getNexusLegalPage,
  getNexusSite,
  resolveVariables,
} from "@/lib/nexus";

// Server-rendered replacement for LegalPageContent.
//
// WHY: the old component was "use client" and fetched /api/legal in a
// useEffect. Googlebot rendered the page, saw only the loading skeleton
// (or the "currently being updated" error state), and classified
// /privacy, /booking-conditions, /cancellations-and-refunds and
// /payments as Soft 404s in Search Console. Rendering the sections on
// the server means the HTML Google receives IS the legal text.
//
// Revalidated hourly — legal copy does not change often.

export const revalidate = 3600;

interface LegalPageServerProps {
  pageId: string;
  fallbackTitle: string;
}

export default async function LegalPageServer({
  pageId,
  fallbackTitle,
}: LegalPageServerProps) {
  let title = fallbackTitle;
  let sections: Awaited<ReturnType<typeof getNexusLegalPage>> = [];

  try {
    const [rawSections, site] = await Promise.all([
      getNexusLegalPage(pageId),
      getNexusSite(),
    ]);
    sections = rawSections.map((s) => ({
      ...s,
      section_content: site
        ? resolveVariables(s.section_content, site)
        : s.section_content,
    }));
    if (sections.length > 0) {
      title = sections[0].page_title || fallbackTitle;
    }
  } catch {
    sections = [];
  }

  if (sections.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground pt-32 pb-24">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-8">
            {fallbackTitle}
          </h1>
          <p className="text-foreground/60">
            This page is currently being updated. Please check back shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-24">
      <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
        <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-8">
          {title}
        </h1>

        <div className="space-y-8">
          {sections.map((section, i) => (
            <section key={i}>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                {section.section_title}
              </h2>
              <div className="text-foreground/70 leading-relaxed whitespace-pre-line">
                {section.section_content}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
