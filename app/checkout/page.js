import Link from "next/link";
import { getSession } from "@/lib/session";

export default async function CheckoutPage() {
  const session = await getSession();
  // Middleware protects this route; server session lookup also makes the page context explicit.
  if (!session) return <div className="notice"><h1>Please sign in</h1><Link href="/signin?next=%2Fcheckout">Sign in to checkout</Link></div>;
  return <section className="content-card"><div className="eyebrow">ORDER SUMMARY</div><h1>Checkout</h1><p>Welcome, {session.name}. This demo checkout shows how an authenticated page can use the verified server session.</p><div className="summary-row"><span>Addis Special Pizza</span><strong>420 Birr</strong></div><div className="summary-row"><span>Delivery</span><strong>30 Birr</strong></div><div className="summary-row total"><span>Total</span><strong>450 Birr</strong></div><p className="muted small">Payment is not processed in this learning demo.</p><Link className="primary-button" href="/orders">View your orders</Link></section>;
}
