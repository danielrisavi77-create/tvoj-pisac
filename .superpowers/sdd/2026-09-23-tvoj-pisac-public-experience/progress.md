# SDD ledger — plan: docs/superpowers/plans/2026-09-23-tvoj-pisac-public-experience.md

## Setup

- Branch: `feat/public-experience`
- Worktree: `C:\Users\PC\Documents\Codex\2026-09-22\tvoj-pisac-public-experience`
- Base / initial SHA: `8997d3bb7f576977347e04fc77e06b99005c7cf6`
- Parent plan branch: `plan/public-experience`
- Foundation base: `dfe5b4957f3e10c5583593c41cedc6699a7bb65d`
- Foundation PR #1 remains a separate Draft PR; implementation starts only on this branch after plan approval.
- Baseline: `npm ci` passed with 0 vulnerabilities; existing suite passed 6 files / 17 tests.

## Authoritative documents

- Design: `docs/superpowers/specs/2026-09-22-tvoj-pisac-design.md`
- Master: `docs/superpowers/plans/2026-09-22-tvoj-pisac-master.md`
- Phase 2 plan: `docs/superpowers/plans/2026-09-23-tvoj-pisac-public-experience.md`

## Pre-flight interface scan

| Pair / task | Shared interface or file | Finding / ruling |
|---|---|---|
| Task 1 → Task 2 | `PUBLIC_NAV_ITEMS` consumed by `PublicHeader` | Compatible: Task 1 owns route labels/paths; Task 2 renders them as links. `/portal` is secondary/footer-only because it is a development shell, not a public marketing destination. Ruling: keep `/portal` out of the primary nav while retaining the footer entry; cost if wrong: one navigation placement change. |
| Task 1 → Task 3 | `PublicPackageContent`, `getPublicPackageBySlug()` consumed by cards and dynamic package page | Compatible: exact prices derive from Foundation catalogue; unknown slug returns `undefined` and Task 3 maps it to `notFound()`. |
| Task 1 → Task 4 | `PUBLIC_PROCESS_STEPS`, `PUBLIC_FAQS`, `PUBLIC_EXAMPLES`, `PUBLIC_ARTICLES` consumed by informational pages | Compatible: content flags provide the example/article honesty assertions. |
| Task 2 → Tasks 3–4 | `PublicPageShell`, `PublicCta`, public route-group layout | Compatible: pages render inside one shared `<main>` and use internal links only. |
| Task 3 → Task 5 | package/detail routes and page components | Compatible: Task 5 extends browser coverage over static and dynamic public routes; no route contract changes. |
| Task 4 → Task 5 | article/detail and contact routes | Compatible: Task 5 covers the positive routes and unknown-slug 404s. |
| Tasks 2–5 → Task 6 | public files, tests and README boundary | Compatible: Task 6 verifies the final exact HEAD and audits scope. |

## Per-task self-consistency scan

| Task | Files vs tests vs produces | Result |
|---|---|---|
| 1 | `src/content/public.ts` supplies every named collection and lookup used by its tests and later pages. | Consistent. |
| 2 | Shared components and route-group layout supply the nav/CTA/footer assertions and preserve one `<main>`. | Consistent. |
| 3 | Package card/detail files consume the Task 1 projection and tests assert exact prices, links and non-binding copy. | Consistent. |
| 4 | Informational routes consume the named content records; examples, articles and FAQ tests target explicit flags/markup. | Consistent. |
| 5 | CSS/decorative component and E2E spec cover all route paths, reduced motion, focus and 404 behavior. | Consistent. |
| 6 | README and final command/audit set cover the completion criteria without introducing runtime setup. | Consistent. |

## Plan rulings

- Ruling: the plan's static contact page uses no invented email address, live form or submission claim because the spec defers the business contact channel and Core owns intake; cost if wrong: contact copy/CTA can be revised without backend migration.
- Ruling: the plan uses CSS-only decorative enhancement rather than adding a 3D/animation dependency because the spec requires progressive enhancement and no paid/unnecessary dependency; cost if wrong: visual treatment may be less expressive until a later approved design pass.

## Execution todo

- [x] Task 1 — typed public content contract
- [x] Task 2 — shared public shell and navigation
- [x] Task 3 — home, services, packages and pricing
- [x] Task 4 — process, examples, FAQ, articles, about and contact
- [x] Task 5 — responsive design, focus and reduced-motion enhancement
- [x] Task 6 — documentation and Public Experience gate
- [x] Final whole-branch review and exact-head verification
- [x] Push feature branch and open Draft PR

