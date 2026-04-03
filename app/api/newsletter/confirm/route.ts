import { NextResponse } from "next/server";
import { confirmSubscriber } from "@/lib/nexus";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const result = await confirmSubscriber(token);

  if (result.success) {
    return NextResponse.redirect(new URL("/newsletter/welcome", request.url));
  } else {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
