import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   const secureCookie = request.cookies.get(
//     "__Secure-better-auth.session_token"
//   );

//   const normalCookie = request.cookies.get(
//     "better-auth.session_token"
//   );

//   console.log("===== PROXY CHECK =====");
//   console.log("PATH:", pathname);
//   console.log(
//     "__Secure-better-auth.session_token:",
//     secureCookie ? "FOUND" : "NOT FOUND"
//   );
//   console.log(
//     "better-auth.session_token:",
//     normalCookie ? "FOUND" : "NOT FOUND"
//   );

//   const protectedRoutes = ["/dashboard", "/bookmark"];

//   if (protectedRoutes.some((route) => pathname.startsWith(route))) {
//     const sessionCookie = secureCookie || normalCookie;

//     console.log(
//       "PROTECTED ROUTE:",
//       protectedRoutes.some((route) => pathname.startsWith(route))
//     );

//     console.log(
//       "SESSION COOKIE:",
//       sessionCookie ? "FOUND → ALLOW" : "NOT FOUND → REDIRECT"
//     );

//     if (!sessionCookie) {
//       console.log("🚨 REDIRECTING TO /");
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   }

//   console.log("✅ PROXY ALLOWING REQUEST");
//   console.log("======================");

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/bookmark/:path*"],
};
