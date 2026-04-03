// Story & Place Cross-Linker
// Scans text and wraps known entities with links to /stories/ or /places/
// Only links each term once per text block to avoid over-linking
// Chain after glossary linker in StoryBody

import Link from 'next/link';
import React from 'react';

interface LinkTarget {
  slug: string;
  type: 'story' | 'place';
}

// ═══════════════════════════════════════════════════════════════════
// STORY & PLACE KEYWORD MAP
// keyword (lowercase) → { slug, type }
// Only link entity names, historical figures, and specific places
// ═══════════════════════════════════════════════════════════════════

const crossLinkMap: Map<string, LinkTarget> = new Map([
  // ── Historical figures ──────────────────────────────────────────
  ['ibn battuta', { slug: 'the-man-who-walked-the-world', type: 'story' }],
  ['moulay ismail', { slug: 'the-builder-king', type: 'story' }],
  ['ahmad al-mansur', { slug: 'the-golden-one', type: 'story' }],
  ['al-mansur', { slug: 'the-golden-one', type: 'story' }],
  ['yusuf ibn tashfin', { slug: 'the-berber-caliphate', type: 'story' }],
  ['saint-exupéry', { slug: 'the-airmail-pilot', type: 'story' }],
  ['paul bowles', { slug: 'the-sheltering-sky', type: 'story' }],
  ['fatima al-fihri', { slug: 'the-queen-who-built-fez', type: 'story' }],
  ['thami el glaoui', { slug: 'the-pashas-betrayal', type: 'story' }],
  ['el glaoui', { slug: 'the-pashas-betrayal', type: 'story' }],
  ['leo africanus', { slug: 'the-kidnapped-geographer', type: 'story' }],
  ['delacroix', { slug: 'the-perfume-of-the-lion', type: 'story' }],
  ['matisse', { slug: 'the-color-of-light', type: 'story' }],
  ['yves saint laurent', { slug: 'the-blue-garden', type: 'story' }],
  ['bill willis', { slug: 'the-magician-from-memphis', type: 'story' }],
  ['maimonides', { slug: 'maimonides-in-fes', type: 'story' }],
  ['zaynab al-nafzawiyya', { slug: 'the-nafzawiyya', type: 'story' }],
  ['nafzawiyya', { slug: 'the-nafzawiyya', type: 'story' }],
  ['lalla solica', { slug: 'lalla-solica', type: 'story' }],
  ['mohammed v', { slug: 'the-sultans-refusal', type: 'story' }],
  ['al-idrisi', { slug: 'the-mapmaker', type: 'story' }],
  ['dihya', { slug: 'the-warrior-queen', type: 'story' }],
  ['jimi hendrix', { slug: 'the-hendrix-myth', type: 'story' }],

  // ── Monuments & landmarks ───────────────────────────────────────
  ['palais bahia', { slug: 'the-harem-geometry', type: 'story' }],
  ['bahia palace', { slug: 'the-harem-geometry', type: 'story' }],
  ['koutoubia', { slug: 'the-koutoubia-mistake', type: 'story' }],
  ['al-qarawiyyin', { slug: 'the-queen-who-built-fez', type: 'story' }],
  ['qarawiyyin', { slug: 'the-queen-who-built-fez', type: 'story' }],
  ['bou inania', { slug: 'the-thirteen-windows', type: 'story' }],
  ['volubilis', { slug: 'rome-north-africa', type: 'story' }],
  ['hassan tower', { slug: 'the-unfinished-tower', type: 'story' }],
  ['saadian tombs', { slug: 'the-sugar-kings-grave', type: 'story' }],
  ['el badi', { slug: 'the-palace-of-revenge', type: 'story' }],
  ['el badi palace', { slug: 'the-palace-of-revenge', type: 'story' }],
  ['majorelle garden', { slug: 'the-blue-garden', type: 'story' }],
  ['jardin majorelle', { slug: 'the-blue-garden', type: 'story' }],
  ['dar al-magana', { slug: 'the-thirteen-windows', type: 'story' }],

  // ── Places (link to /places/) ───────────────────────────────────
  ['chefchaouen', { slug: 'chefchaouen', type: 'place' }],
  ['essaouira', { slug: 'essaouira', type: 'place' }],
  ['ouarzazate', { slug: 'ouarzazate', type: 'place' }],
  ['aït benhaddou', { slug: 'ait-benhaddou', type: 'place' }],
  ['ait benhaddou', { slug: 'ait-benhaddou', type: 'place' }],
  ['todra gorge', { slug: 'todra-gorge', type: 'place' }],
  ['dades gorge', { slug: 'dades-gorge', type: 'place' }],
  ['erg chebbi', { slug: 'erg-chebbi', type: 'place' }],
  ['merzouga', { slug: 'merzouga', type: 'place' }],
  ['tangier', { slug: 'tangier', type: 'place' }],
  ['meknes', { slug: 'meknes', type: 'place' }],
  ['rabat', { slug: 'rabat', type: 'place' }],
  ['casablanca', { slug: 'casablanca', type: 'place' }],
  ['tamegroute', { slug: 'tamegroute', type: 'place' }],
  ['taliouine', { slug: 'taliouine', type: 'place' }],
  ['taghazout', { slug: 'taghazout', type: 'place' }],
  ['moulay idriss', { slug: 'moulay-idriss', type: 'place' }],
  ['ifrane', { slug: 'ifrane', type: 'place' }],
  ['taroudant', { slug: 'taroudant', type: 'place' }],
  ['sidi kaouki', { slug: 'sidi-kaouki', type: 'place' }],

  // ── Cultural concepts (link to stories) ─────────────────────────
  ['gnawa', { slug: 'the-gnawa', type: 'story' }],
  ['tbourida', { slug: 'the-gunpowder-ballet', type: 'story' }],
  ['fantasia', { slug: 'the-gunpowder-ballet', type: 'story' }],
  ['almoravid', { slug: 'the-berber-caliphate', type: 'story' }],
  ['almoravids', { slug: 'the-berber-caliphate', type: 'story' }],
  ['almohad', { slug: 'almohad-atlas', type: 'story' }],
  ['almohads', { slug: 'almohad-atlas', type: 'story' }],
  ['marinid', { slug: 'the-golden-madrasas', type: 'story' }],
  ['marinids', { slug: 'the-golden-madrasas', type: 'story' }],
  ['saadian', { slug: 'the-golden-one', type: 'story' }],
  ['saadians', { slug: 'the-golden-one', type: 'story' }],
  ['green march', { slug: 'the-green-march', type: 'story' }],
  ['reconquista', { slug: 'reconquista-exodus', type: 'story' }],
  ['transhumance', { slug: 'the-transhumance', type: 'story' }],
  ['french protectorate', { slug: 'french-protectorate', type: 'story' }],
  ['ras el hanout', { slug: 'moroccan-spice-guide', type: 'story' }],
  ['beni ourain', { slug: 'carpet-atlas', type: 'story' }],
  ['moucharabieh', { slug: 'shadow-of-the-moucharabieh', type: 'story' }],

  // ── Systems & nature ────────────────────────────────────────────
  ['khettara', { slug: 'the-khettara', type: 'story' }],
  ['khettaras', { slug: 'the-khettara', type: 'story' }],
  ['argan oil', { slug: 'argan-triangle', type: 'story' }],
  ['argan tree', { slug: 'argan-triangle', type: 'story' }],
  ['argan trees', { slug: 'argan-triangle', type: 'story' }],
  ['phosphate', { slug: 'morocco-phosphate-mining', type: 'story' }],
  ['ocp', { slug: 'morocco-phosphate-mining', type: 'story' }],
  ['tanger med', { slug: 'port-strategy', type: 'story' }],
  ['noor ouarzazate', { slug: 'solar-compass', type: 'story' }],
  ['al boraq', { slug: 'tgv-rail-network', type: 'story' }],
]);

