import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      country,
      journeySlug,
      journeyTitle,
      amount,
      transactionId,
    } = body;

    if (!firstName || !lastName || !email || !transactionId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const ref = `JD-${Date.now()}`;
    const supabase = getSupabaseAdmin();

    const { error } = await supabase.from("journey_deposits").insert({
      deposit_ref: ref,
      first_name: firstName,
      last_name: lastName,
      email,
      country: country || "",
      journey_slug: journeySlug || "",
      journey_title: journeyTitle || "",
      amount_eur: amount || "300.00",
      transaction_id: transactionId,
      status: "paid",
    });

    if (error) {
      console.error("journey-deposit insert error:", error);
      // Payment already captured — don't fail the user; just log.
      return NextResponse.json({ ok: true, ref, warning: "record_failed" });
    }

    return NextResponse.json({ ok: true, ref });
  } catch (e) {
    console.error("journey-deposit error:", e);
    return NextResponse.json({ ok: true, warning: "exception" });
  }
}
