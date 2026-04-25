import Link from "next/link";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import type { Skill } from "@/content/schema";
import { t, type Locale } from "@/lib/i18n";

const categoryLabel: Record<Skill["category"], { de: string; en: string; tone: "neutral" | "primary" | "clay" | "rust" }> = {
  foundational:   { de: "Grundlegend",    en: "Foundational",   tone: "clay" },
  transformative: { de: "Transformativ",  en: "Transformative", tone: "rust" },
  communal:       { de: "Gemeinschaft",   en: "Communal",       tone: "primary" },
  digital:        { de: "Digital",        en: "Digital",        tone: "neutral" },
  technological:  { de: "Technologisch",  en: "Technological",  tone: "neutral" },
};

export function SkillCard({ skill, locale = "de" }: { skill: Skill; locale?: Locale }) {
  const cat = categoryLabel[skill.category];
  return (
    <Link href={`/skills/${skill.slug}`}>
      <Card variant="elevated" interactive className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <Chip tone={cat.tone}>{cat[locale]}</Chip>
          <span className="font-mono text-label-sm text-on-surface-muted">
            {skill.exercises.length} Übungen
          </span>
        </div>
        <CardTitle>{t(skill.name, locale)}</CardTitle>
        <CardBody className="flex-1">{t(skill.definition, locale)}</CardBody>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {skill.megatrendTags.slice(0, 3).map((tag) => (
            <Chip key={tag} tone="neutral" className="text-label-sm">
              #{tag}
            </Chip>
          ))}
        </div>
      </Card>
    </Link>
  );
}
