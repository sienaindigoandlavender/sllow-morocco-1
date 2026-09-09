"use client";

/* ═══════════════════════════════════════════════════════════════
   VISITED — one line at the foot of a place page.

   Not a button with a border and an icon. A line of text that
   changes when you click it, in the same register as everything
   else on the page.

   Before:  I have been here
   After:   You have been here · undo
   ═══════════════════════════════════════════════════════════════ */

import { useEffect, useState } from "react";
import { has, toggle } from "@/lib/visited";

export default function Visited({ slug }: { slug: string }) {
  const [on, setOn] = useState<boolean | null>(null);

  useEffect(() => setOn(has(slug)), [slug]);

  if (on === null) return null;   // nothing until localStorage has answered

  return (
    <p className="text-sm">
      {on ? (
        <>
          <span className="text-foreground/70">You have been here.</span>{" "}
          <button
            onClick={() => setOn(toggle(slug))}
            className="text-foreground/40 hover:text-foreground/70 underline underline-offset-2 transition-colors"
          >
            undo
          </button>
        </>
      ) : (
        <button
          onClick={() => setOn(toggle(slug))}
          className="text-foreground/50 hover:text-foreground underline underline-offset-2 transition-colors"
        >
          I have been here
        </button>
      )}
    </p>
  );
}
