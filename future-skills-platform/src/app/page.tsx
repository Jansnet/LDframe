import { listSkills } from "@/content/registry";
import { SkillCard } from "@/components/skills/SkillCard";
import { Chip } from "@/components/ui/Chip";

export default function HomePage() {
  const skills = listSkills();

  return (
    <div className="space-y-12">
      <section className="max-w-3xl">
        <h1 className="font-serif text-display-md text-on-surface mb-4">
          Zukunftskompetenzen, trainierbar gemacht.
        </h1>
        <p className="text-body-lg text-on-surface-muted">
          Basierend auf dem Future-Skills-Framework 2030 des Stifterverbands.
          Jeder Skill hat einen vollständigen Lernzyklus aus{" "}
          <span className="font-medium text-on-surface">Foundation → Exploration → Application → Integration</span>,
          passt sich an deine Jobrolle an und baut Übungen in deinen Arbeitsalltag ein — statt
          obendrauf.
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-headline-md text-on-surface">Skill-Atlas</h2>
          <Chip tone="neutral" className="text-label-sm">
            {skills.length} Skills im MVP
          </Chip>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((s) => (
            <SkillCard key={s.slug} skill={s} />
          ))}
        </div>
      </section>
    </div>
  );
}
