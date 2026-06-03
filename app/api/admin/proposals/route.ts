import { NextResponse } from "next/server";
import { getProposals, createProposal, getProposalById, supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const proposals = await getProposals();
    return NextResponse.json({ success: true, proposals });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const proposalId = data.proposalId || `PRP-${Date.now()}`;

    // Check if existing proposal has detailed day data — preserve it
    let mergedDaysList = data.daysList || [];
    try {
      const { data: existing } = await supabase
        .from("proposals")
        .select("days_list")
        .eq("proposal_id", proposalId)
        .single();

      if (existing?.days_list) {
        const existingDays = typeof existing.days_list === "string"
          ? JSON.parse(existing.days_list)
          : existing.days_list;

        // Merge: keep new route structure but preserve detailed fields
        mergedDaysList = mergedDaysList.map((newDay: any) => {
          const existingDay = existingDays.find((d: any) => d.dayNumber === newDay.dayNumber);
          if (existingDay && (existingDay.mealsDetail || existingDay.accommodationName || existingDay.activitiesDetail)) {
            return {
              ...newDay,
              mealsDetail: existingDay.mealsDetail || newDay.mealsDetail,
              accommodationName: existingDay.accommodationName || newDay.accommodationName,
              accommodationType: existingDay.accommodationType || newDay.accommodationType,
              roomConfig: existingDay.roomConfig || newDay.roomConfig,
              activitiesDetail: existingDay.activitiesDetail || newDay.activitiesDetail,
              transferType: existingDay.transferType || newDay.transferType,
              transferDetails: existingDay.transferDetails || newDay.transferDetails,
              guideIncluded: existingDay.guideIncluded || newDay.guideIncluded,
              guideLanguage: existingDay.guideLanguage || newDay.guideLanguage,
              dayNotes: existingDay.dayNotes || newDay.dayNotes,
              description: existingDay.description || newDay.description,
              imageUrl: existingDay.imageUrl || newDay.imageUrl,
            };
          }
          return newDay;
        });
      }
    } catch (e) {
      // No existing proposal — use new days as-is
    }

    const proposal = await createProposal({
      proposal_id: proposalId,
      client_id: data.clientId || "",
      client_name: data.clientName || "",
      country: data.country || "",
      hero_image_url: data.heroImageUrl || "",
      hero_title: data.heroTitle || "",
      hero_blurb: data.heroBlurb || "",
      start_date: data.startDate || "",
      end_date: data.endDate || "",
      days: data.days || "",
      nights: data.nights || "",
      num_guests: data.numGuests || "",
      total_price: data.totalPrice || "",
      formatted_price: data.formattedPrice || "",
      route_points: JSON.stringify(data.routePoints || []),
      days_list: JSON.stringify(mergedDaysList),
    });

    if (!proposal) {
      return NextResponse.json(
        { success: false, error: "Failed to create proposal" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      proposalId,
      message: "Proposal created successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
