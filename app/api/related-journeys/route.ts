import { NextRequest, NextResponse } from "next/server";
import { getJourneys } from "@/lib/supabase";
import { findRelatedJourneys } from "@/lib/content-matcher";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const region = searchParams.get("region") || "";
  const tags = searchParams.get("tags") || "";
  const category = searchParams.get("category") || "";
  const limit = parseInt(searchParams.get("limit") || "3");

  if (!region && !tags) {
    return NextResponse.json({ journeys: [] });
  }

  try {
    const allJourneys = await getJourneys({ published: true });

    const related = findRelatedJourneys(
      region,
      tags,
      category,
      allJourneys.map((j) => ({
        slug: j.slug,
        title: j.title,
        destinations: j.destinations || "",
        focus: j.journey_type || j.focus_type || "",
        heroImage: j.hero_image_url || "",
        duration: j.duration_days || 0,
        price: j.price_eur || 0,
      })),
      limit
    );

    return NextResponse.json({ journeys: related });
  } catch (error) {
    console.error("Error fetching related journeys:", error);
    return NextResponse.json({ journeys: [] });
  }
}
