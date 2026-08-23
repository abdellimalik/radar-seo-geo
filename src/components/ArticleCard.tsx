import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/lib/types";
import { formatPublished } from "@/lib/format";
import { TagPill } from "./TagPill";
import { ImpactBadge } from "./ImpactBadge";

const ICON_STROKE = 1.75;

function Byline({ article }: { article: Article }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2">
      <span className="text-sm font-medium text-ink-muted">
        {article.source?.name ?? "Source inconnue"}
      </span>
      <span className="text-ink-faint" aria-hidden>
        &middot;
      </span>
      <time
        dateTime={article.published_at}
        className="tabular text-sm text-ink-faint"
      >
        {formatPublished(article.published_at)}
      </time>
      {article.impact_level === "majeur" && <ImpactBadge />}
      {article.themes.map((theme) => (
        <TagPill key={theme} theme={theme} />
      ))}
    </div>
  );
}

export function ArticleCard({
  article,
  variant = "compact",
  index = 0,
}: {
  article: Article;
  variant?: "lead" | "compact";
  index?: number;
}) {
  const isLead = variant === "lead";
  const title = article.title_fr ?? article.title;

  return (
    <article
      className="rise-in ring-trigger group"
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
    >
      <a
        href={article.url}
        target="_blank"
        rel="noreferrer noopener"
        className={
          "gradient-ring block rounded-xl border border-line bg-bg-raised p-5 shadow-[0_1px_2px_rgba(0,0,0,0.3),0_16px_40px_-20px_rgba(52,13,164,0.55)] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(0,0,0,0.3),0_24px_56px_-20px_rgba(52,13,164,0.7)] sm:p-6" +
          (isLead ? " ring-static" : "")
        }
      >
        <h2
          className={
            isLead
              ? "font-display text-3xl font-bold leading-[1.08] sm:text-4xl"
              : "font-display text-xl font-bold leading-tight"
          }
        >
          <span className="underline decoration-1 decoration-transparent underline-offset-4 transition-colors duration-200 group-hover:decoration-current">
            {title}
          </span>
          <ArrowUpRight
            className="ml-1 inline h-[0.85em] w-[0.85em] -translate-y-0.5 text-brand-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            strokeWidth={ICON_STROKE}
            aria-hidden
          />
        </h2>

        {article.summary_fr ? (
          <p
            className={
              isLead
                ? "mt-3 max-w-[65ch] text-base text-ink-muted"
                : "mt-2 max-w-[65ch] text-sm text-ink-muted"
            }
          >
            {article.summary_fr}
          </p>
        ) : article.original_excerpt ? (
          <p className="mt-2 max-w-[65ch] text-sm italic text-ink-faint">
            {article.original_excerpt}
          </p>
        ) : null}

        <Byline article={article} />
      </a>
    </article>
  );
}
