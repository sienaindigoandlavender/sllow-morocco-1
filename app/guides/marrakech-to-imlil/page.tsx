import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGuide } from "@/lib/guides";
import GuideArticle from "@/components/GuideArticle";

// One static wrapper per guide. To add another: copy this file into
// app/guides/<new-slug>/page.tsx, change SLUG, and add the matching entry
// to lib/guides.ts. No bracket folders, no dynamic params.
const SLUG = "marrakech-to-imlil";
const guide = getGuide(SLUG);

export const metadata: Metadata = guide
  ? {
      title: guide.title,
      description: guide.metaDescription,
      // Private guest guide — kept out of search and off the AI crawlers on purpose.
      robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false },
      },
      openGraph: { title: guide.title, description: guide.metaDescription, type: "article" },
    }
  : { title: "Guide", robots: { index: false, follow: false } };

export default function Page() {
  if (!guide) notFound();
  return <GuideArticle guide={guide} />;
}
