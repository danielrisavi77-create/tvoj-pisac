# Tvoj Pisac Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans task-by-task. Track steps with checkboxes.

**Goal:** Create a safe, tested application foundation without connecting production services.

**Architecture:** Bootstrap one Next.js App Router app. Keep business rules framework-independent in `src/domain`; route surfaces in `src/app`; environment parsing centralized. No live Supabase, payment, email or AI connection in this phase.

**Tech Stack:** Next.js, React, TypeScript, Zod, Vitest, Testing Library, Playwright, ESLint, npm lockfile.

**Spec:** `docs/superpowers/specs/2026-09-22-tvoj-pisac-design.md`

## Global Constraints
- Croatian initial UI; localization-ready.
- Prices exactly €50/€150/€300/€500/€1,000.
- No checkout or production credentials.
- No delivery without Daniel approval.
- No grade/detector-evasion/false-authorship claims.
- Reduced-motion safe.
- Repo private before secrets.
- Lock dependency versions.

## Review Focus
1. Unknown project status is rejected.
2. Accepted offer retains original price after catalogue changes.
3. Delivery without approval fails.
4. Environment validation never echoes secret values.
5. Public/client/admin shells remain usable without motion/3D.

## File map
`package.json`, lockfile/configs; `src/app` route shells/styles; `src/domain/projects.ts`, `packages.ts`, `approval.ts`; `src/env/schema.ts`; `src/components/shell/*`; `tests/domain/*`; `tests/e2e/routes.spec.ts`; `.env.example`; `README.md`.

### Task 1 — Bootstrap and test harness
**Produces:** npm scripts `dev/build/lint/typecheck/test/test:e2e`; alias `@/*`.

- [ ] Run:
```bash
npx create-next-app@latest . --ts --eslint --app --src-dir --import-alias "@/*" --use-npm
npm install zod
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @playwright/test
```
- [ ] Add scripts `"typecheck":"tsc --noEmit"`, `"test":"vitest run"`, `"test:e2e":"playwright test"`.
- [ ] Configure Vitest jsdom + React plugin + jest-dom.
- [ ] Create failing `tests/smoke/app.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
it("renders product name", () => {
  render(<Home />);
  expect(screen.getByRole("heading",{name:/Tvoj Pisac/i})).toBeInTheDocument();
});
```
- [ ] Run `npm test -- tests/smoke/app.test.tsx`; expect FAIL against generated page.
- [ ] Replace generated home with minimal Croatian `h1` “Tvoj Pisac” + neutral description; no prohibited claims.
- [ ] Run `npm test -- tests/smoke/app.test.tsx && npm run lint && npm run typecheck && npm run build`; expect exit 0.
- [ ] Commit: `git commit -am "chore: bootstrap Tvoj Pisac application"` after staging new files.

### Task 2 — Project lifecycle and final approval
**Files:** create `src/domain/projects.ts`, `src/domain/approval.ts`; tests `tests/domain/projects.test.ts`, `approval.test.ts`.

**Produces:** `ProjectStatus`, `parseProjectStatus()`, `canTransition()`, `assertDeliveryAllowed()`.

- [ ] Write failing tests: `paid→in_progress` and `qc→awaiting_final_approval` true; `lead→delivered` false; unknown status throws.
- [ ] Run `npm test -- tests/domain/projects.test.ts`; expect module-not-found FAIL.
- [ ] Implement explicit statuses: `lead, qualified, offer_pending, offer_accepted, payment_pending, paid, in_progress, waiting_for_client, qc, awaiting_final_approval, delivered, revisions, closed, rejected, cancelled, refunded`. Use explicit transition map, never array ordering.
- [ ] Write failing approval tests:
```ts
expect(()=>assertDeliveryAllowed({
 status:"awaiting_final_approval", qualityComplete:true, approvedByDaniel:false
})).toThrow(/approval/i);
```
Also fail when QC incomplete or status differs.
- [ ] Implement `assertDeliveryAllowed`; only exact status + QC complete + Daniel approval passes.
- [ ] Run domain tests + `npm run typecheck`; expect PASS.
- [ ] Commit `feat: define project lifecycle and delivery gate`.

