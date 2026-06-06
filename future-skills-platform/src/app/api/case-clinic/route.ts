import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { PHASE_ORDER, nextPhase, type CasePhase } from "@/lib/case-clinic";
import { awardBadgeIfFirst } from "@/lib/gentle-gamification";
import { getSessionUserId, newJoinCode } from "@/lib/auth";

export const runtime = "nodejs";

const StartBody = z.object({
  action: z.literal("start"),
  isSolo: z.boolean().default(false),
  skillSlug: z.string().optional(),
  caseText: z.string().min(20),
  keyQuestion: z.string().optional(),
});

const JoinBody = z.object({
  action: z.literal("join"),
  joinCode: z.string().min(4),
});

const AdvanceBody = z.object({
  action: z.literal("advance"),
  clinicId: z.string(),
  notes: z.record(z.string(), z.unknown()).optional(),
});

const StateQuery = z.object({
  action: z.literal("state"),
  clinicId: z.string(),
});

const Body = z.discriminatedUnion("action", [StartBody, JoinBody, AdvanceBody, StateQuery]);

export async function POST(req: NextRequest) {
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  const userId = await getSessionUserId();

  if (parsed.data.action === "start") {
    const { isSolo, skillSlug, caseText, keyQuestion } = parsed.data;
    const joinCode = isSolo ? null : newJoinCode();
    const clinic = await prisma.caseClinic.create({
      data: {
        caseOwnerId: userId,
        facilitatorId: userId,
        isSolo,
        skillSlug,
        caseText,
        keyQuestion,
        phase: "setup",
        startedAt: new Date(),
        joinCode,
      },
    });
    // Facilitator joins themselves as the owner participant for symmetry.
    await prisma.caseClinicParticipant.create({
      data: { clinicId: clinic.id, userId, role: "owner" },
    });
    return NextResponse.json({ clinic });
  }

  if (parsed.data.action === "join") {
    const clinic = await prisma.caseClinic.findUnique({
      where: { joinCode: parsed.data.joinCode },
      include: { participants: true },
    });
    if (!clinic) return NextResponse.json({ error: "not_found" }, { status: 404 });
    if (clinic.endedAt) return NextResponse.json({ error: "ended" }, { status: 410 });
    if (clinic.participants.length >= clinic.maxParticipants) {
      return NextResponse.json({ error: "full" }, { status: 409 });
    }
    // Idempotent join — same user gets one row.
    await prisma.caseClinicParticipant.upsert({
      where: { clinicId_userId: { clinicId: clinic.id, userId } },
      create: { clinicId: clinic.id, userId, role: "consultant" },
      update: {},
    });
    return NextResponse.json({ clinic });
  }

  if (parsed.data.action === "advance") {
    const { clinicId, notes } = parsed.data;
    const clinic = await prisma.caseClinic.findUnique({ where: { id: clinicId } });
    if (!clinic) return NextResponse.json({ error: "not_found" }, { status: 404 });
    if (clinic.facilitatorId !== userId) {
      return NextResponse.json({ error: "only_facilitator_can_advance" }, { status: 403 });
    }

    const next = nextPhase(clinic.phase as CasePhase);
    const isFinal = next === "done";
    const updated = await prisma.caseClinic.update({
      where: { id: clinicId },
      data: {
        phase: next,
        notes: (notes
          ? { ...((clinic.notes as object | null) ?? {}), [clinic.phase]: notes }
          : clinic.notes ?? undefined) as Prisma.InputJsonValue | undefined,
        endedAt: isFinal ? new Date() : null,
      },
    });

    if (isFinal) {
      try {
        await awardBadgeIfFirst(userId, "case_clinic_owner", { clinicId });
      } catch {
        /* swallow */
      }
    }

    return NextResponse.json({ clinic: updated, isFinal });
  }

  if (parsed.data.action === "state") {
    const clinic = await prisma.caseClinic.findUnique({
      where: { id: parsed.data.clinicId },
      include: { participants: { include: { user: { select: { id: true, name: true } } } } },
    });
    if (!clinic) return NextResponse.json({ error: "not_found" }, { status: 404 });
    return NextResponse.json({
      clinic,
      youAreFacilitator: clinic.facilitatorId === userId,
    });
  }

  return NextResponse.json({ error: "unknown_action" }, { status: 400 });
}
