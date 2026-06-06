import Link from "next/link";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { SkillRadar, type RadarDatum } from "@/components/snapshot/SkillRadar";
import { listSkills } from "@/content/registry";
import { t } from "@/lib/i18n";

/**
 * /snapshot — quarterly self-positioning snapshot.
 *
 * Deliberately NOT on the home page, NOT in the plan view, NOT a dashboard
 * KPI. Lives here because radar-as-dashboard-KPI is the empirically
 * documented Skill-Radar Anti-Pattern (anchoring on self-rating, eye candy
 * without behavior backing).
 *
 * This page is meaningful once per quarter — a calm, considered look at
 * where you've positioned yourself, what behavior evidence you've actually
 * captured, and what shifted vs. the previous snapshot.
 */
export default async function SnapshotPage() {
  const skills = listSkills();

  // Demo seed data — production wires this to SkillLevel + previous snapshot.
  const data: RadarDatum[] = skills.map((s, i) => ({
    label: t(s.name),
    level: 2 + (i % 2),       // current
    previousLevel: 1 + (i % 2), // previous quarter — shown as faded shape
  }));

  return (
    <div className="space-y-10">
      <header className="space-y-3 max-w-3xl">
        <Chip tone="clay">Quartals-Snapshot</Chip>
        <h1 className="font-serif text-display-md text-on-surface">
          Wo stehst du, gegenüber vor drei Monaten?
        </h1>
        <p className="text-body-lg text-on-surface-muted">
          Eine ruhige Übersicht — nicht für jeden Tag, sondern für den Moment, in dem du dich
          ehrlich fragst „bewegt sich was?". Faded ist dein letzter Snapshot, voll deine
          aktuelle Selbstpositionierung.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-6 items-center">
        <div className="flex justify-center">
          <SkillRadar data={data} />
        </div>
        <div className="space-y-4">
          <Card variant="filled">
            <CardTitle>Was du hier siehst</CardTitle>
            <CardBody>
              <p>
                Jede Achse ist ein Skill, jede Ringstufe eine Level-Position
                (L1 — gehört, L4 — kann es anderen beibringen). Die zwei Formen
                übereinander: vor 3 Monaten vs. heute.
              </p>
            </CardBody>
          </Card>
          <Card variant="outlined">
            <CardTitle>Was du hier NICHT siehst</CardTitle>
            <CardBody>
              <p>
                Eine Punktzahl. Ein Ranking. Einen Hinweis, ob du „besser" bist als
                jemand anders. Das wäre die falsche Frage — und würde dich vom echten
                Skill-Aufbau wegtreiben.
              </p>
            </CardBody>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-headline-md text-on-surface mb-4">Was die Position trägt</h2>
        <p className="text-body-md text-on-surface-muted mb-4 max-w-2xl">
          Die Form basiert auf deiner Selbstpositionierung — sie wird tragfähig erst durch das,
          was du tatsächlich produziert und reflektiert hast.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card variant="filled">
            <span className="font-mono text-label-sm text-primary">Q3 2026</span>
            <p className="font-serif text-display-md text-on-surface mt-1">14</p>
            <p className="text-body-md text-on-surface-muted">Artefakte erstellt</p>
          </Card>
          <Card variant="filled">
            <span className="font-mono text-label-sm text-primary">Q3 2026</span>
            <p className="font-serif text-display-md text-on-surface mt-1">2</p>
            <p className="text-body-md text-on-surface-muted">Zyklen abgeschlossen</p>
          </Card>
          <Card variant="filled">
            <span className="font-mono text-label-sm text-primary">Q3 2026</span>
            <p className="font-serif text-display-md text-on-surface mt-1">8</p>
            <p className="text-body-md text-on-surface-muted">Reflexionen geschrieben</p>
          </Card>
          <Card variant="filled">
            <span className="font-mono text-label-sm text-primary">Q3 2026</span>
            <p className="font-serif text-display-md text-on-surface mt-1">1</p>
            <p className="text-body-md text-on-surface-muted">Fallberatung geöffnet</p>
          </Card>
        </div>
      </section>

      <section>
        <Card variant="outlined">
          <CardTitle>Nächster Schritt</CardTitle>
          <CardBody>
            <p>
              Snapshot ist eine Pause. Nimm dir 10 Minuten, um zu beantworten:{" "}
              <strong className="text-on-surface">Welcher der drei Skills</strong> hat sich
              am meisten verschoben? Und warum gerade der?{" "}
              <Link href="/plan" className="text-primary underline">Zurück zum Plan</Link>.
            </p>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}
