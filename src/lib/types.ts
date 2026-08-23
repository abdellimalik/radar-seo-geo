export type ImpactLevel = "majeur" | "mineur";

export type ThemeSlug =
  | "core-update"
  | "ia-geo"
  | "netlinking"
  | "technique"
  | "contenu"
  | "local-seo";

export interface Source {
  id: string;
  slug: string;
  name: string;
  site_url: string;
  feed_url: string;
  language: "fr" | "en";
  is_active: boolean;
}

export interface Article {
  id: string;
  source_id: string;
  guid: string | null;
  url: string;
  title: string;
  original_excerpt: string | null;
  author: string | null;
  published_at: string;
  fetched_at: string;
  summary_fr: string | null;
  themes: string[];
  impact_level: ImpactLevel;
  impact_reason: string | null;
  enriched_at: string | null;
  source?: Source;
}
