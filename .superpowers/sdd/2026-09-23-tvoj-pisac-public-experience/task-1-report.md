# Task 1 report — typed public content contract

## Status

Complete. Phase 2 Task 1 was implemented on `feat/public-experience` using the required RED → GREEN TDD sequence.

## Changed files

- `src/content/public.ts`
  - Added typed public navigation, package catalogue projection, package lookup, process steps, FAQs, illustrative examples, educational articles and page copy.
  - Imported `ProjectKind`, `PROJECT_KIND_LABELS` and `STANDARD_PRICES_EUR` from `@/domain/packages`.
  - Kept `/portal` as a secondary navigation entry and used only internal paths.
  - Used the required package slugs, exact prices, boundary notes, article titles/slugs, example disclaimer and honesty flags.
- `tests/content/public.test.ts`
  - Added tests for the exact price array, unknown package slug, illustrative examples and educational articles.

## Commit

- `e36a688 feat: define public experience content contract`

## Commands and results

1. `npm test -- tests/content/public.test.ts`
   - Expected RED: passed as expected because `@/content/public` was missing.
2. `npm test -- tests/content/public.test.ts tests/domain/packages.test.ts`
   - PASS: 2 test files, 6 tests.
3. `npm run typecheck`
   - PASS: `tsc --noEmit` completed without errors.
4. Final verification: `npm test -- tests/content/public.test.ts tests/domain/packages.test.ts; npm run typecheck`
   - PASS: 2 test files, 6 tests; typecheck passed.
5. `git diff --check`
   - PASS.

## Concerns

- The pre-existing `.superpowers/` SDD artifacts remain untracked and were not included in the implementation commit.
- No new dependency, backend action, auth, checkout, payment, AI, upload or external integration was added.

## Round 1 fix report

### Finding

Important reviewer finding: the package `scopeNote` confirmed scope, deadline, formats and conditions, but did not explicitly disclose deliverables/isporuke or material changes before offer acceptance. The separate Minor coverage suggestion was intentionally not addressed in this round.

### Fix

- Added the binding Croatian disclosure: `Isporuke i sve materijalne izmjene opsega potvrđuju se prije prihvata ponude.`
- Reused the resulting `SCOPE_NOTE` in the process scope-confirmation step and FAQ answer.
- Added a focused regression test covering all package scope notes plus process/FAQ reuse.

### RED

Command: `npm test -- tests/content/public.test.ts`

Result: expected failure. 5 tests ran; 4 passed and the new disclosure test failed because the required wording was absent from package scope notes.

### GREEN

Command: `npm test -- tests/content/public.test.ts tests/domain/packages.test.ts; npm run typecheck`

Result: PASS. 2 test files and 7 tests passed; `tsc --noEmit` passed.

Command: `npm test`

Result: PASS. 7 test files and 22 tests passed.

Command: `git diff --check`

Result: PASS.

### Fix commit

- `beba701 fix: clarify public scope disclosure`
