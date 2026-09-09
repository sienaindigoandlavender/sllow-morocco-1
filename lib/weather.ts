/* ═══════════════════════════════════════════════════════════════
   WEATHER — what it is actually doing there, right now.

   Open-Meteo. No API key, which matters: anything client-side is
   public, and a key in a static bundle is a key someone else can
   spend. CORS is open, the free tier is generous, and the licence
   is CC BY 4.0.

   One request per coordinate, cached in memory for the session so
   a reader moving between pages does not re-ask for the same town.
   ═══════════════════════════════════════════════════════════════ */

export interface Conditions {
  temperature: number;      // °C, rounded
  apparent: number;         // what it feels like
  code: number;             // WMO weather code
  description: string;      // plain words
  isDay: boolean;
  windKph: number;
}

/* WMO codes, in the register the archive uses. No "partly cloudy
   with a chance of" — this goes into a sentence, not a forecast. */
const WMO: Record<number, string> = {
  0: "clear", 1: "mostly clear", 2: "some cloud", 3: "overcast",
  45: "fog", 48: "freezing fog",
  51: "light drizzle", 53: "drizzle", 55: "heavy drizzle",
  56: "freezing drizzle", 57: "freezing drizzle",
  61: "light rain", 63: "rain", 65: "heavy rain",
  66: "freezing rain", 67: "freezing rain",
  71: "light snow", 73: "snow", 75: "heavy snow", 77: "snow grains",
  80: "showers", 81: "showers", 82: "heavy showers",
  85: "snow showers", 86: "heavy snow showers",
  95: "thunderstorm", 96: "thunderstorm with hail", 99: "thunderstorm with hail",
};

const cache = new Map<string, Conditions | null>();
const key = (lat: number, lon: number) => `${lat.toFixed(2)},${lon.toFixed(2)}`;

/**
 * Current conditions, or null. Null is a normal outcome — the
 * network is unreliable and a missing line is better than a
 * wrong one or a spinner.
 */
export async function conditions(lat: number, lon: number): Promise<Conditions | null> {
  const k = key(lat, lon);
  if (cache.has(k)) return cache.get(k)!;

  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(3)}` +
    `&longitude=${lon.toFixed(3)}` +
    `&current=temperature_2m,apparent_temperature,weather_code,is_day,wind_speed_10m` +
    `&timezone=Africa%2FCasablanca`;

  const ctl = typeof AbortController !== "undefined" ? new AbortController() : null;
  const timer = ctl ? setTimeout(() => ctl.abort(), 6000) : null;

  try {
    const res = await fetch(url, ctl ? { signal: ctl.signal } : {});
    if (timer) clearTimeout(timer);
    if (!res.ok) throw new Error("bad response");
    const d = await res.json();
    const c = d?.current;
    if (!c || typeof c.temperature_2m !== "number") throw new Error("no current block");

    const out: Conditions = {
      temperature: Math.round(c.temperature_2m),
      apparent: Math.round(c.apparent_temperature ?? c.temperature_2m),
      code: c.weather_code ?? 0,
      description: WMO[c.weather_code] ?? "",
      isDay: c.is_day === 1,
      windKph: Math.round(c.wind_speed_10m ?? 0),
    };
    cache.set(k, out);
    return out;
  } catch {
    if (timer) clearTimeout(timer);
    cache.set(k, null);   // do not retry on every render
    return null;
  }
}

/**
 * One sentence, for the body of a story. Names the place, because
 * a reader in Toronto needs to know where the number is from.
 *
 * The wind and the apparent temperature only appear when they say
 * something the number alone does not.
 */
export function weatherLine(c: Conditions, place: string): string {
  const bits: string[] = [`${c.temperature}°`];
  if (c.description) bits.push(c.description);

  let line = `It is ${bits.join(" and ")} in ${place} as you read this`;

  if (c.apparent - c.temperature >= 4) line += `, and it feels like ${c.apparent}`;
  else if (c.temperature - c.apparent >= 4) line += `, though the wind makes it feel like ${c.apparent}`;
  else if (c.windKph >= 35) line += `, with the wind up`;

  return line + ".";
}

/** Shorter, for a facts bar. No place name — the page is the place. */
export function weatherShort(c: Conditions): string {
  return c.description ? `${c.temperature}° · ${c.description}` : `${c.temperature}°`;
}
