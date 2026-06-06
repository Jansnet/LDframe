import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";

export const runtime = "nodejs";

const Body = z.object({
  name: z.string().min(2).max(80),
  memberEmails: z.array(z.string().email()).min(2).max(5),
});

export async function POST(req: NextRequest) {
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  const userId = await getSessionUserId();
  const me = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, organizationId: true },
  });
  if (!me) return NextResponse.json({ error: "no_user" }, { status: 401 });

  // Look up member users by email within the same org (you can only form a
  // circle with people already on the platform in your org).
  const emails = Array.from(
    new Set([me.email, ...parsed.data.memberEmails.map((e) => e.toLowerCase())]),
  );
  const users = await prisma.user.findMany({
    where: { organizationId: me.organizationId, email: { in: emails } },
    select: { id: true, email: true },
  });
  if (users.length < 3) {
    return NextResponse.json(
      {
        error: "members_not_found",
        detail: "Mindestens 3 Personen aus deiner Org müssen registriert sein, bevor ein Circle entstehen kann.",
        foundEmails: users.map((u) => u.email),
      },
      { status: 400 },
    );
  }

  const circle = await prisma.learningCircle.create({
    data: {
      name: parsed.data.name,
      organizationId: me.organizationId,
      status: "active",
      members: {
        create: users.map((u) => ({
          userId: u.id,
          role: u.id === me.id ? "facilitator" : "member",
        })),
      },
    },
    select: { id: true },
  });
  return NextResponse.json({ id: circle.id });
}
