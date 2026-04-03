import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function GET() {
  try {
    const { data, error } = await getSupabase()
      .from("quotes")
      .select("*")
      .order("created_date", { ascending: false });

    if (error) {
      console.error("Error fetching quotes:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // Map DB columns to what the admin UI expects
    const quotes = (data || []).map((q: any) => ({
      Client_ID: q.client_id,
      First_Name: q.first_name,
      Last_Name: q.last_name,
      Email: q.email,
      WhatsApp_Country_Code: q.whatsapp_country_code,
      WhatsApp_Number: q.whatsapp_number,
      Phone: q.whatsapp_country_code && q.whatsapp_number 
        ? `${q.whatsapp_country_code} ${q.whatsapp_number}` 
        : q.whatsapp_number || "",
      Country: q.country,
      Journey_Interest: q.journey_interest,
      Start_Date: q.start_date,
      End_Date: q.end_date,
      Start_City: q.start_city,
      End_City: q.end_city,
      Days: q.days,
      Nights: q.nights,
      Number_Travelers: q.number_travelers,
      Language: q.language,
      Budget: q.budget,
      Hospitality_Level: q.hospitality_level,
      Dream_Experience: q.dream_experience,
      Requests: q.requests,
      Hear_About_Us: q.hear_about_us,
      First_Time_Morocco: q.first_time_morocco,
      Journey_Type: q.journey_type,
      Status: q.status || "NEW",
      Itinerary_Doc_Link: q.itinerary_doc_link,
      Proposal_URL: q.proposal_url,
      Notes: q.notes,
      Created_Date: q.created_date,
      Last_Updated: q.last_updated,
    }));

    return NextResponse.json({ success: true, quotes });
  } catch (err) {
    console.error("Quotes GET error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Generate client ID: SM-YYMM-XXX
    const now = new Date();
    const prefix = `SM-${String(now.getFullYear()).slice(2)}${String(now.getMonth() + 1).padStart(2, "0")}`;
    
    // Get count for sequence
    const { count } = await getSupabase()
      .from("quotes")
      .select("*", { count: "exact", head: true })
      .like("client_id", `${prefix}%`);
    
    const seq = String((count || 0) + 1).padStart(3, "0");
    const clientId = `${prefix}-${seq}`;

    // Parse phone into country code + number
    let whatsappCode = "";
    let whatsappNumber = body.phone || "";
    if (whatsappNumber.startsWith("+")) {
      const parts = whatsappNumber.match(/^(\+\d{1,4})\s*(.+)/);
      if (parts) {
        whatsappCode = parts[1];
        whatsappNumber = parts[2];
      }
    }

    const { data, error } = await getSupabase().from("quotes").insert({
      client_id: clientId,
      first_name: body.firstName || null,
      last_name: body.lastName || null,
      email: body.email || null,
      whatsapp_country_code: whatsappCode || null,
      whatsapp_number: whatsappNumber || null,
      country: body.country || null,
      journey_interest: body.journeyInterest || null,
      start_date: body.startDate || null,
      end_date: body.endDate || null,
      start_city: body.startCity || null,
      end_city: body.endCity || null,
      days: body.days || null,
      number_travelers: body.travelers || null,
      language: body.language || "English",
      budget: body.budget || null,
      requests: body.requests || null,
      notes: body.notes || null,
      first_time_morocco: body.firstTimeMorocco || null,
      dream_experience: body.dreamExperience || null,
      hear_about_us: body.hearAboutUs || null,
      status: "NEW",
      created_date: now.toISOString(),
      last_updated: now.toISOString(),
    }).select().single();

    if (error) {
      console.error("Error creating quote:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, clientId, quote: data });
  } catch (err) {
    console.error("Quotes POST error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
