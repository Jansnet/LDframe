"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";

/**
 * /verify?token=... — magic-link landing page.
 *
 * Auto-consumes the token via POST so prefetchers can't burn it. Redirects
 * to /plan on success or shows a useful error on failure.
 */
export default function VerifyPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "error">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      setStatus("error");
      setError("Kein Token im Link.");
      return;
    }
    (async () => {
      try {
        const res = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          const messages: Record<string, string> = {
            invalid_or_expired: "Der Link ist abgelaufen oder ungültig. Fordere einen neuen an.",
            already_used: "Dieser Link wurde schon benutzt. Fordere einen neuen an.",
            user_not_found: "Wir finden dein Konto nicht. Melde dich neu an.",
          };
          setError(messages[body.error] ?? "Verifizierung fehlgeschlagen.");
          setStatus("error");
          return;
        }
        const data = await res.json();
        router.push(data.role === "admin" ? "/admin/org" : "/plan");
      } catch {
        setError("Netzwerkfehler.");
        setStatus("error");
      }
    })();
  }, [params, router]);

  return (
    <div className="space-y-6 max-w-md">
      <header>
        <Chip tone="primary">Magic-Link</Chip>
        <h1 className="font-serif text-display-md text-on-surface mt-2">
          {status === "loading" ? "Bestätige …" : "Hat nicht geklappt."}
        </h1>
      </header>

      <Card variant="outlined">
        <CardTitle>{status === "loading" ? "Einen Moment" : "Was tun?"}</CardTitle>
        <CardBody>
          {status === "loading" ? (
            <p>Wir überprüfen den Link. Du wirst gleich weitergeleitet.</p>
          ) : (
            <p>
              {error}{" "}
              <a href="/login" className="text-primary underline">
                Zurück zur Anmeldung
              </a>
              .
            </p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
