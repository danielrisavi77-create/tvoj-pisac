# Task 5 brief — responsive design, focus and reduced-motion enhancement

Read this brief first. It is the exact task contract. Implement only this task on `feat/public-experience`; do not dispatch subagents or reviewers.

## Goal

Make all public surfaces warm/editorial, responsive, keyboard-usable and reduced-motion-safe, with CSS-only decorative enhancement.

## Files

- Create `src/components/public/DecorativeScene.tsx`.
- Modify `src/app/globals.css`, `src/app/layout.tsx`, public components/pages only as required by tests.
- Create/extend `tests/e2e/public-experience.spec.ts`.

## Required behavior

- `DecorativeScene(): JSX.Element` accepts no data and renders only `aria-hidden="true"` decorative layers; no WebGL, remote asset or information dependency.
- Preserve one accessible `<main>` per public route, semantic headings, visible `:focus-visible`, readable line lengths and no horizontal overflow at 390x844.
- `prefers-reduced-motion: reduce` preserves all content/CTA access and disables/reduces decorative animation/transforms.
- Public positive routes to cover: `/`, `/usluge`, `/paketi`, `/cijene`, `/proces`, `/primjeri`, `/faq`, `/clanci`, `/o-nama`, `/kontakt`, all five `/paketi/<slug>` variants and all three `/clanci/<slug>` variants.
- Unknown `/paketi/nepoznat` and `/clanci/nepoznat` return 404.
- Keyboard test tabs through `/` header and asserts active element visibility and normal CTA links.

## TDD steps

1. Write Playwright tests first with `page.emulateMedia({ reducedMotion: "reduce" })`, visible main, `scrollWidth <= innerWidth`, media query match, positive route list and 404 checks.
2. Run `npm run test:e2e`; expected RED for missing new routes/visual baseline. Diagnose unexpected failures before implementation.
3. Implement CSS tokens/layout/focus styles and `DecorativeScene`; no JS menu or new dependency.
4. Add keyboard/focus checks; run `npm run test:e2e` and `npm run lint`; expected PASS, including existing `/portal` and `/admin` smoke tests.
5. Commit `feat: add responsive public visual baseline`.

## Constraints

Motion cannot block content or CTAs; no production integration, no external images, no paid dependency.

## Report

Write `.superpowers/sdd/2026-09-23-tvoj-pisac-public-experience/task-5-report.md` with status, changed files, commit, commands/results and concerns. Return only a concise status summary.
