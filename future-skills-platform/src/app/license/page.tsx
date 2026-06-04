import { Card, CardTitle, CardBody } from "@/components/ui/Card";

export default function LicensePage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <header>
        <h1 className="font-serif text-display-md text-on-surface mb-3">Lizenz & Attribution</h1>
        <p className="text-body-lg text-on-surface-muted">
          Skill Hacker baut strukturell auf öffentlich verfügbaren Future-Skills-Frameworks
          auf. Wir nehmen Lizenzfragen ernst — hier sind die Quellen, was wir wie nutzen, und
          unter welcher Lizenz unsere eigenen Inhalte stehen.
        </p>
      </header>

      <Card variant="filled">
        <CardTitle>Stifterverband Future Skills 2030 — CC BY-SA 4.0</CardTitle>
        <CardBody>
          <p>
            Wir verwenden die Skill-Namen, Kategorien-Struktur und Megatrend-Begriffe als
            Faktenreferenz. Diese sind als einzelne Begriffe und Strukturen nicht
            urheberrechtlich geschützt.
          </p>
          <p className="mt-3">
            <strong className="text-on-surface">Wir paraphrasieren alle Definitionen</strong> in
            eigenen Worten, um die Share-Alike-Pflicht (Viralität) der CC BY-SA 4.0 nicht auf
            unsere Plattform zu übertragen. Alle Übungstexte, Analogien, Habits, Coach-Prompts
            sind originär für Skill Hacker geschrieben.
          </p>
          <p className="mt-3">
            Attribution (an jeder relevanten Stelle und hier):
          </p>
          <p className="mt-2 italic">
            Strukturell basierend auf dem{" "}
            <a className="text-primary underline" href="https://www.stifterverband.org/medien/future-skills-2030">Future-Skills-Framework 2030</a>{" "}
            des Stifterverbands für die Deutsche Wissenschaft e.V. (Dezember 2025), lizenziert
            unter <a className="text-primary underline" href="https://creativecommons.org/licenses/by-sa/4.0/deed.de">CC BY-SA 4.0</a>.
          </p>
        </CardBody>
      </Card>

      <Card variant="outlined">
        <CardTitle>World Economic Forum, Future of Jobs Report 2025 — CC BY-NC-ND 4.0</CardTitle>
        <CardBody>
          <p>
            Wegen der Non-Commercial- und No-Derivatives-Klauseln verwenden wir nur die
            Skill-Namen und Top-Listen als Faktendarstellung, mit Quellenangabe, im{" "}
            <a className="text-primary underline" href="/frameworks">Frameworks-Vergleich</a>.
            Wir übernehmen keine Definitionen, Grafiken oder bearbeiteten Auszüge.
          </p>
        </CardBody>
      </Card>

      <Card variant="outlined">
        <CardTitle>Bertelsmann Stiftung Future Skills — CC BY-SA 4.0</CardTitle>
        <CardBody>
          <p>
            Marktdaten frei zitierbar mit Attribution. Wir nutzen die drei Cluster
            (Selbstmanagement, Sozial, Kognitiv) zur Validierung unserer Skill-Priorisierung
            gegen tatsächliche Marktnachfrage.
          </p>
        </CardBody>
      </Card>

      <Card variant="filled">
        <CardTitle>Unsere eigenen Inhalte</CardTitle>
        <CardBody>
          <p>
            Alle Skill-Definitionen, Analogien, Übungs-Beschreibungen, Checklisten,
            Habit-Templates und Coach-Profile in dieser Plattform sind originäre Texte.
            Übungsformate (Pre-Mortem, Steelman, WOOP, Physiological Sigh, SIFT etc.) basieren
            auf publizierter Methodik, die wir pro Übung quellenmäßig attribuieren.
          </p>
          <p className="mt-3">
            Der Plattform-Code steht unter Apache-2.0. Inhaltliche Lizenz ist im Repository
            dokumentiert.
          </p>
        </CardBody>
      </Card>

      <Card variant="outlined">
        <CardTitle>Logo, Wortmarken, Co-Branding</CardTitle>
        <CardBody>
          <p>
            Wir verwenden weder Logo noch Wort-Bild-Marken der referenzierten Organisationen.
            Falls Co-Branding gewünscht ist (z.B. „Stifterverband-zertifiziert"), erfolgt das
            nur nach expliziter Absprache mit der jeweiligen Organisation.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