Pre-flight: no unresolved interface conflict; dispatch Task 1.

## Task 1 review loop

- Implementer commit: `e36a688 feat: define public experience content contract`.
- Task review: Spec ❌ / quality Needs fixes. Important finding: the shared scope note did not explicitly name deliverables/isporuke or material scope changes before offer acceptance. Minor finding: contract tests could lock more exact content identifiers/paths; deferred without entering the fix loop.
- Fix round 1: `beba701 fix: clarify public scope disclosure`; regression test RED on missing disclosure, focused content/domain tests and typecheck GREEN, full suite 22/22 GREEN.
- Scoped re-review: Important finding ADDRESSED; no new Critical/Important breakage.
- Task 1 minor (deferred): manual review package stated an inaccurate diff-stat line; actual changed files and code were in scope. Cost if wrong: review artifact clarity only; no product behavior impact.
- Task 1: complete (commits `8997d3b..beba701`, review clean; one minor deferred).

## Task 2 review

- Implementer commit: `fcaa3b3 feat: add public experience shell`.
- Task review: semantic shell/CTA/footer implementation approved in substance. Important finding: future CTA/navigation destinations do not exist in the Task 2 intermediate commit.
- Ruling: retain the plan's intentional sequencing — Task 2 creates the shared shell and exact internal destinations; Task 3 creates those destinations and owns the positive-route/404 gate. Do not add placeholder pages or filter required navigation, because either would duplicate or weaken the approved Task 3 surface. Cost if wrong: Task 2 alone is not independently deployable; Task 3's route smoke/build gate is load-bearing and must pass before Task 3 completes.
- Task 2: complete (commits `beba701..fcaa3b3`, one sequencing ruling; carry route-existence gate to Task 3).

## Task 3 blocker investigation

- Reproduced `npm test -- tests/components/shell.test.tsx`: 1 of 3 tests failed because `PublicPage` rendered alone has no `banner`/`main`; the new route-group `src/app/(public)/layout.tsx` owns those landmarks. The failure is deterministic and started after the Task 2 layout extraction.
- Ruling: update the stale shell test to render `PublicLayout` around `PublicPage`, preserving the runtime route architecture and testing the actual layout boundary. Do not re-add header/main to `PublicPage` or weaken/remove the landmark assertions. Cost if wrong: one test fixture may need a different App Router composition, but duplicate runtime shells would be a larger accessibility regression.

## Task 3 review loop

- Implementer commit: `0ac6379 feat: present public services and catalogue`.
- Task review: package/catalogue implementation is sound. Critical finding: Task 2 navigation still points to Task 4-owned informational/contact routes that do not exist at this intermediate commit. Important finding: only the seminarski package had positive E2E coverage.
- Ruling correction: the earlier Task 2 sequencing ruling was too broad. The approved plan assigns `/usluge`, `/paketi`, `/paketi/[slug]` and `/cijene` to Task 3, while `/proces`, `/primjeri`, `/faq`, `/clanci`, `/o-nama` and `/kontakt` belong to Task 4. Task 3 therefore must not add placeholder versions of Task 4 routes; final route completeness is gated after Task 4. Cost if wrong: Task 3's intermediate commit is not independently deployable, but placeholder duplication would weaken the planned ownership boundary.
- Task 3 fix round 1: add positive browser coverage for all five package variants and retain the unknown-package 404 assertion; rerun focused E2E and full Task 3 verification before re-review.
- Scoped re-review: coverage finding ADDRESSED; no new Critical/Important breakage. Critical route observation remains covered by the sequencing ruling and is out of scope for this fix.
- Task 3: complete (commits `fcaa3b3..3696e2d`, one fix round; review clean after corrected sequencing ruling).

## Task 4 review

- Implementer commit: `25d27cd feat: add public informational pages`.
- Task review: Spec compliant and quality approved; all Task 2 informational/contact destinations exist, process/QC/Daniel approval copy, illustrative examples, native FAQ, article 404 and static contact boundary verified from the diff.
- Task 4 minor (deferred): E2E currently covers only the first positive article detail route; add the other two positive article routes if the final whole-branch gate does not already cover them. Cost if wrong: a narrow route regression could escape until final E2E.
- Task 4: complete (commits `3696e2d..25d27cd`, review approved; one minor deferred).

## Task 5 review

