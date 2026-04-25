import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { listSkills } from "@/content/registry";
import { t } from "@/lib/i18n";

export default function AssessmentPage() {
  const skills = listSkills();

  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <h1 className="font-serif text-display-md text-on-surface mb-3">Self-Assessment</h1>
        <p className="text-body-lg text-on-surface-muted">
          Schnelles Check-in pro Skill. Wähle 2–3 Skills aus, für die du einen Plan bauen willst.
          Das Assessment dauert etwa 5 Minuten pro Skill.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {skills.map((s) => (
          <Card key={s.slug} variant="filled" className="flex flex-col">
            <Chip tone="clay" className="self-start mb-2 text-label-sm">
              {s.category}
            </Chip>
            <CardTitle>{t(s.name)}</CardTitle>
            <CardBody className="flex-1">
              <p className="text-body-md">{t(s.definition)}</p>
            </CardBody>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-mono text-label-sm text-on-surface-muted">~5 Min</span>
              <Button variant="tonal" size="sm">Starten</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
