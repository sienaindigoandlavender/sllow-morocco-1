import Link from "next/link";

/**
 * RelatedJourneyCTA — a "Related Journeys" block for the foot of film /
 * location articles. Pass one or more journeys; each renders as a card that
 * links to the journey page, so the film-pilgrimage traffic has a clear path
 * to the journey it is dreaming of.
 */

export type RelatedJourney = {
  slug: string;
  kicker: string;   // e.g. "The journey · 21 days"
  title: string;    // e.g. "The Odyssey — Marrakech to Dakhla"
  blurb: string;    // one line
  accent?: string;  // hex, defaults to turquoise
};

// Ready-made journeys to pass in.
export const ODYSSEY_JOURNEY: RelatedJourney = {
  slug: "the-odyssey",
  kicker: "The epic · 21 days",
  title: "The Odyssey — Marrakech to Dakhla",
  blurb: "The full crossing: Troy to Ogygia, all four film landscapes and the whole country between them.",
  accent: "#1FA3A3",
};

export const FILM_ROUTE_JOURNEY: RelatedJourney = {
  slug: "morocco-film-locations-7-days",
  kicker: "The film route · 7 days",
  title: "Morocco Film Locations",
  blurb: "The northern film cluster in a week — the kasbahs, the coast, the studios where the ancient world gets built.",
  accent: "#8B2635",
};

export default function RelatedJourneyCTA({
  journeys,
  heading = "Journeys",
}: {
  journeys: RelatedJourney[];
  heading?: string;
}) {
  return (
    <div className="mt-20 pt-12 border-t border-foreground/10">
      <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-6">
        {heading}
      </p>
      <div className="flex flex-col gap-4">
        {journeys.map((j) => (
          <Link
            key={j.slug}
            href={`/journeys/${j.slug}`}
            className="group flex items-center justify-between gap-6 p-6 border border-foreground/12 hover:border-foreground/30 transition-colors"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className="text-[10px] tracking-[0.25em] uppercase"
                style={{ color: j.accent || "#1FA3A3" }}
              >
                {j.kicker}
              </span>
              <span className="text-lg tracking-[-0.01em] text-foreground">
                {j.title}
              </span>
              <span className="text-sm text-foreground/55 leading-relaxed max-w-xl">
                {j.blurb}
              </span>
            </div>
            <span
              className="text-xl shrink-0 transition-transform group-hover:translate-x-1"
              style={{ color: j.accent || "#1FA3A3" }}
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
