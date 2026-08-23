import type { Metadata } from "next";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Masthead } from "@/components/Masthead";
import { SiteFooter } from "@/components/SiteFooter";
import { CHANGELOG } from "@/lib/changelog";

export const metadata: Metadata = {
  title: "Changelog — Radar S&GEO",
};

export default function ChangelogPage() {
  return (
    <>
      <Masthead />
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
        <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Changelog
        </h1>
        <p className="mt-2 max-w-[60ch] text-sm text-ink-muted">
          Historique des évolutions du produit — sources, enrichissement IA,
          fréquence de collecte, design.
        </p>

        <ol className="relative mt-10 space-y-10 border-l border-line pl-8">
          {CHANGELOG.map((entry, i) => (
            <li key={`${entry.date}-${entry.title}`} className="relative">
              <span
                className="absolute -left-[calc(2rem+5px)] top-1 h-2.5 w-2.5 rounded-full"
                style={{
                  background: i === 0 ? "var(--gradient-brand)" : "var(--line-strong)",
                  boxShadow: i === 0 ? "0 0 12px -1px rgba(107,10,184,0.8)" : undefined,
                }}
                aria-hidden
              />
              <time
                dateTime={entry.date}
                className="tabular text-xs font-medium uppercase tracking-wide text-ink-faint"
              >
                {format(new Date(entry.date), "d MMMM yyyy", { locale: fr })}
              </time>
              <h2 className="mt-1.5 font-display text-lg font-bold">
                {entry.title}
              </h2>
              <p className="mt-1.5 max-w-[60ch] text-sm text-ink-muted">
                {entry.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
      <SiteFooter />
    </>
  );
}
