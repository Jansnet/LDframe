"use client";

import { useState } from "react";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";

/**
 * /manager-loop — the 90-second update generator.
 *
 * Opt-in. Pre-fills subject + body from real artefacts and the active
 * Identity Statement. The user can edit before sending. Output is a
 * mailto: link (zero infra, works everywhere) plus copy-to-clipboard.
 *
 * Design rule: no "skill rating" appears in the mail. The manager learns
 * what's moving and what one thing might help — that's all the loop needs.
 */
export default function ManagerLoopPage() {
  const [skillSlug, setSkillSlug] = useState("kritisches-denken");
  const [managerName, setManagerName] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [ask, setAsk] = useState("");
  const [subject, setSubject] = useState<string | null>(null);
  const [body, setBody] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generate() {
    setGenerating(true);
    try {
      const res = await fetch("/api/manager-loop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillSlug, managerName: managerName || undefined, ask, locale: "de" }),
      });
      const data = await res.json();
      setSubject(data.subject);
      setBody(data.body);
    } finally {
      setGenerating(false);
    }
  }

  const mailto = subject && body
    ? `mailto:${encodeURIComponent(managerEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    : "#";

  async function copy() {
    if (!body) return;
    await navigator.clipboard.writeText(`${subject}\n\n${body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-10 max-w-2xl">
      <header className="space-y-3">
        <Chip tone="clay">Manager-Loop</Chip>
        <h1 className="font-serif text-display-md text-on-surface">
          90 Sekunden für deine Führungskraft.
        </h1>
        <p className="text-body-lg text-on-surface-muted">
          Knapp, ehrlich, mit einer konkreten Bitte. Wir bauen aus deinen Artefakten dieser
          Woche und deinem aktuellen Zyklus eine Mail — du editierst, du verschickst.
        </p>
      </header>

      <Card variant="outlined" className="space-y-4">
        <label className="block">
          <span className="block text-label-md text-on-surface mb-1">Aktiver Skill</span>
          <select
            value={skillSlug}
            onChange={(e) => setSkillSlug(e.target.value)}
            className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md"
          >
            <option value="kritisches-denken">Kritisches Denken</option>
            <option value="resilienz">Resilienz</option>
            <option value="ai-literacy">AI Literacy</option>
          </select>
        </label>

        <div className="grid md:grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-label-md text-on-surface mb-1">Vorname deiner Führungskraft</span>
            <input
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
              placeholder="z.B. Lena"
              className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md"
            />
          </label>
          <label className="block">
            <span className="block text-label-md text-on-surface mb-1">E-Mail (optional, für mailto:)</span>
            <input
              type="email"
              value={managerEmail}
              onChange={(e) => setManagerEmail(e.target.value)}
              placeholder="lena@firma.de"
              className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md"
            />
          </label>
        </div>

        <label className="block">
          <span className="block text-label-md text-on-surface mb-1">
            Eine konkrete Bitte
          </span>
          <textarea
            value={ask}
            onChange={(e) => setAsk(e.target.value)}
            rows={3}
            placeholder="z.B. „Beobachte mich beim nächsten Steering, ob ich vor Zustimmung die Verständnisfrage stelle — 5 Minuten Feedback danach reichen."
            className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md"
          />
          <p className="text-body-md text-on-surface-muted italic mt-2">
            Ohne konkrete Bitte ist die Mail Performance-Theater. Das ist die Hälfte des Werts.
          </p>
        </label>

        <Button onClick={generate} disabled={ask.trim().length < 5 || generating} variant="filled">
          {generating ? "Baue Mail …" : "90-Sek-Update bauen"}
        </Button>
      </Card>

      {subject && body && (
        <Card variant="filled" className="space-y-4">
          <CardTitle>Vorschau</CardTitle>
          <div>
            <span className="font-mono text-label-sm text-primary block">BETREFF</span>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md mt-1"
            />
          </div>
          <div>
            <span className="font-mono text-label-sm text-primary block">TEXT</span>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={12}
              className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md font-mono mt-1"
            />
          </div>
          <div className="flex gap-3">
            <a href={mailto}>
              <Button variant="filled">Mail-Programm öffnen</Button>
            </a>
            <Button variant="tonal" onClick={copy}>
              {copied ? "Kopiert!" : "In Zwischenablage kopieren"}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
