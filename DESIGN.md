# Design

<!-- impeccable:design-schema 1 -->

Recorded from the built world (`src/app/`), not written ahead of it. Standing
exit (canon) confirmed by the user — see PRODUCT.md > Brand Commitments.

## Direction

A wire-service editorial briefing for SEO/GEO: density and hierarchy over
raw chronology. Craft bar: Search Engine Land, Search Engine Journal,
Search Engine Roundtable, Abondance, Axios (smart-brevity format). No
concept roll — the user pinned this register directly (canon path).

## Palette

Cool newsprint ground, never warm cream. Color strategy: Restrained
(neutrals + one committed accent), with a Full-palette layer of six named
hues reserved strictly for topic tags.

- `--paper` `hsl(36 12% 96%)` — page ground
- `--paper-raised` `hsl(36 20% 99%)` — cards, masthead
- `--paper-sunken` `hsl(36 10% 92%)` — active rail rows
- `--ink` `hsl(222 28% 12%)` — primary text
- `--ink-muted` `hsl(222 16% 38%)` — summaries, source names
- `--ink-faint` `hsl(222 16% 45%)` — timestamps, counts (tinted from the
  ink hue, not gray; kept ≥4.5:1 on paper — do not lighten back toward the
  original 55% draft, it fails contrast)
- `--accent` `hsl(353 82% 42%)` — committed press-red, reserved for
  "impact majeur" only. Never used decoratively elsewhere.
- Topic tags (fg on tint bg, one pair per theme): `update` (indigo),
  `geo` (violet), `links` (teal), `technique` (slate-cyan), `content`
  (amber-brown), `local` (forest green). See `themes.ts`.

Light theme only, chosen from the use-scene (daytime office reading), not
by category default. Do not add a dark mode without re-running this
reasoning.

## Type

- Display: **Archivo** (600/700/800), self-hosted via `next/font/google`,
  `-0.02em` tracking, `text-wrap: balance`. Used for the masthead
  nameplate and article headlines only.
- Body: **Inter** (400/500/600) — workhorse UI face, appropriate for this
  Read/Operate surface (not used as a display face).
- Data: **JetBrains Mono** — reserved for tabular counts in the rail
  (trending/source counts). Not a "technical" costume; only for measurement.
- Numerals: `font-feature-settings: "tnum" 1` applied globally on `body`.

## Components (`src/components/`)

- **Masthead** — nameplate + date, then a thin metadata line (source
  count, last collection time). Not a kicker/eyebrow pattern.
- **FilterBar** — pure server-rendered link chips (`?theme=`), no client
  JS. Active chip: solid ink fill.
- **ArticleCard** — headline first, always. Byline (source · time · impact
  badge · tag pills) always sits *below* the headline, never above — the
  craft floor bans kickers above a heading outright. Two variants: `lead`
  (full width, larger type) and `compact` (grid).
- **ImpactBadge** — solid `--accent` pill, shown only on `impact_level =
  majeur`. Its absence on routine articles is deliberate signal, not a
  missing state.
- **Rail** (`TrendingRail`, `SourceRail`) — trending rows use a real
  proportional-width tint bar behind the label (data-driven, not a
  sparkline/progress-ring standing in for content).
- Shadows: soft offset + blur only (`0 1px 2px … , 0 10px 28px -16px …`),
  never a hard/flat block shadow.
- Icons: `lucide-react` only, consistent ~1.75–2 stroke weight. No emoji,
  no glyph icons.

## Patterns to preserve

- No card is ever icon + heading + text at uniform size; the lead/compact
  split and variable summary length keep the grid from reading as a
  generic card grid.
- No section numbers, no modals, no gradient text, no colored side
  borders on cards.
- `::selection`, scrollbar, and `:focus-visible` are themed from the
  palette (`globals.css`), not left as browser defaults.
- One authored motion: `.rise-in` (fade + 6px rise, staggered by index,
  exponential ease-out, capped at 8 items, disabled under
  `prefers-reduced-motion`). Do not add per-hover entrance effects beyond
  the existing title-underline and card-elevation hovers.

## Known gaps (unreviewed by a dedicated finish-reviewer subagent)

This harness has no `impeccable-finish-reviewer` agent available; the
review in this build was done in-thread by the builder against
`reference/craft-floor.md`, disclosed here per the skill's degraded path.
Re-run a proper finish review (fresh eyes, ideally a separate session)
before treating this surface as fully audited.
