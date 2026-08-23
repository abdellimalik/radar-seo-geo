import { supabasePublic } from "@/lib/supabase";
import type { Article, Source } from "@/lib/types";
import { Masthead } from "@/components/Masthead";
import { FilterBar } from "@/components/FilterBar";
import { TrendingRail, SourceRail } from "@/components/Rail";
import { ArticleCard } from "@/components/ArticleCard";
import { EmptyState } from "@/components/EmptyState";
import { SiteFooter } from "@/components/SiteFooter";

export const revalidate = 900;

type SearchParams = { theme?: string; source?: string };

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { theme: activeTheme, source: activeSource } = await searchParams;
  const supabase = supabasePublic();

  const [{ data: sources }, { data: articlesRaw }, { data: lastRun }] =
    await Promise.all([
      supabase.from("sources").select("*").eq("is_active", true).order("name"),
      supabase
        .from("articles")
        .select("*, source:sources(*)")
        .order("published_at", { ascending: false })
        .limit(200),
      supabase
        .from("digest_runs")
        .select("started_at, finished_at, status")
        .order("started_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);

  const articles = (articlesRaw ?? []) as unknown as Article[];
  const allSources = (sources ?? []) as Source[];

  // eslint-disable-next-line react-hooks/purity -- server component, needs the real current time to window "last 7 days"
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const trendingCounts = new Map<string, number>();
  for (const a of articles) {
    if (new Date(a.published_at).getTime() < sevenDaysAgo) continue;
    for (const t of a.themes) {
      trendingCounts.set(t, (trendingCounts.get(t) ?? 0) + 1);
    }
  }
  const trending = [...trendingCounts.entries()]
    .map(([theme, count]) => ({ theme, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const themeFiltered = activeTheme
    ? articles.filter((a) => a.themes.includes(activeTheme))
    : articles;

  const sourceCounts = new Map<string, number>();
  for (const a of themeFiltered) {
    sourceCounts.set(a.source_id, (sourceCounts.get(a.source_id) ?? 0) + 1);
  }
  const sourcesWithCounts = allSources.map((s) => ({
    ...s,
    count: sourceCounts.get(s.id) ?? 0,
  }));

  const visible = activeSource
    ? themeFiltered.filter((a) => a.source?.slug === activeSource)
    : themeFiltered;

  const lead = visible.find((a) => a.impact_level === "majeur") ?? visible[0];
  const rest = visible.filter((a) => a.id !== lead?.id);

  return (
    <>
      <Masthead
        sourceCount={allSources.length}
        lastRunAt={lastRun?.started_at ?? null}
      />
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6">
        <FilterBar activeTheme={activeTheme} activeSource={activeSource} />
        <div className="grid grid-cols-1 gap-10 py-8 lg:grid-cols-[1fr_280px]">
          <main className="min-w-0 space-y-6">
            {!lead ? (
              <EmptyState />
            ) : (
              <>
                <ArticleCard article={lead} variant="lead" index={0} />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {rest.map((a, i) => (
                    <ArticleCard key={a.id} article={a} index={i + 1} />
                  ))}
                </div>
              </>
            )}
          </main>
          <aside className="lg:pl-2">
            <TrendingRail trending={trending} activeSource={activeSource} />
            <SourceRail
              sources={sourcesWithCounts}
              activeSource={activeSource}
              activeTheme={activeTheme}
            />
          </aside>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
