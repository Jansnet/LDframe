import type { LocalizedString } from "@/content/schema";

export type Locale = "de" | "en";

export const DEFAULT_LOCALE: Locale = "de";

export const SUPPORTED_LOCALES: Locale[] = (
  process.env.SUPPORTED_LOCALES?.split(",").filter(Boolean) as Locale[]
) ?? ["de", "en"];

/**
 * Resolve a LocalizedString to the requested locale, falling back to the
 * authoring language (de). The platform is authored DE-first, so EN may be
 * missing on some fields — graceful fallback keeps the UI working.
 */
export function t(value: LocalizedString | undefined, locale: Locale = DEFAULT_LOCALE): string {
  if (!value) return "";
  return value[locale] ?? value.de ?? "";
}
