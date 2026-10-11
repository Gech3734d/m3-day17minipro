import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { SignInForm } from "../components/SignInForm";

function safeNext(value) {
  // Accept only app-local absolute paths. Reject protocol-relative //host paths too.
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return "/";
  try {
    const parsed = new URL(value, "http://local.invalid");
    if (parsed.origin !== "http://local.invalid") return "/";
    return parsed.pathname + parsed.search + parsed.hash;
  } catch {
    return "/";
  }
}

export default async function SignInPage({ searchParams }) {
  const session = await getSession();
  const params = await searchParams;
  const next = safeNext(params?.next);
  if (session) redirect(next);
  return <div className="auth-layout">
    <section className="auth-card">
      <div className="eyebrow">WELCOME BACK</div>
      <h1>Sign in</h1>
      <p className="muted">Sign in to view your orders and continue checkout.</p>
      <SignInForm next={next} />
      <div className="demo-box"><strong>Demo accounts</strong><p>Customer: alice@example.com / password123</p><p>Customer: bob@example.com / password123</p><p>Staff: staff@example.com / password123</p></div>
      <p className="muted small">New to the demo? No registration is needed. <Link href="/menu">Browse the menu</Link>.</p>
    </section>
  </div>;
}
