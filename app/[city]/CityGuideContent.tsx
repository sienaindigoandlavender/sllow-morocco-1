"use client";
import NewsletterCapture from "@/components/NewsletterCapture";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const CityMap = dynamic(() => import("@/components/CityMap"), { ssr: false });
import { cloudinaryUrl } from "@/lib/cloudinary";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Destination {
  slug: string;
  title: string;
  subtitle: string | null;
  region: string | null;
  hero_image: string | null;
  excerpt: string | null;
  body: string | null;
}

interface Journey {
  slug: string;
  title: string;
  hero_image_url: string | null;
  short_description: string | null;
  arc_description: string | null;
  duration_days: number | null;
  price_eur: number | null;
  category: string | null;
  focus_type: string | null;
  destinations: string | null;
  start_city: string | null;
}

interface Place {
  slug: string;
  title: string;
  hero_image: string | null;
  excerpt: string | null;
  category: string | null;
  destination: string | null;
  latitude: number | null;
  longitude: number | null;
}

interface Story {
  slug: string;
  title: string;
  hero_image: string | null;
  excerpt: string | null;
  category: string | null;
  mood?: string | null;
  tags: string | null;
}

interface CityGuideImage {
  id: number;
  city_slug: string;
  image_url: string | null;
  caption: string | null;
  image_order: number;
}

interface Props {
  destination: Destination;
  journeys: Journey[];
  connectingJourneys: Journey[];
  places: Place[];
  stories: Story[];
  citySlug: string;
  galleryImages?: CityGuideImage[];
}

// ─── Fallback hero images for cities without a DB hero_image ────────────────

const CITY_HERO_FALLBACKS: Record<string, string> = {
  marrakech: "https://res.cloudinary.com/ddcznjibs/image/upload/v1772836871/Marrakech_skyline_with_terracotta_medina_roof_q06tad.png",
  essaouira: "https://res.cloudinary.com/drstfu5yr/image/upload/v1767310155/essaouira_meymce.png",
  rabat: "https://res.cloudinary.com/drstfu5yr/image/upload/v1767310357/rabat_ofyxwj.png",
  fes: "https://res.cloudinary.com/ddcznjibs/image/upload/v1772837045/Fes_medina_rooftop_looeyv.png",
  tangier: "https://res.cloudinary.com/ddcznjibs/image/upload/v1772837334/Fes_medina_rooftop_looeyv.png",
  chefchaouen: "https://res.cloudinary.com/ddcznjibs/image/upload/v1772906971/Chefchaouen_blue_medina_or42s5.png",
  casablanca: "https://res.cloudinary.com/ddcznjibs/image/upload/v1772837985/Hassan_II_Mosque_on_the_Atlantic_qe7t3y.png",
  meknes: "https://res.cloudinary.com/ddcznjibs/image/upload/v1772838176/Bab_Mansour_gate_in_Meknes_hef5id.png",
  dakhla: "https://res.cloudinary.com/ddcznjibs/image/upload/v1772838561/Dakhla_lagoon_aerial_view_with_turquoise_water_veanox.png",
};

// ─── City coordinates + attraction data ───────────────────────────────────────

