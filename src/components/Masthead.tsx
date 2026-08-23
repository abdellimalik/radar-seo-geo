import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { formatPublished } from "@/lib/format";

export function Masthead({
  sourceCount,
  lastRunAt,
}: {
  sourceCount: number;
  lastRunAt: string | null;
}) {
  const today = format(new Date(), "EEEE d MMMM yyyy", { locale: fr });

  return (
    <header className="border-b border-line-strong bg-paper-raised">
      <div className="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-4 pt-6 sm:px-6">
        <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Le Radar
        </h1>
        <p className="pb-1 text-sm capitalize text-ink-muted">{today}</p>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-1 px-4 pb-4 pt-2 text-xs text-ink-faint sm:px-6">
        <span>Veille SEO &amp; GEO, résumée et hiérarchisée par IA</span>
        <span aria-hidden>&middot;</span>
        <span className="tabular">{sourceCount} sources suivies</span>
        {lastRunAt && (
          <>
            <span aria-hidden>&middot;</span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "var(--tag-local)" }}
                aria-hidden
              />
              Dernière collecte {formatPublished(lastRunAt)}
            </span>
          </>
        )}
      </div>
    </header>
  );
}
