import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "You're in | Slow Morocco",
  robots: { index: false, follow: false },
};

export default function NewsletterWelcomePage() {
  return (
    <div className="bg-background min-h-screen flex items-center justify-center">
      <div className="max-w-xl mx-auto px-6 py-32 text-center">
        <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
          You're in.
        </h1>
        <p className="text-muted-foreground mb-12">
          Your first story arrives next Tuesday.
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          In the meantime, explore:
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/stories"
            className="text-xs tracking-[0.15em] uppercase border border-foreground/15 px-5 py-2.5 text-foreground/60 hover:text-foreground hover:border-foreground/40 transition-colors"
          >
            Stories
          </Link>
          <Link
            href="/places"
            className="text-xs tracking-[0.15em] uppercase border border-foreground/15 px-5 py-2.5 text-foreground/60 hover:text-foreground hover:border-foreground/40 transition-colors"
          >
            Places
          </Link>
          <Link
            href="/darija"
            className="text-xs tracking-[0.15em] uppercase border border-foreground/15 px-5 py-2.5 text-foreground/60 hover:text-foreground hover:border-foreground/40 transition-colors"
          >
            Darija
          </Link>
        </div>
      </div>
    </div>
  );
}
