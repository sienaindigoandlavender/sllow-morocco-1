import type { Metadata } from "next";
import Link from "next/link";
import RelatedJourneyCTA, { ODYSSEY_JOURNEY, FILM_ROUTE_JOURNEY } from "@/components/OdysseyJourneyCTA";
import OdysseyLocationsMap from "@/components/OdysseyLocationsMap";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Where The Odyssey Was Filmed in Morocco: Aït Benhaddou, Essaouira, Dakhla",
  description:
    "The masked Agamemnon ‘aura farming’ across TikTok — Benny Safdie — is standing inside a nine-hundred-year-old ksar. Where Christopher Nolan filmed The Odyssey in Morocco with Matt Damon, and Charlize Theron as Calypso: Aït Benhaddou, Essaouira, and the White Dune at Dakhla.",
  alternates: {
    canonical: "https://www.slowmorocco.com/morocco/the-odyssey-filming-locations",
  },
  openGraph: {
    title: "Where The Odyssey Was Filmed in Morocco",
    description:
      "Agamemnon’s ‘aura farming’ moment? Shot at Aït Benhaddou. The Trojan Horse? Essaouira. Charlize Theron’s Calypso? A dune near Dakhla. The Moroccan places that played the ancient world for Nolan, Matt Damon, and Zendaya’s Athena.",
    url: "https://www.slowmorocco.com/morocco/the-odyssey-filming-locations",
  },
};

