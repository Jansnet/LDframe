import Link from "next/link";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { PhaseStepper } from "@/components/ui/PhaseStepper";
import { prisma } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import { getSkill } from "@/content/registry";
import { describeBadge } from "@/lib/gentle-gamification";
import { t } from "@/lib/i18n";

/**
 * /plan — the active-cycle view.
 *
 * Pulls real data (when authenticated) and degrades gracefully to a hint
 * card for first-time / unauthenticated users.
 *
 * The page deliberately balances three lanes:
 *   - Übungen diese Woche      (action)
 *   - Habits / behavior         (behavior baseline)
 *   - Stille Spur               (gentle gamification — last, smallest)
 */
export const dynamic = "force-dynamic";

export default async function PlanPage() {
  const userId = await getSessionUserId().catch(() => "demo");

  const [identity, planItemsThisWeek, streak, badges, artefactCountThisWeek] = await Promise.all([
    prisma.identityStatement
      .findFirst({
        where: { userId, fulfilled: false, closedAt: null },
        orderBy: { startedAt: "desc" },
      })
      .catch(() => null),
    prisma.planItem
      .findMany({
        where: {
          userId,
          scheduledFor: {
            gte: startOfWeek(),
            lt: endOfWeek(),
          },
        },
        orderBy: { scheduledFor: "asc" },
      })
      .catch(() => []),
    prisma.streak
      .findUnique({ where: { userId_kind: { userId, kind: "artefact_weekly" } } })
      .catch(() => null),
    prisma.badge.findMany({ where: { userId }, orderBy: { awardedAt: "desc" } }).catch(() => []),
    prisma.artefact
      .count({ where: { userId, createdAt: { gte: startOfWeek() } } })
      .catch(() => 0),
  ]);

  if (!identity) {
    return <EmptyState />;
  }

  const skill = getSkill(identity.skillSlug);
  const skillName = skill ? t(skill.name) : identity.skillSlug;
  const daysSinceStart = Math.floor(
    (Date.now() - identity.startedAt.getTime()) / (24 * 60 * 60 * 1000),
  );
  const weekIndex = Math.floor(daysSinceStart / 7) + 1;
  const currentPhase = phaseForWeek(weekIndex, identity.weeks);

  const exerciseItems = planItemsThisWeek.filter((p) => p.phase !== "integration");
  const upcomingNonExercise = planItemsThisWeek.filter((p) => p.phase === "integration");

  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <h1 className="font-serif text-display-md text-on-surface mb-3">Mein Plan</h1>
        <p className="text-body-lg text-on-surface-muted">
          Dein {identity.weeks}-Wochen-Zyklus für <strong>{skillName}</strong> — heute Tag {daysSinceStart + 1}.
        </p>
      </header>

      <Card variant="filled" className="border-l-4 border-primary">
        <span className="font-mono text-label-sm text-primary">IDENTITY STATEMENT</span>
        <p className="font-serif text-title-lg text-on-surface mt-1">
          „{identity.statement}"
        </p>
        <p className="text-body-md text-on-surface-muted mt-2">
          {identity.weeks}-Wochen-Zyklus, gestartet vor {daysSinceStart} Tag{daysSinceStart === 1 ? "" : "en"}.
        </p>
      </Card>

      <section className="bg-surface-container rounded-lg p-4">
        <PhaseStepper current={currentPhase} />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card variant="filled">
          <div className="flex items-center justify-between mb-2">
            <Chip tone="primary">Diese Woche</Chip>
            <span className="font-mono text-label-sm text-on-surface-muted">
              W{weekIndex} / W{identity.weeks}
            </span>
          </div>
          <CardTitle>
            {exerciseItems.length} geplante {exerciseItems.length === 1 ? "Aktion" : "Aktionen"}
          </CardTitle>
          <CardBody>
            {exerciseItems.length === 0 ? (
              <p className="italic">Diese Woche ist noch leer — generiere einen Plan oder schau im Atlas.</p>
            ) : (
              <ul className="space-y-2">
                {exerciseItems.slice(0, 5).map((item) => (
                  <li key={item.id} className="flex justify-between gap-3">
                    <Link
                      href={
                        item.exerciseId
                          ? `/skills/${item.skillSlug}/exercises/${item.exerciseId}`
                          : `/skills/${item.skillSlug}`
                      }
                      className="hover:underline truncate"
                    >
                      {item.notes ?? item.exerciseId ?? item.phase}
                    </Link>
                    <Chip tone="neutral" className="text-label-sm shrink-0">
                      {item.status}
                    </Chip>
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>

        <Card variant="outlined">
          <CardTitle>Verankerung</CardTitle>
          <CardBody>
            <p className="mb-3">
              Diese Woche koppelst du deinen Skill an deinen Alltag — nicht obendrauf, sondern eingewebt.
            </p>
            {upcomingNonExercise.length > 0 && (
              <ul className="space-y-1">
                {upcomingNonExercise.slice(0, 3).map((item) => (
                  <li key={item.id} className="text-body-md">
                    <strong className="text-on-surface">{labelForKind(item.phase)}: </strong>
                    {item.notes ?? "geplant"}
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>

        <Card variant="outlined">
          <CardTitle>Stille Spur</CardTitle>
          <CardBody>
            <div className="space-y-3 text-body-md">
              <p>
                <span className="font-mono text-label-sm text-primary block">ARTEFAKTE-WOCHE</span>
                <span className="font-serif text-headline-md text-on-surface">
                  {artefactCountThisWeek}
                </span>
              </p>
              <p>
                <span className="font-mono text-label-sm text-clay-700 block">STREAK</span>
                {streak
                  ? `${streak.current} Woche${streak.current === 1 ? "" : "n"} · ${streak.freezesAvailable} Pausen frei`
                  : "Noch kein Streak — die erste Woche zählt."}
              </p>
              <p>
                <span className="font-mono text-label-sm text-rust-600 block">BADGES</span>
                {badges.length === 0 ? (
                  <span className="italic text-on-surface-muted">Noch keine.</span>
                ) : (
                  badges.slice(0, 3).map((b) => describeBadge(b.slug)).join(" · ")
                )}
              </p>
            </div>
          </CardBody>
        </Card>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link href="/case-clinic">
          <Card variant="outlined" interactive>
            <Chip tone="rust" className="mb-2">Optional</Chip>
            <CardTitle>Kollegiale Fallberatung</CardTitle>
            <CardBody>
              <p>Hast du gerade eine Situation, an der du häkst? Solo oder mit 3–5 Peers.</p>
            </CardBody>
          </Card>
        </Link>
        <Link href="/snapshot">
          <Card variant="outlined" interactive>
            <Chip tone="clay" className="mb-2">Quartalsweise</Chip>
            <CardTitle>Snapshot — wo stehst du?</CardTitle>
            <CardBody>
              <p>Skill-Radar gegen vorherige Quartale — explizit kein Tages-Dashboard.</p>
            </CardBody>
          </Card>
        </Link>
        <Card variant="filled">
          <CardTitle>Zyklus-Abschluss</CardTitle>
          <CardBody>
            <p className="mb-3">
              {weekIndex >= identity.weeks
                ? "Zeit für den Abschluss — neu formulieren und Evidenz erfassen."
                : `In Woche ${identity.weeks} schließt du den Zyklus mit dem Identity-Check ab.`}
            </p>
            <Link href={`/skills/${identity.skillSlug}/close-cycle`}>
              <Button variant={weekIndex >= identity.weeks ? "filled" : "tonal"} size="sm">
                Abschluss-Check öffnen
              </Button>
            </Link>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="space-y-6 max-w-2xl">
      <header>
        <h1 className="font-serif text-display-md text-on-surface mb-3">Mein Plan</h1>
        <p className="text-body-lg text-on-surface-muted">
          Du hast noch keinen aktiven Zyklus. Such dir einen Skill aus, formuliere dein
          Identity Statement, dann steht dein Plan.
        </p>
      </header>
      <div className="flex gap-3">
        <Link href="/start"><Button variant="filled">Mit zwei Fragen anfangen</Button></Link>
        <Link href="/"><Button variant="tonal">Atlas durchstöbern</Button></Link>
      </div>
    </div>
  );
}

function startOfWeek(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); // Monday
  return d;
}

function endOfWeek(): Date {
  const start = startOfWeek();
  start.setDate(start.getDate() + 7);
  return start;
}

function phaseForWeek(week: number, total: number): "foundation" | "exploration" | "application" | "integration" {
  if (week <= 1) return "foundation";
  if (week <= Math.ceil(total / 2)) return "exploration";
  if (week < total) return "application";
  return "integration";
}

function labelForKind(phase: string): string {
  return phase === "integration" ? "Reflexion / Ritual" : phase;
}
