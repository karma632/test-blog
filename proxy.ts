import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/dashboard", "/bookmarks"];

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const sessionCookie = request.cookies.get("better-auth.session_token");

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/bookmarks/:path*"],
};