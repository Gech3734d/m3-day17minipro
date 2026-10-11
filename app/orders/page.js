import Link from "next/link";
import { getSession } from "@/lib/session";
import { getOrdersForUser } from "@/lib/data";

export default async function OrdersPage() {
  const session = await getSession();
  if (!session) return <div className="notice"><h1>Please sign in</h1><Link href="/signin?next=%2Forders">Sign in to see your orders</Link></div>;
  // Critical security requirement: query is scoped to the verified session user ID.
  const orders = getOrdersForUser(session.id);
  return <section><div className="eyebrow">YOUR ACCOUNT</div><h1>My orders</h1><p className="lead">Only orders belonging to {session.email} are shown.</p>
    {orders.length ? <div className="orders-list">{orders.map((order) => <article className="order-card" key={order.id}><div><span className="tag">Order #{order.id}</span><h2>{order.item}</h2><p className="muted">Order total: {order.total} Birr</p></div><span className={`status ${order.status === "Delivered" ? "done" : ""}`}>{order.status}</span></article>)}</div> : <div className="notice">No orders found for your account yet.</div>}
    <p className="small muted">Try signing in as Alice and then Bob to verify that each account sees different orders.</p>
  </section>;
}
