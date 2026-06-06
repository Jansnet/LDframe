import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { awardBadgeIfFirst } from "@/lib/gentle-gamification";
import { getSessionUserId } from "@/lib/auth";

export const runtime = "nodejs";

/**
 * Close out an identity-based cycle.
 *
 * Takes the user's re-formulated sentence and a final round of behavior
 * evidence (3 concrete situations). Marks the IdentityStatement fulfilled,
 * captures evidence at cycleStage="closing", and awards the
 * identity_fulfilled + cycle_completed badges.
 *
 * Deliberately NOT a Likert "rate yourself 1-5 again" — that would
 * collapse the whole cycle into the very anti-pattern we replaced.
 */
const Body = z.object({
  identityStatementId: z.string(),
  refinedStatement: z.string().min(10),
  fulfilled: z.boolean(),
  situations: z
    .array(z.object({ context: z.string().min(5), action: z.string().min(5) }))
    .length(3),
});

export async function POST(req: NextRequest) {
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  const userId = await getSessionUserId();
  const { identityStatementId, refinedStatement, fulfilled, situations } = parsed.data;

  const original = await prisma.identityStatement.findUnique({
    where: { id: identityStatementId },
  });
  if (!original) return NextResponse.json({ error: "not_found" }, { status: 404 });

  await prisma.$transaction([
    prisma.identityStatement.update({
      where: { id: identityStatementId },
      data: {
        fulfilled,
        closedAt: new Date(),
        // Keep the original statement intact; refined goes into a new row so
        // history is preserved and the side-by-side comparison stays honest.
      },
    }),
    prisma.identityStatement.create({
      data: {
        userId,
        skillSlug: original.skillSlug,
        statement: refinedStatement,
        weeks: original.weeks,
        startedAt: new Date(),
        fulfilled: false,
      },
    }),
    prisma.behaviorEvidence.create({
      data: {
        userId,
        skillSlug: original.skillSlug,
        situations: situations as object,
        cycleStage: "closing",
      },
    }),
  ]);

  try {
    if (fulfilled) {
      await awardBadgeIfFirst(userId, "identity_fulfilled", { identityStatementId });
    }
    await awardBadgeIfFirst(userId, "cycle_completed", { identityStatementId });
  } catch {
    /* swallow */
  }

  return NextResponse.json({ ok: true });
}
