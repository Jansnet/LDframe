import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSkill } from "@/content/registry";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

/**
 * Deterministic plan generator — runs without LLM.
 *
 * Given a skill and a week count, it distributes:
 *   - foundation modules across week 1
 *   - exercises across weeks 1..N, mixing lengths (no week has only long exercises)
 *   - application exercises starting week 2 (knowledge first, then real-work)
 *   - integration checklists + habits in the final weeks
 *
 * Pure functions: the LLM-free path is the common case, so we keep it fast,
 * predictable, and easily testable. Users can still ask the AI coach to
 * re-arrange their plan via the chat interface.
 */

const Body = z.object({
  userId: z.string(),
  skillSlug: z.string(),
  weeks: z.number().int().min(2).max(16).default(8),
});

export async function POST(req: NextRequest) {
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  const { userId, skillSlug, weeks } = parsed.data;
  const skill = getSkill(skillSlug);
  if (!skill) return NextResponse.json({ error: "skill_not_found" }, { status: 404 });

  const items = generatePlanItems(skill, weeks);

  await prisma.$transaction([
    prisma.planItem.deleteMany({ where: { userId, skillSlug } }),
    prisma.planItem.createMany({
      data: items.map((it) => ({
        userId,
        skillSlug,
        phase: it.phase,
        exerciseId: it.exerciseId,
        scheduledFor: it.scheduledFor,
        status: "todo",
      })),
    }),
  ]);

  return NextResponse.json({ items });
}

type PlanItem = {
  phase: "foundation" | "exploration" | "application" | "integration";
  exerciseId: string | null;
  scheduledFor: Date;
};

function generatePlanItems(skill: ReturnType<typeof getSkill> & object, weeks: number): PlanItem[] {
  const now = new Date();
  const items: PlanItem[] = [];

  const daysFromNow = (d: number) => {
    const x = new Date(now);
    x.setDate(x.getDate() + d);
    return x;
  };

  // Week 1: foundation
  skill.foundation.forEach((f, i) => {
    items.push({ phase: "foundation", exerciseId: f.id, scheduledFor: daysFromNow(i) });
  });

  // Weeks 1..N-1: mix of exploration + application (start exploration-heavy, ramp up application)
  const exploration = skill.exercises.filter((e) => e.phase === "exploration");
  const application = skill.exercises.filter((e) => e.phase === "application");
  const totalExerciseWeeks = weeks - 1;

  for (let w = 0; w < totalExerciseWeeks; w++) {
    const applicationRatio = w / Math.max(1, totalExerciseWeeks - 1); // 0 → 1 over the weeks
    const explorationPick = exploration[w % Math.max(1, exploration.length)];
    const applicationPick = application[w % Math.max(1, application.length)];
    if (explorationPick && applicationRatio < 0.75) {
      items.push({
        phase: "exploration",
        exerciseId: explorationPick.id,
        scheduledFor: daysFromNow(7 * w + 2),
      });
    }
    if (applicationPick && applicationRatio > 0.25) {
      items.push({
        phase: "application",
        exerciseId: applicationPick.id,
        scheduledFor: daysFromNow(7 * w + 4),
      });
    }
  }

  // Final weeks: integration (checklists + habits surfaced as plan items without an exercise id)
  skill.checklists.forEach((_, i) => {
    items.push({ phase: "integration", exerciseId: null, scheduledFor: daysFromNow(7 * (weeks - 2) + i) });
  });

  return items;
}
