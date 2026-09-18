"use client";

/**
 * Homepage banner that sits directly above the interactive FestivalCalendar.
 * White (paper), so it reads against the light-grey calendar beneath it. House
 * serif, the last beat in signal red. It is a header, not a doorway — the live
 * calendar is right below — so there is no link and no call to action.
 *
 * The line breathes with the year: each month carries its own three-beat tableau
 * tied to that month's festival, and during Ramadan the moon/harira line returns
 * automatically — Ramadan is detected off the Islamic calendar, so it tracks the
 * moving dates itself and needs no yearly edit.
 */

type Line = { a: string; b: string; c: string };

// One tableau per Gregorian month (0 = January), tied to that month's festival.
const MONTH_LINES: Line[] = [
  { a: "The passes close with snow.", b: "The medina turns inward.", c: "The country keeps to itself." },
  { a: "The almond is about to break.", b: "The mountains are still white.", c: "The year clears its throat." },
  { a: "Pink and white on red granite.", b: "The almond is in flower.", c: "Tafraout throws it a festival." },
  { a: "The drums gather in a ring.", b: "A hundred voices answer one.", c: "The oldest music wakes." },
  { a: "Ten thousand roses, cut before dawn.", b: "The valley turns pink.", c: "The air smells like a perfume bottle." },
  { a: "The guembri finds the downbeat.", b: "The qraqeb answer till dawn.", c: "Essaouira does not sleep." },
  { a: "Every region in one courtyard.", b: "Sword dance, drum and story.", c: "The country performs for itself." },
  { a: "Muskets fire from the saddle.", b: "The dust does not settle.", c: "The moussem runs till dawn." },
  { a: "Three tribes gather by a lake.", b: "The girls wink; a hand is taken.", c: "A marriage is made." },
  { a: "The palms hang heavy with dates.", b: "Camels race the oasis.", c: "More sugar than you have ever seen." },
  { a: "The horns warm up indoors.", b: "The Atlantic wind stays outside.", c: "Casablanca finds its rhythm." },
  { a: "A screen rises over Jemaa el-Fna.", b: "Free seats, a bowl of harira.", c: "The stars share the bill." },
];

const RAMADAN: Line = {
  a: "The month begins when the moon says so.",
  b: "The city stops.",
  c: "Then the smell of harira.",
};

// Ramadan is the 9th month of the Islamic calendar. The umalqura calendar is a
// day or two off Morocco's observed sighting, which is fine for a mood banner.
function isRamadan(d: Date): boolean {
  try {
    const m = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", { month: "numeric" }).format(d);
    return parseInt(m, 10) === 9;
  } catch {
    return false;
  }
}

export default function FestivalCalendarTeaser() {
  const now = new Date();
  const line = isRamadan(now) ? RAMADAN : MONTH_LINES[now.getMonth()];

  return (
    <section className="w-full px-6 md:px-10 lg:px-14 py-20 md:py-28 bg-[#FAF9F6] border-t border-[#0a0a0a]/10">
      <div className="max-w-3xl">
        <div className="flex items-center gap-3 mb-7">
          <span className="relative block rounded-full" style={{ width: 7, height: 7 }}>
            <span className="fy-ping absolute inset-0 rounded-full" style={{ background: "#E3120B" }} />
            <span className="absolute inset-0 rounded-full bg-[#0a0a0a]" />
          </span>
          <span className="text-[10px] tracking-[0.24em] uppercase text-[#0a0a0a]/55">
            The festival year
          </span>
        </div>

        <h2 className="font-serif text-3xl md:text-5xl font-light tracking-[-0.02em] leading-[1.12] text-[#0a0a0a]">
          {line.a}{" "}
          <span className="text-[#0a0a0a]/55">{line.b}</span>{" "}
          <span style={{ color: "#E3120B" }}>{line.c}</span>
        </h2>
      </div>

      <style>{`
        @keyframes fy-ping { 0% { transform: scale(1); opacity: 0.5; } 70%,100% { transform: scale(3.5); opacity: 0; } }
        .fy-ping { animation: fy-ping 3.4s cubic-bezier(0,0,0.2,1) infinite; }
        @media (prefers-reduced-motion: reduce) { .fy-ping { animation: none; opacity: 0; } }
      `}</style>
    </section>
  );
}
