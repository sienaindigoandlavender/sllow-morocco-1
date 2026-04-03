import { NextRequest, NextResponse } from "next/server";

const EBIRD_KEY = process.env.EBIRD_API_KEY || "";
const BASE = "https://api.ebird.org/v2";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const endpoint = searchParams.get("endpoint");

  if (!endpoint) {
    return NextResponse.json({ error: "Missing endpoint" }, { status: 400 });
  }

  const params = new URLSearchParams();
  searchParams.forEach((v, k) => {
    if (k !== "endpoint") params.append(k, v);
  });

  const url = `${BASE}/${endpoint}${params.size ? `?${params}` : ""}`;

  try {
    const res = await fetch(url, {
      headers: { "X-eBirdApiToken": EBIRD_KEY },
      next: { revalidate: 3600 }, // cache 1 hour
    });

    if (!res.ok) {
      return NextResponse.json({ error: "eBird error", status: res.status }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" },
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch eBird data" }, { status: 500 });
  }
}
