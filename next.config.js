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
      { source: '/es/', destination: '/', permanent: true },
      { source: '/journal/Blog%20Post%20Title%20One-xfxd6', destination: '/', permanent: true },
      
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
      { source: '/journal/Blog%20Post%20Title%20One-xfxd6', destination: '/', permanent: true },
      
      // ============================================
      // STORY → STORIES (URL consolidation)
      // ============================================
      { source: '/story/:slug', destination: '/stories/:slug', permanent: true },

      // ============================================
      // RENAMED STORIES
      // ============================================
      { source: '/stories/the-bureaucracy-of-blood', destination: '/stories/the-golden-doors', permanent: true },

      // ============================================
      // SLUG FIXES — March 4, 2026 (SEO keyword optimisation)
      // ============================================

      // Stories
      { source: '/stories/medina-data', destination: '/stories/marrakech-medina-guide', permanent: true },
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
      { source: '/stories/dirhams-journey', destination: '/stories/moroccan-dirham-currency', permanent: true },

      { source: '/stories/harvest-calendar', destination: '/stories/morocco-harvest-calendar', permanent: true },
      { source: '/stories/marriage-economy', destination: '/stories/moroccan-wedding-economy', permanent: true },
      { source: '/stories/souk-decoded', destination: '/stories/moroccan-souk-guide', permanent: true },

      // Places
      { source: '/places/ifrane-town', destination: '/places/ifrane-morocco', permanent: true },
      { source: '/places/toubkal-trailhead', destination: '/places/imlil-village', permanent: true },
      { source: '/places/volubilis-jewish-presence', destination: '/places/volubilis-jewish-history', permanent: true },
      { source: '/places/musee-du-parfum', destination: '/places/museum-of-perfume-marrakech', permanent: true },
      { source: '/places/macaal', destination: '/places/macaal-museum-marrakech', permanent: true },
      { source: '/places/gnawa-khamlia', destination: '/places/khamlia-gnawa-village', permanent: true },

      // ============================================
      // DELETED REACT DATA MODULES — March 13, 2026
      // ============================================
      { source: '/stories/hammam-culture', destination: '/stories/the-hammam', permanent: true },
      { source: '/stories/dynasty-timeline', destination: '/stories/twelve-dynasties', permanent: true },

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
      { source: '/places/ifrane', destination: '/places/ifrane-morocco', permanent: true },
      { source: '/places/bab-bou-jeloud', destination: '/fes', permanent: true },
      
      // URL encoding variant (space in filename)
      { source: '/journal/Blog Post Title One-xfxd6', destination: '/', permanent: true },

      // 8-day variant missing from original batch
      { source: '/8-day-the-writers-morocco-voices-in-the-light', destination: '/journeys', permanent: true },

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
      { source: '/stories/14km-gap', destination: '/stories', permanent: true },
      { source: '/stories/the-free-people', destination: '/stories', permanent: true },
      { source: '/stories/solar-compass', destination: '/stories', permanent: true },
      { source: '/stories/marriages-divorces-morocco', destination: '/stories', permanent: true },
      { source: '/stories/the-tea-road', destination: '/stories', permanent: true },
      { source: '/stories/amazigh-identity', destination: '/stories', permanent: true },
      { source: '/stories/weather-portraits', destination: '/stories', permanent: true },
      { source: '/stories/the-stone-language', destination: '/stories', permanent: true },
      { source: '/stories/marrakech-medina-guide', destination: '/stories', permanent: true },
      { source: '/stories/spice-routes', destination: '/stories', permanent: true },
      { source: '/stories/water-crisis', destination: '/stories/water-crisis-morocco', permanent: true },

      // Darija dictionary verb pages (catch-all not matching)
      { source: '/darija/dictionary/verbs-04411', destination: 'https://darija.io', permanent: true },
      { source: '/darija/dictionary/verbs-08251', destination: 'https://darija.io', permanent: true },
      { source: '/darija/dictionary/verbs-09740', destination: 'https://darija.io', permanent: true },
      { source: '/darija/dictionary/verbs-09741', destination: 'https://darija.io', permanent: true },

      // Missing place slugs
      { source: '/places/ifrane', destination: '/ifrane', permanent: true },
      { source: '/places/bab-bou-jeloud', destination: '/fes', permanent: true },

      // Missing old page slugs
      { source: '/getting-around-morocco', destination: '/morocco/getting-around', permanent: true },
      { source: '/getting-to-morocco', destination: '/travel', permanent: true },
      { source: '/morocco-travel-guide', destination: '/morocco/travel-guide', permanent: true },
      { source: '/morocco-money-guide', destination: '/morocco/food-and-tipping', permanent: true },
      { source: '/3-day-marrakech-to-fes-via-merzouga', destination: '/journeys', permanent: true },

      // ============================================
      // GSC "Crawled — not indexed" fixes — April 3, 2026
      // ============================================
      // Old Squarespace pages
      { source: '/faqs', destination: '/faq', permanent: true },
      { source: '/sustainable-travel', destination: '/about', permanent: true },
      { source: '/what-to-expect', destination: '/plan-your-trip', permanent: true },
      { source: '/marrakech-2', destination: '/marrakech', permanent: true },
      { source: '/journal', destination: '/stories', permanent: true },
      // Old journey slugs
      { source: '/the-compass-of-morocco', destination: '/journeys', permanent: true },
      { source: '/the-southern-loop-from-dunes-to-the-sea', destination: '/journeys', permanent: true },
      { source: '/sahara-trek-4-fs-to-merzouga-and-back', destination: '/journeys', permanent: true },
      { source: '/the-imilchil-weddings-a-festival-of-promise', destination: '/journeys', permanent: true },
      { source: '/sahara-journey-the-ounila-valley-and-kasbah-des-cads', destination: '/journeys', permanent: true },
      // Darija dictionary leaks (catch-all not matching these)
      { source: '/darija/dictionary/work-08627', destination: 'https://darija.io', permanent: true },
      { source: '/darija/dictionary/health-06582', destination: 'https://darija.io', permanent: true },

      // /start-here redirect REMOVED — page exists, linked from homepage + morocco guides
      { source: '/agadir', destination: '/destinations/agadir', permanent: true },
    ];
  },
};

module.exports = nextConfig;
