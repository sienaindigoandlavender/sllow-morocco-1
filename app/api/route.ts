import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.slowmorocco.com";

export async function POST(request: Request) {
  try {
    const { proposalId, clientName, journeyTitle, feedback, proposalUrl } = await request.json();

    if (!proposalId || !feedback?.trim()) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const clientId = proposalId.replace("PROP-", "");
    const adminUrl = `${SITE_URL}/admin/quotes/${clientId}`;
    const editUrl = `${SITE_URL}/proposal/${proposalId}?edit=true`;

    // Update quote status back to IN_PROGRESS
    await supabase
      .from("quotes")
      .update({ status: "IN_PROGRESS", last_updated: new Date().toISOString() })
      .eq("client_id", clientId);

    // Notify admin
    if (resend && process.env.CONTACT_EMAIL) {
      await resend.emails.send({
        from: "Slow Morocco <noreply@slowmorocco.com>",
        to: process.env.CONTACT_EMAIL,
        subject: `✎ Revision request — ${clientName} (${clientId})`,
        html: `
          <div style="font-family: Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 20px; color: #1a1a18;">
            <h2 style="font-size: 22px; font-weight: normal; margin-bottom: 8px;">${clientName} has some thoughts</h2>
            <p style="color: #888; margin-bottom: 24px;">${journeyTitle}</p>

            <div style="background: #f9f7f4; border-left: 4px solid #1a1a18; padding: 20px 24px; margin-bottom: 24px; font-family: Georgia, serif; font-style: italic; font-size: 15px; line-height: 1.8; color: #333;">
              ${feedback.replace(/\n/g, "<br>")}
            </div>

            <p style="font-size: 13px; color: #888; margin-bottom: 24px;">
              Submitted ${new Date().toLocaleString("en-GB", { dateStyle: "long", timeStyle: "short" })}
            </p>

            <p>
              <a href="${adminUrl}" style="background: #1a1a18; color: #fff; padding: 10px 20px; text-decoration: none; display: inline-block; margin-right: 12px; font-size: 13px;">View Quote</a>
              <a href="${editUrl}" style="background: #2d5016; color: #fff; padding: 10px 20px; text-decoration: none; display: inline-block; font-size: 13px;">Edit Proposal</a>
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Proposal feedback error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
