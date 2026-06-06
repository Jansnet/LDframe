import { createHash, randomBytes } from "node:crypto";

/**
 * Magic-link token generation and hashing.
 *
 * Token is 32 random bytes encoded base64url (~43 chars). Only the SHA-256
 * hash is stored in the DB — even read access doesn't expose valid tokens.
 *
 * The raw token is the only thing returned to the caller; we never log it
 * server-side and never persist it. If MAGIC_LINK_SMTP_* env vars are set,
 * the token is delivered by mail; otherwise it's returned directly in the
 * API response so dev / single-tenant deployments stay clickable.
 */

export const TOKEN_TTL_MS = 15 * 60 * 1000; // 15 minutes

export function generateToken(): { raw: string; hash: string } {
  const raw = randomBytes(32).toString("base64url");
  const hash = createHash("sha256").update(raw).digest("hex");
  return { raw, hash };
}

export function hashToken(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

export function buildVerifyUrl(origin: string, token: string): string {
  return `${origin}/verify?token=${encodeURIComponent(token)}`;
}