- Implementer commit: `c711464 feat: add responsive public visual baseline`.
- Task review: Spec compliant and quality approved. Diff covers all 18 positive public routes, both 404s, 390x844 mobile, reduced motion, single semantic main, CSS-only aria-hidden decoration, focus styles and Croatian metadata; no new dependency or integration.
- Task 5: complete (commits `25d27cd..c711464`, review approved; Task 4 article coverage minor resolved by the full route matrix).

## Task 5 execution

- TDD RED: `npx playwright test tests/e2e/public-experience.spec.ts --grep "public scene|keyboard users"` produced the expected missing `.decorative-scene` failure. The keyboard/CTA assertion was narrowed to the header after the first run showed a real duplicate CTA in the page body; the repeated RED had one expected decorative failure and one keyboard pass.
- GREEN: added no-prop `DecorativeScene`, inserted it into the public layout and implemented CSS-only editorial/responsive/focus/reduced-motion styling. Focused E2E passed 2/2.
- Task 5: complete (commits `25d27cd..c711464`, tests: `npm run test:e2e` → 24/24 pass; `npm run lint` → pass; `git diff --check` → pass).
- Final: self-review only; user explicitly prohibited dispatching reviewers. No Critical/Important finding in the scoped five-file diff. Cost if wrong: a fresh human review may identify visual polish outside the asserted responsive/accessibility baseline.

## Task 6 execution

- Implementer commit: `8e19907 docs: document public experience boundary`.
- README documents the public route inventory, Croatian/demo boundary, exact prices, illustrative-example rule, reduced-motion behavior, absent integrations/actions, and deferred business/legal decisions.
- Initial Task 6 gate report: `npm ci`, lint, typecheck, 33 unit tests, build and 24 E2E passed; the first E2E wrapper timed out after printing 24 passes, and a supervised rerun exited 0. Tracked env audit found only `.env.example`; no secret values were printed. `.superpowers/` remains untracked by design.
- Task 6: complete pending final exact-HEAD verification after review fix.

## Final whole-branch review and fix loop

- Fresh whole-branch review at `8e19907` found no Critical issues and one Important: the public responsible-use copy did not disclose that purpose-built software and AI-assisted tools may be used with human review before delivery. The review also noted the ledger was stale.
- TDD RED: added a component regression test for the required disclosure; `npm test -- tests/components/public.test.tsx` failed 1/12 because the copy was absent.
- GREEN: added the conditional Croatian disclosure to `/usluge`; focused component tests passed 12/12, lint and typecheck passed.
- Fix commit: `956d11e fix: disclose assisted tooling and human review`.
- Scoped re-review of `8e19907..956d11e`: no Critical, Important or Minor findings; prior Important fully addressed; reviewer assessed ready to merge. Full suite observed by reviewer: 34/34 unit tests, lint and typecheck passed.
- Ledger synchronization is this local untracked SDD artifact update; it is intentionally not part of the product branch commits.

## Final exact-HEAD gate

- Final product HEAD: `956d11e22b7bba46f9a809209b30be84496369b3`.
- `npm ci`: PASS, exit 0; added 449 packages, audited 450, 0 vulnerabilities, 7m. Earlier attempts exposed a disk-space failure caused by concurrent installs; only this final exit-0 run is authoritative.
- `npm run lint`: PASS, exit 0.
- `npm run typecheck`: PASS, exit 0.
- `npm test`: PASS, exit 0; 8 files / 34 tests.
- `npm run build`: PASS, exit 0; 23 static pages, public routes plus `/portal` and `/admin`.
- `npm run test:e2e`: PASS, exit 0; 24/24, including mobile, reduced motion, keyboard focus, route matrix, unknown package/article 404s and existing shells.
- `git diff --check`: PASS for worktree and branch range.
- Tracked-file audit: only `.env.example`; no secret value markers; no package/lockfile changes. Integration terms appear only in allowed boundary/docs/test contexts.
- Tracked status is clean; `.superpowers/` is intentionally untracked local evidence.

## GitHub handoff

- Pushed `feat/public-experience` to `origin` at `956d11e22b7bba46f9a809209b30be84496369b3`.
- Opened Draft PR #3: `https://github.com/danielrisavi77-create/tvoj-pisac/pull/3`.
- PR base is the approved stacked plan branch `plan/public-experience`; head is `feat/public-experience`; GitHub confirms `OPEN`, `isDraft: true`, and matching head SHA.
- No merge performed. Stop here until a new explicit instruction.
