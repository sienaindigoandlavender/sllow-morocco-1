"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ── Itinerary generator state ─────────────────────────────────────────────────

interface ItineraryDay {
  dayNumber: number;
  cityName: string;
  fromCity: string;
  toCity: string;
  description: string;
  imageUrl: string;
  travelTime: string;
  difficulty: string;
  activities: string;
  meals: string;
  routeType: string;
  dayTitle?: string;
  highlights?: string;
}

interface Itinerary {
  summary: string;
  days: ItineraryDay[];
}

type Step = 0 | 1 | 2 | 3 | 4;

export default function StartHereContent() {
  const [section, setSection] = useState<"orientation" | "itinerary">("orientation");
  const [tallyLoaded, setTallyLoaded] = useState(false);

  // Itinerary generator state
  const [step, setStep] = useState<Step>(0);
  const [duration, setDuration] = useState<string | null>(null);
  const [cities, setCities] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [pace, setPace] = useState<string | null>(null);
  const [season, setSeason] = useState<string | null>(null);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState(false);

  // Load Tally embed script
  useEffect(() => {
    if (tallyLoaded) return;
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    script.onload = () => setTallyLoaded(true);
    document.head.appendChild(script);
  }, [tallyLoaded]);

  // ── Itinerary helpers ───────────────────────────────────────────────────────

  function toggleMulti(val: string, arr: string[], setter: (v: string[]) => void) {
    setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  }

  async function generateItinerary() {
    setGenerating(true);
    setGenError(false);
    setItinerary(null);
    try {
      const res = await fetch("/api/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ duration, cities, interests, pace, season }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setItinerary(data);
    } catch {
      setGenError(true);
    } finally {
      setGenerating(false);
    }
  }

  function resetItinerary() {
    setStep(0);
    setDuration(null);
    setCities([]);
    setInterests([]);
    setPace(null);
    setSeason(null);
    setItinerary(null);
    setGenError(false);
  }

  // ── Shared button styles ────────────────────────────────────────────────────

  const optBase =
    "w-full text-left px-4 py-3 border text-sm leading-snug transition-all duration-150 cursor-pointer rounded-none";
  const optIdle = "border-foreground/15 text-foreground/70 hover:border-foreground/40 hover:text-foreground bg-background";
  const optSel = "border-foreground text-foreground bg-foreground/[0.04]";

  return (
    <div className="bg-background min-h-screen">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="px-6 md:px-10 lg:px-14 pt-20 pb-12 border-b border-foreground/[0.08]">
        <Link
          href="/"
          className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors mb-10 block"
        >
          ← Slow Morocco
        </Link>
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
          Morocco, understood
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-6 max-w-2xl">
          Start here.
        </h1>
        <p className="text-base text-foreground/50 leading-relaxed max-w-xl">
          Two tools. The first gives you the mental map — the framework you need before any good decision can be made. The second builds your itinerary once you have that framework.
        </p>
      </div>

      {/* ── Section toggle ─────────────────────────────────────────────────── */}
      <div className="px-6 md:px-10 lg:px-14 py-8 border-b border-foreground/[0.08]">
        <div className="flex gap-8">
          <button
            onClick={() => setSection("orientation")}
            className={`text-sm tracking-[0.05em] pb-2 border-b transition-all ${
              section === "orientation"
                ? "border-foreground text-foreground"
                : "border-transparent text-foreground/35 hover:text-foreground/60"
            }`}
          >
            1. Get oriented
          </button>
          <button
            onClick={() => setSection("itinerary")}
            id="itinerary"
            className={`text-sm tracking-[0.05em] pb-2 border-b transition-all ${
              section === "itinerary"
                ? "border-foreground text-foreground"
                : "border-transparent text-foreground/35 hover:text-foreground/60"
            }`}
          >
            2. Build your itinerary
          </button>
        </div>
      </div>

      {/* ── Orientation section ─────────────────────────────────────────────── */}
      {section === "orientation" && (
        <div className="px-6 md:px-10 lg:px-14 py-16">
          <div className="max-w-2xl mb-12">
            <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-4">
              Step 1 of 2
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4 leading-snug">
              Five questions. A framework specific to you.
            </h2>
            <p className="text-sm text-foreground/50 leading-relaxed">
              Not an itinerary — the mental map you need before any good decision can be made. Which cities cluster together. What the distances actually are. The one thing that changes how you experience everything else.
            </p>
          </div>

          {/* Tally embed */}
          <div className="max-w-2xl">
            <iframe
              data-tally-src="https://tally.so/embed/aQG8W9?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
              loading="lazy"
              width="100%"
              height="500"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Morocco orientation"
              style={{ minHeight: "500px" }}
            />
          </div>

          <div className="max-w-2xl mt-12 pt-12 border-t border-foreground/[0.08]">
            <p className="text-sm text-foreground/40 leading-relaxed">
              After submitting you'll land on your personalised orientation page. We'll also send it to your email so you have it for later.
            </p>
          </div>
        </div>
      )}

      {/* ── Itinerary generator section ─────────────────────────────────────── */}
      {section === "itinerary" && (
        <div className="px-6 md:px-10 lg:px-14 py-16">

          {!itinerary && !generating && (
            <>
              <div className="max-w-xl mb-12">
                <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-4">
                  Step 2 of 2
                </p>
                <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4 leading-snug">
                  Build your itinerary.
                </h2>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  Places, context, and the thread connecting them — sequenced for the trip you actually want.
                </p>
              </div>

              {/* Progress */}
              <div className="max-w-xl mb-10">
                <div className="flex gap-1.5 mb-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-0.5 flex-1 transition-all duration-300"
                      style={{
                        background: i <= step ? "var(--foreground)" : "rgba(0,0,0,0.1)",
                        opacity: i <= step ? 1 : 0.3,
                      }}
                    />
                  ))}
                </div>
                <p className="text-[11px] text-foreground/30">
                  {step + 1} of 5
                </p>
              </div>

              {/* Step 0 — Duration */}
              {step === 0 && (
                <div className="max-w-xl">
                  <p className="font-serif text-xl text-foreground mb-6">
                    How long is your trip?
                  </p>
                  <div className="flex flex-col gap-2 mb-8">
                    {["3 days", "5 days", "7 days", "10 days", "2 weeks"].map((d) => (
                      <button
                        key={d}
                        onClick={() => setDuration(d)}
                        className={`${optBase} ${duration === d ? optSel : optIdle}`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                  <button
                    disabled={!duration}
                    onClick={() => setStep(1)}
                    className="px-8 py-3 border border-foreground text-sm tracking-[0.1em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Continue →
                  </button>
                </div>
              )}

              {/* Step 1 — Cities */}
              {step === 1 && (
                <div className="max-w-xl">
                  <p className="font-serif text-xl text-foreground mb-6">
                    Which cities do you want to visit?
                  </p>
                  <div className="grid grid-cols-2 gap-2 mb-8">
                    {["Marrakech", "Fes", "Essaouira", "Tangier", "Chefchaouen", "Rabat", "Merzouga", "Draa Valley", "Casablanca", "Dakhla"].map((c) => (
                      <button
                        key={c}
                        onClick={() => toggleMulti(c, cities, setCities)}
                        className={`${optBase} ${cities.includes(c) ? optSel : optIdle}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <button
                      disabled={cities.length === 0}
                      onClick={() => setStep(2)}
                      className="px-8 py-3 border border-foreground text-sm tracking-[0.1em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Continue →
                    </button>
                    <button
                      onClick={() => setStep(0)}
                      className="text-sm text-foreground/30 hover:text-foreground/60 transition-colors"
                    >
                      ← Back
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 — Interests */}
              {step === 2 && (
                <div className="max-w-xl">
                  <p className="font-serif text-xl text-foreground mb-6">
                    What draws you most?
                  </p>
                  <div className="flex flex-col gap-2 mb-8">
                    {[
                      "History & architecture",
                      "Sacred & spiritual",
                      "Craft & making",
                      "Food & markets",
                      "Nature & landscape",
                      "Literature & art",
                      "Jewish heritage",
                      "Surf & coast",
                      "Trekking",
                    ].map((i) => (
                      <button
                        key={i}
                        onClick={() => toggleMulti(i, interests, setInterests)}
                        className={`${optBase} ${interests.includes(i) ? optSel : optIdle}`}
                      >
                        {i}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <button
                      disabled={interests.length === 0}
                      onClick={() => setStep(3)}
                      className="px-8 py-3 border border-foreground text-sm tracking-[0.1em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Continue →
                    </button>
                    <button
                      onClick={() => setStep(1)}
                      className="text-sm text-foreground/30 hover:text-foreground/60 transition-colors"
                    >
                      ← Back
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 — Pace */}
              {step === 3 && (
                <div className="max-w-xl">
                  <p className="font-serif text-xl text-foreground mb-6">
                    How do you want to travel?
                  </p>
                  <div className="flex flex-col gap-2 mb-8">
                    {[
                      { val: "slow", label: "Slow", sub: "Few places, deep attention" },
                      { val: "balanced", label: "Balanced", sub: "Mix of depth and breadth" },
                      { val: "ambitious", label: "Ambitious", sub: "Cover as much as possible" },
                    ].map(({ val, label, sub }) => (
                      <button
                        key={val}
                        onClick={() => setPace(val)}
                        className={`${optBase} ${pace === val ? optSel : optIdle}`}
                      >
                        <span className="font-medium">{label}</span>
                        <span className="block text-xs text-foreground/40 mt-0.5">{sub}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <button
                      disabled={!pace}
                      onClick={() => setStep(4)}
                      className="px-8 py-3 border border-foreground text-sm tracking-[0.1em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Continue →
                    </button>
                    <button
                      onClick={() => setStep(2)}
                      className="text-sm text-foreground/30 hover:text-foreground/60 transition-colors"
                    >
                      ← Back
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4 — Season */}
              {step === 4 && (
                <div className="max-w-xl">
                  <p className="font-serif text-xl text-foreground mb-6">
                    When are you going?
                  </p>
                  <div className="flex flex-col gap-2 mb-8">
                    {[
                      "Spring (March–May)",
                      "Summer (June–August)",
                      "Autumn (September–November)",
                      "Winter (December–February)",
                      "Not sure yet",
                    ].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSeason(s)}
                        className={`${optBase} ${season === s ? optSel : optIdle}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <button
                      disabled={!season}
                      onClick={generateItinerary}
                      className="px-8 py-3 bg-foreground text-background text-sm tracking-[0.1em] uppercase hover:opacity-80 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Build my itinerary →
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="text-sm text-foreground/30 hover:text-foreground/60 transition-colors"
                    >
                      ← Back
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Generating */}
          {generating && (
            <div className="max-w-xl py-16">
              <p className="font-serif text-xl text-foreground/40">
                Building your itinerary…
              </p>
            </div>
          )}

          {/* Error */}
          {genError && (
            <div className="max-w-xl py-8">
              <p className="text-sm text-foreground/50 mb-6">
                Something went wrong. Try again.
              </p>
              <button
                onClick={resetItinerary}
                className="text-sm text-foreground/40 hover:text-foreground transition-colors"
              >
                ← Start over
              </button>
            </div>
          )}

          {/* Result */}
          {itinerary && !generating && (
            <div className="max-w-2xl">
              <p className="font-serif text-xl text-foreground/60 leading-relaxed mb-12">
                {itinerary.summary}
              </p>

              <div className="space-y-px">
                {itinerary.days.map((day) => (
                  <div
                    key={day.dayNumber}
                    className="border border-foreground/[0.08] p-6"
                  >
                    <div className="flex items-baseline gap-6 mb-4">
                      <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 w-10 flex-shrink-0">
                        Day {day.dayNumber}
                      </p>
                      <div>
                        <h3 className="font-serif text-lg text-foreground">
                          {day.routeType === "Stay"
                            ? day.cityName
                            : day.fromCity === day.toCity
                            ? day.cityName
                            : `${day.fromCity} → ${day.toCity}`}
                        </h3>
                        {day.dayTitle && (
                          <p className="text-xs text-foreground/40 mt-0.5 tracking-wide">
                            {day.dayTitle}
                          </p>
                        )}
                      </div>
                      {day.travelTime && day.routeType !== "Stay" && (
                        <span className="ml-auto text-[11px] text-foreground/30 flex-shrink-0">
                          {day.travelTime}h travel
                        </span>
                      )}
                    </div>

                    {day.description && (
                      <p className="text-sm text-foreground/55 leading-relaxed mb-4 pl-16">
                        {day.description}
                      </p>
                    )}

                    {(day.activities || day.highlights) && (
                      <div className="pl-16 flex flex-wrap gap-2">
                        {day.activities && day.activities.split(",").slice(0, 4).map((a: string, i: number) => (
                          <span
                            key={i}
                            className="text-[10px] tracking-[0.08em] uppercase px-2 py-1 bg-foreground/[0.04] text-foreground/40"
                          >
                            {a.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-foreground/[0.08]">
                <p className="text-sm text-foreground/40 mb-6">
                  Like this route? Our curated journeys are fully produced — with narratives, accommodation, and everything arranged.
                </p>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <Link
                    href="/journeys"
                    className="inline-block px-6 py-2.5 border border-foreground text-sm tracking-[0.1em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors"
                  >
                    See curated journeys →
                  </Link>
                  <button
                    onClick={resetItinerary}
                    className="text-sm text-foreground/30 hover:text-foreground/60 transition-colors self-center"
                  >
                    ← Plan a different trip
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Footer note ─────────────────────────────────────────────────────── */}
      <div className="px-6 md:px-10 lg:px-14 py-12 border-t border-foreground/[0.08] mt-8">
        <p className="text-sm text-foreground/30">
          Morocco, understood. —{" "}
          <Link href="/stories" className="hover:text-foreground/60 transition-colors">
            Read the stories
          </Link>
          {" · "}
          <Link href="/places/map" className="hover:text-foreground/60 transition-colors">
            Explore the map
          </Link>
          {" · "}
          <Link href="/darija" className="hover:text-foreground/60 transition-colors">
            Learn Darija
          </Link>
        </p>
      </div>

    </div>
  );
}
