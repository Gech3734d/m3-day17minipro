import "./globals.css";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { SignOutButton } from "./components/SignOutButton";

export const metadata = {
  title: "Addis Eats — Secure Auth Demo",
  description: "Next.js authentication, session security, and role-protected routes."
};

export default async function RootLayout({ children }) {
  const session = await getSession();
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link className="brand" href="/">Addis Eats</Link>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/checkout">Checkout</Link>
            <Link href="/orders">My Orders</Link>
            {session?.role === "staff" && <Link href="/kitchen">Kitchen</Link>}
          </nav>
          <div className="account">
            {session ? <><span>{session.name}</span><SignOutButton /></> : <Link className="nav-button" href="/signin">Sign in</Link>}
          </div>
        </header>
        <main className="page">{children}</main>
        <footer>© {new Date().getFullYear()} Addis Eats · Secure authentication learning app</footer>
      </body>
    </html>
  );
}
