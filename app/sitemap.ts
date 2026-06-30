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
  { url: `${SITE_URL}/life`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${SITE_URL}/start-here`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${SITE_URL}/plan-your-trip`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${SITE_URL}/your-morocco`, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${SITE_URL}/travel`, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${SITE_URL}/manifesto`, changeFrequency: 'yearly', priority: 0.4 },
  { url: `${SITE_URL}/faq`, changeFrequency: 'monthly', priority:
