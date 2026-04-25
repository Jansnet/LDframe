import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { z } from "zod";
import { getSkill } from "@/content/registry";
import { getAnthropic, COACH_MODEL } from "@/lib/anthropic";
import { prisma } from "@/lib/db";
import { t } from "@/lib/i18n";

export const runtime = "nodejs";

/**
 * Job-Role Translator.
 *
 * Input: user id, skill slug, role text + tags.
 * Output: { meaning, scenarios: string[3..5], priority: 1..5 }
 *
 * Cached per (roleFingerprint, skillSlug, locale) in the RoleTranslation
 * table. This call is expensive and the inputs rarely change — the cache
 * hit rate should be very high in practice.
 */

const Body = z.object({
  userId: z.string(),
  skillSlug: z.string(),
  roleText: z.string().min(3),
  roleTags: z.record(z.string()).optional(),
  locale: z.enum(["de", "en"]).default("de"),
});

const Output = z.object({
  meaning: z.string(),
  scenarios: z.array(z.string()).min(3).max(5),
  priority: z.number().int().min(1).max(5),
});

function fingerprint(roleText: string, roleTags: unknown): string {
  const canonical = JSON.stringify({ roleText: roleText.trim(), roleTags: roleTags ?? null });
  return crypto.createHash("sha256").update(canonical).digest("hex").slice(0, 16);
}

export async function POST(req: NextRequest) {
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  const { userId, skillSlug, roleText, roleTags, locale } = parsed.data;
  const skill = getSkill(skillSlug);
  if (!skill) return NextResponse.json({ error: "skill_not_found" }, { status: 404 });

  const fp = fingerprint(roleText, roleTags);
  const cached = await prisma.roleTranslation.findUnique({
    where: { roleFingerprint_skillSlug_locale: { roleFingerprint: fp, skillSlug, locale } },
  });
  if (cached) return NextResponse.json({ ...(cached.content as object), cached: true });

  const anthropic = getAnthropic();
  if (!anthropic) {
    // Degraded mode: return a structural placeholder so the UI renders.
    const placeholder = {
      meaning: `${t(skill.definition, locale)} — (coach disabled; set ANTHROPIC_API_KEY for personalized translation)`,
      scenarios: [],
      priority: 3,
    };
    return NextResponse.json(placeholder);
  }

  const lang = locale === "de" ? "Deutsch" : "English";
  const system = `You translate a Future Skill to a person's concrete job role.
Respond in ${lang}. Output MUST be valid JSON matching:
  { "meaning": string, "scenarios": string[3..5], "priority": 1..5 }
Be concrete and avoid generic phrasing — name specific activities in the role.`;

  const user = `Skill: ${t(skill.name, locale)}
Definition: ${t(skill.definition, locale)}

Role description (free text): ${roleText}
Role tags: ${JSON.stringify(roleTags ?? {})}

Return the JSON.`;

  const response = await anthropic.messages.create({
    model: COACH_MODEL,
    max_tokens: 700,
    system,
    messages: [{ role: "user", content: user }],
  });

  const text = response.content.find((c) => c.type === "text")?.text ?? "";
  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}");
  const jsonText = text.slice(jsonStart, jsonEnd + 1);
  let content: z.infer<typeof Output>;
  try {
    content = Output.parse(JSON.parse(jsonText));
  } catch {
    return NextResponse.json({ error: "llm_output_unparseable" }, { status: 502 });
  }

  await prisma.roleTranslation.create({
    data: { userId, skillSlug, roleFingerprint: fp, locale, content },
  });

  return NextResponse.json({ ...content, cached: false });
}
