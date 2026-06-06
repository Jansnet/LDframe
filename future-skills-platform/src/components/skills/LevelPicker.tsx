"use client";

import { useState } from "react";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import type { LevelAnchor } from "@/content/schema";
import { t } from "@/lib/i18n";

/**
 * 4-level self-positioning picker.
 *
 * Two modes:
 *   1. With anchors — renders skill-specific "Beobachtbar / Innerer Marker"
 *      tables per level. The recognition material the user should see.
 *   2. Without anchors — falls back to generic level descriptions during the
 *      rollout window while skills are still being authored with anchors.
 */
interface Props {
  skillSlug: string;
  initialLevel?: number;
  initialRationale?: string;
  anchors?: LevelAnchor[];
}

interface GenericLevel {
  level: number;
  label: string;
  desc: string;
}

const GENERIC_LEVELS: GenericLevel[] = [
  {
    level: 1,
    label: "Hab mal davon gehört",
    desc: "Du erkennst den Begriff, kannst aber nicht sicher sagen, was er konkret im Arbeitsalltag heißt.",
  },
  {
    level: 2,
    label: "Kann es grundsätzlich",
    desc: "Du kannst den Skill in entspannten Situationen anwenden, fällst aber unter Druck zurück in alte Muster.",
  },
  {
    level: 3,
    label: "Wende es regelmäßig an",
    desc: "Der Skill ist in deinem Repertoire — auch unter Stress, im Konflikt, im Meeting mit Senior-Stakeholdern.",
  },
  {
    level: 4,
    label: "Kann es anderen beibringen",
    desc: "Du erkennst, wenn andere am Skill scheitern, kannst es benennen ohne zu beschämen, und führst andere weiter.",
  },
];

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

  const hasAnchors = anchors && anchors.length === 4;

  return (
    <div className="space-y-5">
      {hasAnchors ? (
        <div className="space-y-3">
          {anchors!.map((a) => {
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
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {GENERIC_LEVELS.map((lvl) => {
            const isSelected = selected === lvl.level;
            return (
              <Card
                key={lvl.level}
                variant={isSelected ? "filled" : "outlined"}
                interactive
                className={`cursor-pointer ${isSelected ? "border-l-4 border-primary" : ""}`}
                onClick={() => commit(lvl.level)}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-mono text-label-sm text-primary">L{lvl.level}</span>
                  <Chip tone={isSelected ? "primary" : "neutral"}>
                    {isSelected ? "Aktuelle Position" : "Selbsteinordnung"}
                  </Chip>
                </div>
                <CardTitle className="mb-1">{lvl.label}</CardTitle>
                <CardBody>
                  <p>{lvl.desc}</p>
                </CardBody>
              </Card>
            );
          })}
        </div>
      )}

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
