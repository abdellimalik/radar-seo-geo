import Link from "next/link";
import { THEMES, themeVars } from "@/lib/themes";
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
      {THEMES.map((t) => {
        const { fg } = themeVars(t.slug);
        const isActive = activeTheme === t.slug;
        return (
          <Link
            key={t.slug}
            href={buildHref(current, { theme: t.slug })}
            className="rounded-full px-3 py-1 text-sm font-medium transition-[background-color,box-shadow] duration-150"
            style={{
              color: fg,
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: isActive ? fg : `color-mix(in srgb, ${fg} 35%, transparent)`,
              backgroundColor: `color-mix(in srgb, ${fg} ${isActive ? 16 : 6}%, transparent)`,
              boxShadow: isActive ? `0 0 14px -4px color-mix(in srgb, ${fg} 70%, transparent)` : undefined,
            }}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
