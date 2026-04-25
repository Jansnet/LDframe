import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "primary" | "clay" | "rust";

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  selected?: boolean;
}

const tones: Record<Tone, string> = {
  neutral: "bg-surface-container text-on-surface border-outline-variant",
  primary: "bg-primary-container text-primary-on-container border-primary/30",
  clay: "bg-clay-100 text-clay-700 border-clay-300/60",
  rust: "bg-rust-300/20 text-rust-700 border-rust-300/60",
};

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  ({ tone = "neutral", selected, className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-label-sm font-medium whitespace-nowrap",
        tones[tone],
        selected && "ring-2 ring-primary/40",
        className,
      )}
      {...props}
    />
  ),
);
Chip.displayName = "Chip";
