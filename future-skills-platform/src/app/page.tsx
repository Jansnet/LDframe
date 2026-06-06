import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Card } from "@/components/ui/Card";
import {
  atlasByCategory,
  authoredSlugs,
  CATEGORY_META,
  CATEGORY_ORDER,
} from "@/content/skill-atlas";

/**
 * Atlas / Skill-Map — the home view.
 *
 * Five category panels, the 30 Future Skills 2030 grouped by category.
 * Authored skills are active chips that link through to the skill page;
 * unauthored skills appear as faded "kommt"-chips so the full atlas is
 * visible even before all 30 modules exist.
 */
export default function HomePage() {
  const grouped = atlasByCategory();
  const authored = authoredSlugs();

  const totalAuthored = authored.size;
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
            {totalAuthored} von {totalSkills} ausgearbeitet
          </Chip>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CATEGORY_ORDER.map((cat) => {
          const meta = CATEGORY_META[cat];
          const skills = grouped[cat];
          const inCatAuthored = skills.filter((s) => authored.has(s.slug)).length;
          return (
            <Card key={cat} variant="filled" className="flex flex-col gap-3">
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="font-serif text-title-lg text-on-surface">{meta.label}</h2>
                <Chip tone={meta.tone}>{inCatAuthored}/{skills.length}</Chip>
              </div>
              <p className="text-body-md text-on-surface-muted">{meta.short}</p>
              <ul className="flex flex-wrap gap-1.5 pt-1">
                {skills.map((s) => {
                  const isAuthored = authored.has(s.slug);
                  return (
                    <li key={s.slug}>
                      {isAuthored ? (
                        <Link
                          href={`/skills/${s.slug}`}
                          className="state-layer inline-flex items-center rounded-full border border-outline-variant bg-surface px-3 h-8 text-label-md text-on-surface hover:border-primary"
                        >
                          {s.name}
                        </Link>
                      ) : (
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-outline-variant px-3 h-8 text-label-md text-on-surface-muted/70"
                          title="Modul wird ergänzt"
                        >
                          {s.name}
                          <span className="font-mono text-label-sm text-primary/70">bald</span>
                        </span>
                      )}
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