const CITY_DATA: Record<string, {
  center: [number, number];
  zoom: number;
  bestMonths: string;
  climate: string;
  intro: string;
}> = {
  marrakech: {
    center: [-7.9811, 31.6295],
    zoom: 13.5,
    bestMonths: "Mar–May · Sep–Nov",
    climate: "Hot semi-arid",
    intro: "The ochre walls absorb the sun all day and release it at dusk, turning the medina a colour that has no name in any language except Marrakech. A thousand-year maze that somehow still works.",
  },
  fes: {
    center: [-4.9998, 34.0331],
    zoom: 13.5,
    bestMonths: "Mar–May · Sep–Nov",
    climate: "Semi-arid continental",
    intro: "Nine thousand alleys, the world's largest car-free urban area, and a tannery that has been dyeing leather the same way since the eleventh century. The medieval city that refuses to become a museum.",
  },
  tangier: {
    center: [-5.8128, 35.7595],
    zoom: 13,
    bestMonths: "Apr–Jun · Sep–Oct",
    climate: "Mediterranean",
    intro: "Where the Mediterranean meets the Atlantic and Africa faces Europe across fourteen kilometres of water. The city that invented its own mythology — and the writers who came to find it stayed to write it.",
  },
  rabat: {
    center: [-6.8498, 34.0209],
    zoom: 13,
    bestMonths: "Apr–Jun · Sep–Oct",
    climate: "Mediterranean",
    intro: "The capital that nobody visits on purpose, and leaves reluctantly. Roman ruins, a twelfth-century tower, and a UNESCO medina that breathes at human scale. The city that governs Morocco and quietly keeps its own counsel.",
  },
  essaouira: {
    center: [-9.7595, 31.5085],
    zoom: 13.5,
    bestMonths: "Jun–Sep",
    climate: "Mediterranean coastal",
    intro: "The wind city. Portuguese ramparts on an Atlantic headland, a medina painted blue and white, and a permanent gale that clears the head of everything unnecessary. Artists came for the light. Musicians came for the Gnawa. Everyone stayed longer than planned.",
  },
  casablanca: {
    center: [-7.5898, 33.5731],
    zoom: 13,
    bestMonths: "Mar–May · Sep–Nov",
    climate: "Mediterranean",
    intro: "Morocco's economic engine wearing its Art Deco inheritance like a suit that still fits. The Corniche, the Hassan II mosque rising from the Atlantic, the white villas of the Quartier des Habous — a city most tourists pass through and shouldn't.",
  },
  meknes: {
    center: [-5.5548, 33.8935],
    zoom: 13,
    bestMonths: "Apr–Jun · Sep–Oct",
    climate: "Semi-arid continental",
    intro: "Moulay Ismail's monument to ambition. The sultan who built walls forty kilometres long, stabled twelve thousand horses, and imagined a Moroccan Versailles in the seventeenth century. The city that finished second in every imperial ranking, and carries it with considerable dignity.",
  },
  ouarzazate: {
    center: [-6.9063, 30.9189],
    zoom: 13,
    bestMonths: "Mar–May · Sep–Nov",
    climate: "Hot semi-arid",
    intro: "Gateway to the south. Where the High Atlas drops into the pre-Saharan plateau and the light turns everything amber by four o'clock. Hollywood discovered the kasbahs and the silence. The kasbahs are indifferent to Hollywood.",
  },
  agadir: {
    center: [-9.5981, 30.4278],
    zoom: 13,
    bestMonths: "Oct–Apr",
    climate: "Hot desert coastal",
    intro: "Rebuilt after the 1960 earthquake, Agadir faces the Atlantic with the composed practicality of a city that has already survived the worst. The beach is eleven kilometres long. The argan forest begins where the city ends.",
  },
  dakhla: {
    center: [-15.9329, 23.6848],
    zoom: 12.5,
    bestMonths: "Oct–May",
    climate: "Hot desert",
    intro: "A narrow peninsula in the Western Sahara where the wind arrives from the north and the kite surfers follow. The lagoon is turquoise, the dunes are a twenty-minute drive, and the oysters are pulled from the water still cold. The end of the mapped world, more or less.",
  },
  chefchaouen: {
    center: [-5.2636, 35.1688],
    zoom: 14,
    bestMonths: "Apr–Jun · Sep–Oct",
    climate: "Mediterranean mountain",
    intro: "The blue medina in the Rif mountains. Every surface painted in shades of indigo and cerulean, the reason so unclear that the theories multiply. A town that became famous for a colour and stayed famous for the light that colour catches.",
  },
};

// ─── Weather widget ────────────────────────────────────────────────────────────

