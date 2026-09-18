"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Interactive festival calendar embedded in a story via the {{calendar}} marker
 * (see components/StoryBody.tsx). Same register as the timeline: house serif,
 * black on #f2f1ef, a single signal-red accent. Twelve clickable months; the
 * current month is selected on load. Data lives here, self-contained, the way
 * MoroccoTimeline keeps its own events — it does not parse the story body.
 */

type Festival = {
  name: string;
  where: string;
  when: string;
  note: string;
  href?: string;
};

type Month = {
  label: string; // 3-letter tab
  full: string; // full name for the panel heading
  festivals: Festival[];
  quiet?: string; // shown when a month has no major festival
};

const MONTHS: Month[] = [
  {
    label: "Jan",
    full: "January",
    festivals: [],
    quiet:
      "One of the quiet months. Nothing staged — which is its own reason to come. If Ramadan falls here, the whole country changes rhythm instead.",
  },
  {
    label: "Feb",
    full: "February",
    festivals: [],
    quiet:
      "Still quiet, and often cold in the mountains. The almond is about to flower in the Anti-Atlas. Ramadan may fall in late February.",
  },
  {
    label: "Mar",
    full: "March",
    festivals: [
      {
        name: "Almond Blossom Festival",
        where: "Tafraout, Anti-Atlas",
        when: "March",
        note: "Pink and white blossom against red granite. Small, local, no international press. Worth the drive.",
        href: "/tafraout",
      },
    ],
  },
  {
    label: "Apr",
    full: "April",
    festivals: [
      {
        name: "Ahwach National Festival",
        where: "Ouarzazate",
        when: "April · dates vary",
        note: "Troupes from the High Atlas, Anti-Atlas and Souss perform the collective dance that predates every other music in the country. Three days.",
        href: "/stories/the-circle",
      },
    ],
  },
  {
    label: "May",
    full: "May",
    festivals: [
      {
        name: "Rose Festival",
        where: "Kelaat M'Gouna, Dadès Valley",
        when: "late May",
        note: "The valley turns pink and the air smells like the inside of a perfume bottle. Parades, a Rose Queen, markets of rosewater and oil.",
        href: "/kelaat-mgouna",
      },
      {
        name: "Fes Festival of World Sacred Music",
        where: "Fes medina",
        when: "May–July, shifts yearly",
        note: "Sufi chant, gospel, Andalusian orchestras and Gregorian plainsong in the courtyards. The free daytime programme is often better than the ticketed stage.",
        href: "/stories/fes-guide",
      },
    ],
  },
  {
    label: "Jun",
    full: "June",
    festivals: [
      {
        name: "Gnaoua and World Music Festival",
        where: "Essaouira",
        when: "June · three days",
        note: "Thirty-plus maalems alongside international artists, the guembri and qraqeb live against jazz and Afrobeat. Main stages free. Book rooms a year ahead.",
        href: "/stories/the-lila",
      },
      {
        name: "Mawazine",
        where: "Rabat & Salé",
        when: "late June",
        note: "The largest festival in Africa — 2.5 million people, six stages, global headliners. Not a cultural festival. A citywide party, and it delivers.",
      },
      {
        name: "Sefrou Cherry Festival",
        where: "Sefrou, near Fes",
        when: "June · three days",
        note: "UNESCO-listed, running since 1920. The cherry harvest with parades, dance and a Miss Cherry crowned.",
      },
    ],
  },
  {
    label: "Jul",
    full: "July",
    festivals: [
      {
        name: "Festival National des Arts Populaires",
        where: "El Badi Palace, Marrakech",
        when: "early July",
        note: "Ahidous, Guedra, Tissint sword dancing — every region in the ruins of the palace. The festival the country puts on for itself.",
      },
      {
        name: "Timitar",
        where: "Agadir",
        when: "early July",
        note: "Amazigh music meets the world on the coast. Free, multiple stages. Smaller than Mawazine, and deeper.",
        href: "/stories/the-wandering-poets",
      },
      {
        name: "Asilah Arts Festival",
        where: "Asilah, Atlantic coast",
        when: "July · dates vary",
        note: "Since 1978, when two young men invited artists to paint the town walls. The murals stay all year; the festival is the refresh.",
      },
    ],
  },
  {
    label: "Aug",
    full: "August",
    festivals: [
      {
        name: "Moussem of Moulay Abdellah Amghar",
        where: "near El Jadida",
        when: "August",
        note: "One of the largest moussems in the country. Fantasia — horseback charges with synchronised musket fire — markets and music. The heat is extreme; bring water and shade.",
      },
    ],
  },
  {
    label: "Sep",
    full: "September",
    festivals: [
      {
        name: "Imilchil Marriage Festival",
        where: "High Atlas",
        when: "September · shifts with the harvest",
        note: "Three Amazigh tribes gather by a lake. The girls wink; if the man takes her hand, the bond is made. Up to 30,000 arrive by horse, donkey and camel. Reachable only by 4x4.",
      },
    ],
  },
  {
    label: "Oct",
    full: "October",
    festivals: [
      {
        name: "Erfoud Date Festival",
        where: "Tafilalet oasis",
        when: "October · three days",
        note: "The date harvest — markets, music, camel races, and more dates than you have seen in one place. Erg Chebbi is forty-five minutes south.",
        href: "/stories/the-three-deserts",
      },
    ],
  },
  {
    label: "Nov",
    full: "November",
    festivals: [
      {
        name: "Jazzablanca",
        where: "Casablanca",
        when: "shifts — June or autumn",
        note: "The country's premier jazz festival, indoor and outdoor stages. The weekend Casablanca turns culturally relevant.",
      },
    ],
  },
  {
    label: "Dec",
    full: "December",
    festivals: [
      {
        name: "Marrakech International Film Festival",
        where: "Marrakech",
        when: "early December",
        note: "Red carpet and Scorsese one way, free screenings on Jemaa el-Fna the other — projected on a giant screen, watched from a plastic chair with a bowl of harira. The square wins.",
      },
    ],
  },
];

