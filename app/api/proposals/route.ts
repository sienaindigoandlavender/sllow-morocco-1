import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.slowmorocco.com";
const BROWSERLESS_TOKEN = process.env.BROWSERLESS_TOKEN;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const proposalId = searchParams.get("id");

  if (!proposalId) {
    return NextResponse.json({ error: "Proposal ID required" }, { status: 400 });
  }

  // If no Browserless token, redirect to the browser-print HTML page
  if (!BROWSERLESS_TOKEN) {
    return NextResponse.redirect(`${SITE_URL}/api/proposals/pdf?id=${proposalId}`);
  }

  try {
    const sourceUrl = `${SITE_URL}/api/proposals/pdf?id=${proposalId}`;

    const response = await fetch(
      `https://production-sfo.browserless.io/pdf?token=${BROWSERLESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: sourceUrl,
          options: {
            format: "A4",
            printBackground: true,
            margin: { top: "0", right: "0", bottom: "0", left: "0" },
            scale: 1,
          },
          gotoOptions: {
            waitUntil: "networkidle2",
            timeout: 25000,
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Browserless error:", err);
      // Fallback to browser-print page
      return NextResponse.redirect(`${SITE_URL}/api/proposals/pdf?id=${proposalId}`);
    }

    const pdfBuffer = await response.arrayBuffer();
    const filename = `${proposalId}-Slow-Morocco.pdf`;

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": String(pdfBuffer.byteLength),
      },
    });
  } catch (error: any) {
    console.error("PDF download error:", error);
    // Fallback to browser-print page
    return NextResponse.redirect(`${SITE_URL}/api/proposals/pdf?id=${proposalId}`);
  }
}
