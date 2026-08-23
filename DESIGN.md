# Design

<!-- impeccable:design-schema 1 -->

Recorded from the built world (`src/app/`). This is **v2.1**. v2 was a
redesign that replaced the v1 restrained-light editorial system after
the user judged it too generic ("IA slop"); v2.1 is a refinement pass on
v2's own feedback (color-coded filters, a red impact signal, a light/dark
toggle, a legible wordmark) — not another world change. v1's record is
kept in PRODUCT.md's Brand Commitments under a collapsed history section.

## Direction

A premium, brand-forward dark register. Still a wire-service briefing
underneath (same information architecture as v1: masthead, filters, lead
+ river, trending/source rail) — the redesign is a full re-skin plus a
new gradient-border signature, not a structural rebuild. Color strategy:
**Committed** — the three-stop brand gradient carries borders, badges,
active filter states, and background atmosphere; a **Full palette**
layer of six luminous named hues still handles topic tags.

## Palette

All theme-dependent tokens are defined once in `globals.css` using the
CSS `light-dark(lightValue, darkValue)` function, resolved from the
`color-scheme` property that the `[data-theme]` rules set. This means
every component that reads a token (`var(--ink)`, `var(--tag-update)`,
etc.) works in both themes with no per-component branching.

- `--bg`: `#F6F7FC` light / `#0A0F27` dark — page ground
- `--bg-raised`: `#FFFFFF` light / `#171B3D` dark — cards, masthead
- `--bg-sunken`: `#E8E9F5` light / `#060819` dark — active rail rows
- `--ink`: `#12162E` light / `#F4F5FC` dark — primary text (≥16.6:1 in
  both themes)
- `--ink-muted`: `#4B5079` light / `#9DA3D1` dark (≥7.2:1)
- `--ink-faint`: `#5A5F8C` light / `#8288B8` dark (≥5.6:1 — contrast
  floor, do not lighten either side)
- Brand gradient, `--gradient-brand`: `linear-gradient(135deg, #6B0AB8 0%, #340DA4 55%, #476AED 100%)`,
  **theme-independent** (same hex values in light and dark).
  **Border/badge/active-state only. Never text** — gradient text is
  banned by the craft floor (`reference/craft-floor.md`) regardless of
  brief; emphasis comes from weight/size/glow instead.
- Impact gradient, `--gradient-impact`: `linear-gradient(135deg, #DC2626 0%, #F97316 100%)`
  (red → orange). Deliberately **outside** the brand gradient family —
  "impact majeur" is an alert, and red/orange is the universal urgency
  convention; reusing the brand purple/blue here would have buried the
  signal in the same color as ordinary UI chrome. White text on this
  gradient is ≥4.7:1 at every stop.
- Topic tags — each a `light-dark(darkText, lightText)` pair, used as
  `color: var(--tag-x)` with `background: color-mix(in srgb, var(--tag-x) 16%, transparent)`
  computed inline (`TagPill.tsx`, `FilterBar.tsx`): `update` `#3B4FCC`/`#6E8CFF`,
  `geo` `#9333C7`/`#D68FFF`, `links` `#0B6F65`/`#4FD1C5`, `technique`
  `#0C6488`/`#5EC8F2`, `content` `#95500A`/`#FFB84D`, `local` `#137038`/`#4ADE80`.
  All ≥5.3:1 against both `--bg` and `--bg-raised` in their own theme —
  light-mode values are darkened versions of the dark-mode hue, not a
  different palette, so a tag reads as "the same color" across the
  toggle. The `color-mix(... transparent)` approach (not a precomputed
  tint variable) is what makes one set of values work on both a
  near-black and a near-white card background: it overlays at 16%
  opacity onto whatever surface is actually beneath it.
- **FilterBar** chips carry their tag's color even when inactive (outline
  + 6% tint), strengthening to a solid-color border + 16% tint + glow
  when active — this was a v2.1 fix: v2's filters were neutral-gray until
  clicked, which lost the "color = topic" association the tags
  themselves already teach the reader on every card.

