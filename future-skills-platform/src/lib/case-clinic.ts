/**
 * Kollegiale Fallberatung — structured 6-phase peer consultation.
 *
 * Established German group format (also known as case clinic / consultation
 * intervision). Used here for skill application in real work situations.
 *
 * Works in two modes:
 *   - With peers (3-6 consultants + 1 owner + 1 facilitator)
 *   - Solo (the AI coach plays facilitator + steel-man consultant)
 *
 * The phases are deliberately enforced — they're the protection against
 * the format collapsing into "let me give you advice" too fast.
 */

export type CasePhase =
  | "setup"
  | "case"
  | "clarify"
  | "hypotheses"
  | "resources"
  | "agreement"
  | "done";

export const PHASE_ORDER: CasePhase[] = [
  "setup",
  "case",
  "clarify",
  "hypotheses",
  "resources",
  "agreement",
  "done",
];

export interface PhaseDef {
  phase: CasePhase;
  label: string;
  durationMinutes: number;
  who: string;
  description: string;
  prompts: string[];
}

export const PHASES: PhaseDef[] = [
  {
    phase: "setup",
    label: "Aufstellung",
    durationMinutes: 3,
    who: "Moderation",
    description: "Rollen klären, Vertraulichkeit zusagen, Zeitrahmen festlegen.",
    prompts: [
      "Wer ist Fallgeber:in, wer moderiert, wer berät?",
      "Vereinbarung: alles, was hier besprochen wird, bleibt im Raum.",
      "45 Minuten — wir halten uns daran.",
    ],
  },
  {
    phase: "case",
    label: "Fallschilderung",
    durationMinutes: 5,
    who: "Fallgeber:in",
    description:
      "Die situation in ihren Worten erzählen — eine konkrete Szene, kein abstraktes Problem.",
    prompts: [
      "Wann genau hat es stattgefunden?",
      "Wer war beteiligt — auch nur am Rand?",
      "Was war dein Anteil?",
      "Was hat dich dabei beschäftigt, das du nicht losbekommst?",
    ],
  },
  {
    phase: "clarify",
    label: "Verständnisfragen",
    durationMinutes: 5,
    who: "Berater:innen",
    description:
      "Nur Fragen, keine Hypothesen, keine Lösungen. Stoppt euch gegenseitig, wenn jemand schon berät.",
    prompts: [
      "Wer hatte den ersten Impuls — du oder die andere Person?",
      "Was hattest du gehofft, das stattdessen passiert?",
      "Was würde jemand sehen, der dabei war, was du nicht siehst?",
    ],
  },
  {
    phase: "hypotheses",
    label: "Hypothesen",
    durationMinutes: 10,
    who: "Berater:innen",
    description:
      "Was könnte da unter der Oberfläche laufen? Hypothesen werden gesammelt, nicht bewertet.",
    prompts: [
      "Welches Muster wiederholt sich hier vielleicht?",
      "Wo könnte ein Werte-Konflikt zwischen den Beteiligten sein?",
      "Was, wenn das gar nicht die eigentliche Frage war?",
    ],
  },
  {
    phase: "resources",
    label: "Ressourcen & Ideen",
    durationMinutes: 10,
    who: "Berater:innen",
    description:
      "Konkrete Handlungsmöglichkeiten. Jede:r teilt nacheinander einen Vorschlag, ohne zu diskutieren.",
    prompts: [
      "Was würdest du an Stelle der Person beim nächsten ähnlichen Moment ausprobieren?",
      "Welche Übung aus dem aktuellen Skill könnte hier konkret andocken?",
      "Was wäre ein 5-Minuten-Experiment, das die Lage testet?",
    ],
  },
  {
    phase: "agreement",
    label: "Vereinbarung",
    durationMinutes: 5,
    who: "Fallgeber:in",
    description:
      "Aus allem Gehörten EINEN konkreten nächsten Schritt wählen — und ihn jetzt aussprechen.",
    prompts: [
      "Was nimmst du mit, das du sonst nicht gesehen hättest?",
      "Welchen einen Schritt machst du bis wann konkret?",
      "Wem aus der Runde berichtest du, wenn du ihn gemacht hast?",
    ],
  },
  {
    phase: "done",
    label: "Abschluss",
    durationMinutes: 2,
    who: "Alle",
    description: "Kurze Rückmeldung, was die Runde mit jedem gemacht hat.",
    prompts: [
      "Ein Wort zum Schluss — was nimmst DU als Berater:in mit?",
    ],
  },
];

export function nextPhase(current: CasePhase): CasePhase {
  const idx = PHASE_ORDER.indexOf(current);
  return PHASE_ORDER[Math.min(idx + 1, PHASE_ORDER.length - 1)];
}

export function totalDuration(): number {
  return PHASES.reduce((sum, p) => sum + p.durationMinutes, 0);
}
