/* ═══════════════════════════════════════════════════════════════
   MOROCCAN CALENDAR — what is happening in the country right now.

   Three calendars run at once here, which the three-calendars
   module sets out: Gregorian for the state, Hijri for religious
   life, and the Julian-derived agricultural calendar for the land.
   This file answers "what does today mean" in all three.

   The souk table and the produce table are editable data, not
   logic. Correct them freely — nothing else depends on their
   contents, only on their shape.
   ═══════════════════════════════════════════════════════════════ */

export const TZ = "Africa/Casablanca";

/* ── Weekly souks ─────────────────────────────────────────────────
   Market towns are named for the day they trade. Souk el Had is
   Sunday's market, Souk Tnine is Monday's, and so on — a map of
   Morocco doubles as a timetable.
   ─────────────────────────────────────────────────────────────── */

export interface SoukDay {
  weekday: number;          // 0 = Sunday
  arabic: string;           // the day-name the town carries
  towns: Array<{ name: string; near: string }>;
}

export const SOUK_DAYS: SoukDay[] = [
  { weekday: 0, arabic: "el Had", towns: [
    { name: "Had Draa", near: "Essaouira" },
    { name: "Had Soualem", near: "Casablanca" },
  ]},
  { weekday: 1, arabic: "Tnine", towns: [
    { name: "Tnine Ourika", near: "Marrakech" },
    { name: "Tnine Chtouka", near: "El Jadida" },
  ]},
  { weekday: 2, arabic: "Tleta", towns: [
    { name: "Tleta Sidi Bouguedra", near: "Safi" },
    { name: "Aït Ourir", near: "Marrakech" },
  ]},
  { weekday: 3, arabic: "el Arbaa", towns: [
    { name: "Arbaa Sahel", near: "Tiznit" },
    { name: "Arbaa Aounate", near: "El Jadida" },
  ]},
  { weekday: 4, arabic: "el Khemis", towns: [
    { name: "Khemis Zemamra", near: "El Jadida" },
    { name: "Khemis Aït Amira", near: "Agadir" },
  ]},
  { weekday: 5, arabic: "Jemaa", towns: [
    { name: "Jemaa Shaim", near: "Safi" },
  ]},
  { weekday: 6, arabic: "es Sebt", towns: [
    { name: "Sebt Gzoula", near: "Safi" },
    { name: "Sebt Oulad Nemma", near: "Beni Mellal" },
  ]},
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

/** Weekday in Morocco, 0 = Sunday, regardless of where the reader is. */
export function moroccanWeekday(d: Date): number {
  const short = new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "short" }).format(d);
  const i = WEEKDAYS.indexOf(short as (typeof WEEKDAYS)[number]);
  return i === -1 ? d.getUTCDay() : i;
}

export function souksToday(d: Date): SoukDay {
  return SOUK_DAYS[moroccanWeekday(d)];
}

/* ── The agricultural year ────────────────────────────────────────
   What is being picked, pressed or harvested this month. Drawn
   from the seasonal produce wheel — almost nothing overlaps, which
   is the point of that module.
   ─────────────────────────────────────────────────────────────── */

export const HARVEST: Record<number, string[]> = {
  1:  ["Olives, late pressing", "Citrus", "Dates, stored"],
  2:  ["Almond blossom in the Anti-Atlas", "Citrus", "Broad beans"],
  3:  ["Almond blossom", "Artichokes", "Broad beans"],
  4:  ["Roses in the Dades", "Peas", "Early apricots"],
  5:  ["Roses, to mid-month", "Cherries in the Middle Atlas", "Apricots"],
  6:  ["Apricots", "Melons", "Wheat harvest"],
  7:  ["Figs", "Melons", "Peaches"],
  8:  ["Figs", "Grapes", "Prickly pear"],
  9:  ["Grapes", "Pomegranates", "Early dates"],
  10: ["Dates in the Draa and Tafilalet", "Pomegranates", "Saffron at Taliouine"],
  11: ["Saffron, to mid-month", "Olives, first pressing", "Quince"],
  12: ["Olives", "Citrus", "Argan fruit gathered"],
};

export function harvestNow(d: Date): string[] {
  const month = Number(new Intl.DateTimeFormat("en-US", { timeZone: TZ, month: "numeric" }).format(d));
  return HARVEST[month] ?? [];
}

/* ── The Hijri date ───────────────────────────────────────────────
   Intl does the conversion. Note the caveat the sighting module
   makes: the tabular calendar can differ by a day from what the
   Ministry announces, because the month begins when the crescent
   is actually seen. Treat this as indicative.
   ─────────────────────────────────────────────────────────────── */

export interface HijriDate {
  day: number;
  month: number;
  monthName: string;
  year: number;
  isRamadan: boolean;
}

export function hijri(d: Date): HijriDate {
  const parts = new Intl.DateTimeFormat("en-u-ca-islamic", {
    timeZone: TZ, day: "numeric", month: "numeric", year: "numeric",
  }).formatToParts(d);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  const month = get("month");
  const monthName = new Intl.DateTimeFormat("en-u-ca-islamic", { timeZone: TZ, month: "long" })
    .format(d)
    .replace(/\s*\d+\s*/g, "")
    .trim();
  return { day: get("day"), month, monthName, year: get("year"), isRamadan: month === 9 };
}

/* ── The daily rhythm ─────────────────────────────────────────────
   From the pulse-of-the-medina module. What is open, lit or
   working at this hour on an ordinary day.
   ─────────────────────────────────────────────────────────────── */

export interface RhythmBand {
  from: number;             // hour, local
  to: number;
  label: string;
  detail: string;
}

export const RHYTHM: RhythmBand[] = [
  { from: 3,  to: 6,  label: "The ovens are lit",
    detail: "The ferran is heating for the first bread. Nothing else is open." },
  { from: 6,  to: 9,  label: "Bissara and sfenj",
    detail: "The morning carts are out and will be finished by mid-morning." },
  { from: 9,  to: 12, label: "The souks open",
    detail: "Workshops are working. This is when the craft quarters are worth walking." },
  { from: 12, to: 14, label: "The middle of the day",
    detail: "Lunch, and on Friday couscous. Shadows are short and the light is flat." },
  { from: 14, to: 16, label: "The quiet hours",
    detail: "Many shutters are down. The lanes are the coolest place to be." },
  { from: 16, to: 19, label: "Everything reopens",
    detail: "The second trading period, and the light begins to be worth having." },
  { from: 19, to: 22, label: "The evening carts",
    detail: "Snails, grilled meat, sheep's head. The square fills." },
  { from: 22, to: 3,  label: "Late",
    detail: "Cafés and the last of the food stalls. The medina lanes empty." },
];

export function rhythmNow(d: Date): RhythmBand {
  const hour = Number(new Intl.DateTimeFormat("en-GB", { timeZone: TZ, hour: "numeric", hour12: false }).format(d));
  return (
    RHYTHM.find((b) => (b.from < b.to ? hour >= b.from && hour < b.to : hour >= b.from || hour < b.to)) ??
    RHYTHM[0]
  );
}

/** Local wall-clock hour and minute in Morocco, wherever the reader is. */
export function moroccanTime(d: Date): { hour: number; minute: number; label: string } {
  const f = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ, hour: "2-digit", minute: "2-digit", hour12: false,
  });
  const [hh, mm] = f.format(d).split(":").map(Number);
  return { hour: hh, minute: mm, label: `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}` };
}
