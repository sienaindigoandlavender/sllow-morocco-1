import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.slowmorocco.com";

export async function POST(request: Request) {
  try {
    const { proposalId, clientName, journeyTitle, proposalUrl, price, numGuests } = await request.json();

    if (!proposalId) {
      return NextResponse.json({ success: false, error: "Proposal ID required" }, { status: 400 });
    }

    const clientId = proposalId.replace("PROP-", "");
    const adminUrl = `${SITE_URL}/admin/quotes/${clientId}`;

    // Update quote status to BOOKED
    await supabase
      .from("quotes")
      .update({ status: "BOOKED", last_updated: new Date().toISOString() })
      .eq("client_id", clientId);

    // Notify admin
    if (resend && process.env.CONTACT_EMAIL) {
      const depositAmount = price
        ? `€${Math.round(parseFloat(String(price).replace(/[^0-9.]/g, "")) * 0.3).toLocaleString()}`
        : "30% of total";

      await resend.emails.send({
        from: "Slow Morocco <noreply@slowmorocco.com>",
        to: process.env.CONTACT_EMAIL,
        subject: `✓ Client approved — ${clientName} (${clientId})`,
        html: `
          <div style="font-family: Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 20px; color: #1a1a18;">
            <h2 style="font-size: 22px; font-weight: normal; margin-bottom: 8px;">${clientName} has approved their itinerary</h2>
            <p style="color: #888; margin-bottom: 24px;">${journeyTitle}</p>

            <div style="background: #f0f7f0; border-left: 4px solid #2d5016; padding: 16px 20px; margin-bottom: 24px;">
              <p style="margin: 0 0 6px; font-weight: bold; color: #2d5016;">Next steps</p>
              <p style="margin: 0; font-size: 14px; line-height: 1.8;">
                1. Review the proposal and confirm all details are final<br>
                2. Send the client a PayPal payment link for the deposit (${depositAmount})<br>
                3. Attach the booking agreement / sale contract<br>
                4. Once deposit is received, mark as Booked in the admin
              </p>
            </div>

            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
              <tr><td style="padding: 6px 0; color: #888; width: 140px;">Client</td><td style="padding: 6px 0;">${clientName}</td></tr>
              <tr><td style="padding: 6px 0; color: #888;">Journey</td><td style="padding: 6px 0;">${journeyTitle}</td></tr>
              ${price ? `<tr><td style="padding: 6px 0; color: #888;">Total price</td><td style="padding: 6px 0;">€${price}</td></tr><tr><td style="padding: 6px 0; color: #888;">Deposit due</td><td style="padding: 6px 0; font-weight: bold;">${depositAmount}</td></tr>` : ""}
              ${numGuests ? `<tr><td style="padding: 6px 0; color: #888;">Guests</td><td style="padding: 6px 0;">${numGuests}</td></tr>` : ""}
              <tr><td style="padding: 6px 0; color: #888;">Approved</td><td style="padding: 6px 0;">${new Date().toLocaleString("en-GB", { dateStyle: "long", timeStyle: "short" })}</td></tr>
            </table>

            <p>
              <a href="${adminUrl}" style="background: #1a1a18; color: #fff; padding: 10px 20px; text-decoration: none; display: inline-block; margin-right: 12px; font-size: 13px;">View Quote</a>
              <a href="${proposalUrl}?edit=true" style="background: #2d5016; color: #fff; padding: 10px 20px; text-decoration: none; display: inline-block; font-size: 13px;">View Proposal</a>
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Proposal approval error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
