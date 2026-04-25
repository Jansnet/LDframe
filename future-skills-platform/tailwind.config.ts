import type { Config } from "tailwindcss";

/**
 * Design system: "Anthropic × Material" fusion.
 *
 * Anthropic: warm neutral palette (cream / clay / rust), serif display face,
 * generous whitespace, literary feel.
 * Material: token-driven surfaces (surface / surface-container / on-surface),
 * five-step elevation, state layers on interactive components, 12px corner radii.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Anthropic-inspired core palette
        cream: {
          50: "#FBF8F3",
          100: "#F5F0E8",
          200: "#EDE4D3",
          300: "#E0D1B4",
        },
        clay: {
          100: "#E8D7C3",
          300: "#C9A689",
          500: "#A67A58",
          700: "#6B4A30",
        },
        rust: {
          300: "#E09A7F",
          500: "#CC785C",
          600: "#B8603F",
          700: "#8F4328",
        },
        slate: {
          700: "#3D3B36",
          800: "#262521",
          900: "#1A1917",
        },
        // Material semantic surfaces (mapped onto the warm palette)
        surface: {
          DEFAULT: "#FBF8F3",
          container: "#F5F0E8",
          "container-high": "#EDE4D3",
          inverse: "#262521",
        },
        "on-surface": {
          DEFAULT: "#262521",
          muted: "#6B4A30",
          inverse: "#F5F0E8",
        },
        primary: {
          DEFAULT: "#CC785C",
          container: "#F5E1D7",
          "on-container": "#4A1F10",
        },
        outline: {
          DEFAULT: "#C9A689",
          variant: "#E0D1B4",
        },
      },
      fontFamily: {
        sans: ["'Inter'", "system-ui", "sans-serif"],
        serif: ["'Source Serif 4'", "'Tiempos'", "Georgia", "serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Material type scale, retuned for serif display
        "display-lg": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["2.75rem", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "headline-lg": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "headline-md": ["1.5rem", { lineHeight: "1.25" }],
        "title-lg": ["1.25rem", { lineHeight: "1.3" }],
        "title-md": ["1.0625rem", { lineHeight: "1.35" }],
        "body-lg": ["1.0625rem", { lineHeight: "1.6" }],
        "body-md": ["0.9375rem", { lineHeight: "1.55" }],
        "label-lg": ["0.875rem", { lineHeight: "1.4", letterSpacing: "0.01em" }],
        "label-sm": ["0.75rem", { lineHeight: "1.3", letterSpacing: "0.02em" }],
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        DEFAULT: "12px",
        lg: "16px",
        xl: "24px",
        full: "9999px",
      },
      // Material 5-step elevation, softened for warm surfaces
      boxShadow: {
        "elev-1": "0 1px 2px rgba(38,37,33,0.06), 0 1px 3px rgba(38,37,33,0.04)",
        "elev-2": "0 2px 4px rgba(38,37,33,0.08), 0 2px 6px rgba(38,37,33,0.04)",
        "elev-3": "0 4px 8px rgba(38,37,33,0.08), 0 6px 12px rgba(38,37,33,0.06)",
        "elev-4": "0 8px 16px rgba(38,37,33,0.10), 0 12px 24px rgba(38,37,33,0.08)",
        "elev-5": "0 16px 32px rgba(38,37,33,0.12), 0 24px 48px rgba(38,37,33,0.10)",
        "focus-ring": "0 0 0 3px rgba(204,120,92,0.35)",
      },
      transitionTimingFunction: {
        // Material standard easings
        emphasized: "cubic-bezier(0.2, 0, 0, 1)",
        "emphasized-decel": "cubic-bezier(0.05, 0.7, 0.1, 1)",
        "emphasized-accel": "cubic-bezier(0.3, 0, 0.8, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
