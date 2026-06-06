import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSkill } from "@/content/registry";
import { getSessionUserId } from "@/lib/auth";
import { generatePlan } from "@/lib/plan-engines";

export const runtime = "nodejs";

/**
 * Creating an Identity Statement *is* starting a cycle.
 *
 * Empirically: a plan that doesn't exist at the moment of commitment dies
 * before week 1 begins. So we generate the cycle's PlanItem rows in the
 * same transaction as the IdentityStatement — no second step, no "now
 * generate your plan" friction. The user lands on /plan immediately and
 * the week is already populated.
 */

const Body = z.object({
  skillSlug: z.string(),
  statement: z.string().min(10),
  weeks: z.coerce.number().int().min(2).max(12).default(4),
  // Whether to start in cohort mode — affects the plan mix.
  hasCohort: z.coerce.boolean().default(false),
  hasManager: z.coerce.boolean().default(false),
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
  const userId = await getSessionUserId();
  const { skillSlug, statement, weeks, hasCohort, hasManager } = parsed.data;
  const skill = getSkill(skillSlug);
  if (!skill) {
    return NextResponse.json({ error: "skill_not_found" }, { status: 404 });
  }
  if (skill.status === "stub") {
    return NextResponse.json(
      {
        error: "skill_not_ready",
        detail: "Für diesen Skill liegen die Anker vor, aber die Übungen werden noch geschrieben. Du kannst dich positionieren und den Coach nutzen, einen Zyklus starten geht noch nicht.",
      },
      { status: 409 },
    );
  }

  const planItems = generatePlan({ skill, weeks, hasCohort, hasManager });
  const startedAt = new Date();

  await prisma.$transaction([
    prisma.identityStatement.create({
      data: { userId, skillSlug, statement, weeks, startedAt },
    }),
    // Replace any stale plan items for the same user+skill so re-starting
    // a cycle yields a clean schedule, not a layered mess.
    prisma.planItem.deleteMany({ where: { userId, skillSlug } }),
    prisma.planItem.createMany({
      data: planItems.map((it) => {
        const phase =
          it.kind === "foundation"
            ? "foundation"
            : it.kind === "exercise"
              ? "exploration"
              : it.kind === "artefact_review" || it.kind === "reflection"
                ? "integration"
                : "application";
        const scheduled = new Date(startedAt);
        scheduled.setDate(scheduled.getDate() + 7 * it.weekIndex + it.dayOffset);
        return {
          userId,
          skillSlug,
          phase,
          exerciseId: it.exerciseId ?? null,
          scheduledFor: scheduled,
          status: "todo",
          notes: it.rationale,
        };
      }),
    }),
  ]);

  if (contentType.includes("application/json")) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.redirect(new URL(`/plan`, req.url), { status: 303 });
}
