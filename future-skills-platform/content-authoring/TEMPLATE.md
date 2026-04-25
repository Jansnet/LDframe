# Content authoring template — Future Skills Platform

This is the authoring guide for anyone adding or editing a skill: Learning &
Development, subject-matter experts, instructional designers. You don't need to
write code. The platform validates every skill against a schema
(`src/content/schema.ts`) when it is loaded, so authoring mistakes fail loudly
rather than silently ship a half-broken skill.

There are two ways to contribute content:

- **Code-path** (preferred for the built-in 30 skills): write a TypeScript
  module in `src/content/skills/<slug>.ts` exporting a `Skill`. Reviewable via
  pull request.
- **Org-authoring API** (for company-specific content): POST a YAML/JSON file
  to `/api/admin/custom-skills`. Stored in the `CustomSkill` table, isolated
  to your organization.

Both paths use the same schema.

---

## Anatomy of a skill

```
Skill
├─ Meta (slug, category, name, Stifterverband reference)
├─ Definition (attributed verbatim to source)
├─ Analogies (≥ 1, each with *limits*)
├─ Foundation modules (concept/model/reading/video)
├─ Exercises (≥ 10, mixed across phase/format/length)
├─ Checklists (for Integration phase)
├─ Habit templates (trigger → action)
└─ Coach profile (AI coach persona + suggested prompts)
```

### 1. Meta

```yaml
slug: kritisches-denken            # kebab-case, stable identifier — do not change
category: foundational              # foundational | transformative | communal | digital | technological
name:
  de: "Kritisches Denken"
  en: "Critical Thinking"
stifterverbandId: "FSF-2030-GRD-01" # optional reference
version: "1.0.0"
authors: ["Jane Doe", "John Smith"]
lastReviewedAt: "2026-04-01"
```

### 2. Definition

Use the Stifterverband wording where possible and attribute the source in the
related docs. Keep it short — this is not the body, it's the one-sentence
anchor.

```yaml
definition:
  de: "Die Fähigkeit, Aussagen und Annahmen mit Vernunft und Evidenz zu prüfen."
  en: "The ability to examine claims and assumptions with reason and evidence."
```

### 3. Analogies

Every analogy must carry its **limits** — the place where the metaphor breaks
down. This matters pedagogically: learners who over-extend an analogy end up
believing wrong things.

```yaml
analogies:
  - id: filter
    title:
      de: "Filter mit verstellbarer Maschenweite"
    body:
      de: |
        Kritisches Denken ist wie ein Sieb, dessen Maschen du je nach Anlass
        enger oder weiter stellst. Beim ersten Überblick grob, beim Prüfen
        eines einzelnen Arguments fein.
    limits:
      de: "Anders als ein Sieb ist Denken kein passiver Durchlauf — du formst
        die Maschenweite aktiv."
```

### 4. Foundation modules

Micro-units that live in the **Foundation** phase — the knowledge base. Keep
them short (5–15 min each). Prefer three to five short modules over one long
one.

```yaml
foundation:
  - id: claims-and-evidence
    title:
      de: "Behauptung, Grund, Evidenz"
    kind: concept
    readingMinutes: 6
    body:
      de: |
        Jede Argumentation hat drei Schichten: was behauptet wird, warum (der
        Grund) und welche Evidenz den Grund stützt. Auseinanderhalten dieser
        drei ist die Basis für alles Weitere.
```

### 5. Exercises (the core)

At least **10 per skill**. The platform enforces a minimum *mix*:

- ≥ 3 different `length` categories (micro / short / embedded / block / deep)
- ≥ 4 different `format` types
- ≥ 1 exercise with `phase: application`

**Phases used in exercises:** only `exploration` and `application`. Foundation
lives in foundation modules; Integration lives in checklists and habit
templates.

**Length categories and when they fit:**

| length   | duration     | fits into                                                |
| -------- | ------------ | -------------------------------------------------------- |
| micro    | 1–3 min      | between meetings, before reading an email, coffee break  |
| short    | 5–10 min     | meeting opener/closer, daily review, weekly planning     |
| embedded | during task  | inside your next 1:1, stakeholder call, report writing   |
| block    | 30–60 min    | focus slot, weekly learning hour                         |
| deep     | 2h+          | workshop, team retro, learning sprint                    |

**Formats:** reflection, journaling, observation, dialogue, roleplay,
case_analysis, experiment, tool_tryout, checklist, peer_exchange, workshop,
micro_challenge.

