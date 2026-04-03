# Slow Morocco — Deployment Guide

## Prerequisites

- Node.js 18+
- npm
- A Vercel account
- A Supabase project with the database schema populated

## Environment Variables

Add these in **Vercel Dashboard → Settings → Environment Variables**:

### Required

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |

### Optional — Email

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Resend API key for transactional email |
| `CONTACT_EMAIL` | Email address for form notifications |

### Optional — Maps

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Mapbox GL JS access token |

### Optional — SEO & Indexing

| Variable | Description |
|---|---|
| `GOOGLE_INDEXING_CLIENT_EMAIL` | Google service account email for Indexing API |
| `GOOGLE_INDEXING_PRIVATE_KEY` | Google service account private key |
| `GOOGLE_INDEX_SECRET` | Secret token for Google indexing webhook |
| `INDEXNOW_SECRET` | Secret for IndexNow API |
| `EBIRD_API_KEY` | eBird API key (birding data) |

### Optional — Site

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public site URL (default: `https://www.slowmorocco.com`) |
| `NEXT_PUBLIC_SITE_NAME` | Site name (default: `Slow Morocco`) |

## Deploy to Vercel

### 1. Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/slow-morocco.git
git branch -M main
git push -u origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **New Project**
3. Import your GitHub repository
4. Add environment variables (see above)
5. Click **Deploy**

### 3. Custom Domain

1. In Vercel Dashboard → **Domains**
2. Add `slowmorocco.com` and `www.slowmorocco.com`
3. Update DNS records at your registrar

## Supabase Setup

The site reads from the following core tables:

- `destinations` — city/region data with slugs, descriptions, coordinates
- `places` — individual places with categories, descriptions, hero images
- `place_images` — gallery images for places
- `city_guide_images` — hero and gallery images for city guide pages
- `journeys` — multi-day itineraries with metadata
- `journey_days` — day-by-day itinerary details
- `stories` — editorial content with body, tags, categories
- `guides` — practical travel guides
- `glossary` — Moroccan terms and definitions
- `day_trips` — bookable day trip experiences
- `overnight_experiences` — bookable overnight stays
- `page_banners` — hero images keyed by page path
- `newsletter_subscribers` — email signups
- `quotes` — trip request form submissions
- `settings` — site-wide settings
- `footer_links` — footer navigation structure

Ensure the Supabase service account has read access to all tables and write access to `quotes`, `newsletter_subscribers`, `day_trip_bookings`, and `overnight_bookings`.

## Image Hosting

Images are primarily hosted on **Cloudinary** under the `ddcznjibs` cloud name. Some legacy images reference Google Drive URLs and are converted at runtime.

Allowed image domains are configured in `next.config.js`:
- `res.cloudinary.com`
- `images.unsplash.com`
- `drive.google.com`
- `lh3.googleusercontent.com`
- `*.googleusercontent.com`
- `*.supabase.co`

## Caching

- Pages use `revalidate = 3600` (1 hour ISR) by default
- Static pages are built at deploy time
- Dynamic routes use on-demand revalidation

## Redirects

Over 200 Squarespace-to-Next.js 301 redirects are configured in `next.config.js` to preserve SEO from the previous site. These cover:

- Old place URLs → `/places/[slug]`
- Old journey URLs → `/journeys`
- Old static pages → new equivalents
- Squarespace junk URLs → homepage
- Story slug renames for SEO

## Testing After Deployment

1. Visit the homepage — hero image and city cards should load
2. Navigate to `/morocco` — country guide page
3. Navigate to `/journeys` — journey listings
4. Navigate to `/stories` — editorial stories
5. Navigate to `/places` — places directory
6. Navigate to `/plan-your-trip` — submit a test form, check Supabase `quotes` table
7. Check `/sitemap.xml` — should list all published pages
8. Check OG images — share a URL on social media or use a debugger tool

## Troubleshooting

**Images not loading?**
- Check Cloudinary URLs are accessible
- Verify `next.config.js` has the correct remote patterns
- Check browser console for Next.js Image optimization errors

**Pages showing empty content?**
- Verify Supabase environment variables are set
- Check that tables have `published = true` rows
- Check Vercel function logs for Supabase query errors

**Form not submitting?**
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set in Vercel
- Check Vercel function logs for errors
- Ensure `quotes` table has insert permissions

**Maps not rendering?**
- Verify `NEXT_PUBLIC_MAPBOX_TOKEN` is set
- Check Mapbox usage dashboard for quota limits
