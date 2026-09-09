"use client";

/* ═══════════════════════════════════════════════════════════════
   VISITED TALLY — progress, stated once, without ceremony.

   No progress bar, no percentage ring, no badge, no streak. A
   sentence that says how many, and disappears entirely at zero so
   a first-time reader is never shown an empty scoreboard.
   ═══════════════════════════════════════════════════════════════ */

import { useEffect, useState } from "react";
import { countIn } from "@/lib/visited";

interface Props {
  /** Every place slug in scope — a city, or the whole atlas. */
  slugs: string[];
  /** "in Marrakech", "in the atlas". Reads after the number. */
  label?: string;
}

export default function VisitedTally({ slugs, label }: Props) {
  const [n, setN] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setN(countIn(slugs));
    tick();
    window.addEventListener("sm:visited", tick);
    return () => window.removeEventListener("sm:visited", tick);
  }, [slugs]);

  if (n === null || n === 0) return null;

  return (
    <p className="text-[11px] tracking-[0.14em] uppercase text-foreground/50">
      {n} of {slugs.length} {label ?? "visited"}
    </p>
  );
}
