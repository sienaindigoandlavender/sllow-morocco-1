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
          <p className="text-[11px] tracking-[0.24em] uppercase text-[#0a0a0a]/45 mb-8">
            Decoding Morocco since 2013
          </p>
          <p className="font-serif text-[clamp(1.5rem,3.4vw,2.4rem)] font-light tracking-[-0.015em] leading-[1.35] text-[#0a0a0a]">
            Every country runs on codes its visitors never see. Slow Morocco writes about the
            unseen ones — the meaning built into a wall, a gesture, a colour, a meal.
          </p>
        </div>
      </section>

      {/* What Slow Morocco is */}
      <section className="px-6 md:px-10 lg:px-14 pb-20 md:pb-28">
        <div className="max-w-2xl space-y-7 text-[16px] md:text-[17px] leading-[1.75] text-[#0a0a0a]/80 font-serif">
          <p>
            Once you can see them, your perception changes, and the country changes with it. You
            do not learn more facts about Morocco. You start to see a different Morocco.
          </p>
          <p>
            We have been at this since 2013 — reading the histories, sitting with the craftsmen,
            tracing where a word or a pattern came from, and writing it down. Hundreds of pieces now,
            each one following a single thread of the country until it makes sense. That reading is
            on the site, and it is where most people meet us.
          </p>
          <p>
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
            Reading changes how you see. Standing there changes it more. There comes a point where
            the page is not enough — where you want to be in the wall, the meal, the town most people
            drive past, with someone beside you who can tell you what you are looking at. That is when
            people come to us to travel.
          </p>
          <p>
            The journeys take the older roads, not the highway. You do not visit the country and
            have it explained. You move through it seeing the codes as they pass — and you come home
            reading the world a little differently than you did.
          </p>
          <p>
            Each journey is built around the person taking it, and led by the people who wrote the
            country down.
          </p>
        </div>
      </section>

      {/* Full-bleed image */}
      <ImageBand
        image="https://res.cloudinary.com/ddcznjibs/image/upload/v1772838482/Taourirt_Kasbah_rising_above_the_desert_town_lqljat.png"
        headline="Read it first. Then, if it won&rsquo;t leave you alone, come."
        height="medium"
      />

      {/* Manifesto link — what we look for */}
      <section className="px-6 md:px-10 lg:px-14 pt-20 md:pt-28">
        <Link href="/against-perfect" className="group block max-w-3xl">
          <p className="text-[11px] tracking-[0.24em] uppercase text-[#0a0a0a]/45 mb-5">
            What we look for
          </p>
          <p className="font-serif text-[clamp(1.4rem,3.2vw,2.2rem)] font-light tracking-[-0.015em] leading-[1.25] text-[#0a0a0a] group-hover:text-[#0a0a0a]/55 transition-colors">
            The best thing in Morocco looks like a mistake. We go after the real, never the shiny.
          </p>
          <span className="mt-5 inline-block text-[11px] tracking-[0.14em] uppercase text-[#0a0a0a]/45 group-hover:text-[#C2410C] transition-colors">
            Read the manifesto &rarr;
          </span>
        </Link>
      </section>

      {/* The two doors */}
      <section className="px-6 md:px-10 lg:px-14 py-24 md:py-32">
        <div className="max-w-3xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 border-t border-[#0a0a0a]/[0.1] pt-12">
            <Link href="/stories" className="group block">
              <h3 className="font-serif text-2xl md:text-3xl font-light tracking-[-0.015em] mb-2 group-hover:text-[#0a0a0a]/55 transition-colors">
                Read the country
              </h3>
              <p className="text-[14px] md:text-[15px] text-[#0a0a0a]/60 leading-relaxed">
                Hundreds of decoded pieces, as far down as you care to go.
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
                Journeys built around you, down the slower roads, with the people who wrote all of this.
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
