"use client";

import { useState, use } from "react";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";

/**
 * /skills/[slug]/close-cycle — the honest closing ritual.
 *
 * Shows the original Identity Statement next to a re-formulation field.
 * Asks for 3 concrete situations from the past 2 weeks that show the
 * shift (or its absence) — behavior evidence, not Likert.
 *
 * This is where the cycle's promise becomes accountable. No "celebrate
 * you finished!" theater — just a quiet, structured comparison.
 */
export default function CloseCyclePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [refined, setRefined] = useState("");
  const [fulfilled, setFulfilled] = useState<boolean | null>(null);
  const [sits, setSits] = useState([
    { context: "", action: "" },
    { context: "", action: "" },
    { context: "", action: "" },
  ]);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  // Demo: in production we'd fetch the active IdentityStatement for skill+user.
  const original =
    "Ich bin jemand, der/die vor einer Zustimmung kurz prüft, was die andere Person eigentlich meint.";
  const identityStatementId = "demo-id";

  const canSubmit =
    refined.trim().length > 10 &&
    fulfilled !== null &&
    sits.every((s) => s.context.length > 5 && s.action.length > 5) &&
    !saving;

  async function submit() {
    setSaving(true);
    try {
      const res = await fetch("/api/identity-close", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identityStatementId,
          refinedStatement: refined.trim(),
          fulfilled,
          situations: sits,
        }),
      });
      if (res.ok) setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  if (saved) {
    return (
      <Card variant="filled" className="border-l-4 border-primary">
        <CardTitle>Zyklus abgeschlossen.</CardTitle>
        <CardBody>
          <p>
            Dein neuer Satz ist gespeichert, die Evidenz erfasst. Du kannst jetzt einen
            neuen Zyklus für denselben Skill starten — oder zu einem anderen Skill wechseln.
          </p>
          <div className="mt-4 flex gap-3">
            <a href={`/skills/${slug}`}><Button variant="filled">Zurück zum Skill</Button></a>
            <a href="/snapshot"><Button variant="tonal">Quartals-Snapshot ansehen</Button></a>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="space-y-10 max-w-2xl">
      <header className="space-y-3">
        <Chip tone="clay">Zyklus-Abschluss</Chip>
        <h1 className="font-serif text-display-md text-on-surface">
          Ist der Satz für dich jetzt wahr?
        </h1>
        <p className="text-body-lg text-on-surface-muted">
          Keine Bewertung, keine Punktzahl. Nur die ehrliche Frage: wo bist du gelandet —
          und woran zeigt sich das?
        </p>
      </header>

      <Card variant="filled" className="border-l-4 border-primary">
        <span className="font-mono text-label-sm text-primary">DEIN SATZ VON VORHER</span>
        <p className="font-serif text-title-lg text-on-surface mt-1">„{original}"</p>
      </Card>

      <Card variant="outlined">
        <span className="font-mono text-label-sm text-primary">FORMULIERE IHN NEU</span>
        <p className="font-serif text-title-lg text-on-surface mt-1 mb-3">
          Wie würdest du den Satz heute über dich sagen?
        </p>
        <textarea
          value={refined}
          onChange={(e) => setRefined(e.target.value)}
          rows={3}
          placeholder="„Ich bin jemand, der/die …"
          className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md focus:outline-none focus:border-primary"
        />
      </Card>

      <Card variant="outlined">
        <span className="font-mono text-label-sm text-primary">DREI SITUATIONEN</span>
        <p className="font-serif text-title-lg text-on-surface mt-1 mb-3">
          Wann ist dir das in den letzten zwei Wochen begegnet? Drei konkrete Szenen.
        </p>
        <div className="space-y-4">
          {sits.map((s, i) => (
            <div key={i} className="space-y-2">
              <div className="font-mono text-label-sm text-on-surface-muted">SITUATION {i + 1}</div>
              <input
                value={s.context}
                onChange={(e) => {
                  const next = [...sits];
                  next[i] = { ...next[i], context: e.target.value };
                  setSits(next);
                }}
                placeholder="Kontext (z.B. Steering-Meeting, Kunden-Call ...)"
                className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md"
              />
              <textarea
                value={s.action}
                onChange={(e) => {
                  const next = [...sits];
                  next[i] = { ...next[i], action: e.target.value };
                  setSits(next);
                }}
                rows={2}
                placeholder="Was hast du konkret gemacht — anders als früher?"
                className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md"
              />
            </div>
          ))}
        </div>
      </Card>

      <Card variant="filled">
        <span className="font-mono text-label-sm text-primary">EHRLICHE EINSCHÄTZUNG</span>
        <p className="font-serif text-title-lg text-on-surface mt-1 mb-3">
          Ist der ursprüngliche Satz für dich jetzt wahr?
        </p>
        <div className="flex gap-3">
          <Button
            variant={fulfilled === true ? "filled" : "tonal"}
            onClick={() => setFulfilled(true)}
          >
            Ja, weitgehend
          </Button>
          <Button
            variant={fulfilled === false ? "filled" : "tonal"}
            onClick={() => setFulfilled(false)}
          >
            Noch nicht — und das ist ok
          </Button>
        </div>
      </Card>

      <Button onClick={submit} disabled={!canSubmit} variant="filled">
        {saving ? "Schließe Zyklus …" : "Zyklus abschließen"}
      </Button>
    </div>
  );
}
