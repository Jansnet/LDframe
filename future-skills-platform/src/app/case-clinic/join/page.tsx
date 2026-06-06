"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";

/**
 * /case-clinic/join — peer entry point.
 *
 * Either ?code=ABC123XY in the URL (direct link from chat/email) or
 * manually entered. On success, redirect into /case-clinic/live/[id]
 * with consultant role.
 */
export default function JoinCaseClinicPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [code, setCode] = useState(params.get("code") ?? "");
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function join(joinCode: string) {
    setJoining(true);
    setError(null);
    try {
      const res = await fetch("/api/case-clinic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "join", joinCode }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const msg: Record<string, string> = {
          not_found: "Diesen Code gibt es nicht.",
          ended: "Diese Runde ist schon beendet.",
          full: "Die Runde ist voll.",
        };
        setError(msg[body.error] ?? "Beitritt fehlgeschlagen.");
        return;
      }
      const data = await res.json();
      if (data.clinic?.id) {
        router.push(`/case-clinic/live/${data.clinic.id}`);
      }
    } finally {
      setJoining(false);
    }
  }

  // Auto-join if a code came via URL.
  useEffect(() => {
    const c = params.get("code");
    if (c && c.length >= 4) join(c);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-8 max-w-md">
      <header>
        <Chip tone="clay">Beitreten</Chip>
        <h1 className="font-serif text-display-md text-on-surface mt-2">
          Fall-Runde beitreten
        </h1>
        <p className="text-body-lg text-on-surface-muted mt-3">
          Gib den Code ein, den du von der einladenden Person bekommen hast.
        </p>
      </header>

      <Card variant="outlined">
        <label className="block">
          <span className="font-mono text-label-sm text-primary">JOIN-CODE</span>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z2-9]/g, ""))}
            placeholder="ABC23XYZ"
            maxLength={8}
            className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-display-sm font-mono mt-1 tracking-widest text-center"
          />
        </label>
        {error && <p className="text-body-md text-rust-700 mt-3">{error}</p>}
        <Button
          onClick={() => join(code)}
          disabled={code.length < 4 || joining}
          variant="filled"
          className="mt-4 w-full"
        >
          {joining ? "Trete bei …" : "Beitreten"}
        </Button>
      </Card>
    </div>
  );
}
