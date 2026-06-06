"use client";

import { useState } from "react";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { PHASES, type CasePhase } from "@/lib/case-clinic";

/**
 * Interactive walkthrough for a single case clinic session.
 *
 * Holds the current phase locally + a notes dict, posts {action:"advance"}
 * to /api/case-clinic on each phase transition. Solo mode shows an
 * AI-coach bubble per phase with phase-appropriate facilitation copy.
 */
interface Props {
  clinicId: string;
  isSolo: boolean;
  caseText: string;
  keyQuestion?: string;
  initialPhase?: CasePhase;
}

export function CaseClinicWalkthrough({
  clinicId,
  isSolo,
  caseText,
  keyQuestion,
  initialPhase = "setup",
}: Props) {
  const [phase, setPhase] = useState<CasePhase>(initialPhase);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [advancing, setAdvancing] = useState(false);

  const currentIndex = PHASES.findIndex((p) => p.phase === phase);
  const def = PHASES[currentIndex];

  async function advance() {
    setAdvancing(true);
    try {
      const res = await fetch("/api/case-clinic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "advance",
          clinicId,
          notes: { [phase]: notes[phase] ?? "" },
        }),
      });
      const data = await res.json();
      if (data.clinic?.phase) {
        setPhase(data.clinic.phase as CasePhase);
      }
    } finally {
      setAdvancing(false);
    }
  }

  if (phase === "done") {
    return (
      <Card variant="filled" className="border-l-4 border-primary">
        <CardTitle>Runde geschlossen.</CardTitle>
        <CardBody>
          <p>
            Du hast einen konkreten nächsten Schritt formuliert. Schreib ihn dir auf — und
            kümmer dich, dass jemand erfährt, wenn du ihn gemacht hast.
          </p>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <PhaseTimeline currentPhase={phase} />

      <Card variant="filled">
        <span className="font-mono text-label-sm text-primary">FALL</span>
        <p className="text-body-md mt-1">{caseText}</p>
        {keyQuestion && (
          <>
            <hr className="my-3 border-outline-variant" />
            <span className="font-mono text-label-sm text-primary">SCHLÜSSELFRAGE</span>
            <p className="text-body-lg font-serif mt-1">{keyQuestion}</p>
          </>
        )}
      </Card>

      <Card variant="outlined" className="space-y-4">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-label-sm text-primary">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="font-serif text-title-lg text-on-surface">{def.label}</span>
          </div>
          <div className="flex items-center gap-2">
            <Chip tone="neutral">{def.who}</Chip>
            <Chip tone="clay">{def.durationMinutes} Min</Chip>
          </div>
        </div>
        <p className="text-body-md text-on-surface-muted">{def.description}</p>

        {isSolo && (
          <div className="bg-primary-container rounded-sm p-4 space-y-2">
            <span className="font-mono text-label-sm text-primary-on-container">AI-MODERATION</span>
            <ul className="text-body-md text-primary-on-container space-y-1 list-disc pl-5">
              {def.prompts.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        )}

        <label className="block">
          <span className="block text-label-md text-on-surface mb-1">Notizen / Antworten</span>
          <textarea
            value={notes[phase] ?? ""}
            onChange={(e) => setNotes({ ...notes, [phase]: e.target.value })}
            rows={4}
            placeholder="Halte fest, was in dieser Phase passiert ist."
            className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md focus:outline-none focus:border-primary"
          />
        </label>

        <Button onClick={advance} disabled={advancing} variant="filled">
          {advancing ? "Übergebe …" : "Nächste Phase"}
        </Button>
      </Card>
    </div>
  );
}

function PhaseTimeline({ currentPhase }: { currentPhase: CasePhase }) {
  return (
    <ol className="flex items-center gap-1 overflow-x-auto pb-2">
      {PHASES.slice(0, -1).map((p, i) => {
        const currentIndex = PHASES.findIndex((x) => x.phase === currentPhase);
        const isPast = i < currentIndex;
        const isActive = p.phase === currentPhase;
        return (
          <li key={p.phase} className="flex items-center gap-1 shrink-0">
            <div
              className={`px-3 py-1 rounded-sm text-label-sm whitespace-nowrap ${
                isActive
                  ? "bg-primary text-primary-on"
                  : isPast
                    ? "bg-primary-container text-primary-on-container"
                    : "bg-surface-container text-on-surface-muted"
              }`}
            >
              {String(i + 1).padStart(2, "0")} · {p.label}
            </div>
            {i < PHASES.length - 2 && <span className="text-on-surface-muted">›</span>}
          </li>
        );
      })}
    </ol>
  );
}
