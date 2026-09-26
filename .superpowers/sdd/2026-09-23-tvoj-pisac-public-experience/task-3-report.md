# Task 3 report — home, services, packages and pricing

## Status

Completed on branch `feat/public-experience`.

Task 3 presents the public home, services, catalogue, package-detail and
pricing surfaces from the Task 1 typed content contract and the Task 2 shared
public shell. It includes positive browser coverage for the Task 3 routes and
the unknown-package 404 response.

## Changed files

- `src/app/(public)/page.tsx`
- `src/app/(public)/usluge/page.tsx`
- `src/app/(public)/paketi/page.tsx`
- `src/app/(public)/paketi/[slug]/page.tsx`
- `src/app/(public)/cijene/page.tsx`
- `src/components/public/PackageCard.tsx`
- `tests/components/public.test.tsx`
- `tests/components/shell.test.tsx`
- `tests/e2e/public-experience.spec.ts`

## Commit

`0ac6379 feat: present public services and catalogue`

## TDD and blocker/fix evidence

1. RED: `npm test -- tests/components/public.test.tsx` failed as expected
   because `PackageCard` did not exist.
2. GREEN: implemented the catalogue-backed pages, package card,
   `generateStaticParams`, and `notFound()` behavior; the focused public
   component suite then passed 6/6.
3. Blocked full-suite evidence: `npm test` initially failed 1/28 because
   `tests/components/shell.test.tsx` rendered `PublicPage` alone while still
   asserting the `PublicLayout`-owned banner and main landmark.
4. Fixture RED: `npm test -- tests/components/shell.test.tsx` reproduced the
   failure (1/3) with no accessible `banner`.
5. Fixture GREEN: the minimal fixture change wrapped `PublicPage` in
   `PublicLayout`, preserving the existing banner, brand-link and one-main
   assertions. `npm test -- tests/components/shell.test.tsx` then passed 3/3.

## Commands and results

| Command | Result |
| --- | --- |
| `npm test -- tests/components/public.test.tsx tests/content/public.test.ts` | PASS: 2 files, 11 tests. |
| `npm run typecheck` | PASS: `tsc --noEmit` exited 0. |
| `npm run build` | PASS: static output includes `/`, `/usluge`, `/paketi`, `/cijene`, and all five `/paketi/[slug]` variants. |
| `npm test` | PASS: 8 files, 28 tests. |
| `npm run test:e2e -- tests/e2e/public-experience.spec.ts` | PASS: 6 routes/assertions, including `/paketi/nepoznat` HTTP 404. |
| `git diff --check` | PASS before commit: no whitespace errors. |

## Concerns

- The report remains intentionally untracked under `.superpowers`; the commit
  contains only Task 3 source and test changes.
- Informational/contact routes remain Task 4 scope; this task added no
  placeholder pages or duplicate route implementations.

## Fix round 1 — review coverage

The Critical route finding remains resolved by the ledger ruling: `/proces`,
`/primjeri`, `/faq`, `/clanci`, `/o-nama` and `/kontakt` are Task 4-owned
routes. This fix adds no placeholders or runtime behavior.

The Important finding was addressed by extending
`tests/e2e/public-experience.spec.ts` with meaningful heading assertions for
all five package variants:

- `/paketi/seminarski` — `Seminarski rad`
- `/paketi/zavrsni` — `Završni rad`
- `/paketi/diplomski` — `Diplomski/master's rad`
- `/paketi/specijalisticki` — `Specijalistički rad`
- `/paketi/doktorski` — `Doktorski rad`

## Fix round 1 commit

`3696e2d test: cover all public package variants`

## Fix round 1 verification

| Command | Result |
| --- | --- |
| `npm run test:e2e -- tests/e2e/public-experience.spec.ts` | PASS: 10/10, including all five package variants and unknown-package 404. |
| `npm test -- tests/components/public.test.tsx tests/content/public.test.ts` | PASS: 2 files, 11 tests. |
| `npm run typecheck` | PASS: `tsc --noEmit` exited 0. |
| `npm run build` | PASS: all five package variants generated. |
| `npm test` | PASS: 8 files, 28 tests. |
| `git diff --check` | PASS: no whitespace errors. |
