import Link from "next/link";

/**
 * ReadOn — the editorial exit from a high-traffic film page.
 *
 * The Odyssey page carries about a quarter of all search traffic and,
 * until now, offered two journey cards and nothing else. A reader who
 * is not going to book has nowhere to go, so they leave.
 *
 * This is the other door: four pieces from the archive that answer the
 * next question a film-location reader actually has. Not "related
 * articles" — each line says why it follows.
 */

export type ReadOnItem = {
  href: string;
  kicker: string;
  title: string;
  blurb: string;
};

export const ODYSSEY_READING: ReadOnItem[] = [
  {
    href: "/stories/hollywood-of-the-south",
    kicker: "Ouarzazate",
    title: "Africa's Largest Film Studio",
    blurb:
      "Why every ancient-world film ends up in the same valley, and what is still standing out there from the last forty years of them.",
  },
  {
    href: "/stories/the-desert-that-is-not-a-desert",
    kicker: "Agafay",
    title: "The Desert Forty Minutes from Marrakech",
    blurb:
      "There is no sand in it. It is a stone plain, and it plays the Sahara because it is close enough to shoot in a day.",
  },
  {
    href: "/stories/the-lotus-eaters",
    kicker: "Homer",
    title: "The Land of the Lotus-Eaters",
    blurb:
      "Herodotus put it on this coast. The plant grows here still, and it is the oldest description of what this country does to certain travellers.",
  },
  {
    href: "/stories/the-kasbahs",
    kicker: "Aït Benhaddou",
    title: "The Walls That Are Melting",
    blurb:
      "The ksar is earth, straw and lime, and it needs re-rendering every few years or it goes back to being a field.",
  },
];

export default function ReadOn({
  items = ODYSSEY_READING,
  heading = "Read on",
}: {
  items?: ReadOnItem[];
  heading?: string;
}) {
  return (
    <div className="mt-20 pt-12 border-t border-foreground/10">
      <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-6">
        {heading}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
        {items.map((it) => (
          <Link key={it.href} href={it.href} className="group block">
            <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-2">
              {it.kicker}
            </p>
            <h3 className="font-display text-xl leading-snug mb-1.5 group-hover:underline underline-offset-4">
              {it.title}
            </h3>
            <p className="text-sm text-foreground/65 leading-relaxed">
              {it.blurb}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
