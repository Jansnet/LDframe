"use client";

import { cn } from "@/lib/utils";

export type Phase = "foundation" | "exploration" | "application" | "integration";

const labels: Record<Phase, { de: string; en: string }> = {
  foundation: { de: "Foundation", en: "Foundation" },
  exploration: { de: "Exploration", en: "Exploration" },
  application: { de: "Application", en: "Application" },
  integration: { de: "Integration", en: "Integration" },
};

const order: Phase[] = ["foundation", "exploration", "application", "integration"];

interface Props {
  current: Phase;
  locale?: "de" | "en";
  onSelect?: (phase: Phase) => void;
}

export function PhaseStepper({ current, locale = "de", onSelect }: Props) {
  const idx = order.indexOf(current);
  return (
    <ol className="flex items-center gap-0 w-full">
      {order.map((phase, i) => {
        const active = i === idx;
        const past = i < idx;
        return (
          <li key={phase} className="flex-1 flex items-center">
            <button
              onClick={() => onSelect?.(phase)}
              disabled={!onSelect}
              className={cn(
                "state-layer flex flex-col items-start gap-1 rounded-sm p-2 w-full text-left",
                active && "bg-primary-container",
              )}
            >
              <span
                className={cn(
                  "text-label-sm font-mono tracking-wide",
                  active ? "text-primary-on-container" : past ? "text-clay-700" : "text-on-surface-muted",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "font-serif text-title-md",
                  active ? "text-primary-on-container" : "text-on-surface",
                )}
              >
                {labels[phase][locale]}
              </span>
              <span
                aria-hidden
                className={cn(
                  "h-0.5 w-full mt-1 rounded-full",
                  past || active ? "bg-primary" : "bg-outline-variant",
                )}
              />
            </button>
          </li>
        );
      })}
    </ol>
  );
}
