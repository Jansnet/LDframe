"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import type { LevelAnchor } from "@/content/schema";
import { t } from "@/lib/i18n";

/**
 * 4-level self-positioning picker.
 *
 * Renders the skill's L1–L4 anchors (one observable line + one inner-marker
 * line per level) as clickable cards. The selected level is persisted via
 * /api/skill-level. The skill page only renders this when the skill has
 * exactly four anchors; there is no generic fallback here by design — every
 * authored skill (stub or published) must ship with anchors.
 */
interface Props {
  skillSlug: string;
  initialLevel?: number;
  initialRationale?: string;
  anchors: LevelAnchor[];     // exactly 4, validated by the schema
}

const LEVEL_HEADLINE: Record<number, string> = {
  1: "Wahrnehmen — ich bemerke es nachher",
  2: "Anwenden im Schonraum",
  3: "Verhalten unter Druck",
  4: "Weitergeben ohne Predigt",
};

export function LevelPicker({ skillSlug, initialLevel, initialRationale, anchors }: Props) {
  const [selected, setSelected] = useState<number | undefined>(initialLevel);
  const [rationale, setRationale] = useState(initialRationale ?? "");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function commit(level: number) {
    const prev = selected;
    setSelected(level);
    setStatus("saving");
    setError(null);
    try {
      const res = await fetch("/api/skill-level", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skillSlug,
          level,
          rationale: rationale.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? "Konnte nicht gespeichert werden.");
        setSelected(prev);
        setStatus("error");
        return;
      }
      setStatus("saved");
    } catch {
      setError("Netzwerkfehler.");
      setSelected(prev);
      setStatus("error");
    }
  }

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        {anchors.map((a) => {
          const levelNum = parseInt(a.level.slice(1), 10);
          const isSelected = selected === levelNum;
          return (
            <Card
              key={a.level}
              variant={isSelected ? "filled" : "outlined"}
              interactive
              className={`cursor-pointer ${isSelected ? "border-l-4 border-primary" : ""}`}
              onClick={() => commit(levelNum)}
            >
              <div className="flex items-baseline justify-between mb-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-label-md text-primary">{a.level}</span>
                  <span className="font-serif text-title-md text-on-surface">
                    {LEVEL_HEADLINE[levelNum]}
                  </span>
                </div>
                <Chip tone={isSelected ? "primary" : "neutral"}>
                  {isSelected ? "Hier bin ich" : "Da bin ich"}
                </Chip>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-body-md">
                <div>
                  <p className="font-mono text-label-sm text-on-surface-muted uppercase mb-1.5">
                    Beobachtbar von außen
                  </p>
                  <p className="text-on-surface">{t(a.observable)}</p>
                </div>
                <div>
                  <p className="font-mono text-label-sm text-on-surface-muted uppercase mb-1.5">
                    Innerer Marker
                  </p>
                  <p className="text-on-surface">{t(a.innerMarker)}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {selected != null && (
        <Card variant="outlined">
          <label className="block">
            <span className="block text-label-md text-on-surface mb-1">
              Optional: warum diese Stufe (1 Satz)
            </span>
            <input
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              placeholder="z.B. „in 1:1-Gesprächen sicher, in Steering-Meetings nicht.“"
              className="w-full rounded-sm border border-outline-variant bg-surface p-3 text-body-md focus:outline-none focus:border-primary"
            />
          </label>
          <Button
            variant="text"
            size="sm"
            onClick={() => commit(selected)}
            disabled={status === "saving"}
            className="mt-3"
          >
            Begründung speichern
          </Button>
        </Card>
      )}

      <div className="text-body-md min-h-[1.5em]">
        {status === "saving" && <span className="text-on-surface-muted">Speichere …</span>}
        {status === "saved" && (
          <span className="text-primary">
            Gespeichert. Du kannst dich jederzeit umpositionieren.
          </span>
        )}
        {status === "error" && error && <span className="text-rust-700">{error}</span>}
      </div>
    </div>
  );
}
