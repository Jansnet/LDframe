import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import { CaseClinicWalkthrough } from "@/components/case-clinic/Walkthrough";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import type { CasePhase } from "@/lib/case-clinic";

/**
 * /case-clinic/live/[id] — shared walkthrough view.
 *
 * Renders the same component as solo mode, but with livePolling=true and
 * youAreFacilitator derived from the session user. Consultants see the
 * same phase + key question, but cannot drive transitions.
 */
export default async function LiveCaseClinicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [clinic, userId] = await Promise.all([
    prisma.caseClinic
      .findUnique({
        where: { id },
        include: { participants: { include: { user: { select: { id: true, name: true } } } } },
      })
      .catch(() => null),
    getSessionUserId().catch(() => "demo"),
  ]);
  if (!clinic) notFound();

  const youAreFacilitator = clinic.facilitatorId === userId;
  const consultantCount = clinic.participants.filter((p) => p.role !== "owner").length;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <Chip tone={youAreFacilitator ? "primary" : "clay"}>
            {youAreFacilitator ? "Moderation" : "Beratung"}
          </Chip>
          <h1 className="font-serif text-headline-lg text-on-surface mt-2">
            Live-Runde
          </h1>
        </div>
        <Card variant="outlined" className="text-body-md">
          <CardBody>
            <p>
              <strong>{clinic.participants.length}</strong>{" "}
              Teilnehmer:in{clinic.participants.length === 1 ? "" : "nen"} ·{" "}
              <strong>{consultantCount}</strong> Berater:innen
            </p>
            {clinic.joinCode && (
              <p className="font-mono text-label-sm text-on-surface-muted mt-1">
                Code: {clinic.joinCode}
              </p>
            )}
          </CardBody>
        </Card>
      </header>

      <CaseClinicWalkthrough
        clinicId={clinic.id}
        isSolo={false}
        caseText={clinic.caseText}
        keyQuestion={clinic.keyQuestion ?? undefined}
        initialPhase={clinic.phase as CasePhase}
        youAreFacilitator={youAreFacilitator}
        livePolling
      />

      {!youAreFacilitator && (
        <Card variant="filled">
          <CardTitle>Deine Rolle</CardTitle>
          <CardBody>
            <p>
              Du bist Berater:in. Halte dich an die Phase-Disziplin — in den ersten Phasen
              nur Fragen, keine Lösungen. Die Moderation kündigt jede Phase an, du siehst sie
              automatisch wechseln.
            </p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
