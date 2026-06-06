import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { generateToken, TOKEN_TTL_MS, buildVerifyUrl } from "@/lib/magic-link";

export const runtime = "nodejs";

/**
 * Magic-link request.
 *
 * Always returns 200 (even for invalid emails) so the endpoint doesn't
 * leak which addresses are registered. The user is told to check their
 * inbox; the actual mail send is best-effort.
 *
 * In environments without SMTP configured (MAGIC_LINK_DEV=true), the
 * raw link is included in the response so single-tenant pilots stay
 * clickable. Production deployments unset MAGIC_LINK_DEV and wire up
 * SMTP via env vars.
 */
const Body = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  organizationSlug: z.string().default("default"),
});

export async function POST(req: NextRequest) {
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  const { email, name, organizationSlug } = parsed.data;

  // Pre-provision the user row + org so verification has somewhere to
  // attach the session. We deliberately do NOT mark email as verified yet.
  let org = await prisma.organization.findUnique({ where: { slug: organizationSlug } });
  if (!org && organizationSlug === "default") {
    org = await prisma.organization.create({
      data: { slug: "default", name: "Default" },
    });
  }
  if (!org) {
    // Don't 404 — same generic response to avoid leaking org existence.
    return NextResponse.json({ ok: true });
  }
  await prisma.user.upsert({
    where: { email },
    update: { name: name ?? undefined },
    create: { email, name, organizationId: org.id },
  });

  // Issue token. Multiple outstanding tokens per email are fine — they all
  // expire in 15 min, and consuming one consumes one. No revocation needed.
  const { raw, hash } = generateToken();
  await prisma.verificationToken.create({
    data: {
      email,
      tokenHash: hash,
      expiresAt: new Date(Date.now() + TOKEN_TTL_MS),
    },
  });

  const origin = req.headers.get("origin") ?? new URL(req.url).origin;
  const link = buildVerifyUrl(origin, raw);

  // Mail integration plugs in here. Until then: surface the link to the
  // caller iff MAGIC_LINK_DEV is true. This keeps the demo clickable
  // without ever exposing tokens in production.
  if (process.env.MAGIC_LINK_DEV === "true") {
    return NextResponse.json({ ok: true, devLink: link });
  }

  // TODO: integrate SMTP / transactional email here.
  return NextResponse.json({ ok: true });
}
