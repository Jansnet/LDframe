import { buildCoachSystem } from "../src/lib/anthropic";
import { getSkill } from "../src/content/registry";
import { t } from "../src/lib/i18n";

const skill = getSkill("kritisches-denken");
if (!skill) throw new Error("no skill");

const prompt = buildCoachSystem({
  skillName: t(skill.name),
  skillDefinition: t(skill.definition),
  persona: t(skill.coach.persona) + "\n\n" + t(skill.coach.systemPrompt),
  levelAnchors: skill.levelAnchors,
  currentLevel: 2,
  currentLevelRationale: "in 1:1-Gesprächen sicher, in Steering nicht",
  userRole: "Engineering Manager, 12-Personen-Team",
  identityStatement:
    "In 4 Wochen sage ich über mich: ich frage in Steering-Meetings sofort nach, wenn ich eine Annahme höre, die nicht trägt.",
  identityWeeksRemaining: 3,
  recentArtefactSummary:
    '- claim-check (2026-06-04): "Wir verlieren 15% Conversion durch X" — keine Quelle dahinter\n- pre-mortem (2026-06-02): Q3-Launch, identifizierte 3 Annahmen ohne Evidenz',
  locale: "de",
});

console.log(prompt);
console.log("\n---\nLänge:", prompt.length, "Zeichen ·", prompt.split("\n").length, "Zeilen");
