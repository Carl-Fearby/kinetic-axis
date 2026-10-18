# Kinetic Axis — WCAG 2.2 AA Review

**Date:** 7 October 2026 · **Scope:** kineticaxisdigital.com (static export, 66 pages) · **Target:** WCAG 2.2 Level A + AA

## Method

- Static baseline: `npm run test:a11y` (existing hardening checks) — pass.
- axe-core 4.10 over **all 66 exported pages** (headless/jsdom) for structural, ARIA, naming, landmark rules.
- Heading-structure + best-practice sweep over all 65 content pages.
- Live-DOM axe on **16 pages spanning every template** (home, services, a service detail, a location page, solutions, contact, project planner, studio, approach, experience, work, an insight article, accessibility, 404) in headless Chrome, after a full scroll pass and 3.5 s settle so entrance animations reach final state.
- Gradient backgrounds are a known axe blind spot (the site uses them site-wide): the 60 "incomplete" contrast nodes on the home page were resolved manually — worst-case colour-compositing math plus real pixel sampling of the rendered page (sharp) around each text run.
- Keyboard audit: 16-stop tab traversal with focus-indicator verification, skip-link activation, desktop dropdown and mobile burger open/close/Escape behaviour, checked in real headless Chrome.
- Reflow tested at 320 px (proxy for 400 % zoom, WCAG 1.4.10) on 5 key pages; target-size (2.5.8) axe-checked desktop + mobile.

Animation caveat resolved: the reveal-on-scroll system renders elements at partial opacity, which briefly lowers contrast and produced false positives (contact CTA, approach articles, form help text). All findings below are from the settled state; items that cleared after settling are excluded.

## Failures found (prioritised)

### P1 — 1.4.3 Contrast (AA): `#2f71ff` accent on light backgrounds — 47+ pages

Measured 3.86–4.03 : 1 (need 4.5) at 11 px bold. Confirmed by axe (flat backgrounds), pixel sampling (home gradient), and CSS (`app/globals.css:791,1164,1212`).

| Element | Where | Pages |
|---|---|---|
| `.ka-authority__kicker` | home + service-page authority section | 47 |
| `.ka-search-cluster__head span`, card `small` (10 px) | search-cluster component | 45 |
| `.ka-studio-history__principle > span` (on dark `#0b1730` → 4.17) | /studio | 1 |
| `.ka-case-depth` (same rule; currently unused in export) | — | 0 |
| Hover/focus states `.insight-meta a:hover`, `.ka-confidence__links a:hover` | 4.03 on light | several |

**Fix:** darken the accent for small text (e.g. `#1558e9` → 5.9:1 on white, already a site colour) or use a darker variant `#1a5ae0`-class blue wherever it carries text ≤ 18.66 px.

### P1 — 1.4.3 Contrast (AA): dark-section kicker `#586a87` on `#0e192a` — 3.21 (50 pages)

`.mkt-kicker` inside `.mkt-section--dark` (11 px bold). Present on **50 of 66 pages** (services, solutions, planner, all service/location pages, insights). **Fix:** override `.mkt-section--dark .mkt-kicker` to a light tint (e.g. `#8fb4ff` or `#9fb8d8` — verify ≥ 4.5).

### P1 — 1.4.3 Contrast (AA): remaining isolated failures

| Element | Colors | Ratio | Page(s) | Source |
|---|---|---|---|---|
| `.ka-search-cluster__card small` | `#2f71ff` on `#fff` | 4.26 (10 px) | 45 | `globals.css:1212` |
| `.ka-studio-history__actions > a` | `#fff` on `#3978ff` | 3.95 (16 px bold) | /studio | studio page CSS |
| `.ka-exp-era__body small` | `#7a8aa1` on `#fff` | 3.51 (11 px) ×6 | /experience | `experience.css:840` |
| `.kad-next-steps li small` | `#69778e` on `#f7faff` | 4.33 (12 px) ×3 | /contact | `globals.css:1472` |
| `.insight-practice-links > strong` | `#677892` on `#fff` | 4.48 (12 px) | insights | — |
| `.mkt-breadcrumb` (flat worst-case 4.44; lower over hero gradient) | `#6a7990` | ≤ 4.45 | most service pages | shared page CSS `:261` |

