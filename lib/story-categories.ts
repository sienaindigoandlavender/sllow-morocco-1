/* ═══════════════════════════════════════════════════════════════
   STORY CATEGORIES

   Single source of truth, used by:
   - /stories/category/[slug]  (the landing pages)
   - /stories                  (the browse index)
   - sitemap.ts                (which ones get submitted)

   `label` must match the value stored in stories.category exactly.

   A category with fewer than MIN_FOR_INDEX stories still gets a
   working page, but it is noindex and stays out of the sitemap.
   ═══════════════════════════════════════════════════════════════ */

export interface StoryCategory {
  slug: string;
  label: string;
  description: string;
}

export const MIN_FOR_INDEX = 3;

export const STORY_CATEGORIES: StoryCategory[] = [
  { slug: "history", label: "History", description: "A thousand years of dynasties, trade routes, and the slow accumulation of identity. Morocco's past is not behind it — it is the texture of its present." },
  { slug: "architecture", label: "Architecture", description: "Zellige, pisé, cedar, stucco. The geometry of Moroccan space — from the medina's logic to the kasbah's slow return to earth." },
  { slug: "culture", label: "Culture", description: "Ritual, language, hospitality, ceremony. The practices that hold a society together and reveal themselves only to those who stay long enough." },
  { slug: "people", label: "People", description: "The artisans, nomads, musicians, and farmers who make Morocco what it is. Stories about individuals, not archetypes." },
  { slug: "systems", label: "Systems", description: "Water engineering, trade networks, caravan routes, agricultural cycles. How Morocco has organised itself to survive and thrive." },
  { slug: "food", label: "Food", description: "Couscous, saffron, preserved lemons, argan oil. The ingredients and rituals that make Moroccan cuisine one of the world's great culinary traditions." },
  { slug: "nature", label: "Nature", description: "Atlas cedar forests, Saharan dunes, Atlantic coastline, endemic species. The landscapes that contain everything else." },
  { slug: "art", label: "Art", description: "From the painters who came to Morocco and rewrote European colour theory to the artisans whose geometric patterns encode a worldview." },
  { slug: "design", label: "Design", description: "The moucharabieh, the hammam, the souk — Moroccan design as a solution to climate, privacy, and community." },
  { slug: "music", label: "Music", description: "Gnawa trance, Andalusian classical, Aita, chaabi. The musical traditions that carry history in their rhythms." },
  { slug: "craft", label: "Craft", description: "Leather tanning, carpet weaving, brass-working, pottery. The trades passed hand to hand across generations." },
  { slug: "movies", label: "Movies", description: "Morocco as set, subject, and backdrop. The films made here and the industry that grew from the light." },
  { slug: "sacred", label: "Sacred", description: "Sufi brotherhoods, moussem pilgrimages, Jewish shrines, and the spiritual geography of a country that takes religion seriously." },
  { slug: "wildlife", label: "Wildlife", description: "Barbary macaques, flamingos, migratory raptors, and the endangered species that still find refuge in Morocco's varied landscapes." },
  { slug: "knowledge", label: "Knowledge", description: "The libraries, the scholars, the transmission of learning across the medieval Mediterranean world." },
  { slug: "economy", label: "Economy", description: "Phosphate, argan, tourism, remittances, rail. The forces shaping modern Morocco and its place in the world." },
  { slug: "before-you-go", label: "Before You Go", description: "The things you wish someone had told you before you landed. Practical, honest, written by someone who lives here." },
];

export const STORY_CATEGORY_BY_SLUG: Record<string, StoryCategory> =
  Object.fromEntries(STORY_CATEGORIES.map((c) => [c.slug, c]));

/** Legacy shape for the existing category route. */
export const STORY_CATEGORY_MAP: Record<string, { label: string; description: string }> =
  Object.fromEntries(
    STORY_CATEGORIES.map((c) => [c.slug, { label: c.label, description: c.description }]),
  );

/** Turn a stored category value into its route slug. */
export function storyCategorySlug(label: string | null | undefined): string | null {
  if (!label) return null;
  const found = STORY_CATEGORIES.find(
    (c) => c.label.toLowerCase() === label.toLowerCase(),
  );
  return found ? found.slug : null;
}
