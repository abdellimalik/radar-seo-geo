import { themeLabel, themeVars } from "@/lib/themes";

export function TagPill({ theme }: { theme: string }) {
  const { fg } = themeVars(theme);
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.6875rem] font-medium tracking-wide"
      style={{
        color: fg,
        backgroundColor: `color-mix(in srgb, ${fg} 16%, transparent)`,
      }}
    >
      {themeLabel(theme)}
    </span>
  );
}
