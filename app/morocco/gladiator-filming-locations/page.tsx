import type { Metadata } from "next";
import Link from "next/link";
import FilmLocationsMap from "@/components/FilmLocationsMap";

export const metadata: Metadata = {
  title: "Where Gladiator Was Filmed in Morocco: Aït Benhaddou's Arena & Gladiator II",
  description:
    "The arena where Maximus first fought was built beside the ksar of Aït Benhaddou. Twenty-four years later, Ridley Scott came back to shoot Gladiator II's Numidia in the same desert. Both films' Moroccan locations, mapped.",
  alternates: {
    canonical: "https://www.slowmorocco.com/morocco/gladiator-filming-locations",
  },
  openGraph: {
    title: "Where Gladiator Was Filmed in Morocco",
    description:
      "Maximus's first arena stood beside Aït Benhaddou. Scott returned for Gladiator II. The Moroccan chapter of both films, mapped.",
    url: "https://www.slowmorocco.com/morocco/gladiator-filming-locations",
  },
};

const LOCATIONS = [
  {
    name: "Aït Benhaddou",
    role: "Zucchabar — the provincial arena",
    coords: [-7.1318, 31.0472] as [number, number],
    note: "The arena where Maximus fought for Proximo was built beside the ksar; the mud-brick city framed every shot.",
  },
  {
    name: "Ouarzazate desert",
    role: "The slave caravan's road",
    coords: [-6.9063, 30.9189] as [number, number],
    note: "The hammada around town carried the journey from capture to the arena.",
  },
  {
    name: "Atlas Studios",
    role: "Production base, both films",
    coords: [-6.9663, 30.9335] as [number, number],
    note: "The 1983 back lot serviced Gladiator in 1999 and again for Gladiator II's Numidia in 2023.",
  },
];

export default function GladiatorMoroccoPage() {
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
          Where Gladiator Was Filmed in Morocco
        </h1>
        <p className="text-base text-foreground/55 leading-relaxed max-w-xl">
          Before Rome, there was the provincial ring — a dusty arena in
          Zucchabar where a slave learned to win a crowd. Ridley Scott built
          it beside a nine-hundred-year-old ksar in the Ounila Valley, and
          liked the desert enough to come back twenty-four years later.
        </p>
      </div>

      <div className="px-6 md:px-14 py-16 max-w-3xl space-y-12">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            The arena at Aït Benhaddou
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">
            In 1999, Scott&apos;s crew raised a thirty-thousand-square-foot
            mud-brick arena on the flats beside Aït Benhaddou to play
            Zucchabar, the Roman province where Proximo buys a broken general
            and sells a gladiator. It is the film&apos;s forge: &ldquo;Win the
            crowd&rdquo; is learned here, in Moroccan dust, long before the
            Colosseum — which was Malta, and considerably less convincing
            weather.
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed">
            The production hired hundreds of local extras and built in the
            local material — mud brick beside mud brick — which is why the
            arena scenes feel grown rather than built. The set came down; the
            ksar, as usual, outlasted its co-star.
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            Gladiator II: Scott returns
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed">
            Twenty-four years later, Gladiator II opened in Numidia — and
            Numidia was shot back in the Ouarzazate desert, Scott&apos;s third
            production in the region after Gladiator and Kingdom of Heaven.
            Some directors keep a favorite café; he keeps a country. By then
            the town had serviced two more decades of epics, and the crews
            the first film trained were running departments on the second.
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            The map
          </p>
          <FilmLocationsMap
            locations={LOCATIONS}
            caption="Tap a marker · Zucchabar was twenty minutes from the studio"
          />
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            Standing where Maximus stood
          </p>
          <div className="space-y-3">
            {[
              {
                place: "Aït Benhaddou",
                desc: "The arena is gone, but its backdrop is intact — the ksar's tiers read exactly as they did behind the fights. Dawn, east bank, stepping stones.",
              },
              {
                place: "Atlas Studios, Ouarzazate",
                desc: "The guided visit walks through sets from both eras of epic — and the Cinema Museum opposite Kasbah Taourirt keeps the props the desert hasn't reclaimed.",
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
              href="/morocco/game-of-thrones-filming-locations"
              className="underline decoration-foreground/20 hover:decoration-foreground/60 transition-colors"
            >
              where Game of Thrones was filmed
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
