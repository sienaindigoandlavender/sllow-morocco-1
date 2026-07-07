import { MetadataRoute } from 'next';
import {
  getJourneys,
  getDayTrips,
  getPlaces,
  getStories,
  getRegions,
  getDestinations,
  getGuides,
} from '@/lib/supabase';

export const revalidate = 3600;

const SITE_URL = 'https://www.slowmorocco.com';

const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: SITE_URL, changeFrequency: 'daily', priority: 1.0 },
  { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${SITE_URL}/masthead`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${SITE_URL}/journeys`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${SITE_URL}/day-trips`, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${SITE_URL}/places`, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${SITE_URL}/places/map`, changeFrequency: 'weekly', priority: 0.6 },
  { url: `${SITE_URL}/stories`, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${SITE_URL}/regions`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${SITE_URL}/destinations`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${SITE_URL}/guides`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${SITE_URL}/glossary`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${SITE_URL}/morocco`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${SITE_URL}/morocco/the-odyssey-filming-locations`, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${SITE_URL}/life`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${SITE_URL}/start-here`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${SITE_URL}/plan-your-trip`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${SITE_URL}/your-morocco`, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${SITE_URL}/travel`, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${SITE_URL}/manifesto`, changeFrequency: 'yearly', priority: 0.4 },
  { url: `${SITE_URL}/faq`, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${SITE_URL}/contact`, changeFrequency: 'yearly', priority: 0.4 },
  { url: `${SITE_URL}/whats-included`, changeFrequency: 'monthly', priority: 0.4 },
  { url: `${SITE_URL}/health-safety`, changeFrequency: 'monthly', priority: 0.4 },
  { url: `${SITE_URL}/visa-info`, changeFrequency: 'monthly', priority: 0.4 },
  { url: `${SITE_URL}/travel-insurance`, changeFrequency: 'monthly', priority: 0.4 },
  { url: `${SITE_URL}/sahara-tour-from-marrakech`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${SITE_URL}/jewish-heritage-morocco`, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${SITE_URL}/morocco-world-cup-2030`, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${SITE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
  { url: `${SITE_URL}/terms`, changeFrequency: 'yearly', priority: 0.2 },
  { url: `${SITE_URL}/disclaimer`, changeFrequency: 'yearly', priority: 0.2 },
  { url: `${SITE_URL}/intellectual-property`, changeFrequency: 'yearly', priority: 0.2 },
  { url: `${SITE_URL}/booking-conditions`, changeFrequency: 'yearly', priority: 0.2 },
  { url: `${SITE_URL}/cancellations-and-refunds`, changeFrequency: 'yearly', priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [journeys, dayTrips, places, stories, regions, destinations, guides] =
    await Promise.allSettled([
      getJourneys({ published: true }),
      getDayTrips({ published: true }),
      getPlaces({ published: true }),
      getStories({ published: true }),
      getRegions(),
      getDestinations({ published: true }),
      getGuides({ published: true }),
    ]);

  const safe = <T,>(result: PromiseSettledResult<T[]>): T[] =>
    result.status === 'fulfilled' ? result.value : [];

  const journeyPages: MetadataRoute.Sitemap = safe(journeys)
    .filter((j: any) => j.journey_type !== 'daytrip' && j.journey_type !== 'overnight')
    .map((j: any) => ({
      url: `${SITE_URL}/journeys/${j.slug}`,
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

  const dayTripPages: MetadataRoute.Sitemap = safe(dayTrips).map((d: any) => ({
    url: `${SITE_URL}/day-trips/${d.slug}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const placePages: MetadataRoute.Sitemap = safe(places).map((p: any) => ({
    url: `${SITE_URL}/places/${p.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const storyPages: MetadataRoute.Sitemap = safe(stories).map((s: any) => ({
    url: `${SITE_URL}/stories/${s.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const regionPages: MetadataRoute.Sitemap = safe(regions).map((r: any) => ({
    url: `${SITE_URL}/regions/${r.slug}`,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  const destinationPages: MetadataRoute.Sitemap = safe(destinations).map((d: any) => ({
    url: `${SITE_URL}/${d.slug}`,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  const guidePages: MetadataRoute.Sitemap = safe(guides).map((g: any) => ({
    url: `${SITE_URL}/guides/${g.slug}`,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [
    ...STATIC_PAGES,
    ...journeyPages,
    ...dayTripPages,
    ...placePages,
    ...storyPages,
    ...regionPages,
    ...destinationPages,
    ...guidePages,
  ];
}
