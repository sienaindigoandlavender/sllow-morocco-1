import { getHero, getList } from "@/lib/data";

export default async function AmenitiesPage() {
  const [hero, amenities] = await Promise.all([
    getHero("amenities_hero"),
    getList("amenities"),
  ]);

  const heroImage = hero?.Image_URL || amenities[0]?.Image_URL || "";

  return (
    <div className="bg-[#f9f8f6] text-[#2a2520] min-h-screen">
      <section className="min-h-screen flex items-center justify-center relative">
        {heroImage && (
          <>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${heroImage}')` }} />
            <img src={heroImage} alt="Amenities at Riad di Siena, rooftop terrace and courtyard in Marrakech" className="sr-only" aria-hidden="true" />
            <div className="absolute inset-0 bg-[#2a2520]/40" />
          </>
        )}
        <div className="container mx-auto px-6 lg:px-16 text-center max-w-4xl relative z-10">
          <p className="text-xs tracking-[0.4em] uppercase text-white/60 mb-8">Riad di Siena</p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl tracking-[0.15em] font-light mb-8 text-white">A M E N I T I E S</h1>
          {hero?.Subtitle && (
            <p className="text-xl md:text-2xl text-white/80 font-serif italic max-w-2xl mx-auto">{hero.Subtitle}</p>
          )}
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/30 to-white/0" />
        </div>
      </section>

      {amenities.map((amenity: any, index: number) => (
        <section key={amenity.Amenity_ID} className={`py-24 md:py-32 ${index % 2 === 0 ? 'bg-[#f9f8f6]' : 'bg-[#efede7]'} border-t border-[#2a2520]/10`}>
          <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
            {!amenity.Image_URL ? (
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="font-serif text-2xl md:text-3xl text-[#2a2520] mb-6 italic">{amenity.Title}</h2>
                <p className="text-[#2a2520]/80 leading-relaxed text-lg">{amenity.Subtitle}</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                {index % 2 === 0 ? (
                  <>
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={amenity.Image_URL} alt={amenity.Title} className="w-full h-full object-cover" />
                    </div>
                    <div className="md:pl-8">
                      <h2 className="font-serif text-2xl md:text-3xl text-[#2a2520] mb-6 italic">{amenity.Title}</h2>
                      <p className="text-[#2a2520]/80 leading-relaxed text-lg">{amenity.Subtitle}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="md:pr-8 md:order-1">
                      <h2 className="font-serif text-2xl md:text-3xl text-[#2a2520] mb-6 italic">{amenity.Title}</h2>
                      <p className="text-[#2a2520]/80 leading-relaxed text-lg">{amenity.Subtitle}</p>
                    </div>
                    <div className="aspect-[4/3] overflow-hidden md:order-2">
                      <img src={amenity.Image_URL} alt={amenity.Title} className="w-full h-full object-cover" />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Beyond the house */}
      <section className="py-20 md:py-28 border-t border-[#2a2520]/10">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-[#2a2520]/40 mb-6">Beyond the House</p>
          <p className="text-[#2a2520]/80 leading-relaxed text-lg mb-10">
            The medina has its own rhythm. We built a city guide for our guests, covering taxis, tipping, the call to prayer, and everything else nobody tells you before you arrive.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="https://derb.so"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-[#2a2520]/20 px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#2a2520] hover:text-[#f9f8f6] transition-colors"
            >
              Derb — City Guide
            </a>
            <a 
              href="https://www.slowmorocco.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block border border-[#2a2520]/20 px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#2a2520] hover:text-[#f9f8f6] transition-colors"
            >
              Slow Morocco — Journeys
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
