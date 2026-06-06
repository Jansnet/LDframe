import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSkill } from "@/content/registry";
import { awardBadgeIfFirst, bumpStreak } from "@/lib/gentle-gamification";

export const runtime = "nodejs";

/**
 * Mark an exercise attempt as completed.
 *
 * Hard rule: no "done" without an artefact. The artefact can be a journal
 * paragraph, a checklist with ticks, a structured form — whatever the
 * exercise's `artefact.kind` declares — but something must be captured.
 *
 * This is the operationalisation of HILL block 5 (Action & Knowledge
 * Sharing) and block 7 (Assessment as Learning) in the data layer.
 * Also feeds the artefact streak and badge ladder.
 */

const Body = z.object({
  userId: z.string().optional(),
  skillSlug: z.string(),
  exerciseId: z.string(),
  reflection: z.string().optional(),
  artefact: z.object({
    kind: z.enum(["journal", "checklist", "list", "structured"]),
    content: z.any(),
  }),
});

export async function POST(req: NextRequest) {
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_body", hint: "An artefact is required to complete an exercise." },
      { status: 400 },
    );
  }
  const userId = parsed.data.userId ?? "demo";
  const { skillSlug, exerciseId, reflection, artefact } = parsed.data;
  const skill = getSkill(skillSlug);
  if (!skill) return NextResponse.json({ error: "skill_not_found" }, { status: 404 });
  const exercise = skill.exercises.find((e) => e.id === exerciseId);
  if (!exercise) return NextResponse.json({ error: "exercise_not_found" }, { status: 404 });

  // Validate the artefact kind matches what the exercise expects, if declared.
  if (exercise.artefact && exercise.artefact.kind !== artefact.kind) {
    return NextResponse.json(
      { error: "artefact_kind_mismatch", expected: exercise.artefact.kind },
      { status: 400 },
    );
  }

  const [attempt, savedArtefact] = await prisma.$transaction([
    prisma.exerciseAttempt.create({
      data: {
        userId,
        skillSlug,
        exerciseId,
        artefact: artefact.content,
        reflection,
        completedAt: new Date(),
      },
    }),
    prisma.artefact.create({
      data: {
        userId,
        skillSlug,
        exerciseId,
        kind: artefact.kind,
        content: artefact.content,
      },
    }),
  ]);

  // Gentle gamification — non-blocking even if it fails.
  try {
    await bumpStreak(userId, "artefact_weekly");
    await awardBadgeIfFirst(userId, "first_artefact", { skillSlug, exerciseId });
  } catch {
    /* swallow — gamification must never block the core flow */
  }

  return NextResponse.json({ ok: true, attemptId: attempt.id, artefactId: savedArtefact.id });
}
