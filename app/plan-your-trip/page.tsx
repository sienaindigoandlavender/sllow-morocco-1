import type { Metadata } from "next";
import { getJourneys, getJourneyBySlug, getPlaceBySlug } from "@/lib/supabase";
import PlanYourTripForm from "@/components/PlanYourTripForm";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Plan a private journey",
  description: "Tell us how you want to move through Morocco. Private, and shaped to the traveller.",
  alternates: { canonical: "https://www.slowmorocco.com/plan-your-trip" },
  openGraph: {
    title: "Plan a private journey | Slow Morocco",
    description: "Tell us how you want to move through Morocco. Private, and shaped to the traveller.",
    url: "https://www.slowmorocco.com/plan-your-trip",
  },
};

// Using searchParams opts this page into dynamic rendering; revalidate is
// intentionally not set so each inquiry context renders fresh.

export default async function PlanYourTripPage({
  searchParams,
}: {
  searchParams: Promise<{ journey?: string; place?: string }>;
}) {
  const { journey: journeyParam, place: placeParam } = await searchParams;

  let journeys: { slug: string; title: string }[] = [];

  try {
    const allJourneys = await getJourneys({ published: true });
    journeys = allJourneys.map((j) => ({
      slug: j.slug || "",
      title: j.title || "",
    }));
  } catch (err) {
    console.error("Failed to load journeys for plan-your-trip:", err);
  }

  // Resolve context from query params. Unknown or missing slugs silently
  // fall through to the generic version (no error, no caption, no prefill).
  let contextCaption: string | null = null;
  let initialJourneySlug = "";

  if (journeyParam) {
    try {
      const j = await getJourneyBySlug(journeyParam);
      if (j?.title) {
        contextCaption = `about ${j.title}`;
        initialJourneySlug = j.slug || "";
      }
    } catch {
      // ignore — render generic
    }
  } else if (placeParam) {
    try {
      const p = await getPlaceBySlug(placeParam);
      if (p?.title) {
        contextCaption = `including ${p.title}`;
      }
    } catch {
      // ignore — render generic
    }
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Immersive Hero Banner */}
      <PageBanner
        slug="plan-your-trip"
        fallback={{
          title: "Plan a private journey",
          subtitle: "Tell us how you want to move through Morocco. Private, and shaped to the traveller.",
          label: "Begin the Conversation",
        }}
      />

      {/* Context caption — rendered only when a valid journey/place is prefilled.
          Sits between the banner and the form so it follows the title/subtitle
          regardless of whether the banner is fallback or CMS-driven. */}
      {contextCaption && (
        <section className="pt-10 md:pt-14">
          <div className="container mx-auto px-6 lg:px-16 max-w-2xl">
            <p className="text-xs tracking-[0.18em] uppercase text-foreground/50">
              {contextCaption}
            </p>
          </div>
        </section>
      )}

      {/* Form Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-16 max-w-2xl">
          <PlanYourTripForm
            journeys={journeys}
            siteId="slow-morocco"
            darkMode={false}
            initialJourney={initialJourneySlug}
          />
        </div>
      </section>
    </div>
  );
}
