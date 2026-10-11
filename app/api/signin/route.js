import { NextResponse } from "next/server";
import { createSession } from "@/lib/session";
import { verifyCredentials } from "@/lib/users";

function safeNext(value) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return "/";
  try {
    const parsed = new URL(value, "http://local.invalid");
    if (parsed.origin !== "http://local.invalid") return "/";
    return parsed.pathname + parsed.search + parsed.hash;
  } catch {
    return "/";
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const user = verifyCredentials(body.email, body.password);
    if (!user) return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
    await createSession(user);
    return NextResponse.json({ ok: true, redirectTo: safeNext(body.next) });
  } catch (error) {
    console.error("Sign-in error:", error);
    return NextResponse.json({ error: "Server configuration error. Check SESSION_SECRET in .env.local." }, { status: 500 });
  }
}
