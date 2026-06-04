import type { Skill } from "../schema";

/**
 * Skill: Kritisches Denken
 *
 * All prose is original — definition and analogies are paraphrased rather than
 * copied from the Stifterverband framework, in line with the license posture
 * documented in docs/LICENSE.md. Skill name + category are used as factual
 * reference with attribution in the footer.
 *
 * Exercise sources are attributed inline per exercise. Curated from the
 * research corpus (see commit a4d88cb research notes); 12 of 20 selected for
 * length/format mix.
 */
export const kritischesDenken: Skill = {
  slug: "kritisches-denken",
  category: "foundational",
  name: { de: "Kritisches Denken", en: "Critical Thinking" },
  stifterverbandId: "FSF-2030-FOUND-CRIT",
  version: "1.0.0",
  authors: ["Skill Hacker Editorial"],

  definition: {
    de: "Behauptungen, Argumente und Annahmen aktiv prüfen — Evidenz, Logik und Perspektive einbeziehen, statt automatisch zuzustimmen oder zu widersprechen.",
    en: "Actively examining claims, arguments and assumptions — weighing evidence, logic and perspective instead of agreeing or rejecting on reflex.",
  },

  megatrendTags: ["entscheidung", "kommunikation", "ki"],
  relatedSkills: ["ai-literacy", "selbstkompetenz"],

  // ── Analogies ─────────────────────────────────────────────
  analogies: [
    {
      id: "filter-mesh",
      title: { de: "Filter mit verstellbarer Maschenweite" },
      body: {
        de: "Kritisches Denken ist wie ein Sieb, dessen Maschen du je nach Anlass enger oder weiter stellst. Beim ersten Überblick grob, beim Prüfen eines einzelnen Arguments fein.",
      },
      limits: {
        de: "Anders als ein Sieb ist Denken nicht passiv — du formst die Maschenweite aktiv und entscheidest, was hindurchfällt.",
      },
    },
    {
      id: "iceberg",
      title: { de: "Argument als Eisberg" },
      body: {
        de: "Jede Aussage hat eine sichtbare Spitze (die Behauptung) und einen großen unsichtbaren Teil (Annahmen, Werte, Evidenz). Kritisches Denken zieht den unteren Teil ans Licht.",
      },
      limits: {
        de: "Ein Eisberg ist statisch — Annahmen verändern sich, sobald du sie aussprichst und mit anderen prüfst.",
      },
    },
    {
      id: "steelman",
      title: { de: "Steelman statt Strawman" },
      body: {
        de: "Statt die schwächste Version einer Gegenposition zu kritisieren (Strawman), formulierst du sie so stark wie möglich (Steelman). Erst wenn dein Gegenüber zustimmt 'so meine ich das' beginnst du zu argumentieren.",
      },
      limits: {
        de: "Ein Steelman bleibt nicht stabil — gute Gegenargumente lassen ihn wachsen, nicht zerbrechen.",
      },
    },
    {
      id: "second-order-lens",
      title: { de: "Second-Order-Brille" },
      body: {
        de: "Wie eine zweite Brille, die du nach der ersten Antwort aufsetzt: 'Und dann was?' Eine, zwei, drei Stufen tief — Folgen erster, zweiter, dritter Ordnung.",
      },
      limits: {
        de: "Mehr Stufen bedeuten nicht automatisch mehr Klarheit — irgendwann beginnt reine Spekulation.",
      },
    },
    {
      id: "courtroom",
      title: { de: "Innerer Gerichtssaal" },
      body: {
        de: "Behaupte nicht nur — verteidige, klage an, urteile. Drei innere Stimmen, die nacheinander zu Wort kommen: Anwalt, Anklage, Richter:in. Die Frage ist nicht 'glaube ich das?', sondern 'würde es vor Gericht halten?'",
      },
      limits: {
        de: "Im echten Leben fehlt der Hammer am Ende — die Verhandlung bleibt offen, du musst irgendwann entscheiden, ob sie 'gut genug geführt' ist.",
      },
    },
  ],

  // ── Foundation ────────────────────────────────────────────
  foundation: [
    {
      id: "claim-reason-evidence",
      title: { de: "Behauptung, Grund, Evidenz" },
      kind: "concept",
      readingMinutes: 6,
      body: {
        de: "Jede Argumentation hat drei Schichten: was behauptet wird, warum (der Grund) und welche Evidenz den Grund stützt. Diese drei sauber auseinanderzuhalten ist die Basis für alles Weitere. Beobachte deine eigenen Slack-Nachrichten: Wo schreibst du eine Behauptung, ohne Grund? Wo nennst du einen Grund, ohne Evidenz? Beides ist menschlich, aber sichtbar gemacht trainiert es das innere Ohr.",
      },
    },
    {
      id: "bias-compass",
      title: { de: "Bias-Kompass — die häufigsten Denkfallen" },
      kind: "model",
      readingMinutes: 8,
      body: {
        de: "Confirmation Bias (du suchst Bestätigung), Anchoring (die erste Zahl prägt alle weiteren), Availability (was du dir leicht vorstellen kannst, hältst du für wahrscheinlicher), Sunk Cost (du hängst an dem, was schon investiert wurde), Halo (eine gute Eigenschaft färbt auf alle anderen ab), Hindsight ('war doch klar' — im Nachhinein), Groupthink (Konsens als Wahrheits-Ersatz). Lerne sie nicht auswendig, sondern erkenne sie an dir selbst.",
      },
    },
    {
      id: "socrates-for-work",
      title: { de: "Sokrates für den Arbeitsalltag" },
      kind: "reading",
      readingMinutes: 12,
      body: {
        de: "Sechs Fragetypen, die sich auch im Meeting nicht prätentiös anfühlen: (1) Klärung — 'was genau meinst du mit X?' (2) Prämisse — 'was setzt du dabei voraus?' (3) Evidenz — 'wie würden wir wissen, ob das stimmt?' (4) Perspektive — 'wie sähe das aus Sicht von Y aus?' (5) Implikation — 'und dann was?' (6) Meta-Frage — 'warum ist diese Frage hier wichtig?' Eine pro Meeting reicht.",
      },
    },
    {
      id: "intellectual-humility",
      title: { de: "Intellectual Humility — die Kürzestform" },
      kind: "concept",
      readingMinutes: 4,
      body: {
        de: "Du kannst falsch liegen. Du wirst falsch liegen. Die Frage ist nicht, wie du das vermeidest, sondern wie schnell du es bemerkst. Wer 'ich weiß es nicht' und 'ich könnte falsch liegen, weil ...' regelmäßig ausspricht, denkt nachweislich klarer — und wird ernster genommen, nicht weniger.",
      },
    },
  ],

  // ── Exercises (12, mixed across length + format) ──────────
  exercises: [
    // 1
    {
      id: "pre-mortem",
      title: { de: "Pre-Mortem: 'Das Projekt ist gescheitert'" },
      phase: "application",
      format: "workshop",
      length: "block",
      estimatedMinutes: 45,
      scenario: {
        de: "Vor Projektkickoff oder vor finalem Go/No-Go-Entscheid. Statt zu fragen 'was könnte schiefgehen', wird angenommen: es IST schon schiefgegangen — in 6 Monaten.",
      },
      steps: [
        { de: "Stilles Brainstorming, 3 Min, jede Person für sich: warum ist das Projekt in 6 Monaten gescheitert?" },
        { de: "Round-Robin — jede:r teilt zwei Gründe, ohne Diskussion." },
        { de: "Cluster bilden, Top-5-Risiken markieren." },
        { de: "Pro Top-Risiko eine konkrete Mitigation festlegen, mit Owner." },
      ],
      tools: ["Whiteboard", "Miro", "Stille Zettel"],
      expected: {
        de: "Eine Liste von Risiken, die im normalen Kickoff niemand ausgesprochen hätte — und konkrete Gegenmaßnahmen mit Verantwortlichen.",
      },
      integrationHints: [
        { when: { de: "Beim Projekt-Kickoff" }, how: { de: "Als erster Tagesordnungspunkt, bevor Aufgaben verteilt werden." } },
        { when: { de: "Vor finalem Go/No-Go" }, how: { de: "30-Minuten-Block direkt vor der Entscheidung." } },
      ],
      reflectionPrompts: [
        { de: "Welcher genannte Grund hat alle überrascht?" },
        { de: "Was würden wir tun, wenn dieser eine Grund jetzt schon Realität wäre?" },
      ],
      peerExchange: {
        prompt: { de: "Macht das Pre-Mortem mit einem zweiten Team und vergleicht eure Top-Risiken — wo seht ihr blinde Flecken?" },
        minGroupSize: 3,
      },
      artefact: { kind: "structured", fields: ["risk", "likelihood", "mitigation", "owner"] },
    },

    // 2
    {
      id: "assumption-check-3min",
      title: { de: "Drei-Minuten-Annahmen-Check vor Send" },
      phase: "application",
      format: "reflection",
      length: "micro",
      estimatedMinutes: 3,
      scenario: {
        de: "Du bist im Begriff, eine wichtige Entscheidungs-Mail abzuschicken oder gehst in ein Stakeholder-Meeting.",
      },
      steps: [
        { de: "Drei Minuten Pause, bevor du auf Send drückst." },
        { de: "Frage 1: Welche Annahme treffe ich hier, ohne sie geprüft zu haben?" },
        { de: "Frage 2: Was müsste wahr sein, damit meine Schlussfolgerung falsch wäre?" },
        { de: "Mindestens eine offene Annahme im Text transparent machen." },
      ],
      tools: [],
      expected: { de: "Bewusstsein für implizite Prämissen — und das Sicht­bar­machen einer davon im Output." },
      integrationHints: [
        { when: { de: "Vor jeder Entscheidungs-Mail" }, how: { de: "Kurz innehalten, beide Fragen beantworten, dann senden." } },
        { when: { de: "Vor Status-Update an Stakeholder" }, how: { de: "Markiere mindestens eine offene Annahme transparent." } },
        { when: { de: "Vor 'ja, machen wir' im Meeting" }, how: { de: "Drei Sekunden warten, beide Fragen still durchgehen." } },
      ],
      reflectionPrompts: [
        { de: "Welche Annahme habe ich diese Woche zu spät bemerkt — und was hat es gekostet?" },
      ],
    },

    // 3
    {
      id: "steelman",
      title: { de: "Steelman statt Strawman" },
      phase: "application",
      format: "journaling",
      length: "short",
      estimatedMinutes: 8,
      scenario: {
        de: "Nach einem kontroversen Meeting oder Feedback-Zyklus, in dem du innerlich widersprochen hast.",
      },
      steps: [
        { de: "Wähle EINE Position, der du widersprichst." },
        { de: "Schreibe sie so stark und überzeugend, dass deren Vertreter:in sagen würde 'besser hätte ich es nicht sagen können'." },
        { de: "Erst danach: notiere drei Gründe, warum du trotzdem widersprichst." },
      ],
      tools: ["Notizbuch", "Plain Text"],
      expected: { de: "Eine Version der Gegenposition, die du nicht abtun kannst — und Gegenargumente, die zur stärkeren Version passen, nicht zur Karikatur." },
      integrationHints: [
        { when: { de: "Nach kontroversen Meetings" }, how: { de: "10 Minuten Steelman vor dem nächsten Termin — verändert das Folgegespräch." } },
        { when: { de: "Bei Performance-Reviews" }, how: { de: "Schreibe einen Steelman der Kritik, bevor du antwortest." } },
      ],
      reflectionPrompts: [
        { de: "An welcher Stelle wurde die Gegenposition stärker, als du sie ernst genommen hast?" },
      ],
      artefact: { kind: "journal" },
    },

    // 4
    {
      id: "five-whys",
      title: { de: "Fünf Warums zur Ursache" },
      phase: "application",
      format: "case_analysis",
      length: "short",
      estimatedMinutes: 10,
      scenario: { de: "Ein wiederkehrendes Problem oder ein konkreter Fehler aus dieser Woche." },
      steps: [
        { de: "Beschreibe das Symptom in einem Satz." },
        { de: "Frage 'warum?' — notiere die erste Antwort." },
        { de: "Frage erneut 'warum?' — auf die vorige Antwort." },
        { de: "Insgesamt fünf 'warums' hintereinander." },
        { de: "Stopp am Strukturproblem, nicht an der Person." },
      ],
      tools: [],
      expected: { de: "Vom Symptom zur strukturellen Ursache — meist 3–5 Schichten tief." },
      integrationHints: [
        { when: { de: "Im Post-Mortem nach einem Incident" }, how: { de: "Statt direkt Maßnahmen zu listen, erst die Whys." } },
        { when: { de: "Bei wiederkehrenden Kundenbeschwerden" }, how: { de: "Ein Why pro Beschwerde-Cluster, gemeinsam im Team." } },
      ],
      reflectionPrompts: [
        { de: "Bei welchem 'warum' wurde es unbequem? Das ist meistens das richtige." },
      ],
      artefact: { kind: "list" },
    },

    // 5
    {
      id: "socratic-self-dialog",
      title: { de: "Sokratischer Selbstdialog vor Entscheidung" },
      phase: "application",
      format: "reflection",
      length: "short",
      estimatedMinutes: 7,
      scenario: { de: "Unmittelbar vor einer verbindlichen Entscheidung, bei der du dir nicht ganz sicher bist." },
      steps: [
        { de: "Notiere deine aktuelle Position in einem Satz." },
        { de: "Durchlaufe sechs Fragen: Klärung, Prämisse, Evidenz, Perspektive, Implikation, Meta-Frage." },
        { de: "Eine bis zwei Sätze pro Frage genügen." },
        { de: "Position danach erneut formulieren — was hat sich verschoben?" },
      ],
      tools: [],
      expected: { de: "Eine schärfere Version deiner Entscheidung, mit benannten Annahmen und sichtbaren Lücken." },
      integrationHints: [
        { when: { de: "Vor einer verbindlichen Zusage" }, how: { de: "Statt 'ich überleg's nochmal' — 5 Minuten Selbstdialog." } },
      ],
      reflectionPrompts: [
        { de: "Bei welcher der sechs Fragen wurdest du am ehesten überrascht?" },
      ],
    },

    // 6
    {
      id: "six-thinking-hats",
      title: { de: "Six Thinking Hats Meeting" },
      phase: "exploration",
      format: "workshop",
      length: "block",
      estimatedMinutes: 50,
      scenario: { de: "Ein strategisches Team-Meeting oder eine schwierige Ideenbewertung — bevor jede:r in die gewohnte Rolle fällt." },
      steps: [
        { de: "Sechs Hüte einführen: Weiß (Fakten), Rot (Gefühl), Schwarz (Risiken), Gelb (Nutzen), Grün (Alternativen), Blau (Prozess)." },
        { de: "Reihenfolge festlegen — typisch: Blau → Weiß → Gelb → Schwarz → Grün → Rot → Blau." },
        { de: "Jede:r trägt im aktuellen Hut bei, niemand wechselt eigenmächtig." },
        { de: "8 Minuten pro Hut, Blau hält Disziplin." },
      ],
      tools: ["Timer", "Hutbeschriftung (Karten)"],
      expected: { de: "Eine Diskussion, die nicht von der Person mit der lautesten Risiko-Stimme dominiert wird — alle Perspektiven kommen gleichermaßen vor." },
      integrationHints: [
        { when: { de: "Bei strategischen Team-Meetings" }, how: { de: "Als 50-Minuten-Sonderformat einmal pro Quartal." } },
        { when: { de: "Bei schwierigen Kundenfällen" }, how: { de: "Ad-hoc, wenn die Diskussion festfährt." } },
      ],
      reflectionPrompts: [
        { de: "Welcher Hut fiel dir schwer? Warum?" },
        { de: "Welcher Hut fehlt in eurem Team meist im Default-Modus?" },
      ],
    },

    // 7
    {
      id: "decision-journal",
      title: { de: "Decision Journal am Freitag" },
      phase: "application",
      format: "journaling",
      length: "short",
      estimatedMinutes: 10,
      scenario: { de: "Freitagnachmittag, fester 10-Minuten-Slot im Wochenreview." },
      steps: [
        { de: "Wähle 1–3 wichtige Entscheidungen dieser Woche." },
        { de: "Notiere je: Kontext, deine Annahmen, erwartete Ergebnisse, Bauchgefühl 0–10, Alternativen." },
        { de: "Datum klar markieren." },
        { de: "Nach 3–6 Monaten Review: was hast du tatsächlich richtig vorhergesehen?" },
      ],
      tools: ["Notion", "Plain Text", "Notebook"],
      expected: { de: "Sichtbar gemachte Hindsight-Bias — du erkennst über Zeit, was du strukturell falsch einschätzt." },
      integrationHints: [
        { when: { de: "Fester Slot Freitag 16:50" }, how: { de: "Letzte 10 Minuten der Woche, vor dem Shutdown." } },
        { when: { de: "Nach jedem strategischen Meeting" }, how: { de: "Direkt im Anschluss kurz festhalten." } },
      ],
      reflectionPrompts: [
        { de: "Welches Muster siehst du in deinen Fehleinschätzungen über die letzten 6 Monate?" },
      ],
      artefact: { kind: "structured", fields: ["context", "assumptions", "expected", "gutFeeling", "alternatives", "date"] },
    },

    // 8
    {
      id: "inversion",
      title: { de: "Inversion — 'wie würde ich das sabotieren?'" },
      phase: "application",
      format: "micro_challenge",
      length: "micro",
      estimatedMinutes: 3,
      scenario: { de: "Direkt nach Abschluss einer Projektplanung, vor Kick-off." },
      steps: [
        { de: "Kehre die Zielfrage um: was müsste ich tun, damit dieses Projekt garantiert scheitert?" },
        { de: "Liste 5–10 Sabotage-Strategien — sehr konkret." },
        { de: "Vergleiche mit deinem aktuellen Plan: vermeidest du sie aktiv?" },
      ],
      tools: [],
      expected: { de: "Eine Sabotage-Liste, die deinem aktuellen Plan unbequem ähnlich sieht — oder klar nicht." },
      integrationHints: [
        { when: { de: "Nach jeder Projektplanung" }, how: { de: "3 Minuten Inversion, dann erst Kickoff." } },
        { when: { de: "Bei eigener Karriereplanung" }, how: { de: "Wie würde ich meine Karriere am effektivsten sabotieren? — und wo tue ich es heute?" } },
      ],
      reflectionPrompts: [
        { de: "Welche Sabotage-Strategie ähnelt deinem aktuellen Verhalten am meisten?" },
      ],
    },

    // 9
    {
      id: "sift-60sec",
      title: { de: "SIFT in 60 Sekunden" },
      phase: "application",
      format: "checklist",
      length: "micro",
      estimatedMinutes: 2,
      scenario: { de: "Du willst einen Artikel, eine Studie oder einen LinkedIn-Post weitergeben oder zitieren." },
      steps: [
        { de: "S — Stop. Nicht sofort teilen." },
        { de: "I — Investigate the source. Wer ist der Absender, was sind seine Interessen?" },
        { de: "F — Find better coverage. Was schreiben andere zur selben Sache?" },
        { de: "T — Trace claims to original context. Steht das im Original wirklich so?" },
      ],
      tools: ["Browser", "Wikipedia", "Quellen-Suche"],
      expected: { de: "Entweder ein bestätigter Share — oder ein bewusstes Nicht-Teilen." },
      integrationHints: [
        { when: { de: "Vor jedem Forward im Team-Chat" }, how: { de: "Kurzer SIFT-Check, dann erst senden." } },
        { when: { de: "Beim Einbauen einer Statistik in Slides" }, how: { de: "Die Quelle muss auf die Originalstudie zurückführbar sein." } },
      ],
      reflectionPrompts: [
        { de: "Was hast du diese Woche dank SIFT NICHT geteilt?" },
      ],
    },

    // 10
    {
      id: "bias-bingo",
      title: { de: "Cognitive Bias Bingo im Meeting" },
      phase: "application",
      format: "experiment",
      length: "embedded",
      estimatedMinutes: 60,
      scenario: { de: "Während eines realen Strategie- oder Review-Meetings — kein Sondertermin." },
      steps: [
        { de: "Vor dem Meeting Bingo-Karten mit 9 Biases vorbereiten." },
        { de: "Jede:r markiert still während des Meetings beobachtete Biases." },
        { de: "Nicht aufdecken, nicht stören — nur beobachten." },
        { de: "Am Ende 5 Minuten Debrief: welche kamen besonders oft?" },
      ],
      tools: ["Vorgedruckte Bingo-Karten", "Stift"],
      expected: { de: "Eine spielerische, gesichtswahrende Art, Bias-Awareness im Team zu erhöhen — ohne jemanden bloßzustellen." },
      integrationHints: [
        { when: { de: "In regulären Quartalsmeetings" }, how: { de: "Als optionale Karten am Platz, freiwillig." } },
        { when: { de: "Bei Strategiemeetings mit hohem Konsensdruck" }, how: { de: "Karten vorab austeilen, Debrief als fester TOP." } },
      ],
      reflectionPrompts: [
        { de: "Welcher Bias war so häufig, dass er als Default in eurer Team-Kultur sitzt?" },
      ],
      peerExchange: {
        prompt: { de: "Vergleicht eure Karten — wer hat welchen Bias gesehen?" },
        minGroupSize: 4,
      },
    },

    // 11
    {
      id: "devils-advocate-rotating",
      title: { de: "Devil's Advocate rotierend im Team" },
      phase: "application",
      format: "roleplay",
      length: "embedded",
      estimatedMinutes: 45,
      scenario: { de: "Wiederkehrendes Meeting, in dem Entscheidungen fallen — Jour Fixe, Steering, Strategie-Sync." },
      steps: [
        { de: "Rotationsliste festlegen — pro Termin eine andere Person." },
        { de: "In der Agenda als 'Heute D.A.: [Name]' sichtbar machen." },
        { de: "D.A. übernimmt offiziell die Rolle: herausfordern, Annahmen freilegen, unbequeme Fragen stellen." },
        { de: "D.A. spricht als Letzte:r, bevor abgestimmt wird." },
      ],
      tools: ["Agenda-Template"],
      expected: { de: "Höhere Entscheidungsqualität — weil die Herausforderer-Rolle entpersonalisiert ist." },
      integrationHints: [
        { when: { de: "Im wöchentlichen Jour Fixe" }, how: { de: "Feste Rotation, jede:r ist alle 6–8 Wochen dran." } },
        { when: { de: "Bei Entscheidungs-Meetings" }, how: { de: "D.A. spricht als Letzte:r, bevor abgestimmt wird." } },
      ],
      reflectionPrompts: [
        { de: "Welche Annahme hat der D.A. heute hörbar gemacht, die sonst unter dem Tisch geblieben wäre?" },
      ],
    },

    // 12
    {
      id: "second-order-cascade",
      title: { de: "Second-Order-Kaskade" },
      phase: "application",
      format: "reflection",
      length: "micro",
      estimatedMinutes: 3,
      scenario: { de: "Unmittelbar bevor du einen Entscheidungs-Kommentar sendest oder eine Zusage gibst." },
      steps: [
        { de: "Notiere die geplante Entscheidung in einem Satz." },
        { de: "Frage 'und dann was?' — Konsequenz erster Ordnung." },
        { de: "Frage erneut 'und dann was?' — zweite Ordnung (oft unerwartet)." },
        { de: "Letztes Mal 'und dann was?' — dritte Ordnung (Systemeffekte)." },
      ],
      tools: [],
      expected: { de: "Eine kurzgeschriebene Konsequenzen-Treppe — sichtbar macht, ob die Entscheidung kurzfristig hilft, langfristig schadet." },
      integrationHints: [
        { when: { de: "Vor dem Senden einer Slack-Zusage" }, how: { de: "Drei 'und dann was?' still durchgehen." } },
        { when: { de: "Bei Personalentscheidungen" }, how: { de: "Treppe auf Papier — bevor du zusagst." } },
      ],
      reflectionPrompts: [
        { de: "Bei welcher Ordnung kippt die Entscheidung — von 'gut' zu 'fragwürdig'?" },
      ],
    },
  ],

  // ── Integration ───────────────────────────────────────────
  checklists: [
    {
      id: "decision-doc-check",
      title: { de: "Decision-Doc-Check" },
      context: { de: "Vor dem Teilen eines Entscheidungsdokuments oder Memos." },
      items: [
        { de: "Ist die Entscheidung explizit benannt?" },
        { de: "Sind Alternativen dokumentiert?" },
        { de: "Welche Evidenz stützt die Wahl?" },
        { de: "Welche Annahmen sind offen?" },
        { de: "Wer ist Betroffene:r, aber nicht informiert?" },
      ],
    },
    {
      id: "meeting-claim-check",
      title: { de: "Claim-Check im Meeting" },
      context: { de: "Während eines Meetings, in dem viele Aussagen schnell hintereinander fallen." },
      items: [
        { de: "Ist das eine Behauptung oder eine geprüfte Aussage?" },
        { de: "Welcher Grund wird angegeben — und ist er prüfbar?" },
        { de: "Wo wechselt jemand von Argument zu Anekdote?" },
        { de: "Wessen Perspektive fehlt am Tisch?" },
      ],
    },
  ],

  habits: [
    {
      id: "pause-before-confirming",
      trigger: { de: "Bevor ich eine bestätigende Zustimmung sende" },
      action: { de: "frage ich mich: habe ich wirklich geprüft — oder stimme ich zu, um anschlussfähig zu wirken?" },
      cadence: "per_event",
    },
    {
      id: "weekly-decision-review",
      trigger: { de: "Freitag, 16:50" },
      action: { de: "trage ich drei Entscheidungen ins Decision Journal ein." },
      cadence: "weekly",
    },
    {
      id: "say-i-dont-know",
      trigger: { de: "Wenn ich einen Punkt nicht wirklich weiß" },
      action: { de: "sage ich 'ich weiß es nicht' oder 'ich könnte falsch liegen, weil ...' statt zu bluffen." },
      cadence: "per_event",
    },
  ],

  // ── Coach ─────────────────────────────────────────────────
  coach: {
    persona: {
      de: "Du bist ein nüchterner Denk-Sparringspartner. Du stellst Fragen, bevor du antwortest, und benennst, wenn Evidenz fehlt.",
    },
    systemPrompt: {
      de: "Du bist Coach für Kritisches Denken im Skill-Hacker. Deine Rolle ist nicht, Antworten zu geben, sondern den Nutzer dazu zu bringen, Behauptungen, Gründe und Evidenz sichtbar zu machen. Wenn der Nutzer eine Aufgabe beschreibt, frage zuerst nach der impliziten Behauptung. Empfehle konkrete Übungen aus dem Repertoire, statt allgemeine Tipps zu geben. Halte Antworten kurz — drei bis fünf Sätze. Benenne, wenn dir Evidenz fehlt, statt zu spekulieren.",
    },
    suggestedPrompts: [
      { de: "Was behaupte ich hier eigentlich?" },
      { de: "Welche Evidenz würde mich überzeugen, dass ich falsch liege?" },
      { de: "Wo habe ich diese Woche schnell zugestimmt, ohne zu prüfen?" },
      { de: "Hilf mir, ein Pre-Mortem für nächste Woche vorzubereiten." },
    ],
  },
};
