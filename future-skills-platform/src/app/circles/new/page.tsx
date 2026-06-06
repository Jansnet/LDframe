"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function NewCirclePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [emails, setEmails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setError(null);
    setSubmitting(true);
    try {
      const memberEmails = emails
        .split(/[\s,;\n]+/)
        .map((e) => e.trim().toLowerCase())
        .filter((e) => e.length > 0);

      const res = await fetch("/api/circles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), memberEmails }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.detail ?? body.error ?? "Konnte nicht erstellt werden.");
        return;
      }
      const { id } = await res.json();
      router.push(`/circles/${id}`);
    } catch {
      setError("Netzwerkfehler.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <header>
        <h1 className="font-serif text-display-md text-on-surface mb-2">Neuen Circle starten</h1>
        <p className="text-body-lg text-on-surface-muted">
          Du brauchst den Namen für den Circle und die Mails von 2–4 weiteren Personen aus
          deiner Org. Wir prüfen, ob sie schon ein Konto haben — falls nicht, lade sie ein
          und versuche es dann nochmal.
        </p>
      </header>

      <Card variant="filled" className="space-y-5">
        <CardBody className="space-y-5">
          <label className="block">
            <span className="block text-label-md text-on-surface mb-1">Name des Circles</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="z.B. „Donnerstag 9:00 — Resilienz / KI / Selbst"
              className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md focus:outline-none focus:border-primary"
            />
          </label>

          <label className="block">
            <span className="block text-label-md text-on-surface mb-1">
              E-Mails der anderen Mitglieder (2–4, kommagetrennt)
            </span>
            <textarea
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              rows={3}
              placeholder="anna@firma.de, ben@firma.de, carla@firma.de"
              className="w-full rounded-sm border border-outline-variant bg-surface p-3 font-mono text-body-md focus:outline-none focus:border-primary"
            />
            <p className="text-label-sm text-on-surface-muted italic mt-1">
              Deine eigene Mail brauchst du nicht einzutragen — du wirst automatisch hinzugefügt.
            </p>
          </label>

          {error && <p className="text-body-md text-rust-700">{error}</p>}

          <div className="flex items-center gap-3 pt-2">
            <Button
              variant="filled"
              onClick={submit}
              disabled={submitting || name.trim().length < 2 || emails.trim().length < 5}
            >
              {submitting ? "Lege an …" : "Circle starten"}
            </Button>
            <Link href="/circles" className="text-body-md text-on-surface-muted underline">
              Abbrechen
            </Link>
          </div>
        </CardBody>
      </Card>

      <Card variant="outlined">
        <CardBody>
          <p className="font-serif text-title-md text-on-surface mb-2">
            Warum 3–5 Personen?
          </p>
          <p className="text-body-md">
            Mit drei seid ihr robust gegen einen Ausfall. Mit vier passt das 30-Min-Protokoll
            (3 Min Opening · 4 × 75 Sek Check-in · 15 Min Focus-Person · 4 × 75 Sek Commitment ·
            2 Min Schluss). Bei fünf wird die Sprechzeit knapp, bei zwei kippt das Format in
            ein 1:1.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
