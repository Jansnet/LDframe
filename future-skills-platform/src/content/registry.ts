import { Skill } from "./schema";

/**
 * Code-level skill registry. This is the authoritative list of built-in
 * skills. Org-specific CustomSkill rows are merged in at read time via
 * `loadSkills()` to produce the user-facing atlas.
 *
 * NOTE (current state): the three MVP skill modules
 * (kritisches-denken, resilienz, ai-literacy) are scheduled but not yet
 * authored. The exercise research is complete (see git history) — once the
 * modules land in src/content/skills/, import them here and the registry
 * validates each one against the Zod schema on module load.
 */
const builtin: Skill[] = [];

for (const skill of builtin) {
  const parsed = Skill.safeParse(skill);
  if (!parsed.success) {
    // eslint-disable-next-line no-console
    console.error(`Invalid skill module: ${skill.slug}`, parsed.error.format());
    throw new Error(`Invalid skill: ${skill.slug}`);
  }
}

export function listSkills(): Skill[] {
  return builtin;
}

export function getSkill(slug: string): Skill | undefined {
  return builtin.find((s) => s.slug === slug);
}

export type { Skill };
