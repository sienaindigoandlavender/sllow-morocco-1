import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EPIC Journeys | Slow Morocco',
  description: 'Sacred, rare, and unrepeatable private journeys through Morocco. Navigation by stars, Gnawa lila ceremonies, Saharan wildlife tracking, architectural pilgrimages. From €6,000.',
  openGraph: {
    title: 'EPIC Journeys | Slow Morocco',
    description: 'Sacred, rare, and unrepeatable private journeys through Morocco. From €6,000.',
    url: 'https://www.slowmorocco.com/epic',
    siteName: 'Slow Morocco',
    type: 'website',
  },
}

const epicJourneys = [
  {
    slug: 'navigation-by-stars',
    title: 'Navigation by Stars',
    tier: 'Transmission',
    price: '€25,000',
    duration: '10 days',
    tagline: 'There are perhaps five people alive who can teach this.',
    description: 'Three nights with a Saharan wayfarer. No GPS. No phone. You learn to read the sky the way humans did for ten thousand years. The stars, the wind patterns, the color of rock that means water within two hundred meters. This is not astronomy. This is survival knowledge held by a lineage that will not outlive the generation that holds it.',
    whatYouAreBuying: 'Transmission of ten-thousand-year-old navigation knowledge from one of the last living practitioners.',
  },
  {
    slug: 'gnawa-road',
    title: 'The Gnawa Road',
    tier: 'Transmission',
    price: '€20,000',
    tagline: 'Not a performance. A passage.',
    duration: '7 days',
    description: 'Following the lila circuit. Meeting maâlems who do not perform for tourists. Understanding the trance, the colors, the spirits, the seven families of mluk. A private ceremony — the full troupe, the full night, the real thing. The guembri opens the door. You walk through it or you don\'t.',
    whatYouAreBuying: 'Access to a living spiritual lineage. A private lila ceremony with a master musician and full troupe, held for you alone.',
  },
  {
    slug: 'tracking-the-sahara',
    title: 'Tracking the Sahara',
    tier: 'Transmission',
    price: '€18,000',
    tagline: 'Reading sand like text.',
    duration: '8 days',
    description: 'Dawn expeditions with a master tracker who reads prints the way a librarian reads shelves. Fennec, jackal, gazelle, desert hedgehog. The Sahara is not empty — it is written in a language most people cannot read. Your tracker can. He learned from his father, who learned from his.',
    whatYouAreBuying: 'Wildlife tracking with a generational master in the deep Sahara. Knowledge that requires a lifetime to acquire, compressed into eight days.',
  },
  {
    slug: 'architecture-pilgrimage',
    title: 'The Architecture Pilgrimage',
    tier: 'Mastery',
    price: '€12,000',
    tagline: 'Why it stands after four hundred years.',
    duration: '10 days',
    description: 'Kasbahs, ksour, pisé engineering. A journey through the geometry of Moroccan space with someone who understands load-bearing walls, passive cooling, and why a kasbah is built to return to the earth from which it came. Not sightseeing. Structural literacy.',
    whatYouAreBuying: 'A master builder as your guide through Morocco\'s architectural heritage. Engineering knowledge, not tour commentary.',
  },
  {
    slug: 'little-prince-route',
    title: 'The Little Prince Route',
    tier: 'Poetry',
    price: '€6,000',
    tagline: 'Sleep where he slept. Walk the desert that wrote the book.',
    duration: '6 days',
    description: 'Saint-Exupéry\'s Morocco — Tarfaya, Cap Juby, the airmail routes. The landscape that became the planet. The silence that became the fox. The desert that taught a pilot how to write. You follow the mail route south along the coast until the world runs out.',
    whatYouAreBuying: 'A literary pilgrimage through the landscape that shaped one of the most-read books in human history.',
  },
]

