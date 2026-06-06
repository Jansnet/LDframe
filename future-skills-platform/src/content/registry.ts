import { Skill, validateSkillCompleteness } from "./schema";
import { kritischesDenken } from "./skills/kritisches-denken";
import { resilienz } from "./skills/resilienz";
import { aiLiteracy } from "./skills/ai-literacy";
import { STUB_SKILLS } from "./skills/_stubs";

/**
 * Code-level skill registry. Authoritative list of built-in skills.
 * Org-specific CustomSkill rows are merged at read time to produce the
 * user-facing atlas.
 *
 * Published skills (full content) sit in their own files; stub skills live
 * in skills/_stubs.ts until they graduate. The atlas shows both — stubs as
 * authored with anchors, published with the full cycle.
 *
 * Module-load enforces three invariants:
 *   1. Every skill passes the Skill zod schema.
 *   2. Slugs are globally unique — a graduated skill that wasn't removed
 *      from STUB_SKILLS would otherwise silently produce two rows.
 *   3. Published skills meet validateSkillCompleteness (≥10 exercises,
 *      length/format/phase mix). Stubs are exempt.
 */
const builtin: Skill[] = [kritischesDenken, resilienz, aiLiteracy, ...STUB_SKILLS];

const seenSlugs = new Set<string>();
for (const skill of builtin) {
  const parsed = Skill.safeParse(skill);
  if (!parsed.success) {
    // eslint-disable-next-line no-console
    console.error(`Invalid skill module: ${skill.slug}`, parsed.error.format());
    throw new Error(`Invalid skill: ${skill.slug}`);
  }
  if (seenSlugs.has(skill.slug)) {
    throw new Error(
      `Duplicate skill slug "${skill.slug}". A stub graduated to its own file but was not removed from STUB_SKILLS.`,
    );
  }
  seenSlugs.add(skill.slug);

  const issues = validateSkillCompleteness(skill);
  if (issues.length > 0) {
    throw new Error(`Skill "${skill.slug}" failed completeness:\n  - ${issues.join("\n  - ")}`);
  }
}

export function listSkills(): Skill[] {
  return builtin;
}

export function getSkill(slug: string): Skill | undefined {
  return builtin.find((s) => s.slug === slug);
}

export type { Skill };
