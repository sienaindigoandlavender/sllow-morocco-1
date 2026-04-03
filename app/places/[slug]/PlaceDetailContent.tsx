"use client";

import { useState } from "react";
import { cloudinaryUrl } from "@/lib/cloudinary";
import Link from "next/link";
import { ChevronLeft, ChevronDown, MapPin, Clock, Ticket, Navigation, Timer, Compass } from "lucide-react";
import { linkGlossaryTermsHTML } from "@/lib/glossary-linker";
import PlaceSchema from "@/components/seo/PlaceSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import dynamic from "next/dynamic";
import SeasonalBadge from "@/components/SeasonalBadge";
import NewsletterCapture from "@/components/NewsletterCapture";

const PlaceSatelliteMap = dynamic(() => import("@/components/PlaceSatelliteMap"), { ssr: false });

interface Place {
  slug: string;
  title: string;
  destination: string;
  category: string;
  address: string;
  openingHours: string;
  fees: string;
  notes: string;
  heroImage: string;
  heroCaption: string;
  excerpt: string;
  body: string;
  sources: string;
  tags: string;
  journeyBridge: string;
  attractionSections: Record<string, { title: string; body: string }> | null;
  faqData: Array<{ q: string; a: string }> | null;
  schemaType: string | null;
  relatedStorySlugs: string[] | null;
  latitude: number | null;
  longitude: number | null;
  visitDurationMinutes: number | null;
  bestTimeToVisit: string | null;
  gettingThere: string | null;
  nearbySlugs: string[] | null;
}

interface PlaceImage {
  url: string;
  caption: string;
  order: number;
}

interface NearbyPlace {
  slug: string;
  title: string;
  category: string;
  heroImage: string;
  excerpt: string;
}

interface NavItem {
  slug: string;
  title: string;
}

interface PlaceDetailContentProps {
  place: Place;
  images: PlaceImage[];
  relatedJourneys: any[];
  relatedStories: any[];
  nearbyPlaces?: NearbyPlace[];
  prevPlace?: NavItem | null;
  nextPlace?: NavItem | null;
}

function formatBody(text: string): string {
  // Convert <br> variants to newlines first
  const cleaned = text.replace(/<br\s*\/?>/gi, '\n');
  // Split on double or single newlines
  const hasDoubleBreaks = /\n\n/.test(cleaned);
  const paragraphs = cleaned.split(hasDoubleBreaks ? /\n\n+/ : /\n/).filter(p => p.trim());
  const wrapped = paragraphs.map(p => `<p class="mb-8 leading-[1.85]">${p.trim()}</p>`).join('');
  return linkGlossaryTermsHTML(wrapped);
}

