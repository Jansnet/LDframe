import Link from "next/link";
import { listSkills } from "@/content/registry";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { t } from "@/lib/i18n";

/**
 * /blind-spots — gentle nudge surface.
 *
 * Lists skills the user hasn't self-positioned on yet, with a one-line
 * explanation of why each is often overlooked. No shame, no badges, no
 * urgency. Just "here's where many people don't look".
 *
 * In a fully-wired build this filters against the user's SkillLevel rows
 * and uses their roleText to rank. For the MVP shell we surface all skills
 * with skill-specific overlooked-because notes.
 */
const blindspotNotes: Record<string, string> = {
  "kritisches-denken":
    "Wird oft als ‚das tu ich doch immer' empfunden — und ist trotzdem die häufigste Lücke in Strategie-Meetings.",
  "resilienz":
    "Wird im Stress übersprungen — paradoxerweise genau dann am wichtigsten.",
  "ai-literacy":
    "Wird mit Tool-Bedienung verwechselt. Eigentliche Lücke: Verifizieren und Mensch-im-Loop entscheiden.",
};

export default function BlindSpotsPage() {
  const skills = listSkills();

  return (
    <div className="space-y-10">
      <header className="space-y-3 max-w-3xl">
        <h1 className="font-serif text-display-md text-on-surface">Blinde-Flecken-Finder</h1>
        <p className="text-body-lg text-on-surface-muted">
          Skills, an die viele in deiner Rolle nicht denken — und an denen es sich oft lohnt,
          zu schauen. Kein Pflichtprogramm. Klick rein, wenn dich was anspricht.
        </p>
      </header>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skills.map((s) => {
          const note = blindspotNotes[s.slug];
          return (
            <Card key={s.slug} variant="outlined" className="h-full flex flex-col">
              <div className="flex items-baseline justify-between mb-3">
                <Chip tone="clay">{s.category}</Chip>
                <span className="font-mono text-label-sm text-on-surface-muted">
                  noch nicht eingeordnet
                </span>
              </div>
              <Link href={`/skills/${s.slug}`} className="block">
                <CardTitle>{t(s.name)}</CardTitle>
              </Link>
              <CardBody className="flex-1">
                {note && <p className="italic text-on-surface mb-3">„{note}"</p>}
                <p className="text-body-md">{t(s.definition)}</p>
              </CardBody>
              <div className="mt-4 flex items-center justify-between text-label-sm">
                <Link href={`/skills/${s.slug}`} className="text-primary underline">
                  Zur Skill-Seite →
                </Link>
                <Link
                  href={`/skills/${s.slug}/discover`}
                  className="text-on-surface-muted underline"
                >
                  Erst tiefer schauen
                </Link>
              </div>
            </Card>
          );
        })}
      </section>

      <section>
        <Card variant="filled">
          <CardTitle>Warum so?</CardTitle>
          <CardBody>
            <p>
              Diese Seite ist absichtlich keine Diagnose. Echte blinde Flecken erkennt man
              nicht durch Klicken, sondern durch Anwenden — und durch ehrliches Feedback von
              anderen. Wir nutzen sie hier nur als sanfte Erinnerung: nicht jeder Skill, der
              wichtig wäre, kommt von allein auf den Radar.
            </p>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}
