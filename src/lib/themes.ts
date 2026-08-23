import type { ThemeSlug } from "./types";

export const THEMES: { slug: ThemeSlug; label: string; var: string }[] = [
  { slug: "core-update", label: "Core Update", var: "update" },
  { slug: "ia-geo", label: "IA & GEO", var: "geo" },
  { slug: "netlinking", label: "Netlinking", var: "links" },
  { slug: "technique", label: "Technique", var: "technique" },
  { slug: "contenu", label: "Contenu", var: "content" },
  { slug: "local-seo", label: "Local SEO", var: "local" },
];

const byslug = new Map(THEMES.map((t) => [t.slug, t]));

export function themeLabel(slug: string): string {
  return byslug.get(slug as ThemeSlug)?.label ?? slug;
}

export function themeVars(slug: string): { fg: string; bg: string } {
  const key = byslug.get(slug as ThemeSlug)?.var ?? "update";
  return { fg: `var(--tag-${key})`, bg: `var(--tag-${key}-tint)` };
}
