import type { Skill } from "./schema";
import { listSkills } from "./registry";

/**
 * Canonical 30-skill atlas — Stifterverband Future Skills 2030 (Dec 2025).
 *
 * Source-of-truth for the skill map on /. Skills with an authored module
 * (src/content/skills/<slug>.ts) link through to the full skill page;
 * placeholders are shown faded with a "kommt" tag.
 *
 * When a skill module is added, no change needed here — `hasModule` is
 * computed from the registry at render time.
 *
 * Naming follows the Dec-2025 update: Kommunikationskompetenz and
 * Kooperationskompetenz are foundational (not communal) in this revision;
 * the communal category covers Dialog/Demokratie/Verantwortung/
 * Beteiligung/Diversität.
 */

export type SkillCategory = Skill["category"];

export interface AtlasEntry {
  slug: string;
  name: string;
  category: SkillCategory;
}

export const SKILL_ATLAS: AtlasEntry[] = [
  // ── Grundlegende (foundational) — 8 ───────────────────────
  { slug: "kritisches-denken",        name: "Kritisches Denken",        category: "foundational" },
  { slug: "kommunikation",            name: "Kommunikation",            category: "foundational" },
  { slug: "kollaboration",            name: "Kollaboration",            category: "foundational" },
  { slug: "problemloesungskompetenz", name: "Problemlösungskompetenz",  category: "foundational" },
  { slug: "lernkompetenz",            name: "Lernkompetenz",            category: "foundational" },
  { slug: "ethische-kompetenz",       name: "Ethische Kompetenz",       category: "foundational" },
  { slug: "selbstkompetenz",          name: "Selbstkompetenz",          category: "foundational" },
  { slug: "kreativitaet",             name: "Kreativität",              category: "foundational" },

  // ── Transformative — 6 ────────────────────────────────────
  { slug: "ambiguitaetskompetenz",    name: "Ambiguitätskompetenz",     category: "transformative" },
  { slug: "nachhaltigkeitskompetenz", name: "Nachhaltigkeitskompetenz", category: "transformative" },
  { slug: "systemkompetenz",          name: "Systemkompetenz",          category: "transformative" },
  { slug: "innovationskompetenz",     name: "Innovationskompetenz",     category: "transformative" },
  { slug: "visionskompetenz",         name: "Visionskompetenz",         category: "transformative" },
  { slug: "resilienz",                name: "Resilienz",                category: "transformative" },

  // ── Gemeinschaftsorientierte (communal) — 5 ───────────────
  { slug: "dialogkompetenz",          name: "Dialogkompetenz",          category: "communal" },
  { slug: "demokratiekompetenz",      name: "Demokratiekompetenz",      category: "communal" },
  { slug: "verantwortungsuebernahme", name: "Verantwortungsübernahme",  category: "communal" },
  { slug: "beteiligungskompetenz",    name: "Beteiligungskompetenz",    category: "communal" },
  { slug: "diversitaetskompetenz",    name: "Diversitätskompetenz",     category: "communal" },

  // ── Digitale — 5 ──────────────────────────────────────────
  { slug: "informationskompetenz",    name: "Informationskompetenz",    category: "digital" },
  { slug: "digital-literacy",         name: "Digital Literacy",         category: "digital" },
  { slug: "medienkompetenz",          name: "Medienkompetenz",          category: "digital" },
  { slug: "datenkompetenz",           name: "Datenkompetenz",           category: "digital" },
  { slug: "ai-literacy",              name: "KI-Kompetenz",             category: "digital" },

  // ── Technologische — 6 ────────────────────────────────────
  { slug: "data-science-analytics",   name: "Data Science & Analytics", category: "technological" },
  { slug: "ai-engineering",           name: "AI Engineering",           category: "technological" },
  { slug: "cybersecurity",            name: "Cybersecurity",            category: "technological" },
  { slug: "cloud-dev-ops",            name: "Cloud Dev & Operations",   category: "technological" },
  { slug: "autonomous-systems",       name: "Autonomous Systems & Robotics", category: "technological" },
  { slug: "ai-leadership",            name: "Change Management & AI Leadership", category: "technological" },
];

export const CATEGORY_META: Record<SkillCategory, { label: string; short: string; tone: "clay" | "rust" | "primary" | "neutral" | "neutral" }> = {
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

/** Returns the atlas entries grouped by category, in display order. */
export function atlasByCategory(): Record<SkillCategory, AtlasEntry[]> {
  const grouped: Record<SkillCategory, AtlasEntry[]> = {
    foundational: [],
    transformative: [],
    communal: [],
    digital: [],
    technological: [],
  };
  for (const entry of SKILL_ATLAS) grouped[entry.category].push(entry);
  return grouped;
}

/** Slugs of skills with any content module — stub or published. */
export function authoredSlugs(): Set<string> {
  return new Set(listSkills().map((s) => s.slug));
}

/** Slugs of fully published skills (exercises + foundations + coach persona). */
export function publishedSlugs(): Set<string> {
  return new Set(listSkills().filter((s) => s.status === "published").map((s) => s.slug));
}
