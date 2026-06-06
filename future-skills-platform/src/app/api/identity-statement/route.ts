import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSkill } from "@/content/registry";

export const runtime = "nodejs";

const Body = z.object({
  userId: z.string().optional(),
  skillSlug: z.string(),
  statement: z.string().min(10),
  weeks: z.coerce.number().int().min(2).max(12).default(4),
});

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") ?? "";
  const raw = contentType.includes("application/json")
    ? await req.json()
    : Object.fromEntries(await req.formData());

  const parsed = Body.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  const userId = parsed.data.userId ?? "demo";
  const { skillSlug, statement, weeks } = parsed.data;
  if (!getSkill(skillSlug)) {
    return NextResponse.json({ error: "skill_not_found" }, { status: 404 });
  }

  await prisma.identityStatement.create({
    data: { userId, skillSlug, statement, weeks },
  });

  if (contentType.includes("application/json")) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.redirect(new URL(`/skills/${skillSlug}`, req.url), { status: 303 });
}
