import { notFound } from "next/navigation";
import Link from "next/link";
import { getSkill, listSkills } from "@/content/registry";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { LevelPicker } from "@/components/skills/LevelPicker";
import { prisma } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import { t } from "@/lib/i18n";

/**
 * /skills/[slug]/discover — the "what's actually going on?" deep dive.
 *
 * Reframes the skill from the user's side: what is it, where does it show up
 * in your day, what does it feel like at four levels of mastery. Pre-loads
 * the user's current self-positioning so it's not a fresh form every time.
 */
export function generateStaticParams() {
  return listSkills().map((s) => ({ slug: s.slug }));
}

export const dynamic = "force-dynamic";

export default async function DiscoverPage({ params }: { params: Promise<{ slug: string }> }) {
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
              Typische Situationen findest du in den{" "}
              <strong className="text-on-surface">Analogien</strong> und 12 Übungen mit
              konkreten Integration-Hinweisen auf der{" "}
              <Link href={`/skills/${skill.slug}`} className="text-primary underline">
                Skill-Seite
              </Link>
              .
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
        <LevelPicker
          skillSlug={skill.slug}
          initialLevel={existing?.level}
          initialRationale={existing?.rationale ?? undefined}
          anchors={skill.levelAnchors}
        />
      </section>

      <section className="bg-primary-container rounded-lg p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-title-lg text-primary-on-container mb-1">
            Bereit für den nächsten Schritt?
          </h3>
          <p className="text-body-md text-primary-on-container/80">
            Wenn der Skill für dich passt, starte den 4-Wochen-Zyklus mit einer eigenen
            Identity Statement.
          </p>
        </div>
        <Link href={`/skills/${skill.slug}/start-cycle`}>
          <Button variant="filled">Zyklus starten</Button>
        </Link>
      </section>
    </div>
  );
}
