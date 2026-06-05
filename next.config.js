/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
  
  // 301 Redirects for old Squarespace URLs → new Next.js URLs
  // Fixes 179 GSC 404 errors from site migration
  async redirects() {
    return [
      // ============================================
      // DARIJA ROMANIZED SLUGS → DARIJA.IO
      // Generated from Search Console 404 report - June 5, 2026
      // ============================================
      { source: '/mu-ZIN', destination: 'https://darija.io', permanent: true },
      { source: '/mu-ZIN/', destination: 'https://darija.io', permanent: true },
      { source: '/SSABI3', destination: 'https://darija.io', permanent: true },
      { source: '/SSABI3/', destination: 'https://darija.io', permanent: true },
      { source: '/QBEL', destination: 'https://darija.io', permanent: true },
      { source: '/QBEL/', destination: 'https://darija.io', permanent: true },
      { source: '/DF3', destination: 'https://darija.io', permanent: true },
      { source: '/DF3/', destination: 'https://darija.io', permanent: true },
      { source: '/LAP-top', destination: 'https://darija.io', permanent: true },
      { source: '/LAP-top/', destination: 'https://darija.io', permanent: true },
      { source: '/7AW-mma', destination: 'https://darija.io', permanent: true },
      { source: '/7AW-mma/', destination: 'https://darija.io', permanent: true },
      { source: '/SIT', destination: 'https://darija.io', permanent: true },
      { source: '/SIT/', destination: 'https://darija.io', permanent: true },
      { source: '/SIFT', destination: 'https://darija.io', permanent: true },
      { source: '/SIFT/', destination: 'https://darija.io', permanent: true },
      { source: '/SMA3', destination: 'https://darija.io', permanent: true },
      { source: '/SMA3/', destination: 'https://darija.io', permanent: true },
      { source: '/HLF', destination: 'https://darija.io', permanent: true },
      { source: '/HLF/', destination: 'https://darija.io', permanent: true },
      { source: '/3SH-rin', destination: 'https://darija.io', permanent: true },
      { source: '/3SH-rin/', destination: 'https://darija.io', permanent: true },
      { source: '/mu-fat-TISH', destination: 'https://darija.io', permanent: true },
      { source: '/mu-fat-TISH/', destination: 'https://darija.io', permanent: true },
      { source: '/HZ-zm', destination: 'https://darija.io', permanent: true },
      { source: '/HZ-zm/', destination: 'https://darija.io', permanent: true },
      { source: '/HREB', destination: 'https://darija.io', permanent: true },
      { source: '/HREB/', destination: 'https://darija.io', permanent: true },
      { source: '/tsh-BBKK', destination: 'https://darija.io', permanent: true },
      { source: '/tsh-BBKK/', destination: 'https://darija.io', permanent: true },
      { source: '/h-TFEL', destination: 'https://darija.io', permanent: true },
      { source: '/h-TFEL/', destination: 'https://darija.io', permanent: true },
      { source: '/s-7AB-ni', destination: 'https://darija.io', permanent: true },
      { source: '/s-7AB-ni/', destination: 'https://darija.io', permanent: true },
      { source: '/bu-LI-si', destination: 'https://darija.io', permanent: true },
      { source: '/bu-LI-si/', destination: 'https://darija.io', permanent: true },
      { source: '/RF-dd', destination: 'https://darija.io', permanent: true },
      { source: '/RF-dd/', destination: 'https://darija.io', permanent: true },
      { source: '/TUB', destination: 'https://darija.io', permanent: true },
      { source: '/TUB/', destination: 'https://darija.io', permanent: true },

      // ============================================
      // OLD PLATFORM GHOST PAGES → HOMEPAGE / RELEVANT
      // ============================================
      { source: '/start-here', destination: '/', permanent: true },
      { source: '/faqs', destination: '/faq', permanent: true },
      { source: '/getting-around-morocco', destination: '/morocco/getting-around', permanent: true },
      { source: '/getting-to-morocco', destination: '/', permanent: true },
      { source: '/morocco-travel-guide', destination: '/morocco/travel-guide', permanent: true },
      { source: '/morocco-money-guide', destination: '/', permanent: true },
      { source: '/our-approach-footer', destination: '/about', permanent: true },
      { source: '/our-philosophy', destination: '/about', permanent: true },
      { source: '/payment', destination: '/payments', permanent: true },
      { source: '/refund-policy', destination: '/cancellations-and-refunds', permanent: true },
      { source: '/code-of-conduct', destination: '/', permanent: true },
      { source: '/our-commitment', destination: '/about', permanent: true },
      { source: '/our-commitment/', destination: '/about', permanent: true },
      { source: '/sustainability-and-community', destination: '/about', permanent: true },
      { source: '/terms-of-service', destination: '/terms', permanent: true },
      { source: '/journal', destination: '/stories', permanent: true },
      { source: '/journal/', destination: '/stories', permanent: true },
      { source: '/journal/blog-post-title-one-ej23z', destination: '/stories', permanent: true },
      { source: '/epic-journeys', destination: '/journeys', permanent: true },
      { source: '/media', destination: '/', permanent: true },
      { source: '/about-2', destination: '/about', permanent: true },
      { source: '/the-hidden-morocco-description', destination: '/', permanent: true },
      { source: '/places-1', destination: '/places', permanent: true },

      // ============================================
      // OLD JOURNEY SLUGS → /journeys
      // ============================================
      { source: '/sahara-trek-2-marrakech-to-erg-chigaga-and-back', destination: '/journeys', permanent: true },
      { source: '/sahara-trek-5-fs-to-marrakech-via-merzouga', destination: '/journeys', permanent: true },
      { source: '/sahara-trek-7-agadir-to-erg-chigaga-and-back', destination: '/journeys', permanent: true },
      { source: '/the-slow-journey-across-morocco', destination: '/journeys', permanent: true },
      { source: '/15-day-the-slow-journey-across-morocco', destination: '/journeys', permanent: true },
      { source: '/atlantic-coast-escape-5-days-of-sea-and-silence', destination: '/journeys', permanent: true },
      { source: '/atlas-valleys-escape-three-days-in-the-high-silence', destination: '/journeys', permanent: true },
      { source: '/the-atlas-sanctuaries', destination: '/journeys', permanent: true },
      { source: '/marrakech-to-erg-chigaga', destination: '/journeys', permanent: true },
      { source: '/the-anti-atlas-arc', destination: '/journeys', permanent: true },
      { source: '/agadirs-of-the-anti-atlas-the-berber-banks', destination: '/journeys', permanent: true },
      { source: '/the-table-the-vine-i-from-the-mountains-to-the-sea', destination: '/journeys', permanent: true },
      { source: '/the-table-the-vine-ii-the-northern-cellars', destination: '/journeys', permanent: true },
      { source: '/the-birds-and-the-wind-moroccos-migration-path', destination: '/journeys', permanent: true },
      { source: '/the-writers-morocco-voices-in-the-light', destination: '/journeys', permanent: true },
      { source: '/sahara-southern-morocco', destination: '/journeys', permanent: true },
      { source: '/the-atlantic-coastal-morocco', destination: '/journeys', permanent: true },
      { source: '/the-cities-of-morocco', destination: '/journeys', permanent: true },
      { source: '/3-day-marrakech-to-fes-via-merzouga', destination: '/journeys', permanent: true },

      // ============================================
      // OLD DESTINATION SLUGS → /destinations
      // ============================================
      { source: '/tiznit', destination: '/destinations', permanent: true },
      { source: '/taroudant', destination: '/destinations', permanent: true },
      { source: '/anti-atlas', destination: '/destinations', permanent: true },
      { source: '/el-jadida', destination: '/destinations', permanent: true },
      { source: '/ait-bahamou', destination: '/destinations', permanent: true },
      { source: '/middle-atlas', destination: '/destinations', permanent: true },
      { source: '/high-atlas', destination: '/destinations', permanent: true },
      { source: '/rif-mountains', destination: '/destinations', permanent: true },
      { source: '/atlantic-south-anti-atlas', destination: '/destinations', permanent: true },
      { source: '/tetouan', destination: '/destinations', permanent: true },

      // ============================================
      // OLD STORIES SLUGS → closest match
      // ============================================
      { source: '/stories/wedding-atlas', destination: '/stories/moroccan-wedding-atlas', permanent: true },
      { source: '/stories/scent-atlas', destination: '/stories', permanent: true },
      { source: '/stories/shadow-moucharabieh', destination: '/stories/shadow-of-the-moucharabieh', permanent: true },
      { source: '/stories/water-equation', destination: '/stories/the-khettara', permanent: true },
      { source: '/stories/tea-ceremony', destination: '/stories/why-the-tea-is-poured-from-a-height', permanent: true },
      { source: '/stories/geometry-of-culture', destination: '/stories', permanent: true },
      { source: '/stories/chameleon-country', destination: '/stories', permanent: true },
      { source: '/stories/argan-constellation', destination: '/stories/argan-triangle', permanent: true },
      { source: '/stories/wind-and-sun', destination: '/stories', permanent: true },

      // ============================================
      // DELETED STORIES → /stories or /plan-your-trip
      // Removed June 5, 2026 — academic content cleanup
      // ============================================
      { source: '/stories/darija', destination: '/stories', permanent: true },
      { source: '/stories/twelve-dynasties', destination: '/stories', permanent: true },
      { source: '/stories/morocco-itinerary', destination: '/plan-your-trip', permanent: true },
      { source: '/stories/driving-in-morocco', destination: '/stories', permanent: true },
      { source: '/stories/morocco-visa', destination: '/stories', permanent: true },
      { source: '/stories/what-to-wear', destination: '/stories', permanent: true },
      { source: '/stories/is-morocco-safe', destination: '/stories', permanent: true },
      { source: '/stories/what-things-cost', destination: '/stories', permanent: true },
      { source: '/stories/the-rules-of-bargaining', destination: '/stories', permanent: true },
      { source: '/stories/best-time-to-visit-morocco', destination: '/plan-your-trip', permanent: true },
      { source: '/stories/the-kings-lions', destination: '/stories', permanent: true },
      { source: '/stories/the-empire-that-crossed', destination: '/stories', permanent: true },
      { source: '/stories/wildlife-atlas-morocco', destination: '/stories', permanent: true },
      { source: '/stories/dynasty-timeline', destination: '/stories', permanent: true },
      { source: '/stories/world-cup-blueprint', destination: '/stories', permanent: true },
      { source: '/stories/moroccan-dirham-currency', destination: '/stories', permanent: true },

      // ============================================
      // PLACES 404s → /places or closest match
      // ============================================
      { source: '/places/agadir-corniche', destination: '/places', permanent: true },
      { source: '/places/agadir-marina', destination: '/places', permanent: true },
      { source: '/places/agadir-port', destination: '/places', permanent: true },
      { source: '/places/agdz', destination: '/places', permanent: true },
      { source: '/places/andalusian-mosque', destination: '/places', permanent: true },
      { source: '/places/asilah-beach', destination: '/places/asilah-medina', permanent: true },
      { source: '/places/asilah-port', destination: '/places/asilah-medina', permanent: true },
      { source: '/places/asilah-ramparts', destination: '/places/asilah-medina', permanent: true },
      { source: '/places/azrou-cedar-macaques', destination: '/places/cedar-forest-azrou', permanent: true },
      { source: '/places/bab-bou-jeloud', destination: '/places', permanent: true },
      { source: '/places/bab-doukkala', destination: '/places', permanent: true },
      { source: '/places/bab-el-ain', destination: '/places', permanent: true },
      { source: '/places/bab-el-had', destination: '/places', permanent: true },
      { source: '/places/bab-ghmat-cemetery', destination: '/places', permanent: true },
      { source: '/places/bab-guissa', destination: '/places', permanent: true },
      { source: '/places/bab-marrakech-essaouira', destination: '/places', permanent: true },
      { source: '/places/bab-mrissa', destination: '/places', permanent: true },
      { source: '/places/bab-rcif', destination: '/places', permanent: true },
      { source: '/places/bou-jeloud-gardens', destination: '/places', permanent: true },
      { source: '/places/boulevard-pasteur', destination: '/places', permanent: true },
      { source: '/places/cabo-negro-tetouan', destination: '/places/tetouan-souks', permanent: true },
      { source: '/places/cap-ghir', destination: '/places', permanent: true },
      { source: '/places/chrob-ou-chouf', destination: '/places', permanent: true },
      { source: '/places/cyber-parc', destination: '/places', permanent: true },
      { source: '/places/dades-valley-road', destination: '/places', permanent: true },
      { source: '/places/dakhla-flamingos', destination: '/places/dakhla-oysters', permanent: true },
      { source: '/places/dakhla-old-town', destination: '/places/dakhla-oysters', permanent: true },
      { source: '/places/dakhla-peninsula', destination: '/places/dakhla-oysters', permanent: true },
      { source: '/places/dakhla-surf-spots', destination: '/places/dakhla-kitesurfing', permanent: true },
      { source: '/places/draa-river-ouarzazate', destination: '/places/draa-palmeraie', permanent: true },
      { source: '/places/el-jadida-beach', destination: '/places/el-jadida-ramparts', permanent: true },
      { source: '/places/el-jadida-mellah', destination: '/places/el-jadida-ramparts', permanent: true },
      { source: '/places/el-jadida-port', destination: '/places/el-jadida-ramparts', permanent: true },
      { source: '/places/el-jadida-ville-nouvelle', destination: '/places/el-jadida-ramparts', permanent: true },
      { source: '/places/essaouira-jewish-cemetery', destination: '/places/souk-essaouira', permanent: true },
      { source: '/places/fes-el-andalus', destination: '/places', permanent: true },
      { source: '/places/fes-el-jdid', destination: '/places', permanent: true },
      { source: '/places/fes-ville-nouvelle', destination: '/places', permanent: true },
      { source: '/places/funduq-al-najjarine', destination: '/places/nejjarine-museum', permanent: true },
      { source: '/places/grande-mosquee-meknes', destination: '/places/heri-es-souani', permanent: true },
      { source: '/places/hammam-bab-doukkala', destination: '/places', permanent: true },
      { source: '/places/hash-point', destination: '/places', permanent: true },
      { source: '/places/hotel-continental', destination: '/places/kasbah-tangier', permanent: true },
      { source: '/places/ifrane', destination: '/places/ifrane-morocco', permanent: true },
      { source: '/places/jemaa-chefchaouen', destination: '/places/kasbah-chefchaouen', permanent: true },
      { source: '/places/kasbah-marrakech', destination: '/places/mellah-marrakech', permanent: true },
      { source: '/places/lalla-rookh-cemetery', destination: '/places', permanent: true },
      { source: '/places/larache-medina', destination: '/places', permanent: true },
      { source: '/places/larache-port', destination: '/places', permanent: true },
      { source: '/places/marshan-tangier', destination: '/places/kasbah-tangier', permanent: true },
      { source: '/places/medersa-sale', destination: '/places', permanent: true },
      { source: '/places/meknes-agdal-basin', destination: '/places/heri-es-souani', permanent: true },
      { source: '/places/mellah-essaouira', destination: '/places/souk-essaouira', permanent: true },
      { source: '/places/mellah-of-fes', destination: '/places', permanent: true },
      { source: '/places/mellah-of-rabat', destination: '/places', permanent: true },
      { source: '/places/mellah-of-sefrou', destination: '/places', permanent: true },
      { source: '/places/mellah-sale', destination: '/places', permanent: true },
      { source: '/places/merzouga-village', destination: '/places', permanent: true },
      { source: '/places/mhamid-village', destination: '/places', permanent: true },
      { source: '/places/mohammedia-beach', destination: '/places', permanent: true },
      { source: '/places/mohammedia-corniche', destination: '/places', permanent: true },
      { source: '/places/mohammedia-golf', destination: '/places', permanent: true },
      { source: '/places/mohammedia-medina', destination: '/places', permanent: true },
      { source: '/places/mohammedia-seafood', destination: '/places', permanent: true },
      { source: '/places/mohammedia-ville-nouvelle', destination: '/places', permanent: true },
      { source: '/places/mouassine-mosque', destination: '/places', permanent: true },
      { source: '/places/mouassine-quarter', destination: '/places', permanent: true },
      { source: '/places/moussem-sale', destination: '/places/asilah-moussem', permanent: true },
      { source: '/places/musee-archeologique-rabat', destination: '/places', permanent: true },
      { source: '/places/musee-dar-batha', destination: '/places/musee-patrimoine-immateriel', permanent: true },
      { source: '/places/musee-sidi-mohammed', destination: '/places/mohammed-vi-museum', permanent: true },
      { source: '/places/nejjarine-fountain', destination: '/places/nejjarine-museum', permanent: true },
      { source: '/places/orson-welles-square', destination: '/places/souk-essaouira', permanent: true },
      { source: '/places/ouarzazate-city', destination: '/places', permanent: true },
      { source: '/places/oued-fes', destination: '/places', permanent: true },
      { source: '/places/ouezzane-medina', destination: '/places/ouezzane-jewish-heritage', permanent: true },
      { source: '/places/ouezzane-wool-souk', destination: '/places/ouezzane-jewish-heritage', permanent: true },
      { source: '/places/ourika-saffron', destination: '/places', permanent: true },
      { source: '/places/ouzoud-gorge', destination: '/places', permanent: true },
      { source: '/places/palace-raisuni-asilah', destination: '/places/asilah-medina', permanent: true },
      { source: '/places/place-bab-fteuh', destination: '/places', permanent: true },
      { source: '/places/place-de-la-liberation-larache', destination: '/places', permanent: true },
      { source: '/places/place-independance-ouezzane', destination: '/places/ouezzane-jewish-heritage', permanent: true },
      { source: '/places/place-moulay-hassan', destination: '/places/souk-essaouira', permanent: true },
      { source: '/places/place-rcif', destination: '/places', permanent: true },
      { source: '/places/rabat-medina', destination: '/places', permanent: true },
      { source: '/places/rabat-ocean-coast', destination: '/places', permanent: true },
      { source: '/places/sale-souks', destination: '/places', permanent: true },
      { source: '/places/sale-waterfront', destination: '/places', permanent: true },
      { source: '/places/sefrou-cherry-festival', destination: '/places', permanent: true },
      { source: '/places/sefrou-medina', destination: '/places', permanent: true },
      { source: '/places/sefrou-mellah', destination: '/places', permanent: true },
      { source: '/places/sidi-bouabid-mosque', destination: '/places', permanent: true },
      { source: '/places/simon-attias-synagogue', destination: '/places/ibn-danan-synagogue', permanent: true },
      { source: '/places/skoura-kasbahs', destination: '/places/kasbah-amridil', permanent: true },
      { source: '/places/souk-cherratine', destination: '/places/souk-attarine-fes', permanent: true },
      { source: '/places/souk-haddadine', destination: '/places', permanent: true },
      { source: '/places/souk-kimakhine', destination: '/places', permanent: true },
      { source: '/places/souk-nejjarine', destination: '/places/nejjarine-museum', permanent: true },
      { source: '/places/souk-sebbaghine', destination: '/places', permanent: true },
      { source: '/places/spanish-mosque', destination: '/places/spanish-mosque', permanent: true },
      { source: '/places/taghazout-surf-breaks', destination: '/places', permanent: true },
      { source: '/places/talborjt-agadir', destination: '/places', permanent: true },
      { source: '/places/taliouine-saffron', destination: '/places/rose-cooperative', permanent: true },
      { source: '/places/tangier-beach', destination: '/places/kasbah-tangier', permanent: true },
      { source: '/places/tangier-medina', destination: '/places/kasbah-tangier', permanent: true },
      { source: '/places/tangier-mellah', destination: '/places/kasbah-tangier', permanent: true },
      { source: '/places/taroudant-medina', destination: '/places/souk-taroudant', permanent: true },
      { source: '/places/taroudant-souks', destination: '/places/souk-taroudant', permanent: true },
      { source: '/places/telouet-village', destination: '/places', permanent: true },
      { source: '/places/tetouan-ensanche', destination: '/places/tetouan-souks', permanent: true },
      { source: '/places/tetouan-mellah', destination: '/places/tetouan-souks', permanent: true },
      { source: '/places/tetouan-tanneries', destination: '/places/tetouan-souks', permanent: true },
      { source: '/places/tinghir-kasbah', destination: '/places', permanent: true },
      { source: '/places/tinghir-town', destination: '/places', permanent: true },
      { source: '/places/tiznit-agadir', destination: '/places/tiznit-jewellers', permanent: true },
      { source: '/places/todra-climbing', destination: '/places', permanent: true },
      { source: '/places/todra-palm-grove', destination: '/places', permanent: true },
      { source: '/places/ville-nouvelle-tangier', destination: '/places/kasbah-tangier', permanent: true },
      { source: '/places/western-sahara-context', destination: '/places', permanent: true },
      { source: '/places/zagora-town', destination: '/places', permanent: true },
      { source: '/places/zaouia-sidi-bel-abbes', destination: '/places', permanent: true },
      { source: '/places/zaouia-sidi-ben-slimane', destination: '/places', permanent: true },

      // ============================================
      // PLACE REDIRECTS (old /city → /places/city)
      // Note: marrakech, fes, tangier, rabat, essaouira, casablanca,
      // meknes, ouarzazate, agadir, dakhla, chefchaouen are now city
      // guide pages at /[city] — do NOT redirect these slugs.
      // ============================================
      { source: '/tangier-2', destination: '/tangier', permanent: true },
      { source: '/fes-meknes', destination: '/fes', permanent: true },
      { source: '/tafraoute', destination: '/tafraout', permanent: true },
      { source: '/tata', destination: '/destinations', permanent: true },
      { source: '/amizmiz', destination: '/destinations', permanent: true },
      { source: '/ouirgane', destination: '/destinations', permanent: true },
      { source: '/ourika-valley', destination: '/destinations', permanent: true },
      { source: '/agafay', destination: '/overnight/agafay-desert', permanent: true },
      { source: '/al-hoceima', destination: '/destinations', permanent: true },
      { source: '/ergoud-merzouga', destination: '/merzouga', permanent: true },
      { source: '/dades-valley-todra-gorge', destination: '/dades-valley', permanent: true },
      { source: '/zagora-the-draa-valley', destination: '/draa-valley', permanent: true },
      { source: '/tamegroute-tamnougalt', destination: '/tamegroute', permanent: true },
      { source: '/ouarzazate-skoura-details', destination: '/ouarzazate', permanent: true },
      { source: '/mhamid-erg-chegaga', destination: '/mhamid', permanent: true },
      { source: '/marrakech-beyond', destination: '/marrakech', permanent: true },
      { source: '/marrakech-to-erg-chigaga', destination: '/marrakech', permanent: true },
      
      // ============================================
      // JOURNEY REDIRECTS (with duration prefix)
      // ============================================
      { source: '/3-day-fes-to-merzouga', destination: '/journeys', permanent: true },
      { source: '/3-day-fes-to-marrakech-via-merzouga', destination: '/journeys', permanent: true },
      { source: '/3-day-marrakech-to-merzouga', destination: '/journeys', permanent: true },
      { source: '/3-day-marrakech-to-the-sahara', destination: '/journeys', permanent: true },
      { source: '/3-day-the-ounila-valley', destination: '/journeys', permanent: true },
      { source: '/3-day-atlas-valleys-escape-three-days-in-the-high-silence', destination: '/journeys', permanent: true },
      { source: '/5-day-agadir-to-erg-chigaga', destination: '/journeys', permanent: true },
      { source: '/5-day-tbourida-by-the-sea-riders-and-the-ocean-wind', destination: '/journeys', permanent: true },
      { source: '/5-day-the-imilchil-weddings-a-festival-of-promise', destination: '/journeys', permanent: true },
      { source: '/6-day-the-romans-in-morocco-stones-of-empire', destination: '/journeys', permanent: true },
      { source: '/7-day-atlas-to-desert-journey-seven-days-between-stone-and-sand', destination: '/journeys', permanent: true },
      { source: '/7-day-northern-morocco-journey-seven-days-of-white-and-blue', destination: '/journeys', permanent: true },
      { source: '/7-day-the-amazigh-weavers-road-the-language-of-wool', destination: '/journeys', permanent: true },
      { source: '/7-day-the-hidden-oases-six-days-of-palm-shade-and-clay', destination: '/journeys', permanent: true },
      { source: '/7-day-the-spice-road-table-of-morocco', destination: '/journeys', permanent: true },
      { source: '/7-day-traditional-medicine-healing-arts', destination: '/journeys', permanent: true },
      { source: '/8-day-mythic-morocco-at-the-edge-of-the-known-world', destination: '/journeys', permanent: true },
      { source: '/8-day-the-coastal-line-sea-and-song', destination: '/journeys', permanent: true },
      { source: '/8-day-the-desert-circle-eight-days-of-earth-and-echo', destination: '/journeys', permanent: true },
      { source: '/8-day-the-northern-line-exile-and-light', destination: '/journeys', permanent: true },
      { source: '/8-day-the-roads-of-transhumance-following-the-shepherds-path', destination: '/journeys', permanent: true },
      { source: '/8-day-the-writers-morocco-voices-in-the-light', destination: '/journeys', permanent: true },
      { source: '/9-day-the-atlas-sanctuaries', destination: '/journeys', permanent: true },
      { source: '/9-day-the-southern-remnants', destination: '/journeys', permanent: true },
      { source: '/10-day-andalusian-crossroads-ten-days-between-cities-and-silence', destination: '/journeys', permanent: true },
      { source: '/10-day-the-rock-art-roads', destination: '/journeys', permanent: true },
      { source: '/10-day-the-southern-oases-caravan-route-ten-days-of-earth-and-memory', destination: '/journeys', permanent: true },
      { source: '/10-day-the-sufi-roads', destination: '/journeys', permanent: true },
      { source: '/12-day-eastern-morocco', destination: '/journeys', permanent: true },
      { source: '/12-day-the-sacred-architecture-of-light', destination: '/journeys', permanent: true },
      { source: '/12-day-the-southern-loop-from-dunes-to-the-sea', destination: '/journeys', permanent: true },
      { source: '/13-day-the-saharan-frontier-twelve-days-of-wind-and-distance', destination: '/journeys', permanent: true },
      { source: '/15-day-the-atlantic-descent-casablanca-to-dakhla', destination: '/journeys', permanent: true },
      { source: '/15-day-the-compass-of-morocco', destination: '/journeys', permanent: true },
      { source: '/15-day-the-slow-journey-across-morocco', destination: '/journeys', permanent: true },
      
      // ============================================
      // JOURNEY REDIRECTS (without duration prefix)
      // ============================================
      { source: '/the-amazigh-weavers-road-the-language-of-wool', destination: '/journeys', permanent: true },
      { source: '/the-anti-atlas-journey-seven-days-of-stone-and-silence', destination: '/journeys', permanent: true },
      { source: '/the-atlantic-descent-casablanca-to-dakhla', destination: '/journeys', permanent: true },
      { source: '/the-atlas-sanctuaries', destination: '/journeys', permanent: true },
      { source: '/the-birds-and-the-wind-moroccos-migration-path', destination: '/journeys', permanent: true },
      { source: '/the-birds-and-the-wind-moroccos-migration-path-1', destination: '/journeys', permanent: true },
      { source: '/the-birds-and-the-wind-moroccos-migration-path-2', destination: '/journeys', permanent: true },
      { source: '/the-birds-and-the-wind-moroccos-migration-path-3', destination: '/journeys', permanent: true },
      { source: '/the-birds-and-the-wind-moroccos-migration-path-4', destination: '/journeys', permanent: true },
      { source: '/the-hidden-oases-six-days-of-palm-shade-and-clay', destination: '/journeys', permanent: true },
      { source: '/the-painters-morocco-light-color-and-solitude', destination: '/journeys', permanent: true },
      { source: '/the-roads-of-transhumance-following-the-shepherds-path', destination: '/journeys', permanent: true },
      { source: '/the-rock-art-roads', destination: '/journeys', permanent: true },
      { source: '/the-romans-in-morocco-stones-of-empire', destination: '/journeys', permanent: true },
      { source: '/the-saharan-frontier-twelve-days-of-wind-and-distance', destination: '/journeys', permanent: true },
      { source: '/the-slow-journey-across-morocco', destination: '/journeys', permanent: true },
      { source: '/the-southern-loop-from-dunes-to-the-sea-1', destination: '/journeys', permanent: true },
      { source: '/the-southern-oases-caravan-route-ten-days-of-earth-and-memory', destination: '/journeys', permanent: true },
      { source: '/the-southern-remnants', destination: '/journeys', permanent: true },
      { source: '/the-spice-road-table-of-morocco', destination: '/journeys', permanent: true },
      { source: '/the-sufi-roads', destination: '/journeys', permanent: true },
      { source: '/the-writers-morocco-voices-in-the-light', destination: '/journeys', permanent: true },
      { source: '/tbourida-by-the-sea-riders-and-the-ocean-wind', destination: '/journeys', permanent: true },
      { source: '/atlantic-road-journey-seven-days-by-the-ocean', destination: '/journeys', permanent: true },
      { source: '/atlas-to-desert-journey-seven-days-between-stone-and-sand', destination: '/journeys', permanent: true },
      { source: '/andalusian-crossroads-ten-days-between-cities-and-silence', destination: '/journeys', permanent: true },
      { source: '/northern-morocco-journey-seven-days-of-white-and-blue', destination: '/journeys', permanent: true },
      { source: '/northern-highlands-journey-seven-days-of-green-silence', destination: '/journeys', permanent: true },
      { source: '/day-trip-from-marrakech-at-benhaddou-and-the-road-of-kasbahs', destination: '/journeys', permanent: true },
      
      // ============================================
      // SAHARA TREK REDIRECTS
      // ============================================
      { source: '/sahara-trek-1-marrakech-to-merzouga-3-days-/-return-to-marrakech', destination: '/journeys', permanent: true },
      { source: '/sahara-trek-2-marrakech-to-erg-chigaga-and-back', destination: '/journeys', permanent: true },
      { source: '/sahara-trek-3-marrakech-to-fs-via-merzouga', destination: '/journeys', permanent: true },
      { source: '/sahara-trek-5-fs-to-marrakech-via-merzouga', destination: '/journeys', permanent: true },
      { source: '/sahara-trek-6-agadir-to-erg-chigaga-and-back', destination: '/journeys', permanent: true },
      { source: '/sahara-trek-7-agadir-to-erg-chigaga-and-back', destination: '/journeys', permanent: true },
      { source: '/sahara-trek-7-agadir-to-erg-chigaga-and-back-1', destination: '/journeys', permanent: true },
      
      // ============================================
      // REGION/CATEGORY PAGES → JOURNEYS
      // ============================================
      { source: '/anti-atlas', destination: '/journeys', permanent: true },
      { source: '/high-atlas', destination: '/journeys', permanent: true },
      { source: '/middle-atlas', destination: '/journeys', permanent: true },
      { source: '/atlas-sahara', destination: '/journeys', permanent: true },
      { source: '/the-sahara-desert', destination: '/journeys', permanent: true },
      { source: '/the-atlas-mountains', destination: '/journeys', permanent: true },
      { source: '/the-atlas-the-mountains-of-morocco', destination: '/journeys', permanent: true },
      { source: '/north-coast', destination: '/journeys', permanent: true },
      { source: '/imperial-cities-middle-atlas', destination: '/journeys', permanent: true },
      // /regions redirect REMOVED — page exists, in sitemap, has sub-pages
      { source: '/special-interests', destination: '/journeys', permanent: true },
      { source: '/epic-journeys', destination: '/journeys', permanent: true },
      { source: '/across-morocco-journeys', destination: '/journeys', permanent: true },
      { source: '/across-morocco-2', destination: '/journeys', permanent: true },
      { source: '/journeys-1', destination: '/journeys', permanent: true },
      { source: '/the-classic-routes-description', destination: '/journeys', permanent: true },
      { source: '/the-elemental-circuits-description', destination: '/journeys', permanent: true },
      { source: '/the-hidden-morocco-description', destination: '/journeys', permanent: true },
      { source: '/the-sacred-roads-description', destination: '/journeys', permanent: true },
      
      // ============================================
      // STATIC PAGE REDIRECTS
      // ============================================
      { source: '/home', destination: '/', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/about-us-main', destination: '/about', permanent: true },
      { source: '/about-2', destination: '/about', permanent: true },
      { source: '/our-approach', destination: '/about', permanent: true },
      { source: '/our-approach-main', destination: '/about', permanent: true },
      { source: '/our-approach-footer', destination: '/about', permanent: true },
      { source: '/our-ethos', destination: '/about', permanent: true },
      { source: '/our-philosophy', destination: '/about', permanent: true },
      { source: '/our-mission', destination: '/about', permanent: true },
      { source: '/our-mission-main', destination: '/about', permanent: true },
      { source: '/founders-note', destination: '/about', permanent: true },
      { source: '/founders-note-main', destination: '/about', permanent: true },
      { source: '/sustainability-and-community', destination: '/about', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/privacy-policy-1', destination: '/privacy', permanent: true },
      { source: '/terms-of-service', destination: '/terms', permanent: true },
      // /booking-conditions now has its own page — old redirect removed
      { source: '/refund-policy', destination: '/cancellations-and-refunds', permanent: true },
      { source: '/code-of-conduct', destination: '/terms', permanent: true },
      { source: '/faqs-2', destination: '/faq', permanent: true },
      { source: '/payment', destination: '/plan-your-trip', permanent: true },
      { source: '/appointments', destination: '/plan-your-trip', permanent: true },
      { source: '/travel-gently', destination: '/go/gentle', permanent: true },
      { source: '/places-1', destination: '/places', permanent: true },
      { source: '/es/', destination: '/', permanent: true },
      
      // ============================================
      // JOURNAL → STORIES
      // ============================================
      { source: '/journal', destination: '/stories', permanent: true },
      { source: '/journal/', destination: '/stories', permanent: true },
      { source: '/media', destination: '/stories', permanent: true },
      
      // ============================================
      // SQUARESPACE JUNK → HOMEPAGE
      // ============================================
      { source: '/journal/blog-post-title-one-ej23z', destination: '/', permanent: true },
      { source: '/journal/blog-post-title-two-5makw', destination: '/', permanent: true },
      { source: '/journal/blog-post-title-two-lkww3', destination: '/', permanent: true },
      { source: '/journal/blog-post-title-three-rnsp4', destination: '/', permanent: true },
      { source: '/journal/blog-post-title-three-agzsl', destination: '/', permanent: true },
      { source: '/journal/blog-post-title-four-tm7fb', destination: '/', permanent: true },
      { source: '/journal/blog-post-title-four-a4aaz', destination: '/', permanent: true },
      { source: '/journal/Blog%20Post%20Title%20One-xfxd6', destination: '/', permanent: true },
      
      // ============================================
      // MISC ORPHAN PAGES
      // ============================================
      { source: '/ait-bahamou', destination: '/', permanent: true },
      { source: '/agadirs-of-the-anti-atlas-the-berber-banks', destination: '/stories', permanent: true },
      { source: '/atlantic-coast-escape-5-days-of-sea-and-silence', destination: '/journeys', permanent: true },
      { source: '/atlantic-south-anti-atlas', destination: '/journeys', permanent: true },
      { source: '/atlas-valleys-escape-three-days-in-the-high-silence', destination: '/journeys', permanent: true },
      { source: '/mythic-morocco-at-the-edge-of-the-known-world', destination: '/journeys', permanent: true },
      { source: '/rif-mountains', destination: '/journeys', permanent: true },
      { source: '/sahara-southern-morocco', destination: '/journeys', permanent: true },
      { source: '/the-anti-atlas-arc', destination: '/journeys', permanent: true },
      { source: '/the-atlantic-coastal-morocco', destination: '/journeys', permanent: true },
      { source: '/the-atlantic-coastal-morocco-1', destination: '/journeys', permanent: true },
      { source: '/the-cities-of-morocco', destination: '/places', permanent: true },
      { source: '/the-coastal-line-sea-and-song', destination: '/journeys', permanent: true },
      { source: '/the-desert-circle-eight-days-of-earth-and-echo', destination: '/journeys', permanent: true },
      { source: '/the-northern-line-exile-and-light', destination: '/journeys', permanent: true },
      { source: '/the-sacred-architecture-of-light', destination: '/journeys', permanent: true },
      { source: '/the-sky-and-the-sand-in-the-footsteps-of-saint-exupry', destination: '/journeys', permanent: true },
      { source: '/the-table-the-vine-i-from-the-mountains-to-the-sea', destination: '/journeys', permanent: true },
      { source: '/the-table-the-vine-ii-the-northern-cellars', destination: '/journeys', permanent: true },
      { source: '/traditional-medicine-healing-arts', destination: '/journeys', permanent: true },
      { source: '/wild-morocco-from-forests-to-the-atlantic', destination: '/journeys', permanent: true },

      // ============================================
      // GSC 404 FIXES - Feb 24 2026
      // ============================================
      { source: '/es', destination: '/', permanent: true },
      
      // ============================================
      // GSC 404 FIXES - Feb 2026
      // ============================================
      { source: '/cities', destination: '/places', permanent: true },
      { source: '/the-atlantic-ocean', destination: '/journeys', permanent: true },
      { source: '/the-atlantic-ocean-1', destination: '/journeys', permanent: true },
      { source: '/the-sahara', destination: '/journeys', permanent: true },
      { source: '/the-slow-way-2', destination: '/manifesto', permanent: true },
      { source: '/accessibility-comfort', destination: '/faq', permanent: true },
      { source: '/accessibility-commitment', destination: '/faq', permanent: true },
      { source: '/behind-the-scenes', destination: '/about', permanent: true },
      { source: '/coastal-havens', destination: '/journeys', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/getting-started', destination: '/plan-your-trip', permanent: true },
      { source: '/guest-experiences', destination: '/stories', permanent: true },
      { source: '/our-commitment', destination: '/manifesto', permanent: true },
      { source: '/payments-refunds', destination: '/cancellations-and-refunds', permanent: true },
      { source: '/travel-notes', destination: '/stories', permanent: true },
      { source: '/traveling-with-a-companion', destination: '/plan-your-trip', permanent: true },
      { source: '/what-we-do', destination: '/journeys', permanent: true },
      { source: '/who-we-are', destination: '/about', permanent: true },
      // Edge cases: trailing slashes, spaces, ampersands
      { source: '/stories/', destination: '/stories', permanent: true },

      // ============================================
      // STORY → STORIES (URL consolidation)
      // ============================================
      { source: '/story/:slug', destination: '/stories/:slug', permanent: true },

      // ============================================
      // RENAMED STORIES
      // ============================================
      { source: '/stories/the-bureaucracy-of-blood', destination: '/stories/the-golden-doors', permanent: true },
      // Duplicate coverage of Dihya / al-Kahina — consolidating to /stories/the-priestess
      { source: '/stories/the-warrior-queen', destination: '/stories/the-priestess', permanent: true },

      // ============================================
      // SLUG FIXES — March 4, 2026 (SEO keyword optimisation)
      // ============================================

      // Stories
      { source: '/stories/medina-data', destination: '/stories', permanent: true },
      { source: '/stories/moroccan-wedding-atlas', destination: '/stories/moroccan-wedding-economy', permanent: true },
      { source: '/stories/tagine-atlas', destination: '/stories/moroccan-tagine-guide', permanent: true },
      { source: '/stories/tagine-atlas-deep', destination: '/stories/moroccan-tagine-guide', permanent: true },
      { source: '/stories/spice-map-morocco', destination: '/stories/moroccan-spice-guide', permanent: true },
      { source: '/stories/spice-map-deep', destination: '/stories/moroccan-spice-guide', permanent: true },
      { source: '/stories/scent-atlas-morocco', destination: '/stories/moroccan-perfume-traditions', permanent: true },
      { source: '/stories/musical-traditions-morocco', destination: '/stories/moroccan-music-traditions', permanent: true },
      { source: '/stories/pottery-traditions-morocco', destination: '/stories/moroccan-pottery-guide', permanent: true },
      { source: '/stories/tanneries-of-fes', destination: '/stories/fes-tanneries-guide', permanent: true },
      { source: '/stories/tourism-flow-morocco', destination: '/stories/morocco-tourism-statistics', permanent: true },
      { source: '/stories/dirhams-journey', destination: '/stories', permanent: true },

      { source: '/stories/harvest-calendar', destination: '/stories/morocco-harvest-calendar', permanent: true },
      { source: '/stories/marriage-economy', destination: '/stories/moroccan-wedding-economy', permanent: true },
      { source: '/stories/souk-decoded', destination: '/stories/moroccan-souk-guide', permanent: true },

      // Places
      { source: '/places/toubkal-trailhead', destination: '/places/imlil-village', permanent: true },
      { source: '/places/volubilis-jewish-presence', destination: '/places/volubilis-jewish-history', permanent: true },
      { source: '/places/musee-du-parfum', destination: '/marrakech', permanent: true },
      { source: '/places/macaal', destination: '/marrakech', permanent: true },
      { source: '/places/macaal-museum-marrakech', destination: '/marrakech', permanent: true },
      { source: '/places/slat-al-azama', destination: '/places', permanent: true },
      { source: '/places/taroudant-medina', destination: '/destinations', permanent: true },
      { source: '/stories/moroccan-fashion', destination: '/stories', permanent: true },
      { source: '/places/gnawa-khamlia', destination: '/places/khamlia-gnawa-village', permanent: true },

      // ============================================
      // DELETED REACT DATA MODULES — March 13, 2026
      // ============================================
      { source: '/stories/hammam-culture', destination: '/stories/the-hammam', permanent: true },
      { source: '/stories/dynasty-timeline', destination: '/stories', permanent: true },

      // Cleaned-up story directory redirects — March 13, 2026
      { source: '/stories/al-andalus', destination: '/stories/al-andalus-corridor', permanent: true },
      { source: '/stories/gates-of-marrakech', destination: '/stories/the-golden-doors', permanent: true },
      { source: '/stories/islamic-spain', destination: '/stories/islamic-spain-legacy', permanent: true },
      { source: '/stories/timeline-of-morocco', destination: '/stories/twelve-dynasties', permanent: true },

      // ============================================
      // GSC 404 VALIDATION FIX — March 26, 2026
      // New Squarespace/old URLs not yet covered
      // ============================================
      
      // Journey variant not in original list
      { source: '/3-day-marrakech-to-fes-via-merzouga', destination: '/journeys', permanent: true },
      
      // Old destination pages → city guides or /destinations
      { source: '/asilah', destination: '/destinations', permanent: true },
      { source: '/el-jadida', destination: '/destinations', permanent: true },
      { source: '/oualidia', destination: '/destinations', permanent: true },
      { source: '/taliouine', destination: '/destinations', permanent: true },
      { source: '/taroudant', destination: '/destinations', permanent: true },
      { source: '/tiznit', destination: '/destinations', permanent: true },
      
      // Old static pages
      { source: '/contact-2', destination: '/contact', permanent: true },
      
      // Old guide-style URLs → new morocco guide pages
      { source: '/getting-around-morocco', destination: '/morocco/getting-around', permanent: true },
      { source: '/getting-to-morocco', destination: '/morocco/travel-guide', permanent: true },
      { source: '/morocco-travel-guide', destination: '/morocco/travel-guide', permanent: true },
      { source: '/morocco-money-guide', destination: '/morocco/food-and-tipping', permanent: true },
      
      // Place pages that don't exist
      { source: '/places/bab-bou-jeloud', destination: '/fes', permanent: true },
      
      // URL encoding variant (space in filename)
      { source: '/journal/Blog Post Title One-xfxd6', destination: '/', permanent: true },

      // ============================================
      // DARIJA → DARIJA.IO MIGRATION — March 26, 2026
      // Moves 10,000+ dictionary pages off slowmorocco.com
      // Reduces Supabase egress and focuses SM on travel content
      // ============================================
      { source: '/darija', destination: 'https://darija.io', permanent: true },
      { source: '/darija/dictionary', destination: 'https://darija.io/dictionary', permanent: true },
      { source: '/darija/dictionary/:id', destination: 'https://darija.io/dictionary/:id', permanent: true },
      { source: '/darija/phrases', destination: 'https://darija.io/phrases', permanent: true },
      { source: '/darija/access', destination: 'https://darija.io/access', permanent: true },
      { source: '/darija/:path*', destination: 'https://darija.io/:path*', permanent: true },

      // ============================================
      // GSC 404 FIXES — March 31, 2026
      // ============================================
      
      // Darija romanized slugs → darija.io
      { source: '/KHSHB', destination: 'https://darija.io', permanent: true },
      { source: '/KHSHB/', destination: 'https://darija.io', permanent: true },
      { source: '/ko-nik-TI', destination: 'https://darija.io', permanent: true },
      { source: '/ko-nik-TI/', destination: 'https://darija.io', permanent: true },
      { source: '/WLD', destination: 'https://darija.io', permanent: true },
      { source: '/WLD/', destination: 'https://darija.io', permanent: true },
      { source: '/WR-rd', destination: 'https://darija.io', permanent: true },
      { source: '/WR-rd/', destination: 'https://darija.io', permanent: true },
      { source: '/WR-RA', destination: 'https://darija.io', permanent: true },
      { source: '/WR-RA/', destination: 'https://darija.io', permanent: true },
      { source: '/DRON', destination: 'https://darija.io', permanent: true },
      { source: '/DRON/', destination: 'https://darija.io', permanent: true },
      { source: '/JA', destination: 'https://darija.io', permanent: true },
      { source: '/JA/', destination: 'https://darija.io', permanent: true },
      { source: '/bu-LI-si', destination: 'https://darija.io', permanent: true },
      { source: '/bu-LI-si/', destination: 'https://darija.io', permanent: true },
      { source: '/BL3', destination: 'https://darija.io', permanent: true },
      { source: '/BL3/', destination: 'https://darija.io', permanent: true },
      { source: '/RF-dd', destination: 'https://darija.io', permanent: true },
      { source: '/RF-dd/', destination: 'https://darija.io', permanent: true },
      { source: '/TUB', destination: 'https://darija.io', permanent: true },
      { source: '/TUB/', destination: 'https://darija.io', permanent: true },
      { source: '/s-7AB-ni', destination: 'https://darija.io', permanent: true },
      { source: '/s-7AB-ni/', destination: 'https://darija.io', permanent: true },
      
      // Missing stories — GSC 404 cleanup April 2026
      // /stories/gladiator-country is a live story — do NOT redirect
      { source: '/stories/solar-compass', destination: '/stories', permanent: true },
      { source: '/stories/marriages-divorces-morocco', destination: '/stories', permanent: true },
      { source: '/stories/the-tea-road', destination: '/stories', permanent: true },
      { source: '/stories/amazigh-identity', destination: '/stories/amazigh-identity-map', permanent: true },
      { source: '/stories/the-stone-language', destination: '/stories', permanent: true },
      { source: '/stories/marrakech-medina-guide', destination: '/stories', permanent: true },
      { source: '/stories/spice-routes', destination: '/stories', permanent: true },
      { source: '/stories/water-crisis', destination: '/stories/water-crisis-morocco', permanent: true },
      { source: '/stories/ottoman-north-africa', destination: '/stories/the-berber-caliphate', permanent: true },

      // Darija dictionary verb pages (catch-all not matching)
      { source: '/darija/dictionary/verbs-04411', destination: 'https://darija.io', permanent: true },
      { source: '/darija/dictionary/verbs-08251', destination: 'https://darija.io', permanent: true },
      { source: '/darija/dictionary/verbs-09740', destination: 'https://darija.io', permanent: true },
      { source: '/darija/dictionary/verbs-09741', destination: 'https://darija.io', permanent: true },

      // Missing place slugs
      { source: '/places/ifrane', destination: '/ifrane', permanent: true },

      // ============================================
      // GSC "Crawled — not indexed" fixes — April 3, 2026
      // ============================================
      // Old Squarespace pages
      { source: '/faqs', destination: '/faq', permanent: true },
      { source: '/sustainable-travel', destination: '/about', permanent: true },
      { source: '/what-to-expect', destination: '/plan-your-trip', permanent: true },
      { source: '/marrakech-2', destination: '/marrakech', permanent: true },
      // Old journey slugs
      { source: '/the-compass-of-morocco', destination: '/journeys', permanent: true },
      { source: '/the-southern-loop-from-dunes-to-the-sea', destination: '/journeys', permanent: true },
      { source: '/sahara-trek-4-fs-to-merzouga-and-back', destination: '/journeys', permanent: true },
      { source: '/the-imilchil-weddings-a-festival-of-promise', destination: '/journeys', permanent: true },
      { source: '/sahara-journey-the-ounila-valley-and-kasbah-des-cads', destination: '/journeys', permanent: true },
      // Darija dictionary leaks (catch-all not matching these)
      { source: '/darija/dictionary/work-08627', destination: 'https://darija.io', permanent: true },
      { source: '/darija/dictionary/health-06582', destination: 'https://darija.io', permanent: true },
      { source: '/darija/dictionary/verbs-03233', destination: 'https://darija.io', permanent: true },

      // /start-here redirect REMOVED — page exists, linked from homepage + morocco guides
      // /agadir is a live destination page — do NOT redirect

      // ============================================
      // DEAD PLACE SUB-PAGES — April 8, 2026
      // Places removed from Supabase but still crawled by Google
      // ============================================
      { source: '/places/agadir-corniche', destination: '/agadir', permanent: true },
      { source: '/places/agadir-port', destination: '/agadir', permanent: true },
      { source: '/places/agdal-gardens', destination: '/marrakech', permanent: true },
      { source: '/places/agdal-rabat', destination: '/rabat', permanent: true },
      { source: '/places/agdz', destination: '/draa-valley', permanent: true },
      { source: '/places/ait-benhaddou-interior', destination: '/ouarzazate', permanent: true },
      { source: '/places/al-qarawiyyin-mosque', destination: '/fes', permanent: true },
      { source: '/places/ali-ibn-yusuf-madrasa', destination: '/marrakech', permanent: true },
      { source: '/places/andalusian-mosque', destination: '/fes', permanent: true },
      { source: '/places/anti-atlas-taghazout', destination: '/places', permanent: true },
      { source: '/places/asilah-beach', destination: '/destinations', permanent: true },
      { source: '/places/asilah-port', destination: '/destinations', permanent: true },
      { source: '/places/bab-doukkala-essaouira', destination: '/essaouira', permanent: true },
      { source: '/places/bab-el-ain', destination: '/rabat', permanent: true },
      { source: '/places/bab-el-had', destination: '/rabat', permanent: true },
      { source: '/places/bab-ghmat-cemetery', destination: '/marrakech', permanent: true },
      { source: '/places/bab-guissa', destination: '/fes', permanent: true },
      { source: '/places/bab-marrakech-essaouira', destination: '/essaouira', permanent: true },
      { source: '/places/bab-mrissa', destination: '/places', permanent: true },
      { source: '/places/bab-rcif', destination: '/fes', permanent: true },
      { source: '/places/borj-nord', destination: '/fes', permanent: true },
      { source: '/places/bou-regreg-river', destination: '/rabat', permanent: true },
      { source: '/places/boulevard-pasteur', destination: '/tangier', permanent: true },
      { source: '/places/boumalne-dades', destination: '/dades-valley', permanent: true },
      { source: '/places/cabo-negro-tetouan', destination: '/places', permanent: true },
      { source: '/places/centre-hassan-ii-asilah', destination: '/destinations', permanent: true },
      { source: '/places/chrob-ou-chouf', destination: '/fes', permanent: true },
      { source: '/places/cyber-parc', destination: '/marrakech', permanent: true },
      { source: '/places/dades-valley-road', destination: '/dades-valley', permanent: true },
      { source: '/places/dakhla-flamingos', destination: '/dakhla', permanent: true },
      { source: '/places/dakhla-old-town', destination: '/dakhla', permanent: true },
      { source: '/places/dakhla-peninsula', destination: '/dakhla', permanent: true },
      { source: '/places/dakhla-port', destination: '/dakhla', permanent: true },
      { source: '/places/dakhla-surf-spots', destination: '/dakhla', permanent: true },
      { source: '/places/draa-river-ouarzazate', destination: '/ouarzazate', permanent: true },
      { source: '/places/el-jadida-mellah', destination: '/destinations', permanent: true },
      { source: '/places/el-jadida-ville-nouvelle', destination: '/destinations', permanent: true },
      { source: '/places/erg-chebbi-sunrise', destination: '/merzouga', permanent: true },
      { source: '/places/fes-el-andalus', destination: '/fes', permanent: true },
      { source: '/places/fes-ville-nouvelle', destination: '/fes', permanent: true },
      { source: '/places/foundouk-marrakech', destination: '/marrakech', permanent: true },
      { source: '/places/funduq-al-najjarine', destination: '/fes', permanent: true },
      { source: '/places/grande-mosquee-sale', destination: '/places', permanent: true },
      { source: '/places/hammam-bab-doukkala', destination: '/marrakech', permanent: true },
      { source: '/places/hash-point', destination: '/places', permanent: true },
      { source: '/places/jemaa-chefchaouen', destination: '/chefchaouen', permanent: true },
      { source: '/places/kasbah-larache', destination: '/places', permanent: true },
      { source: '/places/kasbah-marrakech', destination: '/marrakech', permanent: true },
      { source: '/places/lalla-rookh-cemetery', destination: '/places', permanent: true },
      { source: '/places/larache-beach', destination: '/places', permanent: true },
      { source: '/places/larache-medina', destination: '/places', permanent: true },
      { source: '/places/larache-port', destination: '/places', permanent: true },
      { source: '/places/larache-souks', destination: '/places', permanent: true },
      { source: '/places/larache-spanish-quarter', destination: '/places', permanent: true },
      { source: '/places/loukkos-estuary', destination: '/places', permanent: true },
      { source: '/places/marshan-tangier', destination: '/tangier', permanent: true },
      { source: '/places/mausoleum-moulay-ali-cherif', destination: '/places', permanent: true },
      { source: '/places/medersa-sale', destination: '/places', permanent: true },
      { source: '/places/meknes-agdal-basin', destination: '/meknes', permanent: true },
      { source: '/places/meknes-medina', destination: '/meknes', permanent: true },
      { source: '/places/mellah-sale', destination: '/places', permanent: true },
      { source: '/places/merenid-tombs', destination: '/fes', permanent: true },
      { source: '/places/merzouga-village', destination: '/merzouga', permanent: true },
      { source: '/places/mhamid-village', destination: '/places', permanent: true },
      { source: '/places/mohammedia-beach', destination: '/places', permanent: true },
      { source: '/places/mohammedia-corniche', destination: '/places', permanent: true },
      { source: '/places/mohammedia-golf', destination: '/places', permanent: true },
      { source: '/places/mohammedia-medina', destination: '/places', permanent: true },
      { source: '/places/mohammedia-port', destination: '/places', permanent: true },
      { source: '/places/mohammedia-seafood', destination: '/places', permanent: true },
      { source: '/places/mohammedia-ville-nouvelle', destination: '/places', permanent: true },
      { source: '/places/mouassine-fountain', destination: '/marrakech', permanent: true },
      { source: '/places/mouassine-mosque', destination: '/marrakech', permanent: true },
      { source: '/places/moussem-sale', destination: '/places', permanent: true },
      { source: '/places/musee-archeologique-rabat', destination: '/rabat', permanent: true },
      { source: '/places/musee-dar-batha', destination: '/fes', permanent: true },
      { source: '/places/musee-nejjarine', destination: '/fes', permanent: true },
      { source: '/places/musee-sidi-mohammed', destination: '/rabat', permanent: true },
      { source: '/places/orson-welles-square', destination: '/essaouira', permanent: true },
      { source: '/places/ouarzazate-city', destination: '/ouarzazate', permanent: true },
      { source: '/places/oued-fes', destination: '/fes', permanent: true },
      { source: '/places/ouezzane-medina', destination: '/places', permanent: true },
      { source: '/places/ouezzane-wool-souk', destination: '/places', permanent: true },
      { source: '/places/ourika-saffron', destination: '/places', permanent: true },
      { source: '/places/ouzoud-gorge', destination: '/places', permanent: true },
      { source: '/places/petit-socco', destination: '/tangier', permanent: true },
      { source: '/places/place-bab-fteuh', destination: '/fes', permanent: true },
      { source: '/places/place-de-la-liberation-larache', destination: '/places', permanent: true },
      { source: '/places/place-el-hedim', destination: '/meknes', permanent: true },
      { source: '/places/place-independance-ouezzane', destination: '/places', permanent: true },
      { source: '/places/place-moulay-hassan', destination: '/essaouira', permanent: true },
      { source: '/places/place-rcif', destination: '/fes', permanent: true },
      { source: '/places/plaza-uta-el-hammam', destination: '/chefchaouen', permanent: true },
      { source: '/places/qubba-almoravide', destination: '/marrakech', permanent: true },
      { source: '/places/rabat-medina', destination: '/rabat', permanent: true },
      { source: '/places/rabat-ocean-coast', destination: '/rabat', permanent: true },
      { source: '/places/rabat-ville-nouvelle', destination: '/rabat', permanent: true },
      { source: '/places/rahba-kedima', destination: '/marrakech', permanent: true },
      { source: '/places/rif-foothills-ouezzane', destination: '/places', permanent: true },
      { source: '/places/sale-corsair-quarter', destination: '/places', permanent: true },
      { source: '/places/sale-medina', destination: '/places', permanent: true },
      { source: '/places/sale-souks', destination: '/places', permanent: true },
      { source: '/places/sale-waterfront', destination: '/places', permanent: true },
      { source: '/places/sefrou-cherry-festival', destination: '/places', permanent: true },
      { source: '/places/sefrou-medina', destination: '/places', permanent: true },
      { source: '/places/sefrou-mellah', destination: '/places', permanent: true },
      { source: '/places/sidi-ifni-beach', destination: '/places', permanent: true },
      { source: '/places/skoura-kasbahs', destination: '/ouarzazate', permanent: true },
      { source: '/places/souk-cherratine', destination: '/fes', permanent: true },
      { source: '/places/souk-es-sebat', destination: '/fes', permanent: true },
      { source: '/places/souk-haddadine', destination: '/fes', permanent: true },
      { source: '/places/souk-kimakhine', destination: '/fes', permanent: true },
      { source: '/places/souk-nejjarine', destination: '/fes', permanent: true },
      { source: '/places/souk-sebbaghine', destination: '/fes', permanent: true },
      { source: '/places/taghazout-bay', destination: '/places', permanent: true },
      { source: '/places/taghazout-surf-breaks', destination: '/places', permanent: true },
      { source: '/places/talborjt-agadir', destination: '/agadir', permanent: true },
      { source: '/places/taliouine-kasbah', destination: '/destinations', permanent: true },
      { source: '/places/taliouine-saffron', destination: '/destinations', permanent: true },
      { source: '/places/tamnougalt-village', destination: '/tamegroute', permanent: true },
      { source: '/places/tangier-medina', destination: '/tangier', permanent: true },
      { source: '/places/tangier-mellah', destination: '/tangier', permanent: true },
      { source: '/places/tangier-old-mountain', destination: '/tangier', permanent: true },
      { source: '/places/tanneries-chouara-view', destination: '/fes', permanent: true },
      { source: '/places/tanneries-marrakech', destination: '/marrakech', permanent: true },
      { source: '/places/taroudant-souks', destination: '/places', permanent: true },
      { source: '/places/telouet-village', destination: '/ouarzazate', permanent: true },
      { source: '/places/tetouan-ensanche', destination: '/places', permanent: true },
      { source: '/places/tinghir-kasbah', destination: '/places', permanent: true },
      { source: '/places/tinghir-town', destination: '/places', permanent: true },
      { source: '/places/tiznit-agadir', destination: '/agadir', permanent: true },
      { source: '/places/todra-climbing', destination: '/places', permanent: true },
      { source: '/places/todra-palm-grove', destination: '/places', permanent: true },
      { source: '/places/toubkal-base-camp', destination: '/places', permanent: true },
      { source: '/places/ville-nouvelle-tangier', destination: '/tangier', permanent: true },
      { source: '/places/western-sahara-context', destination: '/places', permanent: true },
      { source: '/places/zaouia-moulay-idriss-fes', destination: '/fes', permanent: true },
      { source: '/places/zaouia-ouezzane', destination: '/places', permanent: true },
      { source: '/places/zaouia-sidi-bel-abbes', destination: '/marrakech', permanent: true },
      { source: '/places/zaouia-sidi-ben-slimane', destination: '/marrakech', permanent: true },
      { source: '/places/zaouia-sidi-makhlouf', destination: '/marrakech', permanent: true },

      // ============================================
      // GSC 404 RESIDUAL CLEANUP — May 11, 2026
      // Last legacy URLs not caught by prior batches
      // /tetouan intentionally omitted: now a live destination hub (see May 7 note below).
      // ============================================
      { source: '/places/agadir-beach', destination: '/destinations', permanent: true },
      { source: '/stories/the-desert-that-does-mathematics', destination: '/stories', permanent: true },
      { source: '/stories/who-is-the-goat', destination: '/stories', permanent: true },
      { source: '/stories/geometry-of-culture', destination: '/stories', permanent: true },
      { source: '/stories/from-the-land-of-the-setting-sun', destination: '/stories', permanent: true },
      { source: '/stories/jewish-atlas', destination: '/stories', permanent: true },

      // ============================================
      // CITY GUIDE CONSOLIDATION — May 12, 2026
      // Per GSC Performance May 12 2026: combined ~1 click in 90 days
      // across all 8 below. Strategy shift away from mainstream tourist
      // keyword capture. Keeping /marrakech, /fes, /rabat only.
      // ============================================
      { source: '/tangier', destination: '/destinations', permanent: true },
      { source: '/essaouira', destination: '/destinations', permanent: true },
      { source: '/casablanca', destination: '/destinations', permanent: true },
      { source: '/meknes', destination: '/destinations', permanent: true },
      { source: '/ouarzazate', destination: '/destinations', permanent: true },
      { source: '/agadir', destination: '/destinations', permanent: true },
      { source: '/dakhla', destination: '/destinations', permanent: true },
      { source: '/chefchaouen', destination: '/destinations', permanent: true },

      // Dead story slugs — April 8, 2026
      { source: '/stories/shadow-moucharabieh', destination: '/stories', permanent: true },
      { source: '/stories/tea-ceremony', destination: '/stories', permanent: true },
      { source: '/stories/water-equation', destination: '/stories', permanent: true },
      { source: '/stories/wildlife-atlas', destination: '/stories', permanent: true },

      // Missing redirects — April 8, 2026
      // /tetouan redirect removed May 7 2026: /tetouan is now a live destination
      // hub served by /[city]/page.tsx after the destinations row was populated.
      { source: '/darija/dictionary/culture-04486', destination: 'https://darija.io', permanent: true },
      { source: '/darija/dictionary/greetings-08172', destination: 'https://darija.io', permanent: true },
      { source: '/darija/dictionary/technology-09051', destination: 'https://darija.io', permanent: true },

      // 404 fixes — April 15, 2026 (Ahrefs audit)
      // Cities: /places/CITY → /CITY
      { source: '/places/rabat', destination: '/rabat', permanent: true },
      { source: '/places/tangier', destination: '/tangier', permanent: true },
      { source: '/places/merzouga', destination: '/merzouga', permanent: true },
      { source: '/places/essaouira', destination: '/essaouira', permanent: true },
      { source: '/places/meknes', destination: '/meknes', permanent: true },
      { source: '/places/casablanca', destination: '/casablanca', permanent: true },
      { source: '/places/chefchaouen', destination: '/chefchaouen', permanent: true },
      { source: '/places/ouarzazate', destination: '/ouarzazate', permanent: true },
      { source: '/places/taghazout', destination: '/taghazout', permanent: true },
      { source: '/places/tamegroute', destination: '/tamegroute', permanent: true },
      { source: '/places/moulay-idriss', destination: '/moulay-idriss', permanent: true },
      { source: '/places/ifrane-morocco', destination: '/ifrane', permanent: true },
      { source: '/places/taroudant', destination: '/places', permanent: true },
      { source: '/destinations/agadir', destination: '/agadir', permanent: true },
      // Landmarks: redirect to actual place slugs
      { source: '/places/bahia-palace', destination: '/places/palais-bahia', permanent: true },
      { source: '/places/ben-youssef-madrasa', destination: '/places/ben-youssef-medersa', permanent: true },
      { source: '/places/taliouine', destination: '/places/saffron-fields-taliouine', permanent: true },
      // Landmarks without place page: redirect to city
      { source: '/places/qarawiyyin-mosque', destination: '/fes', permanent: true },
      { source: '/places/al-qarawiyyin', destination: '/fes', permanent: true },
      { source: '/places/koutoubia-mosque', destination: '/marrakech', permanent: true },
      { source: '/places/marrakech-souks', destination: '/marrakech', permanent: true },
      { source: '/places/jemaa-el-fna', destination: '/marrakech', permanent: true },
      { source: '/places/aroumd-village', destination: '/imlil', permanent: true },
      { source: '/places/ait-benhaddou', destination: '/ait-benhaddou', permanent: true },
      { source: '/places/todra-gorge', destination: '/todra-gorge', permanent: true },
      // Day trips: old /stories/day-trips/* path
      { source: '/stories/day-trips/ouzoud-falls', destination: '/day-trips/ouzoud-falls', permanent: true },
      { source: '/stories/day-trips/essaouira', destination: '/day-trips/essaouira', permanent: true },
      { source: '/stories/day-trips/agafay-desert', destination: '/day-trips/agafay-desert', permanent: true },
      { source: '/stories/day-trips/imlil-atlas-hiking', destination: '/day-trips/imlil-atlas-hiking', permanent: true },
      { source: '/stories/day-trips/ourika-valley', destination: '/day-trips/ourika-valley', permanent: true },
      { source: '/stories/day-trips/route-of-the-kasbahs', destination: '/day-trips/route-of-the-kasbahs', permanent: true },
      // Deleted/renamed stories
      { source: '/stories/the-wandering-poets', destination: '/stories', permanent: true },
      { source: '/stories/the-friday-couscous', destination: '/stories/the-bread-ovens', permanent: true },
      { source: '/stories/not-all-desert-is-sand', destination: '/stories/the-singing-sands', permanent: true },
      { source: '/stories/the-saadian-dynasty', destination: '/stories/the-sugar-kings-grave', permanent: true },
      { source: '/stories/almohad-atlas', destination: '/stories/the-berber-caliphate', permanent: true },
      // URL encoding fix
      { source: '/stories/category/before%20you%20go', destination: '/stories/category/before-you-go', permanent: true },
      // Old policy page slugs
      { source: '/cancellation-policy', destination: '/cancellations-and-refunds', permanent: true },
      { source: '/payment-booking', destination: '/payments', permanent: true },

      // GSC 404 cleanup — April 16, 2026
      { source: '/stories/phosphate-kingdom', destination: '/stories/morocco-phosphate-mining', permanent: true },
      { source: '/stories/scent-atlas', destination: '/stories', permanent: true },
      { source: '/stories/solar-atlas', destination: '/stories', permanent: true },
      { source: '/stories/wedding-atlas', destination: '/stories/moroccan-wedding-economy', permanent: true },
      { source: '/places/mellah-of-sefrou', destination: '/places', permanent: true },
      { source: '/places/musee-musique', destination: '/places', permanent: true },

      // Crawled-not-indexed journey slugs — April 16, 2026
      { source: '/journeys/12-Day-Grand-Tour-Western-Arc', destination: '/journeys', permanent: true },
      { source: '/journeys/4-Day-Sahara-&-Valleys-Journey', destination: '/journeys', permanent: true },
      { source: '/journeys/7-day-morocco-highlights', destination: '/journeys', permanent: true },

      // CRITICAL: highest impression page (5,254) was a 404
      { source: '/stories/oldest-universities', destination: '/stories/the-oldest-library', permanent: true },

      // Crawled-not-indexed dead slugs — April 21, 2026
      { source: '/journeys/6-day-kasbahs-valleys', destination: '/journeys', permanent: true },
      { source: '/journeys/almond-blossom-tafraoute-5-days', destination: '/journeys', permanent: true },
      { source: '/journeys/lakes-imilchil-6-days', destination: '/journeys', permanent: true },
      { source: '/journeys/mgoun-massif-trek-7-days', destination: '/journeys', permanent: true },
      { source: '/journeys/morocco-trekking-8-days', destination: '/journeys', permanent: true },
      { source: '/journeys/sahara-to-sea-10-days', destination: '/journeys', permanent: true },
      { source: '/journeys/morocco-grand-tour-21-days', destination: '/journeys', permanent: true },
      { source: '/places/ait-benhaddou-ksar', destination: '/ait-benhaddou', permanent: true },
      { source: '/places/akchour-waterfalls', destination: '/chefchaouen', permanent: true },
      { source: '/places/monkey-fingers-dades', destination: '/dades-valley', permanent: true },
      { source: '/stories/languages-of-morocco', destination: '/stories/the-five-tongues', permanent: true },

      // ============================================
      // GSC 404 FIXES — April 29, 2026 (44 uncovered)
      // ============================================

      // Pages
      // booking-conditions now has its own page — redirect removed June 2026
      { source: '/h-TFEL', destination: 'https://darija.io', permanent: true },
      { source: '/journeys', destination: '/epic', permanent: true },
      { source: '/regions', destination: '/destinations', permanent: true },
      { source: '/start-here', destination: '/plan-your-trip', permanent: true },

      // Deleted places → parent destinations
      { source: '/places/agadir-marina', destination: '/agadir', permanent: true },
      { source: '/places/asilah-medina', destination: '/destinations', permanent: true },
      { source: '/places/azrou-cedar-macaques', destination: '/places/cedar-forest-azrou', permanent: true },
      { source: '/places/el-jadida-beach', destination: '/destinations', permanent: true },
      { source: '/places/el-jadida-port', destination: '/destinations', permanent: true },
      { source: '/places/essaouira-jewish-cemetery', destination: '/essaouira', permanent: true },
      { source: '/places/grande-mosquee-meknes', destination: '/meknes', permanent: true },
      { source: '/places/habarim-cemetery', destination: '/fes', permanent: true },
      { source: '/places/hotel-continental', destination: '/tangier', permanent: true },
      { source: '/places/jardins-menara', destination: '/places/menara-gardens', permanent: true },
      { source: '/places/map-marrakech', destination: '/marrakech', permanent: true },
      { source: '/places/mellah-essaouira', destination: '/essaouira', permanent: true },
      { source: '/places/mellah-of-fes', destination: '/fes', permanent: true },
      { source: '/places/mellah-of-rabat', destination: '/rabat', permanent: true },
      { source: '/places/mellah-of-tinghir', destination: '/destinations', permanent: true },
      { source: '/places/mouassine-quarter', destination: '/marrakech', permanent: true },
      { source: '/places/spanish-mosque', destination: '/places/chefchaouen-viewpoint', permanent: true },
      { source: '/places/tafraout-painted-rocks', destination: '/places/painted-rocks-tafraout', permanent: true },
      { source: '/places/tangier-beach', destination: '/tangier', permanent: true },
      { source: '/places/tetouan-tanneries', destination: '/places/chouara-tannery', permanent: true },
      { source: '/places/zagora-town', destination: '/draa-valley', permanent: true },

      // Deleted/renamed stories
      { source: '/stories/atlantic-coast', destination: '/stories', permanent: true },
      { source: '/stories/chameleon-country', destination: '/stories', permanent: true },
      { source: '/stories/colour-index', destination: '/stories', permanent: true },
      { source: '/stories/high-speed-horizon', destination: '/stories', permanent: true },
      { source: '/stories/marriage-equation', destination: '/stories', permanent: true },
      { source: '/stories/migration-routes', destination: '/stories', permanent: true },
      { source: '/stories/moroccan-genome', destination: '/stories', permanent: true },
      { source: '/stories/morocco-3d-population', destination: '/stories', permanent: true },
      { source: '/stories/morocco-population', destination: '/stories', permanent: true },
      { source: '/stories/musical-traditions', destination: '/stories', permanent: true },
      { source: '/stories/roma-africana', destination: '/stories', permanent: true },
      { source: '/stories/seasonal-produce', destination: '/stories/seasonal-produce-wheel', permanent: true },
      { source: '/stories/tanneries', destination: '/stories', permanent: true },
      { source: '/stories/the-memory-in-the-stone', destination: '/stories', permanent: true },
      { source: '/stories/the-ship-of-the-desert', destination: '/stories', permanent: true },
      { source: '/stories/waters-of-empire', destination: '/stories', permanent: true },
      { source: '/stories/yennayer', destination: '/stories', permanent: true },

      // ============================================
      // DELETION REDIRECTS — May 2, 2026
      // ============================================
      { source: '/places/museum-of-perfume-marrakech', destination: '/marrakech', permanent: true },
      { source: '/places/rose-valley-kelaat', destination: '/places/rose-valley', permanent: true },

      // ============================================
      // GSC 404 cleanup — May 5, 2026 (18 new sources; 125 of the 143 in
      // the brief were already redirected and were skipped to avoid duplicates)
      // ============================================
      // Places — city-prefix slugs map to the live city guide; rest fall back to /places
      { source: '/places/ait-benhaddou-sunrise', destination: '/ait-benhaddou', permanent: true },
      { source: '/places/chaim-pinto-synagogue', destination: '/essaouira', permanent: true },
      { source: '/places/dar-si-said', destination: '/marrakech', permanent: true },
      { source: '/places/ibn-danan-synagogue', destination: '/fes', permanent: true },
      { source: '/places/musee-patrimoine-immateriel', destination: '/marrakech', permanent: true },
      { source: '/places/shrine-of-moulay-ighi', destination: '/places', permanent: true },
      { source: '/places/shrine-of-rabbi-amram-ben-diwan', destination: '/places', permanent: true },
      { source: '/places/tangier-port', destination: '/tangier', permanent: true },
      { source: '/places/tetouan-mellah', destination: '/places', permanent: true },
      { source: '/places/tomb-of-rabbi-shlomo-bel-hench', destination: '/places', permanent: true },
      { source: '/places/volubilis-jewish-history', destination: '/places', permanent: true },
      // Stories — destinations per the brief
      { source: '/stories/argan-constellation', destination: '/stories', permanent: true },
      { source: '/stories/automotive-industry', destination: '/stories', permanent: true },
      { source: '/stories/bird-atlas', destination: '/dossiers/bird-atlas', permanent: true },
      { source: '/stories/jewish-heritage', destination: '/stories/jewish-heritage-morocco', permanent: true },
      { source: '/stories/morocco-economy', destination: '/stories', permanent: true },
      { source: '/stories/pulse-medina', destination: '/stories', permanent: true },
      { source: '/stories/the-build', destination: '/stories', permanent: true },

      // ============================================
      // GSC 404 PHASE 3 — May 18, 2026
      // Four genuinely deleted places + one rename + one stray Darija slug
      // Verified against Supabase 18 May 2026
      // ============================================
      { source: '/places/bab-el-khemis', destination: '/marrakech', permanent: true },
      { source: '/places/dar-adiyel', destination: '/fes', permanent: true },
      { source: '/places/lazama-synagogue', destination: '/marrakech', permanent: true },
      { source: '/places/oukaimeden-plateau', destination: '/places/oukaimeden-ski', permanent: true },
      { source: '/tsh-BBKK', destination: 'https://darija.io', permanent: true },

      // ============================================
      // GSC RESIDUAL CLEANUP — JUNE 2026
      // Targeted fixes to remove lingering 404s and loops
      // ============================================
      { source: '/places/simon-attias-synagogue', destination: '/destinations', permanent: true },
      { source: '/places/fes-el-jdid', destination: '/fes', permanent: true },
      { source: '/places/nejjarine-fountain', destination: '/fes', permanent: true },
      { source: '/places/sidi-bouabid-mosque', destination: '/destinations', permanent: true },
      { source: '/places/cap-ghir', destination: '/destinations', permanent: true },
      { source: '/places/palace-raisuni-asilah', destination: '/destinations', permanent: true },
      { source: '/places/bou-jeloud-gardens', destination: '/fes', permanent: true },
      { source: '/places/asilah-ramparts', destination: '/destinations', permanent: true },
      { source: '/stories/port-strategy', destination: '/stories', permanent: true },
      { source: '/stories/anatomy-of-a-riad', destination: '/stories', permanent: true },
      { source: '/stories/wind-and-sun', destination: '/stories', permanent: true },

      // Legacy Darija tokens causing rogue routing hits
      { source: '/mu-ZIN', destination: 'https://darija.io', permanent: true },
      { source: '/SSABI3', destination: 'https://darija.io', permanent: true },
      { source: '/QBEL', destination: 'https://darija.io', permanent: true },
      { source: '/DF3', destination: 'https://darija.io', permanent: true },
      { source: '/LAP-top', destination: 'https://darija.io', permanent: true },
      { source: '/7AW-mma', destination: 'https://darija.io', permanent: true },
      { source: '/SIT', destination: 'https://darija.io', permanent: true },
      { source: '/SIFT', destination: 'https://darija.io', permanent: true },
      { source: '/SMA3', destination: 'https://darija.io', permanent: true },
      { source: '/HLF', destination: 'https://darija.io', permanent: true },
      { source: '/3SH-rin', destination: 'https://darija.io', permanent: true },
      { source: '/mu-fat-TISH', destination: 'https://darija.io', permanent: true },
      { source: '/HZ-zm', destination: 'https://darija.io', permanent: true },
      { source: '/HREB', destination: 'https://darija.io', permanent: true },
      
      // Global trailing parameter catch-all rule for remaining deep dictionary trails
      { source: '/darija/dictionary/:path*', destination: 'https://darija.io/dictionary', permanent: true },
      
    ];
  },
};

module.exports = nextConfig;
