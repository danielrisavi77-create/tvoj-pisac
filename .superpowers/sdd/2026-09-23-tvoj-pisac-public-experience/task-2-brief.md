# Task 2 brief — shared public shell and navigation

Read this brief first. It is the exact task contract. Implement only this task on `feat/public-experience`; do not dispatch subagents or reviewers.

## Goal

Create one accessible public route-group layout, reusable page/CTA primitives and a truthful footer boundary. Task 1 already provides `PUBLIC_NAV_ITEMS` and public package/content types.

## Files

- Create `src/app/(public)/layout.tsx`.
- Create `src/components/public/PublicHeader.tsx`, `PublicFooter.tsx`, `PublicPageShell.tsx`, `PublicCta.tsx`.
- Modify `src/app/(public)/page.tsx` only as needed to use the layout/primitives.
- Modify `src/components/shell/AppHeader.tsx` only if a genuine shared primitive is reused; do not alter portal/admin semantics unnecessarily.
- Create or extend `tests/components/public.test.tsx`.

## Required interfaces

- `PublicHeader(): JSX.Element` with `nav[aria-label="Glavna navigacija"]` and approved CTA links.
- `PublicFooter(): JSX.Element` with secondary links and static no-backend boundary copy.
- `PublicPageShell({ eyebrow?, title, intro, children }: { eyebrow?: string; title: string; intro: string; children: ReactNode }): JSX.Element`.
- `PublicCta({ href, variant, children }: { href: "/kontakt" | "/paketi" | "/kontakt#razgovor"; variant: "primary" | "secondary"; children: ReactNode }): JSX.Element` using internal `next/link` only.

Primary CTA label: `Zatraži ponudu`, href `/kontakt`. Secondary labels: `Odaberi paket`, href `/paketi`; `Dogovori razgovor`, href `/kontakt#razgovor`.

Keep `/portal` as a secondary/footer link labelled as a development shell; do not make it a marketing primary CTA. Footer must state that contact/private intake/workspace connectivity is not active in this reviewable phase. Do not render a fake submit button.

## TDD steps

1. Write component tests first: named nav exists; exact CTA labels/hrefs exist; footer contains a Croatian no-backend boundary; no button named `Pošalji` exists.
2. Run `npm test -- tests/components/public.test.tsx`; expected RED because components are missing.
3. Implement route-group layout with `PublicHeader`, one `<main>` around children, and `PublicFooter`; use regular keyboard links, visible focus-compatible classes and no client-side menu state.
4. Run `npm test -- tests/components/public.test.tsx tests/smoke/app.test.tsx` and `npm run lint`; expected PASS.
5. Commit `feat: add public experience shell`.

## Constraints

Croatian, semantic, mobile-safe, no external action, no backend/auth/payment/AI/integration, no fabricated claims. Do not add a JS menu library.

## Report

Write `.superpowers/sdd/2026-09-23-tvoj-pisac-public-experience/task-2-report.md` with status, changed files, commit, commands/results and concerns. Return only a concise status summary.