### P1 — 4.1.2 Name/Role/Value (A): `aria-label` on non-semantic elements — all 66 pages

axe (serious) on every page:

- 3 × `<span aria-label="… — coming soon">` — footer social placeholders ([SiteFooter.tsx:102-104](src/components/SiteFooter.tsx#L102-L104)).
- 4 × `<div aria-label>` (ARIA 1.2 prohibits it on generic divs; axe "incomplete"): `.client-marquee__viewport`, `.ka-authority__facts`, `.ka-footer-v1__socials`, `.ka-footer-v1__social-coming` ([SiteFooter.tsx:101](src/components/SiteFooter.tsx#L101)).

**Fix:** `role="img"` on the icon spans (label permitted), `role="group"` (or `role="region"` + heading) on the labelled divs — or drop the labels where visually-hidden text can carry the meaning instead.

### P2 — 2.4.2 Page Titled (A): 404 page has no `<title>`

`out/404.html` emits no `<title>` at all (root [layout.tsx](app/layout.tsx) metadata has no default `title`; every page supplies its own via `metadataFor`, but `not-found.tsx` cannot). **Fix:** add a default `title` to the root layout metadata (page-level titles override it, so nothing else changes).

### P2 — 2.5.3 Label in Name (A): 10 rich-card links on home

axe `label-content-name-mismatch`: 4 `.service` links (`aria-label="Explore Web Design services"` etc.) and 4 portfolio cards (`aria-label="Enquire about Pace Venues project"` etc.) — the visible text inside the card (heading + description) is not fully contained in the accessible name. **Fix:** drop the overriding `aria-label`s (let the card's own text form the name) or ensure the visible label text appears verbatim inside the label.

## Verified passes

- **Skip link:** first tab stop, revealed at 12,12 (184 × 46 px), 3 px outline, Enter moves focus to `#main-content`.
- **Focus visibility:** 16/16 tab stops show a 2–3 px focus outline/box-shadow (`:focus-visible`, forced-colours fallback present).
- **Keyboard operability:** desktop dropdowns toggle via Enter with `aria-expanded` and close on Escape; mobile burger (`.ka-toggle`, `aria-controls="ka-navigation"` — target exists) opens (380 px panel), `aria-expanded` updates, Escape closes; Enter-key activation works.
- **Structure:** exactly one `<h1>` and no heading-level skips on all 65 content pages; one `<main>`; five labelled `<nav>` landmarks; `html[lang="en-GB"]`; valid `meta viewport`; no duplicate IDs; all links/buttons have names; all `aria-controls` targets exist in the DOM.
- **Reflow (1.4.10):** no horizontal scroll at 320 px on /, /services, /contact, /project-planner, /privacy.
- **Target size (2.5.8):** axe `target-size` 0 violations desktop and mobile.
- **Forms:** every input labelled, fieldset/legend grouping, `aria-live` status + `role="alert"` errors, character-count helper wired via `aria-describedby`.
- **Motion:** `prefers-reduced-motion` CSS + forced-colours media queries present (static checks).
- **Images:** all 58 JSX images have alt + intrinsic dimensions (existing check); decorative 3D artwork is `aria-hidden`.
- **Gradient-contrast sweep:** of the 60 home nodes axe could not evaluate, 59 pass by pixel/compositing measurement (near-threshold: marquee intro 4.54, authority facts 4.52, footer coming-label 4.89 — recommend adding headroom when touching those colours).

## Limitations

- Automated + code review only; no screen-reader session (VoiceOver/NVDA) — recommended as a follow-up for live-region announcements and menu semantics in real AT.
- 400 % zoom approximated by the 320 px reflow test.
- Consent banner behaviour not exercised beyond axe's static checks.
- Findings measured against the local export of current source (matches deployed build modulo the last two commits, which are content-only).

## Suggested fix order

1. Accent-colour contrast (1 CSS variable/rule cluster — touches ~50 pages) + dark-kicker override.
2. Footer social `role`s + root-layout default `<title>` (two tiny edits, removes the only Level A structural failures).
3. Isolated colour tweaks (studio, experience, contact, insights, breadcrumbs).
4. Home card `aria-label` alignment.
5. Add regression guards to `scripts/check-accessibility-static.mjs` (assert the footer roles, the default title, and the accent colour values) so the checks stay green.
