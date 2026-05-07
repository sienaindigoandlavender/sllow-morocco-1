/**
 * Audit published places for inconsistencies between structured operational
 * fields and visible body prose. Read-only; outputs a markdown report.
 *
 * Run:
 *   NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_ANON_KEY=... \
 *     npx tsx scripts/audit-place-consistency.ts
 *
 * Output: scripts/output/place-consistency-report.md
 *
 * Checks:
 *   1. FEES — structured `fees` vs numeric mentions in body
 *      Example flag: fees="10 MAD" but body says "around 70 MAD".
 *   2. DURATION — structured `visit_duration_minutes` vs hour/minute mentions
 *      in body. Tolerant comparison (±50%).
 *   3. DESTINATION — structured `destination` vs prominent city-name mentions
 *      in body. Flags only when a *different* well-known city is mentioned
 *      more prominently than the structured destination.
 *
 * Hours are intentionally skipped in v1 — too many natural-language formats
 * to extract reliably without false positives. Add later if pattern emerges.
 *
 * No content is rewritten. The user reviews the report manually.
 */

import { createClient } from "@supabase/supabase-js";
import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  process.exit(1);
}

// --- Reference data ---------------------------------------------------------

// Known city slugs that the [city] route serves as live destinations. Used to
// detect "wrong city" mentions in body prose vs the structured destination.
const KNOWN_CITY_SLUGS = [
  "marrakech",
  "fes",
  "tangier",
  "rabat",
  "essaouira",
  "casablanca",
  "meknes",
  "ouarzazate",
  "agadir",
  "dakhla",
  "chefchaouen",
];

// Word-form (capitalised) lookup for city detection in body text.
const CITY_DISPLAY: Record<string, string> = {
  marrakech: "Marrakech",
  fes: "Fes",
  tangier: "Tangier",
  rabat: "Rabat",
  essaouira: "Essaouira",
  casablanca: "Casablanca",
  meknes: "Meknes",
  ouarzazate: "Ouarzazate",
  agadir: "Agadir",
  dakhla: "Dakhla",
  chefchaouen: "Chefchaouen",
};

// Number-words for duration extraction (one through twelve).
const NUMBER_WORDS: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  half: 0.5,
};

// --- Helpers ---------------------------------------------------------------

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/**
 * Parse a fees string into a normalised value:
 *   "free"        -> { kind: "free" }
 *   "10 MAD"      -> { kind: "amount", amount: 10 }
 *   "20–50 MAD"   -> { kind: "range", min: 20, max: 50 }
 *   anything else -> { kind: "unknown" }
 */
type FeeValue =
  | { kind: "free" }
  | { kind: "amount"; amount: number }
  | { kind: "range"; min: number; max: number }
  | { kind: "unknown" };

function parseFees(fees: string | null): FeeValue {
  if (!fees) return { kind: "unknown" };
  const lower = fees.toLowerCase().trim();
  if (/\b(free|no charge|gratuit|gratuite)\b/.test(lower)) return { kind: "free" };

  const range = lower.match(/(\d+)\s*[–-]\s*(\d+)/);
  if (range) {
    return { kind: "range", min: Number(range[1]), max: Number(range[2]) };
  }

  const single = lower.match(/(\d+)/);
  if (single) return { kind: "amount", amount: Number(single[1]) };

  return { kind: "unknown" };
}

/**
 * Extract every numeric fee mention from body text, plus any "free" mentions.
 * Tolerates "MAD", "dirham", "dirhams", "dh", "DH".
 */
function extractFeeMentions(body: string): { amounts: number[]; mentionsFree: boolean } {
  const amounts: number[] = [];
  const re = /(\d+)\s*(?:MAD|DH|dh|dirhams?)\b/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body)) !== null) {
    amounts.push(Number(m[1]));
  }
  const mentionsFree = /\bfree\b/i.test(body);
  return { amounts, mentionsFree };
}

/**
 * Extract duration mentions from body text. Returns total minutes for each
 * mention. Recognises "1 hour", "two hours", "30 minutes", "half an hour",
 * "an hour".
 */
