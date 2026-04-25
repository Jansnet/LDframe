import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "elevated" | "filled" | "outlined";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  interactive?: boolean;
}

const variants: Record<Variant, string> = {
  elevated: "bg-surface shadow-elev-1 hover:shadow-elev-2",
  filled: "bg-surface-container",
  outlined: "bg-surface border border-outline-variant",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "filled", interactive = false, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg p-6 transition-shadow duration-150 ease-emphasized",
        variants[variant],
        interactive && "state-layer cursor-pointer",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("font-serif text-title-lg text-on-surface mb-2", className)} {...props} />;
}

export function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-body-md text-on-surface-muted", className)} {...props} />;
}
