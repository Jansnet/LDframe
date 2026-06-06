import Link from "next/link";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { PhaseStepper } from "@/components/ui/PhaseStepper";

export default function PlanPage() {
  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <h1 className="font-serif text-display-md text-on-surface mb-3">Mein Plan</h1>
        <p className="text-body-lg text-on-surface-muted">
          Dein 4-Wochen-Zyklus mischt bewusst Übungen verschiedener Länge und Formate, damit
          sie in echte Arbeitstage passen — nicht obendrauf.
        </p>
      </header>

      <Card variant="filled" className="border-l-4 border-primary">
        <span className="font-mono text-label-sm text-primary">Identity Statement</span>
        <p className="font-serif text-title-lg text-on-surface mt-1">
          „Ich bin jemand, der/die vor einer Zustimmung kurz prüft, was die andere Person eigentlich meint."
        </p>
        <p className="text-body-md text-on-surface-muted mt-2">
          4-Wochen-Zyklus, gestartet vor 8 Tagen.
        </p>
      </Card>

      <section className="bg-surface-container rounded-lg p-4">
        <PhaseStepper current="exploration" />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card variant="filled">
          <div className="flex items-center justify-between mb-2">
            <Chip tone="primary">Diese Woche</Chip>
            <span className="font-mono text-label-sm text-on-surface-muted">W2 / W4</span>
          </div>
          <CardTitle>3 geplante Übungen</CardTitle>
          <CardBody>
            <ul className="space-y-2">
              <li className="flex justify-between"><span>Claim-Map für Slack</span><Chip tone="neutral" className="text-label-sm">10 Min</Chip></li>
              <li className="flex justify-between"><span>Annahmen-Check vor Send</span><Chip tone="primary" className="text-label-sm">2 Min</Chip></li>
              <li className="flex justify-between"><span>Devil's Advocate im Jour Fixe</span><Chip tone="rust" className="text-label-sm">In Aufgabe</Chip></li>
            </ul>
          </CardBody>
        </Card>

        <Card variant="outlined">
          <CardTitle>Habit-Spur</CardTitle>
          <CardBody>
            <ul className="space-y-2">
              <li><span className="text-rust-600 font-medium">Neu</span> &nbsp;Pause vor dem Absenden</li>
              <li><span className="text-clay-700 font-medium">Gestärkt</span> &nbsp;Wochen-Retro</li>
              <li><span className="text-on-surface-muted font-medium">In Veränderung</span> &nbsp;Check-in-Fragen im 1:1</li>
            </ul>
          </CardBody>
        </Card>

        <Card variant="outlined">
          <CardTitle>Stille Spur</CardTitle>
          <CardBody>
            <div className="space-y-3 text-body-md">
              <p>
                <span className="font-mono text-label-sm text-primary block">ARTEFAKTE-WOCHE</span>
                <span className="font-serif text-headline-md text-on-surface">3 / 5</span>
              </p>
              <p>
                <span className="font-mono text-label-sm text-clay-700 block">STREAK</span>
                2 Wochen · 3 Pausen-Tage übrig
              </p>
              <p>
                <span className="font-mono text-label-sm text-rust-600 block">BADGES</span>
                Erstes Artefakt · Identity gestartet
              </p>
            </div>
          </CardBody>
        </Card>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link href="/case-clinic">
          <Card variant="outlined" interactive>
            <Chip tone="rust" className="mb-2">Optional</Chip>
            <CardTitle>Kollegiale Fallberatung</CardTitle>
            <CardBody>
              <p>Hast du gerade eine Situation, an der du häkst? Solo mit dem Coach oder mit 3-5 Peers.</p>
            </CardBody>
          </Card>
        </Link>
        <Link href="/snapshot">
          <Card variant="outlined" interactive>
            <Chip tone="clay" className="mb-2">Quartalsweise</Chip>
            <CardTitle>Snapshot — wo stehst du?</CardTitle>
            <CardBody>
              <p>Skill-Radar gegen vorherige Quartale — explizit kein Tages-Dashboard.</p>
            </CardBody>
          </Card>
        </Link>
        <Card variant="filled">
          <CardTitle>Nächster Meilenstein</CardTitle>
          <CardBody>
            <p className="mb-3">Identity-Check am Ende der Woche: ist dein Satz für dich näher rangerückt?</p>
            <Button variant="tonal" size="sm">Plan anpassen</Button>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}