function extractDurationMinutes(body: string): number[] {
  const out: number[] = [];

  // Numeric "X hours", "X hour"
  const hoursRe = /(\d+(?:\.\d+)?)\s*hours?\b/gi;
  let m: RegExpExecArray | null;
  while ((m = hoursRe.exec(body)) !== null) out.push(Number(m[1]) * 60);

  // Numeric "X minutes", "X mins"
  const minsRe = /(\d+)\s*(?:minutes?|mins?)\b/gi;
  while ((m = minsRe.exec(body)) !== null) out.push(Number(m[1]));

  // "an hour" / "a hour"
  if (/\b(an|a)\s+hour\b/i.test(body)) out.push(60);

  // "half an hour"
  if (/\bhalf\s+(?:an|a)\s+hour\b/i.test(body)) out.push(30);

  // Word-numbers + hours: "two hours", "three hours"
  const wordHoursRe = /\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s+hours?\b/gi;
  while ((m = wordHoursRe.exec(body)) !== null) {
    const n = NUMBER_WORDS[m[1].toLowerCase()];
    if (n) out.push(n * 60);
  }

  return out;
}

/**
 * Tally how many times each known city is mentioned in the body, capitalised.
 * Returns a map from slug -> count.
 */
function tallyCityMentions(body: string): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const slug of KNOWN_CITY_SLUGS) {
    const display = CITY_DISPLAY[slug];
    const re = new RegExp(`\\b${display}\\b`, "g");
    const matches = body.match(re);
    counts[slug] = matches ? matches.length : 0;
  }
  return counts;
}

// --- Audit checks ----------------------------------------------------------

interface Flag {
  kind: "fee" | "duration" | "destination";
  message: string;
}

interface PlaceRow {
  slug: string;
  title: string;
  destination: string | null;
  fees: string | null;
  visit_duration_minutes: number | null;
  body: string | null;
  published: boolean;
}

function auditPlace(place: PlaceRow): Flag[] {
  const flags: Flag[] = [];
  const body = place.body ? stripHtml(place.body) : "";

  // 1. Fees
  if (place.fees && body) {
    const structured = parseFees(place.fees);
    const { amounts, mentionsFree } = extractFeeMentions(body);

    if (structured.kind === "free" && amounts.length > 0) {
      flags.push({
        kind: "fee",
        message: `Structured \`fees\`="${place.fees}" but body mentions ${amounts.length} numeric fee(s): ${amounts.join(", ")} MAD`,
      });
    } else if (structured.kind === "amount") {
      const wrong = amounts.filter((a) => a !== structured.amount);
      if (wrong.length > 0) {
        flags.push({
          kind: "fee",
          message: `Structured \`fees\`="${place.fees}" but body mentions different amount(s): ${wrong.join(", ")} MAD`,
        });
      }
      if (mentionsFree) {
        flags.push({
          kind: "fee",
          message: `Structured \`fees\`="${place.fees}" but body says "free"`,
        });
      }
    } else if (structured.kind === "range") {
      const outOfRange = amounts.filter((a) => a < structured.min || a > structured.max);
      if (outOfRange.length > 0) {
        flags.push({
          kind: "fee",
          message: `Structured \`fees\`="${place.fees}" (range ${structured.min}–${structured.max}) but body mentions ${outOfRange.join(", ")} MAD`,
        });
      }
    }
  }

  // 2. Duration
  if (place.visit_duration_minutes != null && place.visit_duration_minutes > 0 && body) {
    const mentioned = extractDurationMinutes(body);
    if (mentioned.length > 0) {
      const expected = place.visit_duration_minutes;
      // Tolerate ±50% — close-enough mentions don't flag.
      const lower = expected * 0.5;
      const upper = expected * 1.5;
      const wrong = mentioned.filter((m) => m < lower || m > upper);
      if (wrong.length > 0) {
        flags.push({
          kind: "duration",
          message: `Structured \`visit_duration_minutes\`=${expected} but body mentions duration(s) outside ±50%: ${wrong.map((w) => `${w}m`).join(", ")}`,
        });
      }
    }
  }

  // 3. Destination
  if (place.destination && body) {
    const destSlug = place.destination.toLowerCase();
    const counts = tallyCityMentions(body);
    if (KNOWN_CITY_SLUGS.includes(destSlug)) {
      const ownCount = counts[destSlug] || 0;
      const otherCities = Object.entries(counts)
        .filter(([slug, n]) => slug !== destSlug && n > 0)
        .sort((a, b) => b[1] - a[1]);
      if (otherCities.length > 0) {
        const [topOtherSlug, topOtherCount] = otherCities[0];
        // Flag if a different city is mentioned more often than the structured
        // destination AND the structured destination has zero or one mention.
        if (topOtherCount > ownCount && ownCount <= 1) {
          flags.push({
            kind: "destination",
            message: `Structured \`destination\`="${destSlug}" (${ownCount} mention${ownCount === 1 ? "" : "s"} in body) but ${CITY_DISPLAY[topOtherSlug]} is mentioned ${topOtherCount} times`,
          });
        }
      }
    }
  }

  return flags;
}

