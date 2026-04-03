import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const { searchParams, pathname } = request.nextUrl;

  // 1. Redirect non-www to www
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

  // 2. Strip trailing slashes (except root /)
  if (pathname !== "/" && pathname.endsWith("/")) {
    const newUrl = new URL(request.url);
    newUrl.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(newUrl, 301);
  }

  // 3. Strip WordPress legacy query parameters (?page_id=, ?p=, ?preview=)
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
  matcher: ["/((?!api|_next/static|_next/image|favicon|og-image|apple-touch|llms|robots|sitemap).*)"],
};
