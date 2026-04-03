# CLAUDE.md — Slow Morocco Content & Design Pivot
## Instructions for Claude Code working in the slow-morocco repo

---

## Who You're Working For

Jacqueline Ng. Founder of Dancing with Lions, a cultural publishing operation. Slow Morocco is the first title — the definitive cultural guide to Morocco. Not a tour operator. Not a travel blog. A publisher.

Byline: **J. Ng** (never J. Laurent or other variants)

---

## The Pivot (March 2026)

The site has 236 stories, 122 places, 275 journeys. The content is deep, structured, authoritative — and Google is rewarding it with growing impressions. But the content mix is too heavy. All main courses, no starters.

The pivot: **lighten the experience without reducing the depth.** The knowledge stays. The packaging changes. The site should feel like a dinner party where the host knows everything — not a lecture hall with beautiful architecture.

Think: Monocle's editorial confidence + Afar's cultural curiosity + Kinfolk's pacing. With real knowledge underneath.

---

## The Voice: Gossip, Not Lessons

This is the single most important instruction. Every piece of content on Slow Morocco follows this voice.

### The Shift

| Museum Voice (NEVER) | Gossip Voice (ALWAYS) |
|----------------------|----------------------|
| "Morocco has a rich tradition of textile production..." | "The carpet merchant will tell you it's antique. It isn't." |
| "The medina is a UNESCO World Heritage site..." | "Bill Willis arrived for a Getty wedding in 1966 and never left." |
| "Traditional crafts are an important part..." | "Fifty thousand Moroccans earn their living selling trilobites." |
| "Morocco is known for its diverse cuisine..." | "The argument over who makes the best msemen will never be settled." |

### The Formula

1. **Tableau opening** — Drop into a scene, not a thesis. First sentence puts the reader somewhere specific.
2. **Specific facts** — Numbers, names, dates, prices, measurements. Facts deployed as gossip, not as curriculum.
3. **The pivot** — "Then came..." / "The irony is..." / "What remains is..."
4. **Quiet ending** — No mic drops. No "Morocco is truly magical." Land softly.

### Example Openings

**Good:**
- "The trilobite looks like a stone horseshoe crab, curled into a defensive ball."
- "They arrive before dawn, when the desert air is still cold."
- "She was sixteen. A Muslim man wanted to marry her. She refused."
- "Six thousand years ago, you could have canoed across the Sahara."
- "The candle weighs three kilos. The bidding starts at five hundred dirhams."

**Bad (never write these):**
- "Morocco has a long history of..."
- "The Sahara is the world's largest..."
- "Traditional Moroccan culture..."
- "In this article, we explore..."
- "Morocco is a fascinating country..."

### What the Voice Is NOT

- Not academic. Not dry. Not textbook.
- Not blogger. Not "OMG you guys, Morocco is AMAZING."
- Not Lonely Planet neutral. Not guidebook functional.
- Not promotional. No "book now," no urgency, no "limited spots."
- Not Derb 37 — that brand is intimate and sensory (what the steam smells like). Slow Morocco is the knowledgeable friend who's read everything.

---

## Content Types: The New Mix

The site currently runs almost entirely on deep cultural stories (1,500–3,000 words). The pivot introduces lighter formats alongside the heavy ones. Same voice, different weights.

### DEEP (Existing — 1,500–3,000 words)
The ksour, the Amazigh identity map, the Green March, the French Protectorate. These rank well and stay exactly as they are. This is the foundation.

### MEDIUM (New — 600–1,200 words)
The "I didn't know that" pieces. Single-fact stories that make someone feel clever about Morocco.

Examples:
- Morocco has ski resorts. Actual ski resorts.
- The oldest university in the world is in Fes — and a woman built it.
- 150,000 flowers make one kilo of saffron.
- Casablanca has a surf scene.
- The word "morocco" in leather terminology comes from Fassi tanning.
- Why Moroccans put bread on the table before anything else.

### SHORT (New — 300–500 words)
Quick, practical-with-personality pieces that answer tourist queries with the Slow Morocco voice.

Examples:
- What to order at a street stall at midnight
- The unwritten rules of the hammam nobody tells tourists
- Why the first glass of tea is always refused
- What happens when you sneeze in a Moroccan house
- The debate over who makes the best msemen
- The Friday couscous rule

### Structure in Supabase

All content types use the existing `stories` table. Differentiate by length and a new tag system if needed, but the data structure doesn't change. Slug fields are sacred — never modify slug fields or URL structures.

---

## Technical Standards

### Stack
- Next.js + Supabase + Vercel
- Mapbox for interactive maps
- Supabase URL: `https://nojpzqybdecnautfhxnz.supabase.co` (the old URL `soqcqlzerhgacdaggtch` is deleted — never reference it)

