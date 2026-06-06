import Link from "next/link";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { prisma } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * /circles — list of the user's Learning Circles.
 *
 * MVP: manual protocol. Members run the 30-min meeting outside the platform
 * (Zoom / IRL), then one member logs the artefacts here. The platform
 * provides the structure and persistence, not the live runtime.
 */
export default async function CirclesPage() {
  const userId = await getSessionUserId().catch(() => "demo");

  const memberships = await prisma.circleMember
    .findMany({
      where: { userId, status: "active" },
      include: {
        circle: {
          include: {
            members: { include: { user: { select: { name: true, email: true } } } },
            meetings: { orderBy: { scheduledAt: "desc" }, take: 1 },
          },
        },
      },
      orderBy: { joinedAt: "desc" },
    })
    .catch(() => []);

  return (
    <div className="space-y-10">
      <header className="max-w-3xl">
        <h1 className="font-serif text-display-md text-on-surface mb-3">Learning Circles</h1>
        <p className="text-body-lg text-on-surface-muted">
          Drei bis fünf Kolleg:innen, 30 Minuten pro Woche, ein Quartal lang. Jede:r arbeitet
          am eigenen Identity Statement — der Circle hält die Disziplin. Die Plattform
          speichert eure Schlüsselfragen, Ernten und Wenn-dann-Bitten. Der Termin findet
          extern statt (Zoom, MS Teams, IRL), wir liefern Protokoll und Gedächtnis.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/circles/new">
            <Button variant="filled">Neuen Circle starten</Button>
          </Link>
        </div>
      </header>

      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-serif text-headline-md text-on-surface">Deine Circles</h2>
          <Chip tone="neutral" className="text-label-sm">
            {memberships.length} aktiv
          </Chip>
        </div>

        {memberships.length === 0 ? (
          <Card variant="filled">
            <CardBody>
              <p className="mb-3">
                Du bist noch in keinem Circle. Du brauchst 3–5 Kolleg:innen, die hier schon
                ein Konto haben — dann legst du den Circle in einer Minute an.
              </p>
              <Link href="/circles/new">
                <Button variant="text" size="sm">Circle anlegen →</Button>
              </Link>
            </CardBody>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {memberships.map((m) => {
              const c = m.circle;
              const lastMeeting = c.meetings[0];
              return (
                <Link key={c.id} href={`/circles/${c.id}`}>
                  <Card variant="elevated" interactive className="h-full">
                    <div className="flex items-center justify-between mb-3">
                      <Chip tone={m.role === "facilitator" ? "primary" : "neutral"}>
                        {m.role === "facilitator" ? "Facilitator" : "Mitglied"}
                      </Chip>
                      <span className="font-mono text-label-sm text-on-surface-muted">
                        {c.members.length} Mitglieder · {c.meetings.length} Treffen
                      </span>
                    </div>
                    <CardTitle>{c.name}</CardTitle>
                    <CardBody>
                      <p className="text-body-md mb-2">
                        {c.members
                          .map((mm) => mm.user.name?.trim() || mm.user.email.split("@")[0])
                          .join(" · ")}
                      </p>
                      {lastMeeting ? (
                        <p className="text-label-md text-on-surface-muted">
                          Letztes Treffen: {lastMeeting.scheduledAt.toLocaleDateString("de-DE")}
                        </p>
                      ) : (
                        <p className="text-label-md text-on-surface-muted">
                          Noch kein Treffen geloggt.
                        </p>
                      )}
                    </CardBody>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
