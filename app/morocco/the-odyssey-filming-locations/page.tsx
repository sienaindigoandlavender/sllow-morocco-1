import type { Metadata } from "next";
import Link from "next/link";
import OdysseyLocationsMap from "@/components/OdysseyLocationsMap";

export const metadata: Metadata = {
  title: "Where The Odyssey Was Filmed in Morocco: Aït Benhaddou, Essaouira, Dakhla",
  description:
    "Christopher Nolan opened his Odyssey shoot at Aït Benhaddou — the ksar played Troy — then moved through Marrakech, Tahannaout, and Essaouira before landing on the White Dune near Dakhla. Every Moroccan location, and the controversy the last one carries.",
  alternates: {
    canonical: "https://www.slowmorocco.com/morocco/the-odyssey-filming-locations",
  },
  openGraph: {
    title: "Where The Odyssey Was Filmed in Morocco",
    description:
      "Aït Benhaddou played Troy. The White Dune played Calypso's island. The full map of Nolan's Moroccan shoot — including the part everyone argues about.",
    url: "https://www.slowmorocco.com/morocco/the-odyssey-filming-locations",
  },
};

export default function OdysseyFilmingLocationsPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="px-6 md:px-14 pt-20 pb-12 border-b border-foreground/[0.08]">
        <Link
          href="/morocco"
          className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors mb-8 block"
        >
          ← Morocco
        </Link>
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
          Morocco on screen
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.1] mb-6 max-w-2xl">
          Where The Odyssey Was Filmed in Morocco
        </h1>
        <p className="text-base text-foreground/55 leading-relaxed max-w-xl">
          In late February 2025, before a single frame was shot in Greece,
          Christopher Nolan stood in front of a nine-hundred-year-old mud-brick
          village in the Ounila Valley and burned Troy. Morocco opens the film,
          and Morocco closes the shoot's most contested chapter. Here is the
          map.
        </p>
      </div>

      <div className="px-6 md:px-14 py-16 max-w-3xl space-y-12">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            Aït Benhaddou played Troy
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">
            The first scenes of the entire production were filmed at Aït
            Benhaddou, the fortified{" "}
            <a href="https://www.ksour.org" target="_blank" rel="noopener noreferrer" className="underline decoration-foreground/20 hover:decoration-foreground/60 transition-colors">ksar</a>{" "}
            near Ouarzazate, in the last week of
            February 2025 — a midnight raid on Troy, the war's ending staged
            before the wandering begins. The cinematographer Hoyte van Hoytema
            rigged banks of portable LEDs tuned to firelight so the IMAX
            cameras could turn in any direction and still find a city burning.
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed">
            Aït Benhaddou has been playing other people's cities since David
            Lean drove through in 1962. It was Yunkai in Game of Thrones and
            the arena town in Gladiator — Ridley Scott came back for Gladiator
            II — and UNESCO listed it in 1987, which means Troy was portrayed
            by a World Heritage Site. The residents are used to empires rising
            and falling on their doorstep. Most of them have moved across the
            river, and a handful of families still live inside the ksar,
            selling tea to the crews between apocalypses.
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            Marrakech, Tahannaout, Essaouira
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">
            The Moroccan leg ran wider than the ksar. Production moved through
            Marrakech and Tahannaout — a market town in Al Haouz province,
            twenty minutes south of the city, better known for its olive
            presses than its film credits — and out to the Agafay, the rocky
            desert plateau that gave Odysseus's mythical world its harsher
            edges. Then Essaouira, whose ramparts have been standing in for
            the ancient Mediterranean since Orson Welles filmed Othello there
            in 1949 — and whose beaches were given the film's most thankless
            role: Poseidon's wrath. The production notes confirm the storm
            seas are Essaouira's own Atlantic, wind and swell included, which
            any kitesurfer on that coast could have predicted. The sea god
            didn't need special effects; he needed the trade winds. Local
            outfits like Zak Productions, whose résumé runs from Bertolucci
            to Marvel, serviced the shoot.
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed">
            None of this is new. Morocco has been Hollywood's ancient world for
            decades — Mission: Impossible, Indiana Jones, both Gladiators — for
            the same reasons it has always traded well: the light, the
            geography, and the fact that a full crew costs a fraction of what
            it does in Europe. What is new is where the production went next.
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            The White Dune: Calypso's island
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">
            In the third week of July 2025, Matt Damon and Zendaya filmed for
            several days at the White Dune — Dune Blanche — a crescent of pale
            sand thirty kilometres from Dakhla that drops straight into a
            turquoise lagoon. In the film it is Ogygia, the island where
            Calypso keeps Odysseus for seven years. Damon described the
            location, the kitesurfing capital of the Atlantic coast, as
            paradise with the wind turned on: sand in the eyes, constantly, no
            way to block it. Odysseus wept on his beach for seven years; now we
            know why.
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed">
            This is the part of the map that comes with an argument attached.
            Dakhla sits in Western Sahara, a territory the UN classifies as
            non-self-governing, administered by Morocco since 1975 and claimed
            by the Sahrawi independence movement. The Western Sahara
            International Film Festival and the Polisario Front condemned the
            shoot; an open letter gathered signatures from Javier Bardem and
            Pedro Almodóvar among others, and called for the Dakhla scenes to
            be cut. Morocco's Cinematographic Center called it the first major
            Hollywood production in the territory and an extraordinary
            opportunity. Nolan and Universal have said nothing for a year. The
            film opens with, by several accounts, a shot of that beach.
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            The lotus-eaters were always in North Africa
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed">
            There is a older connection between this coastline and Homer than
            anything a location scout found. Ancient geographers — Herodotus
            among them — placed the land of the lotus-eaters on the North
            African coast, most often at the island of Djerba, a long sail east
            of here. Odysseus's men ate the fruit and forgot the way home,
            which remains the most accurate description of what Morocco does
            to certain travellers ever written. Nolan shot his epic across six
            countries to chase Homer's geography; the geography was pointing
            here all along.
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            The map
          </p>
          <OdysseyLocationsMap />
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            Seeing the locations
          </p>
          <div className="space-y-3">
            {[
              {
                place: "Aït Benhaddou",
                desc: "Four hours from Marrakech over the Tizi n'Tichka pass. Go at dawn, before the day-trip buses, and cross the river on the stepping stones. The film's Troy is the view from the east bank.",
              },
              {
                place: "Essaouira",
                desc: "Three hours west of Marrakech. The Skala ramparts and the harbour are the cinematic real estate — arrive on a weekday and the gulls outnumber the visitors.",
              },
              {
                place: "Tahannaout",
                desc: "Twenty minutes south of Marrakech on the Ourika road. Tuesday is souk day, which is the only correct day to go.",
              },
              {
                place: "The White Dune",
                desc: "Thirty kilometres from Dakhla, reachable by 4x4 at low tide. A two-hour flight from Casablanca — and, as above, a destination that carries a political question in its luggage. Travellers should know where they are standing.",
              },
            ].map((item) => (
              <div key={item.place}>
                <p className="text-sm text-foreground font-medium mb-1">
                  {item.place}
                </p>
                <p className="text-sm text-foreground/55 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-foreground/[0.08]">
          <p className="text-sm text-foreground/45 leading-relaxed">
            The Odyssey, written and directed by Christopher Nolan and shot
            entirely on IMAX 70mm, premiered in London on July 6, 2026 and
            opened in cinemas on July 17. Showtimes and tickets at the{" "}
            <a
              href="https://www.odysseymovie.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-foreground/20 hover:decoration-foreground/60 transition-colors"
            >
              official movie site
            </a>
            . Filming locations per Universal Pictures, the Hellenic Film
            Commission, Screen Daily, and reporting by The Guardian, Variety,
            and Hespress.
          </p>
        </div>
      </div>
    </div>
  );
}
