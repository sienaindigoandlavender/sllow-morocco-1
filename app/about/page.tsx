import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "The stories behind the door everyone photographs and nobody explains. Morocco, decoded by the people who live here, and the layers most visitors walk straight past.",
  openGraph: {
    title: "About Slow Morocco",
    description:
      "The layers most visitors walk straight past. Morocco, decoded by the people who live here.",
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
            Slow Morocco is a cultural authority on Morocco: its history, craft, food and faith, decoded for people who want to understand the country, not just photograph it.
          </p>

          <p>
            Behind the door everyone stops to photograph, there is a story, and it is almost always stranger than the photograph.
          </p>

          <p>
            Slow Morocco is about the country underneath the one visitors are
            shown. Why the great mosque faces slightly the wrong way. What the
            pattern in the carpet is telling anyone who can read it. Where the
            Jewish quarter went, and why the bread reaches the table before
            anything else.
          </p>

          <p>
            Most of what is written about the country stops at where to go and
            what to wear. This goes further down: how the dye got into the
            leather, who began the tower and why they abandoned it, what the
            twenty-four women in the vizier's palace were really fighting over.
            Read enough and you can walk a medina you have crossed a dozen times
            and find yourself in a city you have never seen.
          </p>

          <p>
            None of it is invented. Every claim is sourced and dated, drawn from
            the archives, the museums, and fifteen years on the ground. Where the
            record runs out, the account says so. The gaps are part of the truth,
            not something to be papered over with a confident guess.
          </p>

          <p>
            Nothing here is sponsored, and nothing ever will be. There is no
            advertiser to please and no package to sell. Only the record.
          </p>


        </div>
      </section>

      {/* ── What lives here ──────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 py-20 md:py-28 border-t border-foreground/[0.08]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10 max-w-4xl">
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
              title: "Glossary",
              body: "The words behind the country: food, faith, craft and custom, explained so the next thing you read makes far more sense.",
              href: "/glossary",
            },
          ].map((item) => (
            <div key={item.title}>
              <Link href={item.href} className="group block">
                <h2 className="text-[12px] tracking-[0.04em] uppercase text-foreground group-hover:text-foreground/60 transition-colors mb-3">
                  {item.title}
                </h2>
                <p className="text-[14px] text-foreground/50 leading-[1.7]">{item.body}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 py-14 border-t border-foreground/[0.08]">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
          <p className="text-[14px] text-foreground/40">
            Questions, commissions, or a story you think we've missed.
          </p>
          <Link
            href="/contact"
            className="text-[11px] tracking-[0.12em] uppercase text-foreground/35 hover:text-foreground/60 transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>

    </div>
  );
}
