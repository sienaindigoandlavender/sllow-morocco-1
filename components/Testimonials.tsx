import type { ReactNode } from "react";

/**
 * Testimonials — the ONE place transformation may be STATED, because it is the
 * traveller's own voice, not ours. Black Tomato surfaces these prominently; ours
 * were fetched but never rendered. Centered pull-quotes, serif, quiet attribution.
 */

type Testimonial = { id: string; quote: string; author: string; journeyTitle?: string };

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="px-6 md:px-10 lg:px-14 py-24 md:py-36 border-t border-[#0a0a0a]/[0.08]">
      <div className="max-w-5xl mx-auto">
        

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-16 md:gap-y-24">
          {testimonials.slice(0, 6).map((t) => (
            <figure key={t.id} className="text-center md:text-left">
              <blockquote className="text-[clamp(1.15rem,2.2vw,1.6rem)] font-light leading-[1.4] tracking-[-0.01em] text-[#0a0a0a]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-[11px] tracking-[0.14em] uppercase text-[#0a0a0a]/45">
                {t.author}
                {t.journeyTitle ? <span className="text-[#0a0a0a]/30"> · {t.journeyTitle}</span> : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
