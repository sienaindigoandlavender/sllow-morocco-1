import { NextResponse } from "next/server";
import { getPlaces, getAllPlaceFirstImages, convertDriveUrl } from "@/lib/supabase";

export const revalidate = 3600;

export async function GET() {
  try {
    const [placesData, placeFirstImages] = await Promise.all([
      getPlaces({ published: true }),
      getAllPlaceFirstImages(),
    ]);

    // Map to API format
    const places = placesData.map((p) => {
      const img = p.hero_image || placeFirstImages[p.slug] || "";
      return {
        slug: p.slug || "",
        title: p.title || "",
        destination: p.destination || "",
        category: p.category || "",
        heroImage: img ? convertDriveUrl(img) : "",
        excerpt: p.excerpt || "",
        featured: p.featured || false,
        order: p.sort_order || 999,
      };
    });

    return NextResponse.json({
      success: true,
      places
    });
  } catch (error: any) {
    console.error("GET /api/places error:", error);
    return NextResponse.json(
      { success: false, error: error.message, places: [] },
      { status: 500 }
    );
  }
}
