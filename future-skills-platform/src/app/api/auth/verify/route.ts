import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { SESSION_COOKIE, buildSessionCookie } from "@/lib/auth";
import { hashToken } from "@/lib/magic-link";

export const runtime = "nodejs";

/**
 * Consume a magic-link token.
 *
 * Idempotency rule: once a token's consumedAt is set, further requests
 * with the same token fail closed. This protects against link-prefetching
 * proxies (Outlook safe-link scanners etc) that would otherwise burn the
 * token before the user clicks.
 *
 * On success, marks the user's email as verified and sets the session
 * cookie. Returns the user's role so the client can decide where to redirect.
 */
const Body = z.object({
  token: z.string().min(20),
});

export async function POST(req: NextRequest) {
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  const hash = hashToken(parsed.data.token);

  const token = await prisma.verificationToken.findUnique({ where: { tokenHash: hash } });
  if (!token) return NextResponse.json({ error: "invalid_or_expired" }, { status: 401 });
  if (token.consumedAt) return NextResponse.json({ error: "already_used" }, { status: 401 });
  if (token.expiresAt < new Date()) {
    return NextResponse.json({ error: "invalid_or_expired" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: token.email } });
  if (!user) return NextResponse.json({ error: "user_not_found" }, { status: 404 });

  await prisma.$transaction([
    prisma.verificationToken.update({
      where: { id: token.id },
      data: { consumedAt: new Date() },
    }),
    prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: user.emailVerified ?? new Date() },
    }),
  ]);

  const res = NextResponse.json({ ok: true, role: user.role });
  res.cookies.set({
    name: SESSION_COOKIE,
    value: buildSessionCookie(user.id),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
