import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Manifesto",
  description:
    "Slow Morocco exists because we got tired of watching it. We skip the tourist routes and go after the real — the ugly interesting, not the perfect stylish. We introduce you. That's it.",
  openGraph: {
    title: "The Manifesto | Slow Morocco",
    description:
      "We skip the tourist routes and go after the real — the ugly interesting, not the perfect stylish. We introduce you. That's it.",
    url: "https://www.slowmorocco.com/manifesto",
  },
  alternates: { canonical: "https://www.slowmorocco.com/manifesto" },
};

export const revalidate = 3600;

export default function ManifestoPage() {
  return (
    <main className="bg-white text-[#0a0a0a]">
      {/* Opening */}
      <section className="px-6 md:px-10 lg:px-14 pt-28 md:pt-40 pb-14 md:pb-20">
        <div className="max-w-3xl">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#0a0a0a]/45">
            Slow Morocco — the manifesto
          </p>
        </div>
      </section>

      {/* Body — the lie */}
      <section className="px-6 md:px-10 lg:px-14 pb-10 md:pb-16">
        <div className="max-w-2xl space-y-7 text-[17px] md:text-[19px] leading-[1.72] text-[#0a0a0a]/85 font-serif">
          <p>
            The carpet merchant will tell you it&rsquo;s antique. It isn&rsquo;t.
            The guide will walk you to his cousin&rsquo;s shop. The hotel calls its
            rooftop &ldquo;authentic Marrakech&rdquo; and sends up the same tagine as
            every other rooftop on the block. This is the Morocco most people are
            sold — a set, dressed for a photograph, with the cost of the show built
            into the bill.
          </p>
          <p>
            And the whole world has gone that way. Everything is lit well, shot in
            slow motion, styled to be posted and not lived. Everyone is chasing the
            best — the best riad, the best view, the best rooftop at the best hour,
            the ten sights you must see before the ten thousand people reading the
            same list beat you to them. Morocco has been photographed half to death
            by people all hunting the same shot.
          </p>
        </div>
      </section>

      {/* Statement 1 */}
      <section className="px-6 md:px-10 lg:px-14 py-10 md:py-16">
        <div className="max-w-3xl">
          <h1 className="font-serif text-[clamp(1.6rem,4vw,2.75rem)] font-light tracking-[-0.015em] leading-[1.15]">
            Slow Morocco exists because we got tired of watching it.
          </h1>
        </div>
      </section>

      {/* Body — the real doesn't shine */}
      <section className="px-6 md:px-10 lg:px-14 pb-10 md:pb-16">
        <div className="max-w-2xl space-y-7 text-[17px] md:text-[19px] leading-[1.72] text-[#0a0a0a]/85 font-serif">
          <p>
            We&rsquo;re not doing that. Perfect looks beautiful and says nothing,
            because perfect has nothing left to discover. Perfect is what you make
            when you&rsquo;re afraid of being wrong.
          </p>
          <p>
            The things worth crossing a country for rarely shine. A door going grey
            and soft with age. A shrine down an alley that isn&rsquo;t on any map. A
            weaver working a pattern her town has argued over for two hundred years.
            None of it is styled. None of it is ranked. All of it is real.
          </p>
        </div>
      </section>

      {/* Statement 2 */}
      <section className="px-6 md:px-10 lg:px-14 py-12 md:py-20 border-y border-[#0a0a0a]/[0.1] my-4 md:my-8">
        <div className="max-w-3xl">
          <p className="font-serif text-[clamp(1.6rem,4vw,2.75rem)] font-light tracking-[-0.015em] leading-[1.15]">
            Not the coolest anything.
            <br />
            <span className="text-[#C2410C]">The realest everything.</span>
          </p>
        </div>
      </section>

      {/* Body — the Velveteen turn: what "real" means */}
      <section className="px-6 md:px-10 lg:px-14 py-10 md:py-16">
        <div className="max-w-2xl space-y-7 text-[17px] md:text-[19px] leading-[1.72] text-[#0a0a0a]/85 font-serif">
          <p>
            Someone wrote this down a hundred years before the food writers found
            it. A stuffed rabbit asks an old toy horse how a toy becomes real, and
            the horse tells him: it happens when you are loved for a long time —
            until your fur is rubbed off and your joints go loose and your eyes drop
            out — and by then you are shabby, and none of it matters, because once
            you are real you can&rsquo;t be ugly, except to people who don&rsquo;t
            understand.
          </p>
          <p>
            The shiny riad is a toy still in its box. The grey door, soft with age,
            has been loved into being real — and that is the whole difference.
          </p>
        </div>
      </section>

      {/* Body — the network + the ethos */}
      <section className="px-6 md:px-10 lg:px-14 py-10 md:py-16">
        <div className="max-w-2xl space-y-7 text-[17px] md:text-[19px] leading-[1.72] text-[#0a0a0a]/85 font-serif">
          <p>
            The ugly delicious and the ugly interesting. The real Morocco runs on
            people who never advertise, because they never had to: the zellige
            cutter who learned the geometry from his father, the Gnawa maalem who
            plays only when the night asks for it, the hammam keeper who remembers
            when there were no tourists at all.
          </p>
          <p>
            We don&rsquo;t believe in the best. We don&rsquo;t trust the man who
            tells you where to go — we&rsquo;re not sure he&rsquo;s ever been curious
            in his life. We&rsquo;d rather be curious than correct, and hand you
            something &ldquo;fine&rdquo; you never forget than something flawless you
            do. And we don&rsquo;t know everything. Years in, we still get lost,
            still get handed things we can&rsquo;t name. That&rsquo;s the whole
            point. The day you&rsquo;ve got Morocco figured out is the day you stop
            seeing it.
          </p>
          <p>
            So skip the routes. Don&rsquo;t chase the shiny thing. The people who
            make this country worth the trip aren&rsquo;t on any list, because the
            real was never for sale.
          </p>
        </div>
      </section>

      {/* Close */}
      <section className="px-6 md:px-10 lg:px-14 py-16 md:py-24 border-t border-[#0a0a0a]/[0.1]">
        <div className="max-w-3xl">
          <p className="font-serif text-[clamp(2rem,5vw,3.25rem)] font-light tracking-[-0.02em] leading-[1.1]">
            We introduce you.
          </p>
          <p className="font-serif text-[clamp(2rem,5vw,3.25rem)] font-light tracking-[-0.02em] leading-[1.1] text-[#0a0a0a]/40 mt-1">
            That&rsquo;s it.
          </p>
        </div>
      </section>

      {/* Nod */}
      <section className="px-6 md:px-10 lg:px-14 pb-28 md:pb-40 pt-8">
        <div className="max-w-2xl">
          <p className="text-[16px] md:text-[18px] text-[#0a0a0a]/60 italic font-serif leading-[1.6]">
            With a nod to the visionary, game-changing Chef David Chang, who told
            travellers to throw away the phone and eat{" "}
            <Link
              href="/stories/first-the-liver-then-the-head"
              className="underline decoration-[#0a0a0a]/25 underline-offset-2 hover:decoration-[#C2410C] hover:text-[#0a0a0a]/80 transition-colors"
            >
              the dodgy sandwich
            </Link>
            .
          </p>
          <p className="text-[13px] md:text-[14px] text-[#0a0a0a]/45 italic font-serif leading-[1.6] mt-3">
            And to the Skin Horse, who said it first, in Margery Williams&rsquo;s{" "}
            <em>The Velveteen Rabbit</em> (1922).
          </p>
        </div>
      </section>
    </main>
  );
}
