// lib/story-view.ts
//
// Single source of truth for the *mapped* Story shape that presentation
// components consume (camelCase, optional). The raw database row type lives
// in lib/supabase.ts as `Story` (snake_case, nullable) — that stays as-is,
// because it mirrors the actual columns.
//
// The point of this file: add a field ONCE here and in mapStory(), and every
// consumer of the detail view gets it — no more hunting down duplicate local
// `interface Story` declarations. This is what would have prevented the
// pull_quote red build.
//
// Listing/card components keep their own narrow interfaces on purpose: a card
// reads slug/title/heroImage/excerpt and nothing else, so it is not part of
// this shape and never needs the rich fields.

import type { Story } from "@/lib/supabase";

export interface StoryView {
  // Always present
  slug: string;
  title: string;
  // Everything else optional — a story may or may not carry it
  subtitle?: string;
  category?: string;
  sourceType?: string;
  heroImage?: string;
  heroImageAlt?: string;
  heroCaption?: string;
  excerpt?: string;
  body?: string;
  readTime?: string;
  year?: string;
  textBy?: string;
  imagesBy?: string;
  sources?: string;
  the_facts?: string;
  tags?: string;
  region?: string;
  country?: string;
  era?: string;
  theme?: string;
  embedUrl?: string;
  journeyBridge?: string;
  pullQuote?: string;
  pullQuotePosition?: number;
}

// Map a raw database row (snake_case, nullable) to the camelCase view model.
// Add new fields here and to StoryView above — that is the only place a new
// detail-view field needs to be wired.
export function mapStory(row: Story): StoryView {
  return {
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle ?? undefined,
    category: row.category ?? undefined,
    sourceType: row.source_type ?? undefined,
    heroImage: row.hero_image ?? undefined,
    heroImageAlt: row.hero_image_alt ?? undefined,
    heroCaption: row.hero_caption ?? undefined,
    excerpt: row.excerpt ?? undefined,
    // Normalise <br> variants to newlines so the body renderer splits cleanly
    body: row.body ? row.body.replace(/<br\s*\/?>/gi, "\n") : undefined,
    readTime: row.read_time != null ? String(row.read_time) : undefined,
    year: row.year != null ? String(row.year) : undefined,
    textBy: row.text_by ?? undefined,
    imagesBy: row.images_by ?? undefined,
    sources: row.sources ?? undefined,
    the_facts: row.the_facts ?? undefined,
    tags: row.tags ?? undefined,
    region: row.region ?? undefined,
    country: row.country ?? undefined,
    era: row.era ?? undefined,
    theme: row.theme ?? undefined,
    embedUrl: row.embed_url ?? undefined,
    journeyBridge: row.journey_bridge ?? undefined,
    pullQuote: row.pull_quote ?? undefined,
    pullQuotePosition: row.pull_quote_position ?? undefined,
  };
}
