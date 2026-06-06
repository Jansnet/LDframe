import { notFound } from "next/navigation";
import { getSkill, listSkills } from "@/content/registry";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { PhaseStepper } from "@/components/ui/PhaseStepper";
import { ExerciseCard } from "@/components/skills/ExerciseCard";
import { LevelPicker } from "@/components/skills/LevelPicker";
import { prisma } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import { t } from "@/lib/i18n";

export function generateStaticParams() {
  return listSkills().map((s) => ({ slug: s.slug }));
}

export const dynamic = "force-dynamic";

export default async function SkillPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();

  const userId = await getSessionUserId().catch(() => "demo");
  const existing = await prisma.skillLevel
    .findUnique({ where: { userId_skillSlug: { userId, skillSlug: slug } } })
    .catch(() => null);

  return (
    <div className="space-y-10">
      <header className="space-y-3 max-w-3xl">
        <Chip tone="clay" className="text-label-sm uppercase">
          {skill.category}
        </Chip>
        <h1 className="font-serif text-display-md text-on-surface">{t(skill.name)}</h1>
        <p className="text-body-lg text-on-surface-muted">{t(skill.definition)}</p>
        <div className="flex flex-wrap gap-1.5 pt-2">
          {skill.megatrendTags.map((tag) => (
            <Chip key={tag} tone="neutral">#{tag}</Chip>
          ))}
        </div>
      </header>

      <section className="bg-surface-container rounded-lg p-4">
        <PhaseStepper current="foundation" />
      </section>

      {/* Self-positioning — only shown when the skill has L1-L4 anchors. */}
      {skill.levelAnchors && (
        <section>
          <div className="mb-4 max-w-3xl">
            <h2 className="font-serif text-headline-md text-on-surface mb-1">Wo stehst du gerade?</h2>
            <p className="text-body-md text-on-surface-muted">
              Vier Stufen mit konkreten Anhaltspunkten — aus der Außen- und Innensicht. Wähl die,
              die sich am ehrlichsten anfühlt. Du kannst dich jederzeit umpositionieren.
            </p>
          </div>
          <LevelPicker
            skillSlug={skill.slug}
            initialLevel={existing?.level}
            initialRationale={existing?.rationale ?? undefined}
            anchors={skill.levelAnchors}
          />
        </section>
      )}

      {/* Analogies */}
      <section>
        <h2 className="font-serif text-headline-md text-on-surface mb-4">Analogien & Metaphern</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skill.analogies.map((a) => (
            <Card key={a.id} variant="filled">
              <CardTitle>{t(a.title)}</CardTitle>
              <CardBody>
                <p>{t(a.body)}</p>
                {a.limits && (
                  <p className="mt-3 border-t border-outline-variant pt-3 text-body-md italic">
                    <span className="font-medium text-on-surface not-italic">Wo die Analogie bricht: </span>
                    {t(a.limits)}
                  </p>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* Foundation */}
      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-serif text-headline-md text-on-surface">Foundation — Wissensbasis</h2>
          <span className="text-label-lg text-on-surface-muted">{skill.foundation.length} Module</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skill.foundation.map((f) => (
            <Card key={f.id} variant="outlined">
              <div className="flex items-center justify-between mb-2">
                <Chip tone="neutral">{f.kind}</Chip>
                <span className="font-mono text-label-sm text-on-surface-muted">
                  {f.readingMinutes} Min
                </span>
              </div>
              <CardTitle>{t(f.title)}</CardTitle>
              <CardBody>
                <p className="whitespace-pre-wrap">{t(f.body)}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* Exercises — only when authored. Stub skills surface anchors only. */}
      {skill.exercises.length > 0 && (
        <section>
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="font-serif text-headline-md text-on-surface">Exploration & Application — Übungen</h2>
            <span className="text-label-lg text-on-surface-muted">{skill.exercises.length} Übungen</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {skill.exercises.map((ex) => (
              <ExerciseCard key={ex.id} exercise={ex} />
            ))}
          </div>
        </section>
      )}

      {skill.status === "stub" && (
        <section className="rounded-lg border border-dashed border-outline-variant p-6 max-w-3xl">
          <h2 className="font-serif text-title-lg text-on-surface mb-2">Übungen in Vorbereitung</h2>
          <p className="text-body-md text-on-surface">
            Anker, Definition und Coach für diesen Skill sind aus der Recherche fertig — Übungen,
            Analogien und ausführliche Foundation-Module werden Skill für Skill ergänzt. Bis
            dahin kannst du dich oben positionieren und mit dem Coach (rechts unten) konkret
            an einer Situation arbeiten.
          </p>
        </section>
      )}

      {/* Integration: Checklists + Habits */}
      {(skill.checklists.length > 0 || skill.habits.length > 0) && (
        <section>
          <h2 className="font-serif text-headline-md text-on-surface mb-4">Integration — in den Alltag</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {skill.checklists.map((c) => (
              <Card key={c.id} variant="filled">
                <CardTitle>{t(c.title)}</CardTitle>
                <CardBody>
                  <p className="text-body-md italic mb-3 text-on-surface-muted">{t(c.context)}</p>
                  <ul className="space-y-1.5">
                    {c.items.map((it, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="font-mono text-clay-700">☐</span>
                        <span>{t(it)}</span>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            ))}
            {skill.habits.map((h) => (
              <Card key={h.id} variant="outlined">
                <div className="flex items-center gap-2 mb-2">
                  <Chip tone="rust">Habit</Chip>
                  <Chip tone="neutral">{h.cadence}</Chip>
                </div>
                <CardBody>
                  <p>
                    <span className="font-medium text-on-surface">Wenn </span>
                    {t(h.trigger)},
                  </p>
                  <p>
                    <span className="font-medium text-on-surface">dann </span>
                    {t(h.action)}.
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>
      )}

      {skill.status !== "stub" && (
        <section className="bg-primary-container rounded-lg p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-title-lg text-primary-on-container mb-1">Bereit, mit diesem Skill zu starten?</h3>
            <p className="text-body-md text-primary-on-container/80">
              Formuliere zuerst deine Identity Statement — was du in 4 Wochen über dich sagen willst.
              Der AI-Coach kennt den Satz und nutzt ihn in jeder Reflexion.
            </p>
          </div>
          <a href={`/skills/${skill.slug}/start-cycle`}>
            <Button variant="filled">Zyklus starten</Button>
          </a>
        </section>
      )}
    </div>
  );
}