function WeatherLine({ bestMonths, climate }: { bestMonths: string; climate: string }) {
  return (
    <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/40">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      <span>{climate}</span>
      <span className="text-foreground/20">·</span>
      <span>Best: {bestMonths}</span>
    </div>
  );
}

// ─── Section header ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] tracking-[0.3em] uppercase font-mono text-foreground/30 mb-8">
      {children}
    </p>
  );
}

// ─── World Cup 2030 data ──────────────────────────────────────────────────────

const WORLD_CUP_DATA: Record<string, {
  stadium: string;
  capacity: string;
  status: string;
  note: string;
}> = {
  casablanca: {
    stadium: "Grand Stade Hassan II",
    capacity: "115,000",
    status: "New build — completion expected 2028",
    note: "Designed by Populous and Oualalou + Choi, this will be the largest football stadium in the world. Built on a 100-hectare site in El Mansouria, 38 km north of Casablanca. A leading candidate to host the 2030 World Cup final.",
  },
  tangier: {
    stadium: "Grand Stade de Tangier",
    capacity: "75,600",
    status: "Renovated — completed 2025",
    note: "Originally the Ibn Battuta Stadium (45,000 seats, opened 2011), expanded and renamed after a $360 million renovation that removed the athletics track and nearly doubled capacity.",
  },
  marrakech: {
    stadium: "Grand Stade de Marrakech",
    capacity: "70,000",
    status: "Renovation planned",
    note: "Currently 45,000 seats, set to expand to 70,000 for the World Cup. Located on the outskirts of the city, the stadium also hosted matches during the 2025 Africa Cup of Nations.",
  },
  rabat: {
    stadium: "Stade Prince Moulay Abdellah",
    capacity: "68,700",
    status: "Completed — inaugurated September 2025",
    note: "A new-build sports complex completed in record time between 2023 and 2025. Inaugurated during the 2026 FIFA World Cup qualifiers. The 68,095-seat venue is expandable to 68,700.",
  },
  fes: {
    stadium: "Stade de Fès",
    capacity: "55,800",
    status: "Renovation planned",
    note: "Currently 45,000 seats, scheduled for expansion to 55,800 with a new roof. The stadium hosts both football and athletics events and will receive a complete restyling for 2030.",
  },
  agadir: {
    stadium: "Grand Stade d'Agadir",
    capacity: "46,000–70,000",
    status: "Renovation planned",
    note: "The Adrar Stadium opened in 2013 after nine years of construction. Currently 45,000 seats, it will be renovated and covered. Some plans call for expansion up to 70,000.",
  },
};

// ─── Main component ────────────────────────────────────────────────────────────

