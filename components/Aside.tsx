"use client";

/* ═══════════════════════════════════════════════════════════════
   ASIDE — one sentence that knows what time it is.

   The rule this file exists to enforce: it must read as though the
   story is still talking. No box, no icon, no label announcing that
   something clever is happening. Same serif, same measure, an
   italic line where the paragraph would have paused anyway.

   A reader who does not think about technology should experience
   a piece of writing that happens to know the hour. The moment it
   looks like a widget, the effect is gone.

   It renders nothing at all until the client has computed a value,
   so a crawler and a printed page both see the story without it.
   ═══════════════════════════════════════════════════════════════ */

import { useEffect, useState } from "react";
import { sunTimes, lightQuality, prayerTimes, prayerNow } from "@/lib/solar";
import { distanceKm, formatDistance } from "@/lib/geo";
import { conditions, weatherLine } from "@/lib/weather";
import {
  moroccanTime, rhythmNow, souksToday, harvestNow, hijri, TZ,
} from "@/lib/moroccan-calendar";

type Kind = "light" | "souk" | "hour" | "harvest" | "hijri" | "prayer" | "distance" | "weather";

/* Where the sun is computed from. A story with a place_slug uses
   its own coordinates; the rest fall back to Marrakech. Maghrib in
   Tangier is around twenty minutes off Dakhla, so this matters. */
const MARRAKECH = { lat: 31.63, lon: -8.01, name: "Marrakech" };
type Origin = { lat: number; lon: number; name: string };

const hhmm = (d: Date | null) =>
  d
    ? new Intl.DateTimeFormat("en-GB", {
        timeZone: TZ, hour: "2-digit", minute: "2-digit", hour12: false,
      }).format(d)
    : null;

function sentence(kind: Kind, now: Date, at: Origin): string | null {
  switch (kind) {
    case "light": {
      const s = sunTimes(now, at.lat, at.lon);
      const alt = Math.round(s.altitudeNow);
      const q = lightQuality(s.altitudeNow);
      const golden = hhmm(s.goldenStart);
      const set = hhmm(s.sunset);

      if (q === "dark") return `The sun is well down over ${at.name} as you read this. It comes back at ${hhmm(s.sunrise)}.`;
      if (q === "twilight") return `The sun went at ${set} over ${at.name}, and what is left is the blue half hour.`;
      if (q === "golden") return `It is at ${alt}° over ${at.name} as you read this, which is the hour this page is about. It goes at ${set}.`;
      if (q === "overhead") return `It is at ${alt}° over ${at.name} as you read this — near enough overhead that nothing has any relief.`;
      return `It is at ${alt}° over ${at.name} as you read this. The good light starts at ${golden}.`;
    }

    case "souk": {
      const s = souksToday(now);
      const towns = s.towns.map((t) => t.name).join(" and ");
      return `Today is Souk ${s.arabic}, so the market is at ${towns}.`;
    }

    case "hour": {
      const t = moroccanTime(now);
      const b = rhythmNow(now);
      return `It is ${t.label} in Morocco. ${b.label}.`;
    }

    case "harvest": {
      const h = harvestNow(now);
      if (!h.length) return null;
      const month = new Intl.DateTimeFormat("en-GB", { timeZone: TZ, month: "long" }).format(now);
      return `This ${month}: ${h.join(", ").toLowerCase()}.`;
    }

    case "prayer": {
      const p = prayerTimes(now, at.lat, at.lon);
      const n = prayerNow(now, at.lat, at.lon);
      const NAMES: Record<string, string> = {
        fajr: "Fajr", sunrise: "sunrise", dhuhr: "Dhuhr",
        asr: "Asr", maghrib: "Maghrib", isha: "Isha",
      };
      if (!n.next || !n.nextAt) {
        return `Fajr is at ${hhmm(p.fajr)} in ${at.name}, Maghrib at ${hhmm(p.maghrib)}.`;
      }
      const mins = n.minutesToNext ?? 0;
      const when =
        mins < 60 ? `in ${mins} minutes` : `at ${hhmm(n.nextAt)}`;
      const lead = n.last ? `${NAMES[n.last]} has been called in ${at.name}. ` : "";
      return `${lead}${NAMES[n.next]} is ${when}.`;
    }

    case "distance":
    case "weather":
      return null; // both are async, handled in the component

    case "hijri": {
      const h = hijri(now);
      if (h.isRamadan) return `It is ${h.day} Ramadan as you read this.`;
      return `Today is ${h.day} ${h.monthName} ${h.year} in the Hijri calendar.`;
    }
  }
}

/* How far the reader is from the thing the story is about.
   Silent unless they are close. Someone reading in Toronto should
   never see this; someone standing three streets away should. */
function distanceLine(
  here: { lat: number; lon: number },
  there: { lat: number; lon: number; title: string },
): string | null {
  const km = distanceKm(here.lat, here.lon, there.lat, there.lon);
  if (km > 3) return null;
  if (km < 0.06) return `You are standing at it.`;
  if (km < 1) return `It is ${formatDistance(km)} from where you are standing.`;
  return `You are ${formatDistance(km)} away, which is a walk.`;
}

export default function Aside({
  kind,
  place,
}: {
  kind: Kind;
  /* Only needed for kind="distance". Comes from the story's
     place_slug, resolved to coordinates on the server. */
  place?: { latitude: number; longitude: number; title: string } | null;
}) {
  const [line, setLine] = useState<string | null>(null);

  useEffect(() => {
    /* Weather is a network call, so it lives here rather than in
       the synchronous sentence(). It names the place, because a
       reader in Toronto needs to know whose 35 degrees it is. */
    if (kind === "weather") {
      const at = place
        ? { lat: Number(place.latitude), lon: Number(place.longitude), name: place.title }
        : MARRAKECH;
      let cancelled = false;
      conditions(at.lat, at.lon).then((c) => {
        if (!cancelled && c) setLine(weatherLine(c, at.name));
      });
      return () => { cancelled = true; };
    }

    if (kind !== "distance") {
      const origin: Origin = place
        ? { lat: Number(place.latitude), lon: Number(place.longitude), name: place.title }
        : MARRAKECH;
      const tick = () => setLine(sentence(kind, new Date(), origin));
      tick();
      const t = setInterval(tick, 60000);
      return () => clearInterval(t);
    }

    // Distance is the one kind that asks for a position. It asks
    // once, quietly, and says nothing at all if refused.
    if (!place || typeof navigator === "undefined" || !navigator.geolocation) return;
    let cancelled = false;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (cancelled) return;
        setLine(
          distanceLine(
            { lat: pos.coords.latitude, lon: pos.coords.longitude },
            { lat: Number(place.latitude), lon: Number(place.longitude), title: place.title },
          ),
        );
      },
      () => { /* refused. The story reads exactly as it did before. */ },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 },
    );
    return () => { cancelled = true; };
  }, [kind, place]);

  if (!line) return null;

  return (
    <p className="font-serif italic text-[1.05em] leading-relaxed text-black/55 my-6">
      {line}
    </p>
  );
}
