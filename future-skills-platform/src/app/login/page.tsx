"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";

/**
 * /login — minimal email-only sign-in.
 *
 * For the pilot phase. Production deployments would replace this with a
 * magic-link verification step or SSO redirect — the cookie shape stays
 * the same, so /api/auth/login is the only thing that changes.
 */
export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), name: name.trim() || undefined }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? "Login fehlgeschlagen.");
        return;
      }
      const next = params.get("next") ?? "/start";
      router.push(next);
    } catch {
      setError("Netzwerkfehler.");
    } finally {
      setSubmitting(false);
    }
  }

  const canSubmit = email.includes("@") && !submitting;

  return (
    <div className="space-y-8 max-w-md">
      <header className="space-y-3">
        <Chip tone="primary">Sign-in</Chip>
        <h1 className="font-serif text-display-md text-on-surface">Hallo.</h1>
        <p className="text-body-lg text-on-surface-muted">
          Wir merken uns deine Reflexionen, Artefakte und Zyklen unter deiner Email — sonst
          nichts. Kein Tracking, keine Drittanbieter.
        </p>
      </header>

      <Card variant="outlined" className="space-y-4">
        <label className="block">
          <span className="block text-label-md text-on-surface mb-1">E-Mail</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="lena@firma.de"
            className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md focus:outline-none focus:border-primary"
          />
        </label>
        <label className="block">
          <span className="block text-label-md text-on-surface mb-1">
            Vorname (optional)
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Lena"
            className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md focus:outline-none focus:border-primary"
          />
        </label>
        {error && <p className="text-body-md text-rust-700">{error}</p>}
        <Button onClick={submit} disabled={!canSubmit} variant="filled" className="w-full">
          {submitting ? "Melde an …" : "Anmelden"}
        </Button>
      </Card>

      <Card variant="filled">
        <CardTitle>Was bekommt deine Firma davon?</CardTitle>
        <CardBody>
          <p>
            Pro Person und Skill gibt es Artefakte, ein Identity Statement, drei
            Situationen Behavior Evidence. Auf Organisationsebene aggregiert: was
            wird tatsächlich gelernt, woran zeigt es sich. Nie Vergleich zwischen
            Personen, nie Punktzahlen.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