export default function CityGuideContent({
  destination,
  journeys,
  connectingJourneys,
  places,
  stories,
  citySlug,
  galleryImages = [],
}: Props) {
  const firstGalleryImage = galleryImages.length > 0 ? galleryImages[0].image_url : null;
  // Priority: gallery image (city_guide_images table) > destination hero > hardcoded fallback
  const heroImage = firstGalleryImage || destination.hero_image || CITY_HERO_FALLBACKS[citySlug] || null;
  const cityData = CITY_DATA[citySlug] || {
    center: [-6.0, 32.0] as [number, number],
    zoom: 12,
    bestMonths: "Mar–May · Sep–Nov",
    climate: "Semi-arid",
    intro: destination.excerpt || "",
  };

  // Build attraction markers from places that have coordinates
  const attractions = places
    .filter((p) => p.latitude && p.longitude)
    .map((p) => ({
      title: p.title,
      slug: p.slug,
      coordinates: [p.longitude!, p.latitude!] as [number, number],
      category: p.category || undefined,
    }));

  const showMap = attractions.length > 0 || true; // always show map, city center at minimum

  return (
    <main className="bg-background text-foreground">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[100svh] min-h-[600px]">
        {heroImage ? (
          <img
            src={cloudinaryUrl(heroImage, 1920)}
            alt={destination.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 bg-foreground/10" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 lg:px-20 pb-14">
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
            {destination.title}
          </h1>
        </div>
      </section>

      {/* ── Intro / Body ──────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 py-16 md:py-20">
        {destination.body ? (
          // Database body — multi-paragraph
          <div className="max-w-3xl space-y-6">
            {destination.body.split(/\n\n+/).filter(Boolean).map((para, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "font-serif text-xl md:text-2xl leading-relaxed text-foreground"
                    : "text-base leading-relaxed text-foreground"
                }
              >
                {para}
              </p>
            ))}
          </div>
        ) : (
          // Fallback to hardcoded one-liner
          <p className="font-serif text-xl md:text-2xl leading-relaxed text-foreground max-w-3xl">
            {cityData.intro}
          </p>
        )}
      </section>

      {/* ── Gallery ───────────────────────────────────────────────────────── */}
      {galleryImages.length > 0 && (
        <section className="px-8 md:px-16 lg:px-20 pb-16">
          <div className={`grid gap-4 ${
            galleryImages.length === 1
              ? "grid-cols-1"
              : galleryImages.length === 2
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}>
            {galleryImages.map((img) => (
              <figure key={img.id}>
                <div className="relative aspect-[16/10] overflow-hidden bg-foreground/5">
                  {img.image_url && (
                    <img
                      src={cloudinaryUrl(img.image_url, 800)}
                      alt={img.caption || destination.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </div>
                {img.caption && (
                  <figcaption className="text-[10px] text-foreground/35 mt-2.5 font-mono tracking-wide">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* ── Map + Places ──────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-border">

          {/* Map */}
          <div className="h-[300px] md:h-[480px] lg:h-[600px] border-b lg:border-b-0 lg:border-r border-border">
            {showMap && (
              <CityMap
                citySlug={citySlug}
                cityTitle={destination.title}
                center={cityData.center}
                zoom={cityData.zoom}
                attractions={attractions}
              />
            )}
          </div>

          {/* Places list */}
          <div className="p-6 md:p-10 overflow-y-auto max-h-[400px] md:max-h-[600px]">
            <SectionLabel>Places</SectionLabel>
            {places.length > 0 ? (
              <div className="space-y-0">
                {places.map((place, i) => (
                  <Link
                    key={place.slug}
                    href={`/places/${place.slug}`}
                    className="group flex items-start gap-5 py-5 border-b border-border last:border-0 hover:bg-foreground/2 -mx-2 px-2 transition-colors"
                  >
                    <span className="text-[10px] font-mono text-foreground/20 mt-1 w-5 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      {place.category && (
                        <p className="text-[9px] tracking-[0.25em] uppercase text-foreground/30 mb-1">
                          {place.category}
                        </p>
                      )}
                      <h3 className="font-serif text-base group-hover:text-foreground/60 transition-colors">
                        {place.title}
                      </h3>
                      {place.excerpt && (
                        <p className="text-xs text-foreground/40 mt-1 leading-relaxed line-clamp-2">
                          {place.excerpt}
                        </p>
                      )}
                    </div>
                    <span className="text-foreground/20 group-hover:text-foreground/60 transition-colors text-xs mt-1">→</span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-foreground/30">
                Places being added — check back soon.
              </p>
            )}

            {places.length > 0 && (
              <div className="mt-8">
                <Link
                  href={`/places?destination=${citySlug}`}
                  className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 hover:text-foreground transition-colors"
                >
                  All places in {destination.title} →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Stories ───────────────────────────────────────────────────────── */}
      {stories.length > 0 && (
        <section className="px-8 md:px-16 lg:px-20 pb-20 md:pb-28">
          <div className="border-b border-border pb-5 mb-12">
            <SectionLabel>Stories from {destination.title}</SectionLabel>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {stories.slice(0, 6).map((story) => (
              <article key={story.slug}>
                <Link href={`/stories/${story.slug}`} className="group">
                  <div className="aspect-[3/4] relative overflow-hidden bg-foreground/5 mb-5">
                    {story.hero_image && (
                      <img
                        src={cloudinaryUrl(story.hero_image, 600)}
                        alt={story.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    )}
                  </div>
                  {story.category && (
                    <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 mb-2">
                      {story.category}
                    </p>
                  )}
                  <h3 className="font-serif text-xl mb-2 group-hover:text-foreground/60 transition-colors">
                    {story.title}
                  </h3>
                  {story.excerpt && (
                    <p className="text-sm text-foreground/50 leading-relaxed line-clamp-2">
                      {story.excerpt}
                    </p>
                  )}
                </Link>
              </article>
            ))}
          </div>

          {stories.length > 6 && (
            <div className="mt-14 text-center">
              <Link
                href={`/stories?city=${citySlug}`}
                className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 hover:text-foreground transition-colors"
              >
                More stories →
              </Link>
            </div>
          )}
        </section>
      )}

      {/* ── Journeys ──────────────────────────────────────────────────────── */}
      {journeys.length > 0 && (
        <section className="px-8 md:px-16 lg:px-20 pb-20 md:pb-28 border-t border-border pt-16">
          <div className="mb-12">
            <SectionLabel>Journeys to {destination.title}</SectionLabel>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {journeys.slice(0, 6).map((journey) => (
              <article key={journey.slug}>
                <Link href={`/journeys/${journey.slug}`} className="group">
                  <div className="aspect-[4/3] relative overflow-hidden bg-foreground/5 mb-5">
                    {journey.hero_image_url && (
                      <img
                        src={cloudinaryUrl(journey.hero_image_url, 600)}
                        alt={journey.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    {journey.duration_days ? (
                      <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/30">
                        {journey.duration_days}d
                      </span>
                    ) : null}
                    {journey.category && (
                      <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/30">
                        {journey.category}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl mb-2 group-hover:text-foreground/60 transition-colors">
                    {journey.title}
                  </h3>
                  {(journey.short_description || journey.arc_description) && (
                    <p className="text-sm text-foreground/50 leading-relaxed line-clamp-2">
                      {journey.short_description || journey.arc_description}
                    </p>
                  )}
                </Link>
              </article>
            ))}
          </div>

          {journeys.length > 6 && (
            <div className="mt-14 text-center">
              <Link
                href="/journeys"
                className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 hover:text-foreground transition-colors"
              >
                All journeys →
              </Link>
            </div>
          )}
        </section>
      )}

      {/* ── You might also consider ──────────────────────────────────────── */}
      {connectingJourneys.length > 0 && (
        <section className="px-8 md:px-16 lg:px-20 pb-20 md:pb-28 border-t border-border pt-16">
          <div className="mb-12">
            <p className="text-[10px] tracking-[0.3em] uppercase font-mono text-foreground/30 mb-2">
              You might also consider
            </p>
            <p className="font-serif text-2xl md:text-3xl text-foreground/70">
              Journeys that pass through {destination.title}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {connectingJourneys.slice(0, 3).map((journey) => {
              // Extract the other cities this journey visits
              const otherDests = (journey.destinations || "")
                .split(",")
                .map((d: string) => d.trim())
                .filter((d: string) => d !== citySlug && d.length > 0)
                .slice(0, 3);

              return (
                <article key={journey.slug}>
                  <Link href={`/journeys/${journey.slug}`} className="group">
                    <div className="aspect-[4/3] relative overflow-hidden bg-foreground/5 mb-5">
                      {journey.hero_image_url && (
                        <img
                          src={cloudinaryUrl(journey.hero_image_url, 600)}
                          alt={journey.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                        />
                      )}
                    </div>

                    {/* Route line */}
                    {otherDests.length > 0 && (
                      <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                        <span className="text-[9px] tracking-[0.2em] uppercase font-mono text-foreground/25">
                          {destination.title}
                        </span>
                        {otherDests.map((dest: string) => (
                          <span key={dest} className="flex items-center gap-1.5">
                            <span className="text-foreground/15 text-[9px]">→</span>
                            <span className="text-[9px] tracking-[0.2em] uppercase font-mono text-foreground/25 capitalize">
                              {dest.replace(/-/g, " ")}
                            </span>
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-2">
                      {journey.duration_days ? (
                        <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/30">
                          {journey.duration_days}d
                        </span>
                      ) : null}
                      {journey.category && (
                        <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/30">
                          {journey.category}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-xl mb-2 group-hover:text-foreground/60 transition-colors">
                      {journey.title}
                    </h3>
                    {(journey.short_description || journey.arc_description) && (
                      <p className="text-sm text-foreground/50 leading-relaxed line-clamp-2">
                        {journey.short_description || journey.arc_description}
                      </p>
                    )}
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* ── World Cup 2030 ────────────────────────────────────────────────── */}
      {WORLD_CUP_DATA[citySlug] && (() => {
        const wc = WORLD_CUP_DATA[citySlug];
        return (
          <section className="px-8 md:px-16 lg:px-20 pb-20 md:pb-28 border-t border-border pt-16">
            <div className="max-w-3xl">
              <SectionLabel>FIFA World Cup 2030</SectionLabel>
              <h2 className="font-serif text-2xl md:text-3xl mb-3">
                {destination.title} is a host city
              </h2>
              <p className="text-sm text-foreground/50 leading-relaxed mb-10">
                Morocco will co-host the 2030 FIFA World Cup alongside Spain and Portugal — the first World Cup to span three continents. Six Moroccan cities will host matches, with {destination.title} among them.
              </p>

              <div className="border border-border divide-y divide-border">
                <div className="flex items-start gap-6 p-5 md:p-6">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-foreground/30 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 003 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-1">Stadium</p>
                    <p className="font-serif text-lg">{wc.stadium}</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 p-5 md:p-6">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-foreground/30 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-1">Capacity</p>
                    <p className="font-serif text-lg">{wc.capacity}</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 p-5 md:p-6">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-foreground/30 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path d="M11.42 15.17l-5.58-3.36a.75.75 0 010-1.08l5.58-3.36a.75.75 0 011.16.63v6.7a.75.75 0 01-1.16.63z" />
                      <path d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-1">Status</p>
                    <p className="text-sm text-foreground/70">{wc.status}</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-foreground/50 leading-relaxed mt-6">
                {wc.note}
              </p>

              <p className="text-sm text-foreground/40 leading-relaxed mt-6">
                Morocco is investing over $1.4 billion across its six World Cup venues. The high-speed rail network — already connecting Tangier to Casablanca — is planned to extend south to Marrakech and Agadir before 2030.
              </p>

              <Link
                href="/morocco-world-cup-2030"
                className="inline-block mt-6 text-[10px] tracking-[0.15em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors border-b border-foreground/15 pb-1"
              >
                Interactive stadium &amp; infrastructure map &rarr;
              </Link>
            </div>
          </section>
        );
      })()}

      {/* ── Newsletter capture ──────────────────────────────────────────── */}
      <div className="border-t border-border">
        <NewsletterCapture />
      </div>

      {/* ── Footer bridge ─────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 py-20 border-t border-border">
        <div className="max-w-xl">
          <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 mb-4">
            Plan your visit
          </p>
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            Coming to {destination.title}?
          </h2>
          <p className="text-sm text-foreground/50 leading-relaxed mb-8">
            Every journey we design includes private guiding, accommodation chosen for character rather than category, and the kind of access that takes years in Morocco to arrange.
          </p>
          <Link
            href="/plan-your-trip"
            className="inline-block text-[11px] tracking-[0.2em] uppercase border border-foreground px-8 py-4 hover:bg-foreground hover:text-background transition-colors"
          >
            Plan Your Trip
          </Link>
        </div>
      </section>

    </main>
  );
}
