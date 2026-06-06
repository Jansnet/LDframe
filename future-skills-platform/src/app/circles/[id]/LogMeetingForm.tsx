"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface MemberOption {
  memberId: string;
  userId: string;
  label: string;
}

interface Props {
  circleId: string;
  members: MemberOption[];
  myUserId: string;
}

interface CommitmentDraft {
  memberId: string;
  userId: string;
  label: string;
  ifClause: string;
  thenClause: string;
  dueBy: string;
}

const todayISO = () => new Date().toISOString().slice(0, 10);
const inAWeekISO = () => {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().slice(0, 10);
};

/**
 * Manual meeting-log form. The 30-min protocol is run elsewhere; this is the
 * artefact capture afterwards — one focus-person's key question + harvest,
 * plus an if-then commitment for each member.
 */
export function LogMeetingForm({ circleId, members, myUserId: _myUserId }: Props) {
  const router = useRouter();
  const [scheduledAt, setScheduledAt] = useState(todayISO);
  const [focusMemberId, setFocusMemberId] = useState<string>(members[0]?.memberId ?? "");
  const [keyQuestion, setKeyQuestion] = useState("");
  const [harvest, setHarvest] = useState("");
  const [notes, setNotes] = useState("");
  const [commitments, setCommitments] = useState<CommitmentDraft[]>(
    members.map((m) => ({
      memberId: m.memberId,
      userId: m.userId,
      label: m.label,
      ifClause: "",
      thenClause: "",
      dueBy: inAWeekISO(),
    })),
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function setCommitmentField(idx: number, key: keyof CommitmentDraft, value: string) {
    setCommitments((prev) => {
      const next = prev.slice();
      next[idx] = { ...next[idx], [key]: value };
      return next;
    });
  }

  async function submit() {
    setError(null);
    setSubmitting(true);
    try {
      const focusMember = members.find((m) => m.memberId === focusMemberId);
      const payloadCommitments = commitments
        .filter((c) => c.ifClause.trim().length > 2 && c.thenClause.trim().length > 2)
        .map((c) => ({
          memberId: c.memberId,
          userId: c.userId,
          ifClause: c.ifClause.trim(),
          thenClause: c.thenClause.trim(),
          dueBy: c.dueBy,    // YYYY-MM-DD; server parses as noon UTC
        }));

      const res = await fetch(`/api/circles/${circleId}/meetings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scheduledAt,         // YYYY-MM-DD; server parses as noon UTC
          focusMemberId: focusMember?.memberId,
          focusUserId: focusMember?.userId,
          keyQuestion: keyQuestion.trim() || undefined,
          harvestStatement: harvest.trim() || undefined,
          notes: notes.trim() || undefined,
          commitments: payloadCommitments,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.detail ?? body.error ?? "Konnte nicht gespeichert werden.");
        return;
      }
      router.refresh();
      // Reset.
      setKeyQuestion("");
      setHarvest("");
      setNotes("");
      setCommitments((prev) =>
        prev.map((c) => ({ ...c, ifClause: "", thenClause: "", dueBy: inAWeekISO() })),
      );
    } catch {
      setError("Netzwerkfehler.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card variant="filled">
      <CardBody className="space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-label-md text-on-surface mb-1">Datum</span>
            <input
              type="date"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md focus:outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="block text-label-md text-on-surface mb-1">
              Focus-Person der Woche
            </span>
            <select
              value={focusMemberId}
              onChange={(e) => setFocusMemberId(e.target.value)}
              className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md focus:outline-none focus:border-primary"
            >
              {members.map((m) => (
                <option key={m.memberId} value={m.memberId}>
                  {m.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="block text-label-md text-on-surface mb-1">
            Schlüsselfrage der Focus-Person (ein Satz)
          </span>
          <input
            value={keyQuestion}
            onChange={(e) => setKeyQuestion(e.target.value)}
            placeholder="z.B. „Wie sage ich Nein, ohne meine Glaubwürdigkeit zu verlieren?"
            className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md focus:outline-none focus:border-primary"
          />
        </label>

        <label className="block">
          <span className="block text-label-md text-on-surface mb-1">
            Ernte — was wird die Focus-Person tun
          </span>
          <textarea
            value={harvest}
            onChange={(e) => setHarvest(e.target.value)}
            rows={2}
            placeholder="z.B. „Ich frage am Donnerstag um 14 Uhr im 1:1 mit J., bevor ich auf den Pitch antworte."
            className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md focus:outline-none focus:border-primary"
          />
        </label>

        <label className="block">
          <span className="block text-label-md text-on-surface mb-1">
            Optional: freie Notizen
          </span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="z.B. klärende Fragen, Beobachtungen, Schluss-Wörter"
            className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md focus:outline-none focus:border-primary"
          />
        </label>

        <div>
          <p className="font-mono text-label-sm uppercase text-on-surface-muted mb-2">
            Wenn-dann-Bitten je Mitglied
          </p>
          <div className="space-y-3">
            {commitments.map((c, i) => (
              <div key={c.memberId} className="grid md:grid-cols-[1fr_2fr_2fr_140px] gap-2 items-center">
                <span className="text-body-md text-on-surface">{c.label}</span>
                <input
                  value={c.ifClause}
                  onChange={(e) => setCommitmentField(i, "ifClause", e.target.value)}
                  placeholder="wenn ich am Mittwoch im Steering bin"
                  className="rounded-sm border border-outline-variant bg-surface p-2 text-body-md focus:outline-none focus:border-primary"
                />
                <input
                  value={c.thenClause}
                  onChange={(e) => setCommitmentField(i, "thenClause", e.target.value)}
                  placeholder="dann sage ich vor der Abstimmung 'kurz, Annahme prüfen'"
                  className="rounded-sm border border-outline-variant bg-surface p-2 text-body-md focus:outline-none focus:border-primary"
                />
                <input
                  type="date"
                  value={c.dueBy}
                  onChange={(e) => setCommitmentField(i, "dueBy", e.target.value)}
                  className="rounded-sm border border-outline-variant bg-surface p-2 text-body-md focus:outline-none focus:border-primary"
                />
              </div>
            ))}
          </div>
          <p className="text-label-sm text-on-surface-muted italic mt-2">
            Leere Zeilen werden nicht gespeichert. Es muss nicht jede:r jede Woche eine
            Bitte formulieren.
          </p>
        </div>

        {error && <p className="text-body-md text-rust-700">{error}</p>}

        <div className="flex items-center gap-3">
          <Button variant="filled" onClick={submit} disabled={submitting}>
            {submitting ? "Speichere …" : "Treffen speichern"}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
