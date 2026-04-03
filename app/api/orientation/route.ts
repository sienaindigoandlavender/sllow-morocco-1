import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { time, experience, interest, pace, fear } = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }

    const prompt = `You are the editorial intelligence behind Slow Morocco — a cultural guide to Morocco built on depth, honesty, and the belief that understanding a place is more valuable than visiting it quickly.

A traveler has answered five orientation questions:
1. Time available: ${time || "not specified"}
2. Previous Morocco experience: ${experience || "not specified"}
3. What drew them to Morocco: ${interest || "not specified"}
4. How they want to move: ${pace || "not specified"}
5. What would make the trip feel like a failure: ${fear || "not specified"}

Write a Morocco orientation for this specific traveler. Not an itinerary — a mental model. The framework they need before they can make any good decision.

Voice rules:
- Direct and precise. No hedging.
- Never use: stunning, vibrant, bustling, hidden gem, authentic, magical, unforgettable.
- Facts deployed as breadcrumbs, not explanations.
- Honest about difficulty without being frightening.
- The register is a knowledgeable friend, not a guidebook.

Return ONLY valid JSON with exactly these keys — no markdown fences, no preamble:
{
  "headline": "A single sentence naming the trip this person should take. Specific, not generic. Captures their particular combination of time, interest, and pace.",
  "honest_note": "One honest thing they need to hear before planning. Something most people don't know and wish they had. Under 60 words. A true thing, delivered directly — not a warning.",
  "geographic_logic": "2-3 sentences on spatial logic. Which cities cluster, what the real travel distances are, what order makes sense. Address any misconception relevant to their answers. Be specific about hours, not vague about distances.",
  "cities": [
    {"name": "City name", "why": "One sentence — why this city for this specific traveler, not in general"}
  ],
  "the_one_thing": "The single most important insight for this traveler before they arrive. The thing that changes how they experience everything else. 40-60 words.",
  "watch_out": "The specific mistake this traveler is most likely to make given their answers. Concrete and personal to them, not generic Morocco advice. Under 40 words."
}

The cities array should have 2-4 cities appropriate for their time and pace. If they have 5 days, give 1-2 cities. If 2 weeks, up to 4.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || "";
    const clean = text.replace(/```json|```/g, "").trim();
    const orientation = JSON.parse(clean);

    return NextResponse.json(orientation);
  } catch (error) {
    console.error("Orientation API error:", error);
    return NextResponse.json(
      { error: "Failed to generate orientation" },
      { status: 500 }
    );
  }
}
