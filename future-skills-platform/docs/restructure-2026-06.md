# Skill Hacker — Restrukturierung
**Stand: 2026-06-06 · auf Basis der Recherche zu Skill-Anker, Reflexionsfragen, Learning Circle**

Dieser Vorschlag konsolidiert die kritische Bestandsaufnahme + die Recherche zu drei Themen:
- konkrete L1–L4-Anker für sechs Future Skills (Stifterverband 2030, DigComp 2.2, Dreyfus/Benner, BARS, WEF 2025)
- 10 sorgfältig komponierte Reflexionsfragen im Register „provokativ-spezifisch"
- Learning Circle: 30-Min × wöchentlich × 4 Personen × 8 Wochen, synthetisiert aus 13 Formaten

Was hier finalisiert ist, ist gekennzeichnet. Wo wir noch eine Richtungsentscheidung brauchen, steht **[?]**.

---

## 1. Was war kritisch falsch — und was wir ändern

| Problem | Ursache | Fix |
|---|---|---|
| 19 Surfaces, 8 Nav-Items | IA wuchs akkretiv, nie designed | Linke Sidebar mit 4 Gruppen; Top-Bar dünn |
| Skill-Levels („hab davon gehört") sagen nichts | Generische Dreyfus-Phrasen statt Anker | Konkrete „beobachtbar / innerer Marker"-Tabelle pro Skill |
| Kein Skill-Atlas im Wortsinn | Wir haben eine Liste, keine Karte | Visuelle Karte als Startseite, 4 Kategorien räumlich gruppiert |
| Kein Team-Primitiv | Fallberatung ist eine Sitzung, keine Beziehung | Learning Circle: 4 Personen, 8 Wochen, Identity-Statement-basiert |
| Erste Fragen schmecken nach Intake-Bogen | Coaching-Sprache, kein Reiz | „Provokativ-spezifisch", siehe §4 |
| 17 × Anti-Pattern-Predigt | Jede Card hat „Was du hier NICHT findest" | Aufräumen — Anti-Pattern-Erklärungen nur in `/frameworks` |
| Coach ist ein Tab | Sollte überall präsent sein | Floating Coach-Pane rechts, auf jeder Seite |

---

## 2. Neue Information Architecture

### Sidebar links, vier Gruppen

```
┌──────────────┐
│ Logo · v0.1  │
├──────────────┤
│              │
│ MEIN ZYKLUS  │  ← was JETZT läuft
│  ▸ Plan      │
│  ▸ Coach     │
│  ▸ Manager   │
│              │
│ ATLAS        │  ← wo bin ich, wo könnte ich hin
│  ▸ Karte     │
│  ▸ Skills    │     (collapsible: 4 Kategorien → 21 Skills)
│              │
│ ZUSAMMEN     │  ← mit anderen
│  ▸ Circles   │     (Learning Circles — neu)
│  ▸ Fallrunde │     (kollegiale Fallberatung — bestehend)
│              │
│ RUHIG        │  ← quartalsweise / einmalig
│  ▸ Snapshot  │
│  ▸ Tour      │
│  ▸ Admin*    │     (*nur wenn role=admin)
│              │
├──────────────┤
│ Avatar       │
└──────────────┘
```

**Top-Bar** schrumpft auf: Breadcrumb (links) · Org-Switcher (mitte) · Notifications (rechts).
**Coach-Pane** rechts ausklappbar, persistent. Default eingeklappt, kennt aktuelles Identity Statement + letzte 3 Artefakte (haben wir schon im Backend).

### Skill-Map als Startseite (statt Listen-Atlas)

21 Future Skills 2030 in 4 Kategorien:

- **Technologische Kompetenzen** (z.B. KI-Kompetenz, Datenkompetenz, Tech Translation)
- **Klassische Kompetenzen** (z.B. Lernkompetenz, Eigenverantwortung, Resilienz)
- **Digitale Schlüsselkompetenzen** (z.B. digitale Ethik, digitale Interaktion)
- **Transformative Kompetenzen** (z.B. Urteilskraft, Innovationskompetenz)

Visualisierung: vier Quadranten, jeder Skill ein Kreis. Hover → 1-Satz-Definition. Klick → Skill-Seite. Aktiver Zyklus = Glow-Umrandung. Im Admin-Modus: Kreisgröße = aktive Zyklen org-weit.

Statisch zu beginnen ok — keine Live-Daten am Start, nur Layout + Skill-Kreise.

---

## 3. Skill-Level-Anker — finalisiert

Pro Skill **eine Karte mit vier Zeilen**. Aus Recherche-Synthese, kompatibel mit Stifterverband 2030, DigComp 2.2 Levels, Dreyfus/Benner-Progression, BARS-Methode.

**Cross-Skill-Muster (gilt für alle):**
- L1 = Wahrnehmung ohne Handlung (Reflex erkennen nachher)
- L2 = Anwendung im Schonraum (stabiles Team, Low-Stakes-Kontext)
- L3 = Verhalten unter Druck (Steering, Eskalation, Kundengespräch)
- L4 = Transfer ohne Predigt (andere eigenständiger machen)

### 3.1 Kritisches Denken
> *Behauptungen, Argumente und Annahmen aktiv prüfen — Evidenz, Logik und Perspektive einbeziehen.*

| Level | Beobachtbar von außen | Innerer Marker |
|---|---|---|
| **L1** | Ich nicke in Meetings mit und google die genannte Studie später, wenn überhaupt. | Mir fällt erst beim Heimweg ein, dass die Zahl seltsam war. |
| **L2** | In Retros frage ich nach: „Wie kommen wir auf diese Zahl?" — bei Themen, die mich nicht persönlich betreffen. | Ich merke, dass ich Mut brauche, um nachzufragen, und schiebe es bei wichtigen Themen lieber. |
| **L3** | In Steering-Meetings sage ich laut: „Ich brauche kurz, eine Annahme zu prüfen" — und tu's. | Ich erkenne den Reflex zur Zustimmung, bevor er rausgeht. |
| **L4** | Ich stelle Junior-Kolleg:innen die Frage so, dass *sie* die Lücke im Argument finden, nicht ich. | Ich freue mich, wenn meine eigene These zerlegt wird — es spart Zeit. |

### 3.2 Resilienz
> *Konstruktiv mit Belastung und Wandel umgehen, gestärkt daraus hervorgehen.*

| Level | Beobachtbar von außen | Innerer Marker |
|---|---|---|
| **L1** | Nach einem harten Feedback bin ich für zwei Tage stiller im Slack. | Ich nehme Kritik mit nach Hause und drehe sie nachts im Kopf. |
| **L2** | Nach einem verlorenen Pitch melde ich mich am nächsten Morgen mit „Was machen wir jetzt?". | Ich kenne meine Erholungs-Tricks (Laufen, Schlafen, mit X reden) — wende sie aber unzuverlässig an. |
| **L3** | Mitten in einer Eskalation atme ich hörbar einmal durch und sage: „Lass uns das in zwei Schritte trennen." | Ich spüre den Stress-Schub, aber er nimmt mir nicht die Sprache. |
| **L4** | Wenn jemand im Team zusammenbricht, frage ich nicht „Geht's?" sondern „Was brauchst du als Nächstes?". | Ich habe keine Angst vor der Krisen-Stimmung anderer — sie steckt mich nicht mehr an. |

### 3.3 KI-Kompetenz
> *KI-Tools verstehen, einsetzen, prüfen und verantwortbar in die eigene Arbeit integrieren.*

| Level | Beobachtbar von außen | Innerer Marker |
|---|---|---|
| **L1** | Ich benutze ChatGPT für E-Mail-Entwürfe, wenn jemand es mir zeigt. | Ich weiß nicht genau, wann das Modell halluziniert — ich vertraue eher dem Selbstbewusstsein der Antwort. |
| **L2** | Ich baue mir Prompts zusammen, die „ganz gut" funktionieren, und kopiere Output direkt rein — bei Low-Stakes-Texten. | Ich merke nachträglich, wenn die KI etwas erfunden hat, und ärgere mich. |
| **L3** | Im Kunden-Call nutze ich die KI live, sage aber: „Das müssen wir noch gegen die Originalquelle prüfen — ich mache das bis morgen." | Ich rieche bei einer KI-Antwort, *wo* sie wahrscheinlich falsch ist, bevor ich nachprüfe. |
| **L4** | Ich zeige Kolleg:innen nicht *welchen* Prompt, sondern *wie* sie selbst einen besseren bauen — und wo das Tool sie täuschen wird. | Ich erkenne in fremden KI-Workflows die Stelle, an der das Risiko sitzt, ohne den Use Case zu kennen. |

### 3.4 Kollaboration
> *Mit anderen so zusammenarbeiten, dass unterschiedliche Perspektiven in gemeinsame, nachhaltig wirksame Ansätze überführt werden.*

| Level | Beobachtbar von außen | Innerer Marker |
|---|---|---|
| **L1** | In Workshops übernehme ich den Teil, der mir zugewiesen wird, und liefere ihn ab. | Wenn andere streiten, ziehe ich mich innerlich zurück. |
| **L2** | In stabilen Teams biete ich Hilfe an und nehme Hilfe an, wenn jemand fragt. | Ich merke, dass ich bei fremden Leuten oder Konflikten verstumme. |
| **L3** | Im Code-Review schreibe ich: „Ich verstehe die Lösung — habe einen anderen Vorschlag, magst du den hören?" — auch bei Senior-Kolleg:innen. | Ich spüre, wann ein Konflikt das Team produktiver macht und wann er kippt — und greife rechtzeitig ein. |
| **L4** | Wenn zwei Kolleg:innen aneinander vorbei reden, übersetze ich beide Positionen so, dass sie sich gegenseitig nicken. | Ich genieße den Moment, in dem das Team etwas baut, das ich allein nie gefunden hätte. |

### 3.5 Kommunikation
> *Klar, dialogorientiert und situationsgerecht in unterschiedlichen Kontexten kommunizieren.*

| Level | Beobachtbar von außen | Innerer Marker |
|---|---|---|
| **L1** | Ich schreibe E-Mails, die ich selbst dreimal lesen muss, um sie zu verstehen. | Ich hoffe, das Gegenüber liest mit. |
| **L2** | In 1:1-Gesprächen mit Vertrauten spreche ich klar; in Townhalls lese ich Folien ab. | Ich weiß, dass ich anders rüberkomme als ich meine — kann es aber nicht steuern. |
| **L3** | Bei Pushback in der Kundenpräsentation halte ich zwei Sekunden inne, fasse den Einwand zusammen und antworte darauf — nicht auf das, was ich vorbereitet hatte. | Ich höre meinen Tonfall, während ich spreche, und justiere ihn. |
| **L4** | Ich helfe Kolleg:innen, ihre eigene Nachricht zu finden — ohne meine reinzudrücken. | Ich merke an drei Sätzen einer fremden Mail, wo sie missverstanden werden wird. |

### 3.6 Selbstkompetenz
> *Aktive Gestaltung der eigenen Entwicklung durch Selbstorganisation, Selbstmotivation und Reflexion.*

| Level | Beobachtbar von außen | Innerer Marker |
|---|---|---|
| **L1** | Ich plane meine Woche montags früh und schmeiße den Plan dienstags. | Ich erkläre mir hinterher, warum die Woche „halt so gelaufen ist". |
| **L2** | Ich blocke Fokuszeit in meinem Kalender — und halte sie, solange niemand insistiert. | Ich merke, wann ich prokrastiniere, beende es aber selten von selbst. |
| **L3** | Mitten in einem überfüllten Sprint sage ich: „Ich nehme heute nichts Neues mehr an, sonst kippt Donnerstag" — und halte das. | Ich spüre vorher, wann mein Akku kippt, und handle, bevor er leer ist. |
| **L4** | Wenn jemand „Ich schaff das alles nicht" sagt, frage ich nicht „Was streichst du?" sondern: „Was würdest du als Erstes wieder reinholen, wenn du Luft hättest?" | Ich höre auf, mich an perfekter Selbstdisziplin zu messen — und schaue, ob meine Tage zu mir passen. |

**Format auf der Seite**: ein 4er-Quadrat, Hover/Klick auf eine Zeile = „Da bin ich gerade". Optional 1-Satz-Begründung. Speichert in `SkillLevel`. Persistenz haben wir schon (Schritt 4 letzte Runde).

**Restliche 15 Skills**: Anker werden in derselben Logik ausformuliert. Vorlage gilt — kein neuer Mechanismus, nur Content. Können nach Pilot kommen.

---

## 4. Reflexionsfragen — finalisiert

User-Entscheidung: Register „provokativ-spezifisch". Recherche-Empfehlung: Erst-Sitzung mit AAR-Frage (#4) + SFBT-Ausnahme (#2) — sicherer Einstieg, später schärfer.

### 4.1 Frageset für `/start` (Onboarding-Gap-Engine)

Ersetzt das aktuelle „Welche Situation hat dich beschäftigt? / Was würde sich verändern?":

**Frage 1** (immer): *„Was hattest du dir für diese Woche vorgenommen, was nicht passiert ist — und was hat stattdessen passiert?"*
→ AAR-Doppelstruktur. Bringt unbewusste Prioritätenverschiebungen ans Licht, ohne anzuklagen.

**Frage 2** (immer): *„Wann hat diese Woche etwas funktioniert, von dem du dachtest, es würde nicht funktionieren — und was hast du genau anders gemacht?"*
→ SFBT-Exception. Lenkt Aufmerksamkeit auf konkretes Verhalten, nicht Ergebnis. Affektive Balance zur ersten Frage.

Beide Antworten gehen wie bisher an die Gap-Engine — LLM mapt auf Skills mit Begründung.

### 4.2 Weiteres Fragen-Repertoire (für `/plan` Reflexion, später Circle)

Aus dem 12er-Set ausgewählt, gruppiert nach Verwendung:

**Wöchentliche Reflexion (rotierend, 1 Frage pro Woche):**
- *„An welcher Stelle hast du diese Woche gegen dein besseres Wissen entschieden?"* — Kegan competing commitments
- *„Welches Gespräch hast du diese Woche vermieden — und mit wem genau?"* — Whyte/Erhard
- *„Worüber hast du deine Meinung geändert — und was hat das ausgelöst?"* — Grant (monatlich besser)
- *„In welchem Moment hast du gemerkt, dass dein Körper schon wusste, was dein Kopf noch nicht zugegeben hat?"* — Whyte/Scharmer

**Skalierung mit Delta** (ab Sitzung 2, NICHT erste): *„Wenn letzte Woche eine 6 war: was war diese Woche — und welcher konkrete Vorfall macht den Unterschied?"* — SFBT, vermeidet Likert-Falle.

**Quartals-Frage** (für Snapshot): *„Was hat sich dieses Quartal angefangen zu zeigen, das letztes Quartal noch nicht da war — auch wenn du es noch nicht benennen kannst?"* — Scharmer Emergenz.

### 4.3 Verbotene Kombinationen
- Nicht beide „selbst-anklagenden" Fragen in derselben Sitzung (Wider-besser-Wissen + Widersprüchliche-Handlung)
- Nicht zwei quantifizierende Fragen (AAR + Skalierung)
- Emergenz-Frage braucht Raum — nicht mit harter Konkretisierungs-Frage paaren

---

## 5. Learning Circle — Konzept und Datenmodell

Synthese aus Troika Consulting + WIAL Action Learning + kollegialer Beratung + EO Forum + Maven-Cadence.

### 5.1 Format
- **4 Personen** (Range 3–5; 3 = Minimum, 5 = maximal)
- **8 Wochen** Zyklus (jede Person 2× Focus-Person)
- **Wöchentlich 30 Min**, fixer Termin
- **Identity Statements heterogen** — jedes Mitglied auf eigenem Skill / eigenem Satz
- **Shared Artefact Visibility** — alle sehen alles im Circle

### 5.2 Minute-für-Minute-Protokoll (30 Min)

| Zeit | Phase | Quelle | Inhalt |
|---|---|---|---|
| 0:00–0:03 | **Opening** | EO Forum / Case Clinic | Ein Satz pro Person: „Mein Identity Statement fühlte sich diese Woche **lebendig / wackelig / fern** an, weil …" Keine Diskussion. |
| 0:03–0:08 | **Check-in × 4** (75s/Person) | Mastermind | Ein Win, ein Stuck-Point, Status der letzten Commitment-Bitte. Stoppuhr. |
| 0:08–0:23 | **Focus-Person Deep Dive (15 Min)** | Troika + Case Clinic + kollegiale Beratung | Sub-Struktur unten ↓ |
| 0:23–0:28 | **Commitment-Runde × 4** (75s/Person) | EO + Implementation Intentions | Wenn-dann-Bitte gekoppelt an eigenes Identity Statement: „Bis nächsten Dienstag, wenn ich in Situation X bin, mache ich Y." Wird geloggt. |
| 0:28–0:30 | **Schließung** | Case Clinic | Ein Wort pro Person zum Circle-Zustand. Pünktlich Ende. |

**Focus-Person Deep Dive (15 Min) Detail:**

| Zeit | Schritt | Quelle |
|---|---|---|
| 0:08–0:10 | Focus-Person formuliert die Frage (1 Satz) | kollegiale Schlüsselfrage |
| 0:10–0:14 | Berater:innen stellen nur klärende Fragen (keine Aussagen) | WIAL questions-only |
| 0:14–0:19 | **Focus-Person dreht sich weg / mutet**. Berater:innen reflektieren laut miteinander | Balint „push chair back" + Troika turn-away |
| 0:19–0:23 | Focus-Person kommt zurück, „erntet": was war hilfreich, was wird sie tun | Troika takeaway |

### 5.3 Rollen
- **Mitglied** — Default, jede Woche dabei
- **Focus-Person-der-Woche** — rotiert, je Mitglied 2× im 8-Wochen-Zyklus
- **Timekeeper** — rotiert, sagt Phasen an. *Wird nicht zur Focus-Person derselben Woche.*
- **Optional Facilitator** — nur Woche 1–3, damit die Disziplin sitzt. Danach withdraws.

### 5.4 Anti-Drift-Regeln (load-bearing)

1. **Nur Fragen** in Phase b. Aussagen unterbrechen.
2. **Focus-Person dreht sich weg** in Phase c. Berater:innen sprechen miteinander, nicht zur Person.
3. **Pünktlich Ende**. Nie überziehen — Maven-Insight: Cadence schlägt Tiefe.
4. **Confidentiality** — alles bleibt im Circle.

### 5.5 Ausfall-Handling
- **1 Ausfall**: automatisch ok, Commitment trägt weiter
- **2 Ausfälle in Folge**: 1-Frage-Check „Bist du noch dabei?" — kein Urteil
- **3 Ausfälle in Folge**: Mitglied wird zu „Alumni", Circle läuft als 3er weiter
- **Unter 3 Personen**: kein Wiederauffüllen mid-cycle (Vertrauenskosten > Kapazitätsgewinn)

### 5.6 Datenmodell

```
LearningCircle
  id, createdAt, cycleLengthWeeks (default 8), status (forming|active|completed|dissolved),
  cadence (default weekly), durationMinutes (default 30), rotationSeed

CircleMember
  id, circleId, userId, identityStatementId,
  role (member|facilitator), joinedAt, leftAt, status (active|alumni|paused),
  consecutiveMisses, focusTurnsTaken

CircleMeeting
  id, circleId, scheduledAt, completedAt,
  focusMemberId, timekeeperMemberId, attendance[], status

MeetingFocus  (1:1 mit CircleMeeting bei status=held)
  id, meetingId, keyQuestion, clarifyingQuestions[],
  harvestStatement, identityStatementSnapshot

CommitmentRound
  id, meetingId, memberId, identityStatementId,
  ifClause, thenClause, dueBy (default +7d),
  status (open|kept|missed|reframed), reviewedAtMeetingId?

CircleStateLog (das Schluss-Wort pro Mitglied)
  id, meetingId, memberId, word, createdAt
```

Indexes: `(CircleMember.circleId, consecutiveMisses)` für Ausfall-Trigger, `(CommitmentRound.memberId, status, dueBy)` für Wochen-Check-in, `(CircleMeeting.circleId, scheduledAt)` für Rotation.

### 5.7 Was wir bewusst weglassen
- Kein Voice/Video. Treffen findet außerhalb statt (Zoom/MS Teams/IRL). Wir liefern Protokoll, Timer, Artefakte.
- Kein Matching-Algorithmus. Circles werden manuell gegründet — 4 Leute, die sich kennen oder durch einen Initiator zusammenkommen.
- Kein „Punktestand". Health-Signal ist der wöchentliche Schluss-Wort-Verlauf.

---

## 6. Migration vom Ist-Zustand

### Schon vorhanden, bleibt
- Datenmodell IdentityStatement, Artefact, SkillLevel, ExerciseAttempt, BehaviorEvidence, Streak, Badge, CaseClinic, GapClassification — alle weiter relevant
- API-Routen `/api/exercise-attempt`, `/api/identity-statement`, `/api/case-clinic`, `/api/gap-engine`, `/api/skill-level` — bleiben, ggf. unter Sidebar verschoben
- Session-Auth + Magic-Link — bleibt
- Coach-Backend mit Identity-Statement-Kontext — bleibt
- Plan-Engine (3 HILL-Backbone-Engines) — bleibt
- Manager-Loop, Snapshot, Tour — bleiben

### Wird umgebaut
- **AppShell**: Topbar wird dünn, Sidebar links neu
- **Atlas-Seite (`/`)**: Liste → Karte
- **Skill-Detail-Seite (`/skills/[slug]`)**: bekommt Anker-Tabelle
- **`/skills/[slug]/discover`**: kann eingestampft werden — Anker auf der Skill-Seite reichen
- **`/start`**: neue Fragen, sonst wie gehabt
- **`/blind-spots`**: kann eingestampft werden — Anker-Tabelle macht „blind" überflüssig (man positioniert sich konkret)

### Wird neu gebaut
- **Sidebar-Layout** + responsive Mobile-Drawer
- **Skill-Map (visual)** als neue Startseite-Section
- **Learning Circle** komplett: Datenmodell + UI + Protokoll-Runtime
- **Coach-Pane rechts** — floating, persistent

### Wird gelöscht / archiviert
- `/blind-spots` (Funktion wandert in Skill-Seite als „häufig übersehen weil…"-Tag)
- `/skills/[slug]/discover` (Inhalt wandert in Skill-Seite-Hero)
- Frameworks-Tab im Hauptnav (verschiebt sich in `/license` / Footer)

---

## 7. Build-Reihenfolge

1. **Sidebar-Shell** (1 Iteration) — neue AppShell, leere Sidebar-Items, Top-Bar dünn. Macht den Rest planbar.
2. **Skill-Anker auf Skill-Seite** (1 Iteration) — die 6 Tabellen aus §3 als Komponente. Discover-Seite raus.
3. **Neue Fragen in `/start`** (klein) — Text-Tausch + Frageset-Konstante.
4. **Skill-Map** als Startseite-Section (1–2 Iterationen, statisch ok).
5. **Learning Circle** (3–4 Iterationen) — Datenmodell, /circles list, /circles/[id] live-protocol, commitment-tracking.
6. **Coach-Pane rechts** (1–2 Iterationen) — refactor des bestehenden /coach in ein floating Pane.
7. **Restliche 15 Skill-Anker** (über Zeit, kein Sprint).

---

## 8. Offene Entscheidungen **[?]**

**A. Skill-Map Visualisierung**: Quadranten-Layout (rationale Gruppierung) vs. Netzwerk-Karte mit Skill-Nachbarschaften (z.B. „Resilienz und Selbstkompetenz hängen zusammen"). Quadranten = einfacher zu bauen, Netzwerk = aussagekräftiger.

**B. Coach-Pane vs. Coach-Seite**: Floating-Pane überall (Recherche-Empfehlung) — sicher? Oder lieber dedizierter `/coach` als „bewusster Ort", den man aufsucht (eher Sitzungs-Charakter)?

**C. Learning Circle MVP-Scope**: Vollständiges 30-Min-Protokoll mit Timer-Runtime + Turn-Away-Mechanik in einer Iteration, oder zuerst nur das Datenmodell + manuelles Protokollieren, Timer-Runtime später?

**D. Skill-Anker für die restlichen 15 Skills**: Selber ausformulieren (wie hier 6), Recherche-Agent dafür anwerfen, oder erstmal mit den 6 starten und die anderen nach Bedarf?

---

## Quellen

Volle Quellenlisten in den Recherche-Reports der drei Agents. Schlüsselsachen:
- Stifterverband *Future Skills 2030 — Aktualisiertes Framework* (Dez 2025), Wissenschaftlicher Bericht
- DigComp 2.2 (JRC EU, 2022) — 8 Proficiency Levels
- Benner *From Novice to Expert* (Dreyfus/Benner-Anwendung)
- Smith & Kendall 1963 — BARS Methodologie
- WEF *Future of Jobs Report 2025*
- DeJong & Berg *Interviewing for Solutions* (SFBT)
- Adam Grant *Think Again* (2021)
- Kegan & Lahey *Immunity to Change*
- US Army FM 7-0 Appendix K (AAR)
- Goldsmith *Six Daily Questions*
- WIAL — Action Learning ground rules
- American Balint Society — push-chair-back protocol
- Tietze — kollegiale Beratung 6-Phasen
- Liberating Structures — Troika Consulting, Wise Crowds
- Maven cohort completion data
- Parker/Kram/Hall — Reciprocal Peer Coaching empirics
- Frontiers in Psychology 2017 — Collective Implementation Intentions
