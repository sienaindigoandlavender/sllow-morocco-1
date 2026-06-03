# Slow Morocco — Project Wiki
*Last updated: June 3, 2026*

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Business Context](#2-business-context)
3. [Tech Stack](#3-tech-stack)
4. [Repository & Deployment](#4-repository--deployment)
5. [Database — Supabase](#5-database--supabase)
6. [Application Architecture](#6-application-architecture)
7. [Proposal System](#7-proposal-system)
8. [Content Library & Routes](#8-content-library--routes)
9. [Admin Panel](#9-admin-panel)
10. [Client-Facing Proposal Page](#10-client-facing-proposal-page)
11. [PDF Generation](#11-pdf-generation)
12. [Legal & Policies](#12-legal--policies)
13. [Brand & Design](#13-brand--design)
14. [Known Issues & Pending Work](#14-known-issues--pending-work)
15. [Key Files Reference](#15-key-files-reference)

---

## 1. Project Overview

**Slow Morocco** (`slowmorocco.com`) is a content-first luxury tour operator targeting high-end clients via SEO — not WhatsApp networks or OTAs. It is positioned as a curation company, not a booking service. The brand persona is **Mohammed** — direct, knowledgeable, confident.

The application is a full tour operator platform built with Next.js 14, Supabase, and Vercel. It includes:

- A public-facing content website (essays, destinations, place guides)
- An inquiry and quote management system (CRM)
- A proposal generation engine that produces personalised client microsites
- A print-ready PDF generation system
- Booking conditions, cancellation policies, and payment pages

The business had **4 inquiries from pure SEO** between February and June 2026, with no social media presence. Inquiry #3 (Ariel Trost) resulted in the first full proposal — December 20–28, 2026, 4 guests, €22,000.

---

## 2. Business Context

**Owner:** Jacqueline (Canadian, based in Marrakech)  
**Front-facing persona:** Mohammed  
**Email:** hello@slowmorocco.com  
**Address:** 35 Derb Fhal Zfriti, Ksour, Marrakech 40000, Morocco  
**Legal entity:** Slow Morocco (client-facing) — not "Slow Morocco SARL"

**Pricing model:**
- Custom private journeys, minimum ~€2,500/person
- Ariel Trost benchmark: €22,000 / 4 guests / 9 days = €5,500/person
- Margin target: ~57%
- Deposit: 30% to confirm
- Balance: 45 days before departure

**Cancellation policy:**
- More than 45 days: full refund minus banking fees and non-refundable supplier commitments
- Less than 45 days: no refund
- Travel insurance strongly recommended

**Payment:** PayPal or international bank transfer

---

## 3. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14.2 (App Router) |
| Database | Supabase (PostgreSQL) |
| Hosting | Vercel |
| Version Control | GitHub (`sienaindigoandlavender/sllow-morocco-1`) |
| Maps | Mapbox GL JS |
| Images | Cloudinary |
| Email | Resend |
| Typography | EB Garamond, Cormorant Garamond |
| Styling | Tailwind CSS |

**Environment variables (Vercel):**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_MAPBOX_TOKEN` — `pk.eyJ1IjoiaW5kaWdv...`
- `RESEND_API_KEY`

---

## 4. Repository & Deployment

**GitHub:** `sienaindigoandlavender/sllow-morocco-1`  
**Branch:** `main` (auto-deploys to production)  
**Vercel project:** Slow Morocco (Production)

**Deploy workflow:**
1. Edit files locally or via Claude
2. Upload changed files to GitHub via web interface
3. Vercel auto-deploys on push to `main`
4. Build time: ~2–3 minutes

**Important:** Always wait for Vercel build to complete before testing. Check Vercel dashboard for build errors.

---

## 5. Database — Supabase

**Project:** Slow Morocco (PRO)  
**Schema:** `public`

### Key Tables

#### `quotes`
Stores client inquiries and journey requests.

| Column | Type | Notes |
|--------|------|-------|
| `client_id` | text | e.g. `SM-2606-001` — format: SM-YYMM-NNN |
| `first_name` | text | |
| `last_name` | text | |
| `email` | text | |
| `phone` | text | |
| `country` | text | |
| `journey_interest` | text | |
| `start_date` | text | |
| `end_date` | text | |
| `start_city` | text | |
| `end_city` | text | |
| `days` | text | |
| `travelers` | text | |
| `language` | text | |
| `budget` | text | |
| `requests` | text | |
| `notes` | text | |
| `status` | text | NEW / IN PROGRESS / SENT / BOOKED |
| `notes_route_sequence` | text | One route ID per line — used for proposal generation |
| `hero_image` | text | Cloudinary URL for proposal hero image |

#### `proposals`
Stores generated client proposals.

| Column | Type | Notes |
|--------|------|-------|
| `proposal_id` | text | Format: `PROP-{client_id}` e.g. `PROP-SM-2606-001` |
| `client_id` | text | Links to quotes table |
| `client_name` | text | |
| `hero_title` | text | e.g. "Ariel in Morocco" |
| `hero_blurb` | text | Arc description |
| `hero_image_url` | text | Cloudinary URL |
| `formatted_price` | text | e.g. "22,000" |
| `total_price` | text | Numeric string |
| `num_guests` | text | |
| `start_date` | text | |
| `end_date` | text | |
| `days_list` | text | JSON array of day objects |
| `route_points` | text | JSON array of map coordinates |
| `created_at` | timestamptz | |

#### `routes`
Content library of route segments used to build proposals.

| Column | Type | Notes |
|--------|------|-------|
| `id` | text | e.g. `STAY_ESSAOUIRA`, `ESS-MAR-NEW` |
| `from_city` | text | |
| `to_city` | text | |
| `route_description` | text | Short admin description |
| `proposal_description` | text | Poetic client-facing text |
| `image_url` | text | Cloudinary URL |
| `hero_image_url` | text | For proposal hero |
| `region` | text | |
| `travel_time_hours` | numeric | |
| `difficulty_level` | text | Easy / Moderate / Challenging |
| `meals` | text | Pipe-separated: `Breakfast|Lunch|Dinner` |
| `accommodation_type` | text | Riad / Desert Camp / Kasbah / En route |

### Route IDs Used in Ariel's Proposal

```
STAY_ESSAOUIRA_ARR   — Day 1: Essaouira arrival
STAY_ESSAOUIRA       — Day 2: Essaouira full day
ESS-MAR-NEW          — Day 3: Essaouira to Marrakech
STAY_MARRAKECH       — Day 4: Marrakech
MAR-AGAFAY           — Day 5: Marrakech to Agafay
MAR-TAM-004          — Day 6: Agafay to Tamnougalt
DAD-MER-116          — Day 7: Tamnougalt to The Sahara
STAY_MERZOUGA        — Day 8: The Sahara
MER-ERR-001          — Day 9: The Sahara to Errachidia
```

### Day Object Schema (in `days_list` JSON)

```json
{
  "dayNumber": 1,
  "date": "2026-12-20",
  "title": "Essaouira",
  "fromCity": "Essaouira",
  "toCity": "Essaouira",
  "description": "Poetic description...",
  "imageUrl": "https://res.cloudinary.com/...",
  "durationHours": "2.5h drive",
  "difficultyLevel": "Easy",
  "mealsDetail": "Breakfast, Lunch, Dinner",
  "diningNotes": "Lunch: La Pergola · Dinner: L'Mida",
  "accommodationName": "Riad El Fenn",
  "accommodationType": "Riad",
  "roomConfig": "1 Double, 2 Single",
  "activitiesDetail": "Medina tour, Palais Bahia...",
  "guideIncluded": true,
  "guideLanguage": "English",
  "transferType": "airport_pickup",
  "transferDetails": "Airport pickup — Essaouira Airport (ESU) — private car",
  "dayNotes": "Internal notes only"
}
```

---

## 6. Application Architecture

### URL Structure

| URL | Description |
|-----|-------------|
| `/` | Homepage |
| `/plan-your-trip` | Client inquiry form |
| `/proposal/[id]` | Client proposal microsite |
| `/proposal/[id]?edit=true` | Admin edit mode |
| `/api/proposals/pdf?id=[id]` | Print-ready PDF page |
| `/admin` | Admin dashboard |
| `/admin/quotes` | All quotes list |
| `/admin/quotes/[id]` | Quote detail + proposal generation |
| `/booking-conditions` | Legal page |
| `/cancellations-and-refunds` | Legal page |
| `/payments` | Legal page |

### API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/proposals` | GET | Fetch proposal by `?id=` or `?clientId=` |
| `/api/proposals` | POST | Save/upsert proposal to Supabase |
| `/api/proposals/pdf` | GET | Generate print-ready HTML for PDF |
| `/api/admin/proposals` | POST | Generate proposal from quote data |
| `/api/admin/quotes/[id]` | GET | Fetch quote data |
| `/api/admin/quotes/[id]` | PUT | Update quote data |
| `/api/content-library` | GET | Fetch all routes for proposal generation |
| `/api/legal` | GET | Fetch legal page content from nexus.ts |

---

## 7. Proposal System

### Proposal ID Convention

Every proposal has a **deterministic ID** based on the client ID:

```
PROP-{clientId}
e.g. PROP-SM-2606-001
```

This means a client always has exactly one proposal. Regenerating the proposal updates it rather than creating a new one.

### Generation Flow

1. Go to `admin/quotes/[clientId]`
2. Enter route sequence (one route ID per line) in the Route Sequence field
3. Enter hero image URL in the Hero Image field
4. Click **Update Database** to save quote data
5. Click **Generate New Proposal** → creates/updates `PROP-{clientId}`
6. Proposal opens automatically in `?edit=true` mode
7. Use **Edit Day Details** button on each day to add practical information
8. Click **Save Day** after each day — saves to Supabase immediately
9. Use **Edit Proposal** button to return to the proposal without regenerating

### Merge Logic (Critical)

When you click **Generate New Proposal**, the system:
1. Checks if `PROP-{clientId}` already exists in Supabase
2. If existing day details are found (mealsDetail, accommodationName, activitiesDetail), they are **preserved** — the new generation does not overwrite them
3. Only the structural data (route, description, images) is refreshed

### Day Detail Fields (Edit Day Details Modal)

- **Meals** — checkboxes: Breakfast / Lunch / Dinner / Snacks
- **Dining Notes** — free text: "Lunch: La Pergola · Dinner: L'Mida"
- **Accommodation** — property name text field
- **Rooms** — number inputs for Double / Single rooms
- **Activities** — checkboxes from activity library + free text override
- **Transfer** — dropdown (Airport pickup / drop-off / Inter-city / None) + details text
- **Guide** — checkbox + language field
- **Internal Notes** — admin only, not shown to client

### Activity Library

**Culture & Architecture:**
Medina tour, Palais Bahia, Palais Badi, Dar Si Said, Medersa Ben Youssef, Dar el Bacha, Saadian Tombs, Ksar Ait Benhaddou, Kasbah des Caids

**Gardens & Art:**
Jardin Majorelle, Yves Saint Laurent Museum, Anima

**Experiences:**
Hot Air Balloon, Camel ride, Horse riding, Quad biking, Hammam & Spa, Fossil hunting, Berber music evening, Desert walk, Cooking class

---

## 8. Content Library & Routes

Routes are stored in the `routes` Supabase table and fetched via `/api/content-library`.

### Adding a New Route

```sql
INSERT INTO routes (id, from_city, to_city, route_description, proposal_description, 
                    region, image_url, travel_time_hours, difficulty_level, 
                    meals, accommodation_type)
VALUES ('ROUTE-ID', 'City A', 'City B', 'Short description', 
        'Poetic client-facing text...', 'Region', 
        'https://res.cloudinary.com/...', 3.5, 'Moderate',
        'Breakfast|Lunch', 'Kasbah');
```

### Naming Convention for Route IDs

- `STAY_{CITY}` — overnight stay, no travel
- `STAY_{CITY}_ARR` — arrival day
- `{FROM}-{TO}-{NUMBER}` — transit route (e.g. `ESS-MAR-NEW`, `DAD-MER-116`)

### Dash Problem (Important)

macOS smart punctuation converts hyphens (‐) to en-dashes (–) automatically. Route IDs use regular hyphens. The API sanitises en-dashes to hyphens on save, but if you paste route IDs manually, copy from a plain text source.

---

## 9. Admin Panel

Access at `/admin` (password protected).

### Quote Form (`/admin/quotes/[id]`)

**Left side:** Client details (name, email, phone, country, dates, travelers, interests, budget, notes)

**Right side:** Action panel with:
- **UPDATE DATABASE** — saves all form changes to Supabase
- **GENERATE NEW PROPOSAL** — creates/updates proposal with merged day data
- **EDIT PROPOSAL** — opens `PROP-{clientId}?edit=true` directly (no regeneration)
- **NEW QUOTE**
- **DELETE**

**Below client details:**
- **Hero Image** — Cloudinary URL with preview
- **Route Sequence** — one route ID per line

### Admin Proposal Edit Mode (`?edit=true`)

Each day shows:
- **EDIT DAY DETAILS** button → opens modal
- Icon row: drive time / difficulty / accommodation + rooms / meals + dining / activities / transfer / guide
- Description textarea (editable)
- Image URL field

**Admin green bar:** SAVE | PREVIEW | PRINT PDF | SEND

### Proposal Status

Currently tracked in the `status` field of the `quotes` table:
- `NEW` — inquiry received
- `IN PROGRESS` — proposal being prepared
- `SENT` — proposal sent to client
- `BOOKED` — deposit received

---

## 10. Client-Facing Proposal Page

URL: `https://www.slowmorocco.com/proposal/PROP-{clientId}`

### Page Structure

1. **Hero** — full-width image (camel/Morocco image), navigation
2. **Title** — "Ariel in Morocco" + Wharton reference
3. **Arc description** — "An 8-night journey through Morocco, crafted for Ms. Ariel Trost."
4. **Anchor nav** — Your Journey · Your Investment
5. **Itinerary** — 9 days, each with:
   - City name (large serif)
   - Day N — date (small caps)
   - Route arrow (fromCity → toCity)
   - Icon row (drive time / difficulty / accommodation · rooms / meals / activities / transfer / guide)
   - Poetic description (italic)
   - Day image
6. **What's Included** — clean list, no icons
7. **Your Investment** — €22,000 / group of 4 / €5,500 per person
8. **How It Works** — deposit, cancellation, insurance
9. **Footer links** — Booking Conditions · Cancellations & Refunds · Payments
10. **Map** — interactive Mapbox with route
11. **CTA section** — "Ready to make this journey yours?"

**Client green bar:** YES, THIS IS IT | I HAVE SOME THOUGHTS | 🖨 PDF *(far right)*

### Edith Wharton Reference

```
Based on the book by Edith Wharton, In Morocco (1920)
https://www.gutenberg.org/ebooks/39042
```

---

## 11. PDF Generation

### On-Demand API

`GET /api/proposals/pdf?id=PROP-SM-2606-001`

Returns a print-ready HTML page with:
- All Google Fonts loaded (EB Garamond)
- Print CSS (`@media print { @page { size: A4; margin: 0 } }`)
- Fixed green **Save as PDF** button (hidden when printing)
- No images, no web navigation, no admin controls

**Page structure:**
1. Cover — title, Wharton quote, client name, dates
2. Investment — price, What's Included, How It Works
3. Map — inline SVG Morocco route map
4. Days 1–9 — one page per day: Meals / Accommodation / Activities / Guide / Transfer + poetic description
5. Important Notes — accommodation disclaimer, itinerary flexibility, pricing, insurance

### Static PDF (Ariel)

A standalone ReportLab PDF was also generated:
`public/Ariel_Trost_Morocco_Proposal.pdf`

This is a backup. The preferred method going forward is the API endpoint.

### Future: True Server-Side PDF

For a proper SaaS implementation, use Puppeteer on a separate server (or Browserless.io) to convert the HTML endpoint to a real PDF file and return it as a download. This is the next major infrastructure upgrade.

---

## 12. Legal & Policies

All legal content is stored in `lib/nexus.ts` and served via `/api/legal`.

### Pages

| URL | Content |
|-----|---------|
| `/booking-conditions` | Full booking terms |
| `/cancellations-and-refunds` | Cancellation policy |
| `/payments` | Payment methods and contact |

### Cancellation Policy (Current)

- **More than 45 days before departure:** Deposit refunded in full, minus banking/PayPal fees and non-refundable supplier commitments. Holiday season bookings (Christmas) may have stricter hotel terms.
- **Less than 45 days before departure:** No refund possible.

*Note: There is NO transition period between 30–45 days. The threshold is simply 45 days.*

### Address

```
35 Derb Fhal Zfriti, Ksour, Marrakech 40000, Morocco
```
*Not Kennaria — Ksour is the correct neighbourhood.*

---

## 13. Brand & Design

### Design Principles

- **No clip art, no icons as decoration** — SVG icons are monochrome, minimal, functional only
- **No bullet points or tick/cross lists** — prose or clean unlisted items only
- **No "What's Not Included" section** — trust the client's intelligence
- **No SARL** in client-facing materials — "Slow Morocco" only
- **No aggressive CTAs** — quiet confidence, not salesmanship

### Tone of Voice (Mohammed persona)

- Direct, warm, knowledgeable
- Queen of Pentacles energy: abundant, secure, confident, kind
- No filler words ("I am happy to", "feel free to")
- No people-pleasing
- Radical transparency — nothing hidden, nothing overwhelming

### Typography

- **Display:** Cormorant Garamond (serif, large sizes)
- **Body:** EB Garamond (serif, body text, italics for descriptions)
- **UI/Labels:** Helvetica (system sans-serif for metadata, small caps, labels)

### Colour Palette

```css
--dark: #1a1a18
--muted: #888880
--border: #e0dbd0
--sand: #f5f0e8
--green: #2d5016  /* CTA bar, buttons */
```

### Literary Reference

**Edith Wharton, *In Morocco* (1920)**  
Free at: https://www.gutenberg.org/ebooks/39042

Quote used on cover/proposal:
> "From far off, through circuitous corridors, came the scent of citrus-blossom and jasmine, with sometimes a bird's song before dawn, sometimes a flute's wail at sunset, and always the call of the muezzin in the night…"

---

## 14. Known Issues & Pending Work

### Bugs

- [ ] **8-night vs 8-day** — The arc description sometimes shows "8-day" instead of "8-night". Should read: `An ${days.length - 1}-night journey...`
- [ ] **Meals order** — Meals sometimes display as "Breakfast, Dinner, Lunch" instead of "Breakfast, Lunch, Dinner". Needs sorting in the display layer.
- [ ] **Auto-save** — Day details require clicking Save Day manually. Should auto-save on change or at regular intervals.

### Pending Features

- [ ] **True server-side PDF** — Puppeteer/Browserless for real PDF download (not browser print)
- [ ] **Proposal status tracking** — Draft / Sent / Approved / Booked — visible in admin list
- [ ] **Price calculator integration** — The calculator exists but isn't connected to proposal generation
- [ ] **Per-proposal arc description editing** — The arc description is editable in localStorage but not yet saving to Supabase separately
- [ ] **Saltanat Hanif follow-up** — Inquiry from May 2026, ghosted, then re-engaged. 7 days, architecture/history focus, concerned about chaos/crowds.
- [ ] **Minor museums activity list** — Deferred: Bahia details, Badi details, Dar Si Said details
- [ ] **Route descriptions** — Many routes still have `proposal_description = null`
- [ ] **Image library** — Need systematic Cloudinary mapping for all route IDs
- [ ] **Slow Morocco SARL → Slow Morocco** — Verify no SARL references remain in any client-facing pages

### SQL Fixes Pending

```sql
-- Fix Merzouga → The Sahara in days_list
UPDATE proposals 
SET days_list = REPLACE(days_list, '"toCity": "Merzouga"', '"toCity": "The Sahara"')
WHERE proposal_id = 'PROP-SM-2606-001';

-- Fix transfer type labels
UPDATE proposals 
SET days_list = REPLACE(REPLACE(days_list,
  '"transferType": "airport_pickup"', '"transferType": "Airport pickup"'),
  '"transferType": "airport_dropoff"', '"transferType": "Airport drop-off"')
WHERE proposal_id = 'PROP-SM-2606-001';
```

---

## 15. Key Files Reference

| File | Path | Purpose |
|------|------|---------|
| Proposal page | `app/proposal/[id]/page.tsx` | Client microsite + admin edit mode |
| Admin quote page | `app/admin/quotes/[id]/page.tsx` | Quote form + proposal generation |
| Proposals API | `app/api/proposals/route.ts` | GET/POST proposals |
| PDF API | `app/api/proposals/pdf/route.ts` | Print-ready HTML generation |
| Admin proposals API | `app/api/admin/proposals/route.ts` | Proposal generation with merge logic |
| Quote API | `app/api/admin/quotes/[id]/route.ts` | GET/PUT quote data |
| Content library | `app/api/content-library/route.ts` | Route data for generation |
| Nexus | `lib/nexus.ts` | Legal pages content, company info, policies |
| Supabase client | `lib/supabase.ts` | Database types and helper functions |
| SEO schema | `components/seo/OrganizationSchema.tsx` | Company structured data |
| Next config | `next.config.js` | Redirects, rewrites |

### Static Files

| File | Path | Purpose |
|------|------|---------|
| Ariel HTML proposal | `public/ariel-proposal.html` | Static hardcoded proposal |
| Ariel PDF | `public/Ariel_Trost_Morocco_Proposal.pdf` | Static ReportLab PDF |

---

## Ariel Trost — Reference Proposal

**Client:** Dr. Ariel Trost (drarieltrost@gmail.com)  
**Quote ID:** SM-2606-001  
**Proposal ID:** PROP-SM-2606-001  
**Proposal URL:** https://www.slowmorocco.com/proposal/PROP-SM-2606-001  
**Static HTML:** https://www.slowmorocco.com/ariel-proposal.html  
**PDF:** https://www.slowmorocco.com/Ariel_Trost_Morocco_Proposal.pdf  

**Journey:** Ariel in Morocco (after Edith Wharton)  
**Dates:** December 20–28, 2026 (9 days, 8 nights)  
**Guests:** 4 (parents ~55-60, daughter 24, son 20)  
**Price:** €22,000 total / €5,500 per person  
**Route:** Essaouira → Marrakech → Agafay → Tamnougalt → The Sahara → Errachidia  

**Sent:** June 3, 2026  
**Status:** Awaiting response  

---

*This wiki is maintained by Jacqueline in collaboration with Claude. Update after each significant session.*
