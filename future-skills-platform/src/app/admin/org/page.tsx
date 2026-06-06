import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { prisma } from "@/lib/db";
import { requireOrgAdmin, NotAdminError } from "@/lib/admin";
import { listSkills } from "@/content/registry";
import { t } from "@/lib/i18n";

/**
 * /admin/org — quarterly behavior-evidence rollup for HR / L&D.
 *
 * What this page deliberately is NOT:
 *   - A leaderboard. No per-person rankings, no per-person rows.
 *   - A scoring dashboard. No "skill scores" or progress percentages.
 *   - A surveillance tool. No raw artefact content surfaced here.
 *
 * What it IS:
 *   - "Was wird in dieser Organisation gerade tatsächlich gelernt?"
 *   - Counts of active cycles, completed cycles, artefacts produced.
 *   - Distribution of self-positioning across skills, anonymized.
 *   - Surface-level signals so L&D can ask better questions in 1:1s —
 *     not a substitute for those conversations.
 */
export const dynamic = "force-dynamic";

export default async function OrgAdminPage() {
  let ctx;
  try {
    ctx = await requireOrgAdmin();
  } catch (e) {
    if (e instanceof NotAdminError) notFound();
    throw e;
  }

  const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);

  const [
    org,
    memberCount,
    activeCyclesCount,
    closedCyclesCount,
    fulfilledCyclesCount,
    artefactCount90d,
    caseClinicCount90d,
    skillLevelsBySlug,
    activeCyclesBySlug,
  ] = await Promise.all([
    prisma.organization.findUnique({ where: { id: ctx.organizationId } }),
    prisma.user.count({ where: { organizationId: ctx.organizationId } }),
    prisma.identityStatement.count({
      where: {
        user: { organizationId: ctx.organizationId },
        fulfilled: false,
        closedAt: null,
      },
    }),
    prisma.identityStatement.count({
      where: {
        user: { organizationId: ctx.organizationId },
        closedAt: { gte: ninetyDaysAgo },
      },
    }),
    prisma.identityStatement.count({
      where: {
        user: { organizationId: ctx.organizationId },
        fulfilled: true,
        closedAt: { gte: ninetyDaysAgo },
      },
    }),
    prisma.artefact.count({
      where: {
        user: { organizationId: ctx.organizationId },
        createdAt: { gte: ninetyDaysAgo },
      },
    }),
    prisma.caseClinic.count({
      where: {
        caseOwner: { organizationId: ctx.organizationId },
        createdAt: { gte: ninetyDaysAgo },
      },
    }),
    prisma.skillLevel.groupBy({
      by: ["skillSlug", "level"],
      where: { user: { organizationId: ctx.organizationId } },
      _count: { _all: true },
    }),
    prisma.identityStatement.groupBy({
      by: ["skillSlug"],
      where: {
        user: { organizationId: ctx.organizationId },
        fulfilled: false,
        closedAt: null,
      },
      _count: { _all: true },
    }),
  ]);

  if (!org) notFound();

  const skills = listSkills();
  const cyclesBySlug = new Map(
    activeCyclesBySlug.map((row) => [row.skillSlug, row._count._all]),
  );
  const levelsBySkill = new Map<string, number[]>();
  for (const row of skillLevelsBySlug) {
    const arr = levelsBySkill.get(row.skillSlug) ?? [0, 0, 0, 0];
    arr[row.level - 1] = row._count._all;
    levelsBySkill.set(row.skillSlug, arr);
  }

  return (
    <div className="space-y-10">
      <header className="space-y-3 max-w-3xl">
        <Chip tone="rust">Admin · {org.name}</Chip>
        <h1 className="font-serif text-display-md text-on-surface">
          Was wird hier gerade tatsächlich gelernt?
        </h1>
        <p className="text-body-lg text-on-surface-muted">
          Rollup der letzten 90 Tage. Keine Ranglisten, keine Punktzahlen, keine personenbezogenen
          Aussagen. Das hier ersetzt 1:1-Gespräche nicht — es hilft dir, bessere Fragen zu stellen.
        </p>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Mitglieder" value={memberCount} />
        <Stat label="Aktive Zyklen" value={activeCyclesCount} />
        <Stat label="Abgeschlossen" value={closedCyclesCount} sub={`davon ${fulfilledCyclesCount} ✓`} />
        <Stat label="Artefakte (90d)" value={artefactCount90d} />
        <Stat label="Fallrunden (90d)" value={caseClinicCount90d} />
      </section>

      <section>
        <h2 className="font-serif text-headline-md text-on-surface mb-4">Was läuft gerade</h2>
        <p className="text-body-md text-on-surface-muted mb-5 max-w-2xl">
          Aktive Identity-Statements pro Skill — welche Schwerpunkte gerade in der
          Organisation gesetzt werden.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {skills.map((s) => {
            const count = cyclesBySlug.get(s.slug) ?? 0;
            if (count === 0) return null;
            return (
              <Card key={s.slug} variant="outlined">
                <Chip tone="clay">{s.category}</Chip>
                <CardTitle className="mt-2">{t(s.name)}</CardTitle>
                <CardBody>
                  <p className="font-serif text-headline-md text-on-surface">{count}</p>
                  <p className="text-body-md text-on-surface-muted">
                    aktive Zyklen
                  </p>
                </CardBody>
              </Card>
            );
          })}
          {cyclesBySlug.size === 0 && (
            <Card variant="filled" className="md:col-span-3">
              <CardBody>
                <p className="italic">Noch keine aktiven Zyklen.</p>
              </CardBody>
            </Card>
          )}
        </div>
      </section>

      <section>
        <h2 className="font-serif text-headline-md text-on-surface mb-4">
          Selbstpositionierung verteilt
        </h2>
        <p className="text-body-md text-on-surface-muted mb-5 max-w-2xl">
          L1–L4 je Skill, anonymisiert aggregiert. Nicht „wer kann was", sondern „wo sieht
          die Organisation sich gerade".
        </p>
        <div className="space-y-3">
          {skills.map((s) => {
            const dist = levelsBySkill.get(s.slug) ?? [0, 0, 0, 0];
            const total = dist.reduce((a, b) => a + b, 0);
            if (total === 0) return null;
            return (
              <div key={s.slug} className="grid grid-cols-12 items-center gap-3">
                <div className="col-span-3 text-body-md text-on-surface">{t(s.name)}</div>
                <div className="col-span-8 flex h-6 rounded-sm overflow-hidden bg-surface-container">
                  {dist.map((c, i) => {
                    const pct = total > 0 ? (c / total) * 100 : 0;
                    const bg = ["#EFE4D2", "#E0D1B4", "#CC785C", "#A67A58"][i];
                    return (
                      <div
                        key={i}
                        style={{ width: `${pct}%`, background: bg }}
                        title={`L${i + 1}: ${c}`}
                      />
                    );
                  })}
                </div>
                <div className="col-span-1 text-label-sm font-mono text-on-surface-muted text-right">
                  {total}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex gap-3 text-label-sm text-on-surface-muted">
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3" style={{ background: "#EFE4D2" }} /> L1
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3" style={{ background: "#E0D1B4" }} /> L2
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3" style={{ background: "#CC785C" }} /> L3
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3" style={{ background: "#A67A58" }} /> L4
          </span>
        </div>
      </section>

      <section>
        <Card variant="filled">
          <CardTitle>Was du hier nicht findest</CardTitle>
          <CardBody>
            <p>
              Keine Personennamen, keine 1:1-Vergleiche, keine Bewertungen. Wenn dir das
              hier eine Frage aufmacht, ist die Antwort: ein echtes Gespräch mit der
              betreffenden Person — nicht ein Drill-down.{" "}
              <Link href="/" className="text-primary underline">Zurück zum Atlas</Link>.
            </p>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: number; sub?: string }) {
  return (
    <Card variant="filled">
      <span className="font-mono text-label-sm text-primary block">{label}</span>
      <p className="font-serif text-display-md text-on-surface mt-1">{value}</p>
      {sub && <p className="text-body-md text-on-surface-muted">{sub}</p>}
    </Card>
  );
}
