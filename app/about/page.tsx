import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Slow Morocco is a publication about Morocco built on real knowledge — the history, craft, food, and language you absorb by living somewhere, not by visiting.",
  openGraph: {
    title: "About Slow Morocco",
    description:
      "A publication for people who want to understand Morocco, not just visit it.",
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
            We live in Morocco. We write about what we know.
          </p>

          <p>
            The things that take time to notice. Why the medina is shaped the
            way it is. What the call to prayer actually says. Why the bread
            arrives before anything else. Where the Jewish quarter was, and
            why it moved. The story behind the door everyone photographs but
            nobody explains.
          </p>

          <p>
            Most Morocco content tells you where to go and what to wear.
            We go further back. How the dye got into the leather. Who built
            the tower and why it stopped. What the carpet is actually saying.
            The kind of knowledge you absorb by living somewhere — not by
            visiting.
          </p>

          <p>
            Entries are researched, dated, and revised. We work from academic
            books, museum documentation, UNESCO records, and what we see with
            our own eyes. Where scholarship disagrees, we say so.
          </p>

          <p>
            We carry no advertising. Nothing here has been paid for, and
            nothing will be.
          </p>

          <p>
            We write from a riad in the Marrakech medina — newsroom, test
            kitchen, and occasionally evidence. Corrections are acted on
            quickly. It is the only dignified way to be wrong.
          </p>

        </div>
      </section>

      {/* ── What lives here ──────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 py-20 md:py-28 border-t border-foreground/[0.08]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10 max-w-4xl">
          {[
            {
              title: "Stories",
              body: "The history, craft, food, music, and people — written the way you'd hear it from someone who lives here.",
              href: "/stories",
            },
            {
              title: "Places",
              body: "Cities, villages, and landmarks with the context a guidebook can't carry. What they are and why they matter.",
              href: "/places",
            },
            {
              title: "Glossary",
              body: "The words behind the country — food, faith, craft, and custom, defined plainly and kept current.",
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
            Questions, commissions, or just want to say hello.
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
