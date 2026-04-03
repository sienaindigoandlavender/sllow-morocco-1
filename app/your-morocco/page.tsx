"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────────────────────

interface City {
  name: string;
  why: string;
}

interface Orientation {
  headline: string;
  honest_note: string;
  geographic_logic: string;
  cities: City[];
  the_one_thing: string;
  watch_out: string;
}

// ── Main component ────────────────────────────────────────────────────────────

function YourMoroccoContent() {
  const params = useSearchParams();
  const [orientation, setOrientation] = useState<Orientation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Read URL params — handle both plain strings and Tally array format
  const clean = (val: string | null): string => {
    if (!val) return "";
    // Tally sometimes passes ["value"] — strip brackets and quotes
    return val.replace(/^\["|"\]$/g, "").replace(/^"|"$/g, "").trim();
  };

  const time       = clean(params.get("time"));
  const experience = clean(params.get("experience"));
  const interest   = clean(params.get("interest"));
  const pace       = clean(params.get("pace"));
  const fear       = clean(params.get("fear"));

  const hasAnswers = time || experience || interest;

  useEffect(() => {
    if (!hasAnswers) {
      setLoading(false);
      return;
    }

    async function generate() {
      try {
        const res = await fetch("/api/orientation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ time, experience, interest, pace, fear }),
        });
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        setOrientation(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    generate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Loading ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/40 mb-4">
            Slow Morocco
          </p>
          <p className="font-serif text-foreground/60 text-lg">
            Building your orientation…
          </p>
        </div>
      </div>
    );
  }

  // ── No params — redirect to form ────────────────────────────────────────────
  if (!hasAnswers) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/40 mb-6">
            Slow Morocco
          </p>
          <h1 className="font-serif text-3xl text-foreground mb-4">
            Start here first.
          </h1>
          <p className="text-sm text-foreground/50 leading-relaxed mb-8">
            Answer five questions and we'll build a Morocco orientation specific to your trip.
          </p>
          <a
            href="https://tally.so/r/aQG8W9"
            className="inline-block px-8 py-3 border border-foreground text-sm tracking-[0.15em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            Begin
          </a>
        </div>
      </div>
    );
  }

  // ── Error ───────────────────────────────────────────────────────────────────
  if (error || !orientation) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="font-serif text-foreground/60 text-lg mb-6">
            Something went wrong generating your orientation.
          </p>
          <a
            href="https://tally.so/r/aQG8W9"
            className="text-[11px] tracking-[0.2em] uppercase text-foreground/40 hover:text-foreground transition-colors border-b border-foreground/15 hover:border-foreground/40 pb-0.5"
          >
            Try again →
          </a>
        </div>
      </div>
    );
  }

  // ── Result ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <div className="px-6 md:px-10 lg:px-14 pt-16 pb-12 border-b border-foreground/[0.08]">
        <Link
          href="/"
          className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors mb-8 block"
        >
          ← Slow Morocco
        </Link>
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
          Your Morocco orientation
        </p>
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-[1.2] max-w-2xl">
          {orientation.headline}
        </h1>
      </div>

      {/* Content */}
      <div className="px-6 md:px-10 lg:px-14 py-16 max-w-3xl">

        {/* Before you plan anything */}
        <div className="mb-16">
          <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-4">
            Before you plan anything
          </p>
          <p className="font-serif text-xl md:text-2xl text-foreground leading-relaxed">
            {orientation.honest_note}
          </p>
        </div>

        {/* Geographic logic */}
        <div className="mb-16 pt-12 border-t border-foreground/[0.08]">
          <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-4">
            The geographic logic
          </p>
          <p className="text-base text-foreground/70 leading-relaxed mb-6">
            {orientation.geographic_logic}
          </p>
          <div className="flex flex-wrap gap-2">
            {orientation.cities.map((city) => (
              <span
                key={city.name}
                className="text-[11px] tracking-[0.1em] uppercase px-3 py-1.5 border border-foreground/15 text-foreground/50"
              >
                {city.name}
              </span>
            ))}
          </div>
        </div>

        {/* City by city */}
        <div className="mb-16 pt-12 border-t border-foreground/[0.08]">
          <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-8">
            City by city
          </p>
          <div className="space-y-8">
            {orientation.cities.map((city) => (
              <div key={city.name} className="flex gap-6">
                <div className="w-24 flex-shrink-0">
                  <p className="text-[11px] tracking-[0.1em] uppercase text-foreground/40 pt-0.5">
                    {city.name}
                  </p>
                </div>
                <p className="text-base text-foreground/70 leading-relaxed">
                  {city.why}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* The one thing */}
        <div className="mb-16 pt-12 border-t border-foreground/[0.08]">
          <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-4">
            The one thing
          </p>
          <p className="font-serif text-xl md:text-2xl text-foreground leading-relaxed">
            {orientation.the_one_thing}
          </p>
        </div>

        {/* Watch out */}
        <div className="mb-16 pt-12 border-t border-foreground/[0.08]">
          <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-4">
            Watch out for this
          </p>
          <p className="text-base text-foreground/60 leading-relaxed">
            {orientation.watch_out}
          </p>
        </div>

        {/* CTA — itinerary generator */}
        <div className="pt-12 border-t border-foreground/[0.08]">
          <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-4">
            Next step
          </p>
          <h2 className="font-serif text-2xl text-foreground mb-4">
            Build your itinerary.
          </h2>
          <p className="text-sm text-foreground/50 leading-relaxed mb-8 max-w-lg">
            Now that you have the framework, let us sequence your days — places, context, and the thread connecting them.
          </p>
          <Link
            href="/start-here#itinerary"
            className="inline-block px-8 py-3 border border-foreground text-sm tracking-[0.15em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            Build my itinerary →
          </Link>
        </div>

      </div>

      {/* Footer nudge */}
      <div className="px-6 md:px-10 lg:px-14 py-12 border-t border-foreground/[0.08]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-sm text-foreground/40">
            Morocco, understood.
          </p>
          <a
            href="https://tally.so/r/aQG8W9"
            className="text-[11px] tracking-[0.2em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors"
          >
            Answer differently →
          </a>
        </div>
      </div>

    </div>
  );
}

// ── Export with Suspense (required for useSearchParams) ────────────────────────

export default function YourMoroccoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-serif text-foreground/40">Loading…</p>
      </div>
    }>
      <YourMoroccoContent />
    </Suspense>
  );
}
