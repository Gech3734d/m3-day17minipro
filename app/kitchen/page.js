import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getAllOrdersForStaff } from "@/lib/data";

export default async function KitchenPage() {
  const session = await getSession();
  // Authorization is enforced on the server. Hiding a nav link is not security.
  if (!session) redirect("/signin?next=%2Fkitchen");
  if (session.role !== "staff") {
    return <section className="content-card"><div className="eyebrow">403 · FORBIDDEN</div><h1>Staff access only</h1><p>Your account does not have permission to access the kitchen dashboard.</p><p className="muted">Sign out and sign in using staff@example.com to test this route.</p></section>;
  }
  const orders = getAllOrdersForStaff();
  return <section><div className="eyebrow">STAFF DASHBOARD</div><h1>Kitchen orders</h1><p className="lead">This page is rendered only for a session with the staff role.</p><div className="orders-list">{orders.map((order) => <article className="order-card" key={order.id}><div><span className="tag">Order #{order.id}</span><h2>{order.item}</h2><p className="muted">{order.total} Birr</p></div><span className="status">{order.status}</span></article>)}</div></section>;
}
