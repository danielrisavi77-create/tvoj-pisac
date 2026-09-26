# Task 4 brief — process, examples, FAQ, articles, about and contact

Read this brief first. It is the exact task contract. Implement only this task on `feat/public-experience`; do not dispatch subagents or reviewers.

## Goal

Add all remaining static public informational surfaces using Task 1 content and Task 2 shell primitives. These pages are reviewable/demo-ready only; no contact or intake side effect exists.

## Files

- Create pages: `src/app/(public)/proces/page.tsx`, `primjeri/page.tsx`, `faq/page.tsx`, `clanci/page.tsx`, `clanci/[slug]/page.tsx`, `o-nama/page.tsx`, `kontakt/page.tsx`.
- Modify `src/content/public.ts` only for concrete content needed by page tests.
- Extend `tests/components/public.test.tsx` and `tests/e2e/public-experience.spec.ts` as needed.

## Required behavior

- `/proces`: qualification, scope confirmation, work, quality check and Daniel's final approval; never automated delivery.
- `/primjeri`: exactly three examples, each visibly labelled `Ilustrativni primjer — nije stvarni klijentski rezultat.`.
- `/faq`: native `<details><summary>` disclosure controls, no custom JS accordion.
- `/clanci`: the three article records/slugs from Task 1; detail route uses `notFound()` for unknown slug.
- `/o-nama`: Daniel-led service description without invented team, credentials or results.
- `/kontakt`: static `id="razgovor"` section, links to packages/process, and explicit sentence that contact/private intake submission is not connected in this phase. No invented email, `mailto:`, fake form or submit button.

## TDD steps

1. Write tests for Daniel approval/QC copy, exactly three visible illustrative disclaimers and native `details` markup.
2. Run `npm test -- tests/components/public.test.tsx`; expected RED because these pages are missing/incomplete.
3. Implement pages with `PublicPageShell` and typed records; use `notFound()` for unknown articles.
4. Run `npm test -- tests/components/public.test.tsx tests/content/public.test.ts`, `npm run lint` and `npm run typecheck`; expected PASS.
5. Commit `feat: add public informational pages`.

## Constraints

No legal/consumer final wording, business identity, contact provider, form submission, auth, uploads, analytics, backend or integration. No fabricated proof.

## Report

Write `.superpowers/sdd/2026-09-23-tvoj-pisac-public-experience/task-4-report.md` with status, changed files, commit, commands/results and concerns. Return only a concise status summary.
