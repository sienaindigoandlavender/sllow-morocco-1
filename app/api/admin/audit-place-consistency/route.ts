/**
 * One-off place consistency audit — runs on Vercel where the Supabase env
 * vars already exist. Ports the logic from scripts/audit-place-consistency.ts.
 *
 * Auth: header `x-audit-key` must match AUDIT_KEY constant below. The key
 * is hardcoded for a one-time run; this route is removed in a follow-up
 * commit immediately after the audit is captured.
 *
 * Default: returns the markdown report. Pass ?format=json for the raw shape.
 *
 * Read-only. Anon key is enough.
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// One-off key. This route + key gets deleted right after the audit runs.
const AUDIT_KEY = "57e8d8bd4a44287a4aa2029c2ca03e849f27d7eea6819a08";

const KNOWN_CITY_SLUGS = [
  "marrakech", "fes", "tangier", "rabat", "essaouira", "casablanca",
  "meknes", "ouarzazate", "agadir", "dakhla", "chefchaouen",
];
const CITY_DISPLAY: Record<string, string> = {
  marrakech: "Marrakech", fes: "Fes", tangier: "Tangier", rabat: "Rabat",
  essaouira: "Essaouira", casablanca: "Casablanca", meknes: "Meknes",
  ouarzazate: "Ouarzazate", agadir: "Agadir", dakhla: "Dakhla", chefchaouen: "Chefchaouen",
};
const NUMBER_WORDS: Record<string, number> = {
  one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,eleven:11,twelve:12,half:0.5,
};

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

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
  if (range) return { kind: "range", min: Number(range[1]), max: Number(range[2]) };
  const single = lower.match(/(\d+)/);
  if (single) return { kind: "amount", amount: Number(single[1]) };
  return { kind: "unknown" };
}

function extractFeeMentions(body: string): { amounts: number[]; mentionsFree: boolean } {
  const amounts: number[] = [];
  const re = /(\d+)\s*(?:MAD|DH|dh|dirhams?)\b/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body)) !== null) amounts.push(Number(m[1]));
  return { amounts, mentionsFree: /\bfree\b/i.test(body) };
}

function extractDurationMinutes(body: string): number[] {
  const out: number[] = [];
  const hoursRe = /(\d+(?:\.\d+)?)\s*hours?\b/gi;
  let m: RegExpExecArray | null;
  while ((m = hoursRe.exec(body)) !== null) out.push(Number(m[1]) * 60);
  const minsRe = /(\d+)\s*(?:minutes?|mins?)\b/gi;
  while ((m = minsRe.exec(body)) !== null) out.push(Number(m[1]));
  if (/\b(an|a)\s+hour\b/i.test(body)) out.push(60);
  if (/\bhalf\s+(?:an|a)\s+hour\b/i.test(body)) out.push(30);
  const wordHoursRe = /\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s+hours?\b/gi;
  while ((m = wordHoursRe.exec(body)) !== null) {
    const n = NUMBER_WORDS[m[1].toLowerCase()];
    if (n) out.push(n * 60);
  }
  return out;
}

function tallyCityMentions(body: string): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const slug of KNOWN_CITY_SLUGS) {
    const re = new RegExp(`\\b${CITY_DISPLAY[slug]}\\b`, "g");
    const matches = body.match(re);
    counts[slug] = matches ? matches.length : 0;
  }
  return counts;
}

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

  if (place.fees && body) {
    const structured = parseFees(place.fees);
    const { amounts, mentionsFree } = extractFeeMentions(body);
    if (structured.kind === "free" && amounts.length > 0) {
      flags.push({ kind: "fee", message: `Structured \`fees\`="${place.fees}" but body mentions ${amounts.length} numeric fee(s): ${amounts.join(", ")} MAD` });
    } else if (structured.kind === "amount") {
      const wrong = amounts.filter((a) => a !== structured.amount);
      if (wrong.length > 0) {
        flags.push({ kind: "fee", message: `Structured \`fees\`="${place.fees}" but body mentions different amount(s): ${wrong.join(", ")} MAD` });
      }
      if (mentionsFree) flags.push({ kind: "fee", message: `Structured \`fees\`="${place.fees}" but body says "free"` });
    } else if (structured.kind === "range") {
      const outOfRange = amounts.filter((a) => a < structured.min || a > structured.max);
      if (outOfRange.length > 0) {
        flags.push({ kind: "fee", message: `Structured \`fees\`="${place.fees}" (range ${structured.min}–${structured.max}) but body mentions ${outOfRange.join(", ")} MAD` });
      }
    }
  }

  if (place.visit_duration_minutes != null && place.visit_duration_minutes > 0 && body) {
    const mentioned = extractDurationMinutes(body);
    if (mentioned.length > 0) {
      const expected = place.visit_duration_minutes;
      const lower = expected * 0.5;
      const upper = expected * 1.5;
      const wrong = mentioned.filter((m) => m < lower || m > upper);
      if (wrong.length > 0) {
        flags.push({ kind: "duration", message: `Structured \`visit_duration_minutes\`=${expected} but body mentions duration(s) outside ±50%: ${wrong.map((w) => `${w}m`).join(", ")}` });
      }
    }
  }

  if (place.destination && body) {
    const destSlug = place.destination.toLowerCase();
    const counts = tallyCityMentions(body);
    if (KNOWN_CITY_SLUGS.includes(destSlug)) {
      const ownCount = counts[destSlug] || 0;
      const otherCities = Object.entries(counts).filter(([slug, n]) => slug !== destSlug && n > 0).sort((a, b) => b[1] - a[1]);
      if (otherCities.length > 0) {
        const [topOtherSlug, topOtherCount] = otherCities[0];
        if (topOtherCount > ownCount && ownCount <= 1) {
          flags.push({ kind: "destination", message: `Structured \`destination\`="${destSlug}" (${ownCount} mention${ownCount === 1 ? "" : "s"} in body) but ${CITY_DISPLAY[topOtherSlug]} is mentioned ${topOtherCount} times` });
        }
      }
    }
  }

  return flags;
}

export async function GET(req: NextRequest) {
  if (req.headers.get("x-audit-key") !== AUDIT_KEY) {
    return NextResponse.json({ error: "unauthorised" }, { status: 401, headers: { "x-robots-tag": "noindex" } });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "Supabase env not configured" }, { status: 500, headers: { "x-robots-tag": "noindex" } });
  }

  const sb = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await sb
    .from("places")
    .select("slug, title, destination, fees, visit_duration_minutes, body, published")
    .eq("published", true)
    .order("slug");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: { "x-robots-tag": "noindex" } });
  }

  const places = (data || []) as PlaceRow[];
  const flagged: { place: PlaceRow; flags: Flag[] }[] = [];
  for (const p of places) {
    const f = auditPlace(p);
    if (f.length > 0) flagged.push({ place: p, flags: f });
  }

  const byKind: Record<string, number> = { fee: 0, duration: 0, destination: 0 };
  for (const { flags } of flagged) for (const f of flags) byKind[f.kind] = (byKind[f.kind] || 0) + 1;

  if (req.nextUrl.searchParams.get("format") === "json") {
    return NextResponse.json(
      { audited: places.length, flagged: flagged.length, by_kind: byKind, results: flagged },
      { headers: { "x-robots-tag": "noindex", "cache-control": "no-store" } }
    );
  }

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
      for (const f of flags) lines.push(`- **[${f.kind}]** ${f.message}`);
      lines.push("");
    }
  }

  return new NextResponse(lines.join("\n"), {
    status: 200,
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex",
    },
  });
}
