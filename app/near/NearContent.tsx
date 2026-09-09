"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { nearest, formatDistance, WALKING_RADIUS_KM } from "@/lib/geo";
import { sunTimes, lightQuality } from "@/lib/solar";
import {
  moroccanTime, rhythmNow, souksToday, harvestNow, hijri, TZ,
} from "@/lib/moroccan-calendar";

interface Point {
  slug: string;
  title: string;
  destination: string | null;
  category: string | null;
  excerpt: string | null;
  hero_image: string | null;
  latitude: number;
  longitude: number;
  visit_duration_minutes: number | null;
  best_time_to_visit: string | null;
}

type Status = "asking" | "ready" | "denied" | "unavailable";

/* Marrakech, used for the time panel before a position arrives.
   The clock and the souk do not depend on where the reader is. */
const FALLBACK = { lat: 31.63, lon: -8.01 };

const LIGHT_COPY: Record<string, string> = {
  dark: "Dark. Nothing to photograph and the lanes are emptying.",
  twilight: "Twilight. The blue half hour, and the walls have gone flat.",
  golden: "Low sun. This is the hour the colour everyone remembers actually exists in.",
  low: "Sun still low. Long shadows, and every irregularity in a wall is showing.",
  high: "Sun high. Shadows shortening. Interiors and courtyards are the better bet.",
  overhead: "Almost overhead. Flat light, no modelling, and the lanes are the cool place.",
};

export default function NearContent({ places }: { places: Point[] }) {
  const [status, setStatus] = useState<Status>("asking");
  const [pos, setPos] = useState<{ lat: number; lon: number } | null>(null);
  const [now, setNow] = useState<Date>(new Date());

  // Tick once a minute so the clock and the light band stay honest.
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("unavailable");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setPos({ lat: p.coords.latitude, lon: p.coords.longitude });
        setStatus("ready");
      },
      () => setStatus("denied"),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    );
  }, []);

  const origin = pos ?? FALLBACK;
  const clock = moroccanTime(now);
  const band = rhythmNow(now);
  const souk = souksToday(now);
  const harvest = harvestNow(now);
  const h = hijri(now);
  const sun = sunTimes(now, origin.lat, origin.lon);
  const quality = lightQuality(sun.altitudeNow);

  const fmt = (d: Date | null) =>
    d
      ? new Intl.DateTimeFormat("en-GB", {
          timeZone: TZ, hour: "2-digit", minute: "2-digit", hour12: false,
        }).format(d)
      : "—";

  const ranked = pos
    ? nearest({ slug: "__you__", latitude: pos.lat, longitude: pos.lon }, places, 8)
    : [];
  const walkable = ranked.filter((p) => p.distanceKm <= WALKING_RADIUS_KM);
  const beyond = ranked.filter((p) => p.distanceKm > WALKING_RADIUS_KM).slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">

        <p className="text-[11px] tracking-[0.2em] uppercase text-black/40">
          Slow Morocco
        </p>
        <h1 className="font-serif text-4xl md:text-5xl mt-3 leading-[1.05]">
          Where you are, and when
        </h1>

        {/* ── TIME ─────────────────────────────────────────────── */}
        <section className="mt-12 border-t border-black/10 pt-8">
          <div className="flex items-baseline gap-4">
            <span className="font-serif text-5xl tabular-nums">{clock.label}</span>
            <span className="text-sm text-black/50">in Morocco</span>
          </div>

          <p className="font-serif text-2xl mt-6">{band.label}</p>
          <p className="text-sm text-black/60 mt-1 max-w-prose">{band.detail}</p>

          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6 mt-10 text-sm">
            <div>
              <p className="text-[11px] tracking-[0.14em] uppercase text-black/40">The light</p>
              <p className="mt-2 text-black/80">{LIGHT_COPY[quality]}</p>
              <p className="mt-2 text-black/50">
                Sun at {sun.altitudeNow.toFixed(0)}°. Golden from {fmt(sun.goldenStart)},
                sets {fmt(sun.sunset)}.
              </p>
            </div>

            <div>
              <p className="text-[11px] tracking-[0.14em] uppercase text-black/40">
                Souk {souk.arabic}
              </p>
              <ul className="mt-2 text-black/80">
                {souk.towns.map((t) => (
                  <li key={t.name}>
                    {t.name} <span className="text-black/45">— near {t.near}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] tracking-[0.14em] uppercase text-black/40">Being picked</p>
              <p className="mt-2 text-black/80">{harvest.join(" · ")}</p>
            </div>

            <div>
              <p className="text-[11px] tracking-[0.14em] uppercase text-black/40">Hijri</p>
              <p className="mt-2 text-black/80">
                {h.day} {h.monthName} {h.year}
                {h.isRamadan && " — Ramadan"}
              </p>
              <p className="mt-1 text-black/45 text-xs">
                Calculated. The month begins when the crescent is seen.
              </p>
            </div>
          </div>
        </section>

        {/* ── PLACE ────────────────────────────────────────────── */}
        <section className="mt-16 border-t border-black/10 pt-8">
          {status === "asking" && (
            <p className="text-black/50 text-sm">Asking your browser where you are…</p>
          )}

          {status === "denied" && (
            <div className="text-sm text-black/60 max-w-prose">
              <p className="font-serif text-xl text-black mb-2">No location</p>
              <p>
                Your browser refused the request, which is a reasonable thing for it to do.
                Everything above still works. To see what is near you, allow location for
                this site and reload.
              </p>
            </div>
          )}

          {status === "unavailable" && (
            <p className="text-sm text-black/60">
              This browser cannot report a position.
            </p>
          )}

          {status === "ready" && (
            <>
              <p className="text-[11px] tracking-[0.14em] uppercase text-black/40">
                {walkable.length > 0 ? "Within walking distance" : "Nothing walkable from here"}
              </p>

              {walkable.length > 0 && (
                <ul className="mt-6 divide-y divide-black/[0.07]">
                  {walkable.map((p) => (
                    <li key={p.slug} className="py-5">
                      <Link href={`/places/${p.slug}`} className="group block">
                        <div className="flex items-baseline justify-between gap-6">
                          <h2 className="font-serif text-2xl leading-tight group-hover:underline">
                            {p.title}
                          </h2>
                          <span className="text-sm tabular-nums text-black/45 shrink-0">
                            {formatDistance(p.distanceKm)}
                          </span>
                        </div>
                        {p.excerpt && (
                          <p className="text-sm text-black/60 mt-1.5 max-w-prose">{p.excerpt}</p>
                        )}
                        {p.best_time_to_visit && (
                          <p className="text-xs text-black/40 mt-1.5">{p.best_time_to_visit}</p>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {walkable.length === 0 && beyond.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-black/60 max-w-prose">
                    The archive is thin here. The closest we have written about:
                  </p>
                  <ul className="mt-5 divide-y divide-black/[0.07]">
                    {beyond.map((p) => (
                      <li key={p.slug} className="py-4">
                        <Link href={`/places/${p.slug}`} className="group block">
                          <div className="flex items-baseline justify-between gap-6">
                            <h2 className="font-serif text-xl group-hover:underline">{p.title}</h2>
                            <span className="text-sm tabular-nums text-black/45 shrink-0">
                              {formatDistance(p.distanceKm)}
                            </span>
                          </div>
                          {p.destination && (
                            <p className="text-xs text-black/40 mt-1">{p.destination}</p>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </section>

        <p className="mt-16 pt-6 border-t border-black/10 text-xs text-black/40">
          Your position is read by your browser and used to sort a list. It is not sent
          anywhere and it is not stored.
        </p>
      </div>
    </main>
  );
}
