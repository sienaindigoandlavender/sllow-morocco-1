import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function GET() {
  try {
    // Fetch stories — lightweight, no body
    const { data: stories } = await getSupabase()
      .from('stories')
      .select('slug, title, subtitle, category, excerpt, tags, region, theme, era, the_facts')
      .eq('published', true)
      .order('sort_order', { ascending: true })
      .limit(500);

    // Journeys intentionally excluded from on-site search — the free route
    // itineraries are reachable by direct link only, not surfaced in search.
    const journeys: any[] = [];

    // Fetch places — lightweight
    const { data: places } = await getSupabase()
      .from('places')
      .select('slug, title, destination, category, excerpt, region')
      .eq('published', true)
      .order('title', { ascending: true })
      .limit(500);

    // City hubs. "Marrakech guide" is a far bigger query than any single
    // place, so these belong in search as much as in the sitemap.
    const { data: destinations } = await getSupabase()
      .from('destinations')
      .select('slug, title, subtitle, excerpt, region')
      .eq('published', true)
      .order('sort_order', { ascending: true })
      .limit(200);

    return NextResponse.json({
      stories: stories || [],
      journeys: journeys || [],
      places: places || [],
      destinations: destinations || [],
    });
  } catch (error) {
    console.error('Search index error:', error);
    return NextResponse.json({ stories: [], journeys: [], places: [], destinations: [] }, { status: 500 });
  }
}
