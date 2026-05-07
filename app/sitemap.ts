import { MetadataRoute } from 'next'
import { getJourneys, getStories, getPlaces, getDayTrips, getDestinations } from '@/lib/supabase'

const BASE_URL = 'https://www.slowmorocco.com'

/**
 * Ensure a slug is safe for use in XML sitemap URLs.
 * URL-encodes characters that break XML parsing (especially &).
 * The encoded URL is valid in both XML and browser navigation.
 */
function safeSitemapUrl(base: string, prefix: string, slug: string): string {
  // Encode the slug portion to handle & and other special chars
  // encodeURIComponent turns & into %26 which is XML-safe
  const encodedSlug = encodeURIComponent(slug)
    .replace(/%2F/g, '/')  // preserve any intentional slashes
  return `${base}${prefix}/${encodedSlug}`
}

// City guide slugs
const CITY_SLUGS = [
  'marrakech', 'fes', 'tangier', 'rabat', 'essaouira',
  'casablanca', 'meknes', 'ouarzazate', 'agadir', 'dakhla', 'chefchaouen',
]

// Slugs that exist in Supabase but redirect — exclude from sitemap
// Every entry here must correspond to a redirect SOURCE in next.config.js.
const EXCLUDED_JOURNEY_SLUGS = [
  'morocco-grand-tour-21-days',
  'morocco-trekking-8-days',
  'almond-blossom-tafraoute-5-days',
  'sahara-to-sea-10-days',
  '12-Day-Grand-Tour-Western-Arc',
  '4-Day-Sahara-&-Valleys-Journey',
  'lakes-imilchil-6-days',
  '7-day-morocco-highlights',
  '6-day-kasbahs-valleys',
  'mgoun-massif-trek-7-days',
]

