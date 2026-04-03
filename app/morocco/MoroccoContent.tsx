"use client";

import { cloudinaryUrl } from "@/lib/cloudinary";
import Link from "next/link";

interface Destination {
  slug: string;
  title: string;
  subtitle: string | null;
  hero_image: string | null;
  excerpt: string | null;
}

interface Story {
  slug: string;
  title: string;
  hero_image: string | null;
  excerpt: string | null;
  category: string | null;
}

interface Props {
  cities: Destination[];
  stories: Story[];
  cityImages?: Record<string, string>;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const FACTS = [
  { value: "37M", label: "Population" },
  { value: "710K", label: "km² area" },
  { value: "11", label: "UNESCO sites" },
  { value: "3,500", label: "km coastline" },
  { value: "1,000+", label: "Years of medina tradition" },
  { value: "3", label: "Mountain ranges" },
];


const ESSENTIALS = [
  {
    label: "Currency",
    value: "Moroccan Dirham (MAD)",
    note: "~1 EUR = 11 DH · ~1 USD = 10 DH · Closed currency, exchange on arrival",
  },
  {
    label: "Language",
    value: "Darija · Tamazight · French",
    note: "Spanish in the north · English in tourist areas",
  },
  {
    label: "Visa",
    value: "Visa-free for most Western passports",
    note: "US · UK · EU · Canada · Australia · 90 days on arrival",
  },
  {
    label: "Religion",
    value: "Islam (Maliki Sunni)",
    note: "With a distinctive Sufi tradition · Muezzin call five times daily",
  },
  {
    label: "Time zone",
    value: "GMT+1 (WET/WEST)",
    note: "Morocco does not observe daylight saving in the standard way",
  },
  {
    label: "Electricity",
    value: "220V · Type C/E plugs",
    note: "Same as continental Europe",
  },
];

const REGIONS = [
  {
    name: "Imperial Cities",
    cities: "Marrakech · Fes · Meknes · Rabat",
    description:
      "Four capitals across different dynasties. Each one convinced the others were second choices.",
  },
  {
    name: "Atlantic Coast",
    cities: "Casablanca · Essaouira · Agadir",
    description:
      "3,500 kilometres of coast. Art Deco, wind-scoured ramparts, surf breaks that peel for 200 metres.",
  },
  {
    name: "The North",
    cities: "Tangier · Chefchaouen · Tetouan",
    description:
      "Where Morocco faces two continents. Spanish echoes, Rif mountains, blue medinas.",
  },
  {
    name: "The South",
    cities: "Ouarzazate · Dakhla · Zagora",
    description:
      "Pre-Saharan plateaus, kasbahs melting back into the earth, and the long road to the Saharan peninsula.",
  },
  {
    name: "The Atlas",
    cities: "Imlil · Imilchil · Aït Bouguemez",
    description:
      "Three mountain ranges running northeast to southwest. Snow in winter, cedar forests, Berber villages.",
  },
  {
    name: "The Sahara",
    cities: "Merzouga · Erg Chigaga · M'Hamid",
    description:
      "The eastern and western ergs. Dunes 150 metres high. A sky at night that makes the city feel like a rumour.",
  },
];

// ── Subcomponents ─────────────────────────────────────────────────────────────

function Divider() {
  return <div className="border-t border-border" />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] tracking-[0.3em] uppercase font-mono text-foreground/30 mb-6">
      {children}
    </p>
  );
}

// ── Fallback hero images ──────────────────────────────────────────────────────

const CITY_HERO_FALLBACKS: Record<string, string> = {
  marrakech: "https://res.cloudinary.com/drstfu5yr/image/upload/v1766833142/marrakech_1_nw37ky.png",
  essaouira: "https://res.cloudinary.com/drstfu5yr/image/upload/v1767310155/essaouira_meymce.png",
  rabat: "https://res.cloudinary.com/drstfu5yr/image/upload/v1767310357/rabat_ofyxwj.png",
};

// ── Main ──────────────────────────────────────────────────────────────────────

