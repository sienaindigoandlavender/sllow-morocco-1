#!/usr/bin/env node
/**
 * One-time backfill: stories.hero_image_alt from stories.mj_prompt.
 *
 * Mechanical extraction only — no LLM, no human writing. Drops the photography
 * boilerplate tail and Midjourney --params, keeps the descriptive scene fragment.
 *
 * Usage:
 *   node scripts/backfill-hero-image-alt.mjs              # dry-run, writes CSV only
 *   node scripts/backfill-hero-image-alt.mjs --apply      # actually UPDATE rows
 *
 * Env (read from process.env or .env.local if you source it first):
 *   NEXT_PUBLIC_SUPABASE_URL    (or SUPABASE_URL)
 *   SUPABASE_SERVICE_ROLE_KEY   (anon key won't pass RLS for UPDATE)
 *
 * Output:
 *   scripts/out/hero-alt-backfill-<ISO>.csv
 */

import { createClient } from "@supabase/supabase-js";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const APPLY = process.argv.includes("--apply");

// Phrases that mark the start of the technical photography boilerplate tail.
// First comma-separated segment matching this gets cut along with everything after.
const BOILERPLATE_RE =
  /\b(documentary[\s-]+editorial|editorial[\s-]+documentary|editorial\s+photography|documentary\s+photography|photojournalism|photojournalistic|reportage|cinematic\s+photography)\b/i;

// Midjourney parameters: --ar 16:9, --style raw, --s 250, --chaos 25, --v 6, --niji, --seed 12345
const MJ_PARAM_RE = /\s*--[a-zA-Z]+(?:\s+[^\s,-]+)?/g;

function deriveAlt(prompt) {
  if (!prompt) return null;
  let p = String(prompt).trim();

  // 1. Cut at the first comma-separated segment that mentions boilerplate.
  const segments = p.split(",");
  let cutIndex = segments.length;
  for (let i = 0; i < segments.length; i++) {
    if (BOILERPLATE_RE.test(segments[i])) {
      cutIndex = i;
      break;
    }
  }
  let scene = segments.slice(0, cutIndex).join(",");

  // 2. Strip Midjourney --params anywhere remaining.
  scene = scene.replace(MJ_PARAM_RE, "");

  // 3. Normalise whitespace, trim trailing punctuation.
  scene = scene.replace(/\s+/g, " ").trim();
  scene = scene.replace(/[,;:\-—\s]+$/u, "");

  if (!scene) return null;

  // 4. Capitalise first character; leave the rest alone so proper nouns survive.
  scene = scene[0].toLocaleUpperCase() + scene.slice(1);

  // 5. Soft cap ~150 chars including final period. Truncate at last word boundary.
  const MAX = 150;
  if (scene.length > MAX - 1) {
    const slice = scene.slice(0, MAX - 1);
    const lastSpace = slice.lastIndexOf(" ");
    scene = (lastSpace > 80 ? slice.slice(0, lastSpace) : slice).replace(
      /[,;:\-—\s]+$/u,
      ""
    );
  }

  // 6. Terminating period if none.
  if (!/[.!?]$/.test(scene)) scene += ".";

  return scene;
}

function csvCell(v) {
  if (v == null) return "";
  const s = String(v);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error(
      "Missing env. Need NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY."
    );
    process.exit(1);
  }
  const sb = createClient(url, key, { auth: { persistSession: false } });

  const { data, error } = await sb
    .from("stories")
    .select("slug, mj_prompt")
    .is("hero_image_alt", null)
    .not("mj_prompt", "is", null);

  if (error) {
    console.error("Select failed:", error);
    process.exit(1);
  }

  console.log(`Eligible rows: ${data.length}`);
  console.log(`Mode: ${APPLY ? "APPLY (will UPDATE)" : "dry-run (no writes)"}`);

  const rows = [];
  let applied = 0,
    skipped = 0,
    failed = 0;

  for (const row of data) {
    const alt = deriveAlt(row.mj_prompt);
    if (!alt) {
      rows.push({
        slug: row.slug,
        mj_prompt: row.mj_prompt,
        generated_alt: "",
        char_count: 0,
        ok: false,
        note: "empty after extraction",
      });
      skipped += 1;
      continue;
    }

    if (APPLY) {
      const { error: upErr } = await sb
        .from("stories")
        .update({ hero_image_alt: alt })
        .eq("slug", row.slug);
      if (upErr) {
        rows.push({
          slug: row.slug,
          mj_prompt: row.mj_prompt,
          generated_alt: alt,
          char_count: alt.length,
          ok: false,
          note: upErr.message,
        });
        failed += 1;
        continue;
      }
      applied += 1;
    }

    rows.push({
      slug: row.slug,
      mj_prompt: row.mj_prompt,
      generated_alt: alt,
      char_count: alt.length,
      ok: true,
      note: "",
    });
  }

  const outDir = join(__dirname, "out");
  mkdirSync(outDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const file = join(outDir, `hero-alt-backfill-${stamp}.csv`);
  const header = ["slug", "mj_prompt", "generated_alt", "char_count", "ok", "note"];
  const csv = [header.join(",")]
    .concat(rows.map((r) => header.map((h) => csvCell(r[h])).join(",")))
    .join("\n");
  writeFileSync(file, csv);

  console.log(`CSV: ${file}`);
  console.log(
    `${APPLY ? "Updated" : "Would update"}: ${
      APPLY ? applied : rows.filter((r) => r.ok).length
    }, skipped: ${skipped}, failed: ${failed}`
  );
  if (!APPLY) console.log("Re-run with --apply after spot-checking the CSV.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
