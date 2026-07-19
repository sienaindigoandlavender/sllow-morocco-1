import type { Metadata } from "next";
import Link from "next/link";
import FilmLocationsMap from "@/components/FilmLocationsMap";

export const metadata: Metadata = {
  title: "Where Game of Thrones Was Filmed in Morocco: Astapor & Yunkai",
  description:
    "Essaouira played Astapor — the Walk of Punishment, the Unsullied, 'Dracarys.' Aït Benhaddou played Yunkai, the Yellow City. Where Daenerys's Season 3 was really filmed, and how to walk both sets today.",
  alternates: {
    canonical: "https://www.slowmorocco.com/morocco/game-of-thrones-filming-locations",
  },
  openGraph: {
    title: "Where Game of Thrones Was Filmed in Morocco",
    description:
      "Astapor is Essaouira. Yunkai is Aït Benhaddou. The Moroccan chapter of Daenerys's story, mapped.",
    url: "https://www.slowmorocco.com/morocco/game-of-thrones-filming-locations",
  },
};

const LOCATIONS = [
  {
    name: "Essaouira",
    role: "Astapor",
    coords: [-9.7714, 31.5125] as [number, number],
    note: "The Skala ramparts became the Walk of Punishment; the harbour watched the Unsullied change hands.",
  },
  {
    name: "Aït Benhaddou",
    role: "Yunkai, the Yellow City",
    coords: [-7.1318, 31.0472] as [number, number],
    note: "The ksar's earthen tiers played the city Daenerys took without a siege.",
  },
  {
    name: "Ouarzazate",
    role: "Production base",
    coords: [-6.9063, 30.9189] as [number, number],
    note: "Atlas Studios and the town serviced the Season 3 shoot.",
  },
];

export default function GoTMoroccoPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="px-6 md:px-14 pt-20 pb-12 border-b border-foreground/[0.08]">
        <Link
          href="/morocco/ouarzazate-africas-hollywood"
          className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors mb-8 block"
        >
          ← Morocco on screen
        </Link>
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
          Morocco on screen
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.1] mb-6 max-w-2xl">
          Where Game of Thrones Was Filmed in Morocco
        </h1>
        <p className="text-base text-foreground/55 leading-relaxed max-w-xl">
          Slaver&apos;s Bay was the Atlantic coast. When Daenerys said
          &ldquo;Dracarys&rdquo; and burned Astapor, she was standing in
          Essaouira — and when Yunkai&apos;s golden walls surrendered, they
          were the nine-hundred-year-old earth of Aït Benhaddou.
        </p>
      </div>

      <div className="px-6 md:px-14 py-16 max-w-3xl space-y-12">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            Essaouira played Astapor
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">
            Season 3 came to Morocco in the autumn of 2012, chasing a city
            that could look ancient, coastal, and cruel. Essaouira&apos;s
            Skala de la Ville — the sea-facing ramparts lined with Portuguese
            cannons — became the Walk of Punishment, and the harbour below
            hosted the scene the whole season pivots on: Daenerys trading a
            dragon for eight thousand Unsullied, then keeping both.
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed">
            The production dressed the ramparts and let the town do the rest —
            Essaouira has been playing the ancient Mediterranean since Orson
            Welles filmed Othello on the same walls in 1949. The gulls in the
            background of Astapor are not sound design. They are simply
            Essaouira, which has never once been quiet.
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            Aït Benhaddou played Yunkai
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed">
            The Yellow City — the one that surrendered to Daenerys without a
            siege — is the ksar of Aït Benhaddou, its stacked earthen houses
            reading on camera as exactly what they are: a fortified city the
            color of the ground it grew from. The ksar has played so many
            other people&apos;s cities that Yunkai barely registers on its
            résumé; it was Gladiator&apos;s arena town before, and it would
            be Nolan&apos;s Troy after. The families still living inside sold
            tea to the crew, as they do for every empire.
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            The map
          </p>
          <FilmLocationsMap
            locations={LOCATIONS}
            caption="Tap a marker · Slaver's Bay, Moroccan edition"
          />
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            Walking the sets
          </p>
          <div className="space-y-3">
            {[
              {
                place: "The Skala de la Ville, Essaouira",
                desc: "Free, open, and unchanged — the Walk of Punishment is a public promenade. Go at golden hour when the light does what the colorists did.",
              },
              {
                place: "Aït Benhaddou",
                desc: "Four hours from Marrakech over the Tizi n'Tichka. Dawn, before the buses; cross on the stepping stones. Yunkai is the view from the east bank.",
              },
            ].map((item) => (
              <div key={item.place}>
                <p className="text-sm text-foreground font-medium mb-1">{item.place}</p>
                <p className="text-sm text-foreground/55 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-foreground/[0.08]">
          <p className="text-sm text-foreground/45 leading-relaxed">
            Part of our{" "}
            <Link
              href="/morocco/ouarzazate-africas-hollywood"
              className="underline decoration-foreground/20 hover:decoration-foreground/60 transition-colors"
            >
              Morocco on screen
            </Link>{" "}
            reference. See also{" "}
            <Link
              href="/morocco/gladiator-filming-locations"
              className="underline decoration-foreground/20 hover:decoration-foreground/60 transition-colors"
            >
              where Gladiator was filmed
            </Link>{" "}
            and{" "}
            <Link
              href="/morocco/the-odyssey-filming-locations"
              className="underline decoration-foreground/20 hover:decoration-foreground/60 transition-colors"
            >
              The Odyssey&apos;s Moroccan locations
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
