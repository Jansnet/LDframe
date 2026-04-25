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
          Dein 8-Wochen-Plan mischt bewusst Übungen verschiedener Länge und Formate, damit sie
          in echte Arbeitstage passen — nicht obendrauf.
        </p>
      </header>

      <section className="bg-surface-container rounded-lg p-4">
        <PhaseStepper current="exploration" />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card variant="filled">
          <div className="flex items-center justify-between mb-2">
            <Chip tone="primary">Diese Woche</Chip>
            <span className="font-mono text-label-sm text-on-surface-muted">W3 / W8</span>
          </div>
          <CardTitle>3 geplante Übungen</CardTitle>
          <CardBody>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Claim-Map für Slack</span>
                <Chip tone="neutral" className="text-label-sm">10 Min</Chip>
              </li>
              <li className="flex justify-between">
                <span>Pre-Mortem im Team</span>
                <Chip tone="clay" className="text-label-sm">30 Min</Chip>
              </li>
              <li className="flex justify-between">
                <span>Prüf-Frage vor Zustimmung</span>
                <Chip tone="primary" className="text-label-sm">1–3 Min</Chip>
              </li>
            </ul>
          </CardBody>
        </Card>

        <Card variant="outlined">
          <CardTitle>Habit-Spur</CardTitle>
          <CardBody>
            <ul className="space-y-2">
              <li>
                <span className="text-rust-600 font-medium">Neu</span> —
                &nbsp;Pause vor dem Absenden
              </li>
              <li>
                <span className="text-clay-700 font-medium">Gestärkt</span> —
                &nbsp;Wochen-Retro
              </li>
              <li>
                <span className="text-on-surface-muted font-medium">In Veränderung</span> —
                &nbsp;Check-in-Fragen im 1:1
              </li>
            </ul>
          </CardBody>
        </Card>

        <Card variant="outlined">
          <CardTitle>Nächster Meilenstein</CardTitle>
          <CardBody>
            <p className="mb-3">Re-Assessment in W8 — zeigt, was sich gegenüber dem Start verschoben hat.</p>
            <Button variant="tonal" size="sm">Plan anpassen</Button>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}
