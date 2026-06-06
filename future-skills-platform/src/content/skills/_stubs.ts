import type { Skill, LevelAnchor } from "../schema";

/**
 * Stub skill modules — 27 of the 30 Stifterverband Future Skills 2030.
 *
 * Each stub has the L1-L4 anchors from the research synthesis (see
 * docs/skill-anchors-pending.md) plus a paraphrased definition, one
 * placeholder analogy, one placeholder foundation module and a minimal
 * coach profile. Status is "stub": the atlas shows them as authored, the
 * skill page surfaces the positioning anchors, but exercises and the
 * full coach persona come later.
 *
 * As each skill graduates to published, move it into its own
 * src/content/skills/<slug>.ts file with the full content.
 *
 * Three skills are NOT stubs and live in their own files:
 *   - kritisches-denken, resilienz, ai-literacy.
 */

interface StubInput {
  slug: string;
  name: string;
  category: Skill["category"];
  definition: string;
  anchors: Array<[string, string]>;  // 4 tuples: [observable, innerMarker], L1..L4
}

const STUB_DATA: StubInput[] = [
  // ── Grundlegende (foundational) — 5 stubs (3 of 8 done) ──
  {
    slug: "kommunikation",
    name: "Kommunikation",
    category: "foundational",
    definition: "Klar, dialogorientiert und situationsgerecht kommunizieren — auch interkulturell und unter Druck.",
    anchors: [
      ["Ich schreibe E-Mails, die ich selbst dreimal lesen muss, um sie zu verstehen.", "Ich hoffe, das Gegenüber liest mit."],
      ["In 1:1-Gesprächen mit Vertrauten spreche ich klar; in Townhalls lese ich Folien ab.", "Ich weiß, dass ich anders rüberkomme als ich meine — kann es aber nicht steuern."],
      ["Bei Pushback in der Kundenpräsentation halte ich zwei Sekunden inne, fasse den Einwand zusammen und antworte darauf — nicht auf das, was ich vorbereitet hatte.", "Ich höre meinen Tonfall, während ich spreche, und justiere ihn."],
      ["Ich helfe Kolleg:innen, ihre eigene Nachricht zu finden — ohne meine reinzudrücken.", "Ich merke an drei Sätzen einer fremden Mail, wo sie missverstanden werden wird."],
    ],
  },
  {
    slug: "kollaboration",
    name: "Kollaboration",
    category: "foundational",
    definition: "Mit anderen so zusammenarbeiten, dass unterschiedliche Perspektiven in gemeinsame, nachhaltig wirksame Ansätze überführt werden.",
    anchors: [
      ["In Workshops übernehme ich den Teil, der mir zugewiesen wird, und liefere ihn ab.", "Wenn andere streiten, ziehe ich mich innerlich zurück."],
      ["In stabilen Teams biete ich Hilfe an und nehme Hilfe an, wenn jemand fragt.", "Ich merke, dass ich bei fremden Leuten oder Konflikten verstumme."],
      ["Im Code-Review schreibe ich: „Ich verstehe die Lösung — habe einen anderen Vorschlag, magst du den hören?“ — auch bei Senior-Kolleg:innen.", "Ich spüre, wann ein Konflikt das Team produktiver macht und wann er kippt — und greife rechtzeitig ein."],
      ["Wenn zwei Kolleg:innen aneinander vorbei reden, übersetze ich beide Positionen so, dass sie sich gegenseitig nicken.", "Ich genieße den Moment, in dem das Team etwas baut, das ich allein nie gefunden hätte."],
    ],
  },
  {
    slug: "problemloesungskompetenz",
    name: "Problemlösungskompetenz",
    category: "foundational",
    definition: "Komplexe oder neuartige Probleme erkennen, strukturieren und gemeinsam in tragfähige Lösungen überführen.",
    anchors: [
      ["Ich beschwere mich im Flurgespräch über das Ticket-Chaos und hoffe, dass jemand was macht.", "Mir fällt abends auf der Couch ein, was das eigentliche Problem ist."],
      ["Im Team-Standup male ich kurz die Schritte ans Whiteboard, wenn wir hängen — bei Themen, bei denen ich mich sicher fühle.", "Ich merke, dass ich es im fremden Team nicht tun würde."],
      ["In der Eskalationsrunde mit der Geschäftsleitung sage ich: „Lass uns das Problem trennen — Symptom hier, Ursache da.“", "Ich spüre den Drang, sofort eine Lösung zu liefern, und halte ihn aus."],
      ["Ich frage die Kolleg:innen: „Was ist eigentlich das Problem unter dem Problem?“ — und lasse sie strukturieren.", "Ich freue mich, wenn ihr Plan besser ist als meiner."],
    ],
  },
  {
    slug: "lernkompetenz",
    name: "Lernkompetenz",
    category: "foundational",
    definition: "Das eigene Lernen selbst organisieren, an neue Anforderungen anpassen und neue Werkzeuge wirksam nutzen.",
    anchors: [
      ["Ich speichere den Konferenz-Link für später und schaue ihn nie an.", "Mir fällt drei Wochen später auf, dass das Tool, das alle nutzen, in dem Video erklärt war."],
      ["Ich blocke mir freitags eine Stunde „Lernen“ — und halte sie ein, solange kein Meeting reinkommt.", "Ich fühle mich gut, gebe das Slot aber bei der ersten Anfrage frei."],
      ["Mitten im Sprint, in dem ich kein neues Framework brauchen kann, setze ich mich abends zwei Stunden hin und lerne es trotzdem — weil ich sonst nächste Woche im Review stehe und bluffe.", "Ich merke den Widerstand und mache trotzdem den ersten Schritt."],
      ["Ich sage einer Junior-Kollegin: „Hier ist nicht die Lösung — hier ist, wie ich rausfinde, wo die Lösung steht.“", "Ich freue mich, wenn sie nächste Woche etwas weiß, was ich nicht weiß."],
    ],
  },
  {
    slug: "ethische-kompetenz",
    name: "Ethische Kompetenz",
    category: "foundational",
    definition: "Ethisch relevante Situationen erkennen, Handlungsoptionen abwägen und das eigene Tun danach ausrichten.",
    anchors: [
      ["Ich lache mit, als im Lunch über die neue Kollegin gewitzelt wird.", "Mir wird auf dem Heimweg unwohl, ich sage nichts."],
      ["Im vertrauten Team sage ich: „Das ist eigentlich nicht okay“ — bei Themen, die nicht eskalieren.", "Ich bin nervös vorher, erleichtert danach."],
      ["Im Kundengespräch über einen aggressiven Datenexport sage ich: „Ich muss kurz fragen, ob wir das so dürfen.“", "Ich spüre den Karriereinstinkt, der schweigen will, und entscheide bewusst dagegen."],
      ["Ich frage in der Designreview: „Wer nutzt das nicht, und was passiert dem?“ — und lasse das Team antworten.", "Ich freue mich, wenn jemand anders die Lücke sieht, die ich übersehen hätte."],
    ],
  },
  {
    slug: "selbstkompetenz",
    name: "Selbstkompetenz",
    category: "foundational",
    definition: "Aktive Gestaltung der eigenen Entwicklung durch Selbstorganisation, Selbstmotivation und Reflexion.",
    anchors: [
      ["Ich plane meine Woche montags früh und schmeiße den Plan dienstags.", "Ich erkläre mir hinterher, warum die Woche „halt so gelaufen ist“."],
      ["Ich blocke Fokuszeit in meinem Kalender — und halte sie, solange niemand insistiert.", "Ich merke, wann ich prokrastiniere, beende es aber selten von selbst."],
      ["Mitten in einem überfüllten Sprint sage ich: „Ich nehme heute nichts Neues mehr an, sonst kippt Donnerstag“ — und halte das.", "Ich spüre vorher, wann mein Akku kippt, und handle, bevor er leer ist."],
      ["Wenn jemand „Ich schaff das alles nicht“ sagt, frage ich nicht „Was streichst du?“ sondern: „Was würdest du als Erstes wieder reinholen, wenn du Luft hättest?“", "Ich höre auf, mich an perfekter Selbstdisziplin zu messen — und schaue, ob meine Tage zu mir passen."],
    ],
  },
  {
    slug: "kreativitaet",
    name: "Kreativität",
    category: "foundational",
    definition: "Originelle Ideen entwickeln, ihnen Form geben und vorhandene Ansätze weiterdenken statt nur abzunicken.",
    anchors: [
      ["Ich nicke im Brainstorming und übernehme die erste Idee, die fünf Personen schon mochten.", "Unter der Dusche habe ich später die bessere Idee — und teile sie nicht."],
      ["In meinem Team werfe ich eine ungewöhnliche Variante in den Raum — wenn ich weiß, dass niemand sie zerlegen wird.", "Ich merke, wie ich abwäge, ob die Idee „okay genug“ ist, bevor ich sie sage."],
      ["Im Pitch vor Vorstand und drei Externen sage ich: „Ich habe noch eine dritte Option, die wir nicht auf der Folie haben.“", "Ich spüre, wie sich die Magengrube zuzieht, und sage es trotzdem."],
      ["Ich starte das Meeting mit: „Was würde uns hier am meisten überraschen?“ — und halte den Mund.", "Ich freue mich, wenn die Stille im Raum endlich was sagt, was ich nicht erwartet hätte."],
    ],
  },

  // ── Transformative — 5 stubs (1 of 6 done: resilienz) ──
  {
    slug: "ambiguitaetskompetenz",
    name: "Ambiguitätskompetenz",
    category: "transformative",
    definition: "Mehrdeutigkeit, Unsicherheit und Widersprüche erkennen und konstruktiv damit umgehen, statt sie wegzuargumentieren.",
    anchors: [
      ["Ich frage in der Roadmap-Diskussion: „Was machen wir denn jetzt — A oder B?“ und werde ungeduldig.", "Mir fällt erst spät auf, dass es kein „oder“ war, sondern ein „und“."],
      ["Im internen Workshop sage ich: „Vielleicht stimmt beides gleichzeitig“ — bei Themen, die mich nicht treffen.", "Ich finde es bequem, mich rauszuhalten, wenn es ungemütlich wird."],
      ["Vor Lenkungskreis sage ich: „Ich kann das nicht klar machen, was nicht klar ist — wir müssen es so entscheiden, dass wir nachjustieren können.“", "Ich spüre den Druck, eine Schein-Klarheit zu liefern, und sage trotzdem die Wahrheit."],
      ["Ich frage das Team: „Was würden wir tun, wenn beide Lager recht hätten?“ und lasse sie selbst sortieren.", "Ich freue mich, wenn jemand das Gefühl beschreibt, ohne es auflösen zu müssen."],
    ],
  },
  {
    slug: "nachhaltigkeitskompetenz",
    name: "Nachhaltigkeitskompetenz",
    category: "transformative",
    definition: "Eigenes und gemeinsames Handeln an ökologischen, sozialen und ökonomischen Zusammenhängen ausrichten — und auf nachhaltige Rahmenbedingungen hinwirken.",
    anchors: [
      ["Ich klicke „Klimakompensation“ beim Flugticket weg, weil's grad teurer ist.", "Auf dem Rückflug ist mir das Folder-Bild der NGO im Kopf."],
      ["Ich frage im eigenen Team, ob wir das Offsite näher legen können — wenn es ohnehin niemand cool findet, weit zu fliegen.", "Ich merke, dass ich den Punkt bei wichtigeren Stakeholdern nicht ansprechen würde."],
      ["In der Budgetrunde sage ich: „Diese Variante ist 4 % teurer, aber wir können sie 2030 noch betreiben — die billige nicht.“", "Ich spüre den Reflex, das Argument abzuschwächen, damit es leichter durchgeht, und bleibe dabei."],
      ["Ich frage Einkauf: „Was kostet das in 10 Jahren, nicht in einem?“ — und lasse sie rechnen.", "Ich freue mich, wenn das Team das Argument selbst zum Standard macht."],
    ],
  },
  {
    slug: "systemkompetenz",
    name: "Systemkompetenz",
    category: "transformative",
    definition: "Komplexe Systeme, Zusammenhänge und Wechselwirkungen ganzheitlich erfassen und auf dieser Basis fundiert handeln.",
    anchors: [
      ["Ich folge dem KPI, den mein Bereich misst, und wundere mich, warum Nachbarbereich sauer ist.", "Mir fällt im Urlaub auf, dass meine Optimierung deren Problem gemacht hat."],
      ["Im Retro-Whiteboard zeichne ich Pfeile zwischen zwei Abteilungen — wenn ich weiß, niemand fühlt sich angegriffen.", "Ich finde es spannend, traue mich aber nicht, das in der All-Hands zu zeigen."],
      ["In der Quartalsplanung sage ich: „Wenn wir Vertrieb-Ziel X erhöhen, kippt uns Support — hier ist die Schleife.“", "Ich spüre, dass die Komplexität die Stimmung killt, und führe das Argument trotzdem zu Ende."],
      ["Ich frage Junior-PMs: „Wenn dein Knopf gedrückt wird, was leuchtet drei Räume weiter?“ — und lasse sie das Diagramm zeichnen.", "Ich freue mich, wenn sie eine Rückkopplung sehen, die ich nicht eingebaut hatte."],
    ],
  },
  {
    slug: "innovationskompetenz",
    name: "Innovationskompetenz",
    category: "transformative",
    definition: "Neue Ideen entwickeln und so umsetzen, dass ein erkennbarer Nutzen entsteht — nicht nur ein Prototyp im Ordner.",
    anchors: [
      ["Ich poste den Artikel über „Innovation X“ intern und gehe in die Mittagspause.", "Mir fällt eine Woche später ein, dass ich genau das hätte testen können."],
      ["Im eigenen Team baue ich am Freitag einen Prototypen — solange kein Stakeholder zuhört.", "Ich genieße das Basteln und schiebe das Validieren am Markt vor mir her."],
      ["Vor einem skeptischen Lenkungskreis sage ich: „Lasst uns 6 Wochen testen, mit 3 echten Kunden, festes Stop-Kriterium.“", "Ich spüre, wie ich die Idee überverkaufen will, und bleibe bei der ehrlichen Größenordnung."],
      ["Ich frage Kolleg:innen: „Was wäre der schnellste Test, mit dem wir uns blamieren könnten?“ — und gebe Budget statt Vorgaben.", "Ich freue mich, wenn deren Test scheitert und uns Zeit spart."],
    ],
  },
  {
    slug: "visionskompetenz",
    name: "Visionskompetenz",
    category: "transformative",
    definition: "Zukunftsszenarien entwickeln, ihre Folgen für heutige Entscheidungen reflektieren und daraus eine Richtung ableiten.",
    anchors: [
      ["Ich kopiere den „Vision Statement“-Foliensatz vom letzten Jahr und tausche die Jahreszahl.", "Mir fällt im Strategiemeeting auf, dass ich selbst nicht weiß, wo wir 2030 sein sollen."],
      ["Mit dem eigenen Team male ich ein „Tag im Leben 2028“-Szenario — wenn es kein offizielles Strategiedokument wird.", "Ich finde es spannend, habe aber Angst, vor anderen „naiv“ zu klingen."],
      ["In der Vorstandssitzung sage ich: „Wenn diese Annahme in 3 Jahren so eintritt, ist unsere heutige Entscheidung falsch — hier ist die Alternative.“", "Ich spüre, wie unangenehm es ist, die Gegenwart zu relativieren, und sage es trotzdem."],
      ["Ich frage das Team: „Welche zwei Szenarien sollten wir beide ernst nehmen?“ — und lasse sie selbst auswählen.", "Ich freue mich, wenn ihr Szenario fremder ist als meines."],
    ],
  },

  // ── Gemeinschaftsorientierte (communal) — 5 stubs (0 of 5 done) ──
  {
    slug: "dialogkompetenz",
    name: "Dialogkompetenz",
    category: "communal",
    definition: "Respektvoll und empathisch in Austausch treten, Perspektiven übernehmen und Konflikte produktiv klären statt zudecken.",
    anchors: [
      ["Ich höre dem Gegenüber zu, während ich meine Antwort schon formuliere.", "Mir fällt nachts ein, dass die Person eigentlich etwas anderes gemeint hat."],
      ["In einer 1:1-Situation frage ich: „Habe ich dich richtig verstanden — du meinst …?“ — bei Themen, die nicht hochkochen.", "Ich merke, dass ich es im Gruppensetting schwieriger finde."],
      ["Im erhitzten Krisenmeeting sage ich: „Stopp — ich höre gerade, dass Vertrieb sich übergangen fühlt. Stimmt das?“", "Ich spüre den Wunsch, schneller zur Lösung zu gehen, und bleibe stehen."],
      ["Ich frage einer streitenden Junior-Runde: „Was glaubt ihr, was die andere Seite gerade braucht?“ — und höre zu.", "Ich freue mich, wenn die zwei sich verstehen, ohne dass ich übersetzen musste."],
    ],
  },
  {
    slug: "demokratiekompetenz",
    name: "Demokratiekompetenz",
    category: "communal",
    definition: "Sich für demokratische und solidarische Grundprinzipien einsetzen — politisch, im Schutz von Grundrechten und gegen Desinformation.",
    anchors: [
      ["Ich scrolle über die Schlagzeile zur neuen Wahlrechtsänderung weiter, weil's gerade nicht passt.", "Mir fällt am Wahltag auf, dass ich keine informierte Entscheidung treffen kann."],
      ["Im Familienchat schreibe ich freundlich, dass der weitergeleitete Screenshot ein Fake ist — bei Familie, die ich kenne.", "Ich finde es anstrengend und überlege, ob es den Stress wert ist."],
      ["Im Team-Kanal, in dem ein:e Kolleg:in eine Verschwörungstheorie teilt, schreibe ich: „Ich seh's anders, hier ist meine Quelle“ — auch vor Vorgesetzten.", "Ich spüre, wie ich gleich als „Polit-Person“ gelte, und bleibe sachlich."],
      ["Ich frage Jüngere: „Wie würdest du prüfen, ob das stimmt?“ — und gebe ihnen kein Urteil mit.", "Ich freue mich, wenn sie selbst die Quelle finden und die Aussage einsortieren."],
    ],
  },
  {
    slug: "verantwortungsuebernahme",
    name: "Verantwortungsübernahme",
    category: "communal",
    definition: "Verantwortung für eigenes und gemeinsames Handeln übernehmen — auch für die Folgen, auch wenn niemand fragt.",
    anchors: [
      ["Ich sage in der Post-Mortem: „Tja, war halt das System.“", "Mir fällt unter der Dusche ein, an welcher Stelle ich es hätte stoppen können."],
      ["In der eigenen Retro sage ich: „Da hab ich daneben gelegen“ — wenn das Team mir wohlgesonnen ist.", "Ich finde Erleichterung darin, scheue es aber im größeren Kreis."],
      ["Im Krisencall mit Kunde und Geschäftsführung sage ich: „Das war mein Call, ich erkläre warum — und was ich jetzt mache.“", "Ich spüre die Angst um Konsequenz und sage trotzdem ich, nicht „wir“."],
      ["Ich frage Junior-Kolleg:innen: „Was wäre dein Anteil gewesen, wenn's deine Entscheidung wäre?“ — ohne sie zu beschämen.", "Ich freue mich, wenn sie selbst den Hebel sehen, nicht den Schuldigen."],
    ],
  },
  {
    slug: "beteiligungskompetenz",
    name: "Beteiligungskompetenz",
    category: "communal",
    definition: "Andere aktiv in Entscheidungen einbinden, eigene Stimme einbringen und Mitgestaltung ermöglichen.",
    anchors: [
      ["Im Meeting sage ich nichts, schreibe aber später in Slack: „Ich hätte das anders gemacht.“", "Mir fällt zu Hause ein, dass ich es im Meeting hätte sagen müssen."],
      ["Im eigenen Team frage ich rum: „Wer ist hier nicht zu Wort gekommen?“ — bei Themen, die ich überblicke.", "Ich freue mich über meine Rolle und übersehe, dass ich grad selbst dominant war."],
      ["Vor wichtiger Entscheidung breche ich das Meeting kurz ab: „Wir entscheiden das nicht ohne Support und Ops — wir vertagen 24 Stunden.“", "Ich spüre den Druck, „Zeit zu sparen“, und nehme die 24 Stunden trotzdem."],
      ["Ich frage als Senior: „Wer ist im Raum, der noch nichts gesagt hat?“ — und gebe Raum, ohne zu drängen.", "Ich freue mich, wenn jemand das nächste Mal selbst diese Frage stellt."],
    ],
  },
  {
    slug: "diversitaetskompetenz",
    name: "Diversitätskompetenz",
    category: "communal",
    definition: "Vielfalt wertschätzend mitgestalten und Unterschiede produktiv in Zusammenarbeit einbinden — nicht nur im Leitbild.",
    anchors: [
      ["Ich lese die Stellenausschreibung gegen und denke „klingt gut“ — sie liest sich für 90 % der Frauen wie „nicht gemeint“.", "Mir fällt es erst auf, wenn jemand mir später zeigt, wo der Bias war."],
      ["Im eigenen Team unterbreche ich freundlich, wenn jemand permanent dazwischenredet — bei Personen, die ich mag.", "Ich merke, dass ich es nicht tue, wenn die unterbrechende Person Senior ist."],
      ["Im Hiring-Komitee mit Geschäftsführung sage ich: „Wir haben drei sehr ähnliche Profile gewählt — sind wir sicher, dass wir nicht die einfache Wahl treffen?“", "Ich spüre, dass ich als „schwierig“ gelte, und stelle die Frage trotzdem."],
      ["Ich frage Junior-Manager:innen: „Wer in deinem Team hat eine andere Sicht, die du noch nicht ernst genommen hast?“", "Ich freue mich, wenn ihr Team produktiv streitet statt höflich nickt."],
    ],
  },

  // ── Digitale — 4 stubs (1 of 5 done: ai-literacy) ──
  {
    slug: "informationskompetenz",
    name: "Informationskompetenz",
    category: "digital",
    definition: "Informationsbedarf erkennen, gezielt relevante Quellen finden, kritisch bewerten und wirksam einsetzen.",
    anchors: [
      ["Ich google die Frage, klicke das erste Ergebnis und kopiere die Zahl in meine Folie.", "Mir fällt im Meeting auf, dass ich nicht weiß, woher die Zahl ursprünglich kommt."],
      ["Bei interner Recherche prüfe ich zwei Quellen — bei Themen, bei denen Genauigkeit erwartet wird.", "Ich finde das gut, lasse es aber unter Zeitdruck wieder weg."],
      ["Vor Vorstand mit fünf Minuten Vorlauf sage ich: „Die Zahl ist von 2022, neueres habe ich nicht verifizieren können — wir entscheiden vorbehaltlich.“", "Ich spüre die Versuchung, die Unsicherheit zu verschweigen, und mach's transparent."],
      ["Ich frage Kolleg:innen: „Was wäre die Quelle, die diese Aussage widerlegen würde?“ — und lasse sie selber suchen.", "Ich freue mich, wenn sie eine bessere Quelle finden als ich."],
    ],
  },
  {
    slug: "digital-literacy",
    name: "Digital Literacy",
    category: "digital",
    definition: "Digitale Werkzeuge souverän nutzen, Grundregeln digitaler Sicherheit verstehen und in digitalen Räumen respektvoll zusammenarbeiten.",
    anchors: [
      ["Ich klicke „Passwort merken“ im fremden Browser und schließe das Fenster.", "Mir fällt eine Woche später ein, dass das nicht mein Laptop war."],
      ["Im Team-Slack benutze ich Threads statt Channel-Spam — wenn das Team es vorlebt.", "Ich finde es richtig und vergesse es bei Eile."],
      ["Im Krisenmeeting mit externem Partner sage ich: „Wir teilen das Dokument nicht über diesen Kanal — ich richte uns in 5 Minuten ein verschlüsseltes Share ein.“", "Ich spüre den Reflex „ist doch egal“ und mach's trotzdem sauber."],
      ["Ich richte einer neuen Kollegin nicht den Zugang ein — ich zeige ihr, wo sie ihn beantragt, und warum.", "Ich freue mich, wenn sie nächste Woche jemand anderen einarbeitet, statt mich zu fragen."],
    ],
  },
  {
    slug: "medienkompetenz",
    name: "Medienkompetenz",
    category: "digital",
    definition: "Medien im digitalen Zeitalter kritisch, kreativ, sicher und verantwortlich nutzen, erstellen und analysieren.",
    anchors: [
      ["Ich teile das empörende Video, das durch meine Timeline läuft, weil mein Bauchgefühl es bestätigt.", "Mir fällt am nächsten Tag auf, dass im Kommentar steht, das Video sei aus 2019."],
      ["Vor dem Teilen eines Artikels prüfe ich die Quelle — bei Themen, in denen ich neutral bin.", "Ich merke, dass ich es bei Themen, die mich emotional treffen, nicht tue."],
      ["Im Townhall sage ich: „Dieser Screenshot, den wir grad zeigen, ist KI-generiert — ich habe es eben kurz verifiziert.“", "Ich spüre, wie es den Vortrag unterbricht, und sage es trotzdem."],
      ["Ich frage Kolleg:innen: „Woher weißt du, dass dieses Bild echt ist?“ — neugierig, nicht prüfend.", "Ich freue mich, wenn sie denselben Reflex bei ihren Posts einbauen."],
    ],
  },
  {
    slug: "datenkompetenz",
    name: "Datenkompetenz",
    category: "digital",
    definition: "Daten kritisch erheben, verwalten, bewerten und so anwenden, dass Entscheidungen tatsächlich besser werden.",
    anchors: [
      ["Ich klicke im Dashboard die grüne Zahl an und freue mich.", "Mir fällt im Urlaub auf, dass die Zahl wahrscheinlich nicht das misst, was ich denke."],
      ["In der eigenen Auswertung frage ich: „Was ist die Grundgesamtheit?“ — bei Themen, die mein Team selbst aufgesetzt hat.", "Ich freue mich über meinen Reflex und merke, dass ich ihn bei BI-Reports von oben weglasse."],
      ["Im KPI-Meeting mit Geschäftsführung sage ich: „Diese 18 % Steigerung kommen aus einer Definitionsänderung im April — der echte Effekt ist 3 %.“", "Ich spüre die Versuchung, die guten News stehen zu lassen, und sage es trotzdem."],
      ["Ich frage neue Kolleg:innen vor dem Report: „Was wäre die langweilige Erklärung für diesen Anstieg?“", "Ich freue mich, wenn sie es selber sehen, bevor das Meeting beginnt."],
    ],
  },

  // ── Technologische — 6 stubs (0 of 6 done) ──
  {
    slug: "data-science-analytics",
    name: "Data Science & Analytics",
    category: "technological",
    definition: "Komplexe Daten systematisch erheben, aufbereiten und so analysieren, dass belastbare Erkenntnisse für Entscheidungen entstehen.",
    anchors: [
      ["Ich rechne den Durchschnitt in Excel aus und schicke die Folie raus.", "Mir fällt im Bett ein, dass zwei Ausreißer den Mittelwert verzerrt haben."],
      ["Im Notebook prüfe ich Verteilung und Nullwerte — bei Projekten, in denen ich Zeit habe.", "Ich weiß, dass ich es im Sprint-Stress weglasse, und nehme es hin."],
      ["Im Steering frage ich: „Bevor wir auf dieses Modell vertrauen — was passiert, wenn der Trainingszeitraum vor Corona endet?“", "Ich spüre, dass die Frage den Plan kippen kann, und stelle sie trotzdem."],
      ["Ich frage Junior-Analyst:innen: „Welcher Plot würde dich überraschen?“ — und lasse sie ihn bauen, statt ihn vorzugeben.", "Ich freue mich, wenn ihre Auswertung meinen Bauch widerlegt."],
    ],
  },
  {
    slug: "ai-engineering",
    name: "AI Engineering",
    category: "technological",
    definition: "KI-Systeme verantwortlich konzipieren, entwickeln, trainieren und so in Produkte einbinden, dass sie auch außerhalb des Notebooks tragen.",
    anchors: [
      ["Ich deploye das Modell, das im Notebook 92 % Accuracy hatte, und freue mich auf die Demo.", "Mir fällt zwei Wochen später auf, dass im Live-Betrieb die Eingabedaten anders aussehen."],
      ["In meinem Projekt schreibe ich Eval-Sets und Monitoring — wenn der Kunde nicht drückt.", "Ich finde es richtig und schiebe es bei Druck."],
      ["Im Release-Meeting vor Vorstand sage ich: „Wir gehen nicht live — der Bias auf Region X ist 12 %, das müssen wir vorher fixen.“", "Ich spüre den Druck, das Datum zu halten, und halte das Datum nicht."],
      ["Ich frage Junior-ML-Eng: „Was würde dich überzeugen, dass das Modell ungeeignet ist?“ — und lasse sie das Eval bauen.", "Ich freue mich, wenn ihr Test mein Lieblingsmodell killt."],
    ],
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    category: "technological",
    definition: "Informations- und IT-Systeme proaktiv gegen Bedrohungen schützen, Risiken bewerten und robuste Strategien für Prävention, Erkennung und Reaktion umsetzen.",
    anchors: [
      ["Ich kopiere den Kundenauszug aus der Datenbank in eine ZIP-Datei und schicke sie per Mail an mich selbst.", "Mir fällt drei Tage später auf, dass mein Mail-Provider gar nicht in der EU sitzt."],
      ["Im eigenen Team aktiviere ich 2FA und sage Junior-Kolleg:innen, sie sollten das auch — wenn niemand stöhnt.", "Ich freue mich über das saubere Setup und drücke beim eigenen Side-Project ein Auge zu."],
      ["In der Pressekrise nach Datenleck sage ich: „Wir kommunizieren nicht 'kein Risiko' — wir kennen das Risiko noch nicht. Ich schreibe die Mail.“", "Ich spüre, wie unangenehm Ehrlichkeit hier ist, und bleibe ehrlich."],
      ["Ich gebe Junior-Devs nicht die Checkliste — ich zeige ihnen einen Phishing-Versuch im Posteingang und frage: „Was würdest du jetzt prüfen?“", "Ich freue mich, wenn sie nächste Woche mir einen Verdacht melden, den ich übersehen hätte."],
    ],
  },
  {
    slug: "cloud-dev-ops",
    name: "Cloud Dev & Operations",
    category: "technological",
    definition: "Skalierbare cloudbasierte Anwendungen sicher entwickeln, betreiben und so optimieren, dass der Service tatsächlich resilient bleibt.",
    anchors: [
      ["Ich starte die Instanz für den Demo-Tag und lasse sie laufen.", "Mir fällt im nächsten Monat auf der Rechnung auf, dass sie noch lief."],
      ["Im eigenen Repo schreibe ich Infrastructure-as-Code — bei Projekten, die ich von Anfang an aufsetzen darf.", "Ich finde es richtig und mache es bei Bestandsprojekten „irgendwann später“."],
      ["Beim Vorfall um 23 Uhr mit Kunde im Call sage ich: „Wir rollen nicht zurück blind — ich brauche 8 Minuten für ein sauberes Snapshot, dann ja.“", "Ich spüre den Druck „JETZT machen“ und nehme die 8 Minuten trotzdem."],
      ["Ich frage Junior-DevOps: „Was passiert, wenn diese Region jetzt ausfällt?“ — und lasse sie das Runbook schreiben.", "Ich freue mich, wenn ihr Runbook besser ist als meines aus 2023."],
    ],
  },
  {
    slug: "autonomous-systems",
    name: "Autonomous Systems & Robotics",
    category: "technological",
    definition: "Intelligente, autonom agierende Systeme und Robotik so entwickeln und einbinden, dass sie menschliche Fähigkeiten sicher erweitern — statt sie blind zu ersetzen.",
    anchors: [
      ["Ich aktiviere die Automatisierung und drehe mich zum nächsten Ticket.", "Mir fällt erst beim Beschwerde-Mail auf, dass das System eine Edge-Case-Entscheidung getroffen hat, die ich nie vorgesehen hatte."],
      ["Im eigenen Prototyp setze ich Stop-Bedingungen und Logs — solange der Kunde noch nicht drängt.", "Ich freue mich über das saubere Verhalten und übersehe, wie wenig ich's getestet habe."],
      ["In der Freigaberunde vor Geschäftsführung sage ich: „Dieses System darf in 4 Fällen nicht alleine entscheiden — hier ist die Liste, und hier ist, wer den Anruf bekommt.“", "Ich spüre, dass die Liste den Business Case schwächt, und stelle die Liste trotzdem rein."],
      ["Ich frage Junior-Eng: „Welche Entscheidung würdest du dem System nie geben?“ — und nehme ihre Liste ernst.", "Ich freue mich, wenn sie eine Grenze ziehen, die ich verschoben hätte."],
    ],
  },
  {
    slug: "ai-leadership",
    name: "Change Management & AI Leadership",
    category: "technological",
    definition: "KI-getriebene Transformation strategisch gestalten, Menschen und Organisation durch Veränderung führen und nachhaltigen Nutzen sicherstellen — statt nur Tools auszurollen.",
    anchors: [
      ["Ich kündige im All-Hands den neuen Copilot-Rollout an und freue mich über den Applaus.", "Mir fällt im Quartalsreview auf, dass kaum jemand das Tool wirklich nutzt."],
      ["In meinem Bereich starte ich Pilotgruppen und sammle Feedback — solange ich nicht öffentlich Erfolg versprechen muss.", "Ich finde das Vorgehen gut und beschleunige es, sobald der Vorstand Tempo erwartet."],
      ["Vor Vorstand sage ich: „Wir verzögern den globalen Rollout um 8 Wochen — die Pilotteams sagen, der Workflow stimmt noch nicht. Hier ist der Beleg.“", "Ich spüre, wie meine eigene Reputation am Datum hängt, und verschiebe trotzdem."],
      ["Ich frage Teamleads: „Was würde dein Team aufhalten, das Tool wirklich zu nutzen?“ — und gebe ihnen Mandat statt Anweisung.", "Ich freue mich, wenn ein Teamlead den Rollout in ihrem Bereich anders macht als ich vorgeschlagen hätte — und es funktioniert."],
    ],
  },
];