const EXCLUDED_PLACE_SLUGS = [
  'agadir-corniche',
  'agadir-port',
  'agdal-gardens',
  'agdal-rabat',
  'agdz',
  'ait-benhaddou',
  'ait-benhaddou-interior',
  'ait-benhaddou-ksar',
  'akchour-waterfalls',
  'al-qarawiyyin',
  'al-qarawiyyin-mosque',
  'ali-ibn-yusuf-madrasa',
  'andalusian-mosque',
  'anti-atlas-taghazout',
  'aroumd-village',
  'asilah-beach',
  'asilah-port',
  'bab-bou-jeloud',
  'bab-doukkala-essaouira',
  'bab-el-ain',
  'bab-el-had',
  'bab-ghmat-cemetery',
  'bab-guissa',
  'bab-marrakech-essaouira',
  'bab-mrissa',
  'bab-rcif',
  'bahia-palace',
  'ben-youssef-madrasa',
  'borj-nord',
  'bou-regreg-river',
  'boulevard-pasteur',
  'boumalne-dades',
  'cabo-negro-tetouan',
  'casablanca',
  'centre-hassan-ii-asilah',
  'chefchaouen',
  'chrob-ou-chouf',
  'cyber-parc',
  'dades-valley-road',
  'dakhla-flamingos',
  'dakhla-old-town',
  'dakhla-peninsula',
  'dakhla-port',
  'dakhla-surf-spots',
  'draa-river-ouarzazate',
  'el-jadida-mellah',
  'el-jadida-ville-nouvelle',
  'erg-chebbi-sunrise',
  'essaouira',
  'fes-el-andalus',
  'fes-ville-nouvelle',
  'foundouk-marrakech',
  'funduq-al-najjarine',
  'gnawa-khamlia',
  'grande-mosquee-sale',
  'hammam-bab-doukkala',
  'hash-point',
  'ifrane',
  'ifrane-morocco',
  'ifrane-town',
  'jemaa-chefchaouen',
  'jemaa-el-fna',
  'kasbah-larache',
  'kasbah-marrakech',
  'koutoubia-mosque',
  'lalla-rookh-cemetery',
  'larache-beach',
  'larache-medina',
  'larache-port',
  'larache-souks',
  'larache-spanish-quarter',
  'loukkos-estuary',
  'macaal',
  'macaal-museum-marrakech',
  'marrakech-souks',
  'marshan-tangier',
  'mausoleum-moulay-ali-cherif',
  'medersa-sale',
  'meknes',
  'meknes-agdal-basin',
  'meknes-medina',
  'mellah-of-sefrou',
  'mellah-sale',
  'merenid-tombs',
  'merzouga',
  'merzouga-village',
  'mhamid-village',
  'mohammedia-beach',
  'mohammedia-corniche',
  'mohammedia-golf',
  'mohammedia-medina',
  'mohammedia-port',
  'mohammedia-seafood',
  'mohammedia-ville-nouvelle',
  'monkey-fingers-dades',
  'mouassine-fountain',
  'mouassine-mosque',
  'moulay-idriss',
  'moussem-sale',
  'musee-archeologique-rabat',
  'musee-dar-batha',
  'musee-du-parfum',
  'musee-musique',
  'musee-nejjarine',
  'musee-sidi-mohammed',
  'orson-welles-square',
  'ouarzazate',
  'ouarzazate-city',
  'oued-fes',
  'ouezzane-medina',
  'ouezzane-wool-souk',
  'ourika-saffron',
  'ouzoud-gorge',
  'petit-socco',
  'place-bab-fteuh',
  'place-de-la-liberation-larache',
  'place-el-hedim',
  'place-independance-ouezzane',
  'place-moulay-hassan',
  'place-rcif',
  'plaza-uta-el-hammam',
  'qarawiyyin-mosque',
  'qubba-almoravide',
  'rabat',
  'rabat-medina',
  'rabat-ocean-coast',
  'rabat-ville-nouvelle',
  'rahba-kedima',
  'rif-foothills-ouezzane',
  'sale-corsair-quarter',
  'sale-medina',
  'sale-souks',
  'sale-waterfront',
  'sefrou-cherry-festival',
  'sefrou-medina',
  'sefrou-mellah',
  'sidi-ifni-beach',
  'skoura-kasbahs',
  'slat-al-azama',
  'souk-cherratine',
  'souk-es-sebat',
  'souk-haddadine',
  'souk-kimakhine',
  'souk-nejjarine',
  'souk-sebbaghine',
  'taghazout',
  'taghazout-bay',
  'taghazout-surf-breaks',
  'talborjt-agadir',
  'taliouine',
  'taliouine-kasbah',
  'taliouine-saffron',
  'tamegroute',
  'tamnougalt-village',
  'tangier',
  'tangier-medina',
  'tangier-mellah',
  'tangier-old-mountain',
  'tanneries-chouara-view',
  'tanneries-marrakech',
  'taroudant',
  'taroudant-medina',
  'taroudant-souks',
  'telouet-village',
  'tetouan-ensanche',
  'tinghir-kasbah',
  'tinghir-town',
  'tiznit-agadir',
  'todra-climbing',
  'todra-gorge',
  'todra-palm-grove',
  'toubkal-base-camp',
  'toubkal-trailhead',
  'ville-nouvelle-tangier',
  'volubilis-jewish-presence',
  'western-sahara-context',
  'zaouia-moulay-idriss-fes',
  'zaouia-ouezzane',
  'zaouia-sidi-bel-abbes',
  'zaouia-sidi-ben-slimane',
  'zaouia-sidi-makhlouf',
]

const EXCLUDED_STORY_SLUGS = [
  'languages-of-morocco',
  'the-warrior-queen',
]

const EXCLUDED_DESTINATION_SLUGS = [
  'agafay',
  'al-hoceima',
  'amizmiz',
  'asilah',
  'dades-valley-todra-gorge',
  'el-jadida',
  'ergoud-merzouga',
  'fes-meknes',
  'marrakech-2',
  'marrakech-beyond',
  'marrakech-to-erg-chigaga',
  'mhamid-erg-chegaga',
  'oualidia',
  'ouarzazate-skoura-details',
  'ouirgane',
  'ourika-valley',
  'tafraoute',
  'taliouine',
  'tamegroute-tamnougalt',
  'tangier-2',
  'taroudant',
  'tata',
  'tiznit',
  'zagora-the-draa-valley',
]

