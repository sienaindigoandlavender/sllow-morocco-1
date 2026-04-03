import { Metadata } from "next";
import Link from "next/link";
import { getDestinations, convertDriveUrl } from "@/lib/supabase";
import { cloudinaryUrl } from "@/lib/cloudinary";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Destinations — Slow Morocco",
  description:
    "Every city, valley, mountain, and coast we cover. The definitive guide to Morocco, destination by destination.",
  alternates: {
    canonical: "https://www.slowmorocco.com/destinations",
  },
};

function imgSrc(url: string | null, width: number = 800): string {
  if (!url) return "";
  return cloudinaryUrl(convertDriveUrl(url), width);
}

export default async function DestinationsPage() {
  const destinations = await getDestinations({ published: true });

  const withImages = destinations.filter((d) => d.hero_image);
  const withoutImages = destinations.filter((d) => !d.hero_image);

  const heroCards = withImages.slice(0, 3);
  const gridCards = withImages.slice(3);

  return (
    <main className="bg-background text-foreground min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="pt-28 md:pt-36 pb-6 md:pb-10 px-6 md:px-[8%] lg:px-[12%]">
        <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-4">
          The Definitive Guide
        </p>
        <h1 className="font-serif text-[clamp(2.5rem,8vw,6rem)] leading-[0.92] tracking-[-0.02em] text-foreground max-w-[14ch]">
          Every destination we cover
        </h1>
      </section>

      {/* ── Hero Mosaic — 3 featured destinations ────────────────────── */}
      {heroCards.length >= 3 && (
        <section className="px-6 md:px-[8%] lg:px-[12%] pb-16 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">

            {/* Large left — spans 7 cols */}
            <Link
              href={`/${heroCards[0].slug}`}
              className="group md:col-span-7 relative overflow-hidden"
            >
              <div className="aspect-[4/3] md:aspect-[16/11] relative">
                <img
                  src={imgSrc(heroCards[0].hero_image, 1400)}
                  alt={heroCards[0].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-white/60 mb-2">
                    {heroCards[0].subtitle || ""}
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-[1.05]">
                    {heroCards[0].title}
                  </h2>
                </div>
              </div>
            </Link>

            {/* Right stack — 5 cols, 2 cards */}
            <div className="md:col-span-5 flex flex-col gap-4 md:gap-5">
              {heroCards.slice(1, 3).map((d) => (
                <Link
                  key={d.slug}
                  href={`/${d.slug}`}
                  className="group relative overflow-hidden flex-1"
                >
                  <div className="aspect-[16/10] md:aspect-auto md:h-full relative min-h-[200px]">
                    <img
                      src={imgSrc(d.hero_image, 900)}
                      alt={d.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                      <p className="text-[10px] tracking-[0.3em] uppercase text-white/50 mb-1.5">
                        {d.subtitle || ""}
                      </p>
                      <h2 className="font-serif text-xl md:text-2xl text-white leading-[1.1]">
                        {d.title}
                      </h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Asymmetric Grid — remaining destinations with images ──────── */}
      {gridCards.length > 0 && (
        <section className="px-6 md:px-[8%] lg:px-[12%] pb-16 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-10 md:gap-y-14">
            {gridCards.map((d, i) => {
              const pattern = i % 5;
              let colSpan = "md:col-span-4";
              let aspect = "aspect-[4/3]";
              let titleSize = "text-lg md:text-xl";
              let imgWidth = 800;

              if (pattern === 0) {
                colSpan = "md:col-span-8";
                aspect = "aspect-[16/9]";
                titleSize = "text-xl md:text-2xl lg:text-3xl";
                imgWidth = 1200;
              } else if (pattern === 1) {
                colSpan = "md:col-span-4";
                aspect = "aspect-[3/4]";
                titleSize = "text-lg md:text-xl";
                imgWidth = 600;
              } else if (pattern === 2) {
                colSpan = "md:col-span-6";
                aspect = "aspect-[4/3]";
                titleSize = "text-xl md:text-2xl";
              } else if (pattern === 3) {
                colSpan = "md:col-span-6";
                aspect = "aspect-[16/10]";
                titleSize = "text-xl md:text-2xl";
              } else {
                colSpan = "md:col-span-12";
                aspect = "aspect-[21/9]";
                titleSize = "text-2xl md:text-3xl lg:text-4xl";
                imgWidth = 1600;
              }

              return (
                <Link
                  key={d.slug}
                  href={`/${d.slug}`}
                  className={`group block ${colSpan}`}
                >
                  <div className={`${aspect} relative overflow-hidden`}>
                    <img
                      src={imgSrc(d.hero_image, imgWidth)}
                      alt={d.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                      {d.subtitle && (
                        <p className="text-[10px] tracking-[0.3em] uppercase text-white/50 mb-1.5">
                          {d.subtitle}
                        </p>
                      )}
                      <h2 className={`font-serif ${titleSize} text-white leading-[1.1]`}>
                        {d.title}
                      </h2>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Text-only destinations (no hero image) ───────────────────── */}
      {withoutImages.length > 0 && (
        <section className="px-6 md:px-[8%] lg:px-[12%] pb-24 md:pb-32">
          <div className="border-t border-foreground/10 pt-12">
            <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-8">
              More destinations
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-4">
              {withoutImages.map((d) => (
                <Link
                  key={d.slug}
                  href={`/${d.slug}`}
                  className="group block py-2"
                >
                  <h3 className="font-serif text-lg text-foreground group-hover:text-foreground/50 transition-colors leading-tight">
                    {d.title}
                  </h3>
                  {d.subtitle && (
                    <p className="text-[11px] text-foreground/40 mt-0.5 leading-snug">
                      {d.subtitle}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-[8%] lg:px-[12%] pb-24 md:pb-32">
        <div className="border-t border-foreground/10 pt-16 md:pt-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-[1.05] max-w-[20ch]">
              Know where you want to go?
            </h2>
            <p className="text-foreground/50 mt-3 max-w-md">
              Every journey we design starts with a conversation about what matters to you.
            </p>
          </div>
          <Link
            href="/plan-your-trip"
            className="inline-flex items-center gap-3 text-sm tracking-[0.1em] uppercase bg-foreground text-background px-8 py-4 hover:bg-foreground/85 transition-colors shrink-0"
          >
            Plan Your Trip
            <span className="text-lg">→</span>
          </Link>
        </div>
      </section>

    </main>
  );
}
