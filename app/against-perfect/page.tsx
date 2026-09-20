import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Best Thing in Marrakech Looks Like a Mistake",
  description:
    "We are not looking for the coolest restaurant in Morocco. We are looking for the ugly delicious and the ugly interesting — the realest everything, not the coolest anything.",
  openGraph: {
    title: "The Best Thing in Marrakech Looks Like a Mistake | Slow Morocco",
    description:
      "Against the stylish, always-perfect. Eat the dodgy sandwich. We look for the ugly delicious and the ugly interesting.",
    url: "https://www.slowmorocco.com/against-perfect",
  },
  alternates: { canonical: "https://www.slowmorocco.com/against-perfect" },
};

export const revalidate = 3600;

export default function AgainstPerfectPage() {
  return (
    <main className="bg-white text-[#0a0a0a]">
      {/* Opening */}
      <section className="px-6 md:px-10 lg:px-14 pt-28 md:pt-40 pb-14 md:pb-20">
        <div className="max-w-3xl">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#0a0a0a]/45 mb-8">
            Slow Morocco — what we look for
          </p>
          <h1 className="font-serif text-[clamp(2rem,5.5vw,3.75rem)] font-light tracking-[-0.02em] leading-[1.08]">
            The best thing in Marrakech looks like a mistake.
          </h1>
        </div>
      </section>

      {/* Body */}
      <section className="px-6 md:px-10 lg:px-14 pb-10 md:pb-16">
        <div className="max-w-2xl space-y-7 text-[17px] md:text-[19px] leading-[1.72] text-[#0a0a0a]/85 font-serif">
          <p>
            Everyone is chasing the best. The best riad, the best view, the best
            rooftop at the best hour, the ten sights you must see before the ten
            thousand people reading the same list beat you to them. Morocco has been
            photographed half to death by people all hunting the same shot.
          </p>
        </div>
      </section>

      {/* Statement 1 */}
      <section className="px-6 md:px-10 lg:px-14 py-10 md:py-16">
        <div className="max-w-3xl">
          <p className="font-serif text-[clamp(1.6rem,4vw,2.75rem)] font-light tracking-[-0.015em] leading-[1.15]">
            We&rsquo;re not doing that.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="px-6 md:px-10 lg:px-14 pb-10 md:pb-16">
        <div className="max-w-2xl space-y-7 text-[17px] md:text-[19px] leading-[1.72] text-[#0a0a0a]/85 font-serif">
          <p>
            The whole world has gone shiny. Everything is lit well, shot in slow
            motion, styled to be photographed and not lived. The riad with the
            correct tiles. The souk stall arranged for the lens. The &ldquo;hidden
            gem&rdquo; that fourteen guides send everyone to. It all looks beautiful
            and it all says nothing, because perfect has nothing left to discover.
            Perfect is what you make when you&rsquo;re afraid of being wrong.
          </p>
          <p>
            The things worth crossing a country for rarely shine. A door going grey
            and soft with age. A shrine down an alley that isn&rsquo;t on any map. A
            weaver working a pattern her town has argued over for two hundred years.
            A sandwich that looks like a mistake and that you&rsquo;ll think about
            for a year. None of it is styled. None of it is ranked. All of it is
            real.
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

      {/* Body */}
      <section className="px-6 md:px-10 lg:px-14 py-10 md:py-16">
        <div className="max-w-2xl space-y-7 text-[17px] md:text-[19px] leading-[1.72] text-[#0a0a0a]/85 font-serif">
          <p>
            That&rsquo;s what we&rsquo;re after. The ugly delicious and the ugly
            interesting — the fight over whose grandmother does it right, the wool
            pulled dripping from a vat that smells like the truth, the quarter no one
            tells you to visit because no one is selling it.
          </p>
          <p>
            We don&rsquo;t believe in the best. We don&rsquo;t trust the man who
            tells you where to go — we&rsquo;re not sure he&rsquo;s ever been curious
            in his life. We believe in the wrong turn, the thing you weren&rsquo;t
            looking for, the place no list could send you to because no one has
            ranked it yet. We&rsquo;d rather be curious than correct. We&rsquo;d
            rather hand you something &ldquo;fine&rdquo; that you never forget than
            something flawless that you do.
          </p>
          <p>
            And we don&rsquo;t know everything. Fifteen years in, we still get lost,
            still get handed things we can&rsquo;t name. That&rsquo;s the whole
            point. The day you&rsquo;ve got Morocco figured out is the day you stop
            seeing it.
          </p>
          <p>
            So skip the list. Don&rsquo;t chase the shiny thing. Come down the alley
            that smells like something is happening. We won&rsquo;t promise
            it&rsquo;ll be beautiful. We&rsquo;ll promise it&rsquo;s real — and real
            is the thing almost nobody is selling any more.
          </p>
        </div>
      </section>

      {/* Nod */}
      <section className="px-6 md:px-10 lg:px-14 pb-28 md:pb-40 pt-4">
        <div className="max-w-2xl">
          <p className="text-[13px] text-[#0a0a0a]/45 italic font-serif">
            With a nod to David Chang, who told travellers to throw away the phone
            and eat the dodgy sandwich.
          </p>
        </div>
      </section>
    </main>
  );
}
