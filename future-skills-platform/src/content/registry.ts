import { Skill } from "./schema";
import { kritischesDenken } from "./skills/kritisches-denken";
import { resilienz } from "./skills/resilienz";
import { aiLiteracy } from "./skills/ai-literacy";

/**
 * Code-level skill registry. Authoritative list of built-in skills.
 * Org-specific CustomSkill rows are merged at read time to produce the
 * user-facing atlas.
 */
const builtin: Skill[] = [kritischesDenken, resilienz, aiLiteracy];

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
