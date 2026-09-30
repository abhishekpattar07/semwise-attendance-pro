import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { unlockSite } from "@/lib/gate.functions";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Faculty Login — A S Patil BCA Attendance" },
      { name: "description", content: "Enter the faculty password to open the BCA attendance register." },
      { property: "og:title", content: "Faculty Login — A S Patil BCA Attendance" },
      { property: "og:description", content: "Password-protected access to the BCA attendance register." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Login,
});

function Login() {
  const router = useRouter();
  const unlock = useServerFn(unlockSite);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const password = new FormData(e.currentTarget).get("password") as string;
    const { ok } = await unlock({ data: { password } });
    setBusy(false);
    if (ok) await router.navigate({ to: "/attendance" });
    else setError(true);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-lg border border-border bg-card p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-foreground">Faculty Login</h1>
        <p className="mt-1 text-sm text-muted-foreground">A S Patil College of Commerce — BCA</p>
        <label className="mt-6 block text-sm font-medium text-foreground" htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground"
        />
        {error && <p className="mt-2 text-sm text-destructive">Incorrect password</p>}
        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded-md bg-primary py-2 font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
        >
          {busy ? "Checking..." : "Login"}
        </button>
        <Link to="/" className="mt-4 block text-center text-sm text-muted-foreground hover:underline">Back to home</Link>
      </form>
    </main>
  );
}
