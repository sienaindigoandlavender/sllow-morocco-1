import type { Metadata } from "next";
import Link from "next/link";
import OdysseyLocationsMap from "@/components/OdysseyLocationsMap";

export const metadata: Metadata = {
  title: "Where The Odyssey Was Filmed in Morocco: Aït Benhaddou, Essaouira, Dakhla",
  description:
    "Christopher Nolan opened his Odyssey shoot at Aït Benhaddou — the ksar played Troy — then moved through Marrakech, Tahannaout, and Essaouira before landing on the White Dune at Dakhla, on Morocco’s Atlantic coast. Every Moroccan location on Nolan’s map.",
  alternates: {
    canonical: "https://www.slowmorocco.com/morocco/the-odyssey-filming-locations",
  },
  openGraph: {
    title: "Where The Odyssey Was Filmed in Morocco",
    description:
      "Aït Benhaddou played Troy. The White Dune played Calypso's island. The full map of Nolan's Moroccan shoot, from the High Atlas to the Atlantic coast.",
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
          Before a single frame was shot in Greece, Christopher Nolan burned
          Troy in Morocco. It was February 2025. The city was a
          nine-hundred-year-old mud-brick ksar in the Ounila Valley. Morocco
          opens the film. Three thousand kilometres south, on an Atlantic dune,
          Morocco closes it. Here is the map.
        </p>
      </div>

      <div className="px-6 md:px-14 py-16 max-w-3xl space-y-12">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            Aït Benhaddou played Troy
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">
            The first frame of the whole production was shot here — the
            fortified{" "}
            <a href="https://www.ksour.org" target="_blank" rel="noopener noreferrer" className="underline decoration-foreground/20 hover:decoration-foreground/60 transition-colors">ksar</a>{" "}
            near Ouarzazate — in the last week of February 2025. A midnight
            raid. The end of the war, staged before the wandering begins. Hoyte
            van Hoytema rigged banks of portable LEDs tuned to firelight, so the
            IMAX cameras could turn any direction and still find a city burning.
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">
            Then the gates opened. On the other side, in the dark, stood Benny
            Safdie&apos;s Agamemnon — masked, enormous, motionless in black
            armour, seven hundred and fifty soldiers massed behind him. Damon
            didn&apos;t know they were there. He opened the door, he said, and
            then a roar went up and five hundred men came running. Agamemnon
            does nothing in that shot. He stands still and takes the entire
            scene. Aura, farmed.
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed">
            The ksar has been other people&apos;s cities since David Lean drove
            through in 1962. Yunkai in Game of Thrones. The arena town in
            Gladiator, twice — Ridley Scott came back for the sequel. UNESCO
            listed it in 1987, so Troy was played by a World Heritage Site. The
            people here have watched empires rise and fall on their doorstep for
            decades; the town next door has been{" "}
            <Link href="/morocco/ouarzazate-africas-hollywood" className="underline decoration-foreground/20 hover:decoration-foreground/60 transition-colors">
              Africa&apos;s Hollywood
            </Link>{" "}
            for sixty years. Most families moved across the river long ago. A
            handful still live inside the walls, selling tea to the crews
            between apocalypses.
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            Marrakech, Tahannaout, Essaouira
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">
            The Moroccan leg ran wider than the ksar. Marrakech. Tahannaout, a
            market town twenty minutes south, better known for its olive presses
            than its film credits. The Agafay, the stone desert that gave
            Odysseus&apos;s world its harder edges. And Essaouira, where Orson
            Welles shot Othello in 1949 and the wind has been working the coast
            ever since.
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">
            Essaouira got the strangest job. Nolan had carried one image for
            twenty years, since he was nearly hired to direct Troy in the early
            2000s: not a wooden horse on wheels, but an offering to Poseidon —
            thirty-five feet of it, reared up on its hind legs, half-buried in
            the sand like something the sea had spat back. He built it here. The
            Atlantic tore pieces off it between takes. The Trojans hauled it up
            the dunes on log rollers, by rope. The same beach launches Odysseus
            home.
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">
            The beach had a second role, thankless this time: Poseidon&apos;s
            wrath. The storm seas are Essaouira&apos;s own Atlantic, wind and
            swell included — which any kitesurfer on that coast could have told
            the production for free. The sea god didn&apos;t need effects. He
            needed the trade winds. Local crews like Zak Productions, whose
            résumé runs from Bertolucci to Marvel, made it happen.
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed">
            None of this is new. Morocco has been Hollywood&apos;s ancient world
            for decades — Mission: Impossible, Indiana Jones, both Gladiators —
            for the reasons it has always traded on: the light, the geography,
            and a full crew at a fraction of the European price. What is new is
            where the shoot went next.
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            The White Dune: Calypso&apos;s island
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">
            In the third week of July 2025, Matt Damon and Charlize Theron came
            to the White Dune — Dune Blanche — thirty kilometres from Dakhla,
            where the sand drops straight into a turquoise lagoon. In the film
            it is Ogygia, the island where Calypso keeps Odysseus for seven
            years. Damon called it paradise with the wind turned on: sand in
            your eyes, always, no way to block it. Odysseus wept on that beach
            for seven years. Now we know why.
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed">
            The place earns the role. The White Dune is a crescent of pale sand
            where the Atlantic pours into a lagoon so shallow it turns the
            colour of sea glass; flamingos stand in it at first light, and the
            wind that tormented Damon has been combing these dunes into slow
            crescents since long before anyone thought to write Homer down.
            This is Dakhla — a Moroccan city at the far reach of the Atlantic
            coast, Spanish until 1975 and, in the half-century since, grown into
            the kitesurfing capital of the ocean and one of the most
            written-about shorelines in Africa. The world has come round to what
            the maps here always showed. Nolan&apos;s crew found the first
            Hollywood production this coast had ever seen, and by several
            accounts the film opens on that beach: the first image of
            Odysseus&apos;s world, the last thing shot before the wandering
            begins, is a Moroccan dune at dawn.
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            The lotus-eaters were always in North Africa
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed">
            There is an older link between this coast and Homer than any
            location scout found. The ancient geographers — Herodotus among them
            — put the land of the lotus-eaters on the North African shore,
            usually at Djerba, a long sail east of here. Odysseus&apos;s men ate
            the fruit and forgot the way home. It is still the most accurate
            description ever written of what Morocco does to certain travellers.
            Nolan chased Homer&apos;s geography across six countries. The
            geography was pointing here all along.
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            The map
          </p>
          <OdysseyLocationsMap />
        </div>
      </div>
    </div>
  );
}