// Sort terms by length (longest first) to prevent partial matches
const sortedTerms = Array.from(crossLinkMap.keys()).sort((a, b) => b.length - a.length);

// Build a combined regex — word-boundary matching, case-insensitive
const crossLinkRegex = new RegExp(
  `\\b(${sortedTerms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`,
  'gi'
);

/**
 * Links story/place cross-references in plain text
 * Returns React nodes with <Link> elements
 * Only links each target once per call
 */
export function linkCrossReferences(text: string, currentSlug?: string): React.ReactNode {
  if (!text || text.length < 3) return text;

  const linked = new Set<string>(); // track which slugs we've already linked
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  // Reset regex state
  crossLinkRegex.lastIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = crossLinkRegex.exec(text)) !== null) {
    const term = match[0];
    const target = crossLinkMap.get(term.toLowerCase());
    if (!target) continue;

    // Skip if this links to the current story (no self-links)
    if (currentSlug && target.slug === currentSlug) continue;

    // Skip if we already linked this target
    if (linked.has(target.slug)) continue;

    linked.add(target.slug);

    // Add text before match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    // Add linked term
    const href = target.type === 'story' ? `/stories/${target.slug}` : `/places/${target.slug}`;
    parts.push(
      <Link
        key={`xlink-${match.index}`}
        href={href}
        className="underline decoration-foreground/20 underline-offset-2 hover:decoration-foreground/50 transition-colors"
      >
        {term}
      </Link>
    );

    lastIndex = match.index + term.length;
  }

  if (parts.length === 0) return text;

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts}</>;
}

/**
 * Links story/place cross-references in HTML string
 * Returns HTML string with <a> tags
 * Only links each target once per call
 */
export function linkCrossReferencesHTML(html: string, currentSlug?: string): string {
  if (!html) return html;

  const linked = new Set<string>();
  const parts = html.split(/(<[^>]+>)/);

  let inAnchor = false;
  let inHeading = false;

  const processed = parts.map(part => {
    if (part.startsWith('<')) {
      const lp = part.toLowerCase();
      if (lp.startsWith('<a ') || lp === '<a>') inAnchor = true;
      if (lp.startsWith('</a')) inAnchor = false;
      if (lp.match(/^<h[1-6]/)) inHeading = true;
      if (lp.match(/^<\/h[1-6]/)) inHeading = false;
      return part;
    }

    if (inAnchor || inHeading) return part;

    // Reset regex for each text node
    const regex = new RegExp(crossLinkRegex.source, 'gi');
    return part.replace(regex, (match) => {
      const target = crossLinkMap.get(match.toLowerCase());
      if (!target) return match;
      if (currentSlug && target.slug === currentSlug) return match;
      if (linked.has(target.slug)) return match;
      linked.add(target.slug);
      const href = target.type === 'story' ? `/stories/${target.slug}` : `/places/${target.slug}`;
      return `<a href="${href}" class="underline decoration-foreground/20 underline-offset-2 hover:decoration-foreground/50 transition-colors">${match}</a>`;
    });
  });

  return processed.join('');
}
