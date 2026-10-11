"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  async function signOut() {
    setBusy(true);
    await fetch("/api/signout", { method: "POST" });
    router.push("/");
    router.refresh();
  }
  return <button className="small-button" onClick={signOut} disabled={busy}>{busy ? "Signing out…" : "Sign out"}</button>;
}
