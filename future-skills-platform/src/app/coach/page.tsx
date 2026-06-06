import Link from "next/link";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { listSkills } from "@/content/registry";
import { t } from "@/lib/i18n";

/**
 * /coach — the gallery of skill-specific coach personas.
 *
 * Each card is a stand-alone "this coach knows this skill" preview. The
 * actual chat lives in the floating Coach pane (bottom-right). Stub skills
 * have only a placeholder coach until exercises are written; they are
 * collapsed below the published coaches so this page rewards the work that's
 * done rather than burying it.
 */
export default function CoachPage() {
  const skills = listSkills();
  const published = skills.filter((s) => s.status === "published");
  const stubs = skills.filter((s) => s.status === "stub");

  return (
    <div className="space-y-10">
      <header className="max-w-2xl">
        <h1 className="font-serif text-display-md text-on-surface mb-3">Skill-Coach</h1>
        <p className="text-body-lg text-on-surface-muted">
          Pro Skill eine eigene Persona: kennt die Übungen, die Definition, dein aktives
          Identity Statement und deine letzten Artefakte. Stellt eher Rückfragen, als zu
          belehren. Du erreichst den Coach jederzeit unten rechts.
        </p>
      </header>

      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-serif text-headline-md text-on-surface">Voll ausgearbeitet</h2>
          <Chip tone="neutral" className="text-label-sm">{published.length} Personas</Chip>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {published.map((s) => (
            <Link key={s.slug} href={`/skills/${s.slug}`} className="block">
              <Card variant="outlined" interactive className="h-full flex flex-col">
                <Chip tone="primary" className="self-start mb-2 text-label-sm">
                  Coach: {t(s.name)}
                </Chip>
                <CardBody className="flex-1">
                  <p className="italic text-on-surface">„{t(s.coach.persona)}"</p>
                  <div className="mt-4 space-y-1.5">
                    {s.coach.suggestedPrompts.slice(0, 3).map((p, i) => (
                      <div
                        key={i}
                        className="rounded-sm bg-surface-container p-2 text-body-md"
                      >
                        {t(p)}
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {stubs.length > 0 && (
        <section>
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="font-serif text-headline-md text-on-surface">In Vorbereitung</h2>
            <Chip tone="neutral" className="text-label-sm">{stubs.length} Skills</Chip>
          </div>
          <p className="text-body-md text-on-surface-muted mb-4 max-w-2xl">
            Für diese Skills sind die L1–L4-Anker fertig — die volle Coach-Persona, Übungen
            und Foundation-Module entstehen Skill für Skill. Du kannst dich bereits
            positionieren und im Floating-Coach mit der Standard-Persona reden.
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {stubs.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/skills/${s.slug}`}
                  className="state-layer inline-flex items-center gap-1.5 rounded-full border border-dashed border-outline-variant px-3 h-8 text-label-md text-on-surface-muted hover:border-primary"
                >
                  {t(s.name)}
                  <span className="font-mono text-label-sm text-primary/70">Anker</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
