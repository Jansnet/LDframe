import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "filled" | "tonal" | "outlined" | "text";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  filled: "bg-primary text-surface hover:shadow-elev-2",
  tonal: "bg-primary-container text-primary-on-container",
  outlined: "border border-outline text-on-surface bg-transparent",
  text: "text-primary bg-transparent",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-label-sm",
  md: "h-11 px-6 text-label-lg",
  lg: "h-12 px-7 text-title-md",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "filled", size = "md", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "state-layer inline-flex items-center justify-center gap-2 rounded-full font-medium transition-shadow duration-150 ease-emphasized disabled:opacity-40 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
