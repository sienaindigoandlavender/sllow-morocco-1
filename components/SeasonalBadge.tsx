'use client';

import { useEffect, useState } from 'react';

interface SeasonalBadgeProps {
  bestTimeToVisit?: string | null;
  category?: string | null;
  region?: string | null;
  variant?: 'place' | 'story';
}

// Morocco seasonal intelligence
const SEASONAL_DATA: Record<string, { months: number[]; note: string }[]> = {
  // Place-level seasonal intelligence
  place: [
    { months: [3, 4, 5], note: 'Spring — wildflowers across the Atlas, ideal visiting conditions' },
    { months: [6, 7, 8], note: 'Summer — early morning or late afternoon visits recommended' },
    { months: [9, 10, 11], note: 'Autumn — harvest season, mild light, fewer visitors' },
    { months: [12, 1, 2], note: 'Winter — snow on the Atlas, clear skies in the south' },
  ],
  // Story-level — wildlife/nature seasonal hooks
  wildlife: [
    { months: [2, 3], note: 'Storks arriving from West Africa. Breeding pairs returning to Chellah, El Badi.' },
    { months: [4, 5, 6], note: 'Breeding season. Nesting across Morocco\'s historic monuments.' },
    { months: [9, 10], note: 'Southbound migration. 150,000+ storks funneling through Gibraltar.' },
    { months: [11, 12, 1], note: 'Overwintering. ~30% of Morocco\'s storks stay year-round.' },
  ],
  nature: [
    { months: [3, 4], note: 'Spring bloom. The High Atlas valleys fill with almond and cherry blossom.' },
    { months: [5, 6], note: 'Rose harvest in the Dadès Valley. Saffron flowers in Taliouine.' },
    { months: [9, 10], note: 'Date harvest in the Draa and Ziz valleys. Oasis season.' },
    { months: [11, 12, 1, 2], note: 'Snow season. The Atlas above 2,500m is white. Skiing at Oukaïmeden.' },
  ],
  history: [
    { months: [3, 4, 5, 9, 10, 11], note: 'Shoulder season — the best light for ruins, medinas, and architecture.' },
  ],
  food: [
    { months: [12, 1, 2], note: 'Orange season. Citrus from the Souss at its peak.' },
    { months: [6, 7], note: 'Fig and melon season. Street carts heavy with summer fruit.' },
    { months: [9, 10], note: 'Pomegranate and date harvest. Olive pressing begins in November.' },
  ],
};

function getSeasonalNote(
  bestTimeToVisit: string | null | undefined,
  category: string | null | undefined,
  variant: 'place' | 'story'
): string | null {
  const now = new Date();
  const month = now.getMonth() + 1; // 1-12

  // If place has best_time_to_visit, check if current month matches
  if (bestTimeToVisit && variant === 'place') {
    const lower = bestTimeToVisit.toLowerCase();
    const seasons: Record<string, number[]> = {
      spring: [3, 4, 5],
      summer: [6, 7, 8],
      autumn: [9, 10, 11],
      fall: [9, 10, 11],
      winter: [12, 1, 2],
      'year-round': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    };

    for (const [season, months] of Object.entries(seasons)) {
      if (lower.includes(season) && months.includes(month)) {
        return 'You\'re visiting in the recommended season.';
      }
    }
  }

  // Category-based seasonal notes for stories
  if (variant === 'story' && category) {
    const cat = category.toLowerCase();
    const pool = SEASONAL_DATA[cat] || SEASONAL_DATA.place;
    const match = pool.find((s) => s.months.includes(month));
    if (match) return match.note;
  }

  // Default seasonal note for places
  if (variant === 'place') {
    const pool = SEASONAL_DATA.place;
    const match = pool.find((s) => s.months.includes(month));
    if (match) return match.note;
  }

  return null;
}

export default function SeasonalBadge({
  bestTimeToVisit,
  category,
  region,
  variant = 'place',
}: SeasonalBadgeProps) {
  const [note, setNote] = useState<string | null>(null);
  const [moroccoTime, setMoroccoTime] = useState<string>('');

  useEffect(() => {
    const seasonal = getSeasonalNote(bestTimeToVisit, category, variant);
    setNote(seasonal);

    // Morocco time (Africa/Casablanca)
    try {
      const time = new Date().toLocaleTimeString('en-GB', {
        timeZone: 'Africa/Casablanca',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      setMoroccoTime(time);
    } catch {
      // Fallback
      setMoroccoTime('');
    }
  }, [bestTimeToVisit, category, variant]);

  if (!note && !moroccoTime) return null;

  return (
    <div className="flex items-center gap-4 text-[11px] tracking-[0.08em] text-muted-foreground/70">
      {moroccoTime && variant === 'place' && (
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600/60 animate-pulse" />
          Morocco {moroccoTime}
        </span>
      )}
      {note && (
        <span className="italic">{note}</span>
      )}
    </div>
  );
}
