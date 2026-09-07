import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const { searchParams, pathname } = request.nextUrl;

  // ===================================================
  // 1. BACKEND GATE: Restricted /admin Access (Password Cookie)
  // ===================================================
  if (pathname.startsWith('/admin')) {
    // Let the login view and the internal token auth API process through without structural blocks
    if (pathname === '/admin/login' || pathname === '/admin/api/auth') {
      return NextResponse.next();
    }

    // Read the secure verification session token
    const sessionToken = request.cookies.get('sm_admin_session')?.value;

    // Force unauthenticated requests straight back to the login gateway
    if (sessionToken !== 'authenticated_true') {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ===================================================
  // 1b. SECURITY FIX: gate the entire /api/admin/* subtree with the same
  //     session cookie. These API routes previously had NO auth and were
  //     publicly readable/writable.
  // ===================================================
  if (pathname.startsWith('/api/admin')) {
    const sessionToken = request.cookies.get('sm_admin_session')?.value;
    if (sessionToken !== 'authenticated_true') {
      return new NextResponse(
        JSON.stringify({ success: false, error: 'unauthorized' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      );
    }
  }

  // ===================================================
  // 1c. CRAWL BUDGET: retire the migrated Darija dictionary
  //
  // ~9,000 /darija/dictionary/<word>-<id> URLs moved to darija.io in
  // June 2026. They have been 301ing ever since, which means Google
  // keeps rechecking every one of them — indefinitely. In the
  // September 2026 coverage export they accounted for roughly 9,000
  // of 11,222 not-indexed URLs, while real story pages were going
  // five months between crawls.
  //
  // A 301 preserves a URL. A 410 retires it, and Google drops a 410
  // far faster than a 301. Three months of 301 has already passed
  // whatever authority there was to darija.io.
  //
  // The hub paths /darija and /darija/dictionary keep their 301s in
  // next.config.js, so a human following an old link still lands
  // somewhere useful. Only the individual word pages are gone.
  // ===================================================
  if (/^\/darija\/dictionary\/[^/]+\/?$/.test(pathname)) {
    return new NextResponse(
      "Gone. The Darija dictionary now lives at https://darija.io",
      {
        status: 410,
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "x-robots-tag": "noindex",
        },
      }
    );
  }

  // ===================================================
  // 2. EXISTING INFRASTRUCTURE: Redirect non-www to www
  // ===================================================
  if (hostname === "slowmorocco.com") {
    const newUrl = new URL(request.url);
    newUrl.host = "www.slowmorocco.com";
    return NextResponse.redirect(newUrl, 301);
  }

  if (hostname === "riaddisiena.com") {
    const newUrl = new URL(request.url);
    newUrl.host = "www.riaddisiena.com";
    return NextResponse.redirect(newUrl, 301);
  }

  // ===================================================
  // 3. EXISTING INFRASTRUCTURE: Strip trailing slashes
  // ===================================================
  if (pathname !== "/" && pathname.endsWith("/")) {
    const newUrl = new URL(request.url);
    newUrl.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(newUrl, 301);
  }

  // ===================================================
  // 4. EXISTING INFRASTRUCTURE: Strip WordPress parameters
  // ===================================================
  if (
    searchParams.has("page_id") ||
    searchParams.has("p") ||
    searchParams.has("preview") ||
    searchParams.has("preview_id")
  ) {
    const cleanUrl = new URL(pathname, request.url);
    return NextResponse.redirect(cleanUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/admin/:path*",
    "/((?!api|_next/static|_next/image|favicon|og-image|apple-touch|llms|robots|sitemap).*)",
  ],
};
