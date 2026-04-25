import { NextRequest, NextResponse } from "next/server";
import { Skill } from "@/content/schema";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

/**
 * Org-authoring endpoint: accept a skill definition (YAML converted to JSON
 * upstream, or direct JSON) and store as CustomSkill scoped to the calling
 * organization.
 *
 * Auth is enforced by upstream middleware. The endpoint itself validates
 * against the Zod Skill schema — the same schema the built-in skills use.
 */

export async function POST(req: NextRequest) {
  const organizationId = req.headers.get("x-organization-id");
  if (!organizationId) return NextResponse.json({ error: "missing_organization" }, { status: 401 });

  const body = await req.json();
  const parsed = Skill.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", details: parsed.error.format() },
      { status: 422 },
    );
  }

  const skill = parsed.data;

  await prisma.customSkill.upsert({
    where: { organizationId_slug: { organizationId, slug: skill.slug } },
    update: { content: skill, category: skill.category },
    create: { organizationId, slug: skill.slug, category: skill.category, content: skill },
  });

  return NextResponse.json({ ok: true, slug: skill.slug });
}

export async function GET(req: NextRequest) {
  const organizationId = req.headers.get("x-organization-id");
  if (!organizationId) return NextResponse.json({ error: "missing_organization" }, { status: 401 });

  const skills = await prisma.customSkill.findMany({
    where: { organizationId },
    select: { slug: true, category: true },
    orderBy: { slug: "asc" },
  });
  return NextResponse.json({ skills });
}