### Task 3 — Catalogue and immutable offer snapshot
**Files:** `src/domain/packages.ts`, `tests/domain/packages.test.ts`.

**Produces:** `ProjectKind`, `STANDARD_PRICES_EUR`, `OfferSnapshot`, `createOfferSnapshot()`.

- [ ] Write failing test for exact prices: seminar 50, final 150, masters 300, specialist 500, doctoral 1000.
- [ ] Write regression test: snapshot masters at €300; change a copied catalogue object to €350; snapshot remains €300.
- [ ] Run test; expect module-not-found FAIL.
- [ ] Implement readonly catalogue and snapshot containing `projectKind,label,priceEur,currency:"EUR",scopeVersion,acceptedAt`. Use integer euros in Foundation.
- [ ] Run package tests + typecheck; expect PASS.
- [ ] Commit `feat: add versioned service catalogue`.

### Task 4 — Environment contract
**Files:** `src/env/schema.ts`, `.env.example`, `tests/env/schema.test.ts`.

**Produces:** `parseServerEnv(source, mode)`.

- [ ] Write failing tests: production requires valid `NEXT_PUBLIC_APP_URL`; development accepts `http://localhost:3000`; error includes variable name but not supplied value.
- [ ] Run test; expect module-not-found FAIL.
- [ ] Implement with Zod. Foundation schema contains only `NEXT_PUBLIC_APP_URL`; future phases add their own variables.
- [ ] Create `.env.example` containing `NEXT_PUBLIC_APP_URL=http://localhost:3000` and no secrets.
- [ ] Run env tests + typecheck; expect PASS.
- [ ] Commit `chore: define environment contract`.

### Task 5 — Three route surfaces and shared shell
**Files:** `src/components/shell/AppHeader.tsx`, `src/app/(public)/page.tsx`, `src/app/(client)/portal/page.tsx`, `src/app/(admin)/admin/page.tsx`, `src/app/globals.css`, tests.

**Produces:** accessible public, portal and admin shells with no auth/data yet.

- [ ] Write failing component tests for one `main` landmark, product header and correct surface heading.
- [ ] Implement shared header and route shells. Public copy: service explanation only; portal/admin explicitly marked development shell.
- [ ] Add CSS tokens for spacing/type/radius/surface and:
```css
@media (prefers-reduced-motion: reduce) {
 *,*::before,*::after { animation-duration:.01ms!important; animation-iteration-count:1!important; transition-duration:.01ms!important; scroll-behavior:auto!important; }
}
```
- [ ] Configure Playwright webServer `npm run dev`; create `tests/e2e/routes.spec.ts` checking `/`, `/portal`, `/admin` return visible headings and no horizontal overflow at mobile viewport.
- [ ] Run component tests, `npm run test:e2e`, lint, typecheck, build; expect PASS.
- [ ] Commit `feat: add public client and admin shells`.

### Task 6 — Documentation and Foundation gate
**Files:** `README.md`.

- [ ] Document prerequisites, install, dev/test/lint/typecheck/build/E2E commands, no-live-services boundary, spec/plan paths and rule that secrets cannot be committed.
- [ ] Run:
```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
git status --short
```
Expected: all commands exit 0; working tree clean after documentation commit.
- [ ] Search tracked files for common secret prefixes and verify none exist; do not print secret values if any are detected.
- [ ] Commit `docs: document foundation workflow`.
- [ ] Record exact head SHA and use it for Foundation review; do not claim GO from older runs.

## Foundation completion criteria
All six tasks merged/reviewed; exact-head quality commands green; no live service credentials; lifecycle, immutable-price and approval tests green; three route shells build and render; repo private before any next-phase secrets.

## Self-review
Spec coverage for this phase: architecture skeleton, prices, approval invariant, route separation, reduced-motion baseline, testing and no-secret boundary are mapped above. Supabase, payments, uploads, integrations, full accessibility, retention and legal flows are intentionally owned by later phase plans and remain disabled here. No implementation step may invent their deferred decisions.
