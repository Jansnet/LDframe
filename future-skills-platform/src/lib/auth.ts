import { createHmac, randomBytes } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Lightweight session auth.
 *
 * Cookie format: `userId.expiresAt.hmac` — three dot-separated base64url parts.
 * HMAC over `userId.expiresAt` using SESSION_SECRET (or a dev default).
 *
 * Why not NextAuth: we'd pull in OAuth providers, adapters, callbacks — for
 * an internal tool that primarily needs "is this person who they say they
 * are, and can we attribute their reflections to a stable id" this is plenty.
 *
 * Fallback: in dev / preview, sessions are not required — getSessionUserId
 * returns a stable "demo" id so the platform stays clickable without sign-in.
 * Set REQUIRE_AUTH=true to flip the default and reject unauthenticated writes.
 */

export const SESSION_COOKIE = "sh_session";
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const DEMO_USER_ID = "demo";

function secret(): string {
  return process.env.SESSION_SECRET || "dev-only-secret-replace-in-prod";
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function buildSessionCookie(userId: string): string {
  const expires = Date.now() + ONE_WEEK_MS;
  const payload = `${userId}.${expires}`;
  const hmac = sign(payload);
  return `${payload}.${hmac}`;
}

export function parseSessionCookie(value: string | undefined): string | null {
  if (!value) return null;
  const parts = value.split(".");
  if (parts.length !== 3) return null;
  const [userId, expiresRaw, hmac] = parts;
  if (sign(`${userId}.${expiresRaw}`) !== hmac) return null;
  const expires = Number(expiresRaw);
  if (!Number.isFinite(expires) || expires < Date.now()) return null;
  return userId;
}

export async function getSessionUserId(): Promise<string> {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  const parsed = parseSessionCookie(raw);
  if (parsed) return parsed;
  if (process.env.REQUIRE_AUTH === "true") {
    throw new AuthRequiredError();
  }
  return DEMO_USER_ID;
}

export function isAuthRequired(): boolean {
  return process.env.REQUIRE_AUTH === "true";
}

export class AuthRequiredError extends Error {
  constructor() {
    super("Authentication required.");
    this.name = "AuthRequiredError";
  }
}

export function newJoinCode(): string {
  // 8 chars of base32-ish, avoiding ambiguous 0/O and 1/I/L.
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  return Array.from(randomBytes(8))
    .map((b) => alphabet[b % alphabet.length])
    .join("");
}
