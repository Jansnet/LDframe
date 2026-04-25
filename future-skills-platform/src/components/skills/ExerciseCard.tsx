import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Badge } from "@/components/ui/Badge";
import type { Exercise } from "@/content/schema";
import { t, type Locale } from "@/lib/i18n";

const lengthLabel: Record<Exercise["length"], { label: string; tone: "neutral" | "primary" | "clay" | "rust" }> = {
  micro:    { label: "1–3 Min",   tone: "primary" },
  short:    { label: "5–10 Min",  tone: "primary" },
  embedded: { label: "In Aufgabe",tone: "rust" },
  block:    { label: "30–60 Min", tone: "clay" },
  deep:     { label: "2 Std+",    tone: "clay" },
};

export function ExerciseCard({ exercise, locale = "de" }: { exercise: Exercise; locale?: Locale }) {
  const len = lengthLabel[exercise.length];
  return (
    <Card variant="outlined" className="flex flex-col gap-3">
      <div className="flex items-center flex-wrap gap-2">
        <Badge>{exercise.format.replace("_", " ")}</Badge>
        <Chip tone={len.tone}>{len.label}</Chip>
        <Chip tone="neutral">{exercise.phase === "application" ? "Anwendung" : "Exploration"}</Chip>
      </div>
      <CardTitle className="mb-0">{t(exercise.title, locale)}</CardTitle>
      <CardBody>
        <p className="mb-3">{t(exercise.scenario, locale)}</p>

        <h4 className="font-serif text-title-md text-on-surface mt-4 mb-1">Schritte</h4>
        <ol className="list-decimal pl-5 space-y-1">
          {exercise.steps.map((s, i) => (
            <li key={i}>{t(s, locale)}</li>
          ))}
        </ol>

        {exercise.integrationHints.length > 0 && (
          <>
            <h4 className="font-serif text-title-md text-on-surface mt-4 mb-1">
              Wann und wo integrieren
            </h4>
            <ul className="space-y-1.5">
              {exercise.integrationHints.map((h, i) => (
                <li key={i} className="text-body-md">
                  <span className="font-medium text-on-surface">{t(h.when, locale)}</span>
                  <span className="text-on-surface-muted"> — {t(h.how, locale)}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {exercise.reflectionPrompts.length > 0 && (
          <>
            <h4 className="font-serif text-title-md text-on-surface mt-4 mb-1">Reflexion</h4>
            <ul className="list-disc pl-5 space-y-1 italic text-on-surface-muted">
              {exercise.reflectionPrompts.map((p, i) => (
                <li key={i}>{t(p, locale)}</li>
              ))}
            </ul>
          </>
        )}
      </CardBody>
    </Card>
  );
}
