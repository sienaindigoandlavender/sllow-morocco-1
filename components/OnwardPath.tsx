import Link from "next/link";
import { cloudinaryUrl } from "@/lib/cloudinary";

/* The onward path — the rabbit hole.
 *
 * A collection is an ordered, ranked argument (see lib/collections.ts), so a
 * reader inside one has a sequence to follow, which is a stronger offer than a
 * pile of related links. When a story belongs to a collection — or the reader
 * arrived from one — the foot of the story offers the NEXT entry in that
 * collection, and at the end says so and points to another. Where there is no
 * collection, the flat prev/next archive walk carries on instead.
 */

export interface OnwardStory {
  slug: string;
  title: string;
  subtitle?: string | null;
  heroImage?: string | null;
}

interface Props {
  /** Collection title, e.g. "Al-Andalus". */
  label: string;
  /** Collection slug, for the "whole collection" link and the ?from tag. */
  slug: string;
  /** The next story in the sequence, or null at the end. */
  next?: OnwardStory | null;
}

export default function OnwardPath({ label, slug, next }: Props) {
  // End of the collection — a reader who finished something should be told.
  if (!next) {
    return (
      <section className="py-16 md:py-20 border-t border-foreground/10">
        <div className="max-w-3xl mx-auto px-8 md:px-12 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-foreground/40 mb-3">
            End of {label}
          </p>
          <Link
            href="/collections"
            className="font-serif text-xl md:text-2xl text-foreground/80 hover:text-foreground transition-colors"
          >
            Start another collection{" "}
            <span style={{ color: "#E3120B" }}>→</span>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 border-t border-foreground/10">
      <div className="max-w-3xl mx-auto px-8 md:px-12">
        <div className="flex items-baseline justify-between mb-8">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#E3120B]">
            Next in {label}
          </p>
          <Link
            href={`/collections/${slug}`}
            className="text-[10px] tracking-[0.15em] uppercase text-foreground/35 hover:text-foreground transition-colors"
          >
            The whole collection →
          </Link>
        </div>

        <Link
          href={`/stories/${next.slug}?from=${slug}`}
          className="group flex gap-6 md:gap-10 items-start"
        >
          {next.heroImage && (
            <div className="w-[120px] md:w-[200px] shrink-0 aspect-square relative overflow-hidden bg-[#e8e6e1]">
              <img
                src={cloudinaryUrl(next.heroImage, 400)}
                alt={next.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />
            </div>
          )}
          <div className="flex-1 min-w-0 pt-1">
            <h2 className="font-serif text-[clamp(1.3rem,3vw,2.2rem)] text-foreground leading-[1.15] group-hover:text-foreground/55 transition-colors">
              {next.title}
            </h2>
            {next.subtitle && (
              <p className="text-[14px] text-foreground/50 leading-[1.5] mt-2">
                {next.subtitle}
              </p>
            )}
          </div>
        </Link>
      </div>
    </section>
  );
}
