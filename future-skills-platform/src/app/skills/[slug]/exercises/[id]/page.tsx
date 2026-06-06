import { notFound } from "next/navigation";
import Link from "next/link";
import { getSkill, listSkills } from "@/content/registry";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { ArtefactCapture } from "@/components/exercises/ArtefactCapture";
import { t } from "@/lib/i18n";

export function generateStaticParams() {
  return listSkills().flatMap((s) =>
    s.exercises.map((e) => ({ slug: s.slug, id: e.id })),
  );
}

export default async function ExerciseDetailPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();
  const exercise = skill.exercises.find((e) => e.id === id);
  if (!exercise) notFound();

  const artefactKind = exercise.artefact?.kind ?? "journal";
  const checklistItems =
    artefactKind === "checklist"
      ? (exercise.steps ?? []).map((step) => t(step))
      : undefined;

  return (
    <div className="space-y-10">
      <nav className="text-body-md text-on-surface-muted">
        <Link href={`/skills/${skill.slug}`} className="text-primary underline">
          {t(skill.name)}
        </Link>
        <span className="mx-2">›</span>
        <span>Übung</span>
      </nav>

      <header className="space-y-3 max-w-3xl">
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone="primary">{exercise.phase}</Chip>
          <Chip tone="clay">{exercise.length}</Chip>
          <Chip tone="neutral">{exercise.format}</Chip>
        </div>
        <h1 className="font-serif text-display-md text-on-surface">{t(exercise.title)}</h1>
        <p className="text-body-lg text-on-surface-muted">{t(exercise.scenario)}</p>
      </header>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card variant="filled">
            <CardTitle>Anleitung</CardTitle>
            <CardBody>
              <ol className="list-decimal pl-5 space-y-2">
                {(exercise.steps ?? []).map((step, i) => (
                  <li key={i}>{t(step)}</li>
                ))}
              </ol>
            </CardBody>
          </Card>

          {exercise.integrationHints && exercise.integrationHints.length > 0 && (
            <Card variant="outlined">
              <CardTitle>Wann und wo in deinen Tag einbauen</CardTitle>
              <CardBody>
                <ul className="space-y-2">
                  {exercise.integrationHints.map((hint, i) => (
                    <li key={i}>
                      <strong className="text-on-surface">{t(hint.when)}: </strong>
                      <span>{t(hint.how)}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          )}

          <Card variant="filled">
            <CardTitle>Erwartetes Ergebnis</CardTitle>
            <CardBody>
              <p className="italic">{t(exercise.expected)}</p>
            </CardBody>
          </Card>

          {exercise.reflectionPrompts && (
            <Card variant="outlined">
              <CardTitle>Nach der Übung kurz hinschauen</CardTitle>
              <CardBody>
                <ul className="list-disc pl-5 space-y-1 italic">
                  {exercise.reflectionPrompts.map((p, i) => (
                    <li key={i}>{t(p)}</li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          )}
        </div>

        <aside className="space-y-4">
          <Card variant="filled">
            <CardTitle>Erwartetes Artefakt</CardTitle>
            <CardBody>
              <p>
                <Chip tone="primary">{artefactKind}</Chip>
              </p>
              <p className="mt-3 italic">
                Diese Übung gilt erst als erledigt, wenn ein Artefakt von dieser Art erfasst ist.
              </p>
            </CardBody>
          </Card>
          {exercise.peerExchange && (
            <Card variant="outlined">
              <CardTitle>Optional: Peer-Austausch</CardTitle>
              <CardBody>
                <p>{t(exercise.peerExchange.prompt)}</p>
                <p className="text-body-md text-on-surface-muted mt-2">
                  Ab {exercise.peerExchange.minGroupSize} Personen.
                </p>
              </CardBody>
            </Card>
          )}
        </aside>
      </section>

      <section>
        <ArtefactCapture
          skillSlug={skill.slug}
          exerciseId={exercise.id}
          kind={artefactKind}
          fields={exercise.artefact?.fields}
          checklistItems={checklistItems}
        />
      </section>
    </div>
  );
}
