import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xs px-1.5 py-0.5 text-label-sm font-mono uppercase tracking-wide bg-slate-800 text-cream-100",
        className,
      )}
      {...props}
    />
  );
}
