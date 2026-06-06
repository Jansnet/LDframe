"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";

/**
 * /start — the gentle on-ramp.
 *
 * Two questions, no skill catalog yet. Charmant, kurz. The user can always
 * skip to the atlas or to a skill discovery view from the sidebar.
 *
 * We deliberately do NOT call this "diagnosis" or "assessment" — those
 * words trigger evaluation anxiety. It's framed as "tell me what's going
 * on, I'll suggest where to start."
 */
type Suggestion = { skillSlug: string; confidence: number; rationale: string };

export default function StartPage() {
  const [situation, setSituation] = useState("");
  const [intent, setIntent] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/gap-engine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          situation: situation.trim(),
          intent: intent.trim(),
          locale: "de",
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? "Etwas ist schiefgegangen.");
        return;
      }
      const data = await res.json();
      setSuggestions(data.suggestions ?? []);
    } catch (e) {
      setError("Netzwerkfehler. Versuch es nochmal.");
    } finally {
      setLoading(false);
    }
  }

  const canSubmit = situation.trim().length > 5 && intent.trim().length > 5 && !loading;

  if (suggestions) return <SuggestionsView suggestions={suggestions} />;

  return (
    <div className="space-y-10 max-w-2xl">
      <header>
        <h1 className="font-serif text-display-md text-on-surface mb-3">
          Zwei Fragen — und ich höre genauer hin.
        </h1>
        <p className="text-body-lg text-on-surface-muted">
          Keine Skala, kein Quiz. Zwei Fragen, ehrlich beantwortet, und ich schlage dir
          2–3 Skills vor, an denen sich diese Woche etwas zu bewegen lohnt. Lieber direkt
          stöbern? <Link href="/" className="text-primary underline">Skill-Atlas</Link>.
        </p>
      </header>

      <div className="space-y-6">
        <Question
          number="01"
          label="Was hattest du dir für diese Woche vorgenommen, was nicht passiert ist — und was hat stattdessen passiert?"
          hint="Beide Seiten der Frage zählen. Die „Stattdessen“-Seite zeigt oft, wofür du wirklich Zeit hattest."
          value={situation}
          onChange={setSituation}
        />
        <Question
          number="02"
          label="Wann hat diese Woche etwas funktioniert, von dem du dachtest, es würde nicht — und was hast du genau anders gemacht?"
          hint="Eine konkrete Szene reicht. „Anders gemacht“ ist der wichtige Teil — nicht „Glück gehabt“."
          value={intent}
          onChange={setIntent}
        />
      </div>

      {error && (
        <p className="text-body-md text-rust-700">{error}</p>
      )}

      <div className="flex items-center gap-3 pt-2">
        <Button onClick={submit} disabled={!canSubmit}>
          {loading ? "Schlage Skills vor …" : "Skill-Vorschläge ansehen"}
        </Button>
        <Link href="/" className="text-body-md text-on-surface-muted underline">
          Überspringen — zum Atlas
        </Link>
      </div>

      <SideAffordances />
    </div>
  );
}

function Question({
  number,
  label,
  hint,
  value,
  onChange,
}: {
  number: string;
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Card variant="filled">
      <div className="flex items-baseline gap-3 mb-2">
        <span className="font-mono text-label-sm text-primary">{number}</span>
        <label className="font-serif text-title-lg text-on-surface">{label}</label>
      </div>
      <p className="text-body-md text-on-surface-muted italic mb-3">{hint}</p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md focus:outline-none focus:border-primary"
        placeholder="In deinen Worten ..."
      />
    </Card>
  );
}

function SuggestionsView({ suggestions }: { suggestions: Suggestion[] }) {
  return (
    <div className="space-y-10 max-w-2xl">
      <header>
        <h1 className="font-serif text-display-md text-on-surface mb-3">
          Drei Skills, die zu deiner Situation passen.
        </h1>
        <p className="text-body-lg text-on-surface-muted">
          Pro Vorschlag steht, warum er zu deiner Antwort passt. Wähle einen — oder schau dir
          alternative Skills im{" "}
          <Link href="/" className="text-primary underline">Atlas</Link> an. Du bist nicht
          festgelegt.
        </p>
      </header>

      <div className="space-y-4">
        {suggestions.map((s, i) => (
          <Card key={s.skillSlug} variant="elevated" interactive>
            <div className="flex items-baseline justify-between mb-2">
              <span className="font-mono text-label-sm text-on-surface-muted">
                Vorschlag {String(i + 1).padStart(2, "0")}
              </span>
              <Chip tone={s.confidence > 0.6 ? "primary" : "neutral"}>
                Passung {Math.round(s.confidence * 100)} %
              </Chip>
            </div>
            <CardTitle>{s.skillSlug}</CardTitle>
            <CardBody>
              <p>{s.rationale}</p>
            </CardBody>
            <div className="mt-4 flex gap-3">
              <Link href={`/skills/${s.skillSlug}`}>
                <Button variant="filled" size="sm">Mit diesem Skill starten</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      <SideAffordances />
    </div>
  );
}

function SideAffordances() {
  return (
    <aside className="pt-8 border-t border-outline-variant">
      <Link href="/" className="state-layer rounded-sm p-4 bg-surface-container block max-w-md">
        <p className="font-serif text-title-md text-on-surface">Lieber in Ruhe stöbern?</p>
        <p className="text-body-md text-on-surface-muted mt-1">
          Skill-Atlas mit allen Skills, Analogien und Definitionen.
        </p>
      </Link>
    </aside>
  );
}
