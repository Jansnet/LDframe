"use client";

import { useState } from "react";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";

/**
 * /login — request a magic link.
 *
 * Post-submit state shows the calm "check your inbox" copy. In dev mode
 * the server includes the link directly so single-tenant pilots stay
 * clickable; the UI surfaces it as a "Direkt anmelden" button.
 */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [devLink, setDevLink] = useState<string | null>(null);
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
      const data = await res.json();
      setSent(true);
      if (data.devLink) setDevLink(data.devLink);
    } catch {
      setError("Netzwerkfehler.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="space-y-6 max-w-md">
        <header>
          <Chip tone="primary">Mail unterwegs</Chip>
          <h1 className="font-serif text-display-md text-on-surface mt-2">
            Check deine Inbox.
          </h1>
          <p className="text-body-lg text-on-surface-muted mt-3">
            Wir haben einen Link an <strong>{email}</strong> geschickt. Der Link ist 15 Minuten
            gültig und kann nur einmal benutzt werden.
          </p>
        </header>
        {devLink && (
          <Card variant="outlined" className="border-l-4 border-rust-600">
            <CardTitle>Dev-Modus</CardTitle>
            <CardBody>
              <p className="mb-3">
                Keine Mail-Konfiguration aktiv — du kannst direkt verifizieren.
              </p>
              <a href={devLink}>
                <Button variant="filled">Direkt anmelden</Button>
              </a>
            </CardBody>
          </Card>
        )}
        <Card variant="filled">
          <CardTitle>Keine Mail bekommen?</CardTitle>
          <CardBody>
            <p>
              Spam-Ordner prüfen. Wenn nach 5 Minuten nichts da ist, fordere einen neuen Link an.
            </p>
            <Button variant="tonal" className="mt-3" onClick={() => setSent(false)}>
              Erneut anfordern
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  const canSubmit = email.includes("@") && !submitting;

  return (
    <div className="space-y-8 max-w-md">
      <header className="space-y-3">
        <Chip tone="primary">Sign-in</Chip>
        <h1 className="font-serif text-display-md text-on-surface">Hallo.</h1>
        <p className="text-body-lg text-on-surface-muted">
          Wir schicken dir einen einmaligen Link per Mail. Kein Passwort, keine
          Drittanbieter, kein Tracking.
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
          {submitting ? "Schicke Link …" : "Magic-Link anfordern"}
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
