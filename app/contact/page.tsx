import { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Planning a journey begins at Plan Your Trip. For a correction, a permission, or a question about the writing, write to us directly.",
  openGraph: {
    title: "Contact | Slow Morocco",
    description:
      "Journeys begin at Plan Your Trip. Everything else, by letter.",
    url: "https://www.slowmorocco.com/contact",
  },
  alternates: { canonical: "https://www.slowmorocco.com/contact" },
};

export const revalidate = 3600;

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <PageBanner
        slug="contact"
        fallback={{
          title: "Write to us",
          subtitle: "Journeys begin at Plan Your Trip. Everything else, by letter.",
          label: "Get in Touch",
        }}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-16 max-w-2xl space-y-14">

          {/* Planning a journey → the deposit door */}
          <div>
            <p className="text-[11px] tracking-[0.28em] uppercase text-foreground/45 mb-5">
              Planning a journey
            </p>
            <p className="font-serif text-[clamp(1.4rem,3vw,2rem)] font-light leading-[1.3] text-foreground mb-6">
              This is where it begins.
            </p>
            <p className="text-[16px] leading-[1.75] text-foreground/70 mb-7">
              We design privately, and we design once. Tell us who is travelling
              and what draws you, and the work starts from there.
            </p>
            <Link
              href="/plan-your-trip"
              className="inline-block border border-foreground px-9 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-colors"
            >
              Plan your trip &rarr;
            </Link>
          </div>

          {/* Everything else → the letter */}
          <div className="border-t border-foreground/10 pt-14">
            <p className="text-[11px] tracking-[0.28em] uppercase text-foreground/45 mb-5">
              Everything else
            </p>
            <p className="text-[16px] leading-[1.75] text-foreground/70 mb-6">
              A correction, a permission, a source we should have read, or a
              question about the writing &mdash; write to us directly. We read
              everything.
            </p>
            <a
              href="mailto:hello@slowmorocco.com"
              className="font-serif text-[clamp(1.2rem,2.6vw,1.7rem)] text-foreground hover:text-foreground/55 transition-colors underline decoration-foreground/20 underline-offset-4"
            >
              hello@slowmorocco.com
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}
