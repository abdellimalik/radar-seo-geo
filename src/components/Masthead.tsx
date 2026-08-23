import Link from "next/link";
import { Radar } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { formatPublished } from "@/lib/format";

export function Masthead({
  sourceCount,
  lastRunAt,
}: {
  sourceCount?: number;
  lastRunAt?: string | null;
}) {
  const today = format(new Date(), "EEEE d MMMM yyyy", { locale: fr });

  return (
    <header className="border-b border-line bg-bg-raised/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 pt-6 sm:px-6">
        <div className="flex items-center gap-3">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white shadow-[0_0_20px_-4px_rgba(107,10,184,0.7)]"
            style={{ background: "var(--gradient-brand)" }}
            aria-hidden
          >
            <Radar className="h-5 w-5" strokeWidth={2} />
          </span>
          <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            Radar S&amp;GEO
          </h1>
        </div>
        <nav className="flex items-center gap-5 text-sm font-medium text-ink-muted">
          <Link href="/" className="transition-colors hover:text-ink">
            Fil
          </Link>
          <Link href="/changelog" className="transition-colors hover:text-ink">
            Changelog
          </Link>
          <p className="hidden text-ink-faint sm:block">{today}</p>
        </nav>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-1 px-4 pb-4 pt-3 text-xs text-ink-faint sm:px-6">
        <span>Veille SEO &amp; GEO, résumée et hiérarchisée par IA</span>
        {sourceCount !== undefined && (
          <>
            <span aria-hidden>&middot;</span>
            <span className="tabular">{sourceCount} sources suivies</span>
          </>
        )}
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
