import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { redirect } from "@tanstack/react-router";
import { createHash, timingSafeEqual } from "node:crypto";

type GateSession = { unlocked?: boolean };

function config() {
  return {
    password: process.env["SESSION_SECRET"]!,
    name: "aspbca-gate",
    maxAge: 60 * 60 * 24 * 7,
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  };
}

function matches(input: string, expected: string) {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

export const unlockSite = createServerFn({ method: "POST" })
  .inputValidator((d: { password: string }) => ({ password: String(d.password ?? "").slice(0, 200) }))
  .handler(async ({ data }) => {
    const expected = process.env["SITE_PASSWORD"];
    if (!expected) throw new Error("Password not configured");
    if (!matches(data.password, expected)) return { ok: false as const };
    const session = await useSession<GateSession>(config());
    await session.update({ unlocked: true });
    return { ok: true as const };
  });

export const checkUnlocked = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<GateSession>(config());
  if (!session.data.unlocked) throw redirect({ to: "/login" });
  return { ok: true };
});

export const lockSite = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<GateSession>(config());
  await session.clear();
  return { ok: true };
});
