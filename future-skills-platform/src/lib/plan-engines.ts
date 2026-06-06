import type { Skill, Exercise } from "@/content/schema";

/**
 * Plan generator engines — HILL backbone as silent backend logic.
 *
 * Three subsystems, each contributes plan items per week:
 *   1. Gap Engine        — anchors the cycle in a real situation +
 *                          identity statement (Urgency, Agency).
 *   2. Coach/Cohort       — surfaces dialogue, peer exchange, AI coach
 *                          touchpoints (Collaboration, Hybrid).
 *   3. Artefact/Reflect   — every exercise produces an artefact;
 *                          weekly reflection ritualizes self-assessment
 *                          (Action/Knowledge Sharing, Assessment-as-Learning).
 *
 * Flexibility (formal/informal) is the cross-cut: we deliberately mix
 * length categories every week — never an all-block week, never an
 * all-micro week.
 *
 * The user never sees "HILL" or "engine" naming; they see a balanced plan
 * that "happens to" cover all the building blocks over the cycle.
 */

export type PlanItemKind =
  | "foundation"
  | "exercise"
  | "reflection"
  | "peer_check_in"
  | "coach_session"
  | "identity_check"
  | "artefact_review";

export interface GeneratedPlanItem {
  weekIndex: number; // 0-based
  dayOffset: number; // day within the week, 0-6
  kind: PlanItemKind;
  exerciseId?: string;
  rationale: string; // for transparency in the UI (why is this here?)
}

interface GenerateOpts {
  skill: Skill;
  weeks: number;
  hasCohort: boolean;
  hasManager: boolean;
}

export function generatePlan(opts: GenerateOpts): GeneratedPlanItem[] {
  const { skill, weeks, hasCohort, hasManager } = opts;
  const items: GeneratedPlanItem[] = [];

  const exploration = skill.exercises.filter((e) => e.phase === "exploration");
  const application = skill.exercises.filter((e) => e.phase === "application");
  const allByLength = groupByLength(skill.exercises);

  for (let w = 0; w < weeks; w++) {
    // Week mixes lengths deliberately (Flexibility cross-cut).
    const weekMix = pickWeekMix(allByLength, w, weeks, exploration, application);
    weekMix.forEach((ex, i) => {
      items.push({
        weekIndex: w,
        dayOffset: 1 + i * 2, // spread across the week
        kind: "exercise",
        exerciseId: ex.id,
        rationale: rationaleForExercise(ex, w, weeks),
      });
    });

    // Reflection ritual — Block 7 (Assessment as Learning). Friday end-of-week.
    items.push({
      weekIndex: w,
      dayOffset: 5,
      kind: "reflection",
      rationale: "Kurz hinschauen: was hat funktioniert, was kommt nächste Woche dran?",
    });

    // Identity check at midpoint and end of cycle — Block 1+2 (Urgency, Agency).
    if (w === Math.floor(weeks / 2) || w === weeks - 1) {
      items.push({
        weekIndex: w,
        dayOffset: 6,
        kind: "identity_check",
        rationale: "Bist du auf dem Weg zu deinem Identity Statement?",
      });
    }

    // Coach touchpoint — Block 3 (Coaching). Once per week, regardless of cohort.
    items.push({
      weekIndex: w,
      dayOffset: 3,
      kind: "coach_session",
      rationale: "10 Minuten mit dem AI-Coach: laufende Anwendung reflektieren.",
    });

    // Cohort peer check-in — only if cohort active.
    if (hasCohort) {
      items.push({
        weekIndex: w,
        dayOffset: 4,
        kind: "peer_check_in",
        rationale: "Show your work an die Cohort, zwei Peer-Reactions zurück.",
      });
    }

    // Artefact review — Block 5+7. End of week 1 and 3 of a 4-week cycle.
    if (w === 1 || w === weeks - 2) {
      items.push({
        weekIndex: w,
        dayOffset: 5,
        kind: "artefact_review",
        rationale: "Welche konkreten Artefakte sind diese Woche entstanden? Was zeigt das?",
      });
    }
  }

  return items;
}

function groupByLength(exercises: Exercise[]): Record<string, Exercise[]> {
  return exercises.reduce<Record<string, Exercise[]>>((acc, e) => {
    acc[e.length] = acc[e.length] ?? [];
    acc[e.length].push(e);
    return acc;
  }, {});
}

function pickWeekMix(
  byLength: Record<string, Exercise[]>,
  weekIndex: number,
  totalWeeks: number,
  exploration: Exercise[],
  application: Exercise[],
): Exercise[] {
  // Week 0: foundation-leaning, micro + short, exploration phase.
  // Week 1+: progressively more application, more embedded.
  // Final week: integration check via embedded + block.
  const isEarly = weekIndex < totalWeeks / 2;
  const sources = isEarly ? exploration.concat(application) : application.concat(exploration);

  const lengths = isEarly
    ? ["micro", "short", "short"]
    : ["micro", "embedded", "embedded"];

  const picks: Exercise[] = [];
  for (const len of lengths) {
    const pool = byLength[len] ?? sources;
    if (pool.length === 0) continue;
    const candidate = pool[(weekIndex + picks.length) % pool.length];
    if (candidate && !picks.includes(candidate)) picks.push(candidate);
  }
  return picks;
}

function rationaleForExercise(ex: Exercise, weekIndex: number, totalWeeks: number): string {
  if (ex.length === "micro") return "Eine winzige Übung, die zwischen zwei Meetings passt.";
  if (ex.length === "embedded") return "Diese Übung läuft in deinem realen Arbeitsmoment mit — keine Extra-Zeit.";
  if (ex.phase === "application" && weekIndex >= totalWeeks / 2) {
    return "Wir verlassen jetzt den Übungsraum — das hier passiert in deiner realen Arbeit.";
  }
  return "Bewusst gemischt mit deinen kürzeren Übungen diese Woche.";
}
