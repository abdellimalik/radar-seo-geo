import Link from "next/link";
import { THEMES } from "@/lib/themes";
import { buildHref } from "@/lib/filters";

export function FilterBar({
  activeTheme,
  activeSource,
}: {
  activeTheme?: string;
  activeSource?: string;
}) {
  const current = { theme: activeTheme, source: activeSource };

  return (
    <nav
      aria-label="Filtrer par thématique"
      className="flex flex-wrap gap-2 border-b border-line py-4"
    >
      <Link
        href={buildHref(current, { theme: undefined })}
        className={
          "rounded-full border px-3 py-1 text-sm font-medium transition-colors " +
          (!activeTheme
            ? "border-transparent text-white shadow-[0_0_16px_-4px_rgba(107,10,184,0.7)]"
            : "border-line text-ink-muted hover:border-line-strong hover:text-ink")
        }
        style={!activeTheme ? { background: "var(--gradient-brand)" } : undefined}
      >
        Tout
      </Link>
      {THEMES.map((t) => (
        <Link
          key={t.slug}
          href={buildHref(current, { theme: t.slug })}
          className={
            "rounded-full border px-3 py-1 text-sm font-medium transition-colors " +
            (activeTheme === t.slug
              ? "border-transparent text-white shadow-[0_0_16px_-4px_rgba(107,10,184,0.7)]"
              : "border-line text-ink-muted hover:border-line-strong hover:text-ink")
          }
          style={activeTheme === t.slug ? { background: "var(--gradient-brand)" } : undefined}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
