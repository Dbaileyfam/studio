import type { ServiceSlug } from "@/lib/services";
import { getServicePath } from "@/lib/services";

/** Old paths (hash-era and short slugs) → current SEO paths. */
export const LEGACY_PATH_REDIRECTS: Record<string, ServiceSlug> = {
  recording: "recording-studio-sandy-utah",
  "mixing-mastering": "mixing-mastering-services",
  websites: "websites-for-musicians",
  epk: "epk-design-for-musicians",
  "graphic-design": "graphic-design-for-bands",
  "drum-lessons": "drum-lessons-sandy-utah",
};

export const legacyRedirectTarget = (segment: string): string | null => {
  const slug = LEGACY_PATH_REDIRECTS[segment];
  return slug ? getServicePath(slug) : null;
};
