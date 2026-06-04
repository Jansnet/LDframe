import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";

/**
 * Frameworks comparison page — Stifterverband / WEF / Bertelsmann.
 * Pure facts, attributed. Skill names and category structure are not
 * copyright-protected; definitions throughout the platform are paraphrased.
 */
export default function FrameworksPage() {
  return (
    <div className="space-y-10">
      <header className="max-w-3xl">
        <h1 className="font-serif text-display-md text-on-surface mb-3">Frameworks im Vergleich</h1>
        <p className="text-body-lg text-on-surface-muted">
          Drei seriöse Quellen zu Future Skills, nebeneinandergestellt. Skill Hacker nutzt
          den Stifterverband 2030 als Backbone, validiert mit Bertelsmann-Marktdaten und
          referenziert das WEF für globale Trends.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Stifterverband */}
        <Card variant="filled" className="flex flex-col gap-3">
          <Chip tone="clay" className="self-start">Backbone</Chip>
          <CardTitle className="mb-0">Stifterverband — Future Skills 2030</CardTitle>
          <p className="font-mono text-label-sm text-on-surface-muted">
            Stifterverband + Allianz für Future Skills · Dez 2025
          </p>
          <CardBody>
            <p className="mb-3"><strong className="text-on-surface">30 Skills in 5 Kategorien.</strong> Mit 50+ Expert:innen entwickelt, 1.000+ Stakeholder validiert. Bildungsorientiert, didaktisch unterlegt.</p>
            <h4 className="font-serif text-title-md text-on-surface mt-3 mb-1">Methodik</h4>
            <p className="text-body-md">Bottom-up + Top-down, DE-fokussiert, mit McKinsey & Hochschulen.</p>
            <h4 className="font-serif text-title-md text-on-surface mt-3 mb-1">Beispiel-Skills</h4>
            <ul className="list-disc pl-5 text-body-md space-y-1">
              <li>Kritisches Denken, Selbstkompetenz, Kreativität</li>
              <li>Resilienz, Innovations-, Nachhaltigkeitskompetenz</li>
              <li>Dialog-, Demokratie-, Partizipationskompetenz</li>
              <li>AI Literacy, Data Literacy, Medienkompetenz</li>
              <li>Softwareentwicklung, Cybersecurity, KI-Expertise</li>
            </ul>
          </CardBody>
          <div className="mt-auto rounded-sm bg-cream-50 border border-rust-300/60 p-3 text-body-md">
            <strong className="text-on-surface">Lizenz CC BY-SA 4.0</strong> · Attribution Pflicht, ShareAlike kann viral wirken. Wir paraphrasieren Definitionen und nennen Skill-Namen frei.
          </div>
        </Card>

        {/* WEF */}
        <Card variant="filled" className="flex flex-col gap-3">
          <Chip tone="primary" className="self-start">Globale Trends</Chip>
          <CardTitle className="mb-0">WEF — Future of Jobs 2025</CardTitle>
          <p className="font-mono text-label-sm text-on-surface-muted">
            World Economic Forum · Jan 2025
          </p>
          <CardBody>
            <p className="mb-3"><strong className="text-on-surface">26 Core Skills in 7 Kategorien.</strong> Globale Top-Down-Sicht aus Arbeitgeber-Survey, 1.043 Unternehmen, 14,1 Mio. Mitarbeitende.</p>
            <h4 className="font-serif text-title-md text-on-surface mt-3 mb-1">Methodik</h4>
            <p className="text-body-md">Executive Opinion Survey + LinkedIn / Coursera / Indeed Daten.</p>
            <h4 className="font-serif text-title-md text-on-surface mt-3 mb-1">Top-10 wachsend bis 2030</h4>
            <ul className="list-disc pl-5 text-body-md space-y-0.5">
              <li>AI & Big Data</li>
              <li>Networks & Cybersecurity</li>
              <li>Technological Literacy</li>
              <li>Creative Thinking</li>
              <li>Resilience, Flexibility, Agility</li>
              <li>Curiosity & Lifelong Learning</li>
              <li>Leadership & Social Influence</li>
              <li>Analytical Thinking</li>
              <li>Environmental Stewardship</li>
              <li>Talent Management</li>
            </ul>
          </CardBody>
          <div className="mt-auto rounded-sm bg-[#F8E0E0] border border-[#D88] p-3 text-body-md text-[#7a2222]">
            <strong>Lizenz CC BY-NC-ND 4.0</strong> · Non-Commercial + No-Derivatives. Wir zeigen nur Skill-Namen als Faktendarstellung mit Quellenangabe.
          </div>
        </Card>

        {/* Bertelsmann */}
        <Card variant="filled" className="flex flex-col gap-3">
          <Chip tone="rust" className="self-start">Markt-Validierung</Chip>
          <CardTitle className="mb-0">Bertelsmann — Future Skills DE</CardTitle>
          <p className="font-mono text-label-sm text-on-surface-muted">
            Bertelsmann Stiftung · Stellenanzeigen-Auswertung
          </p>
          <CardBody>
            <p className="mb-3"><strong className="text-on-surface">3 Cluster, datengetrieben.</strong> Aus 47 Mio. deutschen Stellenanzeigen abgeleitet — zeigt, welche Skills der DE-Markt tatsächlich nachfragt.</p>
            <h4 className="font-serif text-title-md text-on-surface mt-3 mb-1">Methodik</h4>
            <p className="text-body-md">Natural Language Processing über Stellenanzeigen, jährliche Updates.</p>
            <h4 className="font-serif text-title-md text-on-surface mt-3 mb-1">Cluster</h4>
            <ul className="list-disc pl-5 text-body-md space-y-1">
              <li>Selbstmanagement (Eigeninitiative, Lernbereitschaft, Selbstorganisation)</li>
              <li>Soziale Kompetenz (Kommunikation, Teamfähigkeit, Empathie)</li>
              <li>Kognitive Kompetenz (Analyse, Problemlösung, kritisches Denken)</li>
            </ul>
          </CardBody>
          <div className="mt-auto rounded-sm bg-cream-50 border border-outline-variant p-3 text-body-md">
            <strong className="text-on-surface">Lizenz CC BY-SA 4.0</strong> · Marktdaten frei zitierbar mit Attribution. Wir nutzen die Cluster zur Validierung der Skill-Priorisierung.
          </div>
        </Card>
      </section>

      <section>
        <Card variant="outlined">
          <CardTitle>Mapping — wo überlappen die drei?</CardTitle>
          <CardBody>
            <p>
              Alle drei führen <strong className="text-on-surface">Resilienz / Selbstmanagement</strong>,{" "}
              <strong className="text-on-surface">Kritisches / Analytisches Denken</strong>,{" "}
              <strong className="text-on-surface">AI & Tech Literacy</strong> und{" "}
              <strong className="text-on-surface">Kommunikation</strong> als Top-Themen. Der
              Stifterverband bringt zusätzlich die <em>gemeinschaftsorientierten</em> Skills
              (Demokratie, Partizipation), die WEF und Bertelsmann nicht prominent führen.
              Konsequenz für Skill Hacker: wir starten mit Skills, die in allen drei Frameworks
              vorkommen — dort ist die Evidenz am dichtesten.
            </p>
          </CardBody>
        </Card>
      </section>

      <section>
        <Card variant="filled">
          <CardTitle>Quellen</CardTitle>
          <CardBody>
            <ul className="space-y-1.5">
              <li>
                <a className="text-primary underline" href="https://www.stifterverband.org/medien/future-skills-2030" target="_blank" rel="noopener noreferrer">
                  Stifterverband, Future Skills 2030 (Dez 2025)
                </a> — CC BY-SA 4.0
              </li>
              <li>
                <a className="text-primary underline" href="https://www.weforum.org/publications/the-future-of-jobs-report-2025/" target="_blank" rel="noopener noreferrer">
                  World Economic Forum, Future of Jobs Report 2025
                </a> — CC BY-NC-ND 4.0
              </li>
              <li>
                <a className="text-primary underline" href="https://www.bertelsmann-stiftung.de/de/unsere-projekte/beschaeftigung-im-wandel/future-skills" target="_blank" rel="noopener noreferrer">
                  Bertelsmann Stiftung, Future Skills Projekt
                </a> — CC BY-SA 4.0
              </li>
              <li>
                <a className="text-primary underline" href="https://zukunftsmission-bildung.de/future-skills" target="_blank" rel="noopener noreferrer">
                  Allianz für Future Skills (Zukunftsmission Bildung)
                </a>
              </li>
            </ul>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}
