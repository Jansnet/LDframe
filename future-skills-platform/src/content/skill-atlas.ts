import type { Skill } from "./schema";
import { listSkills } from "./registry";
import { t } from "@/lib/i18n";

/**
 * Atlas helpers — the registry IS the source of truth for which skills exist;
 * this file owns category metadata and grouping for the home view.
 *
 * Naming follows the Stifterverband Dec-2025 update: Kommunikation and
 * Kooperationskompetenz are foundational (not communal) in this revision;
 * the communal category covers Dialog / Demokratie / Verantwortung /
 * Beteiligung / Diversität.
 */

export type SkillCategory = Skill["category"];

export interface AtlasEntry {
  slug: string;
  name: string;
  category: SkillCategory;
}

export const CATEGORY_META: Record<SkillCategory, { label: string; short: string; tone: "clay" | "rust" | "primary" | "neutral" }> = {
  foundational:   { label: "Grundlegende",          short: "Was Mitarbeiten überhaupt trägt — denken, kommunizieren, kooperieren, sich selbst führen.", tone: "clay" },
  transformative: { label: "Transformative",        short: "Womit man Wandel aushält und gestaltet — Ambiguität, Resilienz, System- und Innovationssicht.", tone: "rust" },
  communal:       { label: "Gemeinschaftsorientierte", short: "Was Zusammenleben braucht — Dialog, Demokratie, Verantwortung, Beteiligung, Vielfalt.", tone: "primary" },
  digital:        { label: "Digitale",              short: "Den digitalen Alltag souverän — Information, Medien, Daten, KI, allgemeine Tools.", tone: "neutral" },
  technological:  { label: "Technologische",        short: "Wer Technik baut, betreibt, verantwortet — Data Science, AI, Cybersecurity, Cloud, autonome Systeme.", tone: "neutral" },
};

export const CATEGORY_ORDER: SkillCategory[] = [
  "foundational",
  "transformative",
  "communal",
  "digital",
  "technological",
];

/** All atlas entries derived from the registry, in registry order. */
export function atlasEntries(): AtlasEntry[] {
  return listSkills().map((s) => ({
    slug: s.slug,
    name: t(s.name),
    category: s.category,
  }));
}

/** Atlas entries grouped by category, in display order. */
export function atlasByCategory(): Record<SkillCategory, AtlasEntry[]> {
  const grouped: Record<SkillCategory, AtlasEntry[]> = {
    foundational: [],
    transformative: [],
    communal: [],
    digital: [],
    technological: [],
  };
  for (const entry of atlasEntries()) grouped[entry.category].push(entry);
  return grouped;
}

/** Slugs of fully published skills (exercises + foundations + coach persona). */
export function publishedSlugs(): Set<string> {
  return new Set(listSkills().filter((s) => s.status === "published").map((s) => s.slug));
}
