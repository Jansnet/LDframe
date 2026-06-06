import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { SESSION_COOKIE, buildSessionCookie } from "@/lib/auth";

export const runtime = "nodejs";

/**
 * Lightweight magic-link-less login.
 *
 * Trade-off: in v1 we accept any email and trust it — combined with an
 * org-scoped invite list this is enough for internal pilots. A magic-link
 * verification step plugs in cleanly later (POST /api/auth/verify with a
 * token mailed to the address).
 *
 * Why not OAuth: most pilots will run inside companies with SSO. We don't
 * know which IdP yet. The cookie-session approach keeps optionality open.
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

  // Resolve org. Auto-create the "default" org so the demo path works
  // out-of-the-box; named orgs must be pre-provisioned by an admin.
  let org = await prisma.organization.findUnique({ where: { slug: organizationSlug } });
  if (!org && organizationSlug === "default") {
    org = await prisma.organization.create({
      data: { slug: "default", name: "Default" },
    });
  }
  if (!org) {
    return NextResponse.json({ error: "organization_not_found" }, { status: 404 });
  }

  const user = await prisma.user.upsert({
    where: { email },
    update: { name: name ?? undefined },
    create: { email, name, organizationId: org.id },
  });

  const cookieValue = buildSessionCookie(user.id);
  const res = NextResponse.json({ ok: true, userId: user.id });
  res.cookies.set({
    name: SESSION_COOKIE,
    value: cookieValue,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
