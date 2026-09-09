/* ═══════════════════════════════════════════════════════════════
   SOLAR — sun position for a coordinate and a moment.

   Everything here is arithmetic. No network, no API key, no data
   to go stale. The sun has been doing this reliably for a while.

   Used by the time-aware engine to answer questions the archive
   already asks: is the light any good yet, how high is the sun,
   how long until it goes.
   ═══════════════════════════════════════════════════════════════ */

const RAD = Math.PI / 180;
const DAY_MS = 86400000;
const J1970 = 2440588;
const J2000 = 2451545;

const toJulian = (d: Date) => d.valueOf() / DAY_MS - 0.5 + J1970;
const fromJulian = (j: number) => new Date((j + 0.5 - J1970) * DAY_MS);
const toDays = (d: Date) => toJulian(d) - J2000;

const OBLIQUITY = RAD * 23.4397;

const solarMeanAnomaly = (d: number) => RAD * (357.5291 + 0.98560028 * d);

function eclipticLongitude(M: number) {
  const C = RAD * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M));
  const P = RAD * 102.9372; // perihelion of the earth
  return M + C + P + Math.PI;
}

function sunCoords(d: number) {
  const M = solarMeanAnomaly(d);
  const L = eclipticLongitude(M);
  return {
    dec: Math.asin(Math.sin(OBLIQUITY) * Math.sin(L)),
    ra: Math.atan2(Math.sin(L) * Math.cos(OBLIQUITY), Math.cos(L)),
  };
}

const siderealTime = (d: number, lw: number) => RAD * (280.16 + 360.9856235 * d) - lw;

/** Altitude of the sun above the horizon, in degrees. Negative after dark. */
export function sunAltitude(date: Date, lat: number, lon: number): number {
  const lw = RAD * -lon;
  const phi = RAD * lat;
  const d = toDays(date);
  const c = sunCoords(d);
  const H = siderealTime(d, lw) - c.ra;
  const alt = Math.asin(
    Math.sin(phi) * Math.sin(c.dec) + Math.cos(phi) * Math.cos(c.dec) * Math.cos(H),
  );
  return alt / RAD;
}

/* ── sunrise / sunset ─────────────────────────────────────────── */

const J0 = 0.0009;
const julianCycle = (d: number, lw: number) => Math.round(d - J0 - lw / (2 * Math.PI));
const approxTransit = (Ht: number, lw: number, n: number) => J0 + (Ht + lw) / (2 * Math.PI) + n;
const solarTransitJ = (ds: number, M: number, L: number) =>
  J2000 + ds + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L);

function hourAngle(h: number, phi: number, dec: number) {
  return Math.acos(
    (Math.sin(h) - Math.sin(phi) * Math.sin(dec)) / (Math.cos(phi) * Math.cos(dec)),
  );
}

/**
 * The moment the sun reaches a given altitude, going down (`set`)
 * or coming up (`rise`). Returns null when it never gets there —
 * which does not happen in Morocco but keeps the types honest.
 */
function timeAtAltitude(
  altitudeDeg: number,
  which: "rise" | "set",
  date: Date,
  lat: number,
  lon: number,
): Date | null {
  const lw = RAD * -lon;
  const phi = RAD * lat;
  const d = toDays(date);
  const n = julianCycle(d, lw);
  const ds = approxTransit(0, lw, n);
  const M = solarMeanAnomaly(ds);
  const L = eclipticLongitude(M);
  const dec = Math.asin(Math.sin(OBLIQUITY) * Math.sin(L));
  const Jnoon = solarTransitJ(ds, M, L);

  const w = hourAngle(altitudeDeg * RAD, phi, dec);
  if (Number.isNaN(w)) return null;

  const Jset = solarTransitJ(approxTransit(w, lw, n), M, L);
  return which === "set" ? fromJulian(Jset) : fromJulian(Jnoon * 2 - Jset);
}

export interface SunTimes {
  sunrise: Date | null;
  sunset: Date | null;
  goldenStart: Date | null;   // sun drops below 6° — the good light begins
  goldenEnd: Date | null;     // sunset
  duskEnd: Date | null;       // civil twilight over
  altitudeNow: number;        // degrees
}

/**
 * The day's sun for one coordinate. `date` may be any moment in
 * that day; the times returned are UTC Date objects and should be
 * formatted with timeZone: "Africa/Casablanca".
 */
export function sunTimes(date: Date, lat: number, lon: number): SunTimes {
  return {
    sunrise: timeAtAltitude(-0.833, "rise", date, lat, lon),
    sunset: timeAtAltitude(-0.833, "set", date, lat, lon),
    goldenStart: timeAtAltitude(6, "set", date, lat, lon),
    goldenEnd: timeAtAltitude(-0.833, "set", date, lat, lon),
    duskEnd: timeAtAltitude(-6, "set", date, lat, lon),
    altitudeNow: sunAltitude(date, lat, lon),
  };
}

/**
 * What the light is doing, in the terms the archive uses.
 * The calendar-of-light module explains why these bands matter:
 * above 60° there is no modelling on a wall, below 6° everything
 * has relief and the colour deepens.
 */
export function lightQuality(altitudeDeg: number):
  | "dark" | "twilight" | "golden" | "low" | "high" | "overhead" {
  if (altitudeDeg < -6) return "dark";
  if (altitudeDeg < -0.833) return "twilight";
  if (altitudeDeg < 6) return "golden";
  if (altitudeDeg < 25) return "low";
  if (altitudeDeg < 60) return "high";
  return "overhead";
}