// Static pages with their priorities
const STATIC_PAGES = [
  { path: '', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/journeys', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/epic', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/stories', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/places', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/places/map', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/destinations', priority: 0.9, changeFrequency: 'weekly' as const },
  // City guides — high priority, these are destination authority pages
  ...CITY_SLUGS.map(city => ({
    path: `/${city}`,
    priority: 0.9,
    changeFrequency: 'weekly' as const,
  })),
  { path: '/morocco', priority: 0.9, changeFrequency: 'monthly' as const },
  // Morocco guide pages — high-volume tourist intent keywords
  { path: '/morocco/best-time-to-visit', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/morocco/is-morocco-safe', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/morocco/travel-guide', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/morocco/things-to-do-in-marrakech', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/morocco/7-day-itinerary', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/morocco/cooking-class', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/morocco/desert-camp', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/morocco/hammam', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/morocco/souk-guide', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/morocco/atlas-trekking', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/morocco/surfing', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/morocco/food-and-tipping', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/morocco/getting-around', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/morocco/islam-and-daily-life', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/morocco/ramadan', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/morocco/jewish-heritage', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/morocco/amazigh', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/morocco/french-protectorate', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/regions', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/regions/cities', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/regions/desert', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/regions/mountains', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/regions/coastal', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/stories/category/history', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/stories/category/architecture', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/stories/category/culture', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/stories/category/people', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/stories/category/systems', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/stories/category/food', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/stories/category/nature', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/stories/category/art', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/stories/category/design', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/stories/category/economy', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/stories/category/music', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/stories/category/craft', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/stories/category/movies', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/stories/category/sacred', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/stories/category/before-you-go', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/stories/category/wildlife', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/stories/category/knowledge', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/plan-your-trip', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/manifesto', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/whats-included', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/life', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/travel', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/visa-info', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/day-trips', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/guides', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/glossary', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/morocco-world-cup-2030', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/overnight/agafay-desert', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/sahara-tour-from-marrakech', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/go/gentle', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/dossiers/bird-atlas', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/your-morocco', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/start-here', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/health-safety', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/travel-insurance', priority: 0.4, changeFrequency: 'yearly' as const },
  { path: '/booking-conditions', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/payments', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/cancellations-and-refunds', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/disclaimer', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/intellectual-property', priority: 0.3, changeFrequency: 'yearly' as const },
]

async function getDynamicPages() {
  const dynamicPages: MetadataRoute.Sitemap = []

  try {
    const journeys = await getJourneys({ published: true })
    journeys.forEach((journey) => {
      if (journey.slug && !EXCLUDED_JOURNEY_SLUGS.includes(journey.slug)) {
        dynamicPages.push({
          url: safeSitemapUrl(BASE_URL, '/journeys', journey.slug),
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        })
      }
    })
  } catch (e) {
    console.error('Failed to fetch journeys for sitemap:', e)
  }

  try {
    const stories = await getStories({ published: true })
    stories.forEach((story) => {
      if (story.slug && !EXCLUDED_STORY_SLUGS.includes(story.slug)) {
        dynamicPages.push({
          url: safeSitemapUrl(BASE_URL, '/stories', story.slug),
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      }
    })
  } catch (e) {
    console.error('Failed to fetch stories for sitemap:', e)
  }

  try {
    const places = await getPlaces({ published: true })
    places.forEach((place) => {
      if (place.slug && !EXCLUDED_PLACE_SLUGS.includes(place.slug)) {
        dynamicPages.push({
          url: safeSitemapUrl(BASE_URL, '/places', place.slug),
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }
    })
  } catch (e) {
    console.error('Failed to fetch places for sitemap:', e)
  }

  try {
    const dayTrips = await getDayTrips({ published: true })
    dayTrips.forEach((trip) => {
      if (trip.slug) {
        dynamicPages.push({
          url: safeSitemapUrl(BASE_URL, '/day-trips', trip.slug),
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        })
      }
    })
  } catch (e) {
    console.error('Failed to fetch day trips for sitemap:', e)
  }

  // Destinations — all published destinations not already in CITY_SLUGS
  try {
    const destinations = await getDestinations({ published: true })
    destinations.forEach((dest) => {
      if (dest.slug && !CITY_SLUGS.includes(dest.slug) && !EXCLUDED_DESTINATION_SLUGS.includes(dest.slug)) {
        dynamicPages.push({
          url: `${BASE_URL}/${dest.slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      }
    })
  } catch (e) {
    console.error('Failed to fetch destinations for sitemap:', e)
  }

  return dynamicPages
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  // Dynamic pages from Supabase
  const dynamicPages = await getDynamicPages()

  return [...staticPages, ...dynamicPages]
}
