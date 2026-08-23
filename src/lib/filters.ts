export function buildHref(
  current: { theme?: string; source?: string },
  next: { theme?: string; source?: string }
) {
  const params = new URLSearchParams();
  const theme = "theme" in next ? next.theme : current.theme;
  const source = "source" in next ? next.source : current.source;
  if (theme) params.set("theme", theme);
  if (source) params.set("source", source);
  const qs = params.toString();
  return qs ? `/?${qs}` : "/";
}
