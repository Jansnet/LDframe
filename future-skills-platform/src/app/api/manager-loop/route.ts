import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSkill } from "@/content/registry";
import { t } from "@/lib/i18n";

export const runtime = "nodejs";

/**
 * Build a 90-second manager-loop update.
 *
 * The bargain: the user already produced artefacts (we have them). The
 * manager mostly needs to know what's moving, what one thing might help,
 * and when to expect closure. We assemble this from real data — no AI
 * required — and hand back subject + body for a mailto: link.
 *
 * Deliberate omissions:
 *   - No "skill score" or rating ever appears.
 *   - The identity statement is NOT quoted verbatim (private). We translate
 *     it to a behavior-focused sentence.
 *   - One specific ask is required — without it, the update is performance
 *     theater.
 */
const Body = z.object({
  userId: z.string().optional(),
  skillSlug: z.string(),
  managerName: z.string().optional(),
  ask: z.string().min(5),
  locale: z.enum(["de", "en"]).default("de"),
});

export async function POST(req: NextRequest) {
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  const userId = parsed.data.userId ?? "demo";
  const { skillSlug, managerName, ask, locale } = parsed.data;
  const skill = getSkill(skillSlug);
  if (!skill) return NextResponse.json({ error: "skill_not_found" }, { status: 404 });

  const [identity, artefacts] = await Promise.all([
    prisma.identityStatement
      .findFirst({
        where: { userId, skillSlug, fulfilled: false, closedAt: null },
        orderBy: { startedAt: "desc" },
      })
      .catch(() => null),
    prisma.artefact
      .findMany({
        where: {
          userId,
          skillSlug,
          createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
        orderBy: { createdAt: "desc" },
      })
      .catch(() => []),
  ]);

  const skillName = t(skill.name, locale);
  const greeting = managerName ? `Hi ${managerName},` : "Hi,";
  const intro =
    locale === "de"
      ? `kurzes 90-Sekunden-Update zu meiner Entwicklungs-Schiene rund um „${skillName}":`
      : `quick 90-second update on my development track on "${skillName}":`;

  const artefactLine =
    artefacts.length > 0
      ? locale === "de"
        ? `In dieser Woche entstanden ${artefacts.length} konkrete Artefakte (z.B. ${
            artefacts[0].kind
          }).`
        : `Produced ${artefacts.length} concrete artefacts this week (e.g. ${artefacts[0].kind}).`
      : locale === "de"
        ? "Diese Woche war Übungswoche — Artefakte folgen im Verlauf."
        : "This week was practice; artefacts will follow.";

  const identityLine = identity
    ? locale === "de"
      ? `Ziel des Zyklus: ein klar beobachtbares Verhalten im Arbeitsalltag — gerade Woche ${
          Math.floor((Date.now() - identity.startedAt.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1
        } von ${identity.weeks}.`
      : `Cycle goal: a clearly observable behavior in real work — currently week ${
          Math.floor((Date.now() - identity.startedAt.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1
        } of ${identity.weeks}.`
    : "";

  const askLine =
    locale === "de"
      ? `Eine konkrete Bitte an dich: ${ask}`
      : `One specific ask: ${ask}`;

  const closing =
    locale === "de"
      ? "Danke! Wenn du Fragen hast, einfach kurz zurück."
      : "Thanks! Ping me if you'd like more detail.";

  const subject =
    locale === "de"
      ? `90-Sek-Update: ${skillName}`
      : `90-sec update: ${skillName}`;

  const body = [greeting, "", intro, "", artefactLine, identityLine, "", askLine, "", closing]
    .filter(Boolean)
    .join("\n");

  return NextResponse.json({ subject, body });
}
