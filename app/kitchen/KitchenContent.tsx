"use client";

import { useState } from "react";
import Link from "next/link";

interface StoryRef {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: number | null;
}
interface PlaceRef {
  slug: string;
  title: string;
  destination: string;
}
interface Section {
  key: string;
  label: string;
  note: string;
  stories: StoryRef[];
  places: PlaceRef[];
}
interface Props {
  sections: Section[];
  unfiled: { slug: string; title: string }[];
  totalStories: number;
  totalPlaces: number;
}

export default function KitchenContent({
  sections,
  unfiled,
  totalStories,
  totalPlaces,
}: Props) {
  const [open, setOpen] = useState<string | null>(sections[0]?.key ?? null);

  const storyTotal = sections.reduce((n, s) => n + s.stories.length, 0);
  const placeTotal = sections.reduce((n, s) => n + s.places.length, 0);

  return (
    <main className="bg-background text-foreground min-h-screen">

      {/* ── Header ────────────────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 pt-24 md:pt-28 pb-8">
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#8F3A24] mb-4">
          Private · not indexed · not linked
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
          The Kitchen
        </h1>
        <p className="text-sm text-foreground/55 max-w-2xl leading-relaxed mb-3">
          The nursery for The Food of Morocco. Everything the archive already
          holds, grouped the way somebody eats rather than the way the database
          files it.
        </p>
        <p className="text-sm text-foreground/45 max-w-2xl leading-relaxed">
          The point of this page is the empty rows. A section with two entries
          is a section that has not been written yet.
        </p>
      </section>

      {/* ── Where it stands ───────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 py-8 border-t border-foreground/[0.08]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            ["Sections", String(sections.length)],
            ["Essays claimed", `${storyTotal} of ${totalStories}`],
            ["Places claimed", `${placeTotal} of ${totalPlaces}`],
            ["Unfiled", String(unfiled.length)],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/35 mb-2">
                {label}
              </p>
              <p className="font-serif text-2xl tabular-nums">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── The sections ──────────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 py-10 border-t border-foreground/[0.08]">
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/35 mb-6">
          Contents
        </p>

        <ul>
          {sections.map((s) => {
            const isOpen = open === s.key;
            const thin = s.stories.length < 4;
            return (
              <li key={s.key} className="border-b border-foreground/[0.08]">
                <button
                  onClick={() => setOpen(isOpen ? null : s.key)}
                  className="w-full flex items-baseline justify-between gap-4 py-5 text-left group"
                >
                  <span className="flex items-baseline gap-4 min-w-0">
                    <span className="font-serif text-xl md:text-2xl">
                      {s.label}
                    </span>
                    <span className="text-[12px] text-foreground/40 truncate hidden md:inline">
                      {s.note}
                    </span>
                  </span>
                  <span className="flex items-baseline gap-4 flex-shrink-0">
                    <span
                      className={`text-[11px] tabular-nums ${
                        thin ? "text-[#8F3A24]" : "text-foreground/30"
                      }`}
                    >
                      {s.stories.length} essays · {s.places.length} places
                    </span>
                    <span className="text-foreground/25 text-sm w-3">
                      {isOpen ? "−" : "+"}
                    </span>
                  </span>
                </button>

                {isOpen && (
                  <div className="pb-8 grid md:grid-cols-2 gap-x-14 gap-y-8">
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/35 mb-3">
                        Essays
                      </p>
                      {s.stories.length === 0 ? (
                        <p className="text-[13px] text-foreground/35">
                          Nothing yet. This section is unwritten.
                        </p>
                      ) : (
                        <ul>
                          {s.stories.map((st) => (
                            <li key={st.slug}>
                              <Link
                                href={`/stories/${st.slug}`}
                                className="group flex items-baseline justify-between gap-3 border-b border-foreground/[0.06] hover:border-foreground/40 py-2 transition-colors"
                              >
                                <span className="text-[13px] text-foreground/70 group-hover:text-foreground transition-colors">
                                  {st.title}
                                </span>
                                <span className="text-[10px] tabular-nums text-foreground/25 whitespace-nowrap">
                                  {st.category}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/35 mb-3">
                        Places
                      </p>
                      {s.places.length === 0 ? (
                        <p className="text-[13px] text-foreground/35">
                          No place in the atlas answers to this yet. This is
                          where the fieldwork goes.
                        </p>
                      ) : (
                        <ul>
                          {s.places.map((p) => (
                            <li key={p.slug}>
                              <Link
                                href={`/places/${p.slug}`}
                                className="group flex items-baseline justify-between gap-3 border-b border-foreground/[0.06] hover:border-foreground/40 py-2 transition-colors"
                              >
                                <span className="text-[13px] text-foreground/70 group-hover:text-foreground transition-colors">
                                  {p.title}
                                </span>
                                <span className="text-[10px] text-foreground/25 capitalize whitespace-nowrap">
                                  {p.destination.replace(/-/g, " ")}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* ── Unfiled ───────────────────────────────────────────────── */}
      {unfiled.length > 0 && (
        <section className="px-8 md:px-10 lg:px-14 py-12 border-t border-foreground/[0.08]">
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/35 mb-3">
            Unfiled
          </p>
          <p className="text-[12.5px] text-foreground/45 max-w-2xl leading-relaxed mb-6">
            Food-shaped essays that no section claimed. Either the section is
            missing or the keywords are.
          </p>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10">
            {unfiled.map((u) => (
              <li key={u.slug}>
                <Link
                  href={`/stories/${u.slug}`}
                  className="block text-[13px] text-foreground/55 hover:text-foreground py-1.5 transition-colors"
                >
                  {u.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="px-8 md:px-10 lg:px-14 py-12 border-t border-foreground/[0.08]">
        <p className="text-[12.5px] text-foreground/40 max-w-2xl leading-relaxed">
          Sections live in <code className="text-foreground/60">app/kitchen/page.tsx</code>.
          Rename them, reorder them, add one. Each is a label, a note and a
          keyword pattern, so moving an essay between sections is a matter of
          adjusting the pattern rather than editing the row.
        </p>
      </section>
    </main>
  );
}