// --- Main ------------------------------------------------------------------

async function main() {
  const sb = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, { auth: { persistSession: false } });

  const { data, error } = await sb
    .from("places")
    .select("slug, title, destination, fees, visit_duration_minutes, body, published")
    .eq("published", true)
    .order("slug");

  if (error) {
    console.error("Select failed:", error);
    process.exit(1);
  }

  const places = (data || []) as PlaceRow[];
  console.log(`Audited ${places.length} published places.`);

  const flagged: { place: PlaceRow; flags: Flag[] }[] = [];
  for (const place of places) {
    const flags = auditPlace(place);
    if (flags.length > 0) flagged.push({ place, flags });
  }

  // --- Build markdown report ------
  const lines: string[] = [];
  lines.push(`# Place consistency audit`);
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(`Audited: ${places.length} published places`);
  lines.push(`Flagged: ${flagged.length} (${((flagged.length / Math.max(places.length, 1)) * 100).toFixed(1)}%)`);
  lines.push("");
  lines.push(`Checks: fee mismatches, duration mismatches (±50% tolerance), destination/city mismatches.`);
  lines.push(`Opening hours not audited (NLP unreliable for free-text time formats).`);
  lines.push("");

  // Summary by flag kind
  const byKind: Record<string, number> = { fee: 0, duration: 0, destination: 0 };
  for (const { flags } of flagged) for (const f of flags) byKind[f.kind] = (byKind[f.kind] || 0) + 1;
  lines.push(`## Summary by check`);
  lines.push("");
  lines.push(`| Check | Flag count |`);
  lines.push(`|---|---|`);
  lines.push(`| Fees | ${byKind.fee} |`);
  lines.push(`| Duration | ${byKind.duration} |`);
  lines.push(`| Destination | ${byKind.destination} |`);
  lines.push("");

  if (flagged.length === 0) {
    lines.push(`No inconsistencies found.`);
  } else {
    lines.push(`## Flagged places`);
    lines.push("");
    for (const { place, flags } of flagged) {
      lines.push(`### \`${place.slug}\` — ${place.title}`);
      lines.push("");
      lines.push(`- destination: \`${place.destination ?? "null"}\``);
      lines.push(`- fees: \`${place.fees ?? "null"}\``);
      lines.push(`- visit_duration_minutes: \`${place.visit_duration_minutes ?? "null"}\``);
      lines.push(`- URL: https://www.slowmorocco.com/places/${place.slug}`);
      lines.push("");
      for (const f of flags) {
        lines.push(`- **[${f.kind}]** ${f.message}`);
      }
      lines.push("");
    }
  }

  // --- Write output ------
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const outDir = join(__dirname, "output");
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "place-consistency-report.md");
  writeFileSync(outPath, lines.join("\n"));

  console.log(`Wrote ${outPath}`);
  console.log(`Flagged ${flagged.length} places: fees=${byKind.fee} duration=${byKind.duration} destination=${byKind.destination}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
