import { NextResponse } from "next/server";

// Access codes for static gated pages. Override in Vercel env vars
// without redeploying content: PAGE_CODE_SAHARA_IT=yourcode
const PAGE_CODES: Record<string, string> = {
  "sahara-it": process.env.PAGE_CODE_SAHARA_IT || "DUNE450",
};

export async function POST(request: Request) {
  try {
    const { pageKey, code } = await request.json();
    const expected = PAGE_CODES[pageKey];

    if (!expected || !code || code.trim().toLowerCase() !== expected.toLowerCase()) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const res = NextResponse.json({ success: true });
    res.cookies.set(`page_access_${pageKey}`, expected, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
