import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSkill } from "@/content/registry";
import { prisma } from "@/lib/db";
import { generatePlan } from "@/lib/plan-engines";

export const runtime = "nodejs";

/**
 * Plan generator — deterministic, LLM-free for the common case.
 *
 * Delegates the actual mixing to src/lib/plan-engines.ts which implements
 * the three backend subsystems (Gap, Coach/Cohort, Artefact/Reflection)
 * that map onto HILL's 7 building blocks without surfacing the names.
 */

const Body = z.object({
  userId: z.string(),
  skillSlug: z.string(),
  weeks: z.number().int().min(2).max(16).default(4),
  hasCohort: z.boolean().default(false),
  hasManager: z.boolean().default(false),
});

export async function POST(req: NextRequest) {
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  const { userId, skillSlug, weeks, hasCohort, hasManager } = parsed.data;
  const skill = getSkill(skillSlug);
  if (!skill) return NextResponse.json({ error: "skill_not_found" }, { status: 404 });

  const items = generatePlan({ skill, weeks, hasCohort, hasManager });

  await prisma.$transaction([
    prisma.planItem.deleteMany({ where: { userId, skillSlug } }),
    prisma.planItem.createMany({
      data: items.map((it) => {
        const phase =
          it.kind === "foundation"
            ? "foundation"
            : it.kind === "exercise"
              ? "exploration"
              : it.kind === "artefact_review" || it.kind === "reflection"
                ? "integration"
                : "application";
        const scheduledFor = new Date();
        scheduledFor.setDate(scheduledFor.getDate() + 7 * it.weekIndex + it.dayOffset);
        return {
          userId,
          skillSlug,
          phase,
          exerciseId: it.exerciseId ?? null,
          scheduledFor,
          status: "todo",
          notes: it.rationale,
        };
      }),
    }),
  ]);

  return NextResponse.json({ items });
}