### Sacred Rules
- **Never modify slug fields or URL structures.** Only content columns.
- **Never use warm parchment/cream backgrounds** (#FAF8F5, #FDFBF7, etc.) on Slow Morocco.
- **Body text must be black** (#0a0a0a or #262626) — never gray.
- **No visible scrollbars.** Galleries and carousels use arrow navigation.
- **No fallback/placeholder images.** If there's no image, show nothing.
- **No emojis in content.** Ever.
- **No sales language.** State, don't sell.
- **Byline: "J. Ng"** — not J. Laurent or other variants.
- **SQL files:** Always exclude `*.sql` from zip archives.
- **Sitemap:** Always validate sitemap XML after deployment. `safeSitemapUrl()` exists as safety net.

### Design System (Slow Morocco)

**Typography:**
- Display: Cormorant Garamond (serif) — headlines, hero text, pull quotes
- Body: Inter (sans-serif) — paragraphs, UI, navigation
- Weights: 400, 500 for serif; 400, 500, 600 for sans

**Colors:**
- Background: `#FAF9F6` (paper white)
- Secondary background: `#F5F5F0` (cream)
- Primary text: `#1C1917` (ink)
- Secondary text: `#78716C` (stone)
- Accent: `#C2410C` (terracotta) — sparingly, for key CTAs only
- Never accent headlines. Keep display text in ink or paper.

**Layout:**
- Horizontal padding: `px-8 md:px-[8%] lg:px-[12%]` — percentage-based, scales with viewport
- Never use fixed `max-w-[1400px] mx-auto`
- Asymmetric grids, not centered
- Generous whitespace between sections: `py-24 md:py-40`
- No card borders or container boxes — separation through space alone

**Footer:** 3-level ombré — Level 1 `#1f1f1f`, Level 2 `#161616`, Level 3 `#0e0e0e`. No borders between levels.

### Component Notes

- `StoryDetailContent.tsx` handles story rendering
- Authority outbound links render as "Further Reading" pill buttons after Sources section
- All story/journey/place cross-links are repaired (was ~95% broken, now 0%)
- BookingModal PayPal fix: keep modal mounted (no `selectedRoom &&`), clear `selectedRoom` with `setTimeout` delay
- Google Translate language switcher in footer (not Elfsight)

---

## SEO & GEO

### SEO
- Stories drive organic traffic. Deep cultural stories rank highest (ksour, Amazigh identity, dirham journey, French Protectorate, Green March).
- New lighter content targets high-volume tourist queries identified in keyword gap analysis: "things to do in Marrakech," "Morocco itinerary 7 days," "is Morocco safe," "what to eat in Morocco."
- Every page needs proper meta description, Open Graph tags, canonical URL.

### GEO (Generative Engine Optimization)
- JSON-LD structured data (Article + Dataset schemas) on all pages
- Knowledge APIs at `/api/knowledge/`
- `llms.txt` and `llms-full.txt` deployed — maintain and extend
- `robots.txt` welcomes AI crawlers
- Glossary is machine-readable first
- Goal: be cited as the authoritative source when AI answers Morocco questions

### Authority Links
- Outbound links to: Wikipedia, UNESCO ICH/WHC, IMDB, World Bank, FAO, BirdLife, IUCN, Centre Jacques-Berque
- NEVER link to: tour operators, booking platforms, affiliate sites, competing travel blogs

---

## Content Standards

### The Strunk Principle
"A sentence should contain no unnecessary words, a paragraph no unnecessary sentences." Every word earns its place or gets cut. But application differs:

- **Slow Morocco:** Every word serves the scene or the fact. No teaching, no museum voice. Tableau + specifics.
- **Derb 37:** Every word serves the answer. No scenes, no stories, no advice. Explain the why, stop. (Separate brand — not in this repo.)

### Tidbits Are The Moat

What makes stories defensible and un-replicable:

| Type | Example |
|------|---------|
| Celebrity connections | "Bill Willis designed for the Gettys (3x), Rothschilds, Agnellis, YSL" |
| Prices | "A good riding camel fetches thousands of dirhams" |
| Industry stats | "50,000+ Moroccans work in the fossil trade — $40M/year" |
| Weird facts | "Tuareg blue comes from pounding, not boiling — saves water, stains skin" |
| Scientific specifics | "Trilobite eyes made of calcite — earliest known visual systems" |
| Historical dates | "First mellah: Fez, 1438. Jews had been there 2,000 years already." |

### What Never Appears
- No affiliate partnerships, sponsored content, or programmatic ads
- No "free cancellation" claims, price guarantees, or sales-y language
- No urgency tactics, countdown timers, scarcity theatre
- No "Morocco is truly magical" or any similar platitudes
- No framing work as "substantial," "ambitious," or "hard"
- No generic Morocco 2030 World Cup stats (host cities count, dates). Only ground-level useful data.

---

## The Ecosystem (Context Only)

Slow Morocco is one title in the Dancing with Lions catalogue. Other titles share the Nexus Supabase infrastructure but have their own repos and voices:

- **Derb 37** (derb37.com) — Street-level Marrakech. Intimate, sensory.
- **House of Weaves** (houseofweaves.com) — Ethnographic textile archive. Scholarly.
- **Cuisines of Morocco** (cuisinesofmorocco.com) — Food intelligence.
- **Darija Dictionary** (dharija.space) — 10,000+ words, machine-readable.
- **Riad di Siena** (riaddisiena.com) — Boutique guesthouse. Sanctuary voice.
- **Tilwen** — Moroccan rug e-commerce.
- **DWL Data Platform** (dancingwiththelions.com) — 173 intelligence modules on Africa.

Do not modify anything related to other properties unless explicitly asked.

---

## Working Style

- **Completion-oriented.** Finish everything. No half-done work.
- **Systematic batching.** SQL as ready-to-run Supabase UPDATE statements. Work in verified phases.
- **Direct commits preferred** over zip delivery.
- **Never frame work as difficult.** Just build.
- **Push back when something is wrong.** Pair every danger with a concrete circumvention.
- **Tone with Jacqueline:** Clear, to the point, with warmth. Concise but caring. Not curt.

---

*Dancing with Lions · Marrakech · March 2026*
