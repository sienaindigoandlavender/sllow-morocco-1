import { NextResponse } from "next/server";
import { getProposalById, supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const proposalId = url.searchParams.get("id");
    const clientId = url.searchParams.get("clientId");

    if (!proposalId && !clientId) {
      return NextResponse.json(
        { success: false, error: "Proposal ID or Client ID required" },
        { status: 400 }
      );
    }

    let proposal;
    if (clientId) {
      // Look up most recent proposal for this client
      const { data, error } = await supabase
        .from("proposals")
        .select("*")
        .eq("client_id", clientId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();
      if (error || !data) {
        return NextResponse.json({ success: false, error: "No proposal found for client" }, { status: 404 });
      }
      proposal = data;
    } else {
      proposal = await getProposalById(proposalId!);
    }

    if (!proposal) {
      return NextResponse.json(
        { success: false, error: "Proposal not found" },
        { status: 404 }
      );
    }

    // Parse JSON fields
    let routePoints = [];
    let daysList = [];

    try {
      routePoints =
        typeof proposal.route_points === "string"
          ? JSON.parse(proposal.route_points)
          : proposal.route_points || [];
    } catch (e) {
      console.warn("Failed to parse routePoints:", e);
    }

    try {
      daysList =
        typeof proposal.days_list === "string"
          ? JSON.parse(proposal.days_list)
          : proposal.days_list || [];
    } catch (e) {
      console.warn("Failed to parse daysList:", e);
    }

    const transformedProposal = {
      id: proposal.proposal_id,
      journeyTitle: proposal.hero_title || "Your Morocco Journey",
      arcDescription: proposal.hero_blurb || "",
      clientName: proposal.client_name || "",
      heroImage: proposal.hero_image_url || "",
      price: proposal.formatted_price || proposal.total_price || "",
      numGuests: proposal.num_guests || 2,
      startDate: proposal.start_date || "",
      endDate: proposal.end_date || "",
      routePoints: routePoints,
      days: daysList.map((day: any) => ({
        dayNumber: day.dayNumber || 1,
        date: day.date || "",
        title: day.toCity || day.title || `Day ${day.dayNumber}`,
        fromCity: day.fromCity || "",
        toCity: day.toCity || "",
        description: day.description || "",
        imageUrl: day.imageUrl || "",
        durationHours: day.durationHours || "",
        activities: day.activities || "",
        activitiesDetail: day.activitiesDetail || "",
        difficultyLevel: day.difficultyLevel || "",
        meals: day.meals || "",
        mealsDetail: day.mealsDetail || "",
        accommodationType: day.accommodationType || "",
        accommodationName: day.accommodationName || "",
        roomConfig: day.roomConfig || "",
        guideIncluded: day.guideIncluded || false,
        guideLanguage: day.guideLanguage || "",
        transferType: day.transferType || "",
        transferDetails: day.transferDetails || "",
        dayNotes: day.dayNotes || "",
      })),
    };

    return NextResponse.json({ success: true, proposal: transformedProposal });
  } catch (error: any) {
    console.error("Error fetching proposal:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      proposalId, clientId, formattedPrice, daysList,
      heroTitle, heroBlurb, heroImageUrl, numGuests,
      startDate, endDate,
    } = body;

    if (!proposalId) {
      return NextResponse.json({ success: false, error: "proposalId required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("proposals")
      .upsert({
        proposal_id: proposalId,
        client_id: clientId || null,
        hero_title: heroTitle || "",
        hero_blurb: heroBlurb || "",
        hero_image_url: heroImageUrl || "",
        formatted_price: formattedPrice || "",
        total_price: formattedPrice || "",
        num_guests: numGuests || "4",
        start_date: startDate || "",
        end_date: endDate || "",
        days_list: JSON.stringify(daysList || []),
        created_at: new Date().toISOString(),
      }, { onConflict: "proposal_id" });

    if (error) {
      console.error("Supabase upsert error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, proposalId });
  } catch (error: any) {
    console.error("Error saving proposal:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
