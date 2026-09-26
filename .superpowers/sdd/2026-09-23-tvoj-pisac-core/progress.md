# SDD Ledger — Tvoj Pisac Core Platform

## Run identity

- Repository: `danielrisavi77-create/tvoj-pisac`
- Plan branch: `plan/core`
- Planned implementation branch: `feat/core`
- Plan worktree: `C:\Users\PC\Documents\Codex\2026-09-22\tvoj-pisac-core-plan`
- Planned implementation worktree: `C:\Users\PC\Documents\Codex\2026-09-22\tvoj-pisac-core`
- Starting implementation SHA: `956d11e22b7bba46f9a809209b30be84496369b3`
- Current plan commit: pending
- Scope: Phase 3 Core Platform only; no implementation performed on this plan branch.

## Authority check

1. `docs/superpowers/specs/2026-09-22-tvoj-pisac-design.md`
2. `docs/superpowers/plans/2026-09-22-tvoj-pisac-master.md`
3. `docs/superpowers/plans/2026-09-22-tvoj-pisac-foundation.md`
4. `docs/superpowers/plans/2026-09-23-tvoj-pisac-public-experience.md`
5. Phase 3 assumptions only where the documents leave an implementation choice.

No material contradiction requiring a specification amendment was found.

## Pre-flight ledger

- [x] Plan branch is isolated from `main`.
- [x] Plan branch starts from the exact Public Experience HEAD listed above.
- [x] Existing route shells, Foundation domain contracts, environment contract, and test harness inspected.
- [x] Phase boundary recorded: local/test Supabase only; no production secrets, payment, AI, or external integrations.
- [x] Supabase SSR, RLS, local CLI, and package-version risks identified for implementation-time verification.
- [ ] Fresh `feat/core` implementation worktree created from the recorded SHA.
- [ ] Supabase CLI and Docker-compatible local runtime verified.
- [ ] Exact package versions resolved and pinned.
- [ ] Implementation RED/GREEN evidence recorded task-by-task.
- [ ] Exact final SHA verified after all checks.
- [ ] Fresh-context whole-branch review completed.

## Rulings

- R1: Use local Supabase/Auth/Storage and Inbucket only in Phase 3; do not link or push a remote project.
- R2: Use passwordless magic-link PKCE with verified local email before private workspace access.
- R3: Use a private admin-membership relation and narrowly scoped database helper; never use user-editable metadata for authorization.
- R4: Keep offers, payments, accepted-price snapshots, and catalogue price editing out of Core.
- R5: Store structurally validated uploads as private `pending_manual_review`; do not call external processing or scanning services.
- R6: Make CMS content versioned with explicit preview/publish; never expose drafts and never edit prices in Core CMS.
- R7: Use 25 MiB per-file and 100 MiB per-project local/test limits as the explicit Phase 3 test contract.

## Task status

- [ ] Task 1 — local Supabase foundation and typed test harness
- [ ] Task 2 — verified passwordless identity and protected shells
- [ ] Task 3 — projects, intake scope, lifecycle RPCs, and RLS
- [ ] Task 4 — verified client intake and project creation
- [ ] Task 5 — private file validation, quarantine metadata, and Storage RLS
- [ ] Task 6 — client workspace, messages, revisions, quality checks, delivery gate
- [ ] Task 7 — admin authorization, CMS preview/publish, immutable audit
- [ ] Task 8 — documentation, restore exercise, and final gate

## Evidence ledger

Record for every implementation task:

- intended RED command and failure reason;
- minimal GREEN change;
- focused tests and result;
- refactor decision, if any;
- commit SHA;
- exact branch HEAD after verification.

## Final stop conditions

Stop for user direction before proceeding if implementation requires a production credential, paid service, remote Supabase link, security-sensitive authorization exception, destructive data operation, merge, or a specification change.
