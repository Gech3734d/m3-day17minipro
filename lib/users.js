// Demo-only users. Replace this with a database and securely hashed passwords in production.
const users = [
  { id: "user-alice", email: "alice@example.com", name: "Alice Customer", password: "password123", role: "customer" },
  { id: "user-bob", email: "bob@example.com", name: "Bob Customer", password: "password123", role: "customer" },
  { id: "user-staff", email: "staff@example.com", name: "Sam Staff", password: "password123", role: "staff" }
];

export function verifyCredentials(email, password) {
  const normalized = String(email || "").trim().toLowerCase();
  const user = users.find((item) => item.email === normalized && item.password === password);
  if (!user) return null;
  const { password: _password, ...safeUser } = user;
  return safeUser;
}