export default function OdysseyFilmingLocationsPage() {
  return (
    <div className="bg-background min-h-screen">
      <ArticleSchema story={{ title: "Where The Odyssey Was Filmed in Morocco: Aït Benhaddou, Essaouira, Dakhla", slug: "morocco/the-odyssey-filming-locations", category: "Film" }} />
      <BreadcrumbSchema items={[
        { name: "Morocco", url: "https://www.slowmorocco.com/morocco" },
        { name: "Where The Odyssey Was Filmed in Morocco", url: "https://www.slowmorocco.com/morocco/the-odyssey-filming-locations" },
      ]} />
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
          The ksar was already nine hundred years old when the crew arrived to
          burn it down. It has played Troy before — and Jerusalem, and Yunkai,
          and the arena town in Gladiator — and it will be someone else&apos;s
          city next year. Christopher Nolan brought Matt Damon, Charlize Theron,
          Zendaya, and Tom Holland to Morocco for the reason every director does:
          the country has been playing the ancient world, and outlasting it,
          since long before cinema existed. The Odyssey is only the latest to
          arrive. Here is where it was filmed — and why the places outlast the
          films that borrow them.
        </p>
      </div>

      <div className="px-6 md:px-14 py-16 max-w-3xl space-y-12">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            The aura-farming shot was filmed at Aït Benhaddou
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">
            Right now the internet cannot stop watching a man stand still. Benny
            Safdie&apos;s Agamemnon — masked, monumental, motionless in black
            armour — is the film&apos;s viral moment, &apos;aura farming&apos; so
            hard that fans rank him beside the gods. The stillness is the
            performance. But the aura is a partnership: Safdie is standing inside{" "}
            <a href="https://www.ksour.org" target="_blank" rel="noopener noreferrer" className="underline decoration-foreground/20 hover:decoration-foreground/60 transition-colors">the ksar</a>{" "}
            of Aït Benhaddou, nine hundred years of packed earth and shadow near
            Ouarzazate, and the place has been lending actors its presence since
            1962. Damon opened the gate not knowing seven hundred and fifty
            soldiers waited in the dark behind it. A roar went up. Five hundred
            men came running. It made for one of the film&apos;s great entrances
            — staged inside a World Heritage Site that has hosted a few.
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed">
            This is simply what it does. Aït Benhaddou has been other
            people&apos;s cities since David Lean drove through in 1962 — Yunkai
            in Game of Thrones, the arena in both of Ridley Scott&apos;s
            Gladiators, Troy for Nolan — and UNESCO listed it in 1987, so the
            burning city on your screen is a World Heritage Site playing
            dress-up. The families inside have watched empires rise and fall on
            their doorstep for generations; the town next door has been{" "}
            <Link href="/morocco/ouarzazate-africas-hollywood" className="underline decoration-foreground/20 hover:decoration-foreground/60 transition-colors">
              Africa&apos;s Hollywood
            </Link>{" "}
            for sixty years. Most moved across the river long ago. A handful
            stayed, and still sell tea to the crews between apocalypses.
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            Essaouira has been the Mediterranean since 1949
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">
            Nolan&apos;s Moroccan shoot ran wider than the ksar — the olive-press
            town of Tahannaout south of Marrakech, the stone plains of the
            Agafay — but it was Essaouira that took the coast. The old port has
            stood in for the ancient Mediterranean since Orson Welles filmed
            Othello on its ramparts in 1949, and the wind does most of the
            acting. Nolan didn&apos;t build Poseidon&apos;s wrath; he turned the
            camera on the Atlantic and let the trade winds — the ones every
            kitesurfer on that coast already respects — play the angry sea god
            for free.
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed">
            Then, on the same sand, he set down an image he had carried for
            twenty years: the Trojan Horse, thirty-five feet of it, reared up on
            its hind legs and half-buried like an offering the tide had returned.
            The waves tore at it between takes. The horse is gone now. The beach
            is not. Odysseus sails home from it — and so, most mornings, do the
            fishing boats. None of this is new: Morocco has been Hollywood&apos;s
            ancient world for decades, for the reasons it always draws the
            cameras — the light, the geography, the sense that the past never
            fully left.
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            Charlize Theron&apos;s Calypso is a dune near Dakhla
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">
            Matt Damon and Charlize Theron filmed Calypso&apos;s captivity at the
            White Dune — Dune Blanche — thirty kilometres from Dakhla, where the
            Atlantic spills into a lagoon the colour of sea glass and flamingos
            stand in the shallows at first light. In the film it is Ogygia, the
            island where Theron&apos;s Calypso keeps Odysseus seven years while
            he weeps on the shore; Zendaya&apos;s Athena and Tom Holland&apos;s
            Telemachus carry the story on from other coasts. Damon called the
            place paradise with the wind turned on: sand in your eyes, always, no
            way to block it. He wept on that beach for seven years. Stand in that
            wind and you will understand.
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed">
            The place earns the role. The wind that tormented Damon has been
            combing these dunes into slow crescents since long before anyone
            thought to write Homer down. This is Dakhla — a Moroccan city on the
            far Atlantic coast, Spanish until 1975, and Moroccan and building fast
            ever since. The rest of the world has come round to it: the United
            States recognised Moroccan sovereignty over the Sahara in 2020, more
            than a hundred countries now back Morocco&apos;s plan for the region,
            and in 2025 the UN Security Council endorsed it as the way forward.
            More than thirty countries have opened consulates down the coast at
            Dakhla and Laâyoune. The recognition only made official what the light
            here already argued. The film opens on that beach: the first image of
            Odysseus&apos;s world, the last thing shot before the wandering
            begins, is a Moroccan dune at dawn.
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            The lotus-eaters were always in North Africa
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed">
            There is an older link between this coast and Homer than any location
            scout found. The ancient geographers — Herodotus among them — put the
            land of the lotus-eaters on the North African shore, usually at
            Djerba, a long sail east. Odysseus&apos;s men ate the fruit and
            forgot the way home. It is still the truest description ever written
            of what this country does to certain travellers. Nolan chased
            Homer&apos;s geography across six countries. It was pointing here all
            along.
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            The map
          </p>
          <OdysseyLocationsMap />
        </div>

        <RelatedJourneyCTA journeys={[ODYSSEY_JOURNEY, FILM_ROUTE_JOURNEY]} />
      </div>
    </div>
  );
}
