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
            ? "border-ink bg-ink text-paper-raised"
            : "border-line text-ink-muted hover:border-line-strong")
        }
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
              ? "border-ink bg-ink text-paper-raised"
              : "border-line text-ink-muted hover:border-line-strong")
          }
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