export default function FestivalCalendar() {
  const now = new Date();
  const [active, setActive] = useState<number>(now.getMonth());
  const thisMonth = now.getMonth();
  const month = MONTHS[active];

  return (
    <section className="not-prose w-full my-12 md:my-16 px-6 md:px-10 py-12 md:py-16 bg-[#f2f1ef] border-t border-b border-[#0a0a0a]/10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <span className="h-px w-10 bg-[#0a0a0a]/30" />
          <span className="text-[10px] tracking-[0.24em] uppercase text-[#0a0a0a]/55">
            The festival year
          </span>
        </div>

        {/* Month selector */}
        <div className="grid grid-cols-6 md:grid-cols-12 gap-px mb-10 border border-[#0a0a0a]/10 bg-[#0a0a0a]/10">
          {MONTHS.map((m, i) => {
            const selected = i === active;
            return (
              <button
                key={m.label}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={selected}
                className={
                  "relative py-3 text-[11px] tracking-[0.12em] uppercase transition-colors duration-200 " +
                  (selected
                    ? "bg-[#0a0a0a] text-[#f2f1ef]"
                    : "bg-[#f2f1ef] text-[#0a0a0a]/55 hover:text-[#0a0a0a]")
                }
              >
                {m.label}
                {i === thisMonth && (
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 -translate-x-1/2 bottom-1 block rounded-full"
                    style={{ width: 4, height: 4, background: "#E3120B" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div key={active} className="fc-fade">
          <h3 className="font-serif text-2xl md:text-3xl font-light tracking-[-0.01em] text-[#0a0a0a] mb-8">
            {month.full}
          </h3>

          {month.festivals.length === 0 ? (
            <p className="font-serif text-lg md:text-xl font-light leading-relaxed text-[#0a0a0a]/70 max-w-2xl">
              {month.quiet}
            </p>
          ) : (
            <div className="space-y-9">
              {month.festivals.map((f) => (
                <div key={f.name}>
                  <h4 className="font-serif text-xl md:text-2xl text-[#0a0a0a] leading-snug">
                    {f.href ? (
                      <Link
                        href={f.href}
                        className="no-underline hover:text-[#0a0a0a]/60 transition-colors"
                      >
                        {f.name}
                      </Link>
                    ) : (
                      f.name
                    )}
                  </h4>
                  <p className="mt-1.5 text-[10px] tracking-[0.16em] uppercase text-[#0a0a0a]/50">
                    {f.where}
                    <span style={{ color: "#E3120B" }} className="mx-2">
                      ·
                    </span>
                    {f.when}
                  </p>
                  <p className="mt-3 text-[15px] md:text-base leading-relaxed text-[#0a0a0a]/80 max-w-2xl">
                    {f.note}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="mt-12 pt-6 border-t border-[#0a0a0a]/10 text-[11px] tracking-[0.14em] uppercase text-[#0a0a0a]/45">
          Most dates shift each year with the harvest or the lunar calendar. Confirm before you book.
        </p>
      </div>

      <style>{`
        @keyframes fc-fade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .fc-fade { animation: fc-fade 0.35s ease-out; }
        @media (prefers-reduced-motion: reduce) { .fc-fade { animation: none; } }
      `}</style>
    </section>
  );
}