function toAnchors(pairs: Array<[string, string]>): LevelAnchor[] {
  const levels: Array<"L1" | "L2" | "L3" | "L4"> = ["L1", "L2", "L3", "L4"];
  return pairs.map((p, i) => ({
    level: levels[i],
    observable: { de: p[0] },
    innerMarker: { de: p[1] },
  }));
}

function toSkill(input: StubInput): Skill {
  return {
    slug: input.slug,
    category: input.category,
    name: { de: input.name },
    definition: { de: input.definition },
    megatrendTags: [],
    relatedSkills: [],
    levelAnchors: toAnchors(input.anchors),
    analogies: [
      {
        id: "placeholder",
        title: { de: "Ausführliches Material folgt" },
        body: {
          de: `Die L1–L4-Anker oben sind aus der Recherche fertig und einsetzbar für Selbstpositionierung. Vollständige Analogien, Übungen und Coach-Persona für „${input.name}" werden inkrementell ergänzt — siehe Atlas-Status.`,
        },
      },
    ],
    foundation: [
      {
        id: "definition",
        title: { de: "Worum es bei diesem Skill geht" },
        kind: "concept",
        readingMinutes: 3,
        body: {
          de: `${input.definition}\n\nNutze die L1–L4-Anker, um dich zu positionieren. Ein Identity Statement für diesen Skill kannst du formulieren, sobald die Übungen verfügbar sind.`,
        },
      },
    ],
    exercises: [],
    checklists: [],
    habits: [],
    coach: {
      persona: {
        de: `Coach für ${input.name} (im Aufbau). Stellt Rückfragen, gibt keine fertigen Lösungen.`,
      },
      systemPrompt: {
        de: `Du bist ein Coach für die Future-Skill "${input.name}". Definition: ${input.definition}. Stelle eine konkrete Rückfrage zu einer Situation des Nutzers, statt zu belehren. Antworte kurz (max 4 Sätze) auf Deutsch.`,
      },
      suggestedPrompts: [
        { de: `Wann ist mir „${input.name}" in dieser Woche begegnet?` },
        { de: `Wo merke ich, dass ich diesen Skill brauche?` },
        { de: `Was würde sich ändern, wenn ich hier sicherer wäre?` },
      ],
    },
    version: "0.1.0-stub",
    authors: ["Skill Hacker Editorial"],
    status: "stub",
  };
}

export const STUB_SKILLS: Skill[] = STUB_DATA.map(toSkill);
