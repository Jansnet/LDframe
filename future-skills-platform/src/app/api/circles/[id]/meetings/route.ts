import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";

export const runtime = "nodejs";

const DateOnly = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Expected YYYY-MM-DD");

/** Parse a YYYY-MM-DD date string as noon UTC — preserves calendar date across viewer time zones. */
function toMiddayUtc(dateOnly: string): Date {
  return new Date(dateOnly + "T12:00:00.000Z");
}

const CommitmentInput = z.object({
  memberId: z.string(),  // CircleMember.id — must belong to this circle
  userId: z.string(),    // for denormalization — must equal CircleMember.userId
  ifClause: z.string().min(3),
  thenClause: z.string().min(3),
  dueBy: DateOnly,
});

const Body = z.object({
  scheduledAt: DateOnly,
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

  // Load the full membership list once — used both for the auth check and to
  // verify every member-reference in the payload (focusMemberId, commitments)
  // points at someone actually in this circle.
  const members = await prisma.circleMember.findMany({
    where: { circleId, status: "active" },
    select: { id: true, userId: true },
  });
  const requester = members.find((m) => m.userId === userId);
  if (!requester) {
    return NextResponse.json({ error: "not_a_member" }, { status: 403 });
  }

  const memberIds = new Set(members.map((m) => m.id));
  const memberUserIds = new Map(members.map((m) => [m.id, m.userId]));

  if (parsed.data.focusMemberId && !memberIds.has(parsed.data.focusMemberId)) {
    return NextResponse.json({ error: "focus_not_in_circle" }, { status: 400 });
  }
  if (
    parsed.data.focusMemberId &&
    parsed.data.focusUserId &&
    memberUserIds.get(parsed.data.focusMemberId) !== parsed.data.focusUserId
  ) {
    return NextResponse.json({ error: "focus_id_mismatch" }, { status: 400 });
  }
  for (const c of parsed.data.commitments) {
    if (!memberIds.has(c.memberId)) {
      return NextResponse.json({ error: "commitment_not_in_circle" }, { status: 400 });
    }
    if (memberUserIds.get(c.memberId) !== c.userId) {
      return NextResponse.json({ error: "commitment_id_mismatch" }, { status: 400 });
    }
  }

  const meeting = await prisma.circleMeeting.create({
    data: {
      circleId,
      scheduledAt: toMiddayUtc(parsed.data.scheduledAt),
      // The MVP logs meetings after the fact; we don't capture the actual end
      // time. completedAt mirrors scheduledAt so future "when did this happen"
      // queries (streaks, cadence health) use the meeting date rather than the
      // moment the user got around to filling out the form.
      completedAt: toMiddayUtc(parsed.data.scheduledAt),
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
          dueBy: toMiddayUtc(c.dueBy),
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
