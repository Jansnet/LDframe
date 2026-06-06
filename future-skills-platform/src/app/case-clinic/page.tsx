import Link from "next/link";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { PHASES, totalDuration } from "@/lib/case-clinic";

/**
 * /case-clinic — kollegiale Fallberatung overview & launcher.
 *
 * Two modes:
 *  - Solo: 6 phases walkthrough with AI as facilitator + steel-man peer.
 *  - With peers: scheduled session with 3-6 participants.
 *
 * The overview page lays out the protocol — knowing the structure upfront
 * is half the value of the format. Anchors users in the discipline.
 */
export default function CaseClinicPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3 max-w-3xl">
        <Chip tone="rust">Kollegiale Fallberatung</Chip>
        <h1 className="font-serif text-display-md text-on-surface">
          Eine reale Situation gemeinsam strukturiert anschauen.
        </h1>
        <p className="text-body-lg text-on-surface-muted">
          Sechs Phasen, {totalDuration()} Minuten, eine klare Disziplin. Du bringst eine
          konkrete Situation aus deinem Arbeitsalltag — und gehst raus mit einem nächsten
          Schritt, den DU formuliert hast (nicht jemand anders für dich).
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-5">
        <Card variant="filled" className="flex flex-col gap-3">
          <Chip tone="primary" className="self-start">Solo-Modus</Chip>
          <CardTitle className="mb-0">Mit dem AI-Coach durchgehen</CardTitle>
          <CardBody className="flex-1">
            <p>
              Der Coach übernimmt Moderation und Steel-Man-Beratung. Du gibst die Antworten,
              er hält die Disziplin — fragt erst, bevor er Hypothesen wagt. Dauert ca.{" "}
              {totalDuration()} Minuten, kann unterbrochen werden.
            </p>
          </CardBody>
          <Link href="/case-clinic/solo">
            <Button variant="filled">Solo-Runde starten</Button>
          </Link>
        </Card>

        <Card variant="filled" className="flex flex-col gap-3">
          <Chip tone="clay" className="self-start">Mit Peers (3–6 Personen)</Chip>
          <CardTitle className="mb-0">Live mit Kolleg:innen</CardTitle>
          <CardBody className="flex-1">
            <p>
              Lade 2–5 Personen ein, ein:e Moderator:in führt durch die Phasen.
              Format wirkt am stärksten bei kollegialer Mischung — keine direkten
              Vorgesetzten in der Runde.
            </p>
          </CardBody>
          <Link href="/case-clinic/new">
            <Button variant="tonal">Live-Runde planen</Button>
          </Link>
        </Card>
      </section>

      <section>
        <h2 className="font-serif text-headline-md text-on-surface mb-4">Das Protokoll</h2>
        <ol className="space-y-3">
          {PHASES.map((p, i) => (
            <li key={p.phase}>
              <Card variant="outlined">
                <div className="flex items-baseline justify-between mb-2">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-label-sm text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-title-lg text-on-surface">{p.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Chip tone="neutral">{p.who}</Chip>
                    <Chip tone="clay">{p.durationMinutes} Min</Chip>
                  </div>
                </div>
                <p className="text-body-md text-on-surface-muted mt-2">{p.description}</p>
                <ul className="mt-3 space-y-1 list-disc pl-5 text-body-md italic">
                  {p.prompts.map((prompt) => (
                    <li key={prompt}>{prompt}</li>
                  ))}
                </ul>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <Card variant="filled">
          <CardTitle>Warum die Phasen-Disziplin?</CardTitle>
          <CardBody>
            <p>
              Ohne Phasen kippt das Format reflexhaft in „lass mich dir Ratschläge geben".
              Die ersten zehn Minuten sind explizit ratsfreie Zone — Fallschilderung +
              Verständnisfragen. Erst danach kommen Hypothesen und Lösungen. Genau diese
              Verzögerung macht den Unterschied zur normalen Flur-Beratung.
            </p>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}
