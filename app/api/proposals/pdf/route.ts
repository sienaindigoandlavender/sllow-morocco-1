import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const proposalId = url.searchParams.get("id");

    if (!proposalId) {
      return NextResponse.json({ error: "Proposal ID required" }, { status: 400 });
    }

    const { data: proposal, error } = await supabase
      .from("proposals")
      .select("*")
      .eq("proposal_id", proposalId)
      .single();

    if (error || !proposal) {
      return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
    }

    let days: any[] = [];
    try {
      days = typeof proposal.days_list === "string"
        ? JSON.parse(proposal.days_list)
        : proposal.days_list || [];
    } catch (e) { days = []; }

    const html = buildPdfHtml(proposal, days);

    return new NextResponse(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function buildPdfHtml(proposal: any, days: any[]): string {
  const clientName = proposal.client_name || "Guest";
  const price = proposal.formatted_price || proposal.total_price || "22000";
  const numGuests = parseInt(proposal.num_guests || "4");
  const priceNum = parseInt(String(price).replace(/,/g, ""));
  const perPerson = Math.round(priceNum / numGuests).toLocaleString();
  const priceFormatted = priceNum.toLocaleString();

  const formatDate = (d: string) => {
    if (!d) return "";
    try {
      return new Date(d + "T12:00:00").toLocaleDateString("en-US", {
        weekday: "long", month: "long", day: "numeric", year: "numeric"
      });
    } catch { return d; }
  };

  const dayPages = days
    .sort((a: any, b: any) => a.dayNumber - b.dayNumber)
    .map((day: any) => {
      const meals = day.mealsDetail || day.meals || "";
      const dining = day.diningNotes || "";
      const mealText = meals + (dining ? `  ·  ${dining}` : "");
      const accom = day.accommodationName || day.accommodationType || "";
      const rooms = day.roomConfig || "";
      const activities = day.activitiesDetail || day.activities || "";
      const guide = day.guideIncluded ? `${day.guideLanguage || "English"}-speaking official guide` : "";
      const transfer = day.transferDetails || (day.transferType && day.transferType !== "none" ? day.transferType : "");

      const rows = [
        mealText ? `<tr><td class="lbl">Meals</td><td class="val">${mealText}</td></tr>` : "",
        accom ? `<tr><td class="lbl">Accommodation</td><td class="val">${accom}${rooms ? ` · ${rooms}` : ""}</td></tr>` : "",
        activities ? `<tr><td class="lbl">Activities</td><td class="val">${activities}</td></tr>` : "",
        guide ? `<tr><td class="lbl">Guide</td><td class="val">${guide}</td></tr>` : "",
        transfer ? `<tr><td class="lbl">Transfer</td><td class="val">${transfer}</td></tr>` : "",
      ].filter(Boolean).join("");

      const desc = (day.description || "").split(/Meals:|Accommodation:|Activities:/)[0].trim();

      return `
<div class="page">
  <div class="hd">SLOW MOROCCO · ${proposal.hero_title || "Your Journey"}</div>
  <h2 class="city">${day.title || day.toCity || "Day " + day.dayNumber}</h2>
  <div class="dmeta">Day ${day.dayNumber}${day.date ? " — " + formatDate(day.date) : ""}</div>
  ${day.fromCity && day.toCity && day.fromCity !== day.toCity
    ? `<div class="route">${day.fromCity} → ${day.toCity}${day.durationHours ? " · " + day.durationHours : ""}</div>`
    : ""}
  ${rows ? `<table class="pt"><tbody>${rows}</tbody></table><div class="div"></div>` : ""}
  <p class="desc">${desc}</p>
  <div class="ft"><span>Slow Morocco · hello@slowmorocco.com</span><span>Day ${day.dayNumber} of ${days.length}</span></div>
</div>`;
    }).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${proposal.hero_title || "Your Journey"} — Slow Morocco</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;1,400&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'EB Garamond',Georgia,serif;color:#1a1a18;background:white}
.page{width:210mm;min-height:297mm;padding:20mm 22mm 18mm;position:relative;display:flex;flex-direction:column;page-break-after:always;break-after:page}
.hd{font-family:Helvetica,Arial,sans-serif;font-size:7pt;letter-spacing:.15em;color:#888;text-transform:uppercase;padding-bottom:7pt;border-bottom:.4pt solid #e0dbd0;margin-bottom:22pt}
.ft{font-family:Helvetica,Arial,sans-serif;font-size:7pt;color:#888;display:flex;justify-content:space-between;padding-top:10pt;border-top:.4pt solid #e0dbd0;margin-top:auto}
/* cover */
.cover-logo{font-family:Helvetica,Arial,sans-serif;font-size:8pt;letter-spacing:.2em;color:#888;text-transform:uppercase;padding-bottom:8pt;border-bottom:.4pt solid #e0dbd0;margin-bottom:28pt}
.cover-title{font-size:40pt;font-weight:normal;line-height:1.1;margin-bottom:18pt}
.cover-quote{font-style:italic;font-size:11pt;color:#666;line-height:1.8;margin-bottom:8pt;max-width:120mm}
.cover-attr{font-family:Helvetica,Arial,sans-serif;font-size:8pt;color:#888}
.cover-client{font-size:15pt;margin-bottom:5pt;margin-top:28pt}
.cover-meta{font-family:Helvetica,Arial,sans-serif;font-size:10pt;color:#888;margin-bottom:3pt}
.cover-hr{border:none;border-top:.4pt solid #e0dbd0;margin:20pt 0 16pt}
/* investment */
.inv-lbl{font-family:Helvetica,Arial,sans-serif;font-size:8pt;letter-spacing:.2em;color:#888;text-transform:uppercase;text-align:center;margin-bottom:8pt}
.inv-price{font-size:50pt;font-weight:normal;text-align:center;line-height:1;margin-bottom:4pt}
.inv-sub{font-family:Helvetica,Arial,sans-serif;font-size:10pt;color:#888;text-align:center;margin-bottom:3pt}
.sec-title{font-size:20pt;font-weight:normal;margin:18pt 0 10pt}
.inc-table{width:100%;border-collapse:collapse;margin-bottom:6pt}
.inc-table td{padding:5pt 0;border-bottom:.3pt solid #e0dbd0;font-size:10pt;color:#444}
.inc-dash{width:14pt;color:#888}
.not-inc{font-style:italic;font-size:9pt;color:#888;margin:8pt 0 14pt}
.sec-hr{border:none;border-top:.4pt solid #e0dbd0;margin:10pt 0}
.how-body{font-size:10pt;color:#444;line-height:1.7;margin-bottom:7pt}
.how-bold{font-family:Helvetica,Arial,sans-serif;font-weight:bold;font-size:9pt;margin:8pt 0 3pt}
/* map */
.map-lbl{font-family:Helvetica,Arial,sans-serif;font-size:8pt;letter-spacing:.2em;color:#888;text-transform:uppercase;margin-bottom:6pt}
.map-title{font-size:22pt;font-weight:normal;margin-bottom:14pt}
.map-cities{font-family:Helvetica,Arial,sans-serif;font-size:8pt;color:#888;text-align:center;margin-top:8pt}
/* days */
.city{font-size:30pt;font-weight:normal;margin-bottom:3pt;line-height:1.1}
.dmeta{font-family:Helvetica,Arial,sans-serif;font-size:8pt;letter-spacing:.12em;text-transform:uppercase;color:#888;margin-bottom:10pt}
.route{font-family:Helvetica,Arial,sans-serif;font-size:9pt;color:#888;margin-bottom:8pt}
.pt{width:100%;border-collapse:collapse;margin-bottom:8pt}
.pt .lbl{font-family:Helvetica,Arial,sans-serif;font-weight:bold;font-size:8.5pt;color:#1a1a18;width:30mm;padding:4pt 8pt 4pt 0;vertical-align:top;border-bottom:.3pt solid #e0dbd0}
.pt .val{font-size:10pt;color:#444;padding:4pt 0;vertical-align:top;border-bottom:.3pt solid #e0dbd0}
.div{border:none;border-top:.4pt solid #e0dbd0;margin:8pt 0 10pt}
.desc{font-style:italic;font-size:11pt;color:#555;line-height:1.8}
/* disclaimer */
.dis-title{font-size:18pt;font-weight:normal;margin:14pt 0 7pt}
.dis-body{font-size:10pt;color:#444;line-height:1.7;margin-bottom:4pt}
@media print{
  @page{margin:0;size:A4 portrait}
  body{margin:0}
  .page{page-break-after:always;break-after:page}
}
  .print-btn{
    position:fixed;top:16px;right:16px;
    display:flex;align-items:center;gap:6px;
    background:#2d5016;color:white;border:none;
    font-family:Helvetica,Arial,sans-serif;
    font-size:9pt;letter-spacing:.1em;text-transform:uppercase;
    padding:8px 16px;cursor:pointer;
    opacity:.9;z-index:100;
  }
  .print-btn:hover{opacity:1}
  @media print{.print-btn{display:none!important}}
</style>
</head>
<body>
<button class="print-btn" onclick="window.print()">
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3">
    <rect x="2" y="5" width="12" height="8" rx="1"/>
    <polyline points="4,5 4,1 12,1 12,5"/>
    <line x1="4" y1="10" x2="12" y2="10"/>
    <line x1="4" y1="12" x2="9" y2="12"/>
  </svg>
  Save as PDF
</button>

<!-- COVER -->
<div class="page">
  <div class="cover-logo">Slow Morocco</div>
  <h1 class="cover-title">${proposal.hero_title || "Your Journey"}</h1>
  <p class="cover-quote">&ldquo;From far off, through circuitous corridors, came the scent of citrus-blossom and jasmine, with sometimes a bird&rsquo;s song before dawn, sometimes a flute&rsquo;s wail at sunset, and always the call of the muezzin in the night&hellip;&rdquo;</p>
  <p class="cover-attr">&mdash; Edith Wharton, In Morocco (1920)</p>
  <hr class="cover-hr"/>
  <p class="cover-client">${clientName}</p>
  <p class="cover-meta">${numGuests} guests &nbsp;&middot;&nbsp; December 20&ndash;28, 2026</p>
  <p class="cover-meta">Essaouira &rarr; Errachidia</p>
  <div class="ft" style="margin-top:auto"><span>hello@slowmorocco.com</span><span>slowmorocco.com</span></div>
</div>

<!-- INVESTMENT -->
<div class="page">
  <div class="hd">SLOW MOROCCO &middot; ${proposal.hero_title || "Your Journey"}</div>
  <p class="inv-lbl">Your Investment</p>
  <p class="inv-price">&euro;${priceFormatted}</p>
  <p class="inv-sub">total for a group of ${numGuests}</p>
  <p class="inv-sub">&euro;${perPerson} per person</p>
  <hr class="sec-hr"/>
  <h2 class="sec-title">What&rsquo;s Included</h2>
  <table class="inc-table"><tbody>
    <tr><td class="inc-dash">&mdash;</td><td>Private transportation throughout with a dedicated driver</td></tr>
    <tr><td class="inc-dash">&mdash;</td><td>Handpicked accommodations, selected for character and location</td></tr>
    <tr><td class="inc-dash">&mdash;</td><td>All breakfasts, lunches and dinners</td></tr>
    <tr><td class="inc-dash">&mdash;</td><td>Entrance fees to attractions included in your programme</td></tr>
    <tr><td class="inc-dash">&mdash;</td><td>English-speaking official guide in Marrakech</td></tr>
    <tr><td class="inc-dash">&mdash;</td><td>24/7 local support throughout your journey</td></tr>
  </tbody></table>
  <p class="not-inc">International flights and travel insurance are arranged separately.</p>
  <hr class="sec-hr"/>
  <h2 class="sec-title">How It Works</h2>
  <p class="how-body">A 30% deposit confirms your journey and allows us to begin securing all properties and experiences. The remaining balance is due 45 days before departure.</p>
  <p class="how-bold">If you need to cancel:</p>
  <p class="how-body">More than 45 days before departure &mdash; deposit refunded in full, minus banking fees and any non-refundable commitments already made. Most hotels refund without issue, though Christmas bookings often carry stricter terms.</p>
  <p class="how-body">Less than 45 days before departure &mdash; no refund possible.</p>
  <p class="how-body">We strongly recommend comprehensive travel insurance covering trip cancellation. Payment accepted by PayPal or international bank transfer. Once you confirm, we send a booking agreement. We are radically transparent &mdash; no hidden surprises.</p>
  <div class="ft"><span>hello@slowmorocco.com</span><span>slowmorocco.com/booking-conditions</span></div>
</div>

<!-- MAP -->
<div class="page">
  <div class="hd">SLOW MOROCCO &middot; YOUR ROUTE</div>
  <h2 class="map-title">Your Route</h2>
  <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#f5f0e8;border:.5pt solid #e0dbd0">
    <polygon points="419,59 466,49 652,83 721,111 745,149 783,186 791,215 776,248 721,286 659,309 605,333 551,342 489,347 412,356 334,347 257,333 179,309 117,262 102,215 87,168 117,120 179,87 257,59 373,54 419,59" fill="#ede8de" stroke="#d0c8b8" stroke-width="1"/>
    <polyline points="180,300 220,285 265,275 315,268 365,265 415,268 455,275 490,284" fill="none" stroke="#c8bfaf" stroke-width="5" stroke-linecap="round"/>
    <polyline points="121,262 258,256 245,267 376,288 444,260 565,282 534,242" fill="none" stroke="#8B7355" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="121" cy="262" r="5.5" fill="white" stroke="#1a1a18" stroke-width="1.5"/><circle cx="121" cy="262" r="3" fill="#1a1a18"/>
    <text x="112" y="258" text-anchor="end" font-family="Georgia,serif" font-size="11" fill="#1a1a18">Essaouira</text>
    <circle cx="258" cy="256" r="5.5" fill="white" stroke="#1a1a18" stroke-width="1.5"/><circle cx="258" cy="256" r="3" fill="#1a1a18"/>
    <text x="268" y="252" font-family="Georgia,serif" font-size="11" fill="#1a1a18">Marrakech</text>
    <circle cx="245" cy="267" r="4" fill="white" stroke="#1a1a18" stroke-width="1.5"/><circle cx="245" cy="267" r="2.5" fill="#1a1a18"/>
    <text x="234" y="282" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="#888">Agafay</text>
    <circle cx="376" cy="288" r="5.5" fill="white" stroke="#1a1a18" stroke-width="1.5"/><circle cx="376" cy="288" r="3" fill="#1a1a18"/>
    <text x="386" y="284" font-family="Georgia,serif" font-size="11" fill="#1a1a18">Tamnougalt</text>
    <circle cx="444" cy="260" r="5.5" fill="white" stroke="#1a1a18" stroke-width="1.5"/><circle cx="444" cy="260" r="3" fill="#1a1a18"/>
    <text x="454" y="256" font-family="Georgia,serif" font-size="11" fill="#1a1a18">Todra</text>
    <circle cx="565" cy="282" r="5.5" fill="white" stroke="#1a1a18" stroke-width="1.5"/><circle cx="565" cy="282" r="3" fill="#1a1a18"/>
    <text x="575" y="278" font-family="Georgia,serif" font-size="11" fill="#1a1a18">The Sahara</text>
    <circle cx="534" cy="242" r="5.5" fill="white" stroke="#1a1a18" stroke-width="1.5"/><circle cx="534" cy="242" r="3" fill="#1a1a18"/>
    <text x="544" y="234" font-family="Georgia,serif" font-size="11" fill="#1a1a18">Errachidia</text>
  </svg>
  <p class="map-cities">Essaouira &middot; Marrakech &middot; Agafay &middot; Tamnougalt &middot; Todra Gorge &middot; The Sahara &middot; Errachidia</p>
  <div class="ft" style="margin-top:auto"><span>Slow Morocco</span><span>slowmorocco.com</span></div>
</div>

<!-- DAYS -->
${dayPages}

<!-- DISCLAIMER -->
<div class="page">
  <div class="hd">SLOW MOROCCO &middot; IMPORTANT NOTES</div>
  <h2 class="dis-title">Accommodation</h2>
  <p class="dis-body">All properties listed are suggested and subject to availability. They will be confirmed upon receipt of your deposit. Should a property be unavailable, Slow Morocco will propose an equivalent alternative of equal or superior standard.</p>
  <hr class="sec-hr"/>
  <h2 class="dis-title">Your Itinerary</h2>
  <p class="dis-body">This itinerary is a blueprint, not a contract. Every element can be adjusted before confirmation. Once the deposit is received and bookings are locked in, significant changes may incur additional costs.</p>
  <hr class="sec-hr"/>
  <h2 class="dis-title">Pricing</h2>
  <p class="dis-body">All prices are quoted in euros and are valid for 30 days from the date of this proposal. Prices are based on current supplier rates and are subject to change until confirmed by deposit.</p>
  <hr class="sec-hr"/>
  <h2 class="dis-title">Travel Insurance</h2>
  <p class="dis-body">We strongly recommend comprehensive travel insurance covering trip cancellation and interruption &mdash; not just medical emergencies. Please arrange this at the time of your deposit.</p>
  <hr class="sec-hr"/>
  <p style="margin-top:16pt;font-size:10pt;color:#444">Slow Morocco &middot; 35 Derb Fhal Zfriti, Ksour, Marrakech 40000, Morocco</p>
  <p style="font-size:10pt;color:#444;margin-top:3pt">hello@slowmorocco.com &middot; slowmorocco.com</p>
  <p style="font-size:9pt;color:#888;margin-top:8pt">Full booking conditions available at slowmorocco.com/booking-conditions</p>
  <div class="ft"><span>Slow Morocco &middot; hello@slowmorocco.com</span><span>&copy; 2026 Slow Morocco</span></div>
</div>

</body>
</html>`;
}
