"use client";

import { useState } from "react";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { CaseClinicWalkthrough } from "@/components/case-clinic/Walkthrough";

/**
 * /case-clinic/solo — solo entry point.
 *
 * Captures the case + key question, then drops the user into the
 * 6-phase walkthrough with the AI as facilitator. Persistence happens
 * server-side via /api/case-clinic action=start.
 */
export default function SoloCaseClinicPage() {
  const [caseText, setCaseText] = useState("");
  const [keyQuestion, setKeyQuestion] = useState("");
  const [clinicId, setClinicId] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);

  async function start() {
    setStarting(true);
    try {
      const res = await fetch("/api/case-clinic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "start",
          isSolo: true,
          caseText: caseText.trim(),
          keyQuestion: keyQuestion.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (data.clinic?.id) setClinicId(data.clinic.id);
    } finally {
      setStarting(false);
    }
  }

  if (clinicId) {
    return (
      <div className="space-y-6">
        <header>
          <Chip tone="primary">Solo-Modus</Chip>
          <h1 className="font-serif text-display-md text-on-surface mt-2">
            Sechs Phasen — wir gehen sie jetzt durch.
          </h1>
        </header>
        <CaseClinicWalkthrough
          clinicId={clinicId}
          isSolo
          caseText={caseText}
          keyQuestion={keyQuestion || undefined}
        />
      </div>
    );
  }

  const canStart = caseText.trim().length > 30 && !starting;

  return (
    <div className="space-y-8 max-w-2xl">
      <header className="space-y-3">
        <Chip tone="primary">Solo-Modus</Chip>
        <h1 className="font-serif text-display-md text-on-surface">
          Welche Situation bringst du in die Runde?
        </h1>
        <p className="text-body-lg text-on-surface-muted">
          Konkret, eine Szene, kein abstraktes Problem. Wer war beteiligt, was hat dich
          beschäftigt? Der Coach übernimmt gleich die Moderation.
        </p>
      </header>

      <Card variant="outlined">
        <label className="block">
          <span className="font-mono text-label-sm text-primary">FALLSCHILDERUNG</span>
          <span className="block font-serif text-title-lg text-on-surface mt-1 mb-3">
            Schildere die Situation.
          </span>
          <textarea
            value={caseText}
            onChange={(e) => setCaseText(e.target.value)}
            rows={6}
            placeholder="Letzten Dienstag im Steering-Meeting hab ich der Forecast-Anpassung zugestimmt, obwohl ..."
            className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md focus:outline-none focus:border-primary"
          />
        </label>
      </Card>

      <Card variant="outlined">
        <label className="block">
          <span className="font-mono text-label-sm text-primary">OPTIONAL</span>
          <span className="block font-serif text-title-lg text-on-surface mt-1 mb-3">
            Falls du schon eine Schlüsselfrage hast.
          </span>
          <input
            value={keyQuestion}
            onChange={(e) => setKeyQuestion(e.target.value)}
            placeholder="Was hat mich an der Stelle wirklich gehindert, zu widersprechen?"
            className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md focus:outline-none focus:border-primary"
          />
          <p className="text-body-md text-on-surface-muted italic mt-2">
            Wenn du keine hast — kein Problem. Wir formulieren sie in Phase 2.
          </p>
        </label>
      </Card>

      <Button onClick={start} disabled={!canStart} variant="filled">
        {starting ? "Starte …" : "Solo-Runde starten"}
      </Button>
    </div>
  );
}
