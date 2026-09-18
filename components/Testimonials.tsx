"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Testimonials — the ONE place transformation may be STATED, because it is the
 * traveller's own voice, not ours. A quiet, stylish carousel: one voice at a
 * time, large serif, a gentle fade between them, thin line-arrows and dots.
 * House aesthetic — black on paper, a single signal-red accent, calm motion.
 * Auto-advances slowly; pauses on hover; respects reduced-motion.
 */

type Testimonial = { id: string; quote: string; author: string; journeyTitle?: string };

const RED = "#E3120B";

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const items = (testimonials || []).slice(0, 6);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = items.length;

  const go = useCallback((next: number) => setI((prev) => (next + n) % n), [n]);

  // Gentle auto-advance — 8s, paused on hover, disabled under reduced-motion.
  useEffect(() => {
    if (n <= 1 || paused) return;
    const reduce = typeof window !== "undefined"
      && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setInterval(() => setI((prev) => (prev + 1) % n), 8000);
    return () => clearInterval(t);
  }, [n, paused]);

  if (n === 0) return null;
  const t = items[i];

  return (
    <section
      className="px-6 md:px-10 lg:px-14 py-24 md:py-36 border-t border-[#0a0a0a]/[0.08]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="h-px w-8 bg-[#0a0a0a]/25" />
          <span className="text-[10px] tracking-[0.24em] uppercase text-[#0a0a0a]/45">In their words</span>
          <span className="h-px w-8 bg-[#0a0a0a]/25" />
        </div>

        {/* The quote — re-keyed so it fades in on change */}
        <figure key={t.id} className="ts-fade text-center min-h-[220px] md:min-h-[240px] flex flex-col justify-center">
          <blockquote className="font-serif font-light text-[clamp(1.4rem,3vw,2.1rem)] leading-[1.35] tracking-[-0.01em] text-[#0a0a0a]">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-7 text-[11px] tracking-[0.16em] uppercase text-[#0a0a0a]/50">
            {t.author}
            {t.journeyTitle ? <span className="text-[#0a0a0a]/30"> · {t.journeyTitle}</span> : null}
          </figcaption>
        </figure>

        {/* Controls */}
        {n > 1 && (
          <div className="mt-12 flex items-center justify-center gap-8">
            <button
              type="button"
              onClick={() => go(i - 1)}
              aria-label="Previous testimonial"
              className="group text-[#0a0a0a]/35 hover:text-[#0a0a0a] transition-colors"
            >
              <svg viewBox="0 0 44 16" className="w-8 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <line x1="43" y1="8" x2="2" y2="8" /><polyline points="9,1 2,8 9,15" />
              </svg>
            </button>

            <div className="flex items-center gap-2.5">
              {items.map((it, idx) => (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => setI(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  aria-current={idx === i}
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: idx === i ? 7 : 5,
                    height: idx === i ? 7 : 5,
                    background: idx === i ? RED : "rgba(10,10,10,0.2)",
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(i + 1)}
              aria-label="Next testimonial"
              className="group text-[#0a0a0a]/35 hover:text-[#0a0a0a] transition-colors"
            >
              <svg viewBox="0 0 44 16" className="w-8 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <line x1="1" y1="8" x2="42" y2="8" /><polyline points="35,1 42,8 35,15" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes ts-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .ts-fade { animation: ts-fade 0.6s ease-out; }
        @media (prefers-reduced-motion: reduce) { .ts-fade { animation: none; } }
      `}</style>
    </section>
  );
}