function FAQAccordion({ items }: { items: Array<{ q: string; a: string }> }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-foreground/10">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-start justify-between py-5 text-left group"
          >
            <span className="font-serif text-base md:text-lg pr-8 group-hover:opacity-70 transition-opacity">
              {item.q}
            </span>
            <ChevronDown
              className={`w-5 h-5 flex-shrink-0 mt-1 text-muted-foreground transition-transform duration-300 ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === i ? "max-h-96 pb-5" : "max-h-0"
            }`}
          >
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              {item.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PlaceDetailContent({
  place,
  images,
  relatedJourneys,
  relatedStories,
  nearbyPlaces = [],
  prevPlace,
  nextPlace,
}: PlaceDetailContentProps) {
  const isAttraction = !!place.attractionSections;
  const sections = place.attractionSections || {};
  const sectionOrder = ["history", "architecture", "visitor_guide"];
  const orderedSections = sectionOrder
    .filter((key) => sections[key])
    .map((key) => ({ key, ...sections[key] }));

  return (
    <div className="bg-background min-h-screen">
      <PlaceSchema place={place} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://www.slowmorocco.com" },
        { name: "Places", url: "https://www.slowmorocco.com/places" },
        { name: place.title, url: `https://www.slowmorocco.com/places/${place.slug}` },
      ]} />

      {/* Hero */}
      <section className="relative h-[100svh] min-h-[600px]">
        {place.heroImage ? (
          <img
            src={cloudinaryUrl(place.heroImage)}
            alt={place.heroCaption || `${place.title} in ${place.destination}, Morocco`}
            className="absolute inset-0 w-full h-full object-cover"
            />
        ) : (
          <div className="absolute inset-0 bg-muted" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        <div className="absolute top-24 left-6 lg:left-16 right-6 lg:right-16 flex items-center justify-between">
          <Link href="/places" className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors">
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm">Explore all places</span>
          </Link>
          <div className="flex items-center gap-3">
            {prevPlace && (
              <Link
                href={`/places/${prevPlace.slug}`}
                className="w-9 h-9 flex items-center justify-center border border-white/30 hover:border-white/60 transition-colors"
                aria-label={`Previous place: ${prevPlace.title}`}
                title={prevPlace.title}
              >
                <ChevronLeft className="w-4 h-4 text-white/70" />
              </Link>
            )}
            {nextPlace && (
              <Link
                href={`/places/${nextPlace.slug}`}
                className="w-9 h-9 flex items-center justify-center border border-white/30 hover:border-white/60 transition-colors"
                aria-label={`Next place: ${nextPlace.title}`}
                title={nextPlace.title}
              >
                <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
              </Link>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-16">
          <div className="container mx-auto">
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-[1.1]">{place.title}</h1>
          </div>
        </div>
      </section>

      {/* ====== ATTRACTION LAYOUT ====== */}
      {isAttraction ? (
        <>
          {/* Quick Facts Bar */}
          <section className="border-b border-foreground/10">
            <div className="container mx-auto px-6 lg:px-16">
              <div className="flex flex-wrap gap-8 md:gap-12 py-6">
                {place.openingHours && (
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-[11px] tracking-[0.12em] uppercase text-muted-foreground">Hours</p>
                      <p className="text-sm">{place.openingHours}</p>
                    </div>
                  </div>
                )}
                {place.fees && (
                  <div className="flex items-center gap-3">
                    <Ticket className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-[11px] tracking-[0.12em] uppercase text-muted-foreground">Entry</p>
                      <p className="text-sm">{place.fees}</p>
                    </div>
                  </div>
                )}
                {place.visitDurationMinutes && (
                  <div className="flex items-center gap-3">
                    <Timer className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-[11px] tracking-[0.12em] uppercase text-muted-foreground">Duration</p>
                      <p className="text-sm">{place.visitDurationMinutes} minutes</p>
                    </div>
                  </div>
                )}
                {place.address && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-[11px] tracking-[0.12em] uppercase text-muted-foreground">Location</p>
                      <p className="text-sm">{place.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Excerpt */}
          {place.excerpt && (
            <section className="py-16 md:py-20">
              <div className="container mx-auto px-6 lg:px-16">
                <div className="max-w-3xl">
                  <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-display italic">{place.excerpt}</p>
                </div>
              </div>
            </section>
          )}

          {/* Satellite Map + Seasonal Intelligence */}
          {place.latitude && place.longitude && (
            <section className="border-t border-foreground/10">
              <PlaceSatelliteMap
                latitude={place.latitude}
                longitude={place.longitude}
                title={place.title}
              />
              <div className="container mx-auto px-6 lg:px-16 py-4">
                <SeasonalBadge
                  bestTimeToVisit={place.bestTimeToVisit}
                  category={place.category}
                  variant="place"
                />
              </div>
            </section>
          )}

          {/* Attraction Sections */}
          {orderedSections.map((section, i) => (
            <section key={section.key} className={`py-16 md:py-20 ${i % 2 === 1 ? "bg-sand" : ""}`}>
              <div className="container mx-auto px-6 lg:px-16">
                <div className="max-w-3xl">
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="font-serif text-2xl md:text-3xl mb-8">{section.title}</h2>
                  <div
                    className="prose prose-lg max-w-none [&>p]:text-[15px] [&>p]:leading-[1.8] [&>p]:text-[#262626]"
                    dangerouslySetInnerHTML={{ __html: formatBody(section.body) }}
                  />
                </div>
              </div>
            </section>
          ))}

          {/* Best Time + Getting There */}
          {(place.bestTimeToVisit || place.gettingThere) && (
            <section className="py-16 md:py-20 border-t border-foreground/10">
              <div className="container mx-auto px-6 lg:px-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
                  {place.bestTimeToVisit && (
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <Compass className="w-4 h-4 text-muted-foreground" />
                        <h3 className="font-serif text-lg">Best Time to Visit</h3>
                      </div>
                      <p className="text-[15px] leading-[1.8] text-muted-foreground">{place.bestTimeToVisit}</p>
                    </div>
                  )}
                  {place.gettingThere && (
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <Navigation className="w-4 h-4 text-muted-foreground" />
                        <h3 className="font-serif text-lg">Getting There</h3>
                      </div>
                      <p className="text-[15px] leading-[1.8] text-muted-foreground">{place.gettingThere}</p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Tips */}
          {place.notes && (
            <section className="py-12 bg-sand">
              <div className="container mx-auto px-6 lg:px-16">
                <div className="max-w-3xl">
                  <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground mb-3">Local Tip</p>
                  <p className="text-[15px] leading-[1.8] text-muted-foreground italic">{place.notes}</p>
                </div>
              </div>
            </section>
          )}

          {/* FAQ */}
          {place.faqData && place.faqData.length > 0 && (
            <section className="py-16 md:py-20">
              <div className="container mx-auto px-6 lg:px-16">
                <div className="max-w-3xl">
                  <h2 className="font-serif text-2xl md:text-3xl mb-8">Common Questions</h2>
                  <FAQAccordion items={place.faqData} />
                </div>
              </div>
            </section>
          )}

          {/* Nearby */}
          {nearbyPlaces.length > 0 && (
            <section className="py-16 md:py-20 bg-sand">
              <div className="container mx-auto px-6 lg:px-16">
                <div className="mb-10">
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Walking Distance</p>
                  <h2 className="font-serif text-2xl md:text-3xl">Nearby</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {nearbyPlaces.map((np) => (
                    <Link key={np.slug} href={`/places/${np.slug}`} className="group">
                      <div className="relative aspect-[4/3] mb-3 overflow-hidden bg-[#e8e0d4]">
                        {np.heroImage && (
                          <img src={cloudinaryUrl(np.heroImage)} alt={np.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
                        )}
                      </div>
                      <p className="text-xs tracking-[0.12em] uppercase text-muted-foreground mb-1">{np.category}</p>
                      <h3 className="font-serif text-sm group-hover:opacity-70 transition-opacity">{np.title}</h3>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Journey Bridge */}
          {place.journeyBridge && (
            <section className="py-12 border-t border-foreground/10">
              <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
                <p className="text-foreground/60 italic font-serif text-lg leading-relaxed">{place.journeyBridge}</p>
                <Link href="/plan-your-trip" className="inline-block mt-4 text-xs tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground/70 transition-colors">
                  Tell us about your trip →
                </Link>
              </div>
            </section>
          )}
        </>
      ) : (
        /* ====== STANDARD LAYOUT ====== */
        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                {place.excerpt && (
                  <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 font-display italic">{place.excerpt}</p>
                )}
                {place.body && (
                  <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: formatBody(place.body) }} />
                )}

                {/* Satellite Map */}
                {place.latitude && place.longitude && (
                  <div className="my-12">
                    <PlaceSatelliteMap
                      latitude={place.latitude}
                      longitude={place.longitude}
                      title={place.title}
                    />
                    <div className="mt-3">
                      <SeasonalBadge
                        bestTimeToVisit={place.bestTimeToVisit}
                        category={place.category}
                        variant="place"
                      />
                    </div>
                  </div>
                )}

                {place.journeyBridge && (
                  <div className="my-12 py-8 border-t border-b border-foreground/10">
                    <p className="text-foreground/60 italic font-serif text-lg leading-relaxed">{place.journeyBridge}</p>
                    <Link href="/plan-your-trip" className="inline-block mt-4 text-xs tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground/70 transition-colors">
                      Tell us about your trip →
                    </Link>
                  </div>
                )}
              </div>
              <div className="lg:col-span-1">
                <div className="bg-sand p-6 sticky top-24">
                  <h3 className="font-serif text-lg mb-6">Visitor Information</h3>
                  {place.address && (
                    <div className="flex gap-3 mb-4">
                      <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1">Address</p>
                        <p className="text-sm">{place.address}</p>
                      </div>
                    </div>
                  )}
                  {place.openingHours && (
                    <div className="flex gap-3 mb-4">
                      <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1">Hours</p>
                        <p className="text-sm">{place.openingHours}</p>
                      </div>
                    </div>
                  )}
                  {place.fees && (
                    <div className="flex gap-3 mb-4">
                      <Ticket className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1">Entry Fee</p>
                        <p className="text-sm">{place.fees}</p>
                      </div>
                    </div>
                  )}
                  {place.notes && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2">Tips</p>
                      <p className="text-sm text-muted-foreground">{place.notes}</p>
                    </div>
                  )}
                  <div className="mt-8">
                    <Link href="/plan-your-trip" className="block w-full bg-foreground text-background text-center py-3 text-xs tracking-[0.15em] uppercase hover:bg-foreground/90 transition-colors">
                      Include in Your Journey
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* The Edit — Newsletter capture */}
      <div className="container mx-auto px-6 lg:px-16">
        <div className="max-w-3xl mx-auto">
          <NewsletterCapture />
        </div>
      </div>

      {/* Related Stories */}
      {relatedStories.length > 0 && (
        <section className={`py-24 md:py-32 ${isAttraction ? "bg-background border-t border-foreground/10" : "bg-sand mt-16"}`}>
          <div className="container mx-auto px-6 lg:px-16">
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">Explore More</p>
              <h2 className="text-2xl md:text-3xl tracking-[0.15em] font-light mb-4">Related Stories</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Discover the history and culture of {place.destination.charAt(0).toUpperCase() + place.destination.slice(1)}
              </p>
            </div>
            <div className="relative max-w-5xl mx-auto">
              <button onClick={() => { const c = document.getElementById('place-related-stories-carousel'); if (c) c.scrollBy({ left: -300, behavior: 'smooth' }); }} className="absolute -left-4 top-1/3 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/80 border border-foreground/10 flex items-center justify-center hover:bg-background hover:border-foreground/20 transition-all opacity-70 hover:opacity-100" aria-label="Previous">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="10,3 5,8 10,13" /></svg>
              </button>
              <div id="place-related-stories-carousel" className="flex gap-6 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
                {relatedStories.map((story: any) => (
                  <Link key={story.slug} href={`/stories/${story.slug}`} className="group flex-shrink-0 w-[260px]">
                    <div className="relative aspect-[4/3] mb-4 overflow-hidden bg-[#e8e0d4]">
                      {story.heroImage && (<img src={cloudinaryUrl(story.heroImage)} alt={story.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />)}
                    </div>
                    <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">{story.category}</p>
                    <h3 className="font-serif text-base group-hover:opacity-70 transition-opacity">{story.title}</h3>
                  </Link>
                ))}
              </div>
              <button onClick={() => { const c = document.getElementById('place-related-stories-carousel'); if (c) c.scrollBy({ left: 300, behavior: 'smooth' }); }} className="absolute -right-4 top-1/3 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/80 border border-foreground/10 flex items-center justify-center hover:bg-background hover:border-foreground/20 transition-all opacity-70 hover:opacity-100" aria-label="Next">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="6,3 11,8 6,13" /></svg>
              </button>
            </div>
            <div className="text-center mt-12">
              <Link href="/stories" className="text-xs tracking-[0.2em] uppercase border-b border-foreground pb-1 hover:opacity-60 transition-opacity">View All Stories</Link>
            </div>
          </div>
        </section>
      )}

      {/* Related Journeys */}
      {relatedJourneys.length > 0 && (
        <section className="py-24 md:py-32 bg-background border-t border-border">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">Explore More</p>
              <h2 className="text-2xl md:text-3xl tracking-[0.15em] font-light mb-4">Related Journeys</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Curated routes that pass through {place.destination.charAt(0).toUpperCase() + place.destination.slice(1)}
              </p>
            </div>
            <div className="relative max-w-5xl mx-auto">
              <button onClick={() => { const c = document.getElementById('related-journeys-carousel'); if (c) c.scrollBy({ left: -300, behavior: 'smooth' }); }} className="absolute -left-4 top-1/3 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/80 border border-foreground/10 flex items-center justify-center hover:bg-background hover:border-foreground/20 transition-all opacity-70 hover:opacity-100" aria-label="Previous">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="10,3 5,8 10,13" /></svg>
              </button>
              <div id="related-journeys-carousel" className="flex gap-6 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
                {relatedJourneys.map((journey: any) => (
                  <Link key={journey.slug} href={`/journeys/${journey.slug}`} className="group flex-shrink-0 w-[280px]">
                    <div className="relative aspect-[4/5] mb-4 overflow-hidden bg-[#e8e0d4]">
                      {journey.heroImage && (<img src={cloudinaryUrl(journey.heroImage)} alt={journey.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />)}
                    </div>
                    <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">{journey.durationDays || journey.duration} Days</p>
                    <h3 className="font-serif text-lg group-hover:opacity-70 transition-opacity">{journey.title}</h3>
                  </Link>
                ))}
              </div>
              <button onClick={() => { const c = document.getElementById('related-journeys-carousel'); if (c) c.scrollBy({ left: 300, behavior: 'smooth' }); }} className="absolute -right-4 top-1/3 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/80 border border-foreground/10 flex items-center justify-center hover:bg-background hover:border-foreground/20 transition-all opacity-70 hover:opacity-100" aria-label="Next">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="6,3 11,8 6,13" /></svg>
              </button>
            </div>
            <div className="text-center mt-12">
              <Link href="/journeys" className="text-xs tracking-[0.2em] uppercase border-b border-foreground pb-1 hover:opacity-60 transition-opacity">View All Journeys</Link>
            </div>
          </div>
        </section>
      )}

      {/* Sources */}
      {place.sources && (
        <section className="py-8 border-t border-border">
          <div className="container mx-auto px-6 lg:px-16">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Sources:</span> {place.sources}
            </p>
          </div>
        </section>
      )}

      {/* Prev / Next places */}
      {(prevPlace || nextPlace) && (
        <div className="border-t border-foreground/10">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-2 divide-x divide-foreground/10 py-1">
              <div className="pr-8 py-8">
                {prevPlace && (
                  <Link href={`/places/${prevPlace.slug}`} className="group block">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-2">← Previous</p>
                    <p className="font-serif text-base text-foreground/70 group-hover:text-foreground transition-colors duration-300 leading-snug">
                      {prevPlace.title}
                    </p>
                  </Link>
                )}
              </div>
              <div className="pl-8 py-8 text-right">
                {nextPlace && (
                  <Link href={`/places/${nextPlace.slug}`} className="group block">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-2">Next →</p>
                    <p className="font-serif text-base text-foreground/70 group-hover:text-foreground transition-colors duration-300 leading-snug">
                      {nextPlace.title}
                    </p>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
