# Task 3 brief — home, services, packages and pricing

Read this brief first. It is the exact task contract. Implement only this task on `feat/public-experience`; do not dispatch subagents or reviewers.

## Goal

Build catalogue-backed public presentation for Home, Services, Packages, package details and Pricing. Task 1 owns `PUBLIC_PACKAGES` and `getPublicPackageBySlug`; Task 2 owns the shared layout/primitives.

## Files

- Create `src/components/public/PackageCard.tsx`.
- Create `src/app/(public)/usluge/page.tsx`, `src/app/(public)/paketi/page.tsx`, `src/app/(public)/paketi/[slug]/page.tsx`, `src/app/(public)/cijene/page.tsx`.
- Modify `src/app/(public)/page.tsx`.
- Extend `tests/components/public.test.tsx`; add route cases to `tests/e2e/public-experience.spec.ts` only if needed for this task.

## Required interfaces and behavior

- `PackageCard({ package }: { package: PublicPackageContent }): JSX.Element` renders label, exact price, scope/price boundary and internal detail link.
- Dynamic package route uses `getPublicPackageBySlug(slug)` and calls `notFound()` for `undefined`; never falls back to another package.
- Use `generateStaticParams` for the five slugs: `seminarski`, `zavrsni`, `diplomski`, `specijalisticki`, `doktorski`.
- Render exact prices €50, €150, €300, €500 and €1.000 on packages/pricing surfaces. Do not duplicate source numeric values in route files.
- Home heading is `Tvoj Pisac`; primary CTA is `Zatraži ponudu` to `/kontakt`; secondary package CTA goes to `/paketi`.
- No copy may claim guaranteed grade, acceptance, scientific contribution, detector evasion, checkout/payment, upload, submission or workspace creation.

## TDD steps

1. Write tests for the Home heading/CTA and absence of forbidden outcome claims; write a package page test asserting all five displayed prices and at least five scope-boundary notes.
2. Run `npm test -- tests/components/public.test.tsx`; expected RED because required pages/cards are incomplete.
3. Implement the pages from Task 1 content and Task 2 primitives. `/usluge` describes service categories/responsible use. `/paketi` and `/cijene` map `PUBLIC_PACKAGES`. Detail route renders exact price, boundary notes and internal links to `/kontakt` and `/proces`.
4. Run `npm test -- tests/components/public.test.tsx tests/content/public.test.ts`, `npm run typecheck` and `npm run build`; expected PASS, with all package variants generated.
5. Commit `feat: present public services and catalogue`.

## Constraints

No fixed turnaround/scope/revision/legal claims beyond the exact boundary text; no backend or new dependency; no fake proof.

## Report

Write `.superpowers/sdd/2026-09-23-tvoj-pisac-public-experience/task-3-report.md` with status, changed files, commit, commands/results and concerns. Return only a concise status summary.
