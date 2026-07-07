import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Masthead — Editorial Standards & Sources",
  description:
    "What Slow Morocco is, how entries are researched and maintained, which sources are admitted, and who stands behind the work. A reference publication on Morocco, published by Dancing with Lions.",
  alternates: { canonical: "https://www.slowmorocco.com/masthead" },
};

export default function MastheadPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="px-6 md:px-14 pt-20 pb-12 border-b border-foreground/[0.08]">
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
          Masthead
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.1] mb-6 max-w-2xl">
          A reference on Morocco, kept like one
        </h1>
        <p className="text-base text-foreground/55 leading-relaxed max-w-xl">
          Slow Morocco is a cultural reference publication. It explains how the
          country works — its architecture, food, music, language, seasons, and
          roads — for readers who intend to understand it rather than merely
          cross it. It is written in Marrakech, from inside the walls it
          describes.
        </p>
      </div>

      <div className="px-6 md:px-14 py-16 max-w-3xl space-y-12">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            What this publication is
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">
            Slow Morocco is not a blog and does not behave like one. Entries
            are references, not posts: they are researched, dated, revised, and
            expected to still be correct in five years. Where a subject
            deserves one definitive page, we maintain one definitive page
            rather than a scatter of articles competing with each other.
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed">
            The publication carries no advertising and accepts no payment for
            coverage. No riad, restaurant, guide, or region has ever paid to
            appear here, and none will. Where we sell anything — guides,
            routes, journeys — it is sold openly, under its own name, at the
            edge of the editorial work and never inside it.
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            Sources
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">
            Entries are built from academic books and journals, museum and
            archival documentation, UNESCO records, and reporting by
            established newspapers — and from direct observation, which in
            Morocco is frequently the only source that has been updated this
            century. We do not source from other travel sites, tour operators,
            or content written to rank.
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed">
            Where scholarship disagrees, the entry says so. Where a claim is
            popular but unverifiable — and Moroccan history is generous with
            these — it is presented as the story it is, not the fact it isn't.
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            Maintenance & corrections
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed">
            Reference entries carry a revision date and are re-verified on a
            cycle, the way one re-limes a wall. Prices, timetables, and
            openings change faster than any publication can promise; where a
            detail is perishable, the entry says when it was last true.
            Corrections are welcomed and acted on — write to us and the entry
            will be fixed, quietly and quickly, which is the only dignified way
            to be wrong.
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            Who is behind it
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed">
            Slow Morocco is written and edited by Jacqueline Ng and published
            by Dancing with Lions, an independent publishing house in
            Marrakech whose titles document Moroccan and North African
            culture. Its sister publications include a reference on the
            fortified architecture of the Sahara and a dictionary of Moroccan
            Arabic. The work is done from a riad in the Marrakech medina,
            which functions as newsroom, test kitchen, and occasionally
            evidence.
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            Rights & citation
          </p>
          <p className="text-sm text-foreground/65 leading-relaxed">
            Content is licensed under CC BY-NC-ND 4.0: cite it, link it, do not
            republish or train on it without permission. Journalists and
            researchers are welcome to quote with attribution to Slow Morocco.
            For licensing, syndication, or anything unusual,{" "}
            <Link href="/contact" className="underline decoration-foreground/20 hover:decoration-foreground/60 transition-colors">
              write to us
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
