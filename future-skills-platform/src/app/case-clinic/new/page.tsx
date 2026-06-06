"use client";

import { useState } from "react";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";

/**
 * /case-clinic/new — facilitator-led live session creator.
 *
 * Captures case + key question + max participants, creates the clinic,
 * and surfaces the join code + shareable link. Anyone with the link can
 * join as a consultant. The creator becomes owner + facilitator.
 */
export default function NewCaseClinicPage() {
  const [caseText, setCaseText] = useState("");
  const [keyQuestion, setKeyQuestion] = useState("");
  const [maxParticipants, setMaxParticipants] = useState(5);
  const [created, setCreated] = useState<{ id: string; joinCode: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  async function create() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/case-clinic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "start",
          isSolo: false,
          caseText: caseText.trim(),
          keyQuestion: keyQuestion.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? "Fehler beim Anlegen.");
        return;
      }
      const data = await res.json();
      if (data.clinic?.id && data.clinic.joinCode) {
        setCreated({ id: data.clinic.id, joinCode: data.clinic.joinCode });
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function copyLink() {
    if (!created) return;
    const link = `${window.location.origin}/case-clinic/join?code=${created.joinCode}`;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (created) {
    const link = typeof window !== "undefined"
      ? `${window.location.origin}/case-clinic/join?code=${created.joinCode}`
      : `/case-clinic/join?code=${created.joinCode}`;
    return (
      <div className="space-y-8 max-w-2xl">
        <header>
          <Chip tone="clay">Live-Runde</Chip>
          <h1 className="font-serif text-display-md text-on-surface mt-2">
            Die Runde ist offen. Lade jetzt 2–5 Personen ein.
          </h1>
          <p className="text-body-lg text-on-surface-muted mt-3">
            Schick den Link in eurem Chat oder per Mail — und gib die Personen 5 Minuten Zeit,
            beizutreten, bevor du startest.
          </p>
        </header>

        <Card variant="filled">
          <CardTitle>Join-Code</CardTitle>
          <CardBody>
            <p className="font-mono text-display-md text-primary text-center my-4 tracking-widest">
              {created.joinCode}
            </p>
            <p className="font-mono text-body-md text-on-surface-muted break-all">{link}</p>
            <div className="flex gap-3 mt-4">
              <Button variant="filled" onClick={copyLink}>
                {copied ? "Kopiert!" : "Link in Zwischenablage"}
              </Button>
              <a href={`/case-clinic/live/${created.id}`}>
                <Button variant="tonal">Zur Moderation</Button>
              </a>
            </div>
          </CardBody>
        </Card>

        <Card variant="outlined">
          <CardTitle>Hinweis an die Geladenen</CardTitle>
          <CardBody>
            <p>
              „Ich starte eine kollegiale Fallberatung — 6 Phasen, 40 Minuten. Brauche 2–5
              Berater:innen. Trete bitte unter dem Link bei, dann starten wir um …"
            </p>
          </CardBody>
        </Card>
      </div>
    );
  }

  const canCreate = caseText.trim().length > 30 && !submitting;

  return (
    <div className="space-y-8 max-w-2xl">
      <header className="space-y-3">
        <Chip tone="clay">Live mit Peers</Chip>
        <h1 className="font-serif text-display-md text-on-surface">
          Welche Situation bringst du in die Runde?
        </h1>
        <p className="text-body-lg text-on-surface-muted">
          Du wirst Fallgeber:in und Moderation gleichzeitig — das funktioniert für die
          ersten Runden gut. Später könnt ihr die Rollen tauschen.
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
            placeholder="Letzten Dienstag im Steering-Meeting ..."
            className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md focus:outline-none focus:border-primary"
          />
        </label>
      </Card>

      <Card variant="outlined">
        <label className="block">
          <span className="font-mono text-label-sm text-primary">OPTIONAL</span>
          <span className="block font-serif text-title-lg text-on-surface mt-1 mb-3">
            Schlüsselfrage (kannst du auch in Phase 2 formulieren).
          </span>
          <input
            value={keyQuestion}
            onChange={(e) => setKeyQuestion(e.target.value)}
            placeholder="Was hat mich an der Stelle wirklich gehindert ...?"
            className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md focus:outline-none focus:border-primary"
          />
        </label>
      </Card>

      <Card variant="outlined">
        <label className="block">
          <span className="font-mono text-label-sm text-primary">GRUPPENGRÖSSE</span>
          <span className="block font-serif text-title-lg text-on-surface mt-1 mb-3">
            Maximale Teilnehmerzahl (du eingeschlossen)
          </span>
          <select
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(Number(e.target.value))}
            className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md"
          >
            <option value={3}>3 — sehr klein</option>
            <option value={4}>4 — kompakt</option>
            <option value={5}>5 — gut moderierbar</option>
            <option value={6}>6 — Obergrenze</option>
          </select>
        </label>
      </Card>

      {error && <p className="text-body-md text-rust-700">{error}</p>}

      <Button onClick={create} disabled={!canCreate} variant="filled">
        {submitting ? "Lege Runde an …" : "Live-Runde anlegen"}
      </Button>
    </div>
  );
}
