import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ouarzazate, Africa's Hollywood: Every Film Shot There & the New Cinema City",
  description:
    "Lawrence of Arabia, Gladiator, Game of Thrones, The Odyssey — six decades of cinema made in one Moroccan desert town. Now Morocco is building a $25 million Cinema City to keep the productions there. The full story, and how to visit the sets.",
  alternates: {
    canonical: "https://www.slowmorocco.com/morocco/ouarzazate-africas-hollywood",
  },
  openGraph: {
    title: "Ouarzazate, Africa's Hollywood",
    description:
      "Six decades of cinema in one desert town — from Lawrence of Arabia to Nolan's Odyssey, and the new $25M Cinema City rising at the town's entrance.",
    url: "https://www.slowmorocco.com/morocco/ouarzazate-africas-hollywood",
  },
};

const FILMS = [
  { title: "Lawrence of Arabia", year: "1962", note: "David Lean arrives; the industry follows for sixty years." },
  { title: "Kundun", year: "1997", note: "Scorsese builds Tibet in the desert." },
  { title: "The Mummy", year: "1999", note: "Ancient Egypt, Moroccan edition." },
  { title: "Gladiator", year: "2000", note: "The provincial arena — Aït Benhaddou plays the warm-up to Rome." },
  { title: "Kingdom of Heaven", year: "2005", note: "Ridley Scott returns; Jerusalem rises outside town." },
  { title: "Babel", year: "2006", note: "Iñárritu shoots the Moroccan thread where it belongs." },
  { title: "Body of Lies", year: "2008", note: "Standing in for half the Middle East." },
  { title: "Game of Thrones", year: "2013", note: "Aït Benhaddou becomes Yunkai; Essaouira, Astapor." },
  { title: "Gladiator II", year: "2024", note: "Scott's third visit. Some directors keep a favorite café; he keeps a country." },
  { title: "The Odyssey", year: "2026", note: "Nolan burns Troy at Aït Benhaddou — the first scenes of the whole production." },
];

export default function OuarzazateHollywoodPage() {
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
          Ouarzazate, Africa&apos;s Hollywood
        </h1>
        <p className="text-base text-foreground/55 leading-relaxed max-w-xl">
          A desert town of ninety thousand people has played ancient Rome,
          Tibet, Egypt, Jerusalem, Somalia, and Westeros. Sixty years after
          David Lean drove through, Morocco is spending $25 million to make
          sure the cameras never leave.
        </p>
      </div>

      <div className="px-6 md:px-14 py-16 max-w-3xl space-y-12">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            Why here
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">
            The answer is the light, and what it falls on. Ouarzazate sits at
            the junction of three worlds a location scout dreams about: the
            High Atlas to the north, the Sahara to the south, and between them
            the valleys of earthen kasbahs that photograph as any century you
            like. Add three hundred days of sun, a workforce that has been
            building film sets for two generations, and costs at a fraction of
            Europe&apos;s — the town stopped being a discovery decades ago and
            became a habit.
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed">
            Atlas Studios, opened in 1983 on the road west of town, claims the
            title of largest film studio in the world by acreage — a
            back lot where a Tibetan monastery, an Egyptian temple, and a
            fighter jet from a forgotten thriller sit in the same quarter mile
            of desert, aging together in the sun.
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            The filmography
          </p>
          <div className="space-y-3">
            {FILMS.map((f) => (
              <div key={f.title} className="flex gap-4 items-baseline">
                <span className="text-xs text-foreground/35 font-mono w-10 shrink-0">{f.year}</span>
                <div>
                  <span className="text-sm text-foreground font-medium">{f.title}</span>
                  <span className="text-sm text-foreground/50"> — {f.note}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-foreground/55 leading-relaxed mt-6">
            The list runs far longer — The Hills Have Eyes, Spy Game, Queen of
            the Desert, a hundred productions nobody remembers and a dozen
            everybody does. For where Nolan&apos;s Odyssey filmed across
            Morocco, the{" "}
            <Link
              href="/morocco/the-odyssey-filming-locations"
              className="underline decoration-foreground/20 hover:decoration-foreground/60 transition-colors"
            >
              full map is here
            </Link>
            .
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            The Cinema City: keeping the cameras
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">
            In June 2026, Morocco broke ground on the International Cinema
            City — a 240 million dirham (roughly $25 million) complex on
            twenty-four acres at the entrance to town. The plan reads like a
            confession of everything Ouarzazate could not do before: sound
            stages, digital labs, editing and screening rooms, a training
            academy, and hotels for the crews. Productions have always come
            here to shoot and then flown home to edit. The new complex means
            the film can stay.
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed">
            The funding is a regional wager — 80 million dirhams from the
            Drâa-Tafilalet council, 60 million each from two ministries — on
            the idea that a town which has serviced other people&apos;s
            imaginations for sixty years should finally own a piece of the
            machinery. Thousands of jobs are promised. The kasbahs, as ever,
            will do the real acting unpaid.
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            Visiting the sets
          </p>
          <div className="space-y-3">
            {[
              {
                place: "Atlas Studios",
                desc: "Five kilometres west of town on the Marrakech road. Guided visits daily; you walk through Egypt, Tibet, and Rome in an hour. Go late afternoon when the light turns the plaster sets briefly convincing.",
              },
              {
                place: "Aït Benhaddou",
                desc: "Thirty kilometres northwest — the ksar that played Yunkai, the Gladiator arena town, and Nolan's Troy. Dawn, stepping stones, east bank. The most-filmed building in Africa.",
              },
              {
                place: "Kasbah Taourirt",
                desc: "In town, and the real thing — the Glaoui kasbah whose corridors have doubled for a dozen palaces. Restored wing open to visitors.",
              },
              {
                place: "The Cinema Museum",
                desc: "Opposite Taourirt, in a former studio: props, sets, and the pleasant confusion of a Roman throne next to a spaceship.",
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
            The earthen architecture the cameras keep returning to — the
            kasbahs and ksour of the Drâa and Ounila valleys — is documented
            in depth at the{" "}
            <a
              href="https://www.ksour.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-foreground/20 hover:decoration-foreground/60 transition-colors"
            >
              Ksour Archive
            </a>
            . Cinema City details per the Ministry of Youth, Culture and
            Communication, and reporting by Variety and Hespress, June 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
