import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "The stories behind the door everyone photographs and nobody explains. Morocco, decoded by the people who live here — the layers beneath the surface.",
  openGraph: {
    title: "About Slow Morocco",
    description:
      "The layers beneath the surface. Morocco, decoded by the people who live here.",
    url: "https://www.slowmorocco.com/about",
  },
  alternates: {
    canonical: "https://www.slowmorocco.com/about",
  },
};

export const revalidate = 3600;

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">

      {/* ── Header ───────────────────────────────────────────────── */}
      <section className="pt-28 md:pt-36 pb-10 px-8 md:px-10 lg:px-14">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-3">
          About
        </h1>
        <div className="h-[1px] bg-foreground/12 mt-10" />
      </section>

      {/* ── Who we are ───────────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 pb-20 md:pb-28">
        <div className="max-w-2xl space-y-7 text-[15px] text-foreground/80 leading-[1.8]">

          <p className="text-foreground text-lg leading-[1.7]">
            We have been decoding Morocco since 2013 — the history, the food, the faith, the small mysteries — for people who would rather understand the country than simply photograph it. Though we understand the urge to photograph it.
          </p>

          <p>
            Behind the door everyone stops to photograph, there is a story — and the story is usually the better half.
          </p>

          <p>
            We are interested in the country underneath the one on the postcards. Why the great mosque faces slightly the wrong way (someone
            made a mistake, and everyone has been too polite to mention it for
            eight hundred years). What the carpet is quietly telling anyone who
            can read it. Why the bread arrives before anything else, and what
            happens to a guest who refuses it.
          </p>

          <p>
            We keep going, down into the good stuff — how the dye got into the leather.
            Who started the tower, and why they walked off and left it. What the
            twenty-four women in the vizier's palace were really fighting about
            (it was not the vizier). Read enough of it and a medina you have
            crossed a dozen times turns into a city you have never seen.
          </p>

          <p>
            And you start noticing things. The tile that is deliberately not
            quite like its neighbours — because only God makes perfect things,
            and the craftsman knew better than to try. The lane that is narrow
            on purpose. The loaf with somebody's initials pressed into it, off
            to an oven the whole street shares.
          </p>

          <p>
            And for those who would rather live it than read it, we build the
            journeys — 107 of them, private and made to measure. Routes that
            come home a different way than they set out, that put you up in old
            kasbahs instead of roadside hotels, that wander into corners most
            itineraries never find. We know the ground: which roads actually
            connect, which detour is worth the extra hour, where to sleep and
            when to move on before the coaches arrive.
          </p>

          <p>
            At the moment we are rather taken with the Odyssey — three weeks
            tracing the Morocco that Christopher Nolan filmed, from the red ksar that
            played Troy to the white dune at the far edge of the country that
            played Calypso&apos;s isle. It gives you the idea.{" "}
            <Link href="/journeys/the-odyssey" className="underline decoration-foreground/25 underline-offset-4 hover:decoration-foreground/60 transition-colors">
              Have a look
            </Link>
            , or{" "}
            <Link href="/journeys" className="underline decoration-foreground/25 underline-offset-4 hover:decoration-foreground/60 transition-colors">
              wander through all 107
            </Link>
            .
          </p>

          <p>
            Understand the country first. Then go and enjoy it properly.
          </p>


        </div>
      </section>

      {/* ── The people ───────────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 py-20 md:py-28 border-t border-foreground/[0.08]">
        <p className="text-[12px] tracking-[0.14em] uppercase text-foreground/60 mb-12">
          The people
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-12 max-w-5xl">
          {[
            {
              name: "Mohammed",
              role: "Co-Founder",
              bio: "Born in the Atlas. Built Slow Morocco from the ground up.",
              image: "/team/Mohammed.jpg",
            },
            {
              name: "Hassan",
              role: "Guide",
              bio: "Born in the Sahara, trained in hospitality. Patient, attentive, speaks four languages.",
              image: "/team/Hassan.jpg",
            },
            {
              name: "Youssef",
              role: "Guide & Driver",
              bio: "Knows every route, every shortcut, every safe stopping point.",
              image: "/team/Youssef.jpg",
            },
          ].map((person) => (
            <div key={person.name}>
              <div className="aspect-[4/5] overflow-hidden bg-foreground/[0.04] mb-4">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif text-xl text-foreground">{person.name}</h3>
              <p className="text-[11px] tracking-[0.12em] uppercase text-foreground/60 mt-1 mb-2">
                {person.role}
              </p>
              <p className="text-[14px] text-foreground/70 leading-[1.7]">
                {person.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── What lives here ──────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 py-20 md:py-28 border-t border-foreground/[0.08]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-10 max-w-5xl">
          {[
            {
              title: "Stories",
              body: "The history, craft, food and people, written the way someone who has lived here for years would tell you over a long dinner.",
              href: "/stories",
            },
            {
              title: "Places",
              body: "Cities, villages and landmarks, with the meaning a guidebook leaves out. What happened here, and why it still matters.",
              href: "/places",
            },
            {
              title: "Collections",
              body: "The archive read in order. Water from the tunnel to the gold it paid for, the trades from apprentice to maallem, three deserts that are not the same desert.",
              href: "/collections",
            },
            {
              title: "Glossary",
              body: "The words behind the country: food, faith, craft and custom, explained so the next thing you read makes far more sense.",
              href: "/glossary",
            },
          ].map((item) => (
            <div key={item.title}>
              <Link href={item.href} className="group block">
                <h2 className="text-[12px] tracking-[0.04em] uppercase text-foreground group-hover:text-foreground/70 transition-colors mb-3">
                  {item.title}
                </h2>
                <p className="text-[14px] text-foreground/70 leading-[1.7]">{item.body}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 py-14 border-t border-foreground/[0.08]">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
          <p className="text-[14px] text-foreground/60">
            Questions, commissions, or a story you think we've missed.
          </p>
          <Link
            href="/contact"
            className="text-[11px] tracking-[0.12em] uppercase text-foreground/60 hover:text-foreground/70 transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>

    </div>
  );
}
