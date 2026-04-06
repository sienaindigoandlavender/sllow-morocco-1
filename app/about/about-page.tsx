import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Slow Morocco",
  description:
    "Slow Morocco designs private journeys through Morocco for people who want to go deeper than the guidebook.",
  openGraph: {
    title: "About Slow Morocco",
    description:
      "Private journeys through Morocco for people who want to go deeper than the guidebook.",
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
            Slow Morocco is a private journey company.
          </p>

          <p>
            We design trips through Morocco for people who want to go deeper
            than the guidebook. Every route has been walked, every riad has
            been stayed in, every guide has been vetted.
          </p>

          <p>
            The stories on this site exist because understanding a place
            before you arrive changes what you see when you get there. Why the
            medina is shaped the way it is. What the call to prayer actually
            says. Who built the tower and why it stopped. The kind of knowledge
            you absorb by living somewhere — not by visiting.
          </p>

          <p>
            We don&apos;t recommend what we haven&apos;t experienced.
          </p>

        </div>
      </section>

      {/* ── Founder quote ────────────────────────────────────────── */}
      <section className="border-t border-foreground/[0.06] border-b border-foreground/[0.06]">
        <div className="max-w-3xl mx-auto px-8 md:px-10 py-20 md:py-28 text-center">
          <p className="font-serif text-xl md:text-2xl text-foreground/70 italic leading-[1.7] mb-8">
            &ldquo;The best journeys start with something you read that you
            can&apos;t stop thinking about. I moved to Morocco because this
            country moved me. I am sharing the Morocco, the real one, beyond
            the marketing buzzwords and the performances.&rdquo;
          </p>
          <p className="text-[11px] tracking-[0.15em] uppercase text-foreground/35">
            Jacqueline Ng — Founder
          </p>
        </div>
      </section>

      {/* ── What lives here ──────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10 max-w-4xl">
          {[
            {
              title: "Places",
              body: "Cities, villages, and landmarks with the context a guidebook can't carry. What they are and why they matter.",
              href: "/places",
            },
            {
              title: "Journeys",
              body: "Private trips shaped around what you're curious about. Every route is a starting point, not a script.",
              href: "/journeys",
            },
            {
              title: "Stories",
              body: "The history, craft, food, music, and people — written the way you'd hear it from someone who lives here.",
              href: "/stories",
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
