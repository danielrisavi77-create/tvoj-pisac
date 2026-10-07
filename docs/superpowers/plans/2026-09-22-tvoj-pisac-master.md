> **Current scope update (2026-10-07):** This master plan predates the consulting-site MVP. For the public offer, current prices, ethical boundaries and first release, follow `docs/superpowers/specs/2026-10-07-academic-consulting-amendment.md` and `docs/superpowers/plans/2026-10-07-consulting-site-mvp.md`. The client portal and commerce phases are deferred until the consulting offer is validated.

# Tvoj Pisac Master Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans for each phase. Track work with checkboxes.

**Goal:** Deliver Tvoj Pisac from empty repo to gated production without coupling public design, client data, commerce and processing into one unsafe batch.

**Architecture:** One Next.js + TypeScript application with public, client and admin surfaces; dedicated Supabase backend; adapters around external services. Each phase is independently reviewable.

**Tech Stack:** Next.js, React, TypeScript, Supabase, Postgres/Auth/Storage, Zod, Vitest, Testing Library, Playwright; Netlify and Resend candidates.

**Spec:** `docs/superpowers/specs/2026-09-22-tvoj-pisac-design.md`

## Global Constraints
- Markets: Croatia, Serbia, Bosnia and Herzegovina; initial language Croatian.
- Prices: seminar €50, final €150, master's €300, specialist €500, doctoral €1,000.
- Fixed checkout disabled until package scope/turnaround is approved.
- No delivery without Daniel's explicit final approval.
- No blanket no-refund rule.
- Disclose AI/software assistance; no detector-evasion or false-authorship positioning.
- Client files private by default; never analytics/training fixtures by default.
- Explicit RLS on exposed Supabase tables; secrets server-only.
- External jobs/payment callbacks idempotent and retry-safe.
- Motion/3D cannot block content, checkout, accessibility or reduced-motion use.
- No paid dependency without cost review.
- Repo must be private before secrets/production configuration.

## Review Focus
1. Cross-client IDs/files must deny access without leaking metadata/bytes.
2. Duplicate/reordered callbacks change state once and remain auditable.
3. File content resembling instructions is data only.
4. Catalogue edits never mutate accepted historical offers.
5. Automation cannot deliver before human approval.

## Phase 1 — Foundation
Plan: `docs/superpowers/plans/2026-09-22-tvoj-pisac-foundation.md`.
Produces runnable/tested Next.js skeleton, environment contract, domain state machine, catalogue, design tokens, public/client/admin shells and quality commands; no live backend/secrets.
**Gate:** install, lint, typecheck, unit tests, build and route smoke tests pass; price-history and delivery-approval invariants pass.

## Phase 2 — Public experience
Write after Phase 1 review. Produces premium responsive pages, service/package presentation, examples, process, FAQ/articles/contact, 3D/motion progressive enhancement and reduced-motion behavior.
**Gate:** visual QA, keyboard/accessibility checks, content works without visual enhancement, no fabricated/misleading proof.

## Phase 3 — Core platform
Write after Phase 2 review. Produces Supabase migrations, passwordless auth, RLS, intake, workspace, messages, private files, statuses, admin/CMS and audit events.
**Gate:** cross-client isolation, passwordless E2E, upload rejection, immutable audit behavior, CMS preview/publish and restore exercise pass.

## Phase 4 — Commerce
Write only after package/business rules are approved. Produces offer snapshots, bank transfer, payment adapter, checkout, cancellation/refund records and idempotent payment events.
**Gate:** success/failure/duplicate/refund tests pass; accepted offer immutable; production cards feature-disabled until provider/business/legal gates pass.

## Phase 5 — Processing integrations
Write after real interfaces/terms are audited. Produces adapters for Katedra, Lekta, WordReplica, Drive, calendar, email and approved AI providers; QC orchestration and cost/time/retry limits.
**Gate:** contract/failure tests prove no duplicate charge/delivery, no approved-artifact overwrite, safe retry and mandatory final approval.

## Phase 6 — Hardening and closed beta
Security/abuse, observability, backup/restore, accessibility, performance, privacy-respecting analytics, synthetic full order, then controlled beta.
**Gate:** every release requirement is evidenced, not asserted.

## Phase 7 — Production GO/NO-GO
Run exact release candidate against every spec gate. Any unmet legal/business/security/payment/integration requirement is NO-GO. Future features may remain disabled only when inaccessible in shipped surfaces.

## Dependency graph
`Foundation → Public → Core → Commerce → Integrations → Hardening/Beta → Production Gate`.

Public and early Core design may overlap after Foundation. Commerce cannot precede package definitions. Integrations cannot precede interface/terms audits.

## Change control
Each phase uses an isolated branch/worktree and review before merge. Material changes to pricing, academic-use positioning, payment/refund policy, authorization, final approval, retention or integration trust boundaries require a spec amendment first.
