import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Admin routes (except login) require authentication
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (!req.auth?.user) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protected API routes require authentication
  const protectedApiPaths = [
    "/api/appointments", // GET is protected (POST is public, handled in the route itself)
    "/api/stats",
    "/api/services", // POST/PUT are protected in the route
  ];

  // Only protect GET on /api/appointments (not POST which is public)
  if (
    pathname === "/api/appointments" &&
    req.method === "GET" &&
    !req.auth?.user
  ) {
    return NextResponse.json(
      { success: false, error: "Neautorizat" },
      { status: 401 }
    );
  }

  if (
    pathname.startsWith("/api/stats") &&
    !req.auth?.user
  ) {
    return NextResponse.json(
      { success: false, error: "Neautorizat" },
      { status: 401 }
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/appointments",
    "/api/stats/:path*",
  ],
};
