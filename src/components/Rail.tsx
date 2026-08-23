import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { themeLabel, themeVars } from "@/lib/themes";
import { buildHref } from "@/lib/filters";
import type { Source } from "@/lib/types";

export function TrendingRail({
  trending,
  activeSource,
}: {
  trending: { theme: string; count: number }[];
  activeSource?: string;
}) {
  const max = Math.max(1, ...trending.map((t) => t.count));

  return (
    <section aria-labelledby="trending-heading" className="pb-8">
      <h2
        id="trending-heading"
        className="flex items-center gap-1.5 font-display text-sm font-bold uppercase tracking-wide text-ink-muted"
      >
        <TrendingUp className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
        Tendances de la semaine
      </h2>
      <ul className="mt-3 space-y-1">
        {trending.length === 0 && (
          <li className="text-sm text-ink-faint">Pas encore assez de données.</li>
        )}
        {trending.map(({ theme, count }) => {
          const { fg } = themeVars(theme);
          const width = Math.round((count / max) * 100);
          return (
            <li key={theme}>
              <Link
                href={buildHref({ source: activeSource }, { theme })}
                className="relative block overflow-hidden rounded-md px-2.5 py-2 text-sm"
              >
                <span
                  className="absolute inset-y-0 left-0 opacity-[0.16]"
                  style={{ width: `${width}%`, backgroundColor: fg }}
                  aria-hidden
                />
                <span className="relative flex items-center justify-between gap-2">
                  <span className="font-medium" style={{ color: fg }}>
                    {themeLabel(theme)}
                  </span>
                  <span className="tabular font-mono text-[0.8125rem] text-ink-faint">
                    {count}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function SourceRail({
  sources,
  activeSource,
  activeTheme,
}: {
  sources: (Source & { count: number })[];
  activeSource?: string;
  activeTheme?: string;
}) {
  return (
    <section aria-labelledby="sources-heading" className="border-t border-line pt-6">
      <h2
        id="sources-heading"
        className="font-display text-sm font-bold uppercase tracking-wide text-ink-muted"
      >
        Sources suivies
      </h2>
      <ul className="mt-3 space-y-0.5">
        <li>
          <Link
            href={buildHref({ theme: activeTheme }, { source: undefined })}
            className={
              "block rounded-md px-2.5 py-1.5 text-sm " +
              (!activeSource
                ? "bg-bg-sunken font-semibold text-ink"
                : "text-ink-muted hover:text-ink")
            }
          >
            Toutes les sources
          </Link>
        </li>
        {sources.map((s) => (
          <li key={s.id}>
            <Link
              href={buildHref({ theme: activeTheme }, { source: s.slug })}
              className={
                "flex items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-sm " +
                (activeSource === s.slug
                  ? "bg-bg-sunken font-semibold text-ink"
                  : "text-ink-muted hover:text-ink")
              }
            >
              <span>{s.name}</span>
              <span className="tabular font-mono text-[0.8125rem] text-ink-faint">
                {s.count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
