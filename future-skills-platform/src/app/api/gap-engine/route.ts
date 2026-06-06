import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { listSkills } from "@/content/registry";
import { getAnthropic, COACH_MODEL } from "@/lib/anthropic";
import { prisma } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import { t, type Locale } from "@/lib/i18n";

export const runtime = "nodejs";

/**
 * Gap Engine — HILL Block 1 (Urgency) + Block 2 (Agency).
 *
 * Input: two gentle questions (situation + intent) plus the user's role context.
 * Output: top-3 skill suggestions with confidence + rationale.
 *
 * The user is never told this is "HILL" or a "diagnosis" — it's framed as a
 * suggestion ("based on what you wrote, here are three skills that often
 * touch this kind of situation"). User keeps full agency to pick a different
 * skill via the atlas, or open a Discovery view.
 */

const Body = z.object({
  // Two free-text answers.
  situation: z.string().min(3),
  intent: z.string().min(3),
  locale: z.enum(["de", "en"]).default("de"),
});

const Suggestion = z.object({
  skillSlug: z.string(),
  confidence: z.number().min(0).max(1),
  rationale: z.string(),
});

export async function POST(req: NextRequest) {
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  const { situation, intent, locale } = parsed.data;
  const userId = await getSessionUserId();
  const user = await prisma.user.findUnique({ where: { id: userId } }).catch(() => null);
  const role = user?.roleText ?? "";

  const skills = listSkills();
  const suggestions = await classify({ situation, intent, locale, role, skills });

  // Persist for logged-in users — skip silently in demo mode.
  if (user) {
    await prisma.gapClassification.create({
      data: {
        userId,
        questions: { situation, intent },
        suggestions: suggestions as object,
      },
    });
  }

  return NextResponse.json({ suggestions });
}

async function classify(args: {
  situation: string;
  intent: string;
  locale: Locale;
  role: string;
  skills: ReturnType<typeof listSkills>;
}): Promise<z.infer<typeof Suggestion>[]> {
  const { situation, intent, locale, role, skills } = args;
  const anthropic = getAnthropic();

  // Degraded fallback: simple keyword-based ranking when no API key is set,
  // so the platform is usable in air-gapped or coach-disabled deployments.
  if (!anthropic) {
    return keywordFallback({ situation, intent, skills, locale });
  }

  const lang = locale === "de" ? "Deutsch" : "English";
  const catalog = skills
    .map((s) => `- ${s.slug}: ${t(s.name, locale)} — ${t(s.definition, locale)}`)
    .join("\n");

  const system = `You map a user's described work situation to Future Skills.
You output a JSON array of suggestions. Each suggestion has:
- skillSlug (from the catalog below)
- confidence (0..1)
- rationale: one short sentence in ${lang}, explaining concretely why this skill matches THEIR situation.
Pick 2 to 3 skills. Be honest about confidence. Never invent skillSlugs.

Catalog:
${catalog}

Output ONLY valid JSON, no prose around it.`;

  const userMsg = `Role: ${role || "(not specified)"}
Situation: ${situation}
Intent: ${intent}

Return the JSON array of suggestions.`;

  const response = await anthropic.messages.create({
    model: COACH_MODEL,
    max_tokens: 600,
    system,
    messages: [{ role: "user", content: userMsg }],
  });

  const text = response.content.find((c) => c.type === "text")?.text ?? "[]";
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  const jsonText = text.slice(start, end + 1);
  try {
    const parsed = JSON.parse(jsonText);
    return z.array(Suggestion).parse(parsed);
  } catch {
    return keywordFallback({ situation, intent, skills, locale });
  }
}

/**
 * Deterministic fallback when the LLM is unavailable.
 * Crude but workable: score skills by overlap of their megatrendTags
 * with words in the user's text.
 */
function keywordFallback(args: {
  situation: string;
  intent: string;
  skills: ReturnType<typeof listSkills>;
  locale: Locale;
}): z.infer<typeof Suggestion>[] {
  const haystack = `${args.situation} ${args.intent}`.toLowerCase();
  const scored = args.skills.map((s) => {
    const tagHits = s.megatrendTags.filter((tag) => haystack.includes(tag)).length;
    const nameHit = haystack.includes(t(s.name, args.locale).toLowerCase()) ? 1 : 0;
    return {
      skillSlug: s.slug,
      confidence: Math.min(0.6, 0.2 + 0.15 * (tagHits + nameHit)),
      rationale: tagHits > 0
        ? `Deine Antwort enthält Begriffe wie „${s.megatrendTags.find((tag) => haystack.includes(tag))}" — das ist eine typische Anwendungsdomäne.`
        : `Generischer Vorschlag — KI-Klassifikation gerade nicht aktiv.`,
    };
  });
  return scored.sort((a, b) => b.confidence - a.confidence).slice(0, 3);
}