**Every exercise must include `integrationHints`** — 2–3 concrete "when and
where" examples, so the exercise becomes an integrable routine instead of a
standalone lesson.

```yaml
exercises:
  - id: claim-map
    title:
      de: "Claim-Map für eine Slack-Diskussion"
    phase: application
    format: case_analysis
    length: short
    estimatedMinutes: 10

    scenario:
      de: "Du bist Teil einer asynchronen Diskussion und bemerkst, dass alle
        aneinander vorbei reden."
    steps:
      - de: "Scrolle die letzten 20 Nachrichten hoch."
      - de: "Notiere für jede: was ist die Behauptung, welcher Grund wird
          gegeben, welche Evidenz?"
      - de: "Markiere die Nachrichten, in denen Gründe fehlen."
    tools: ["Slack", "Notion", "Paper"]
    expected:
      de: "Eine sichtbare Struktur darüber, wo die Diskussion wirklich
        festhängt."
    integrationHints:
      - when: { de: "Bei deiner nächsten hängenden Slack-Diskussion" }
        how:   { de: "Öffne ein Notion-Doc mit drei Spalten: Behauptung,
                      Grund, Evidenz." }
      - when: { de: "Vor einem Entscheidungsmeeting" }
        how:   { de: "Lass alle Teilnehmer ihren Claim in diesem Format
                      einreichen." }
    reflectionPrompts:
      - de: "Wo ist die Struktur hilfreich gewesen, wo hat sie behindert?"
    peerExchange:
      prompt:
        de: "Teile deine Claim-Map mit einem Kollegen, vergleicht die
          Einordnungen."
    artefact:
      kind: structured
      fields: ["claim", "reason", "evidence", "gap"]
```

### 6. Checklists

Live in the **Integration** phase. Anchor one-off exercises into recurring
work situations.

```yaml
checklists:
  - id: decision-doc
    title:
      de: "Decision-Doc-Check"
    context:
      de: "Vor dem Teilen eines Entscheidungsdokuments"
    items:
      - de: "Ist die Entscheidung explizit benannt?"
      - de: "Sind Alternativen dokumentiert?"
      - de: "Welche Evidenz stützt die Wahl?"
```

### 7. Habit templates

Small trigger-action patterns the user can adopt.

```yaml
habits:
  - id: pause-before-send
    trigger:
      de: "Bevor ich eine bestätigende Zustimmung sende"
    action:
      de: "frage ich mich: habe ich wirklich geprüft, oder stimme ich zu, um
        anschlussfähig zu wirken?"
    cadence: per_event
```

### 8. Coach profile

The AI coach is persona-scoped to each skill. Keep the persona honest: don't
make it motivational fluff.

```yaml
coach:
  persona:
    de: "Du bist ein nüchterner Denk-Sparringspartner. Du stellst Fragen,
         bevor du antwortest, und benennst, wenn Evidenz fehlt."
  systemPrompt:
    de: |
      Du bist ein Coach für Kritisches Denken. Deine Rolle ist nicht,
      Antworten zu geben, sondern den Nutzer dazu zu bringen, Behauptungen,
      Gründe und Evidenz sichtbar zu machen. Wenn der Nutzer eine Aufgabe
      beschreibt, frage zuerst nach der impliziten Behauptung.
  suggestedPrompts:
    - de: "Was behaupte ich hier eigentlich?"
    - de: "Welche Evidenz würde mich überzeugen, dass ich falsch liege?"
    - de: "Wo habe ich diese Woche schnell zugestimmt, ohne zu prüfen?"
```

---

## Validation

Run locally:

```bash
npm run content:validate
```

The validator:

1. Parses every YAML/TS skill file against the Zod schema
2. Enforces the exercise mix (lengths, formats, ≥1 application)
3. Warns on missing EN translations (non-blocking)
4. Fails if any `slug` is duplicated

CI runs the same check on every PR.

---

## Quality rubric (before merging a new skill)

- [ ] Definition is attributed and matches the Stifterverband wording
- [ ] At least 5 analogies, each with explicit `limits`
- [ ] At least 10 exercises, mix validated
- [ ] At least one exercise per length category (micro, short, embedded, block, deep)
- [ ] Every exercise has ≥ 2 integration hints
- [ ] Application exercises use *real work* as raw material, not fabricated cases
- [ ] Checklists anchor to specific recurring work moments
- [ ] Coach persona is specific (not generic "motivator")
- [ ] Two SMEs have reviewed and signed off
