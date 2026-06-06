import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { PHASE_ORDER, nextPhase, type CasePhase } from "@/lib/case-clinic";
import { awardBadgeIfFirst } from "@/lib/gentle-gamification";

export const runtime = "nodejs";

const StartBody = z.object({
  userId: z.string().optional(),
  isSolo: z.boolean().default(true),
  skillSlug: z.string().optional(),
  caseText: z.string().min(20),
  keyQuestion: z.string().optional(),
});

const AdvanceBody = z.object({
  userId: z.string().optional(),
  clinicId: z.string(),
  notes: z.record(z.unknown()).optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userId = body.userId ?? "demo";

  if (body.action === "start") {
    const parsed = StartBody.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "invalid_body" }, { status: 400 });
    const { isSolo, skillSlug, caseText, keyQuestion } = parsed.data;
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
      },
    });
    return NextResponse.json({ clinic });
  }

  if (body.action === "advance") {
    const parsed = AdvanceBody.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "invalid_body" }, { status: 400 });
    const { clinicId, notes } = parsed.data;
    const clinic = await prisma.caseClinic.findUnique({ where: { id: clinicId } });
    if (!clinic) return NextResponse.json({ error: "not_found" }, { status: 404 });

    const next = nextPhase(clinic.phase as CasePhase);
    const isFinal = next === "done";
    const updated = await prisma.caseClinic.update({
      where: { id: clinicId },
      data: {
        phase: next,
        notes: notes
          ? { ...((clinic.notes as object | null) ?? {}), [clinic.phase]: notes }
          : clinic.notes ?? undefined,
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

  return NextResponse.json({ error: "unknown_action" }, { status: 400 });
}
