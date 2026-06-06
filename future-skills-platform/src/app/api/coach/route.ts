import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSkill } from "@/content/registry";
import { getAnthropic, COACH_MODEL, buildCoachSystem, systemPromptCacheable } from "@/lib/anthropic";
import { prisma } from "@/lib/db";
import { t } from "@/lib/i18n";

export const runtime = "nodejs";

const Body = z.object({
  userId: z.string().optional(),
  skillSlug: z.string(),
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string().min(1),
    }),
  ),
  userRole: z.string().optional(),
  locale: z.enum(["de", "en"]).default("de"),
});

export async function POST(req: NextRequest) {
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_body", details: parsed.error.format() }, { status: 400 });
  }
  const { userId, skillSlug, messages, userRole, locale } = parsed.data;

  const skill = getSkill(skillSlug);
  if (!skill) return NextResponse.json({ error: "skill_not_found" }, { status: 404 });

  const anthropic = getAnthropic();
  if (!anthropic) {
    return NextResponse.json(
      { error: "coach_disabled", hint: "Set ANTHROPIC_API_KEY to enable the AI coach." },
      { status: 503 },
    );
  }

  // Look up the active Identity Statement + recent artefacts for cycle-aware coaching.
  const effectiveUserId = userId ?? "demo";
  const [identity, recentArtefacts] = await Promise.all([
    prisma.identityStatement
      .findFirst({
        where: { userId: effectiveUserId, skillSlug, fulfilled: false, closedAt: null },
        orderBy: { startedAt: "desc" },
      })
      .catch(() => null),
    prisma.artefact
      .findMany({
        where: { userId: effectiveUserId, skillSlug },
        orderBy: { createdAt: "desc" },
        take: 3,
      })
      .catch(() => []),
  ]);

  const identityWeeksRemaining = identity
    ? Math.max(
        0,
        identity.weeks -
          Math.floor(
            (Date.now() - identity.startedAt.getTime()) / (7 * 24 * 60 * 60 * 1000),
          ),
      )
    : undefined;

  const recentArtefactSummary =
    recentArtefacts.length > 0
      ? recentArtefacts
          .map((a) => {
            const c = typeof a.content === "string" ? a.content : JSON.stringify(a.content);
            return `- ${a.kind} (${a.createdAt.toISOString().slice(0, 10)}): ${c.slice(0, 200)}`;
          })
          .join("\n")
      : undefined;

  const system = buildCoachSystem({
    skillName: t(skill.name, locale),
    skillDefinition: t(skill.definition, locale),
    persona: t(skill.coach.persona, locale) + "\n\n" + t(skill.coach.systemPrompt, locale),
    userRole,
    identityStatement: identity?.statement,
    identityWeeksRemaining,
    recentArtefactSummary,
    locale,
  });

  const stream = await anthropic.messages.stream({
    model: COACH_MODEL,
    max_tokens: 1024,
    system: systemPromptCacheable(system),
    messages,
  });

  const encoder = new TextEncoder();
  const body = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(chunk.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