export default function EpicPage() {
  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-8">
        {/* Subtle grain overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        
        <p className="font-sans text-xs tracking-[0.4em] uppercase text-[#78716C] mb-8 relative z-10">
          Slow Morocco Presents
        </p>
        
        <h1 className="font-serif text-[clamp(4rem,12vw,10rem)] leading-[0.85] tracking-[0.15em] font-light text-white relative z-10">
          EPIC
        </h1>
        
        <div className="w-12 h-[1px] bg-[#8B2635] mt-10 mb-10 relative z-10" />
        
        <p className="font-serif text-xl md:text-2xl text-[#a8a29e] max-w-xl text-center leading-relaxed relative z-10 italic">
          Sacred. Rare. Unrepeatable.
        </p>
      </section>

      {/* Philosophy */}
      <section className="px-8 md:px-[12%] lg:px-[16%] py-24 md:py-32 border-t border-[#1a1a1a]">
        <div className="max-w-2xl">
          <p className="font-serif text-2xl md:text-3xl text-[#d6d3d1] leading-relaxed mb-8">
            These are not tours.
          </p>
          <p className="font-sans text-base text-[#a8a29e] leading-relaxed mb-6">
            An EPIC journey gives you access to people, places, and knowledge that cannot be found in any guidebook, on any platform, or through any other operator. The wayfarer who reads the stars. The maâlem who has never performed for a tourist. The tracker who learned to read sand from his father.
          </p>
          <p className="font-sans text-base text-[#a8a29e] leading-relaxed mb-6">
            Every EPIC journey is private. The entire experience — the experts, the ceremony, the expedition — is held for you and you alone. No groups. No shared moments. No strangers.
          </p>
          <p className="font-sans text-base text-[#a8a29e] leading-relaxed">
            We do not publish itineraries. A non-refundable deposit of <span className="text-white">€1,000</span> secures a detailed proposal built around your dates and shaped by twenty years of relationships in Morocco. If you proceed, the deposit applies to your journey total.
          </p>
        </div>
      </section>

      {/* Journeys */}
      <section className="px-8 md:px-[12%] lg:px-[16%] pb-32">
        <div className="space-y-0">
          {epicJourneys.map((journey, index) => (
            <div 
              key={journey.slug}
              className="border-t border-[#1a1a1a] py-16 md:py-20 group"
            >
              {/* Tier + Number */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#8B2635]">
                  {journey.tier}
                </span>
                <span className="font-sans text-[10px] text-[#3a3a3a]">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Title + Price row */}
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 mb-6">
                <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white font-light leading-tight">
                  {journey.title}
                </h2>
                <div className="flex items-baseline gap-4 md:text-right shrink-0">
                  <span className="font-serif text-2xl md:text-3xl text-white">
                    {journey.price}
                  </span>
                  <span className="font-sans text-xs text-[#78716C] tracking-wide">
                    {journey.duration}
                  </span>
                </div>
              </div>

              {/* Tagline */}
              <p className="font-serif text-lg md:text-xl text-[#8B2635] italic mb-8">
                {journey.tagline}
              </p>

              {/* Description */}
              <div className="md:grid md:grid-cols-[2fr_1fr] gap-16">
                <p className="font-sans text-sm md:text-base text-[#a8a29e] leading-relaxed">
                  {journey.description}
                </p>
                <div className="mt-8 md:mt-0">
                  <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#78716C] mb-3">
                    What you are buying
                  </p>
                  <p className="font-sans text-sm text-[#d6d3d1] leading-relaxed">
                    {journey.whatYouAreBuying}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final border */}
        <div className="border-t border-[#1a1a1a]" />
      </section>

      {/* Deposit CTA */}
      <section className="px-8 md:px-[12%] lg:px-[16%] pb-32">
        <div className="max-w-2xl">
          <p className="font-serif text-3xl md:text-4xl text-white font-light leading-relaxed mb-8">
            Begin with a deposit.
          </p>
          <p className="font-sans text-base text-[#a8a29e] leading-relaxed mb-8">
            A non-refundable deposit of €1,000 opens the conversation. You will receive a detailed proposal — your dates, your route, and access to the people who make each journey possible. If you proceed, the deposit applies in full to your journey total.
          </p>
          <p className="font-sans text-base text-[#a8a29e] leading-relaxed mb-12">
            No forms. No packages. Write to us at hello@slowmorocco.com and tell us which journey is calling you.
          </p>
          <a
            href="mailto:hello@slowmorocco.com?subject=EPIC%20Journey%20Inquiry"
            className="inline-block font-sans text-xs tracking-[0.3em] uppercase border border-[#8B2635] text-[#8B2635] px-10 py-4 hover:bg-[#8B2635] hover:text-white transition-all duration-500"
          >
            Request a journey
          </a>
        </div>
      </section>

      {/* Why no itinerary */}
      <section className="px-8 md:px-[12%] lg:px-[16%] py-24 border-t border-[#1a1a1a]">
        <div className="max-w-xl">
          <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#78716C] mb-6">
            Why no itinerary?
          </p>
          <p className="font-sans text-sm text-[#a8a29e] leading-relaxed mb-4">
            An EPIC journey is built around the availability of people who do not operate on tourist schedules. The maâlem has his own life. The wayfarer moves with the seasons. The tracker follows the animals. We coordinate with them, not the other way around.
          </p>
          <p className="font-sans text-sm text-[#a8a29e] leading-relaxed">
            Publishing a fixed itinerary would be dishonest. Your proposal is real — built for your specific dates with confirmed access to the people who make the journey what it is.
          </p>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'EPIC Journeys — Slow Morocco',
            description: 'Sacred, rare, and unrepeatable private journeys through Morocco.',
            url: 'https://www.slowmorocco.com/epic',
            numberOfItems: epicJourneys.length,
            itemListElement: epicJourneys.map((journey, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'TouristTrip',
                name: journey.title,
                description: journey.tagline,
                url: `https://www.slowmorocco.com/epic#${journey.slug}`,
                offers: {
                  '@type': 'Offer',
                  price: journey.price.replace('€', ''),
                  priceCurrency: 'EUR',
                  availability: 'https://schema.org/LimitedAvailability',
                },
                touristType: 'Cultural tourism',
                provider: {
                  '@type': 'Organization',
                  name: 'Slow Morocco',
                  url: 'https://www.slowmorocco.com',
                },
              },
            })),
          }),
        }}
      />
    </main>
  )
}
