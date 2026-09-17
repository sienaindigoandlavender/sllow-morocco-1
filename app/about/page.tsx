import Link from "next/link";
import { Metadata } from "next";
import ImageBand from "@/components/ImageBand";

export const metadata: Metadata = {
  title: "About",
  description:
    "Slow Morocco decodes the country — the meaning under the tilework, the reason a door is that colour, the depth that takes years to see.",
  openGraph: {
    title: "About Slow Morocco",
    description:
      "Slow Morocco is the translation. Not the language — the meaning. You arrive unable to read the place, and leave able to.",
    url: "https://www.slowmorocco.com/about",
  },
  alternates: { canonical: "https://www.slowmorocco.com/about" },
};

export const revalidate = 3600;

export default function AboutPage() {
  return (
    <main className="bg-white text-[#0a0a0a]">
      {/* Opening — the scene, the aha */}
      <section className="px-6 md:px-10 lg:px-14 pt-28 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-3xl">
          <p className="font-serif text-[clamp(1.5rem,3.4vw,2.4rem)] font-light tracking-[-0.015em] leading-[1.35] text-[#0a0a0a]">
            In the south, a man comes to market with his hands stained blue to the wrist. It reads
            as local colour. It is closer to a bank statement: the indigo he dyes his cloth with is
            costly, and the stain that will not wash out is how everyone around him knows what he
            can afford. He is not picturesque. He is telling you something, in a language the
            country speaks fluently and rarely translates.
          </p>
        </div>
      </section>

      {/* What Slow Morocco is */}
      <section className="px-6 md:px-10 lg:px-14 pb-20 md:pb-28">
        <div className="max-w-2xl space-y-7 text-[16px] md:text-[17px] leading-[1.75] text-[#0a0a0a]/80 font-serif">
          <p>
            Slow Morocco is the translation. We take the country apart one thread at a time and
            write down what it means — the colour of a door, the geometry of a courtyard, the four
            hundred years a Moroccan dynasty ruled part of Spain. Hundreds of pieces, and counting:
            the food, the music, the sacred, the trades, the long line of dynasties who came from
            the margins and took the centre.
          </p>
          <p>
            We do not summarise Morocco. We decode it. There is a difference between being shown a
            country and being able to read it, and the second is the whole of what we do. You
            arrive unable to read the place. You leave able to.
          </p>
        </div>
      </section>

      {/* Full-bleed image */}
      <ImageBand
        image="https://res.cloudinary.com/do2ojyohc/image/upload/v1789649344/history_gvgo0a.png"
        headline="Every wall in this country is a sentence."
      />

      {/* Why travel with us — shown, not argued */}
      <section className="px-6 md:px-10 lg:px-14 py-20 md:py-32">
        <div className="max-w-2xl space-y-7 text-[16px] md:text-[17px] leading-[1.75] text-[#0a0a0a]/80 font-serif">
          <p>
            Everything on this site is free to read, and most people will stop there — which is as
            it should be. But a door you have read about is not the same as a door you are standing
            in front of while someone tells you who painted it that colour and why. At some point
            the page runs out. That is where the journeys begin.
          </p>
          <p>
            We take a small number of travellers a year down the roads the country keeps to itself
            — not the highway to the desert but the older way, through the towns that never made the
            itinerary, at the pace things actually happen. What you have read here, you walk into.
            The kasbah you understood on the page, you stand inside, and it means more because you
            already know what it is. The meal is five hundred years of Andalusia and you can taste
            every one of them, because someone at the table can tell you which century you are
            tasting.
          </p>
          <p>
            They are led by the people who wrote the country down. That is the whole of it — you
            travel with the ones who did the reading, for years, so that you arrive already knowing
            where you are.
          </p>
        </div>
      </section>

      {/* Full-bleed image */}
      <ImageBand
        image="https://res.cloudinary.com/ddcznjibs/image/upload/v1772838482/Taourirt_Kasbah_rising_above_the_desert_town_lqljat.png"
        headline="Read it first. Then, if it won&rsquo;t leave you alone, come."
        height="medium"
      />

      {/* The two doors */}
      <section className="px-6 md:px-10 lg:px-14 py-24 md:py-32">
        <div className="max-w-3xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 border-t border-[#0a0a0a]/[0.1] pt-12">
            <Link href="/stories" className="group block">
              <h3 className="font-serif text-2xl md:text-3xl font-light tracking-[-0.015em] mb-2 group-hover:text-[#0a0a0a]/55 transition-colors">
                Read the country
              </h3>
              <p className="text-[14px] md:text-[15px] text-[#0a0a0a]/60 leading-relaxed">
                Hundreds of decoded pieces. Free, as far down as you care to go.
              </p>
              <span className="mt-4 inline-block text-[11px] tracking-[0.14em] uppercase text-[#0a0a0a]/45 group-hover:text-[#0a0a0a] transition-colors">
                The stories &rarr;
              </span>
            </Link>
            <Link href="/journeys" className="group block">
              <h3 className="font-serif text-2xl md:text-3xl font-light tracking-[-0.015em] mb-2 group-hover:text-[#0a0a0a]/55 transition-colors">
                Travel the country
              </h3>
              <p className="text-[14px] md:text-[15px] text-[#0a0a0a]/60 leading-relaxed">
                Private journeys, down the slower roads, with the people who wrote all of this.
              </p>
              <span className="mt-4 inline-block text-[11px] tracking-[0.14em] uppercase text-[#0a0a0a]/45 group-hover:text-[#0a0a0a] transition-colors">
                The journeys &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
