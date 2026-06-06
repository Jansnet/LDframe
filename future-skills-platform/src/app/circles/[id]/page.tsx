import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { prisma } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import { LogMeetingForm } from "./LogMeetingForm";

export const dynamic = "force-dynamic";

export default async function CirclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const userId = await getSessionUserId().catch(() => "demo");

  const circle = await prisma.learningCircle.findUnique({
    where: { id },
    include: {
      members: { include: { user: { select: { id: true, name: true, email: true } } } },
      meetings: {
        orderBy: { scheduledAt: "desc" },
        include: {
          commitments: {
            include: {
              user: { select: { name: true, email: true } },
            },
          },
          focusUser: { select: { name: true, email: true } },
        },
      },
    },
  });
  if (!circle) notFound();

  const myMembership = circle.members.find((m) => m.userId === userId);
  if (!myMembership) {
    return (
      <div className="max-w-2xl space-y-4">
        <h1 className="font-serif text-headline-md">Kein Zugriff</h1>
        <p className="text-body-md text-on-surface-muted">
          Du gehörst nicht zu diesem Circle. Frag eine Person aus dem Circle, dich
          hinzuzufügen, oder kehre zur{" "}
          <Link href="/circles" className="text-primary underline">Circle-Übersicht</Link> zurück.
        </p>
      </div>
    );
  }

  const memberOptions = circle.members.map((m) => ({
    memberId: m.id,
    userId: m.userId,
    label: m.user.name?.trim() || m.user.email.split("@")[0],
  }));

  const myOpenCommitments = circle.meetings.flatMap((m) =>
    m.commitments.filter((c) => c.userId === userId && c.status === "open"),
  );

  return (
    <div className="space-y-10">
      <header className="space-y-2 max-w-3xl">
        <Chip tone={myMembership.role === "facilitator" ? "primary" : "neutral"}>
          {myMembership.role === "facilitator" ? "Facilitator" : "Mitglied"}
        </Chip>
        <h1 className="font-serif text-display-md text-on-surface">{circle.name}</h1>
        <p className="text-body-md text-on-surface-muted">
          {circle.members.length} Mitglieder · {circle.meetings.length} geloggte Treffen ·
          Zyklus {circle.cycleLengthWeeks} Wochen
        </p>
      </header>

      <section>
        <h2 className="font-serif text-headline-md text-on-surface mb-3">Mitglieder</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {circle.members.map((m) => (
            <Card key={m.id} variant="outlined">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-body-md text-on-surface">
                    {m.user.name?.trim() || m.user.email.split("@")[0]}
                  </p>
                  <p className="font-mono text-label-sm text-on-surface-muted">{m.user.email}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {m.role === "facilitator" && <Chip tone="primary">Facilitator</Chip>}
                  <span className="font-mono text-label-sm text-on-surface-muted">
                    {m.focusTurnsTaken} × Focus
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {myOpenCommitments.length > 0 && (
        <section>
          <h2 className="font-serif text-headline-md text-on-surface mb-3">
            Deine offenen Wenn-dann-Bitten
          </h2>
          <div className="space-y-2">
            {myOpenCommitments.map((c) => (
              <Card key={c.id} variant="filled">
                <p className="text-body-md text-on-surface">
                  <span className="font-medium">Wenn </span>
                  {c.ifClause},{" "}
                  <span className="font-medium">dann </span>
                  {c.thenClause}.
                </p>
                <p className="text-label-sm font-mono text-on-surface-muted mt-1">
                  fällig bis {c.dueBy.toLocaleDateString("de-DE")}
                </p>
              </Card>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="font-serif text-headline-md text-on-surface mb-3">Treffen loggen</h2>
        <LogMeetingForm circleId={circle.id} members={memberOptions} myUserId={userId} />
      </section>

      <section>
        <h2 className="font-serif text-headline-md text-on-surface mb-3">Geloggte Treffen</h2>
        {circle.meetings.length === 0 ? (
          <Card variant="outlined">
            <CardBody>
              <p>Noch keine Treffen geloggt. Nach eurem ersten 30-Min-Termin tragt ihr
              Schlüsselfrage, Ernte und die Wenn-dann-Bitten oben ein.</p>
            </CardBody>
          </Card>
        ) : (
          <div className="space-y-4">
            {circle.meetings.map((m) => (
              <Card key={m.id} variant="filled">
                <div className="flex items-baseline justify-between mb-2">
                  <CardTitle className="mb-0">
                    {m.scheduledAt.toLocaleDateString("de-DE", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </CardTitle>
                  {m.focusUser && (
                    <Chip tone="clay">
                      Focus: {m.focusUser.name?.trim() || m.focusUser.email.split("@")[0]}
                    </Chip>
                  )}
                </div>
                <CardBody className="space-y-3">
                  {m.keyQuestion && (
                    <div>
                      <p className="font-mono text-label-sm text-on-surface-muted uppercase mb-0.5">
                        Schlüsselfrage
                      </p>
                      <p className="text-body-md text-on-surface italic">„{m.keyQuestion}"</p>
                    </div>
                  )}
                  {m.harvestStatement && (
                    <div>
                      <p className="font-mono text-label-sm text-on-surface-muted uppercase mb-0.5">
                        Ernte
                      </p>
                      <p className="text-body-md text-on-surface">{m.harvestStatement}</p>
                    </div>
                  )}
                  {m.notes && (
                    <div>
                      <p className="font-mono text-label-sm text-on-surface-muted uppercase mb-0.5">
                        Notizen
                      </p>
                      <p className="text-body-md text-on-surface whitespace-pre-wrap">{m.notes}</p>
                    </div>
                  )}
                  {m.commitments.length > 0 && (
                    <div>
                      <p className="font-mono text-label-sm text-on-surface-muted uppercase mb-1">
                        Wenn-dann-Bitten
                      </p>
                      <ul className="space-y-1">
                        {m.commitments.map((c) => (
                          <li key={c.id} className="text-body-md">
                            <span className="font-medium text-on-surface">
                              {c.user.name?.trim() || c.user.email.split("@")[0]}:
                            </span>{" "}
                            wenn {c.ifClause}, dann {c.thenClause}.
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
