# Design

<!-- impeccable:design-schema 1 -->

Recorded from the built world (`src/app/`). This is **v2**, a redesign
that replaces the v1 restrained-light editorial system after the user
judged it too generic ("IA slop"). Brief-pinned by the user: exact hex
values given, "premium/web3" register requested explicitly, gradient
borders requested explicitly. v1's record is kept in PRODUCT.md's Brand
Commitments under a collapsed history section for traceability.

## Direction

A premium, brand-forward dark register. Still a wire-service briefing
underneath (same information architecture as v1: masthead, filters, lead
+ river, trending/source rail) — the redesign is a full re-skin plus a
new gradient-border signature, not a structural rebuild. Color strategy:
**Committed** — the three-stop brand gradient carries borders, badges,
active filter states, and background atmosphere; a **Full palette**
layer of six luminous named hues still handles topic tags.

## Palette

- `--bg` `#0A0F27` — page ground, near-black navy
- `--bg-raised` `#171B3D` — cards, masthead
- `--bg-sunken` `#060819` — active/pressed rail rows
- `--ink` `#F4F5FC` — primary text (17.4:1 on `--bg`)
- `--ink-muted` `#9DA3D1` — summaries, source names (7.7:1 on `--bg`)
- `--ink-faint` `#8288B8` — timestamps, counts (5.6:1 on `--bg`, 4.9:1 on
  `--bg-raised` — do not go lighter, this is the contrast floor)
- Brand gradient, `--gradient-brand`: `linear-gradient(135deg, #6B0AB8 0%, #340DA4 55%, #476AED 100%)`.
  **Border/badge/active-state only. Never text** — gradient text is
  banned by the craft floor (`reference/craft-floor.md`) regardless of
  brief; emphasis comes from weight/size/glow instead.
- Topic tags (bright hue on a `color-mix(... 16%, transparent)` tint of
  itself, computed inline, not a separate CSS var): `update #6E8CFF`,
  `geo #D68FFF`, `links #4FD1C5`, `technique #5EC8F2`, `content #FFB84D`,
  `local #4ADE80`. All ≥6:1 against both `--bg` and `--bg-raised`.

Dark is now the pinned default (overrides v1's use-scene reasoning for
light) — this was a direct user instruction with explicit hex values,
not a category default, so the floor's "light or dark picked by category
is lazy" caution does not apply here.

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
- The impact badge (`ImpactBadge.tsx`) is the one place the gradient
  ships as a **fill**, not a ring — reserved for "impact majeur" so the
  brightest element on the page is also the most editorially important
  one.

Do not add a second full-fill gradient surface (e.g. a gradient button
or gradient card background) without checking this restraint first: the
gradient's power here comes from scarcity (ring + one badge type + active
filter pills), not from coverage.

## Components (`src/components/`)

Same set as v1 (Masthead, FilterBar, ArticleCard, ImpactBadge, TagPill,
TrendingRail/SourceRail, EmptyState, SiteFooter), re-skinned:

- **Masthead** — gradient-filled logo mark (a small rounded square, not
  text) paired with a plain-color wordmark "Radar S&GEO". Nav to `/` and
  `/changelog` added.
- **ArticleCard** — headline still first, byline still below it (the
  kicker-above-heading ban still holds). Card shadow is now a colored,
  blurred elevation (`rgba(52,13,164,...)`) instead of a neutral one —
  it's still offset+blur, not a flat halo.
- **FilterBar** — active chip fills with the brand gradient + white text
  (verified ≥4.5:1 across every gradient stop, worst case 4.61:1 at the
  blue end).

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
