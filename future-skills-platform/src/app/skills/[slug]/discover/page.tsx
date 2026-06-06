import { notFound } from "next/navigation";
import Link from "next/link";
import { getSkill, listSkills } from "@/content/registry";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { t } from "@/lib/i18n";

/**
 * /skills/[slug]/discover — the "what's actually going on?" deep dive.
 *
 * Reframes the skill from the user's side: what is it, where does it show up
 * in your day, what does it feel like at four levels of mastery (heard-of →
 * basics → regular use → can teach). Light self-positioning, no quiz.
 */
export function generateStaticParams() {
  return listSkills().map((s) => ({ slug: s.slug }));
}

const LEVELS = [
  { level: 1, label: "Hab mal davon gehört", desc: "Du erkennst den Begriff, kannst aber nicht sicher sagen, was er konkret im Arbeitsalltag heißt." },
  { level: 2, label: "Kann es grundsätzlich", desc: "Du kannst den Skill in entspannten Situationen anwenden, fällst aber unter Druck zurück in alte Muster." },
  { level: 3, label: "Wende es regelmäßig an", desc: "Der Skill ist in deinem Repertoire — auch unter Stress, im Konflikt, im Meeting mit Senior-Stakeholdern." },
  { level: 4, label: "Kann es anderen beibringen", desc: "Du erkennst, wenn andere am Skill scheitern, kannst es benennen ohne zu beschämen, und führst andere weiter." },
];

export default async function DiscoverPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();

  return (
    <div className="space-y-10">
      <header className="space-y-3 max-w-3xl">
        <Chip tone="clay">{skill.category}</Chip>
        <h1 className="font-serif text-display-md text-on-surface">
          {t(skill.name)} — was geht da eigentlich ab?
        </h1>
        <p className="text-body-lg text-on-surface-muted">
          Eine ehrliche Selbstpositionierung in 3 Minuten. Kein Quiz, kein Score. Du wählst
          das Level, das sich am ehrlichsten anfühlt — und siehst direkt, was an dieser
          Stelle für dich der nächste Schritt wäre.
        </p>
      </header>

      <section>
        <h2 className="font-serif text-headline-md text-on-surface mb-4">Worum es geht</h2>
        <Card variant="filled">
          <CardBody>
            <p className="text-body-lg">{t(skill.definition)}</p>
            <hr className="my-4 border-outline-variant" />
            <p className="text-body-md">
              Typische Situationen, in denen dieser Skill aktiv wird, findest du in den{" "}
              <strong className="text-on-surface">Analogien</strong> auf der{" "}
              <Link href={`/skills/${skill.slug}`} className="text-primary underline">Skill-Seite</Link>{" "}
              — und in den 12 Übungen mit konkreten „Wann und wo integrieren"-Hinweisen.
            </p>
          </CardBody>
        </Card>
      </section>

      <section>
        <h2 className="font-serif text-headline-md text-on-surface mb-2">Wo stehst du gerade?</h2>
        <p className="text-body-md text-on-surface-muted mb-5 max-w-2xl">
          Vier Stufen, locker — auch das richtige ist „Hab davon gehört", wenn das gerade
          ehrlich ist. Du kannst dich jederzeit umpositionieren.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {LEVELS.map((lvl) => (
            <LevelCard key={lvl.level} skillSlug={skill.slug} level={lvl.level} label={lvl.label} desc={lvl.desc} />
          ))}
        </div>
      </section>

      <section className="bg-primary-container rounded-lg p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-title-lg text-primary-on-container mb-1">Bereit für den nächsten Schritt?</h3>
          <p className="text-body-md text-primary-on-container/80">
            Wenn der Skill für dich passt, starte den 4-Wochen-Zyklus mit einer eigenen
            Identity Statement.
          </p>
        </div>
        <Link href={`/skills/${skill.slug}`}>
          <Button variant="filled">Mit diesem Skill starten</Button>
        </Link>
      </section>
    </div>
  );
}

function LevelCard({ skillSlug, level, label, desc }: { skillSlug: string; level: number; label: string; desc: string }) {
  // POST to /api/skill-level would go through a client wrapper; for now keep server-rendered
  // and provide a form. Wire actual persistence when auth is in place.
  return (
    <Card variant="outlined">
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-mono text-label-sm text-primary">L{level}</span>
        <Chip tone="neutral">Selbsteinordnung</Chip>
      </div>
      <CardTitle className="mb-1">{label}</CardTitle>
      <CardBody>
        <p>{desc}</p>
      </CardBody>
      <form action="/api/skill-level" method="post" className="mt-4">
        <input type="hidden" name="skillSlug" value={skillSlug} />
        <input type="hidden" name="level" value={level} />
        <Button variant="tonal" size="sm" type="submit">
          Da bin ich gerade
        </Button>
      </form>
    </Card>
  );
}
