import Link from "next/link";

/**
 * OdysseyJourneyCTA — a reusable call-to-action linking to the 21-day
 * Odyssey journey. Drop it at the foot of any film / Ouarzazate / Aït Ben
 * Haddou page whose readers are the film-pilgrimage audience, so the traffic
 * has a path to the journey it's dreaming of.
 */
export default function OdysseyJourneyCTA() {
  return (
    <div className="mt-20 pt-12 border-t border-foreground/10">
      <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
        Walk the whole of it
      </p>
      <p className="text-sm text-foreground/65 leading-relaxed mb-8 max-w-2xl">
        We&apos;ve built the full crossing — Troy to Ogygia, Marrakech to
        Dakhla, all four Moroccan landscapes Nolan filmed <em>The Odyssey</em>{" "}
        across and every stretch of country between them, taken in twenty-one
        days at the pace the map actually demands. The whole road, to the white
        dune at the far edge of the country.
      </p>
      <Link
        href="/journeys/the-odyssey"
        className="group inline-flex items-center gap-4 bg-[#1FA3A3] text-white px-8 py-5 hover:bg-[#188a8a] transition-colors"
      >
        <span className="flex flex-col">
          <span className="text-[10px] tracking-[0.25em] uppercase opacity-70">
            The journey · 21 days
          </span>
          <span className="text-lg tracking-[-0.01em] font-medium">
            The Odyssey — Marrakech to Dakhla
          </span>
        </span>
        <span className="text-xl transition-transform group-hover:translate-x-1">
          →
        </span>
      </Link>
    </div>
  );
}
