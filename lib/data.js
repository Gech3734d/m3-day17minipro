// Demo in-memory data. A real app should use a database and enforce ownership in its query.
const orders = [
  { id: "1001", userId: "user-alice", item: "Addis Special Pizza", status: "Preparing", total: 420 },
  { id: "1002", userId: "user-alice", item: "Doro Wat Combo", status: "On the way", total: 360 },
  { id: "2001", userId: "user-bob", item: "Tibs Special", status: "Delivered", total: 300 }
];

export function getOrdersForUser(userId) {
  return orders.filter((order) => order.userId === userId);
}

export function getOrderForUser(orderId, userId) {
  return orders.find((order) => order.id === String(orderId) && order.userId === userId) || null;
}

export function getAllOrdersForStaff() {
  return orders.map(({ userId, ...order }) => order);
}
