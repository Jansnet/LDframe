import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";

export const runtime = "nodejs";

const CommitmentInput = z.object({
  memberId: z.string(),  // CircleMember.id
  userId: z.string(),    // for denormalization
  ifClause: z.string().min(3),
  thenClause: z.string().min(3),
  dueBy: z.string(),     // ISO date
});

const Body = z.object({
  scheduledAt: z.string(),   // ISO date
  focusMemberId: z.string().optional(),
  focusUserId: z.string().optional(),
  keyQuestion: z.string().optional(),
  harvestStatement: z.string().optional(),
  notes: z.string().optional(),
  commitments: z.array(CommitmentInput).default([]),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: circleId } = await params;
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  const userId = await getSessionUserId();
  const membership = await prisma.circleMember.findFirst({
    where: { circleId, userId, status: "active" },
    select: { id: true },
  });
  if (!membership) return NextResponse.json({ error: "not_a_member" }, { status: 403 });

  const meeting = await prisma.circleMeeting.create({
    data: {
      circleId,
      scheduledAt: new Date(parsed.data.scheduledAt),
      completedAt: new Date(),
      focusMemberId: parsed.data.focusMemberId,
      focusUserId: parsed.data.focusUserId,
      keyQuestion: parsed.data.keyQuestion,
      harvestStatement: parsed.data.harvestStatement,
      notes: parsed.data.notes,
      commitments: {
        create: parsed.data.commitments.map((c) => ({
          memberId: c.memberId,
          userId: c.userId,
          ifClause: c.ifClause,
          thenClause: c.thenClause,
          dueBy: new Date(c.dueBy),
        })),
      },
    },
    select: { id: true },
  });

  // Bump focusTurnsTaken for the focus member if recorded.
  if (parsed.data.focusMemberId) {
    await prisma.circleMember.update({
      where: { id: parsed.data.focusMemberId },
      data: { focusTurnsTaken: { increment: 1 } },
    });
  }

  return NextResponse.json({ id: meeting.id });
}
