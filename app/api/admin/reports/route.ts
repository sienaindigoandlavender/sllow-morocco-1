import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [quotesRes, proposalsRes] = await Promise.all([
      supabase.from("quotes").select("client_id, first_name, last_name, journey_interest, status, created_date, last_updated, start_date, country").order("created_date", { ascending: false }),
      supabase.from("proposals").select("proposal_id, client_id, formatted_price, total_price, num_guests, created_at").order("created_at", { ascending: false }),
    ]);

    const quotes = quotesRes.data || [];
    const proposals = proposalsRes.data || [];

    const proposalByClient: Record<string, any> = {};
    proposals.forEach(p => { if (p.client_id) proposalByClient[p.client_id] = p; });

    // Pipeline
    const stages = ["NEW", "IN_PROGRESS", "SENT", "BOOKED", "ARCHIVED"];
    const pipeline: Record<string, { count: number; value: number }> = {};
    stages.forEach(s => pipeline[s] = { count: 0, value: 0 });

    quotes.forEach(q => {
      const stage = q.status || "NEW";
      if (!pipeline[stage]) pipeline[stage] = { count: 0, value: 0 };
      pipeline[stage].count++;
      const prop = proposalByClient[q.client_id];
      const price = parseFloat(String(prop?.formatted_price || prop?.total_price || "").replace(/[^0-9.]/g, "")) || 0;
      pipeline[stage].value += price;
    });

    const total = quotes.length;
    const funnel = stages.map(s => ({
      stage: s,
      count: pipeline[s]?.count || 0,
      pct: total > 0 ? Math.round(((pipeline[s]?.count || 0) / total) * 100) : 0,
    }));

    // Journey popularity
    const journeyCount: Record<string, number> = {};
    quotes.forEach(q => {
      const j = q.journey_interest || "Custom";
      journeyCount[j] = (journeyCount[j] || 0) + 1;
    });
    const journeys = Object.entries(journeyCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => ({ name, count }));

    // Avg response time: inquiry → proposal
    const responseTimes: number[] = [];
    quotes.forEach(q => {
      const prop = proposalByClient[q.client_id];
      if (q.created_date && prop?.created_at) {
        const days = (new Date(prop.created_at).getTime() - new Date(q.created_date).getTime()) / 86400000;
        if (days >= 0 && days < 90) responseTimes.push(days);
      }
    });
    const avgResponseDays = responseTimes.length > 0
      ? Math.round((responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length) * 10) / 10
      : null;

    const activeValue = (pipeline["IN_PROGRESS"]?.value || 0) + (pipeline["SENT"]?.value || 0);
    const bookedValue = pipeline["BOOKED"]?.value || 0;

    // Activity log — last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const activity: { date: string; type: string; label: string; clientId: string }[] = [];

    quotes.forEach(q => {
      const name = `${q.first_name || ""} ${q.last_name || ""}`.trim() || q.client_id;
      if (q.created_date && q.created_date > thirtyDaysAgo)
        activity.push({ date: q.created_date, type: "inquiry", label: `New inquiry — ${name}`, clientId: q.client_id });
      if (q.status === "SENT" && q.last_updated && q.last_updated > thirtyDaysAgo)
        activity.push({ date: q.last_updated, type: "sent", label: `Proposal sent — ${name}`, clientId: q.client_id });
      if (q.status === "BOOKED" && q.last_updated && q.last_updated > thirtyDaysAgo)
        activity.push({ date: q.last_updated, type: "booked", label: `Booked — ${name}`, clientId: q.client_id });
      if (q.status === "ARCHIVED" && q.last_updated && q.last_updated > thirtyDaysAgo)
        activity.push({ date: q.last_updated, type: "archived", label: `Archived — ${name}`, clientId: q.client_id });
    });

    proposals.forEach(p => {
      if (p.created_at && p.created_at > thirtyDaysAgo) {
        const q = quotes.find(q => q.client_id === p.client_id);
        const name = q ? `${q.first_name || ""} ${q.last_name || ""}`.trim() : p.client_id;
        activity.push({ date: p.created_at, type: "proposal", label: `Proposal generated — ${name}`, clientId: p.client_id || "" });
      }
    });

    activity.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({
      success: true,
      pipeline, funnel, journeys,
      avgResponseDays, activeValue, bookedValue,
      totalQuotes: total,
      activity: activity.slice(0, 40),
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
