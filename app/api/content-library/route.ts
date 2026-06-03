import { NextResponse } from "next/server";
import { getRoutes, convertDriveUrl } from "@/lib/supabase";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const routes = await getRoutes();

    const contentBlocks = routes.map((row, index) => ({
      id: row.id || `content-${index}`,
      cityName: row.to_city || row.from_city || "",
      dayTitle: row.day_title || "",
      description: row.proposal_description || row.route_description || "",
      imageUrl: convertDriveUrl(row.image_url || ""),
      heroImageUrl: convertDriveUrl(row.hero_image_url || ""),
      heroTitle: row.hero_title || "",
      heroBlurb: row.hero_blurb || "",
      region: row.region || "",
      subRegion: row.sub_region || "",
      fromCity: row.from_city || "",
      toCity: row.to_city || "",
      travelTime: row.travel_time_hours ? `${row.travel_time_hours}h drive` : "",
      difficulty: row.difficulty_level || "",
      accommodationType: row.accommodation_type || "",
      meals: row.meals ? row.meals.replace(/\|/g, ', ') : "",
    }));

    const validBlocks = contentBlocks.filter(
      (block) =>
        block.cityName || block.dayTitle || block.description ||
        block.heroTitle || block.heroBlurb || block.heroImageUrl
    );

    return NextResponse.json({
      success: true,
      contentBlocks: validBlocks,
      debug: {
        totalRows: routes.length,
        validBlocks: validBlocks.length,
      },
    });
  } catch (error: any) {
    console.error("Content Library fetch error:", error);
    return NextResponse.json(
      { success: false, error: error.message, contentBlocks: [] },
      { status: 500 }
    );
  }
}
