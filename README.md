# Addis Eats — Next.js Secure Authentication Full App

A learning project implementing the seven session/authentication requirements.

## Requirements implemented

1. **Verified session helper** — `lib/session.js` reads the `secure_demo_session` cookie and verifies the signed JWT with `jose`. Invalid or expired tokens return `null`.
2. **Secure cookie** — sign-in sets `httpOnly`, `sameSite: "lax"`, `path: "/"`, an eight-hour `maxAge`, and `secure` in production.
3. **Route middleware** — `middleware.js` protects only `/checkout/:path*` and `/orders/:path*`, using a matcher that excludes other pages.
4. **Return destination** — protected pages add `next` to the sign-in URL; successful sign-in redirects to the intended local route.
5. **Reject unsafe `next`** — both the sign-in page and sign-in API reject non-slash paths, protocol-relative URLs (`//example.com`), and backslashes. Invalid values fall back to `/`.
6. **User-scoped orders** — `app/orders/page.js` calls `getOrdersForUser(session.id)`, so Alice and Bob see different order lists.
7. **Server-side staff authorization** — `app/kitchen/page.js` checks `session.role === "staff"` on the server. A customer cannot access the staff dashboard simply by typing its URL.

## Run locally

1. Install Node.js 20 or newer.
2. Extract the ZIP and open a terminal in this project folder.
3. Install packages:
   ```bash
   npm install
   ```
4. Copy `.env.example` to `.env.local`.
5. Generate a secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
   ```
   Put the output after `SESSION_SECRET=` in `.env.local`. Keep the secret private.
6. Start the app:
   ```bash
   npm run dev
   ```
7. Open http://localhost:3000.

## Demo accounts

| Role | Email | Password |
|---|---|---|
| Customer | alice@example.com | password123 |
| Customer | bob@example.com | password123 |
| Staff | staff@example.com | password123 |

These are demo credentials only. The sample uses in-memory users and plain-text demo passwords to keep the assignment easy to run. **Do not use this credential implementation in production.** For a real application, store password hashes (e.g. Argon2id/bcrypt) in a database, add rate limiting and CSRF protections where appropriate, and persist orders in a database.

## Test checklist

### Protected routes
- Open `/checkout` in a private/incognito window. It should redirect to `/signin?next=%2Fcheckout`.
- Open `/orders` while signed out. It should redirect to sign-in with `next`.
- Sign in and confirm you return to the requested page.

### Crafted redirect
- Open `http://localhost:3000/signin?next=https%3A%2F%2Fevil.example`
- Sign in. You should land on `/`, not `evil.example`.
- Also test `next=//evil.example` and `next=%5C%5Cevil.example`; neither should navigate off-site.
- A normal internal destination such as `next=%2Forders` should work.

### User order isolation
- Sign in as Alice. `/orders` shows orders 1001 and 1002.
- Sign out, then sign in as Bob. `/orders` shows only order 2001.

### Staff authorization
- Sign in as Alice and manually visit `/kitchen`. The page should show “Staff access only”.
- Sign in as `staff@example.com`. `/kitchen` should show the kitchen orders.
- `/kitchen` is intentionally not included in the middleware matcher because the assignment specifically requires middleware to protect only `/checkout` and `/orders`. Its role authorization is enforced inside the server page.

## Project structure

```text
app/
  api/signin/route.js
  api/signout/route.js
  checkout/page.js
  components/SignInForm.js
  components/SignOutButton.js
  kitchen/page.js
  menu/page.js
  orders/page.js
  signin/page.js
  globals.css
  layout.js
  page.js
lib/
  data.js
  session.js
  users.js
middleware.js
.env.example
```

## Notes
- Sessions are signed with HS256 and expire after eight hours.
- `SESSION_SECRET` must be at least 32 characters and must be configured before signing in.
- The in-memory data resets whenever the development server restarts.
