# Skill Hacker

**Skill Hacker** macht die 30 Zukunftskompetenzen aus dem
[Stifterverband Future Skills 2030 Framework](https://www.stifterverband.org/medien/future-skills-2030)
trainierbar. Jeder Skill hat einen vollständigen Lernzyklus:

> **Foundation → Exploration (inkl. Austausch) → Application → Integration**

Übungen werden in den Arbeitsalltag eingebaut, nicht obendrauf. Längen-Tags
(`micro` 1–3 Min, `short` 5–10 Min, `embedded` während realer Aufgabe, `block`
30–60 Min, `deep` 2 Std+) mit konkreten „Wann und wo integrieren"-Hinweisen
machen aus jeder Übung eine neue Arbeitsroutine.

## MVP-Skills (in dieser Version)

- **Kritisches Denken** — Grundlegend
- **Resilienz** — Transformativ
- **AI Literacy** — Digital

Je 12 Übungen, 5 Analogien, 3–4 Foundation-Module, 2 Checklisten, 3 Habits,
1 Skill-spezifischer Coach.

## Schneller Start (Docker)

```bash
cp .env.example .env
# .env editieren — ANTHROPIC_API_KEY ist optional (Coach läuft sonst nicht,
# Plattform aber schon)

docker compose up -d
docker compose exec app npm run db:migrate
docker compose exec app npm run db:seed
```

→ `http://localhost:3000`

## Schneller Blick ohne Setup

Eine selbsterhaltende HTML-Demo aller Kernscreens liegt unter
`public/skill-hacker.html` — einfach im Browser öffnen.

## Lokales Entwickeln

```bash
npm install
docker compose up -d db   # nur die DB
npx prisma migrate dev
npm run db:seed
npm run dev
```

## Self-Hosting im Unternehmen

- **Air-gapped-fähig**: `ANTHROPIC_BASE_URL` umkonfigurierbar auf On-Prem-LLM-Gateway
  (LiteLLM o.ä.) — kein Pflicht-Outbound zu Anthropic.
- **Coach optional**: Ohne `ANTHROPIC_API_KEY` läuft die Plattform vollständig,
  nur das Coach-UI degradiert sich.
- **Multi-Tenant-ready**: `Organization` als oberste Row-Level-Schicht.
- **Auth-Modi**: `local`, `oidc`, `saml` über `AUTH_MODE`.
- **Org-Authoring**: Eigene Skills via `POST /api/admin/custom-skills` einreichen;
  Schema validiert beim Schreiben.

## Content-Authoring

Siehe `content-authoring/TEMPLATE.md` für den Authoring-Leitfaden (für L&D /
SMEs ohne Code-Hintergrund) und `content-authoring/example-skill.yaml` für
ein ausfüllbares Beispiel.

## Lizenz & Attribution

- Plattform-Code: Apache-2.0
- Inhalte (Definitionen, Übungen, Coach-Profile): originär für Skill Hacker
  geschrieben
- Strukturell basierend auf dem Stifterverband Future Skills 2030 Framework
  ([CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/))
- Skill-Namen und Kategorien-Struktur sind als Begriffe nicht urheberrechtlich
  geschützt; Attribution erfolgt im Footer jeder Skill-Seite und auf
  `/license`.

Vergleichsdaten (Frameworks-Seite):
- World Economic Forum, Future of Jobs Report 2025 (CC BY-NC-ND 4.0,
  Faktendarstellung)
- Bertelsmann Stiftung, Future Skills Projekt (CC BY-SA 4.0)

## Architektur in einem Satz

Next.js 15 (App Router, standalone) + Postgres 16 + Prisma + Anthropic SDK,
Zod-validiertes Content-Schema, deterministischer Plan-Generator (LLM-frei für
den Standardfall), streaming Coach mit Prompt-Caching. Alles in einem Docker
Compose.
