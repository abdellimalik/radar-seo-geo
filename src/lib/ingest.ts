import Parser from "rss-parser";
import { supabaseService } from "./supabase";
import { enrichArticle } from "./enrich";

const parser = new Parser({
  headers: { "User-Agent": "Mozilla/5.0 (compatible; LeRadarBot/0.1)" },
});

function cleanTitle(title: string): string {
  return title.replace(/\s+via\s+@\S+(,\s*@\S+)*\s*$/i, "").trim();
}

export interface CollectResult {
  sourcesChecked: number;
  articlesFound: number;
  articlesEnriched: number;
  errors: string[];
}

export async function collectAndEnrich(): Promise<CollectResult> {
  const supabase = supabaseService();
  const errors: string[] = [];

  const { data: run } = await supabase
    .from("digest_runs")
    .insert({ status: "running" })
    .select()
    .single();

  const { data: sources } = await supabase
    .from("sources")
    .select("*")
    .eq("is_active", true);

  let articlesFound = 0;
  let articlesEnriched = 0;

  for (const source of sources ?? []) {
    try {
      const feed = await parser.parseURL(source.feed_url);

      for (const item of feed.items.slice(0, 15)) {
        const url = item.link ?? item.guid;
        if (!url) continue;

        const { data: inserted } = await supabase
          .from("articles")
          .upsert(
            {
              source_id: source.id,
              guid: item.guid ?? url,
              url,
              title: cleanTitle(item.title ?? ""),
              original_excerpt: (item.contentSnippet ?? item.summary ?? "")
                .replace(/\s+/g, " ")
                .trim()
                .slice(0, 600),
              author: item.creator ?? item.author ?? null,
              published_at: item.isoDate ?? item.pubDate ?? new Date().toISOString(),
            },
            { onConflict: "url", ignoreDuplicates: true }
          )
          .select()
          .maybeSingle();

        if (!inserted) continue;
        articlesFound += 1;

        try {
          const enrichment = await enrichArticle({
            title: inserted.title,
            excerpt: inserted.original_excerpt,
          });
          await supabase
            .from("articles")
            .update({
              summary_fr: enrichment.summary_fr,
              themes: enrichment.themes,
              impact_level: enrichment.impact_level,
              impact_reason: enrichment.impact_reason,
              enriched_at: new Date().toISOString(),
            })
            .eq("id", inserted.id);
          articlesEnriched += 1;
        } catch (enrichErr) {
          errors.push(`enrich ${source.slug}: ${(enrichErr as Error).message}`);
        }
      }
    } catch (err) {
      errors.push(`fetch ${source.slug}: ${(err as Error).message}`);
    }
  }

  await supabase
    .from("digest_runs")
    .update({
      finished_at: new Date().toISOString(),
      sources_checked: sources?.length ?? 0,
      articles_found: articlesFound,
      articles_enriched: articlesEnriched,
      status: errors.length === 0 ? "success" : "partial",
      error: errors.length ? errors.join("; ").slice(0, 2000) : null,
    })
    .eq("id", run?.id);

  return {
    sourcesChecked: sources?.length ?? 0,
    articlesFound,
    articlesEnriched,
    errors,
  };
}
