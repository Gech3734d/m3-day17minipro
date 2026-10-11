import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "secure_demo_session";

async function hasValidSession(request) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const secret = process.env.SESSION_SECRET;
  if (!token || !secret || secret.length < 32) return false;
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret), {
      algorithms: ["HS256"]
    });
    return Boolean(payload.sub && payload.email && payload.role);
  } catch {
    return false;
  }
}

export async function middleware(request) {
  if (await hasValidSession(request)) return NextResponse.next();

  const signInUrl = new URL("/signin", request.url);
  signInUrl.searchParams.set("next", request.nextUrl.pathname + request.nextUrl.search);
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*"]
};
