import { notFound } from "next/navigation";
import { getSkill, listSkills } from "@/content/registry";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { t } from "@/lib/i18n";

/**
 * /skills/[slug]/start-cycle — the identity-statement anchor.
 *
 * After choosing a skill, the user formulates the sentence they want to be
 * able to say about themselves at the end of the cycle. This is the
 * urgency-and-agency anchor (HILL block 1+2) and steers the AI coach,
 * the plan view, and the closing reflection.
 *
 * It's deliberately not optional. Without an identity statement, the plan
 * has no horizon — and the empirical literature is unanimous that
 * identity-based framing beats skill-description for behavior change.
 */
export function generateStaticParams() {
  return listSkills().map((s) => ({ slug: s.slug }));
}

export default async function StartCyclePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();

  return (
    <div className="space-y-10 max-w-2xl">
      <header className="space-y-3">
        <Chip tone="primary">Zyklus starten</Chip>
        <h1 className="font-serif text-display-md text-on-surface">
          In vier Wochen sagst du über dich …
        </h1>
        <p className="text-body-lg text-on-surface-muted">
          Formuliere den Satz, den du am Ende des Zyklus über dich sagen können möchtest.
          Identity statt Skill — empirisch der stärkere Anker für Verhaltensveränderung.
        </p>
      </header>

      <Card variant="filled">
        <CardTitle>Skill: {t(skill.name)}</CardTitle>
        <CardBody>
          <p className="italic">{t(skill.definition)}</p>
        </CardBody>
      </Card>

      <form action="/api/identity-statement" method="post" className="space-y-6">
        <input type="hidden" name="skillSlug" value={skill.slug} />

        <Card variant="outlined">
          <label className="block">
            <span className="font-mono text-label-sm text-primary">SATZ</span>
            <span className="block font-serif text-title-lg text-on-surface mt-1 mb-3">
              „Ich bin jemand, der/die …"
            </span>
            <textarea
              name="statement"
              required
              minLength={10}
              rows={3}
              placeholder="… vor einer Zustimmung kurz prüft, was die andere Person eigentlich meint."
              className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md focus:outline-none focus:border-primary"
            />
            <p className="text-body-md text-on-surface-muted italic mt-2">
              Konkret, beobachtbar, in deinen Worten. Keine Floskel.
            </p>
          </label>
        </Card>

        <Card variant="outlined">
          <label className="block">
            <span className="font-mono text-label-sm text-primary">DAUER</span>
            <span className="block font-serif text-title-lg text-on-surface mt-1 mb-3">
              Über wie viele Wochen?
            </span>
            <select
              name="weeks"
              defaultValue={4}
              className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md focus:outline-none focus:border-primary"
            >
              <option value={2}>2 Wochen — Mini-Zyklus</option>
              <option value={4}>4 Wochen — Standard</option>
              <option value={6}>6 Wochen — für tiefere Skills</option>
              <option value={8}>8 Wochen — vollständige Routinen-Veränderung</option>
            </select>
          </label>
        </Card>

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" variant="filled">
            Zyklus starten
          </Button>
          <a href={`/skills/${skill.slug}`} className="text-body-md text-on-surface-muted underline">
            Zurück zur Skill-Seite
          </a>
        </div>
      </form>

      <Card variant="filled">
        <CardTitle>Was passiert dann?</CardTitle>
        <CardBody>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Plan wird generiert — bewusst gemischt aus Mikro- und Embedded-Übungen, mit Reflexions-Slots.</li>
            <li>Der AI-Coach kennt deinen Satz — und nutzt ihn in jeder Reflexion.</li>
            <li>Am Ende des Zyklus formulierst du den Satz erneut: ist er für dich jetzt wahr?</li>
          </ol>
        </CardBody>
      </Card>
    </div>
  );
}
