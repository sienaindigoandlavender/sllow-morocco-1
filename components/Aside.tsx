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
import {
  moroccanTime, rhythmNow, souksToday, harvestNow, hijri, TZ,
} from "@/lib/moroccan-calendar";

type Kind = "light" | "souk" | "hour" | "harvest" | "hijri" | "prayer";

const MARRAKECH = { lat: 31.63, lon: -8.01 };

const hhmm = (d: Date | null) =>
  d
    ? new Intl.DateTimeFormat("en-GB", {
        timeZone: TZ, hour: "2-digit", minute: "2-digit", hour12: false,
      }).format(d)
    : null;

function sentence(kind: Kind, now: Date): string | null {
  switch (kind) {
    case "light": {
      const s = sunTimes(now, MARRAKECH.lat, MARRAKECH.lon);
      const alt = Math.round(s.altitudeNow);
      const q = lightQuality(s.altitudeNow);
      const golden = hhmm(s.goldenStart);
      const set = hhmm(s.sunset);

      if (q === "dark") return `The sun is well down over Marrakech as you read this. It comes back at ${hhmm(s.sunrise)}.`;
      if (q === "twilight") return `The sun went at ${set} over Marrakech, and what is left is the blue half hour.`;
      if (q === "golden") return `It is at ${alt}° over Marrakech as you read this, which is the hour this page is about. It goes at ${set}.`;
      if (q === "overhead") return `It is at ${alt}° over Marrakech as you read this — near enough overhead that nothing has any relief.`;
      return `It is at ${alt}° over Marrakech as you read this. The good light starts at ${golden}.`;
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
      const p = prayerTimes(now, MARRAKECH.lat, MARRAKECH.lon);
      const n = prayerNow(now, MARRAKECH.lat, MARRAKECH.lon);
      const NAMES: Record<string, string> = {
        fajr: "Fajr", sunrise: "sunrise", dhuhr: "Dhuhr",
        asr: "Asr", maghrib: "Maghrib", isha: "Isha",
      };
      if (!n.next || !n.nextAt) {
        return `Fajr is at ${hhmm(p.fajr)} in Marrakech, Maghrib at ${hhmm(p.maghrib)}.`;
      }
      const mins = n.minutesToNext ?? 0;
      const when =
        mins < 60 ? `in ${mins} minutes` : `at ${hhmm(n.nextAt)}`;
      const lead = n.last ? `${NAMES[n.last]} has been called in Marrakech. ` : "";
      return `${lead}${NAMES[n.next]} is ${when}.`;
    }

    case "hijri": {
      const h = hijri(now);
      if (h.isRamadan) return `It is ${h.day} Ramadan as you read this.`;
      return `Today is ${h.day} ${h.monthName} ${h.year} in the Hijri calendar.`;
    }
  }
}

export default function Aside({ kind }: { kind: Kind }) {
  const [line, setLine] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setLine(sentence(kind, new Date()));
    tick();
    const t = setInterval(tick, 60000);
    return () => clearInterval(t);
  }, [kind]);

  if (!line) return null;

  return (
    <p className="font-serif italic text-[1.05em] leading-relaxed text-black/55 my-6">
      {line}
    </p>
  );
}
