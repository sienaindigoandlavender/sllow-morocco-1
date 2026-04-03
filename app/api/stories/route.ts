import { NextResponse } from 'next/server';
import { getStories } from '@/lib/supabase';

export const revalidate = 3600;

export async function GET() {
  try {
    const storiesData = await getStories({ published: true });
    
    // Only return fields needed by client components (HeroSearch, StoriesContent)
    // Excludes body, the_facts, sources, mj_prompt to reduce Supabase egress
    const stories = storiesData.map((story) => ({
      slug: story.slug,
      title: story.title,
      subtitle: story.subtitle,
      category: story.category,
      sourceType: story.source_type,
      heroImage: story.hero_image,
      heroCaption: story.hero_caption,
      excerpt: story.excerpt,
      readTime: story.read_time,
      year: story.year,
      textBy: story.text_by,
      imagesBy: story.images_by,
      tags: story.tags,
      published: story.published,
      featured: story.featured,
      order: story.sort_order,
      region: story.region,
      country: story.country,
      theme: story.theme,
      era: story.era,
    }));

    return NextResponse.json({ stories });
  } catch (error) {
    console.error('Error fetching stories:', error);
    return NextResponse.json({ stories: [], error: 'Failed to fetch stories' }, { status: 500 });
  }
}
