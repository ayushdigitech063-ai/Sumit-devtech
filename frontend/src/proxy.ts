import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow /admin/login
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Redirect if admin_token cookie is missing
  const token = request.cookies.get("admin_token");
  if (!token?.value) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

