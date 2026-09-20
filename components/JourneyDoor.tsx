import Link from "next/link";
import NewsletterCapture from "@/components/NewsletterCapture";

/* The two doors, for pages that had none.
 *
 * The paid door — "Plan your trip" — leads to the €300 deposit flow, the
 * only way to reach us. The soft door — the newsletter — catches the warm
 * reader who is not ready to wire a deposit to a stranger today, and holds
 * them on The Letter until they come back on their own. No manual inbox,
 * no begging: one door that reaches us, one that doesn't.
 */
export default function JourneyDoor({
  planHref = "/plan-your-trip",
}: {
  planHref?: string;
}) {
  return (
    <section className="border-t border-foreground/[0.08] pt-14 md:pt-20 mt-6 space-y-14 md:space-y-16">
      {/* The journey — the paid door */}
      <div className="max-w-2xl">
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/50 mb-4">
          Travel this
        </p>
        <p className="font-serif text-[clamp(1.4rem,3vw,2rem)] font-light leading-[1.25] text-foreground mb-6">
          When reading is no longer enough, we take you &mdash; privately, down
          the slow roads, with the people who wrote all of this.
        </p>
        <Link
          href={planHref}
          className="inline-block border border-foreground px-9 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-colors"
        >
          Plan your trip &rarr;
        </Link>
      </div>

      {/* The letter — the soft door */}
      <NewsletterCapture />
    </section>
  );
}
