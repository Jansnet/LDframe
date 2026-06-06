import Anthropic from "@anthropic-ai/sdk";

/**
 * Anthropic client. Configurable base URL lets enterprises route through
 * on-prem LLM gateways (LiteLLM, a self-hosted proxy) that speak the Anthropic
 * API — important for air-gapped deployments.
 *
 * The whole AI coach is optional: if ANTHROPIC_API_KEY is unset, the platform
 * runs in content-only mode and coach UI surfaces degrade gracefully.
 */

let client: Anthropic | null = null;

export function getAnthropic(): Anthropic | null {
  if (client) return client;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;
  client = new Anthropic({
    apiKey,
    baseURL: process.env.ANTHROPIC_BASE_URL || undefined,
  });
  return client;
}

export const COACH_MODEL = process.env.COACH_MODEL || "claude-sonnet-4-6";

/**
 * Build the coach system prompt from a skill definition. The skill-specific
 * coach persona is injected into a stable scaffolding that defines the
 * platform-wide coach protocol.
 */
export function buildCoachSystem(args: {
  skillName: string;
  skillDefinition: string;
  persona: string;
  userRole?: string;
  // Identity Statement the user formulated at the start of the current cycle.
  // The coach treats this as the binding anchor — every reflection loops back
  // to it. Without an Identity Statement the coach operates in "exploration"
  // mode and proactively offers to formulate one.
  identityStatement?: string;
  identityWeeksRemaining?: number;
  // Recent artefact summary, for grounding the coach in what the user
  // actually did this week.
  recentArtefactSummary?: string;
  locale: "de" | "en";
}): string {
  const lang = args.locale === "de" ? "Deutsch" : "English";
  return `You are the Future Skills coach, scoped to a single skill.

Skill: ${args.skillName}
Definition: ${args.skillDefinition}

Coach persona:
${args.persona}

${args.userRole ? `The user's job role: ${args.userRole}` : ""}

${
  args.identityStatement
    ? `IDENTITY STATEMENT (this cycle's anchor):
"${args.identityStatement}"
${
  args.identityWeeksRemaining != null
    ? `Weeks remaining in this cycle: ${args.identityWeeksRemaining}.`
    : ""
}
You reference this statement in every reflection — not as a slogan, but as the
yardstick against which today's situation is judged. Ask "does this move you
toward that sentence becoming true, or away from it?". Never invent a
different statement.`
    : `NO IDENTITY STATEMENT YET.
If the conversation has substance, gently offer once: "willst du den Satz
formulieren, an dem wir den Zyklus messen?" — but only once, then drop it.`
}

${
  args.recentArtefactSummary
    ? `RECENT ARTEFACTS:
${args.recentArtefactSummary}
Reference these specifically — the user produced them, they are evidence.`
    : ""
}

Protocol:
- Respond in ${lang}.
- Default to asking a clarifying question before giving advice — unless the user
  has already been specific.
- When the user describes a situation, name the skill aspect at play (e.g. "this
  is a claim-vs-evidence gap") before suggesting action.
- Prefer pointing the user to a concrete exercise from the skill's repertoire
  over generating novel advice.
- Keep answers short. Long responses feel like lecturing.
- Never fabricate research citations. If you don't have a source, say so.`;
}

/**
 * Prompt caching is enabled on the system prompt because:
 * - skill persona + definition are stable
 * - many conversations will share the same system prompt prefix
 * - the 5-minute cache window covers a typical coach session
 *
 * Use cache_control: "ephemeral" on the last system block to mark the prefix
 * as cacheable. Savings are most notable for long coach sessions.
 */
export function systemPromptCacheable(text: string) {
  return [{ type: "text" as const, text, cache_control: { type: "ephemeral" as const } }];
}
