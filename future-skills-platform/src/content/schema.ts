import { z } from "zod";

// ───────────────────────────────────────────────────────────────
// Content schema — single source of truth.
//
// These Zod schemas are used three ways:
//   1. Type-safety for code-level skill modules (src/content/skills/*.ts)
//   2. Runtime validation for org-authored content (CustomSkill / CustomExercise)
//   3. Generator for the authoring template (content-authoring/TEMPLATE.md).
//
// When you extend these schemas, also update
// content-authoring/example-skill.yaml and docs/AUTHORING.md.
// ───────────────────────────────────────────────────────────────

// Every human-readable field is a LocalizedString so the platform is i18n-ready
// from the start. DE is the default authoring language.
export const LocalizedString = z.object({
  de: z.string().min(1),
  en: z.string().optional(),
});
export type LocalizedString = z.infer<typeof LocalizedString>;

export const Category = z.enum([
  "foundational",    // Grundlegende Zukunftskompetenzen
  "transformative",  // Transformative Zukunftskompetenzen
  "communal",        // Gemeinschaftsorientierte Zukunftskompetenzen
  "digital",         // Digitale Zukunftskompetenzen
  "technological",   // Technologische Zukunftskompetenzen
]);

export const Phase = z.enum(["foundation", "exploration", "application", "integration"]);
export type Phase = z.infer<typeof Phase>;

export const LengthCategory = z.enum([
  "micro",    // 1–3 min — between meetings, coffee break
  "short",    // 5–10 min — meeting opener, daily review
  "embedded", // during real task — next 1:1, next stakeholder call
  "block",    // 30–60 min — focus slot, weekly learning hour
  "deep",     // 2h+ — workshop, team retro, learning sprint
]);
export type LengthCategory = z.infer<typeof LengthCategory>;

export const Format = z.enum([
  "reflection",       // prompt-driven self-reflection
  "journaling",       // open writing
  "observation",      // field notes on real situations
  "dialogue",         // real conversation with another person
  "roleplay",         // scripted practice
  "case_analysis",    // structured analysis of a case
  "experiment",       // hypothesis → act → observe → reflect
  "tool_tryout",      // try a specific tool / technique
  "checklist",        // apply a checklist to a real task
  "peer_exchange",    // show-your-work with peers
  "workshop",         // facilitated group session
  "micro_challenge",  // small dare, bounded in time
]);
export type Format = z.infer<typeof Format>;

export const Analogy = z.object({
  id: z.string(),
  title: LocalizedString,
  body: LocalizedString,
  // Optional: what the analogy *breaks down* — every analogy has edges.
  limits: LocalizedString.optional(),
});

export const FoundationModule = z.object({
  id: z.string(),
  title: LocalizedString,
  kind: z.enum(["concept", "model", "reading", "video"]),
  body: LocalizedString,        // markdown allowed
  readingMinutes: z.number().int().positive(),
  externalUrl: z.string().url().optional(),
});

export const IntegrationHint = z.object({
  when: LocalizedString,        // "before your next 1:1"
  how:  LocalizedString,        // "open with the question ..."
});

export const Exercise = z.object({
  id: z.string(),
  title: LocalizedString,
  phase: Phase,                  // exploration | application (foundation & integration have their own types)
  format: Format,
  length: LengthCategory,
  estimatedMinutes: z.number().int().positive(),

  // Structured body — the authoring template.
  hypothesis:  LocalizedString.optional(),     // only for format = "experiment"
  scenario:    LocalizedString,                 // concrete example
  steps:       z.array(LocalizedString).min(1),
  tools:       z.array(z.string()).default([]), // free tags
  expected:    LocalizedString,                 // what should become visible

  // Integration into real work — required for phase = "application".
  integrationHints: z.array(IntegrationHint).min(1),

  // Post-exercise reflection.
  reflectionPrompts: z.array(LocalizedString).min(1),

  // Social dimension.
  peerExchange: z
    .object({
      prompt: LocalizedString,
      minGroupSize: z.number().int().positive().default(2),
    })
    .optional(),

  // Artefact capture — what does the user save?
  artefact: z
    .object({
      kind: z.enum(["journal", "checklist", "list", "structured"]),
      fields: z.array(z.string()).optional(),
    })
    .optional(),
});
export type Exercise = z.infer<typeof Exercise>;

export const Checklist = z.object({
  id: z.string(),
  title: LocalizedString,
  context: LocalizedString,   // "for your next stakeholder meeting"
  items: z.array(LocalizedString).min(1),
});

export const HabitTemplate = z.object({
  id: z.string(),
  trigger: LocalizedString,   // "when I open a report draft"
  action: LocalizedString,    // "I ask myself: what claim am I making?"
  cadence: z.enum(["daily", "weekly", "per_event"]),
});

export const LevelAnchor = z.object({
  level: z.enum(["L1", "L2", "L3", "L4"]),
  observable: LocalizedString,   // "Beobachtbar von außen" — what others see
  innerMarker: LocalizedString,  // "Innerer Marker" — what the person notices in themselves
});
export type LevelAnchor = z.infer<typeof LevelAnchor>;

export const CoachProfile = z.object({
  // Short identity the AI coach adopts when scoped to this skill.
  persona: LocalizedString,
  systemPrompt: LocalizedString,
  // These phrases are exposed as prompt chips in the UI.
  suggestedPrompts: z.array(LocalizedString).min(3),
});

export const Skill = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  category: Category,
  name: LocalizedString,
  stifterverbandId: z.string().optional(),  // reference into Future-Skills-Framework 2030

  definition: LocalizedString,              // Stifterverband wording, attributed
  megatrendTags: z.array(z.string()).default([]),
  relatedSkills: z.array(z.string()).default([]),

  analogies: z.array(Analogy).min(1),

  // Self-positioning anchors L1-L4. Optional during rollout — skills without
  // anchors fall back to the generic skill detail without the positioning card.
  levelAnchors: z.array(LevelAnchor).length(4).optional(),

  foundation: z.array(FoundationModule).min(1),
  exercises: z.array(Exercise).min(10),       // plan mandates at least 10
  checklists: z.array(Checklist).default([]),
  habits: z.array(HabitTemplate).default([]),

  coach: CoachProfile,

  // Publication metadata — non-blocking but useful for governance.
  version: z.string().default("1.0.0"),
  authors: z.array(z.string()).default([]),
  lastReviewedAt: z.string().optional(),
});
export type Skill = z.infer<typeof Skill>;

// Helper for exercise mix validation.
export function validateExerciseMix(exercises: Exercise[]): string[] {
  const issues: string[] = [];
  const byLength = new Set(exercises.map((e) => e.length));
  const byFormat = new Set(exercises.map((e) => e.format));
  const byPhase = new Set(exercises.map((e) => e.phase));

  if (byLength.size < 3) issues.push("Use at least 3 different length categories.");
  if (byFormat.size < 4) issues.push("Use at least 4 different exercise formats.");
  if (!byPhase.has("application")) issues.push("At least one exercise must be phase=application.");
  return issues;
}
