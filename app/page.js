import Link from "next/link";
import { getSession } from "@/lib/session";

export default async function HomePage() {
  const session = await getSession();
  return <section className="hero">
    <div className="eyebrow">NEXT.JS SECURITY PRACTICE</div>
    <h1>Welcome to <span>Addis Eats</span></h1>
    <p className="lead">A complete demo app for signed sessions, protected pages, safe redirects, private orders, and server-side staff authorization.</p>
    {session ? <p className="welcome">Signed in as <strong>{session.name}</strong> ({session.role}).</p> : <p className="welcome">Sign in with one of the demo accounts to explore the protected features.</p>}
    <div className="actions"><Link className="primary-button" href="/menu">Explore menu</Link><Link className="secondary-button" href={session ? "/orders" : "/signin?next=%2Forders"}>{session ? "View my orders" : "Sign in to continue"}</Link></div>
    <div className="feature-grid">
      <article className="feature"><div className="feature-icon">🔐</div><h3>Verified sessions</h3><p>Signed JWT cookie with expiry and secure cookie options.</p></article>
      <article className="feature"><div className="feature-icon">🧾</div><h3>Private orders</h3><p>Orders are filtered by the signed-in user's ID on the server.</p></article>
      <article className="feature"><div className="feature-icon">👩‍🍳</div><h3>Staff-only kitchen</h3><p>Role authorization runs in the server page, not just the UI.</p></article>
    </div>
  </section>;
}
