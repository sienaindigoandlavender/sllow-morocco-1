import { NextResponse } from "next/server";
import { createJourneyInquiry } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName, lastName, email, partySize, duration,
      season, cities, pace, interests, budget, notes,
      depositAcknowledged,
    } = body;

    if (!email || !depositAcknowledged) {
      return NextResponse.json(
        { error: "Email and deposit acknowledgement are required." },
        { status: 400 }
      );
    }

    const inquiry = await createJourneyInquiry({
      first_name: firstName || null,
      last_name: lastName || null,
      email,
      party_size: partySize || null,
      duration: duration || null,
      season: season || null,
      cities: cities || null,
      pace: pace || null,
      interests: interests || null,
      budget: budget || null,
      notes: notes || null,
      deposit_acknowledged: !!depositAcknowledged,
    });

    if (!inquiry) {
      return NextResponse.json({ error: "Could not save inquiry." }, { status: 500 });
    }
    return NextResponse.json({ ok: true, id: inquiry.id });
  } catch (err) {
    console.error("journey-inquiry error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
