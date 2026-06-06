import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Card } from "@/components/ui/Card";
import {
  atlasByCategory,
  authoredSlugs,
  publishedSlugs,
  CATEGORY_META,
  CATEGORY_ORDER,
} from "@/content/skill-atlas";

/**
 * Atlas / Skill-Map — the home view.
 *
 * Five category panels, the 30 Future Skills 2030 grouped by category.
 * Every skill is clickable: published skills (3 currently) link to a full
 * skill page; stub skills show the L1-L4 anchors and a "Übungen folgen"
 * notice. Skills marked as stubs are tagged here as „Anker da" so the
 * difference is visible.
 */
export default function HomePage() {
  const grouped = atlasByCategory();
  const authored = authoredSlugs();
  const published = publishedSlugs();

  const totalPublished = published.size;
  const totalSkills = CATEGORY_ORDER.reduce((sum, c) => sum + grouped[c].length, 0);

  return (
    <div className="space-y-12">
      <section className="max-w-3xl">
        <h1 className="font-serif text-display-md text-on-surface mb-4">
          Atlas — die 30 Future Skills 2030 auf einen Blick.
        </h1>
        <p className="text-body-lg text-on-surface-muted">
          Fünf Kategorien, eine Karte. Klick auf einen Skill, um L1–L4-Anker zu sehen,
          dich zu positionieren oder einen 4-Wochen-Zyklus zu starten. Skills mit{" "}
          <span className="font-mono text-primary">bald</span>-Markierung sind im Atlas
          enthalten, das vollständige Material schreiben wir nach.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 items-center">
          <Link href="/start">
            <Button variant="filled">Zwei Fragen, dann Vorschläge</Button>
          </Link>
          <Link href="/tour" className="text-body-md text-primary underline">
            Erst die Tour sehen
          </Link>
          <Chip tone="neutral" className="ml-auto text-label-sm">
            {totalPublished} von {totalSkills} voll ausgearbeitet · {authored.size - published.size} mit Anker
          </Chip>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CATEGORY_ORDER.map((cat) => {
          const meta = CATEGORY_META[cat];
          const skills = grouped[cat];
          const inCatPublished = skills.filter((s) => published.has(s.slug)).length;
          return (
            <Card key={cat} variant="filled" className="flex flex-col gap-3">
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="font-serif text-title-lg text-on-surface">{meta.label}</h2>
                <Chip tone={meta.tone}>{inCatPublished}/{skills.length} voll</Chip>
              </div>
              <p className="text-body-md text-on-surface-muted">{meta.short}</p>
              <ul className="flex flex-wrap gap-1.5 pt-1">
                {skills.map((s) => {
                  const isPublished = published.has(s.slug);
                  return (
                    <li key={s.slug}>
                      <Link
                        href={`/skills/${s.slug}`}
                        className={`state-layer inline-flex items-center gap-1.5 rounded-full border px-3 h-8 text-label-md hover:border-primary ${
                          isPublished
                            ? "border-outline-variant bg-surface text-on-surface"
                            : "border-dashed border-outline-variant bg-transparent text-on-surface-muted"
                        }`}
                        title={isPublished ? undefined : "Anker vorhanden, Übungen folgen"}
                      >
                        {s.name}
                        {!isPublished && (
                          <span className="font-mono text-label-sm text-primary/70">Anker</span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Card>
          );
        })}
      </section>
    </div>
  );
}
