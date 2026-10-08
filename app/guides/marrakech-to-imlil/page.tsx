import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marrakech to Imlil",
  description:
    "The way from Marrakech to Imlil in the High Atlas — grand taxi via Asni, or a private car.",
  // Private guest guide — kept out of search and off the AI crawlers on purpose.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  // For a clean preview when the link is shared directly (WhatsApp, email).
  openGraph: {
    title: "Marrakech to Imlil",
    description: "The way up to the High Atlas, and back down into the medina.",
    type: "article",
  },
};

const KICKER =
  "block text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-[#E3120B] mb-4 font-sans";

function StepNumber({ n }: { n: number }) {
  return (
    <span className="font-serif text-lg font-medium w-9 h-9 flex items-center justify-center bg-[#E3120B] text-white shrink-0 tabular-nums">
      {n}
    </span>
  );
}

export default function MarrakechToImlilPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-24">
      <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
        {/* Masthead */}
        <header>
          <span className={KICKER}>Getting there · The High Atlas</span>
          <h1 className="font-serif text-4xl md:text-6xl leading-[1.03] mb-6 text-balance">
            Marrakech to Imlil
          </h1>
          <p className="font-serif text-xl md:text-2xl text-foreground/70 leading-relaxed max-w-2xl">
            The road into the High Atlas ends at Imlil, and no train or bus will
            carry you the last stretch. Here is the honest way up — and back down
            into the medina.
          </p>
        </header>

        {/* Lead */}
        <section className="mt-16">
          <p className="font-serif text-lg md:text-xl leading-relaxed text-foreground/90">
            Imlil sits sixty-five kilometres south of Marrakech and nearly thirteen
            hundred metres higher, at the mouth of the valley that climbs to Toubkal —
            at 4,167 metres, the highest peak in North Africa. No bus runs from the
            city into the mountains; the valley doesn&apos;t allow it. So the shape is
            always the same: you reach Marrakech, and from there a car or a grand taxi
            carries you the last stretch.
          </p>
        </section>

        {/* Up to the mountains */}
        <section className="mt-20">
          <div className="border-b-2 border-foreground pb-3 mb-10">
            <span className={KICKER}>Up to the mountains</span>
            <h2 className="font-serif text-2xl md:text-4xl leading-tight">
              From Marrakech to Imlil
            </h2>
          </div>

          <p className="text-foreground/80 leading-relaxed mb-10">
            The trains and the long-distance buses (Supratours, CTM) arrive in
            Guéliz, the newer part of the city. The grand taxis for the mountains
            leave from Bab er Robb, on the far side of the medina — so first you
            cross town, then you climb. Two ways to make it.
          </p>

          {/* Option 1 */}
          <div className="mb-12">
            <div className="flex items-baseline gap-3 flex-wrap mb-3">
              <span className="font-serif text-2xl font-medium text-[#E3120B] leading-none">1</span>
              <h3 className="font-serif text-2xl leading-tight">Hire a car straight up</h3>
              <span className="font-sans text-[10px] tracking-[0.14em] uppercase text-foreground/50 border border-border px-2 py-1">
                No changes
              </span>
            </div>
            <p className="text-foreground/80 leading-relaxed max-w-[60ch]">
              The calm option with luggage: a private car, or a chartered grand taxi,
              straight to Imlil with no stops — about an hour and a half. Many
              guesthouses in Imlil will send a driver to meet your arrival if you ask
              the night before; otherwise you can arrange one at the Bab er Robb rank.
            </p>
            <p className="font-sans text-sm text-foreground/60 mt-3 tabular-nums">
              Roughly <span className="text-foreground font-medium">400–700 dh</span> for
              the car — a flat price for the vehicle, not per person.
            </p>
          </div>

          {/* Option 2 */}
          <div>
            <div className="flex items-baseline gap-3 flex-wrap mb-3">
              <span className="font-serif text-2xl font-medium text-[#E3120B] leading-none">2</span>
              <h3 className="font-serif text-2xl leading-tight">The shared grand taxi</h3>
              <span className="font-sans text-[10px] tracking-[0.14em] uppercase text-foreground/50 border border-border px-2 py-1">
                The local road
              </span>
            </div>
            <p className="text-foreground/80 leading-relaxed max-w-[60ch] mb-7">
              Cheaper, slower, more of an adventure — old cream Mercedes that leave
              when their six seats are full. Three small moves.
            </p>

            <ol className="flex flex-col gap-7">
              <li className="flex gap-4">
                <StepNumber n={1} />
                <div>
                  <span className="font-serif text-lg font-medium block mb-1">
                    Petit taxi to Bab er Robb
                  </span>
                  <p className="text-foreground/80 leading-relaxed max-w-[58ch]">
                    From wherever you arrive, a small city taxi across to the
                    grand-taxi rank at Bab er Robb, by Sidi Mimoun — about ten minutes,
                    20–30 dh. City taxis can&apos;t leave Marrakech, so this is as far
                    as one takes you.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <StepNumber n={2} />
                <div>
                  <span className="font-serif text-lg font-medium block mb-1">
                    Grand taxi to Asni
                  </span>
                  <p className="text-foreground/80 leading-relaxed max-w-[58ch]">
                    Share a grand taxi up to Asni, the market town at the foot of the
                    range. Around 45 minutes; roughly 35–50 dh a seat. Agree the fare
                    before you sit down.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <StepNumber n={3} />
                <div>
                  <span className="font-serif text-lg font-medium block mb-1">
                    Change at Asni for Imlil
                  </span>
                  <p className="text-foreground/80 leading-relaxed max-w-[58ch]">
                    At Asni, change to a second grand taxi for the last climb up the
                    Mizane valley. Around 45 minutes; roughly 30 dh a seat. A few
                    direct Marrakech–Imlil taxis exist, but Asni is the dependable
                    connection.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Back down */}
        <section className="mt-20">
          <div className="border-b-2 border-foreground pb-3 mb-10">
            <span className={KICKER}>Back down</span>
            <h2 className="font-serif text-2xl md:text-4xl leading-tight">
              Imlil to the medina
            </h2>
          </div>
          <p className="text-foreground/80 leading-relaxed max-w-[62ch]">
            Coming down, the grand taxis run the same road in reverse and set you
            back at Bab er Robb, by Sidi Mimoun. Travel in the morning — they thin
            out as the day wears on. If you&apos;re staying inside the medina, most
            riads are a ten-to-fifteen-minute walk from there, past the
            horse-carriage stand and on into the lanes. One warning worth more than
            any map: Google Maps is unreliable in the medina and will often point you
            to the wrong door. Follow your riad&apos;s own directions, or call ahead
            and let them steer you in.
          </p>
        </section>

        {/* Good to know */}
        <section className="mt-20">
          <div className="border-b-2 border-foreground pb-3 mb-10">
            <span className={KICKER}>Good to know</span>
            <h2 className="font-serif text-2xl md:text-4xl leading-tight">
              Small things that help
            </h2>
          </div>
          <ul className="flex flex-col gap-5">
            {[
              ["Saturday is Asni's souk day.", "Taxis to Asni run thick and fast — but the market town itself will be gloriously, happily busy."],
              ["Grands taxis fill to six before they leave.", "In a hurry, you can pay for the empty seats and go now, or charter the whole car for your own price."],
              ["You climb from about 450 m to 1,740 m.", "Ears pop on the way up; bring a layer, the mountain air is cooler than the city's."],
              ["Imlil is the trailhead for Toubkal.", "From the village square, the mules and the mountain begin."],
            ].map(([bold, rest]) => (
              <li key={bold} className="flex gap-4">
                <span className="w-[7px] h-[7px] bg-[#E3120B] shrink-0 mt-[0.6em]" />
                <p className="text-foreground/80 leading-relaxed max-w-[60ch]">
                  <span className="font-medium text-foreground">{bold}</span> {rest}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Closing */}
        <section className="mt-20">
          <p className="font-serif italic text-xl md:text-2xl leading-relaxed text-foreground/90 max-w-[40ch]">
            However you come up, the last turn is the same: the valley narrows, the
            walnut trees close in, and the road simply runs out. That is Imlil.
          </p>
        </section>
      </div>
    </div>
  );
}
