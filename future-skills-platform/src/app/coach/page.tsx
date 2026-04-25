import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { listSkills } from "@/content/registry";
import { t } from "@/lib/i18n";

export default function CoachPage() {
  const skills = listSkills();
  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <h1 className="font-serif text-display-md text-on-surface mb-3">Skill-Coach</h1>
        <p className="text-body-lg text-on-surface-muted">
          Der Coach ist auf jeden Skill spezialisiert — er übernimmt eine eigene Persona, kennt die
          Übungen und hilft dir, sie auf deine reale Arbeit zu übertragen. Er gibt bewusst kurze
          Antworten und stellt oft eine Rückfrage, statt direkt zu belehren.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skills.map((s) => (
          <Card key={s.slug} variant="outlined" className="flex flex-col">
            <Chip tone="primary" className="self-start mb-2 text-label-sm">
              Coach: {t(s.name)}
            </Chip>
            <CardBody className="flex-1">
              <p className="italic text-on-surface">&ldquo;{t(s.coach.persona)}&rdquo;</p>
              <div className="mt-4 space-y-1.5">
                {s.coach.suggestedPrompts.slice(0, 3).map((p, i) => (
                  <div
                    key={i}
                    className="state-layer rounded-sm bg-surface-container p-2 text-body-md"
                  >
                    {t(p)}
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
