"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";

/**
 * Artefact capture form — kind-specific UI for the four artefact kinds.
 *
 * Submits to /api/exercise-attempt, which is the hard gate: no exercise
 * "done" without an artefact. The form deliberately won't enable the
 * submit button until the user has captured something substantive.
 */

type Kind = "journal" | "checklist" | "list" | "structured";

interface Props {
  skillSlug: string;
  exerciseId: string;
  kind: Kind;
  fields?: string[]; // for structured artefacts
  checklistItems?: string[]; // for checklist artefacts
}

export function ArtefactCapture({ skillSlug, exerciseId, kind, fields, checklistItems }: Props) {
  const [state, setState] = useState<Record<string, unknown>>({});
  const [reflection, setReflection] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const hasContent = (() => {
    if (kind === "journal") return typeof state.text === "string" && state.text.trim().length > 20;
    if (kind === "list") return Array.isArray(state.items) && (state.items as string[]).filter(Boolean).length >= 2;
    if (kind === "checklist")
      return Array.isArray(state.ticked) && (state.ticked as boolean[]).some(Boolean);
    if (kind === "structured")
      return Object.keys(state).length > 0 && Object.values(state).every((v) => typeof v === "string" && v.length > 0);
    return false;
  })();

  async function submit() {
    setStatus("saving");
    setError(null);
    try {
      const res = await fetch("/api/exercise-attempt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skillSlug,
          exerciseId,
          reflection: reflection.trim() || undefined,
          artefact: { kind, content: state },
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? "Konnte nicht gespeichert werden.");
        setStatus("error");
        return;
      }
      setStatus("saved");
    } catch {
      setError("Netzwerkfehler.");
      setStatus("error");
    }
  }

  if (status === "saved") {
    return (
      <Card variant="filled" className="border-l-4 border-primary">
        <CardTitle>Artefakt gespeichert.</CardTitle>
        <CardBody>
          <p>
            Übung als erledigt verbucht. Der AI-Coach hat es mitbekommen — sieh in der
            nächsten Reflexion vorbei.
          </p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card variant="outlined" className="space-y-5">
      <div>
        <CardTitle>Artefakt erfassen</CardTitle>
        <p className="text-body-md text-on-surface-muted">
          Eine Übung ist erst dann „erledigt", wenn etwas Greifbares dabei rausgekommen ist.
          Kein Schummeln durch leere Eingaben — der Submit-Button bleibt sonst aus.
        </p>
      </div>

      {kind === "journal" && <Journal state={state} setState={setState} />}
      {kind === "list" && <ListCapture state={state} setState={setState} />}
      {kind === "checklist" && <ChecklistCapture state={state} setState={setState} items={checklistItems ?? []} />}
      {kind === "structured" && <Structured state={state} setState={setState} fields={fields ?? []} />}

      <div>
        <label className="block text-label-md text-on-surface mb-2">
          Optional: kurze Reflexion (1–2 Sätze)
        </label>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          rows={2}
          placeholder="Was hat dich überrascht, was war anders als erwartet?"
          className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md focus:outline-none focus:border-primary"
        />
      </div>

      {error && <p className="text-body-md text-rust-700">{error}</p>}

      <Button onClick={submit} disabled={!hasContent || status === "saving"} variant="filled">
        {status === "saving" ? "Speichere …" : "Artefakt speichern & Übung abschließen"}
      </Button>
    </Card>
  );
}

function Journal({ state, setState }: { state: Record<string, unknown>; setState: (s: Record<string, unknown>) => void }) {
  return (
    <textarea
      value={(state.text as string) ?? ""}
      onChange={(e) => setState({ ...state, text: e.target.value })}
      rows={6}
      placeholder="Was ist passiert, was hast du gemacht, was war der Effekt? In deinen Worten."
      className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md focus:outline-none focus:border-primary"
    />
  );
}

function ListCapture({ state, setState }: { state: Record<string, unknown>; setState: (s: Record<string, unknown>) => void }) {
  const items = (state.items as string[]) ?? ["", "", ""];
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <input
          key={i}
          value={item}
          onChange={(e) => {
            const next = [...items];
            next[i] = e.target.value;
            setState({ ...state, items: next });
          }}
          placeholder={`Eintrag ${i + 1}`}
          className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md focus:outline-none focus:border-primary"
        />
      ))}
      <button
        type="button"
        onClick={() => setState({ ...state, items: [...items, ""] })}
        className="text-body-md text-primary underline"
      >
        + Eintrag hinzufügen
      </button>
    </div>
  );
}

function ChecklistCapture({
  state,
  setState,
  items,
}: {
  state: Record<string, unknown>;
  setState: (s: Record<string, unknown>) => void;
  items: string[];
}) {
  const ticked = (state.ticked as boolean[]) ?? items.map(() => false);
  return (
    <ul className="space-y-2">
      {items.map((label, i) => (
        <li key={i}>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={ticked[i] ?? false}
              onChange={(e) => {
                const next = [...ticked];
                next[i] = e.target.checked;
                setState({ ...state, ticked: next });
              }}
              className="w-5 h-5 accent-primary"
            />
            <span className="text-body-md">{label}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

function Structured({
  state,
  setState,
  fields,
}: {
  state: Record<string, unknown>;
  setState: (s: Record<string, unknown>) => void;
  fields: string[];
}) {
  return (
    <div className="space-y-3">
      {fields.map((field) => (
        <label key={field} className="block">
          <span className="block text-label-md text-on-surface mb-1">{field}</span>
          <textarea
            value={(state[field] as string) ?? ""}
            onChange={(e) => setState({ ...state, [field]: e.target.value })}
            rows={2}
            className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md focus:outline-none focus:border-primary"
          />
        </label>
      ))}
    </div>
  );
}
