"use client";

/* ═══════════════════════════════════════════════════════════════
   PLACE NOW — two more items for the quick facts bar.

   The bar already answers Hours, Entry, Duration and Location. It
   does not answer the two questions a reader standing in the street
   actually has: how far is it, and is the light any good.

   Both are computed, not fetched. The distance needs a position and
   asks once; if the reader refuses, or is nowhere near, nothing
   renders and the bar looks exactly as it did. The light needs only
   the place's own coordinates and always renders.

   Visual grammar is copied from the existing items deliberately —
   icon, uppercase label, value — so these read as part of the bar
   rather than as something bolted onto it.
   ═══════════════════════════════════════════════════════════════ */

import { useEffect, useState } from "react";
import { Navigation, Sun } from "lucide-react";
import { distanceKm, formatDistance } from "@/lib/geo";
import { sunTimes, lightQuality } from "@/lib/solar";
import { TZ } from "@/lib/moroccan-calendar";

interface Props {
  latitude: number | null;
  longitude: number | null;
}

/* Walking pace, roughly 4.5 km/h, rounded to something sayable. */
function walkMinutes(km: number): number {
  return Math.max(1, Math.round((km / 4.5) * 60));
}

const hhmm = (d: Date | null) =>
  d
    ? new Intl.DateTimeFormat("en-GB", {
        timeZone: TZ, hour: "2-digit", minute: "2-digit", hour12: false,
      }).format(d)
    : null;

export default function PlaceNow({ latitude, longitude }: Props) {
  const [distance, setDistance] = useState<string | null>(null);
  const [light, setLight] = useState<string | null>(null);

  const lat = latitude == null ? null : Number(latitude);
  const lon = longitude == null ? null : Number(longitude);

  /* The light, from the place's own coordinates. No permission
     needed and no position involved. */
  useEffect(() => {
    if (lat == null || lon == null) return;
    const tick = () => {
      const now = new Date();
      const s = sunTimes(now, lat, lon);
      const q = lightQuality(s.altitudeNow);

      if (q === "dark") { setLight(`Sunrise ${hhmm(s.sunrise)}`); return; }
      if (q === "twilight") { setLight(`Sun went at ${hhmm(s.sunset)}`); return; }
      if (q === "golden") {
        const mins = s.sunset ? Math.round((s.sunset.valueOf() - now.valueOf()) / 60000) : 0;
        setLight(mins > 0 ? `Golden now · ${mins} min left` : `Sunset ${hhmm(s.sunset)}`);
        return;
      }
      setLight(`Golden from ${hhmm(s.goldenStart)}`);
    };
    tick();
    const t = setInterval(tick, 60000);
    return () => clearInterval(t);
  }, [lat, lon]);

  /* The distance. Asked once, quietly, and silent on refusal. */
  useEffect(() => {
    if (lat == null || lon == null) return;
    if (typeof navigator === "undefined" || !navigator.geolocation) return;
    let cancelled = false;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (cancelled) return;
        const km = distanceKm(pos.coords.latitude, pos.coords.longitude, lat, lon);
        if (km > 30) return;                       // not in this part of the country
        if (km < 0.05) { setDistance("You are here"); return; }
        if (km <= 3) {
          setDistance(`${formatDistance(km)} · ${walkMinutes(km)} min walk`);
          return;
        }
        setDistance(formatDistance(km));
      },
      () => { /* refused. The bar is unchanged. */ },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 },
    );
    return () => { cancelled = true; };
  }, [lat, lon]);

  if (!distance && !light) return null;

  return (
    <>
      {distance && (
        <div className="flex items-center gap-3">
          <Navigation className="w-4 h-4 text-foreground/70" />
          <div>
            <p className="text-[11px] tracking-[0.12em] uppercase text-foreground/70">
              From you
            </p>
            <p className="text-sm">{distance}</p>
          </div>
        </div>
      )}
      {light && (
        <div className="flex items-center gap-3">
          <Sun className="w-4 h-4 text-foreground/70" />
          <div>
            <p className="text-[11px] tracking-[0.12em] uppercase text-foreground/70">
              Light
            </p>
            <p className="text-sm">{light}</p>
          </div>
        </div>
      )}
    </>
  );
}