export default function MoroccoContent({ cities, stories, cityImages = {} }: Props) {
  return (
    <main className="bg-background text-foreground">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[100svh] min-h-[600px] bg-[#1a1612]">
        <img
          src="https://res.cloudinary.com/ddcznjibs/image/upload/v1772838482/Taourirt_Kasbah_rising_above_the_desert_town_lqljat.png"
          alt="Morocco"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
            />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/15" />
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-12 lg:px-16 pb-14 md:pb-20">
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
            Morocco
          </h1>
        </div>
      </section>

      {/* ── Opening ───────────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 py-16 md:py-20">
        <div className="max-w-3xl">
          <p className="font-serif text-xl md:text-2xl leading-relaxed text-foreground/80 mb-6">
            Morocco sits at the edge of two continents, three seas, and a dozen climatic zones. 
            Atlantic coast to Saharan dune. Mediterranean littoral to High Atlas snowfield. 
            The country contains more variety than its size should allow — and has been 
            receiving travellers long enough to have developed a particular patience with the surprised.
          </p>
          <p className="text-sm text-foreground/50 leading-relaxed">
            Morocco is not a 
            destination you understand on the first visit. It reveals itself laterally — 
            through a conversation, a detour, a door left open. This is a country best 
            approached slowly.
          </p>

        </div>
      </section>

      <Divider />

      {/* ── Facts ─────────────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 py-16">
        <SectionLabel>Morocco in numbers</SectionLabel>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 border border-border">
          {FACTS.map((f, i) => (
            <div
              key={i}
              className="px-6 py-8 border-r border-b md:border-b-0 border-border last:border-r-0"
            >
              <p className="font-serif text-3xl md:text-4xl text-foreground mb-2">
                {f.value}
              </p>
              <p className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/30">
                {f.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Essentials ────────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 py-16">
        <SectionLabel>Essentials</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border">
          {ESSENTIALS.map((e, i) => (
            <div
              key={i}
              className="px-8 py-7 border-r border-b border-border"
            >
              <p className="text-[9px] tracking-[0.25em] uppercase font-mono text-foreground/30 mb-2">
                {e.label}
              </p>
              <p className="font-serif text-base text-foreground mb-1.5">
                {e.value}
              </p>
              <p className="text-xs text-foreground/40 leading-relaxed">
                {e.note}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link
            href="/travel"
            className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/40 hover:text-foreground transition-colors"
          >
            Full travel guide — visa, transport, money, health →
          </Link>
        </div>
      </section>

      <Divider />

      {/* ── Regions ───────────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 py-16">
        <SectionLabel>Six regions</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border">
          {REGIONS.map((r, i) => (
            <div key={i} className="px-8 py-8 border-r border-b border-border">
              <p className="font-serif text-lg text-foreground mb-1">
                {r.name}
              </p>
              <p className="text-[9px] tracking-[0.2em] uppercase font-mono text-foreground/30 mb-3">
                {r.cities}
              </p>
              <p className="text-sm text-foreground/50 leading-relaxed">
                {r.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Cities ────────────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 py-16">
        <SectionLabel>Ten cities</SectionLabel>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {cities.map((city) => {
            // Priority: gallery image (city_guide_images) > destination hero > hardcoded fallback
            const cityImage = cityImages[city.slug] || city.hero_image || CITY_HERO_FALLBACKS[city.slug] || null;
            return (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              className="group relative aspect-[3/4] overflow-hidden bg-foreground/5"
            >
              {cityImage && (
                <img
                  src={cloudinaryUrl(cityImage)}
                  alt={city.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
            />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {city.subtitle && (
                  <p className="text-[9px] tracking-[0.2em] uppercase text-white/40 mb-1 font-mono">
                    {city.subtitle}
                  </p>
                )}
                <p className="font-serif text-lg text-white">
                  {city.title}
                </p>
              </div>
            </Link>
            );
          })}
        </div>
      </section>

      <Divider />

      {/* ── Stories ───────────────────────────────────────────────────────── */}
      {stories.length > 0 && (
        <section className="px-8 md:px-16 lg:px-20 py-16">
          <div className="flex items-end justify-between mb-10">
            <SectionLabel>From the archive</SectionLabel>
            <Link
              href="/stories"
              className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/30 hover:text-foreground transition-colors mb-6"
            >
              All stories →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            {stories.map((story) => (
              <article key={story.slug}>
                <Link href={`/stories/${story.slug}`} className="group">
                  <div className="aspect-[3/4] relative overflow-hidden bg-foreground/5 mb-5">
                    {story.hero_image && (
                      <img
                        src={cloudinaryUrl(story.hero_image)}
                        alt={story.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
                    )}
                  </div>
                  {story.category && (
                    <p className="text-[10px] tracking-[0.3em] uppercase font-mono text-foreground/30 mb-2">
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
        </section>
      )}

      <Divider />

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 py-16">
        <SectionLabel>Common questions</SectionLabel>
        <div className="max-w-3xl space-y-0">
          {[
            {
              q: "Do I need a visa?",
              a: "Citizens of the US, UK, EU, Canada, and Australia receive a 90-day stamp on arrival. No advance visa needed. Check current requirements before travelling.",
            },
            {
              q: "What currency?",
              a: "The Moroccan dirham (MAD). A closed currency — exchange on arrival at airports, banks, or ATMs. Approximately 1 EUR = 11 DH, 1 USD = 10 DH.",
            },
            {
              q: "What languages are spoken?",
              a: "Darija (Moroccan Arabic) is the everyday language. Tamazight (Berber) in mountain regions. French for business and formal contexts. Spanish in the north. English widely spoken in tourist areas.",
            },
            {
              q: "Is it safe?",
              a: "Morocco is one of the most visited countries in Africa with a well-established tourism infrastructure. Standard urban precautions apply.",
            },
            {
              q: "What religion?",
              a: "Islam — specifically Maliki Sunni, with a strong Sufi tradition. The call to prayer sounds five times a day. Ramadan shifts the rhythm of the entire country for a month.",
            },
          ].map((item, i) => (
            <div key={i} className="py-6 border-b border-border last:border-0">
              <p className="font-serif text-lg text-foreground mb-2">{item.q}</p>
              <p className="text-sm text-foreground/55 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/faq"
            className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/40 hover:text-foreground transition-colors"
          >
            More questions →
          </Link>
        </div>
      </section>

      <Divider />

      {/* ── Timeline ──────────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 py-16">
        <Link
          href="/stories/timeline-of-morocco"
          className="group block max-w-3xl"
        >
          <p className="text-[10px] tracking-[0.3em] uppercase font-mono text-foreground/30 mb-4">
            315,000 BCE — Present
          </p>
          <h2 className="font-serif text-3xl md:text-4xl mb-3 group-hover:text-foreground/70 transition-colors">
            Timeline
          </h2>
          <p className="text-sm text-foreground/50 leading-relaxed">
            From the oldest Homo sapiens skull on earth to the 2030 World Cup. Every dynasty, every turning point, every invasion and independence — in one vertical line.
          </p>
          <p className="mt-6 text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/40 group-hover:text-foreground transition-colors">
            Explore the timeline →
          </p>
        </Link>
      </section>

      <Divider />

      {/* ── Planning Guides ───────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 py-16">
        <p className="text-[10px] tracking-[0.3em] uppercase font-mono text-foreground/30 mb-10">
          Planning guides
        </p>

        {/* Planning */}
        <div className="mb-[2rem]">
          <p className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/30 mb-6">Planning</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/[0.06]">
            {[
              { href: "/morocco/best-time-to-visit", title: "Best time to visit", desc: "Month by month — what's happening, where, and what the weather means." },
              { href: "/morocco/is-morocco-safe", title: "Is Morocco safe?", desc: "What to actually watch for. The difference between dangerous and irritating." },
              { href: "/morocco/travel-guide", title: "Morocco travel guide", desc: "Visa, money, transport, language, health. Everything practical." },
              { href: "/morocco/things-to-do-in-marrakech", title: "Things to do in Marrakech", desc: "The monuments and what they actually are." },
              { href: "/morocco/7-day-itinerary", title: "7-day itinerary", desc: "Two routes that work. Built around real distances." },
              { href: "/morocco/food-and-tipping", title: "Food and tipping", desc: "What to eat by region, where to eat it, and the tipping expectations nobody tells you." },
              { href: "/morocco/getting-around", title: "Getting around", desc: "Trains, CTM buses, grands taxis, and when a private transfer makes sense." },
            ].map((guide) => (
              <Link key={guide.href} href={guide.href} className="group bg-background p-6 hover:bg-foreground/[0.02] transition-colors">
                <h3 className="font-serif text-base text-foreground mb-1 group-hover:text-foreground/70 transition-colors">{guide.title}</h3>
                <p className="text-sm text-foreground/40 leading-relaxed mb-3">{guide.desc}</p>
                <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/25 group-hover:text-foreground/50 transition-colors">Read →</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Experiences */}
        <div className="mb-[2rem]">
          <p className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/30 mb-6">Experiences</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/[0.06]">
            {[
              { href: "/morocco/hammam", title: "The hammam", desc: "Not a spa. A centuries-old institution of hygiene and sociality." },
              { href: "/morocco/cooking-class", title: "Moroccan cooking class", desc: "The spice logic, the tagine layers, the couscous technique." },
              { href: "/morocco/souk-guide", title: "Souk navigation", desc: "The spatial logic of the medina. What to buy and how to bargain." },
              { href: "/morocco/desert-camp", title: "Desert camp", desc: "Erg Chebbi vs Erg Chigaga. What a night in the Sahara actually involves." },
              { href: "/morocco/atlas-trekking", title: "Atlas trekking", desc: "From Ourika day hikes to the Toubkal summit (4,167m)." },
              { href: "/morocco/surfing", title: "Surfing the Atlantic", desc: "Taghazout, Essaouira, Dakhla. Season, levels, what each offers." },
            ].map((guide) => (
              <Link key={guide.href} href={guide.href} className="group bg-background p-6 hover:bg-foreground/[0.02] transition-colors">
                <h3 className="font-serif text-base text-foreground mb-1 group-hover:text-foreground/70 transition-colors">{guide.title}</h3>
                <p className="text-sm text-foreground/40 leading-relaxed mb-3">{guide.desc}</p>
                <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/25 group-hover:text-foreground/50 transition-colors">Read →</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Cultural Context */}
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/30 mb-6">Cultural context</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/[0.06]">
            {[
              { href: "/morocco/islam-and-daily-life", title: "Islam and daily life", desc: "The call to prayer, the five pillars, what it means to move through a Muslim country." },
              { href: "/morocco/ramadan", title: "Visiting during Ramadan", desc: "What changes, what opens, why most tourists are wrong to avoid it." },
              { href: "/morocco/jewish-heritage", title: "Jewish heritage", desc: "265,000 Jewish Moroccans at its peak. The Mellah quarters, the synagogues, the museum." },
              { href: "/morocco/amazigh", title: "The Amazigh people", desc: "60-70% of Morocco. The indigenous language, the carpets, the mountains." },
              { href: "/morocco/french-protectorate", title: "The French Protectorate", desc: "1912–1956. Why it explains the Ville Nouvelle, the language, and modern Morocco." },
              { href: "/start-here", title: "Get your orientation", desc: "Five questions. A framework specific to your trip." },
            ].map((guide) => (
              <Link key={guide.href} href={guide.href} className="group bg-background p-6 hover:bg-foreground/[0.02] transition-colors">
                <h3 className="font-serif text-base text-foreground mb-1 group-hover:text-foreground/70 transition-colors">{guide.title}</h3>
                <p className="text-sm text-foreground/40 leading-relaxed mb-3">{guide.desc}</p>
                <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/25 group-hover:text-foreground/50 transition-colors">Read →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 py-20 md:py-28">
        <div className="max-w-xl">
          <p className="text-[10px] tracking-[0.3em] uppercase font-mono text-foreground/30 mb-4">
            Private journeys
          </p>
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            Ready to go?
          </h2>
          <p className="text-sm text-foreground/50 leading-relaxed mb-8">
            Every journey we design is private, unhurried, and built around what 
            Morocco actually is — not the postcard version. Eleven years in the medina 
            means we know the difference.
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
