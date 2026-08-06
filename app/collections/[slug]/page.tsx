import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { getStories, getPlaces } from "@/lib/supabase";
import { getCollection, getAllCollectionSlugs } from "@/lib/collections";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllCollectionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "Collection" };

  const url = `https://www.slowmorocco.com/collections/${collection.slug}`;
  return {
    title: collection.title,
    description: collection.dek,
    alternates: { canonical: url },
    openGraph: {
      title: `${collection.title} | Slow Morocco`,
      description: collection.dek,
      url,
    },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  // Pull the full published sets once, then resolve this collection's slugs
  // against them in the curated order. A slug that doesn't resolve is skipped.
  const [allStories, allPlaces] = await Promise.all([
    getStories({ published: true }),
    getPlaces({ published: true }),
  ]);

  const storyBySlug = new Map(allStories.map((s) => [s.slug, s]));
  const placeBySlug = new Map(allPlaces.map((p) => [p.slug, p]));

  const stories = collection.storySlugs
    .map((s) => storyBySlug.get(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const places = collection.placeSlugs
    .map((p) => placeBySlug.get(p))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const heroImage =
    collection.heroImage ||
    stories[0]?.hero_image ||
    places[0]?.hero_image ||
    undefined;

  return (
    <div className="bg-background min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative">
        {heroImage && (
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={cloudinaryUrl(heroImage, 1920)}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
          </div>
        )}
        <div className="relative z-10 px-8 md:px-10 lg:px-14 pt-36 md:pt-48 pb-16 md:pb-24">
          <Link
            href="/collections"
            className={`text-[10px] tracking-[0.25em] uppercase mb-6 inline-block transition-colors ${
              heroImage
                ? "text-white/60 hover:text-white"
                : "text-foreground/40 hover:text-foreground/70"
            }`}
          >
            Collections
          </Link>
          <h1
            className={`font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] max-w-3xl mb-4 ${
              heroImage ? "text-white" : "text-foreground"
            }`}
          >
            {collection.title}
          </h1>
          <p
            className={`text-lg md:text-xl max-w-2xl leading-[1.5] ${
              heroImage ? "text-white/75" : "text-foreground/60"
            }`}
          >
            {collection.dek}
          </p>
        </div>
      </section>

      {/* ── Intro ────────────────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 py-16 md:py-20 border-b border-foreground/[0.08]">
        <div className="max-w-2xl space-y-6 text-[15px] md:text-[16px] text-foreground/80 leading-[1.8]">
          {collection.intro.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {/* ── Stories ──────────────────────────────────────────────── */}
      {stories.length > 0 && (
        <section className="px-8 md:px-10 lg:px-14 py-16 md:py-24">
          <p className="text-[11px] tracking-[0.3em] uppercase text-foreground/30 mb-10">
            Stories
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {stories.map((story) => (
              <article key={story.slug}>
                <Link href={`/stories/${story.slug}`} className="group block">
                  <div className="aspect-[29/39] relative overflow-hidden bg-[#e8e6e1] mb-3.5">
                    {story.hero_image && (
                      <img
                        src={cloudinaryUrl(story.hero_image, 480)}
                        alt={story.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[1.2s] ease-out"
                      />
                    )}
                  </div>
                  <h3 className="text-[12px] tracking-[0.04em] uppercase leading-[1.35] text-foreground group-hover:text-foreground/60 transition-colors duration-500">
                    {story.title}
                  </h3>
                  {story.subtitle && (
                    <p className="text-[11.5px] text-foreground/45 leading-[1.5] mt-1 line-clamp-2">
                      {story.subtitle}
                    </p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ── Places ───────────────────────────────────────────────── */}
      {places.length > 0 && (
        <section className="px-8 md:px-10 lg:px-14 py-16 md:py-24 border-t border-foreground/[0.08]">
          <p className="text-[11px] tracking-[0.3em] uppercase text-foreground/30 mb-10">
            Places
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {places.map((place) => (
              <article key={place.slug}>
                <Link href={`/places/${place.slug}`} className="group block">
                  <div className="aspect-[29/39] relative overflow-hidden bg-[#e8e6e1] mb-3.5">
                    {place.hero_image && (
                      <img
                        src={cloudinaryUrl(place.hero_image, 480)}
                        alt={place.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[1.2s] ease-out"
                      />
                    )}
                  </div>
                  <h3 className="text-[12px] tracking-[0.04em] uppercase leading-[1.35] text-foreground group-hover:text-foreground/60 transition-colors duration-500">
                    {place.title}
                  </h3>
                  {place.excerpt && (
                    <p className="text-[11.5px] text-foreground/45 leading-[1.5] mt-1 line-clamp-2">
                      {place.excerpt}
                    </p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ── Foot ─────────────────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 py-14 border-t border-foreground/[0.08]">
        <Link
          href="/collections"
          className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground/70 transition-colors"
        >
          ← All collections
        </Link>
      </section>

    </div>
  );
}