Dark is the pinned default (overrides v1's use-scene reasoning for
light) — a direct user instruction with explicit hex values, not a
category default. Light is a first-class alternative via the header
toggle (`ThemeToggle.tsx`), not an afterthought: same gradient, same tag
hues (darkened for contrast), same information density.

## Type

Unchanged from v1: **Archivo** (display, self-hosted, -0.02em tracking),
**Inter** (body), **JetBrains Mono** (tabular counts only). The
redesign is a palette/material change, not a type change.

## Signature: the gradient ring

`.gradient-ring` in `globals.css` — a hairline brand-gradient border via
`mask-composite: exclude`, so it sits on top of a card without disturbing
its own border-radius or padding.

- `.ring-static` → always visible. Used only on the lead article card.
- Bare `.gradient-ring` inside a `.ring-trigger` → opacity 0 → 1 on
  `:hover`/`:focus-within`. Used on every compact card, so the ring reads
  as a deliberate interaction, not decoration slapped on every card
  uniformly (which is what would have tipped this back into "slop").
- The impact badge (`ImpactBadge.tsx`) is the one place a gradient ships
  as a **fill**, not a ring — but it's `--gradient-impact` (red→orange),
  not the brand gradient; see Palette. The flame icon renders filled
  (`fill="currentColor"`, not just stroked), so it reads as a solid flame
  glyph rather than a thin outline — this is what "on fire" meant in the
  brief, not a literal animation.

Do not add a second full-fill gradient surface (e.g. a gradient button
or gradient card background) without checking this restraint first: the
brand gradient's power comes from scarcity (ring + active filter pills),
not from coverage. The impact gradient is intentionally the one
exception, and it must stay visually distinct from the brand gradient
(different hue family entirely) or the "alert" signal stops working.

## Components (`src/components/`)

Same set as v1 (Masthead, FilterBar, ArticleCard, ImpactBadge, TagPill,
TrendingRail/SourceRail, EmptyState, SiteFooter), re-skinned:

- **Masthead** — gradient-filled logo mark (a small rounded square, not
  text) paired with a wordmark "Radar S&GEO". The `&` is a separate
  `<span>` at regular weight (not the wordmark's extrabold) in
  `--brand-3`: at 800-weight Archivo, the ampersand's counters closed up
  and the character read as a knot, not a symbol — differentiating its
  weight and color (never a gradient fill on the glyph, still text) fixed
  legibility without changing the typeface. Nav to `/` and `/changelog`,
  plus `ThemeToggle.tsx` (Sun/Moon icon button, persists to
  `localStorage`, applied pre-hydration by an inline `beforeInteractive`
  script in `layout.tsx` so there is no flash of the wrong theme).
- **ArticleCard** — headline still first, byline still below it (the
  kicker-above-heading ban still holds). Card shadow is now a colored,
  blurred elevation (`rgba(52,13,164,...)` dark / lighter equivalent
  light) instead of a neutral one — it's still offset+blur, not a flat
  halo.
- **FilterBar** — "Tout" keeps the brand-gradient fill (it represents
  every topic at once, so the umbrella gradient still makes sense there);
  each theme chip carries its own tag color instead, active or not (see
  Palette).

## New: `/changelog`

`src/app/changelog/page.tsx` + `src/lib/changelog.ts`. A vertical
timeline (gradient-line rail, brand-gradient dot on the newest entry,
neutral dots on older ones) — reuses Masthead/SiteFooter. Append an
entry to `CHANGELOG` (newest first) whenever a user-visible change ships;
do not let this page drift from reality.

## Patterns to preserve (unchanged from v1)

No uniform icon+heading+text cards, no kickers, no section numbers, no
modals for non-blocking tasks, no flat/hard-edged shadows, no colored
side borders on cards, `::selection`/scrollbar/focus-visible themed from
the palette, one authored motion (`.rise-in`, staggered, capped, reduced
under `prefers-reduced-motion`).

## Known gaps

Same disclosure as v1: no `impeccable-finish-reviewer` subagent is
available in this harness. This redesign was self-reviewed in-thread
against `reference/craft-floor.md` (contrast computed and verified by
script, not eyeballed) rather than by a fresh independent pass. Re-run a
proper finish review before treating this surface as fully audited.
