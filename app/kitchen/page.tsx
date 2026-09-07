import type { Metadata } from "next";
import { getStories, getPlaces } from "@/lib/supabase";
import KitchenContent from "./KitchenContent";

/* ═══════════════════════════════════════════════════════════════
   /kitchen — the nursery for The Food of Morocco

   NOT PUBLIC. Three locks, because one is never enough:
     1. robots: noindex, nofollow in the metadata below
     2. Disallow /kitchen in public/robots.txt
     3. absent from app/sitemap.ts and from every internal link

   Nothing here is a finished page. It is a working surface that
   shows what the archive already holds, grouped the way a reader
   eats rather than the way the database stores it, so the gaps are
   visible at a glance.
   ═══════════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: "Kitchen",
  robots: { index: false, follow: false, nocache: true },
};

export const revalidate = 300;

/* The sections. Indexed to the moment somebody is eating, not to
   the theme a researcher would file it under. Keywords are matched
   against title, subtitle, excerpt and tags. */
const SECTIONS: { key: string; label: string; note: string; match: RegExp }[] = [
  {
    key: "morning",
    label: "Morning",
    note: "What is on the table before anything else happens.",
    match: /breakfast|msemen|baghrir|amlou|harcha|bread|khobz|ferran|oven|olive oil|argan|honey|butter|smen/i,
  },
  {
    key: "street",
    label: "The street",
    note: "Eaten standing up, or carried home in paper.",
    match: /street|souk|grill|sardine|snail|babbouche|tanjia|maakouda|sfenj|brochette|stall|market|fish/i,
  },
  {
    key: "table",
    label: "The table",
    note: "The meal itself, and the vessels it arrives in.",
    match: /tagine|tajine|couscous|harira|pastilla|bastilla|rfissa|mechoui|mrouzia|khlii|lamb|chicken|salad|friday/i,
  },
  {
    key: "sweet",
    label: "Sweet things",
    note: "Between meals, and at the end of them.",
    match: /pastr|sweet|chebakia|kaab|briouat|sellou|dessert|dates?|almond|sesame|halwa|cake/i,
  },
  {
    key: "drink",
    label: "What to drink",
    note: "Tea, coffee, and everything poured from height.",
    match: /tea|mint|drink|coffee|café|juice|water|khettara|nous nous|orange/i,
  },
  {
    key: "pantry",
    label: "The pantry",
    note: "Ingredients, and where they come from.",
    match: /spice|saffron|ras el hanout|preserved lemon|cumin|olive|salt|rose|orange blossom|herb|argan|date palm|oasis/i,
  },
];

function haystack(r: any) {
  return [r.title, r.subtitle, r.excerpt, r.category, r.tags]
    .filter(Boolean)
    .join(" ");
}

export default async function KitchenPage() {
  const [stories, places] = await Promise.all([
    getStories({ published: true }),
    getPlaces({ published: true }),
  ]);

  const sections = SECTIONS.map((s) => ({
    key: s.key,
    label: s.label,
    note: s.note,
    stories: (stories as any[])
      .filter((r) => s.match.test(haystack(r)))
      .map((r) => ({
        slug: r.slug,
        title: r.title,
        subtitle: r.subtitle || r.excerpt || "",
        category: r.category || "",
        readTime: r.read_time ?? null,
      }))
      .sort((a, b) => a.title.localeCompare(b.title)),
    places: (places as any[])
      .filter((r) => s.match.test(haystack(r)))
      .map((r) => ({
        slug: r.slug,
        title: r.title,
        destination: r.destination || "",
      }))
      .sort((a, b) => a.title.localeCompare(b.title)),
  }));

  // Anything food-shaped that no section claimed. These are the
  // entries whose section has not been decided yet.
  const foodish = /food|eat|cook|kitchen|recipe|dish|cuisine|meal/i;
  const claimed = new Set(sections.flatMap((s) => s.stories.map((x) => x.slug)));
  const unfiled = (stories as any[])
    .filter((r) => foodish.test(haystack(r)) && !claimed.has(r.slug))
    .map((r) => ({ slug: r.slug, title: r.title }))
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <KitchenContent
      sections={sections}
      unfiled={unfiled}
      totalStories={stories.length}
      totalPlaces={places.length}
    />
  );
}
