/**
 * One-off backfill: stories.hero_image_alt from stories.mj_prompt.
 *
 * Mechanical extraction. No LLM. Drops the photography boilerplate tail and
 * Midjourney --params; keeps the descriptive scene fragment.
 *
 * Auth: header `x-admin-secret` must equal env ADMIN_SECRET.
 *
 * Default: dry-run; returns CSV in the response body.
 * Pass `?apply=true` to actually UPDATE rows.
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in env (RLS will block UPDATE on anon).
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const BOILERPLATE_RE =
  /\b(documentary[\s-]+editorial|editorial[\s-]+documentary|editorial\s+photography|documentary\s+photography|photojournalism|photojournalistic|reportage|cinematic\s+photography)\b/i;

const MJ_PARAM_RE = /\s*--[a-zA-Z]+(?:\s+[^\s,-]+)?/g;

function deriveAlt(prompt: string | null): string | null {
  if (!prompt) return null;
  let p = String(prompt).trim();

  const segments = p.split(",");
  let cutIndex = segments.length;
  for (let i = 0; i < segments.length; i++) {
    if (BOILERPLATE_RE.test(segments[i])) {
      cutIndex = i;
      break;
    }
  }
  let scene = segments.slice(0, cutIndex).join(",");
  scene = scene.replace(MJ_PARAM_RE, "");
  scene = scene.replace(/\s+/g, " ").trim();
  scene = scene.replace(/[,;:\-—\s]+$/, "");
  if (!scene) return null;

  scene = scene[0].toLocaleUpperCase() + scene.slice(1);

  const MAX = 150;
  if (scene.length > MAX - 1) {
    const slice = scene.slice(0, MAX - 1);
    const lastSpace = slice.lastIndexOf(" ");
    scene = (lastSpace > 80 ? slice.slice(0, lastSpace) : slice).replace(
      /[,;:\-—\s]+$/,
      ""
    );
  }

  if (!/[.!?]$/.test(scene)) scene += ".";
  return scene;
}

function csvCell(v: unknown): string {
  if (v == null) return "";
  const s = String(v);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export async function GET(req: NextRequest) {
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) {
    return NextResponse.json(
      { error: "ADMIN_SECRET not configured" },
      { status: 500, headers: { "x-robots-tag": "noindex" } }
    );
  }
  if (req.headers.get("x-admin-secret") !== adminSecret) {
    return NextResponse.json(
      { error: "unauthorised" },
      { status: 401, headers: { "x-robots-tag": "noindex" } }
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json(
      { error: "Supabase env missing (need SUPABASE_SERVICE_ROLE_KEY)" },
      { status: 500, headers: { "x-robots-tag": "noindex" } }
    );
  }

  const apply = req.nextUrl.searchParams.get("apply") === "true";
  const sb = createClient(url, key, { auth: { persistSession: false } });

  const { data, error } = await sb
    .from("stories")
    .select("slug, mj_prompt")
    .is("hero_image_alt", null)
    .not("mj_prompt", "is", null);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500, headers: { "x-robots-tag": "noindex" } }
    );
  }

  type Row = {
    slug: string;
    mj_prompt: string;
    generated_alt: string;
    char_count: number;
    ok: boolean;
    note: string;
  };
  const rows: Row[] = [];
  let applied = 0;
  let skipped = 0;
  let failed = 0;

  for (const r of data as Array<{ slug: string; mj_prompt: string | null }>) {
    const alt = deriveAlt(r.mj_prompt);
    if (!alt) {
      rows.push({
        slug: r.slug,
        mj_prompt: r.mj_prompt ?? "",
        generated_alt: "",
        char_count: 0,
        ok: false,
        note: "empty after extraction",
      });
      skipped += 1;
      continue;
    }

    if (apply) {
      const { error: upErr } = await sb
        .from("stories")
        .update({ hero_image_alt: alt })
        .eq("slug", r.slug);
      if (upErr) {
        rows.push({
          slug: r.slug,
          mj_prompt: r.mj_prompt ?? "",
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
      slug: r.slug,
      mj_prompt: r.mj_prompt ?? "",
      generated_alt: alt,
      char_count: alt.length,
      ok: true,
      note: "",
    });
  }

  const header = ["slug", "mj_prompt", "generated_alt", "char_count", "ok", "note"];
  const csv = [header.join(",")]
    .concat(rows.map((r) => header.map((h) => csvCell((r as any)[h])).join(",")))
    .join("\n");

  const summary = {
    mode: apply ? "apply" : "dry-run",
    eligible: data.length,
    would_update: rows.filter((r) => r.ok).length,
    applied: apply ? applied : 0,
    skipped,
    failed,
  };

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex",
      "x-summary": JSON.stringify(summary),
      "content-disposition": `attachment; filename="hero-alt-backfill-${
        apply ? "apply" : "dryrun"
      }-${new Date().toISOString().replace(/[:.]/g, "-")}.csv"`,
    },
  });
}
