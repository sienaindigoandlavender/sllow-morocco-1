import Link from "next/link";
import type { Metadata } from "next";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { getStories, getPlaces } from "@/lib/supabase";
import { COLLECTIONS } from "@/lib/collections";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Curated ways into Morocco — the stories and places, grouped by a single idea. The film Sahara, Jewish Morocco, what the weavers know.",
  alternates: { canonical: "https://www.slowmorocco.com/collections" },
  openGraph: {
    title: "Collections | Slow Morocco",
    description:
      "Curated ways into Morocco — stories and places, grouped by a single idea.",
    url: "https://www.slowmorocco.com/collections",
  },
};

export default async function CollectionsIndexPage() {
  // Resolve a cover image per collection from its first entry's hero.
  const [allStories, allPlaces] = await Promise.all([
    getStories({ published: true }),
    getPlaces({ published: true }),
  ]);
  const storyImg = new Map(allStories.map((s) => [s.slug, s.hero_image]));
  const placeImg = new Map(allPlaces.map((p) => [p.slug, p.hero_image]));

  const withCovers = COLLECTIONS.map((c) => {
    const cover =
      c.heroImage ||
      c.storySlugs.map((s) => storyImg.get(s)).find(Boolean) ||
      c.placeSlugs.map((p) => placeImg.get(p)).find(Boolean) ||
      null;
    const count = c.storySlugs.length + c.placeSlugs.length;
    return { ...c, cover, count };
  });

  return (
    <div className="bg-background min-h-screen">

      {/* ── Header ───────────────────────────────────────────────── */}
      <section className="pt-28 md:pt-36 pb-10 px-8 md:px-10 lg:px-14">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
          Collections
        </h1>
        <p className="text-[15px] md:text-[16px] text-foreground/55 max-w-2xl leading-[1.7]">
          Ways into the country, each built around a single idea. The stories
          and places, gathered and put in order.
        </p>
        <div className="h-[1px] bg-foreground/12 mt-10" />
      </section>

      {/* ── Grid ─────────────────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {withCovers.map((c) => (
            <Link key={c.slug} href={`/collections/${c.slug}`} className="group block">
              <div className="aspect-[4/3] relative overflow-hidden bg-[#e8e6e1] mb-5">
                {c.cover && (
                  <img
                    src={cloudinaryUrl(c.cover, 720)}
                    alt={c.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[1.2s] ease-out"
                  />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/35 mb-2">
                {c.count} {c.count === 1 ? "entry" : "entries"}
              </p>
              <h2 className="font-serif text-xl md:text-2xl text-foreground group-hover:text-foreground/60 transition-colors mb-1.5">
                {c.title}
              </h2>
              <p className="text-[13.5px] text-foreground/50 leading-[1.6]">
                {c.dek}
              </p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
