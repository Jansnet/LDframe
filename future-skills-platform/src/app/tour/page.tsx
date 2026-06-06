import Link from "next/link";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";

/**
 * /tour — onboarding walkthrough for new pilot users.
 *
 * Four stops, each one a concrete flow they'll actually use:
 *   1. Start (gap engine)
 *   2. Discover (skill levels + blind spots)
 *   3. Cycle (identity statement + plan)
 *   4. Reflection (case clinic, manager loop, snapshot)
 *
 * Deliberately not a slide deck — every stop has a "Mach das jetzt" link
 * to the real surface, so the tour ends with the user actually using the
 * platform, not consuming marketing copy.
 */
const STOPS = [
  {
    no: "01",
    title: "Anfangen — ohne lange Diagnose.",
    bullet: "Zwei Fragen, sanfter Einstieg.",
    body: "Statt eines Atlas-Drowns oder eines 30-Fragen-Assessments fragen wir dich nach einer Situation und einem Wunsch. Die KI schlägt 2–3 Skills mit Begründung vor. Du kannst auch direkt im Atlas stöbern.",
    cta: { label: "Mit 2 Fragen starten", href: "/start" },
    alt: { label: "Lieber Atlas", href: "/" },
  },
  {
    no: "02",
    title: "Discovery — 4 Levels, kein Quiz.",
    bullet: "Wo stehst du gerade, ehrlich?",
    body: "Jeder Skill hat eine eigene Discovery-Ansicht mit vier Stufen — von „hab davon gehört" bis „kann es anderen beibringen". Du wählst die Stufe, die sich gerade ehrlich anfühlt. Du kannst dich jederzeit umpositionieren.",
    cta: { label: "Skill ansehen", href: "/skills/kritisches-denken/discover" },
    alt: { label: "Blinde Flecken", href: "/blind-spots" },
  },
  {
    no: "03",
    title: "Zyklus — Identity statt Skill-Description.",
    bullet: "„In 4 Wochen sage ich über mich …“",
    body: "Empirisch der stärkere Anker: Du formulierst einen Identity-Satz, kein To-Do. Mit der Wahl wird automatisch dein Plan generiert — ein bewusster Mix aus Mikro- und Embedded-Übungen, plus Reflexionsslots. Kein zweiter Schritt.",
    cta: { label: "Zyklus formulieren", href: "/skills/kritisches-denken/start-cycle" },
    alt: { label: "Mein aktueller Plan", href: "/plan" },
  },
  {
    no: "04",
    title: "Reflektieren — strukturiert, mit echtem Output.",
    bullet: "Artefakte, Fallrunden, Manager-Loop.",
    body: "Jede Übung produziert ein Artefakt — kein „done" ohne. Bei härteren Situationen: kollegiale Fallberatung in 6 Phasen, solo oder mit Peers. Wenn deine Führungskraft mitziehen soll: 90-Sek-Mail aus echten Daten.",
    cta: { label: "Fallrunde anschauen", href: "/case-clinic" },
    alt: { label: "Manager-Loop", href: "/manager-loop" },
  },
];

export default function TourPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3 max-w-3xl">
        <Chip tone="primary">Tour</Chip>
        <h1 className="font-serif text-display-md text-on-surface">
          Wie Skill Hacker funktioniert — in vier Stopps.
        </h1>
        <p className="text-body-lg text-on-surface-muted">
          Keine Folien. Jeder Stopp endet mit einem Link in die echte Anwendung. Du kannst
          die Tour jederzeit verlassen und später dort weitermachen.
        </p>
      </header>

      <ol className="space-y-6">
        {STOPS.map((stop) => (
          <li key={stop.no}>
            <Card variant="filled" className="space-y-3">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-label-sm text-primary">{stop.no}</span>
                <h2 className="font-serif text-headline-lg text-on-surface">{stop.title}</h2>
              </div>
              <p className="text-body-lg text-on-surface italic">{stop.bullet}</p>
              <p className="text-body-md text-on-surface">{stop.body}</p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href={stop.cta.href}>
                  <Button variant="filled">{stop.cta.label}</Button>
                </Link>
                <Link href={stop.alt.href} className="text-body-md text-primary underline">
                  {stop.alt.label}
                </Link>
              </div>
            </Card>
          </li>
        ))}
      </ol>

      <section>
        <Card variant="outlined">
          <CardTitle>Was du nicht finden wirst</CardTitle>
          <CardBody>
            <p className="mb-2">
              Keine Punktzahlen. Keine Ranglisten. Keine täglichen Push-Streaks, die dich
              bestrafen. Keine Personenvergleiche auf einem Manager-Dashboard. Die
              Entscheidungen dahinter sind absichtlich — basierend auf empirischer
              Skill-Building-Forschung (Dochy/Segers HILL, identity-based behavior change,
              Selbstbestimmungstheorie).
            </p>
            <p>
              Mehr dazu, wenn du Lust hast:{" "}
              <Link href="/frameworks" className="text-primary underline">/frameworks</Link>{" "}
              oder schreib mir.
            </p>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}
