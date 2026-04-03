import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const clientId = params.id;
    const { data, error } = await getSupabase()
      .from("quotes")
      .select("*")
      .eq("client_id", clientId)
      .single();

    if (error || !data) {
      return NextResponse.json({ success: false, error: "Quote not found" }, { status: 404 });
    }

    // Map to admin UI format
    const quote = {
      Client_ID: data.client_id,
      First_Name: data.first_name,
      Last_Name: data.last_name,
      Email: data.email,
      WhatsApp_Country_Code: data.whatsapp_country_code,
      WhatsApp_Number: data.whatsapp_number,
      Phone: data.whatsapp_country_code && data.whatsapp_number
        ? `${data.whatsapp_country_code} ${data.whatsapp_number}`
        : data.whatsapp_number || "",
      Country: data.country,
      Journey_Interest: data.journey_interest,
      Start_Date: data.start_date,
      End_Date: data.end_date,
      Start_City: data.start_city,
      End_City: data.end_city,
      Days: data.days,
      Nights: data.nights,
      Number_Travelers: data.number_travelers,
      Language: data.language,
      Budget: data.budget,
      Hospitality_Level: data.hospitality_level,
      Dream_Experience: data.dream_experience,
      Requests: data.requests,
      Hear_About_Us: data.hear_about_us,
      First_Time_Morocco: data.first_time_morocco,
      Journey_Type: data.journey_type,
      Status: data.status || "NEW",
      Itinerary_Doc_Link: data.itinerary_doc_link,
      Proposal_URL: data.proposal_url,
      Notes: data.notes,
      Created_Date: data.created_date,
      Last_Updated: data.last_updated,
    };

    return NextResponse.json({ success: true, quote });
  } catch (err) {
    console.error("Quote GET error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const clientId = params.id;
    const body = await request.json();

    // Parse phone into country code + number
    let whatsappCode = body.WhatsApp_Country_Code || "";
    let whatsappNumber = body.WhatsApp_Number || "";
    
    if (body.phone) {
      const phone = body.phone;
      if (phone.startsWith("+")) {
        const parts = phone.match(/^(\+\d{1,4})\s*(.+)/);
        if (parts) {
          whatsappCode = parts[1];
          whatsappNumber = parts[2];
        }
      } else {
        whatsappNumber = phone;
      }
    }

    const updates: any = {
      last_updated: new Date().toISOString(),
    };

    // Map form fields to DB columns
    if (body.firstName !== undefined) updates.first_name = body.firstName;
    if (body.lastName !== undefined) updates.last_name = body.lastName;
    if (body.email !== undefined) updates.email = body.email;
    if (whatsappCode) updates.whatsapp_country_code = whatsappCode;
    if (whatsappNumber) updates.whatsapp_number = whatsappNumber;
    if (body.country !== undefined) updates.country = body.country;
    if (body.journeyInterest !== undefined) updates.journey_interest = body.journeyInterest;
    if (body.startDate !== undefined) updates.start_date = body.startDate;
    if (body.endDate !== undefined) updates.end_date = body.endDate;
    if (body.startCity !== undefined) updates.start_city = body.startCity;
    if (body.endCity !== undefined) updates.end_city = body.endCity;
    if (body.days !== undefined) updates.days = body.days;
    if (body.travelers !== undefined) updates.number_travelers = body.travelers;
    if (body.language !== undefined) updates.language = body.language;
    if (body.budget !== undefined) updates.budget = body.budget;
    if (body.requests !== undefined) updates.requests = body.requests;
    if (body.notes !== undefined) updates.notes = body.notes;
    if (body.firstTimeMorocco !== undefined) updates.first_time_morocco = body.firstTimeMorocco;
    if (body.dreamExperience !== undefined) updates.dream_experience = body.dreamExperience;
    if (body.hearAboutUs !== undefined) updates.hear_about_us = body.hearAboutUs;
    
    // Direct DB column names (from quote detail/edit pages)
    if (body.Status !== undefined) updates.status = body.Status;
    if (body.First_Name !== undefined) updates.first_name = body.First_Name;
    if (body.Last_Name !== undefined) updates.last_name = body.Last_Name;
    if (body.Email !== undefined) updates.email = body.Email;
    if (body.Country !== undefined) updates.country = body.Country;
    if (body.Journey_Interest !== undefined) updates.journey_interest = body.Journey_Interest;
    if (body.Start_Date !== undefined) updates.start_date = body.Start_Date;
    if (body.End_Date !== undefined) updates.end_date = body.End_Date;
    if (body.Start_City !== undefined) updates.start_city = body.Start_City;
    if (body.End_City !== undefined) updates.end_city = body.End_City;
    if (body.Days !== undefined) updates.days = body.Days;
    if (body.Number_Travelers !== undefined) updates.number_travelers = body.Number_Travelers;
    if (body.Language !== undefined) updates.language = body.Language;
    if (body.Budget !== undefined) updates.budget = body.Budget;
    if (body.Requests !== undefined) updates.requests = body.Requests;
    if (body.Notes !== undefined) updates.notes = body.Notes;
    if (body.First_Time_Morocco !== undefined) updates.first_time_morocco = body.First_Time_Morocco;
    if (body.Dream_Experience !== undefined) updates.dream_experience = body.Dream_Experience;
    if (body.Hear_About_Us !== undefined) updates.hear_about_us = body.Hear_About_Us;
    if (body.Proposal_URL !== undefined) updates.proposal_url = body.Proposal_URL;
    if (body.Itinerary_Doc_Link !== undefined) updates.itinerary_doc_link = body.Itinerary_Doc_Link;

    const { data, error } = await getSupabase()
      .from("quotes")
      .update(updates)
      .eq("client_id", clientId)
      .select()
      .single();

    if (error) {
      console.error("Error updating quote:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, quote: data });
  } catch (err) {
    console.error("Quote PUT error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const clientId = params.id;
    const { error } = await getSupabase()
      .from("quotes")
      .delete()
      .eq("client_id", clientId);

    if (error) {
      console.error("Error deleting quote:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Quote DELETE error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
