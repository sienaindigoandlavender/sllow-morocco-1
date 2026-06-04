import { NextResponse } from "next/server";
import { generateClientId, createQuote, supabase } from "@/lib/supabase";
import { getRouteSequenceForJourney } from "@/lib/journey-routes";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.slowmorocco.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      journey,
      month,
      year,
      travelers,
      days,
      language,
      budget,
      requests,
      firstName,
      lastName,
      email,
      phone,
      countryCode,
      country,
      hearAboutUs,
      dreamExperience,
      firstTimeMorocco,
    } = body;

    // Generate client ID
    const clientId = await generateClientId();
    const createdDate = new Date().toISOString();
    const numDays = parseInt(days) || 7;
    const nights = numDays - 1;
    const numTravelers = parseInt(travelers) || 2;

    const monthIndex = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ].indexOf(month);
    const startDate = monthIndex >= 0
      ? `${year}-${String(monthIndex + 1).padStart(2, "0")}-15`
      : "";

    // ── 1. Create quote ───────────────────────────────────────────────────────
    const quote = await createQuote({
      client_id: clientId,
      first_name: firstName,
      last_name: lastName,
      email,
      whatsapp_country_code: (countryCode || "").replace("+", ""),
      whatsapp_number: phone,
      journey_interest: journey,
      start_date: startDate,
      end_date: "",
      days: days,
      nights: nights.toString(),
      language,
      hospitality_level: "",
      dream_experience: dreamExperience || "",
      first_time_morocco: firstTimeMorocco || "",
      requests: requests || "",
      hear_about_us: hearAboutUs || "",
      number_travelers: travelers,
      budget,
      start_city: "",
      end_city: "",
      journey_type: "",
      status: "NEW",
      itinerary_doc_link: "",
      proposal_url: "",
      created_date: createdDate,
      last_updated: createdDate,
      notes: "",
      country: country || "",
    });

    if (!quote) {
      return NextResponse.json({ success: false, error: "Failed to create quote" }, { status: 500 });
    }

    // ── 2. Try to auto-generate draft proposal ────────────────────────────────
    const proposalId = `PROP-${clientId}`;
    const adminUrl = `${SITE_URL}/admin/quotes/${clientId}`;
    const proposalUrl = `${SITE_URL}/proposal/${proposalId}`;
    let proposalGenerated = false;
    let proposalNeedsManualWork = false;

    // Look up route sequence for this journey
    const routeSequence = getRouteSequenceForJourney(journey || "");

    if (routeSequence) {
      try {
        // Fetch content blocks
        const contentRes = await fetch(`${SITE_URL}/api/content-library`);
        const contentData = await contentRes.json();
        const contentBlocks: any[] = contentData.contentBlocks || [];
        const blockMap = new Map(contentBlocks.map((b: any) => [b.id, b]));

        // Build days from route sequence
        const routeIds = routeSequence.split("\n").map((id: string) => id.trim()).filter(Boolean);
        const selectedBlocks = routeIds.map((id: string) => blockMap.get(id)).filter(Boolean);

        if (selectedBlocks.length > 0) {
          const proposalDays = selectedBlocks.map((block: any, index: number) => ({
            dayNumber: index + 1,
            date: startDate
              ? new Date(new Date(startDate).getTime() + index * 86400000).toISOString().split("T")[0]
              : "",
            title: block.toCity || block.cityName || block.fromCity || `Day ${index + 1}`,
            fromCity: block.fromCity || "",
            toCity: block.toCity || "",
            description: block.description || "",
            imageUrl: block.imageUrl || "",
            durationHours: block.travelTime || "",
            difficultyLevel: block.difficulty || "",
            meals: block.meals || "",
            accommodationType: block.accommodationType || "",
          }));

          // Build route points for map
          const cityCoords: Record<string, [number, number]> = {
            "Tangier": [305, 55], "Chefchaouen": [330, 80], "Rabat": [220, 145],
            "Casablanca": [210, 178], "Fes": [410, 100], "Meknes": [370, 120],
            "Essaouira": [121, 262], "Marrakech": [258, 256], "Agafay Desert": [245, 275],
            "Ouarzazate": [310, 295], "Tamnougalt": [376, 305], "Zagora": [380, 320],
            "Dadès": [430, 270], "Todra": [455, 265], "Merzouga": [535, 268],
            "The Sahara": [535, 268], "Errachidia": [510, 240],
          };
          const routePoints: { name: string; coords: [number, number] }[] = [];
          proposalDays.forEach((d: any) => {
            const c = d.fromCity || d.toCity;
            if (c && cityCoords[c] && !routePoints.some(p => p.name === c)) {
              routePoints.push({ name: c, coords: cityCoords[c] });
            }
            if (d.toCity && cityCoords[d.toCity] && !routePoints.some(p => p.name === d.toCity)) {
              routePoints.push({ name: d.toCity, coords: cityCoords[d.toCity] });
            }
          });

          const heroBlock = contentBlocks.find((b: any) => b.heroImageUrl) || {};

          // Save proposal to Supabase
          const { error: propError } = await supabase.from("proposals").upsert({
            proposal_id: proposalId,
            client_id: clientId,
            client_name: `${firstName} ${lastName}`.trim(),
            country: country || "",
            hero_image_url: heroBlock.heroImageUrl || proposalDays[0]?.imageUrl || "",
            hero_title: `${firstName} in Morocco`,
            hero_blurb: `An ${nights}-night journey through Morocco, crafted for ${firstName} ${lastName}.`,
            start_date: startDate,
            end_date: "",
            days: numDays.toString(),
            nights: nights.toString(),
            num_guests: numTravelers.toString(),
            total_price: "",
            formatted_price: "",
            route_points: JSON.stringify(routePoints),
            days_list: JSON.stringify(proposalDays),
          });

          if (!propError) {
            proposalGenerated = true;
            // Save route sequence back to quote
            await supabase.from("quotes")
              .update({ notes_route_sequence: routeSequence, status: "IN_PROGRESS" })
              .eq("client_id", clientId);
          }
        }
      } catch (genError) {
        console.error("Auto-proposal generation error:", genError);
        // Don't fail the whole request — just flag it
      }
    } else {
      proposalNeedsManualWork = true;
    }

    // ── 3. Send emails ────────────────────────────────────────────────────────
    if (resend && process.env.CONTACT_EMAIL) {
      try {
        // Client acknowledgment
        await resend.emails.send({
          from: "Slow Morocco <hello@slowmorocco.com>",
          to: email,
          subject: `We've received your journey request`,
          html: `
            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="font-size: 24px; font-weight: normal; margin-bottom: 30px;">Dear ${firstName},</h1>
              <p style="line-height: 1.8; color: #333;">Thank you for your interest in exploring Morocco with us. We've received your journey request and are already thinking about your itinerary.</p>
              <div style="background: #f9f7f4; padding: 24px; margin: 30px 0;">
                <p style="margin: 0 0 10px 0;"><strong>Journey:</strong> ${journey || "Custom"}</p>
                <p style="margin: 0 0 10px 0;"><strong>Travel dates:</strong> ${month} ${year}</p>
                <p style="margin: 0 0 10px 0;"><strong>Travelers:</strong> ${travelers}</p>
                <p style="margin: 0;"><strong>Duration:</strong> ${days} days</p>
              </div>
              <p style="line-height: 1.8; color: #333;">We'll be in touch within 24 hours with a proposal shaped around what you're looking for.</p>
              <p style="line-height: 1.8; color: #333; margin-top: 40px;">Warm regards,<br>Mohammed<br>Slow Morocco</p>
            </div>
          `,
        });

        // Admin notification — different tone depending on whether draft was generated
        const adminSubject = proposalGenerated
          ? `✓ Draft ready — ${firstName} ${lastName} (${clientId})`
          : proposalNeedsManualWork
            ? `⚠ Needs manual route — ${firstName} ${lastName} (${clientId})`
            : `New inquiry — ${firstName} ${lastName} (${clientId})`;

        const proposalSection = proposalGenerated
          ? `
            <div style="background: #f0f7f0; border-left: 4px solid #2d5016; padding: 16px 20px; margin: 20px 0;">
              <p style="margin: 0 0 8px; font-weight: bold; color: #2d5016;">✓ Draft proposal auto-generated</p>
              <p style="margin: 0 0 8px;">The route sequence was matched and a draft has been saved. Review it, add accommodation and pricing, then send.</p>
            </div>
            <p>
              <a href="${adminUrl}" style="background: #1a1a18; color: #fff; padding: 10px 20px; text-decoration: none; display: inline-block; margin-right: 12px;">View Quote</a>
              <a href="${proposalUrl}?edit=true" style="background: #2d5016; color: #fff; padding: 10px 20px; text-decoration: none; display: inline-block;">Review Proposal Draft</a>
            </p>`
          : `
            <div style="background: #fff8f0; border-left: 4px solid #c47d00; padding: 16px 20px; margin: 20px 0;">
              <p style="margin: 0 0 8px; font-weight: bold; color: #c47d00;">⚠ Route not auto-mapped — needs manual work</p>
              <p style="margin: 0;">Journey interest: <strong>${journey || "Custom / not specified"}</strong>. Open the quote and set the route sequence manually before generating.</p>
            </div>
            <p>
              <a href="${adminUrl}" style="background: #1a1a18; color: #fff; padding: 10px 20px; text-decoration: none; display: inline-block;">Build Quote for ${firstName}</a>
            </p>`;

        await resend.emails.send({
          from: "Slow Morocco <noreply@slowmorocco.com>",
          to: process.env.CONTACT_EMAIL,
          subject: adminSubject,
          html: `
            <div style="font-family: Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 20px; color: #1a1a18;">
              <h2 style="font-size: 20px; font-weight: normal; margin-bottom: 24px;">New Inquiry — ${firstName} ${lastName}</h2>
              ${proposalSection}
              <hr style="border: none; border-top: 1px solid #e0dbd0; margin: 24px 0;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr><td style="padding: 6px 0; color: #888; width: 160px;">Client ID</td><td style="padding: 6px 0;"><strong>${clientId}</strong></td></tr>
                <tr><td style="padding: 6px 0; color: #888;">Name</td><td style="padding: 6px 0;">${firstName} ${lastName}</td></tr>
                <tr><td style="padding: 6px 0; color: #888;">Email</td><td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #1a1a18;">${email}</a></td></tr>
                <tr><td style="padding: 6px 0; color: #888;">Phone</td><td style="padding: 6px 0;">${countryCode || ""} ${phone || ""}</td></tr>
                <tr><td style="padding: 6px 0; color: #888;">Country</td><td style="padding: 6px 0;">${country || "—"}</td></tr>
                <tr><td style="padding: 6px 0; color: #888;">Journey</td><td style="padding: 6px 0;">${journey || "Custom"}</td></tr>
                <tr><td style="padding: 6px 0; color: #888;">Dates</td><td style="padding: 6px 0;">${month || ""} ${year || ""}</td></tr>
                <tr><td style="padding: 6px 0; color: #888;">Travelers</td><td style="padding: 6px 0;">${travelers}</td></tr>
                <tr><td style="padding: 6px 0; color: #888;">Duration</td><td style="padding: 6px 0;">${days} days</td></tr>
                <tr><td style="padding: 6px 0; color: #888;">Language</td><td style="padding: 6px 0;">${language || "—"}</td></tr>
                <tr><td style="padding: 6px 0; color: #888;">Budget</td><td style="padding: 6px 0;">${budget || "—"}</td></tr>
                <tr><td style="padding: 6px 0; color: #888;">First time</td><td style="padding: 6px 0;">${firstTimeMorocco || "—"}</td></tr>
              </table>
              ${dreamExperience ? `<div style="margin-top: 16px; padding: 16px; background: #f9f7f4;"><p style="margin: 0 0 4px; color: #888; font-size: 12px;">DREAM EXPERIENCE</p><p style="margin: 0; font-style: italic;">${dreamExperience}</p></div>` : ""}
              ${requests ? `<div style="margin-top: 12px; padding: 16px; background: #f9f7f4;"><p style="margin: 0 0 4px; color: #888; font-size: 12px;">SPECIAL REQUESTS</p><p style="margin: 0;">${requests}</p></div>` : ""}
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Email send error:", emailError);
      }
    }

    return NextResponse.json({
      success: true,
      clientId,
      proposalGenerated,
      message: "Journey request submitted successfully",
    });
  } catch (error: any) {
    console.error("Plan your trip error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
