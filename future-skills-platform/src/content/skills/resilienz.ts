import type { Skill } from "../schema";

/**
 * Skill: Resilienz
 *
 * Evidence-based across seven dimensions: emotion regulation, cognitive
 * restructuring, meaning + values, social support, self-compassion,
 * recovery / detachment, change capacity. Sources attributed per exercise.
 * Definitions are original (paraphrased rather than copied from the
 * Stifterverband framework).
 */
export const resilienz: Skill = {
  slug: "resilienz",
  category: "transformative",
  name: { de: "Resilienz", en: "Resilience" },
  stifterverbandId: "FSF-2030-TRANS-RES",
  version: "1.0.0",
  authors: ["Skill Hacker Editorial"],

  definition: {
    de: "Belastung wahrnehmen, regulieren und verarbeiten, sodass Handlungsfähigkeit und Wohlbefinden erhalten bleiben — und mit der Zeit sogar wachsen.",
    en: "Noticing, regulating and processing strain in a way that preserves — and over time strengthens — your capacity to act and feel well.",
  },

  megatrendTags: ["stress", "regeneration", "veränderung"],
  relatedSkills: ["selbstkompetenz", "kritisches-denken"],

  // ── Level-Anker — Selbstpositionierung L1-L4 ─────────────
  // Resilienz-Progression nach Vier-Phasen-Modell (deteriorating → adapting
  // → recovery → growing) + Benner "competent → proficient → expert".
  levelAnchors: [
    {
      level: "L1",
      observable: {
        de: "Nach einem harten Feedback bin ich für zwei Tage stiller im Slack.",
      },
      innerMarker: {
        de: "Ich nehme Kritik mit nach Hause und drehe sie nachts im Kopf.",
      },
    },
    {
      level: "L2",
      observable: {
        de: "Nach einem verlorenen Pitch melde ich mich am nächsten Morgen mit „Was machen wir jetzt?“.",
      },
      innerMarker: {
        de: "Ich kenne meine Erholungs-Tricks (Laufen, Schlafen, mit X reden) — wende sie aber unzuverlässig an.",
      },
    },
    {
      level: "L3",
      observable: {
        de: "Mitten in einer Eskalation atme ich hörbar einmal durch und sage: „Lass uns das in zwei Schritte trennen.“",
      },
      innerMarker: {
        de: "Ich spüre den Stress-Schub, aber er nimmt mir nicht die Sprache.",
      },
    },
    {
      level: "L4",
      observable: {
        de: "Wenn jemand im Team zusammenbricht, frage ich nicht „Geht's?“ sondern „Was brauchst du als Nächstes?“.",
      },
      innerMarker: {
        de: "Ich habe keine Angst vor der Krisen-Stimmung anderer — sie steckt mich nicht mehr an.",
      },
    },
  ],

  // ── Analogies ─────────────────────────────────────────────
  analogies: [
    {
      id: "bamboo",
      title: { de: "Bambus, nicht Eiche" },
      body: {
        de: "Eichen sind stark — bis der Wind zu stark wird, dann brechen sie. Bambus biegt sich, gibt nach, kehrt zurück. Resilienz ist nicht Härte, sondern flexible Rückstellkraft.",
      },
      limits: {
        de: "Auch Bambus hat eine Bruchgrenze — Resilienz hat ihre Grenze in chronischer Überforderung ohne Regeneration.",
      },
    },
    {
      id: "battery",
      title: { de: "Akku mit Ladezustand" },
      body: {
        de: "Du bist nicht 'belastbar' oder 'nicht belastbar' — du hast einen aktuellen Ladezustand. Manche Tätigkeiten ziehen, andere laden auf. Resilienz heißt, den Ladestand zu kennen und zu pflegen.",
      },
      limits: {
        de: "Ein Akku lädt im Hintergrund — Menschen brauchen aktives Aufladen. Es passiert nicht von allein, wenn der Stecker nicht reingeht.",
      },
    },
    {
      id: "rubber-band",
      title: { de: "Gummiband mit Dehnungsgedächtnis" },
      body: {
        de: "Ein Gummiband dehnt sich, kehrt zurück — aber wenn es zu lange zu stark gedehnt wird, leiert es aus. Kurze hohe Belastung mit Erholung stärkt; lange mittlere Belastung ohne Erholung leiert aus.",
      },
      limits: {
        de: "Anders als ein Gummiband können Menschen die ausgeleierte Form wieder verändern — aber nicht durch Härter-werden, sondern durch Pause.",
      },
    },
    {
      id: "weather-not-climate",
      title: { de: "Wetter, nicht Klima" },
      body: {
        de: "Stress ist Wetter — Schauer, Sturm, Sonne, manchmal Hagel. Resilienz ist das Klima — der mittelfristige Muster, das du bewohnst. Du beeinflusst beides unterschiedlich.",
      },
      limits: {
        de: "Anders als beim echten Wetter kannst du deine 'Wettervorhersage' lesen lernen — Frühwarnsignale im eigenen Körper.",
      },
    },
    {
      id: "thermostat-not-thermometer",
      title: { de: "Thermostat, nicht Thermometer" },
      body: {
        de: "Ein Thermometer zeigt nur an, was ist. Ein Thermostat reguliert aktiv. Resiliente Menschen sind Thermostat — sie merken eine Veränderung und reagieren früh, statt erst beim Anschlag.",
      },
      limits: {
        de: "Ein Thermostat folgt einem Sollwert — den musst du dir bei Resilienz selbst setzen, und der ist veränderlich.",
      },
    },
  ],

  // ── Foundation ────────────────────────────────────────────
  foundation: [
    {
      id: "stress-vs-strain",
      title: { de: "Stress ist nicht Belastung" },
      kind: "concept",
      readingMinutes: 5,
      body: {
        de: "Stress ist die kurzfristige körperliche Aktivierung — Cortisol, Adrenalin, Aufmerksamkeit. An sich nicht schlecht; im Gegenteil, ohne Stress keine Performance. Belastung wird's, wenn die Aktivierung dauerhaft anhält ohne Regeneration. Trenne die zwei Begriffe — sie verlangen unterschiedliche Antworten.",
      },
    },
    {
      id: "abc-model",
      title: { de: "ABC-Modell — wo Bewertungen entstehen" },
      kind: "model",
      readingMinutes: 7,
      body: {
        de: "A = Adversity (Auslöser), B = Belief (deine Bewertung), C = Consequence (Gefühl, Verhalten). Der Trick: Zwischen A und C steht IMMER B — auch wenn es sich anfühlt, als folge C direkt aus A. Den Zwischenschritt sichtbar zu machen ist der Kernhebel kognitiver Resilienz.",
      },
    },
    {
      id: "broaden-and-build",
      title: { de: "Broaden-and-Build — was positive Emotionen können" },
      kind: "concept",
      readingMinutes: 6,
      body: {
        de: "Negative Emotionen verengen die Aufmerksamkeit (sinnvoll bei Gefahr). Positive Emotionen weiten sie (sinnvoll für Lernen, Beziehung, Kreativität). Resilienz heißt nicht 'immer positiv sein', sondern: über den Tag bewusst Momente der Weitung einbauen, damit nicht der ganze Tag im Verengungs-Modus läuft.",
      },
    },
    {
      id: "recovery-not-reward",
      title: { de: "Erholung ist kein Bonus" },
      kind: "concept",
      readingMinutes: 4,
      body: {
        de: "Detachment — das mentale Loslassen der Arbeit — ist der stärkste Prädiktor für Wohlbefinden und reduzierte Erschöpfung (Sonnentag). Es passiert nicht von allein. Wer 'im Notfall noch schnell die Mail' beantwortet, bricht den Erholungs-Vertrag mit sich selbst.",
      },
    },
  ],

  // ── Exercises ─────────────────────────────────────────────
  exercises: [
    // 1
    {
      id: "abc-protocol",
      title: { de: "ABC-Protokoll — Adversity, Belief, Consequence" },
      phase: "exploration",
      format: "journaling",
      length: "short",
      estimatedMinutes: 8,
      scenario: { de: "Nach einem belastenden Meeting, Feedback-Gespräch oder E-Mail-Konflikt." },
      steps: [
        { de: "Drei Spalten zeichnen: A — Adversity (was ist passiert?). B — Belief (wie hast du es bewertet?). C — Consequence (was hast du gefühlt / getan?)." },
        { de: "Notiere nur Fakten in A — kein 'er war so unfair'." },
        { de: "Notiere in B die Gedankenkette zwischen A und C — 'das heißt jetzt ...'" },
        { de: "Frage: passt B zu A? Oder ist B ein automatischer Schritt, den du gewohnheitsmäßig machst?" },
      ],
      tools: ["Notizbuch", "Plain Text"],
      expected: { de: "Sichtbar machen, dass C nicht direkt aus A folgt, sondern durch B. B ist veränderlich." },
      integrationHints: [
        { when: { de: "Nach jedem belastenden 1:1" }, how: { de: "Direkt im Anschluss 8 Minuten, bevor das nächste Meeting startet." } },
        { when: { de: "Sonntagabend-Review" }, how: { de: "Die zwei belastendsten Momente der Woche durchgehen." } },
      ],
      reflectionPrompts: [
        { de: "Welche B-Schicht taucht bei dir immer wieder auf — als Default-Bewertung?" },
      ],
      artefact: { kind: "structured", fields: ["A", "B", "C"] },
    },

    // 2
    {
      id: "three-good-things",
      title: { de: "Drei gute Dinge am Arbeitstag" },
      phase: "application",
      format: "journaling",
      length: "micro",
      estimatedMinutes: 3,
      scenario: { de: "Am Ende jedes Arbeitstages, vor dem Rechner-Herunterfahren." },
      steps: [
        { de: "Notiere drei Dinge, die heute gut gelaufen sind — Arbeit oder darum herum." },
        { de: "Pro Eintrag ergänze: was war dein Anteil?" },
        { de: "Halte es kurz — eine Zeile pro Eintrag reicht." },
      ],
      tools: ["Notion", "Notes-App", "Notebook"],
      expected: { de: "Ein einseitiger Tag verschiebt sich zu einem zwei-seitigen — und du bemerkst über Wochen, was dich nährt." },
      integrationHints: [
        { when: { de: "Letzte 3 Minuten der Arbeitszeit" }, how: { de: "Als fester Bestandteil des Shutdown-Rituals." } },
        { when: { de: "Beim Mittagessen mit Kolleg:innen" }, how: { de: "Als kurze Runde — jede:r teilt eins." } },
      ],
      reflectionPrompts: [
        { de: "Welche Art von 'guten Dingen' kommt häufig vor? Verbringst du dort mehr Zeit?" },
      ],
      artefact: { kind: "list" },
    },

    // 3
    {
      id: "woop",
      title: { de: "WOOP für ein Arbeitsziel" },
      phase: "application",
      format: "tool_tryout",
      length: "short",
      estimatedMinutes: 10,
      scenario: { de: "Wochenstart oder vor einem herausfordernden Projekt — wenn das Ziel klar ist, der Weg dahin aber wacklig." },
      steps: [
        { de: "W — Wish: Was willst du erreichen? In einem Satz." },
        { de: "O — Outcome: Stell dir das beste Ergebnis lebhaft vor. 30 Sekunden." },
        { de: "O — Obstacle: Was ist DEIN innerer Hauptblocker? Nicht 'die anderen' — du." },
        { de: "P — Plan: Wenn-dann-Plan. 'Wenn Hindernis X auftritt, dann mache ich Y.'" },
      ],
      tools: [],
      expected: { de: "Ein Wunsch mit einem klaren Wenn-dann-Plan — psychologisch deutlich wirksamer als reine 'Motivation'." },
      integrationHints: [
        { when: { de: "Montagmorgen-Planung" }, how: { de: "WOOP für das wichtigste Wochenziel." } },
        { when: { de: "Vor herausfordernden Projekten" }, how: { de: "WOOP zusätzlich zur Kickoff-Planung." } },
      ],
      reflectionPrompts: [
        { de: "Wie oft kommt dasselbe Hindernis bei dir wieder? Das ist dann ein Muster, kein Zufall." },
      ],
    },

    // 4
    {
      id: "self-compassion-break",
      title: { de: "Selbstmitgefühls-Pause" },
      phase: "application",
      format: "micro_challenge",
      length: "micro",
      estimatedMinutes: 2,
      scenario: { de: "Direkt nach Fehler, Kritik, Ablehnung oder einem Moment harter Selbstzweifel." },
      steps: [
        { de: "1: 'Das ist ein Moment von Stress.' — Achtsamkeit, kurze Pause." },
        { de: "2: 'Stress gehört zum Arbeiten dazu. Andere kennen das auch.' — gemeinsames Menschsein." },
        { de: "3: Hand aufs Herz oder eine andere beruhigende Geste. 'Möge ich freundlich zu mir sein.'" },
      ],
      tools: [],
      expected: { de: "Eine 2-Minuten-Intervention, die nachweislich Stress-Cortisol reduziert und nicht ins Selbstmitleid kippt." },
      integrationHints: [
        { when: { de: "Nach einem missglückten Pitch" }, how: { de: "Auf dem Weg zurück zum Schreibtisch, still für sich." } },
        { when: { de: "Nach Kritik im 1:1" }, how: { de: "5 Min Pause vor dem nächsten Termin — Hand aufs Herz, drei Sätze." } },
      ],
      reflectionPrompts: [
        { de: "Wann fällt es dir leichter, mit anderen mitfühlend zu sein als mit dir selbst?" },
      ],
    },

    // 5
    {
      id: "body-scan-short",
      title: { de: "MBSR-Body-Scan kurz" },
      phase: "application",
      format: "tool_tryout",
      length: "short",
      estimatedMinutes: 10,
      scenario: { de: "Mittagspause oder Übergang zwischen zwei intensiven Meetings." },
      steps: [
        { de: "Sitzen oder Liegen, Augen geschlossen." },
        { de: "Aufmerksamkeit langsam von den Füßen zum Kopf wandern." },
        { de: "Pro Körperregion 30 Sekunden — wahrnehmen, nicht verändern." },
        { de: "Bei Abschweifen: freundlich zurück zur Region." },
      ],
      tools: ["Geführte Audio-Datei (optional)"],
      expected: { de: "Sympathikus-Aktivität sinkt, du kommst vom Kopf in den Körper, und kannst messbar regulierter ins nächste Meeting." },
      integrationHints: [
        { when: { de: "Nach dem Mittagessen" }, how: { de: "10 Minuten im Stuhl, Tür zu, Wecker." } },
        { when: { de: "Übergang zwischen Deep-Work-Blöcken" }, how: { de: "Body-Scan als Reset, bevor du in die nächste Aufgabe gehst." } },
      ],
      reflectionPrompts: [
        { de: "Welche Körperregion war besonders schwer wahrzunehmen? Das ist oft die, in der Spannung sitzt." },
      ],
    },

    // 6
    {
      id: "coherence-breathing",
      title: { de: "Kohärenz-Atmung 5/6 Atemzüge pro Minute" },
      phase: "application",
      format: "micro_challenge",
      length: "micro",
      estimatedMinutes: 5,
      scenario: { de: "Vor einer Präsentation, einer Verhandlung oder einem schwierigen Gespräch." },
      steps: [
        { de: "Rhythmus: 5–6 Sekunden einatmen, 5–6 Sekunden ausatmen." },
        { de: "Aufmerksamkeit aufs Herz richten." },
        { de: "Bewusst ein positives Gefühl erinnern (Dankbarkeit, Verbundenheit)." },
        { de: "5 Minuten halten." },
      ],
      tools: ["Timer", "App mit Atem-Guide"],
      expected: { de: "Herzratenvariabilität (HRV) erhöht sich messbar, du gehst regulierter ins Gespräch." },
      integrationHints: [
        { when: { de: "Vor jeder Präsentation" }, how: { de: "Letzte 5 Min in einem Nebenraum oder am Schreibtisch." } },
        { when: { de: "Vor einem schwierigen Anruf" }, how: { de: "Wähl-Knopf erst nach den 5 Minuten drücken." } },
      ],
      reflectionPrompts: [
        { de: "Wie viele Gespräche wären besser gelaufen, hättest du diese 5 Minuten investiert?" },
      ],
    },

    // 7
    {
      id: "stress-reappraisal",
      title: { de: "Stress-Reappraisal vor dem Event" },
      phase: "application",
      format: "reflection",
      length: "micro",
      estimatedMinutes: 3,
      scenario: { de: "Direkt vor einer Präsentation, einer Prüfung, einem öffentlichen Auftritt." },
      steps: [
        { de: "Notiere: 'Mein körperlicher Stress ist Energie, die mir hilft, gut zu performen.'" },
        { de: "Liste drei positive Ausgänge des kommenden Events." },
        { de: "Atme tief, geh rein." },
      ],
      tools: ["Karteikarte"],
      expected: { de: "Veränderte physiologische Stressantwort — dieselben Symptome, andere Interpretation. Performance steigt nachweislich." },
      integrationHints: [
        { when: { de: "Vor Präsentationen" }, how: { de: "Karteikarte in der Hosentasche, kurz lesen." } },
        { when: { de: "Vor Bewerbungsgesprächen" }, how: { de: "Im Auto / Wartezimmer 3 Min, dann rein." } },
      ],
      reflectionPrompts: [
        { de: "Verändert sich die Bewertung deines Stress über die Wochen, wenn du das regelmäßig machst?" },
      ],
    },

    // 8
    {
      id: "bulls-eye-values",
      title: { de: "Bulls-Eye Werte-Landkarte" },
      phase: "exploration",
      format: "workshop",
      length: "block",
      estimatedMinutes: 40,
      scenario: { de: "Quartals-Review, Onboarding in eine neue Rolle, nach einem Karriere-Umbruch." },
      steps: [
        { de: "Zeichne eine Zielscheibe mit vier Quadranten: Arbeit/Bildung, Beziehungen, Freizeit, Gesundheit." },
        { de: "Markiere mit einem Punkt: wie nah liegt dein aktuelles Handeln an deinen Kernwerten in diesem Quadrant?" },
        { de: "Pro Quadrant: notiere eine kleine wertekonsistente Handlung für die nächste Woche." },
      ],
      tools: ["Papier", "Worksheet"],
      expected: { de: "Sichtbar gemachte Werte-Verhalten-Lücke pro Lebensbereich — und je eine kleine konkrete Korrekturbewegung." },
      integrationHints: [
        { when: { de: "Quartalsweise im Self-Review" }, how: { de: "Als 40-Minuten-Block, allein mit Stift und Papier." } },
        { when: { de: "Nach Karriere-Veränderung" }, how: { de: "Direkt nach der Entscheidung, bevor der Alltag wieder verschluckt." } },
      ],
      reflectionPrompts: [
        { de: "In welchem Quadranten ist die Lücke am größten — und was hat dich dorthin gebracht?" },
      ],
      artefact: { kind: "structured", fields: ["quadrant", "valueDistance", "weeklyAction"] },
    },

    // 9
    {
      id: "implementation-intention",
      title: { de: "Implementation Intention für Belastungsmomente" },
      phase: "application",
      format: "checklist",
      length: "micro",
      estimatedMinutes: 3,
      scenario: { de: "Wochenplanung — du weißt, welche Trigger diese Woche kommen werden." },
      steps: [
        { de: "Liste 2–3 bekannte Stress-Trigger für diese Woche." },
        { de: "Formuliere je einen Wenn-dann-Plan: 'Wenn X passiert, dann mache ich Y.'" },
        { de: "Y muss klein, konkret und sofort umsetzbar sein." },
      ],
      tools: [],
      expected: { de: "Vorbereitete Verhaltens-Patterns für Trigger, die du sonst überrascht annimmst." },
      integrationHints: [
        { when: { de: "Montagmorgen-Planung" }, how: { de: "Implementation Intentions für die Woche." } },
        { when: { de: "Sonntagabend-Vorausschau" }, how: { de: "Wenn-dann-Pläne für die kommenden Termine." } },
      ],
      reflectionPrompts: [
        { de: "Welcher Wenn-dann hat tatsächlich gegriffen — und welcher wurde wieder vergessen?" },
      ],
      artefact: { kind: "list" },
    },

    // 10
    {
      id: "shutdown-ritual",
      title: { de: "Shutdown-Ritual zum Tagesabschluss" },
      phase: "application",
      format: "checklist",
      length: "embedded",
      estimatedMinutes: 8,
      scenario: { de: "Täglich am Arbeitsende, vor dem Verlassen des Schreibtischs / Homeoffice-Modus." },
      steps: [
        { de: "Morgige To-dos auf eine Liste schreiben — der Kopf darf abgeben." },
        { de: "Offene Tabs / Tools schließen, Rechner herunterfahren oder Bildschirm aus." },
        { de: "Gesprochene Abschlussformel — 'Feierabend' laut sagen, klingt seltsam, wirkt." },
        { de: "Physische Grenze — Spaziergang, Umziehen, Tür zum Arbeitsraum schließen." },
      ],
      tools: ["To-do-App", "Wecker"],
      expected: { de: "Mentales Detachment — der stärkste Einzelprädiktor für Wohlbefinden und reduzierte Erschöpfung." },
      integrationHints: [
        { when: { de: "Täglich am Arbeitsende" }, how: { de: "8 Minuten fest im Kalender, vor dem regulären Feierabend-Zeitpunkt." } },
        { when: { de: "Vor dem Wochenende" }, how: { de: "Erweiterte Version freitags — was bleibt offen, was darf liegen?" } },
      ],
      reflectionPrompts: [
        { de: "An welchen Tagen lässt du das Ritual ausfallen — und wie geht's dir am nächsten Morgen?" },
      ],
    },

    // 11
    {
      id: "physiological-sigh",
      title: { de: "Physiological Sigh bei akutem Stress" },
      phase: "application",
      format: "micro_challenge",
      length: "micro",
      estimatedMinutes: 1,
      scenario: { de: "Im akuten Stressmoment: kurz bevor / während einem Spike — eine kritische Mail, ein eskalierender Call." },
      steps: [
        { de: "Doppelte Nasen-Einatmung: normaler Einatemzug, dann ein kurzer Zweitzug obendrauf." },
        { de: "Langes Ausatmen durch den Mund." },
        { de: "Dreimal wiederholen — dauert unter einer Minute." },
      ],
      tools: [],
      expected: { de: "Stärkste evidenzbasierte Akut-Regulierung gegenüber Box Breathing — Stimmung und HRV verbessern sich nachweislich." },
      integrationHints: [
        { when: { de: "Direkt nach kritischer Slack-Nachricht" }, how: { de: "Bevor du antwortest — 1 Min Physiological Sigh." } },
        { when: { de: "In eskalierenden Calls" }, how: { de: "Mute an, drei Sighs, Mute aus." } },
      ],
      reflectionPrompts: [
        { de: "Was hat sich nach den drei Atemzügen verändert — körperlich, mental, in der Tonalität deiner Antwort?" },
      ],
    },

    // 12
    {
      id: "social-support-buddy",
      title: { de: "Social-Support-Buddy bi-weekly" },
      phase: "application",
      format: "peer_exchange",
      length: "embedded",
      estimatedMinutes: 30,
      scenario: { de: "Alle zwei Wochen 30 Min mit einer:m Kolleg:in, im Kalender fest verankert." },
      steps: [
        { de: "Drei Fragen, jeweils 5 Min pro Person: Was belastet aktuell? Was gelingt? Welche konkrete Unterstützung brauche ich bis zum nächsten Check-in?" },
        { de: "Kein Beratung-Modus — Zuhören, kurz spiegeln, fragen." },
        { de: "Aktion zusagen, die bis zum nächsten Treffen erledigt ist." },
      ],
      tools: ["Kalender", "Templates für die drei Fragen"],
      expected: { de: "Soziale Unterstützung als belegter Prädiktor gegen Burnout — und ein:e Komplize:in für die kleinen Korrekturen." },
      integrationHints: [
        { when: { de: "Bi-weekly im Kalender" }, how: { de: "Fester 30-Minuten-Slot, 14-tägig, gleicher Wochentag." } },
        { when: { de: "In Peer-Learning-Gruppen" }, how: { de: "Statt 1:1 — Dreiergruppe, je 10 Min." } },
      ],
      reflectionPrompts: [
        { de: "Was hast du bei deinem Buddy gehört, das auch auf dich zutrifft, ohne dass du es zugibst?" },
      ],
      peerExchange: {
        prompt: { de: "Was belastet aktuell? Was gelingt? Welche Unterstützung brauchst du bis zum nächsten Check-in?" },
        minGroupSize: 2,
      },
    },
  ],

  // ── Integration ───────────────────────────────────────────
  checklists: [
    {
      id: "weekend-handover",
      title: { de: "Wochenende-Übergabe an dich selbst" },
      context: { de: "Freitagnachmittag, vor dem Wochenende." },
      items: [
        { de: "Was bleibt liegen — und ist explizit erlaubt zu warten?" },
        { de: "Was passiert montagmorgen sofort?" },
        { de: "Welche Person braucht eine kurze Mail, damit sie sich nicht sorgt?" },
        { de: "Welche Erholung hast du für das Wochenende geplant — konkret, nicht 'mal entspannen'?" },
      ],
    },
    {
      id: "stress-spike-protocol",
      title: { de: "Akut-Protokoll bei Stress-Spike" },
      context: { de: "Wenn du merkst, dass dein Stress über die Schwelle steigt." },
      items: [
        { de: "Eine Minute Physiological Sigh — bevor du etwas anderes machst." },
        { de: "Schließ Tabs, geh kurz raus, trink Wasser." },
        { de: "Frage: muss das jetzt entschieden werden, oder kann es 90 Minuten warten?" },
        { de: "Wenn nein — schreib es auf, geh weiter." },
      ],
    },
  ],

  habits: [
    {
      id: "evening-three-good",
      trigger: { de: "Bevor ich den Rechner herunterfahre" },
      action: { de: "schreibe ich drei Dinge auf, die heute gut gelaufen sind, und meinen Anteil daran." },
      cadence: "daily",
    },
    {
      id: "spike-sigh",
      trigger: { de: "Wenn ich bemerke, dass mein Stress über die Schwelle steigt" },
      action: { de: "mache ich drei Physiological Sighs — bevor ich antworte oder entscheide." },
      cadence: "per_event",
    },
    {
      id: "biweekly-buddy",
      trigger: { de: "Alle zwei Wochen, dienstags 10:00" },
      action: { de: "habe ich mein 30-Minuten-Buddy-Gespräch — fest im Kalender." },
      cadence: "weekly",
    },
  ],

  // ── Coach ─────────────────────────────────────────────────
  coach: {
    persona: {
      de: "Ich helfe dir, Belastung wahrzunehmen, ohne in Wellness-Floskeln zu verfallen. Wir suchen das kleinste Experiment, das jetzt etwas verschiebt.",
    },
    systemPrompt: {
      de: "Du bist Coach für Resilienz im Skill-Hacker. Deine Haltung: nüchtern, evidenzbasiert, ohne Mindset-Sprache. Wenn der Nutzer Stress beschreibt, frage zuerst nach Körperwahrnehmung — wo sitzt es, wie fühlt es sich an. Schlage nur konkrete kleine Experimente vor, nie 'denk positiv'. Empfehle Übungen aus dem Repertoire der Plattform — Physiological Sigh, ABC-Protokoll, Shutdown-Ritual — bevor du eigene Tipps gibst. Wenn jemand stark belastet wirkt (Schlafstörung, Suizidgedanken, anhaltende Erschöpfung), verweise klar an professionelle Hilfe.",
    },
    suggestedPrompts: [
      { de: "Wann hatte mein Körper diese Woche kein 'aus'?" },
      { de: "Was ist meine 30-Sekunden-Regulierung in der Drucksekunde?" },
      { de: "Welche Annahme über meine Belastbarkeit ist veraltet?" },
      { de: "Hilf mir, ein Shutdown-Ritual zu bauen, das ich heute durchhalte." },
    ],
  },
};
