import type { Skill } from "../schema";

/**
 * Skill: AI Literacy
 *
 * Practical AI literacy for the workplace: prompting, verification, bias,
 * data protection, ethics, and Co-Intelligence as a working pattern.
 * Sources attributed per exercise. Definitions are original.
 */
export const aiLiteracy: Skill = {
  slug: "ai-literacy",
  category: "digital",
  name: { de: "AI Literacy", en: "AI Literacy" },
  stifterverbandId: "FSF-2030-DIG-AI",
  version: "1.0.0",
  authors: ["Skill Hacker Editorial"],
  status: "published",

  definition: {
    de: "KI-Tools so einsetzen, dass Output prüfbar bleibt, Daten geschützt sind und jederzeit klar ist, wann ein Mensch im Loop sein muss.",
    en: "Using AI tools in ways that keep output verifiable, data protected, and the human-in-the-loop boundary explicit.",
  },

  megatrendTags: ["ki", "prompting", "ethik", "dsgvo"],
  relatedSkills: ["kritisches-denken", "data-literacy"],

  // ── Level-Anker — Selbstpositionierung L1-L4 ─────────────
  // DigComp 2.2 Levels 1-6 ("with guidance" → "guide others") + U.S. DoL
  // AI Literacy Framework (Understand → Direct → Evaluate → Use Responsibly).
  // L3-Marker: Halluzinationen riechen, bevor man sie prüft.
  levelAnchors: [
    {
      level: "L1",
      observable: {
        de: "Ich benutze ChatGPT für E-Mail-Entwürfe, wenn jemand es mir zeigt.",
      },
      innerMarker: {
        de: "Ich weiß nicht genau, wann das Modell halluziniert — ich vertraue eher dem Selbstbewusstsein der Antwort.",
      },
    },
    {
      level: "L2",
      observable: {
        de: "Ich baue mir Prompts zusammen, die „ganz gut“ funktionieren, und kopiere Output direkt rein — bei Low-Stakes-Texten.",
      },
      innerMarker: {
        de: "Ich merke nachträglich, wenn die KI etwas erfunden hat, und ärgere mich.",
      },
    },
    {
      level: "L3",
      observable: {
        de: "Im Kunden-Call nutze ich die KI live, sage aber: „Das müssen wir noch gegen die Originalquelle prüfen — ich mache das bis morgen.“",
      },
      innerMarker: {
        de: "Ich rieche bei einer KI-Antwort, wo sie wahrscheinlich falsch ist, bevor ich nachprüfe.",
      },
    },
    {
      level: "L4",
      observable: {
        de: "Ich zeige Kolleg:innen nicht welchen Prompt, sondern wie sie selbst einen besseren bauen — und wo das Tool sie täuschen wird.",
      },
      innerMarker: {
        de: "Ich erkenne in fremden KI-Workflows die Stelle, an der das Risiko sitzt, ohne den Use Case zu kennen.",
      },
    },
  ],

  // ── Analogies ─────────────────────────────────────────────
  analogies: [
    {
      id: "fast-intern",
      title: { de: "Schneller Praktikant mit gutem Gedächtnis" },
      body: {
        de: "Behandle die KI wie eine:n smarte:n Praktikant:in: enthusiastisch, schnell, breit gelesen — aber ohne dein Kontextwissen, ohne Haftung, manchmal mit erfundenen Quellen. Du gibst Auftrag mit Rolle und Ziel, prüfst Output, korrigierst.",
      },
      limits: {
        de: "Anders als ein Praktikant lernt die KI nicht aus deinem Feedback — beim nächsten Prompt fängt sie wieder bei Null an. Dein Prompt-Repertoire ist also kein 'Onboarding', sondern eine Bibliothek.",
      },
    },
    {
      id: "jagged-frontier",
      title: { de: "Zackige Grenze (Jagged Frontier)" },
      body: {
        de: "Stell dir vor, die KI ist gut in scheinbar komplexen Aufgaben und schlecht in scheinbar einfachen — die Grenze zwischen 'kann' und 'kann nicht' verläuft unregelmäßig. Du lernst die Form dieser Grenze nur durch Ausprobieren, nicht durch Lesen.",
      },
      limits: {
        de: "Die Grenze verschiebt sich mit jedem neuen Modell — was gestern jenseits war, ist heute innerhalb. Du musst nachjustieren.",
      },
    },
    {
      id: "co-intelligence",
      title: { de: "Co-Intelligence statt Orakel" },
      body: {
        de: "Frag die KI nicht 'was soll ich tun?' Frag 'stell mir fünf kritische Fragen zu meinem Plan'. Sie ist Sparringspartner, nicht Antwortmaschine — die Antwort musst weiterhin du formulieren.",
      },
      limits: {
        de: "Co-Intelligence funktioniert nur, wenn du selbst schon was hast, an dem gesparrt werden kann. Bei völlig leerem Kopf wird sie zur Orakel-Ersatzdroge.",
      },
    },
    {
      id: "calculator-not-mathematician",
      title: { de: "Taschenrechner, nicht Mathematiker" },
      body: {
        de: "Ein Taschenrechner gibt dir das Ergebnis — aber er sagt dir nicht, ob du die richtige Formel gewählt hast. Genauso die KI: das WIE ist schnell, das OB bleibt deine Verantwortung.",
      },
      limits: {
        de: "Anders als ein Taschenrechner kann die KI auch das Ergebnis erfinden, wenn sie nicht weiß. Sie sagt 'I don't know' selten von selbst — du musst danach fragen.",
      },
    },
    {
      id: "two-keyboards",
      title: { de: "Zwei Tastaturen, eine Verantwortung" },
      body: {
        de: "Stell dir vor, neben deiner Tastatur steht eine zweite, an der ständig jemand mittippt. Manchmal ist das hilfreich, manchmal stört es. Die Frage ist nicht, ob die zweite Tastatur tippt — sondern wann du sie ignorierst.",
      },
      limits: {
        de: "Anders als eine zweite Person macht die zweite Tastatur keine Pause — du musst die Pause aktiv setzen, sonst dominiert sie deinen Output.",
      },
    },
  ],

  // ── Foundation ────────────────────────────────────────────
  foundation: [
    {
      id: "what-llms-do",
      title: { de: "Was Sprachmodelle tatsächlich tun" },
      kind: "concept",
      readingMinutes: 8,
      body: {
        de: "Sprachmodelle sagen das nächste Token vorher — auf Basis statistischer Muster in Trainingsdaten. Sie 'verstehen' nicht im menschlichen Sinn; sie sind extrem gut im Plausibel-Klingen. Daraus folgen drei Konsequenzen: (1) Halluzinationen sind kein Bug, sondern eine Eigenschaft der Vorhersage. (2) Selbstbewusstes Falsches klingt genauso überzeugend wie selbstbewusstes Richtiges. (3) Prompts sind keine Fragen, sondern Steuerimpulse für die Vorhersage.",
      },
    },
    {
      id: "human-in-the-loop",
      title: { de: "Human in the Loop — Wann, wo, wofür" },
      kind: "model",
      readingMinutes: 6,
      body: {
        de: "Drei Stufen: (a) Mensch entscheidet, KI assistiert (Default für sensible Inhalte). (b) KI entscheidet, Mensch prüft Stichproben. (c) KI entscheidet vollautomatisch — nur bei niedrigem Risiko und reversiblem Output. EU AI Act Art. 14 verlangt explizit (a) für Hochrisiko-Systeme. Diese Stufe pro Anwendungsfall festzulegen ist eine Führungsaufgabe, keine Technik-Frage.",
      },
    },
    {
      id: "prompt-anatomy",
      title: { de: "Anatomie eines guten Prompts" },
      kind: "model",
      readingMinutes: 7,
      body: {
        de: "Vier Bestandteile, die fast jeden Prompt verbessern: (1) Rolle — 'du bist eine erfahrene Datenschutzbeauftragte'. (2) Ziel — 'Aufgabe: prüfe diesen Vertrag auf DSGVO-Probleme'. (3) Format — 'Tabelle mit drei Spalten: Klausel, Problem, Empfehlung'. (4) Beispiel oder Constraint — 'wie in folgendem Beispiel:' oder 'maximal 200 Worte'. Iteriere mindestens dreimal — der erste Prompt ist nie der beste.",
      },
    },
    {
      id: "data-and-the-act",
      title: { de: "DSGVO, EU AI Act und der eigene Prompt" },
      kind: "reading",
      readingMinutes: 9,
      body: {
        de: "Datenminimierung gilt auch für Prompts. Kundennamen, Vertragsdetails, Gesundheitsdaten gehören NICHT in Prompts an externe LLMs ohne Auftragsverarbeitungsvertrag. EU AI Act Art. 4 verlangt von Beschäftigten ein nachweisbares Maß an AI Literacy — Schulung dokumentieren, nicht nur 'haben wir mal gemacht'. Bei Hochrisiko-Systemen (Bewerberauswahl, Kreditvergabe, biometrische Identifikation) gelten strengere Pflichten.",
      },
    },
  ],

  // ── Exercises ─────────────────────────────────────────────
  exercises: [
    // 1
    {
      id: "hallucination-check-30s",
      title: { de: "30-Sekunden-Halluzinations-Check" },
      phase: "application",
      format: "micro_challenge",
      length: "micro",
      estimatedMinutes: 1,
      scenario: { de: "Jedes Mal, wenn die KI eine Zahl, ein Zitat oder eine Quelle nennt." },
      steps: [
        { de: "Markiere EINE konkrete Behauptung im Output." },
        { de: "Suche 30 Sekunden lang: existiert die Quelle? Stimmt die Zahl?" },
        { de: "Wenn nicht prüfbar — markiere als 'ungeprüft' im Dokument." },
      ],
      tools: ["Browser", "Google Scholar"],
      expected: { de: "Reflex-Misstrauen gegenüber plausibel klingenden, aber erfundenen Details — als Default-Verhalten." },
      integrationHints: [
        { when: { de: "Bei jeder KI-Antwort mit Zahl/Zitat/Quelle" }, how: { de: "Markiere und prüfe 30 Sek, bevor du übernimmst." } },
        { when: { de: "Vor dem Einbauen in Slides" }, how: { de: "Pro Statistik: Quelle finden oder als 'aus KI, ungeprüft' kennzeichnen." } },
      ],
      reflectionPrompts: [
        { de: "Wie viele Halluzinationen hast du diese Woche dank des Checks abgefangen?" },
      ],
    },

    // 2
    {
      id: "prompt-three-iterations",
      title: { de: "Prompt-Verfeinerung in drei Iterationen" },
      phase: "application",
      format: "micro_challenge",
      length: "micro",
      estimatedMinutes: 3,
      scenario: { de: "Wenn eine erste KI-Antwort unbefriedigend ist — bevor du aufgibst." },
      steps: [
        { de: "Iteration 1: Ein-Satz-Prompt (was du als erstes formuliert hättest)." },
        { de: "Iteration 2: + Rolle + Ziel + Einschränkungen." },
        { de: "Iteration 3: + Beispiel oder Referenz." },
        { de: "Vergleiche die drei Outputs — welcher ist näher dran?" },
      ],
      tools: ["LLM-Chat-Interface"],
      expected: { de: "Iteratives Prompten als Reflex statt 'das funktioniert nicht'." },
      integrationHints: [
        { when: { de: "Wenn der erste Prompt schlecht antwortet" }, how: { de: "Statt anders zu suchen — strukturiert die Iterationen durchgehen." } },
        { when: { de: "Beim Aufbau einer Team-Prompt-Bibliothek" }, how: { de: "Speichere immer die dritte Iteration, nicht die erste." } },
      ],
      reflectionPrompts: [
        { de: "Welcher der drei Schritte hat den größten Sprung gebracht?" },
      ],
    },

    // 3
    {
      id: "data-stoplight",
      title: { de: "Personenbezug-Ampel vor Prompt" },
      phase: "application",
      format: "checklist",
      length: "micro",
      estimatedMinutes: 1,
      scenario: { de: "Jedes Mal, bevor du auf Enter drückst und einen Prompt mit echten Geschäftsdaten abschickst." },
      steps: [
        { de: "Drei Sekunden Stopp." },
        { de: "Frage: enthält mein Input Namen, Kunden-IDs, Gesundheits- oder Vertragsdaten?" },
        { de: "Wenn ja: pseudonymisieren ('Kunde A' statt echtem Namen) oder Prompt abbrechen." },
        { de: "Wenn unsicher: gehe davon aus, dass es Personenbezug ist." },
      ],
      tools: [],
      expected: { de: "DSGVO-Reflex (Datenminimierung) vor jedem externen Prompt." },
      integrationHints: [
        { when: { de: "Jeder Prompt mit Geschäftsdaten" }, how: { de: "Drei-Sekunden-Stopp, mental durch die Ampel." } },
        { when: { de: "Beim Onboarding ins KI-Tool" }, how: { de: "Erste Übung — Ampel-Reflex einüben." } },
      ],
      reflectionPrompts: [
        { de: "Wie oft hättest du Personenbezug versehentlich gesendet, wenn der Stopp nicht da wäre?" },
      ],
    },

    // 4
    {
      id: "invite-ai-to-table",
      title: { de: "'Invite AI to the Table' — Impuls" },
      phase: "exploration",
      format: "reflection",
      length: "micro",
      estimatedMinutes: 2,
      scenario: { de: "Am Anfang jeder geplanten Arbeitsaufgabe." },
      steps: [
        { de: "Stop, bevor du loslegst." },
        { de: "Frage dich oder das Team: 'Wie könnte mir eine KI hier helfen?'" },
        { de: "Notiere eine konkrete Antwort — auch wenn du dann KI NICHT nutzt." },
        { de: "Entscheide bewusst, ob KI rein soll oder nicht — und warum." },
      ],
      tools: [],
      expected: { de: "Bewusste Default-Entscheidung statt unbewusster Reflex (immer oder nie KI)." },
      integrationHints: [
        { when: { de: "Vor jeder größeren Aufgabe" }, how: { de: "Zwei Minuten — Frage stellen, Antwort notieren, Entscheidung treffen." } },
        { when: { de: "In Team-Stand-ups" }, how: { de: "Eine Person stellt die Frage zu einer geplanten Aufgabe." } },
      ],
      reflectionPrompts: [
        { de: "Wo bist du diese Woche standardmäßig zu KI gegangen, wo es nicht gepasst hätte?" },
      ],
    },

    // 5
    {
      id: "jagged-frontier-mini",
      title: { de: "Jagged-Frontier-Mini-Experiment" },
      phase: "exploration",
      format: "experiment",
      length: "short",
      estimatedMinutes: 10,
      scenario: { de: "Freitag-Review oder beim Onboarding auf ein neues KI-Tool." },
      steps: [
        { de: "Wähle zwei Teilaufgaben aus deiner Arbeit, die ähnlich komplex wirken." },
        { de: "Gib beide derselben KI mit ähnlichem Prompt." },
        { de: "Bewerte den Output je 1–5." },
        { de: "Notiere: welche lag 'inside' der Frontier (gut), welche 'outside'?" },
      ],
      tools: ["LLM-Chat-Interface", "Notizbuch"],
      expected: { de: "Du baust dir intuitives Wissen, wo das Modell stark/schwach ist — nicht aus Lektüre, sondern aus Versuchen." },
      integrationHints: [
        { when: { de: "Wöchentliches Freitag-Review" }, how: { de: "10 Min — ein Vergleichspaar pro Woche." } },
        { when: { de: "Beim Modellwechsel" }, how: { de: "Alte Stärken/Schwächen-Karte neu kalibrieren." } },
      ],
      reflectionPrompts: [
        { de: "Welche Annahme über 'KI kann das doch' wurde diese Woche widerlegt?" },
      ],
      artefact: { kind: "structured", fields: ["task", "rating", "frontier"] },
    },

    // 6
    {
      id: "bias-spotting",
      title: { de: "Bias-Spotting im generierten Output" },
      phase: "exploration",
      format: "observation",
      length: "short",
      estimatedMinutes: 10,
      scenario: { de: "Bevor du KI-generierte Bilder oder Texte öffentlich verwendest." },
      steps: [
        { de: "Lass die KI zehn Bilder oder Beschreibungen generieren — z.B. 'erfolgreiche Führungskraft', 'Pflegekraft', 'Ingenieur:in'." },
        { de: "Zähle Verteilung: Geschlecht, Alter, Hautfarbe, Setting." },
        { de: "Fünf Minuten Reflexion: welche Trainingsdaten-Verzerrungen zeigen sich?" },
      ],
      tools: ["Bild-/Text-Generator"],
      expected: { de: "Sichtbares Bewusstsein für Bias — und Vorsicht beim Einbauen von KI-Outputs in offizielle Kommunikation." },
      integrationHints: [
        { when: { de: "Vor öffentlicher Verwendung von KI-Bildern" }, how: { de: "Mini-Audit der Generierungen vor Freigabe." } },
        { when: { de: "Im Team-Workshop" }, how: { de: "Gemeinsames Bias-Bingo mit verschiedenen Prompts." } },
      ],
      reflectionPrompts: [
        { de: "Welches Bias-Muster hat dich am meisten überrascht?" },
      ],
      artefact: { kind: "structured", fields: ["prompt", "distribution", "biasNotes"] },
    },

    // 7
    {
      id: "dumbest-reviewer",
      title: { de: "'Dümmster Reviewer'-Prompt-Test" },
      phase: "application",
      format: "peer_exchange",
      length: "short",
      estimatedMinutes: 8,
      scenario: { de: "Vor dem Speichern eines Prompts in der Team-Prompt-Bibliothek." },
      steps: [
        { de: "Gib deinen Prompt ohne Kontext einer Kollegin." },
        { de: "Versteht sie in 20 Sekunden, was genau rauskommen soll?" },
        { de: "Wenn nein: Rolle, Ziel, Format, Zielpublikum ergänzen." },
        { de: "Testen, bis ein neutraler Mensch den Auftrag versteht." },
      ],
      tools: ["Prompt-Bibliothek", "Plain Text"],
      expected: { de: "Prompts, die nicht nur dir, sondern dem Team verständlich sind — und deshalb wiederverwendbar." },
      integrationHints: [
        { when: { de: "Vor Speichern in Team-Bibliothek" }, how: { de: "Kurz-Check mit einer Person, bevor er final wird." } },
        { when: { de: "Beim Onboarding neuer Kolleg:innen" }, how: { de: "Bestehende Prompts mit Neueinsteiger:innen testen — was muss präziser?" } },
      ],
      reflectionPrompts: [
        { de: "Welche selbstverständliche Annahme musst du jedes Mal explizit machen?" },
      ],
    },

    // 8
    {
      id: "source-triangulation",
      title: { de: "Quellen-Triangulation in 7 Minuten" },
      phase: "application",
      format: "checklist",
      length: "short",
      estimatedMinutes: 7,
      scenario: { de: "Wenn KI-Output mit Quellenangabe in Kundendokumente, Reports oder Präsentationen wandert." },
      steps: [
        { de: "Existiert die genannte Quelle wirklich?" },
        { de: "Steht dort tatsächlich diese Aussage?" },
        { de: "Gibt es eine zweite unabhängige Quelle für dieselbe Behauptung?" },
        { de: "Notiere die Trefferquote — wie oft hält die Quelle einer Prüfung stand?" },
      ],
      tools: ["Browser", "Google Scholar", "Wikipedia"],
      expected: { de: "Eine messbare Quote von erfundenen Quellen — die meisten unterschätzen, wie hoch sie ist." },
      integrationHints: [
        { when: { de: "Vor jedem Einbau in offizielle Dokumente" }, how: { de: "Pro Quelle 7 Minuten — keine Ausnahme." } },
        { when: { de: "Wöchentliches Audit der eigenen Output-Quellen" }, how: { de: "Stichprobe von 5 — wie viele hatten falsche oder erfundene Belege?" } },
      ],
      reflectionPrompts: [
        { de: "Wie hoch ist deine reale Quellen-Trefferquote? Notiere sie über 4 Wochen — Tendenz?" },
      ],
    },

    // 9
    {
      id: "ai-disclosure-sentence",
      title: { de: "KI-Disclosure-Satz formulieren" },
      phase: "application",
      format: "micro_challenge",
      length: "short",
      estimatedMinutes: 8,
      scenario: { de: "In jeder Dokumentation, in der KI-Unterstützung verwendet wurde." },
      steps: [
        { de: "Formuliere einen Standardsatz, 1–2 Zeilen lang." },
        { de: "Inhalt: welches Modell, wofür, mit welcher menschlichen Prüfung." },
        { de: "Beispiel: 'Entwurf erstellt mit Claude 3.5 Sonnet (Prompt: Strukturvorschlag), final überarbeitet und faktengeprüft durch [Name], [Datum].'" },
        { de: "In Templates verankern — E-Mails, Berichte, Memos." },
      ],
      tools: ["Template-System", "Signatur"],
      expected: { de: "Transparenz wird zur Gewohnheit statt zur Sonderaktion — und schützt dich rechtlich bei Hochrisiko-Outputs." },
      integrationHints: [
        { when: { de: "In Mail-Signatur-Templates" }, how: { de: "Pflichtfeld bei extern relevanten Mails." } },
        { when: { de: "In Berichten / Entscheidungsvorlagen" }, how: { de: "Disclosure am Ende, vor der Signatur." } },
      ],
      reflectionPrompts: [
        { de: "Wo hast du Disclosure vergessen — und was wäre das Risiko gewesen, wenn das aufgefallen wäre?" },
      ],
    },

    // 10
    {
      id: "copilot-protocol",
      title: { de: "Co-Pilot-Protokoll im Dokument" },
      phase: "application",
      format: "journaling",
      length: "embedded",
      estimatedMinutes: 30,
      scenario: { de: "Beim Schreiben längerer Dokumente — Angebote, Konzepte, Berichte — mit KI-Unterstützung." },
      steps: [
        { de: "Lege eine Randspalte / Fußnotenleiste an: 'KI-Beiträge'." },
        { de: "Pro Absatz, in dem KI beigetragen hat: was hat sie vorgeschlagen?" },
        { de: "Was hast du übernommen, was umformuliert, was verworfen — und warum?" },
        { de: "Am Ende: Quote 'übernommen unverändert / leicht angepasst / verworfen'." },
      ],
      tools: ["Text-Editor mit Notizen-Spalte"],
      expected: { de: "Audit-Spur des KI-Einsatzes und ehrliche Selbstwahrnehmung, wie viel der eigene Anteil ist." },
      integrationHints: [
        { when: { de: "Beim Verfassen wichtiger Berichte" }, how: { de: "Randspalte standardmäßig aktivieren." } },
        { when: { de: "Bei Angeboten an Kund:innen" }, how: { de: "Protokoll als interne Pflicht-Dokumentation." } },
      ],
      reflectionPrompts: [
        { de: "Wie hoch ist tatsächlich dein eigener Anteil — und nicht der gefühlt eigene?" },
      ],
      artefact: { kind: "structured", fields: ["paragraph", "aiSuggestion", "yourEdit", "reason"] },
    },

    // 11
    {
      id: "human-in-loop-gate",
      title: { de: "'Human in the loop'-Gate bei Entscheidungen" },
      phase: "application",
      format: "checklist",
      length: "embedded",
      estimatedMinutes: 5,
      scenario: { de: "Jeder KI-Output, der eine Auswirkung auf eine andere Person hat — Bewerbung, Kundenbrief, Bewertung." },
      steps: [
        { de: "Wer prüft den Output, bevor er rausgeht?" },
        { de: "Welche zwei expliziten Kriterien werden geprüft?" },
        { de: "Wo dokumentiere ich, dass geprüft wurde?" },
        { de: "Habe ich einen klaren Stopp-Mechanismus, wenn etwas nicht stimmt?" },
      ],
      tools: ["Review-Template"],
      expected: { de: "Kein automatisierter Blindflug bei Outputs mit Personen-Konsequenz." },
      integrationHints: [
        { when: { de: "Bewerber-Auswahl-Tools" }, how: { de: "Pflicht-Gate, bevor Absage rausgeht." } },
        { when: { de: "Kundenbriefe mit KI-Vorschlag" }, how: { de: "Zweitlesung als fester Schritt im Workflow." } },
      ],
      reflectionPrompts: [
        { de: "Wo in deinem Workflow gibt es noch kein Gate — und sollte eines geben?" },
      ],
    },

    // 12
    {
      id: "use-case-canvas",
      title: { de: "Use-Case-Eignungs-Canvas im Team" },
      phase: "exploration",
      format: "workshop",
      length: "block",
      estimatedMinutes: 50,
      scenario: { de: "Quartalsweise im Team — oder bei neuen Tools / Aufgabentypen." },
      steps: [
        { de: "Liste 10 aktuelle Team-Aufgaben." },
        { de: "Bewerte jede auf zwei Achsen: Sensibilität der Daten / Toleranz für Fehler." },
        { de: "Entscheide pro Aufgabe: grün (KI gut), gelb (KI + Mensch im Loop), rot (nicht einsetzen)." },
        { de: "Ergebnis: eine Team-Einsatzmatrix, sichtbar als Aushang." },
      ],
      tools: ["Whiteboard", "Miro"],
      expected: { de: "Eine kollektiv getragene Entscheidung darüber, wo KI-Einsatz im Team OK ist — statt individueller Wildwuchs." },
      integrationHints: [
        { when: { de: "Quartalsweise im Team-Retro" }, how: { de: "50-Minuten-Block, Matrix als Output." } },
        { when: { de: "Bei Einführung eines neuen KI-Tools" }, how: { de: "Matrix-Update als Pflichtteil der Tool-Einführung." } },
      ],
      reflectionPrompts: [
        { de: "Wo ist die Diskrepanz am größten zwischen 'so machen wir's' und 'so sollten wir's'?" },
      ],
      artefact: { kind: "structured", fields: ["task", "sensitivity", "errorTolerance", "decision"] },
    },
  ],

  // ── Integration ───────────────────────────────────────────
  checklists: [
    {
      id: "pre-prompt",
      title: { de: "Pre-Prompt-Checkliste" },
      context: { de: "Direkt vor jedem Prompt mit echten Daten." },
      items: [
        { de: "Personenbezug-Ampel: grün / gelb / rot?" },
        { de: "Rolle und Ziel im Prompt klar?" },
        { de: "Format und Constraint definiert?" },
        { de: "Habe ich ein Beispiel oder Anti-Beispiel mitgegeben?" },
        { de: "Plan für menschliche Prüfung des Outputs?" },
      ],
    },
    {
      id: "post-output",
      title: { de: "Post-Output-Checkliste" },
      context: { de: "Nach jeder KI-Antwort, bevor sie weiterverwendet wird." },
      items: [
        { de: "Mindestens eine konkrete Behauptung verifiziert?" },
        { de: "Quellen geprüft (existieren, sagen sie das wirklich)?" },
        { de: "Bias-Spot-Check gemacht (gerade bei Personen/Gruppen)?" },
        { de: "Disclosure-Satz eingebaut, wo nötig?" },
        { de: "Wer prüft final, bevor es raus geht?" },
      ],
    },
  ],

  habits: [
    {
      id: "stoplight-before-prompt",
      trigger: { de: "Bevor ich auf Enter drücke bei einem Prompt mit Geschäftsdaten" },
      action: { de: "gehe ich mental durch die Personenbezug-Ampel." },
      cadence: "per_event",
    },
    {
      id: "one-claim-verified",
      trigger: { de: "Wenn die KI eine Zahl, ein Zitat oder eine Quelle nennt" },
      action: { de: "verifiziere ich mindestens eine konkrete Behauptung — bevor ich übernehme." },
      cadence: "per_event",
    },
    {
      id: "disclosure-on-extern",
      trigger: { de: "Bevor eine KI-unterstützte Mail / Doc extern rausgeht" },
      action: { de: "ergänze ich den Disclosure-Satz mit Modell, Prüfer:in, Datum." },
      cadence: "per_event",
    },
  ],

  // ── Coach ─────────────────────────────────────────────────
  coach: {
    persona: {
      de: "Ich gehe davon aus, dass jedes KI-Output prüfenswert ist. Wir trainieren das Verifizieren, nicht das Beeindruckt-Sein.",
    },
    systemPrompt: {
      de: `Spezifische Coaching-Anweisungen für AI Literacy:

Du arbeitest mit dem „jagged frontier"-Bild von Ethan Mollick: KI ist in benachbarten Aufgaben mal überraschend stark, mal überraschend schwach — die Grenze ist nicht intuitiv. Bei jedem Use Case fragst du, auf welcher Seite der Grenze er liegt und wer die Verifikation übernimmt.

Bei einem geschilderten KI-Output ist deine erste Frage immer: „Welche eine Aussage darin würdest du nicht weitergeben — und woran würdest du sie prüfen?" Erst danach Verbesserungen am Prompt oder Workflow.

Anti-Pattern: Vermeide „die KI kann das schon", „im nächsten Modell wird das besser", oder allgemeine Tool-Empfehlungen. Verweise immer auf eine konkrete Übung aus dem Repertoire (Halluzinations-Check, Personenbezug-Ampel, Drei-Iterationen-Prompt) bevor du etwas Eigenes vorschlägst. Bei DSGVO- oder EU-AI-Act-Fragen: erkläre kurz das Prinzip, verweise dann auf die Compliance-Stelle des Unternehmens.

Beispiel — so:
Nutzer: „ChatGPT hat mir für unseren Kundenreport eine Studie zitiert, die ich grade nicht finde."
Du: „Wann hast du das letzte Mal eine Zitat-Quelle aus einem KI-Output verifiziert — und nach welchen drei Markern gehst du, wenn du es tust?"`,
    },
    suggestedPrompts: [
      { de: "Welche Aussage im KI-Output würde ich selbst nicht zitieren?" },
      { de: "Wer ist hier der 'Mensch im Loop' — und wann genau?" },
      { de: "Was hat mein Prompt nicht geklärt, das ich gerade nachreichen muss?" },
      { de: "Hilf mir, eine Use-Case-Eignungs-Matrix für mein Team zu entwerfen." },
    ],
  },
};
