# Tvoj Pisac Core Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the local/test-only Core platform for Tvoj Pisac: verified-email passwordless access, intake, private project workspace, lifecycle persistence, messages, private files, admin authorization, CMS preview/publish, and immutable audit evidence.

**Architecture:** Keep the existing Next.js 16 App Router and Foundation domain contracts as the application boundary. Add a local Supabase stack with SQL migrations, Postgres RLS, Auth, and a private Storage bucket; use `@supabase/ssr` cookie sessions and server-side application services so browser code never receives privileged credentials. Mutating lifecycle, intake, file metadata, messaging, CMS publishing, and audit operations are explicit server/RPC contracts with idempotency keys and database-enforced ownership.

**Tech Stack:** Next.js 16.3.5, React 19.2.8, TypeScript, Zod, Vitest, Testing Library, Playwright, Supabase CLI/local Postgres/Auth/Storage, `@supabase/supabase-js`, `@supabase/ssr`, `fflate` for bounded OOXML inspection, and generated Supabase TypeScript types. Supabase package versions and the `fflate` version are resolved from the current registry at implementation start and pinned exactly.

**Spec:** `docs/superpowers/specs/2026-09-22-tvoj-pisac-design.md`, governed by `docs/superpowers/plans/2026-09-22-tvoj-pisac-master.md` and constrained by `docs/superpowers/plans/2026-09-22-tvoj-pisac-foundation.md` and `docs/superpowers/plans/2026-09-23-tvoj-pisac-public-experience.md`.

## Global Constraints

- Preserve the Foundation project statuses exactly: `lead`, `qualified`, `offer_pending`, `offer_accepted`, `payment_pending`, `paid`, `in_progress`, `waiting_for_client`, `qc`, `awaiting_final_approval`, `delivered`, `revisions`, `closed`, `rejected`, `cancelled`, `refunded`.
- Preserve the exact catalogue prices: seminar €50, završni €150, diplomski/master's €300, specijalistički €500, doktorski €1,000.
- `Delivered` remains impossible unless the persisted project is in `awaiting_final_approval`, all required quality checks are complete, and Daniel has explicitly approved final delivery.
- Unknown project statuses are rejected by both the TypeScript domain boundary and the database check constraint.
- Phase 3 uses Supabase only as a local/test dependency. It does not link a remote project, deploy migrations, configure production email, add production secrets, or claim production readiness.
- No checkout, payment processor, `offers`/payment workflow, AI API, Katedra, Lekta, WordReplica, Drive, calendar, external email, analytics, or processing integration is implemented in this phase. Local Supabase Auth mail and Inbucket are development infrastructure only.
- A verified email is required before a client can submit the final intake or access private workspace data. Passwords are not introduced.
- Client files are private, size-limited, allowlisted, validated beyond their filename extension, and treated as untrusted data. Executables, arbitrary archives, macro-enabled Office files, malformed containers, and oversized files are rejected.
- Uploaded file contents are data only; they cannot override system instructions, authorization rules, validation policy, or application behavior.
- Every exposed table has explicit RLS and grants. Client policies use the authenticated user identity and project ownership; admin policies use a server-controlled private membership relation. No user-editable `user_metadata` decides authorization, and no service-role key is sent to or read by browser code.
- Every `UPDATE` policy has both an ownership/admin `USING` predicate and a matching `WITH CHECK` predicate; policies are scoped to `authenticated` or the intentionally public published-content read path.
- Published CMS content is the only CMS content visible to public readers. Draft content is admin-only. Core CMS does not edit catalogue prices or accepted offers.
- The existing Foundation and Public Experience copy stays truthful: purpose-built software or AI-assisted tools may be disclosed where used, human review remains explicit, and no authorship, institutional acceptance, client result, qualification, or testimonial is invented.
- All new state-changing operations are retry-safe and idempotent. A retry cannot duplicate an intake project, message, file metadata row, audit event, publish action, charge, or delivery record.
- Do not modify `main`, force-push, merge a branch, delete the authoritative documents, or commit `.env`, tokens, API keys, service-role keys, private certificates, or generated local credentials.

## Review Focus

- **Cross-tenant access:** Client A must never read, write, download, or infer Client B's project, message, file metadata, delivery, revision, or audit data; pin this in `supabase/tests/002_rls_core.sql` and the later workspace E2E `tests/e2e/core-isolation.spec.ts`.
- **Fail-closed authorization:** An anonymous user, an unverified user, and a client without admin membership must be redirected or rejected before private data or admin mutations; pin this in `tests/e2e/core-auth.spec.ts` and the admin policy tests.
- **Upload confusion and abuse:** Extension/MIME disagreement, forged magic bytes, macro-enabled OOXML, executable content, arbitrary archives, ZIP bombs, and size limits must reject before Storage persistence; pin this in `tests/server/file-validation.test.ts` and `tests/e2e/core-files.spec.ts`.
- **Replay and concurrency:** Replaying an intake, status transition, message, upload registration, or CMS publish request with the same idempotency key must return the original result without a duplicate row or transition; pin each operation's application-service test and SQL unique constraint test.
- **Lifecycle safety:** Invalid status transitions, incomplete quality checks, missing Daniel approval, and unknown statuses must fail closed; pin this in `tests/domain/projects.test.ts`, `tests/server/lifecycle.test.ts`, and `tests/e2e/admin-delivery-gate.spec.ts`.

## Starting Point, Rulings, and Phase Boundary

Implementation begins only after creating a fresh `feat/core` worktree from the exact Public Experience HEAD `956d11e22b7bba46f9a809209b30be84496369b3`. The plan-only branch is `plan/core`; no implementation is performed on that branch.

The authoritative order is design specification > master plan > Foundation plan > Public Experience plan > assumptions. No contradiction was found that requires changing the approved design. The following rulings make the inherited boundaries executable:

1. **Local Supabase and SSR:** Phase 3 uses the official Supabase SSR cookie pattern through an adapter isolated under `src/lib/supabase/`. Exact package versions are resolved from the current registry at implementation start, installed with `--save-exact`, and recorded in `package-lock.json`; no guessed version is embedded in this plan. The app has no service-role environment variable or service-role code path.
2. **Authentication:** The first Core flow is passwordless magic-link authentication with PKCE and a verified local email inbox. The callback exchanges the code for a cookie session. Password login, password reset, production SMTP, and account recovery policy are outside this phase.
3. **Authorization:** `auth.users` is the identity source; `client_profiles.user_id` is the client ownership key. Admin access is decided by `private.admin_memberships` through a tightly scoped `private.is_admin()` function with a fixed `search_path`; it is not decided by client-editable metadata. The function is granted only the minimum execution permission needed by RLS and is included in the security review.
4. **Commerce separation:** Core persists an intake request and project scope, but does not create or mutate `offers`, `payments`, accepted-price snapshots, checkout state, or price CMS records. The Foundation catalogue remains the read-only public price source until the Commerce phase has approved package scope, legal copy, payment, and refund rules.
5. **File quarantine:** Phase 3 validates structure and policy, stores metadata, and marks accepted uploads `pending_manual_review`; it does not run AI, Katedra, Lekta, WordReplica, or malware-provider processing. A file that is structurally accepted is still untrusted and cannot cause automated processing or delivery.
6. **CMS surface:** Phase 3 implements versioned text/content pages with draft, preview, publish, and audit behavior. Existing static Public Experience content remains the safe fallback for pages without a published CMS version. No draft is ever a public fallback, and CMS price editing is deliberately absent.
7. **Local limits:** The Core contract uses a 25 MiB per-file limit and a 100 MiB per-project aggregate limit in local/test configuration. These are explicit test limits, not a production capacity decision.

## Pre-flight Before Implementation

The implementer must complete these checks in a new worktree before Task 1:

1. Confirm the source worktree is clean and record `git rev-parse HEAD`, branch, and `git status --short` for `feat/public-experience`.
2. Create `C:\Users\PC\Documents\Codex\2026-09-22\tvoj-pisac-core` on branch `feat/core` from `956d11e22b7bba46f9a809209b30be84496369b3`; record that SHA in the SDD ledger.
3. Read all four authoritative documents named above, inspect the existing `portal`, `admin`, environment, test, and package files, and confirm no production Supabase project is linked.
4. Discover local tool support before changing dependencies: `supabase --version`, `supabase --help`, `supabase migration new --help`, `supabase test db --help`, `docker version`, `npm view @supabase/supabase-js version`, and `npm view @supabase/ssr version`. If Docker-compatible local infrastructure or the CLI is unavailable, record the blocker instead of substituting a mock for the RLS gate.
5. Create `.superpowers/sdd/2026-09-23-tvoj-pisac-core/progress.md` with the starting SHA, rulings, task checklist, RED/GREEN evidence, exact test SHAs, review findings, and final gate evidence.

Implementation-time reference set: Supabase [server-side Auth](https://supabase.com/docs/guides/auth/server-side), [local CLI workflows](https://supabase.com/docs/guides/local-development/cli-workflows), and [RLS policies](https://supabase.com/docs/guides/database/postgres/row-level-security). The implementer must re-check these official pages and the installed CLI help before changing package versions or migration commands.

## File Map

The implementation uses these focused boundaries. A task may add a test file beside a listed source file, but it must not move the Foundation domain contracts without a documented ruling.

**Local infrastructure and database**

- Create `supabase/config.toml`: generated local-only CLI configuration with Auth, Storage, Inbucket, and the private `project-files` bucket; no remote project reference.
- Create `supabase/seed.sql`: the local-only seed entrypoint; identity, project, and CMS fixtures are added when their migrations exist, and the final seed contains no real personal data.
- Create `supabase/migrations/202609230001_core_identity_and_helpers.sql`: client profiles, private admin membership, `is_admin()`, and shared timestamp helpers.
- Create `supabase/migrations/202609230002_core_projects_and_lifecycle.sql`: leads, projects, project scopes, quality checks, deliveries, revision requests, audit events, exact status constraints, indexes, RLS, and lifecycle RPCs.
- Create `supabase/migrations/202609230003_core_messages_and_files.sql`: project messages, file metadata, storage policies, upload registration/finalization RPCs, and RLS.
- Create `supabase/migrations/202609230004_core_content_and_cms.sql`: versioned content pages, draft/preview/publish RPCs, CMS policies, and public published-content read policy.
- Create `supabase/tests/001_identity.sql`, `supabase/tests/002_rls_core.sql`, `supabase/tests/003_storage_and_files.sql`, and `supabase/tests/004_cms_and_audit.sql`: database-level isolation, grants, immutability, and replay tests.

**Application adapters and domain services**

- Modify `src/env/schema.ts` and `.env.example`: validate local Supabase URL and publishable key without adding a service-role secret.
- Create `src/lib/supabase/browser.ts`, `src/lib/supabase/server.ts`, and `src/lib/supabase/database.types.ts`: typed browser/server clients and generated database types.
- Create `src/proxy.ts`: refresh the cookie session and protect `/portal` and `/admin` without turning the proxy into an authorization decision-maker.
- Create `src/domain/core.ts`: Zod input schemas, upload result types, actor types, and narrow DTOs shared by server services and tests.
- Create `src/server/auth/session.ts`: verified-session lookup, sign-in redirect validation, and auth callback helpers.
- Create `src/server/core/intake.ts`, `projects.ts`, `messages.ts`, `files.ts`, `content.ts`, `audit.ts`, and `admin.ts`: server-only application services with explicit idempotency parameters.
- Create `src/server/core/file-validation.ts`: pure extension, MIME, magic-byte, OOXML, archive, and size validation.
- Create `src/content/cms.ts`: published-page lookup with static fallback and no draft leakage.

**Routes and components**

- Create `src/app/(auth)/prijava/page.tsx` and `src/components/auth/SignInForm.tsx`.
- Create `src/app/auth/callback/route.ts`.
- Modify `src/app/(client)/portal/page.tsx` and create `src/app/(client)/portal/layout.tsx`, `portal/zahtjev/page.tsx`, `portal/zahtjev/actions.ts`, and `portal/projekti/[id]/page.tsx`.
- Create `src/components/client/IntakeForm.tsx`, `ProjectStatusTimeline.tsx`, `MessageThread.tsx`, and `FileUploader.tsx`.
- Modify `src/app/(admin)/admin/page.tsx` and create `src/app/(admin)/admin/layout.tsx`, `admin/projekti/[id]/page.tsx`, `admin/sadrzaj/page.tsx`, and `admin/sadrzaj/[slug]/page.tsx`.
- Create `src/components/admin/AdminNav.tsx`, `ContentEditor.tsx`, and `DeliveryApprovalPanel.tsx`.
- Keep `src/components/shell/AppHeader.tsx` as the shared authenticated shell and extend it only with links that are backed by the current user's authorization.

**Tests and operational documentation**

- Create `tests/server/supabase-adapters.test.ts`, `auth.test.ts`, `intake.test.ts`, `lifecycle.test.ts`, `file-validation.test.ts`, `messages.test.ts`, and `content.test.ts`.
- Create `tests/e2e/core-auth.spec.ts`, `core-intake.spec.ts`, `core-isolation.spec.ts`, `core-files.spec.ts`, `core-messages.spec.ts`, `admin-cms.spec.ts`, and `admin-delivery-gate.spec.ts`.
- Modify `tests/e2e/routes.spec.ts` and `playwright.config.ts` for local Core prerequisites while retaining the Public Experience route matrix.
- Create `scripts/core/verify-local-core.mjs` and `scripts/core/restore-exercise.mjs` using the locally discovered CLI command forms; both fail closed when local infrastructure or command output is missing.
- Create `docs/core/phase3-core.md`, `docs/core/local-supabase.md`, and `docs/core/security-boundary.md`; modify `README.md` only to describe the completed Core boundary and local-only setup.

---

### Task 1: Local Supabase foundation and typed test harness

**Files:**
- Create: `supabase/config.toml`, `supabase/seed.sql`
- Modify: `package.json`, `package-lock.json`, `.env.example`, `src/env/schema.ts`, `playwright.config.ts`
- Create: `src/lib/supabase/browser.ts`, `src/lib/supabase/server.ts`, `src/lib/supabase/database.types.ts` (generated after the first schema migration and regenerated after every migration)
- Test: `tests/server/supabase-adapters.test.ts`, `tests/env/schema.test.ts`

**Interfaces:**
- `parseCoreEnv(source: Record<string, unknown>, mode: EnvironmentMode): CoreEnvironment`
- `createBrowserSupabaseClient(): SupabaseClient<Database>`
- `createServerSupabaseClient(): Promise<SupabaseClient<Database>>`
- `CoreEnvironment = { NEXT_PUBLIC_APP_URL: string; NEXT_PUBLIC_SUPABASE_URL: string; NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: string }`

- [ ] **Step 1: Write the failing tests for the environment and adapters.**

```ts
it("rejects a missing Supabase URL or publishable key", () => {
  expect(() => parseCoreEnv({ NEXT_PUBLIC_APP_URL: "http://localhost:3210" }, "development"))
    .toThrow("NEXT_PUBLIC_SUPABASE_URL");
});

it("does not expose a service-role client contract", () => {
  const result = parseCoreEnv({
    NEXT_PUBLIC_APP_URL: "http://localhost:3210",
    NEXT_PUBLIC_SUPABASE_URL: "http://127.0.0.1:54321",
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "local-publishable-key",
  }, "development");
  expect(result).not.toHaveProperty("SUPABASE_SERVICE_ROLE_KEY");
});
```

The adapter test must also assert that the browser factory receives the public URL and publishable key and that the server factory reads the same public key through the request-cookie adapter.

- [ ] **Step 2: Run the focused tests and confirm the intended RED.**

Run: `npm test -- tests/server/supabase-adapters.test.ts tests/env/schema.test.ts`

Expected: FAIL because the Core environment contract and Supabase factories do not exist. A missing CLI or missing local stack is not an acceptable substitute for this intended application RED.

- [ ] **Step 3: Add the local-only Supabase harness and minimal typed adapters.**

Run `supabase init` only in the isolated worktree, inspect the generated config with `supabase --help`, and configure local Auth, Inbucket, and the private `project-files` bucket. Resolve the current package versions with `npm view`, install both Supabase packages and `fflate` with `npm install --save-exact`, start the local stack, generate the initial `database.types.ts` with `supabase gen types typescript --local`, and add scripts for `supabase:start`, `supabase:stop`, `supabase:reset`, and `supabase:test`. Regenerate the types after each schema task and treat the generated output as read-only.

The public client must use the browser-safe publishable key. The server client must use request cookies and the same publishable key; it must not import or reference a service-role key.

```ts
export function createBrowserSupabaseClient(): SupabaseClient<Database> {
  return createBrowserClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
}

export async function createServerSupabaseClient(): Promise<SupabaseClient<Database>> {
  const cookieStore = await cookies();
  return createServerClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server-component reads cannot mutate cookies; src/proxy.ts refreshes the session.
        }
      },
    },
  });
}
```

The implementation must use the exact cookie adapter required by the installed `@supabase/ssr` release and keep the documented server-component cookie-refresh behavior explicit in the adapter test.

- [ ] **Step 4: Run the focused tests and local configuration checks.**

Run: `npm test -- tests/server/supabase-adapters.test.ts tests/env/schema.test.ts`, `npm run lint`, and `npm run typecheck`.

Expected: PASS. Run `supabase start`, verify the local URL and mail inbox endpoint, and confirm `supabase status` reports a local project without a linked remote reference.

- [ ] **Step 5: Commit the harness.**

```bash
git add package.json package-lock.json .env.example src/env/schema.ts src/lib/supabase supabase/config.toml supabase/seed.sql playwright.config.ts tests/server/supabase-adapters.test.ts tests/env/schema.test.ts
git commit -m "feat: add local Supabase Core harness"
```

---

### Task 2: Verified passwordless identity and protected shells

**Files:**
- Create: `supabase/migrations/202609230001_core_identity_and_helpers.sql`, `supabase/tests/001_identity.sql`
- Create: `src/proxy.ts`, `src/server/auth/session.ts`, `src/server/core/admin.ts`, `src/app/(auth)/prijava/page.tsx`, `src/app/auth/callback/route.ts`, `src/components/auth/SignInForm.tsx`
- Modify: `src/app/(client)/portal/page.tsx`, `src/app/(admin)/admin/page.tsx`, `src/components/shell/AppHeader.tsx`, `supabase/seed.sql`
- Test: `tests/server/auth.test.ts`, `tests/e2e/core-auth.spec.ts`

**Interfaces:**
- `getVerifiedSession(): Promise<{ userId: string; email: string } | null>`
- `getVerifiedSessionOrThrow(): Promise<{ userId: string; email: string }>`
- `assertSafeRedirect(next: string | null): string`
- `requestMagicLink(email: string, next: string): Promise<{ accepted: true }>`
- `assertAdminSession(): Promise<{ userId: string; email: string }>`
- `public.current_user_is_admin(): boolean` RPC with authenticated-only execution
- `private.is_admin(): boolean` in SQL, with no user-supplied arguments

- [ ] **Step 1: Write failing SQL, unit, and E2E tests for identity boundaries.**

```ts
it("accepts only same-origin relative redirects", () => {
  expect(assertSafeRedirect("/portal")).toBe("/portal");
  expect(() => assertSafeRedirect("https://evil.example/steal"))
    .toThrow("Unsafe redirect");
});

test("anonymous access to the portal redirects to passwordless sign-in", async ({ page }) => {
  await page.goto("/portal");
  await expect(page).toHaveURL(/\/prijava\?next=%2Fportal/);
});
```

The SQL test must fail before the migration because `client_profiles`, `private.admin_memberships`, and `private.is_admin()` do not exist. The E2E test must cover an unverified/absent session, a verified magic-link session from local Inbucket, and a non-admin attempt to open `/admin`.

- [ ] **Step 2: Run the tests to verify the intended RED.**

Run: `supabase db reset`, `supabase test db`, `npm test -- tests/server/auth.test.ts`, and `npm run test:e2e -- tests/e2e/core-auth.spec.ts`.

Expected: SQL and application tests fail because the identity migration and routes are absent; the E2E command must not be treated as meaningful until local Supabase and the app are running.

- [ ] **Step 3: Implement the identity migration and session boundary.**

Create `client_profiles` keyed by `auth.users.id`, with only server-populated email/name fields and timestamps. Create `private.admin_memberships(user_id uuid primary key references auth.users(id), created_at timestamptz not null default now())`. Define `private.is_admin()` as a `SECURITY DEFINER` function with `SET search_path = private, pg_temp`, no arguments, and a single `auth.uid()` lookup; revoke broad execution and grant only the role required by authenticated RLS evaluation.

```sql
create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = private, pg_temp
as $$
  select exists (
    select 1 from private.admin_memberships
    where user_id = auth.uid()
  );
$$;

revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to authenticated;
```

Expose only a no-argument `public.current_user_is_admin()` wrapper to the authenticated server client so `assertAdminSession()` can check the result; the wrapper must call `private.is_admin()`, disclose no membership rows, and have no grant to `anon`.

Create the sign-in page and callback route using the installed Supabase SSR API. The callback must reject unsafe `next` values, exchange the one-time code, refresh the session, and redirect to the validated relative path. `getVerifiedSessionOrThrow()` wraps the nullable lookup for server actions. `assertAdminSession()` calls the authenticated-only `public.current_user_is_admin()` RPC after the session lookup. `src/proxy.ts` may refresh cookies and redirect missing sessions, but every page/server action must still call `getVerifiedSession()` or an admin assertion before querying data.

- [ ] **Step 4: Run identity tests and inspect policy behavior.**

Run: `supabase db reset`, `supabase test db`, `npm test -- tests/server/auth.test.ts`, `npm run typecheck`, and `npm run test:e2e -- tests/e2e/core-auth.spec.ts`.

Expected: PASS for magic-link callback/session refresh, safe redirects, anonymous portal redirect, verified private shell access, and non-admin admin denial. No production SMTP or remote Auth call is allowed.

- [ ] **Step 5: Commit the identity boundary.**

```bash
git add supabase/migrations/202609230001_core_identity_and_helpers.sql supabase/tests/001_identity.sql supabase/seed.sql src/proxy.ts src/server/auth src/app/(auth) src/app/auth src/components/auth src/app/(client)/portal/page.tsx src/app/(admin)/admin/page.tsx src/components/shell/AppHeader.tsx tests/server/auth.test.ts tests/e2e/core-auth.spec.ts
git commit -m "feat: add verified passwordless Core access"
```

---

### Task 3: Projects, intake scope persistence, lifecycle RPCs, and RLS

**Files:**
- Create: `supabase/migrations/202609230002_core_projects_and_lifecycle.sql`, `supabase/tests/002_rls_core.sql`
- Create: `src/domain/core.ts`, `src/server/core/projects.ts`, `src/server/core/audit.ts`
- Test: `tests/domain/core.test.ts`, `tests/server/lifecycle.test.ts`
- Modify: `tests/domain/projects.test.ts`

**Interfaces:**
- `type ActorContext = { userId: string; kind: "client" | "admin" }`
- `transitionProjectStatus(projectId: string, expectedFrom: ProjectStatus, next: ProjectStatus, actor: ActorContext, idempotencyKey: string): Promise<ProjectSummary>`
- `assertProjectOwner(projectId: string, actor: ActorContext): Promise<void>`
- `ProjectSummary = { id: string; status: ProjectStatus; projectKind: ProjectKind; topic: string; faculty: string }`
- `projectSummarySchema: z.ZodType<ProjectSummary>`

The migration must define `leads`, `projects`, `project_scopes`, `quality_checks`, `deliveries`, `revision_requests`, and `audit_events`. `projects.status` and all status history values use a check constraint containing exactly the Foundation statuses. `project_scopes` stores requested intake scope only; it has no accepted price, payment, checkout, or offer snapshot column. Ownership is represented by `client_profile_id` and indexed for RLS.

- [ ] **Step 1: Write failing domain, SQL-isolation, and lifecycle tests.**

```ts
it("rejects an unknown persisted status", () => {
  expect(() => parseProjectStatus("approved")).toThrow("Unknown project status");
});

it("does not allow a direct unsafe transition", () => {
  expect(canTransition("lead", "delivered")).toBe(false);
});
```

The SQL test creates two client identities and one admin identity, then asserts Client A cannot select, update, delete, or invoke a mutation against Client B's project. It also asserts a repeated lifecycle idempotency key produces one status transition and one audit event, and that the database rejects an unknown status. The audit event is visible only to the owning client for its own project and to an admin.

- [ ] **Step 2: Run the tests and confirm the intended RED.**

Run: `npm test -- tests/domain/core.test.ts tests/domain/projects.test.ts tests/server/lifecycle.test.ts` and `supabase test db`.

Expected: TypeScript tests fail because Core DTOs/services are absent, and SQL tests fail because the tables, policies, and RPCs are absent.

- [ ] **Step 3: Implement the migration, RLS, and lifecycle service.**

Use explicit `TO authenticated` policies with `(select auth.uid())`-based ownership predicates and separate admin policies. Do not write broad `USING (true)` policies. Give clients select access to their own project records, insert access only through the intake RPC, and no direct status update/delete access. Give admins the minimum read/write access required by the admin routes. Create `audit_events` in this migration, because the lifecycle RPC writes its audit record in the same transaction.

Implement the lifecycle RPC as a guarded, idempotent transaction: lock the project row, compare `expected_from`, validate both statuses through the same explicit transition map, insert one audit event keyed by `(actor_user_id, idempotency_key)`, update the project, and return the resulting summary. A replay returns the original result; a different `next` value with the same key fails rather than silently changing history.

```ts
export async function transitionProjectStatus(
  projectId: string,
  expectedFrom: ProjectStatus,
  next: ProjectStatus,
  actor: ActorContext,
  idempotencyKey: string,
): Promise<ProjectSummary> {
  parseProjectStatus(expectedFrom);
  parseProjectStatus(next);
  if (!canTransition(expectedFrom, next)) throw new Error("Invalid project transition");
  const session = await getVerifiedSession();
  if (!session || session.userId !== actor.userId) throw new Error("Session mismatch");
  const client = await createServerSupabaseClient();
  const { data, error } = await client.rpc("transition_project_status", {
    p_project_id: projectId,
    p_expected_from: expectedFrom,
    p_next_status: next,
    p_idempotency_key: idempotencyKey,
  });
  if (error) throw error;
  return projectSummarySchema.parse(data);
}
```

The database function must never trust an actor ID sent by the browser; it derives the authenticated user from `auth.uid()` and checks admin membership in the private schema.

- [ ] **Step 4: Run unit, SQL, and policy checks.**

Run: `supabase db reset`, `supabase test db`, `npm test -- tests/domain/core.test.ts tests/domain/projects.test.ts tests/server/lifecycle.test.ts`, `npm run lint`, and `npm run typecheck`.

Expected: PASS for exact statuses, valid/invalid transitions, duplicate idempotency handling, client isolation, admin access, and audit creation. Run the Supabase security/performance advisors supported by the installed CLI and fix any RLS, missing-index, or exposed-function finding before committing.

- [ ] **Step 5: Commit the project persistence boundary.**

```bash
git add supabase/migrations/202609230002_core_projects_and_lifecycle.sql supabase/tests/002_rls_core.sql src/domain/core.ts src/server/core/projects.ts src/server/core/audit.ts tests/domain/core.test.ts tests/domain/projects.test.ts tests/server/lifecycle.test.ts
git commit -m "feat: persist projects with lifecycle RLS"
```

---

### Task 4: Verified client intake and project creation

**Files:**
- Create: `src/server/core/intake.ts`, `src/app/(client)/portal/zahtjev/page.tsx`, `src/app/(client)/portal/zahtjev/actions.ts`, `src/components/client/IntakeForm.tsx`, `tests/server/fixtures.ts`
- Modify: `supabase/migrations/202609230002_core_projects_and_lifecycle.sql`
- Test: `tests/server/intake.test.ts`, `tests/e2e/core-intake.spec.ts`
- Modify: `src/domain/core.ts`, `src/app/(client)/portal/page.tsx`

**Interfaces:**
- `IntakeInput = { projectKind: ProjectKind; topic: string; faculty: string; requestedScope?: string; deadline?: string | null; }`
- `intakeInputSchema: z.ZodType<IntakeInput>`
- `createProjectFromLead(input: IntakeInput, actor: ActorContext, idempotencyKey: string): Promise<ProjectSummary>`
- `submitIntake(input: IntakeInput, idempotencyKey: string): Promise<ProjectSummary>`

The required client fields are project type, topic, and faculty/institution. Optional description/scope and deadline are stored as requested scope, not as an offer. The form must state that submission starts manual qualification and does not accept a price, create a payment obligation, or promise institutional acceptance.

- [ ] **Step 1: Write failing validation, retry, and browser tests.**

```ts
const validInput: IntakeInput = {
  projectKind: "seminar",
  topic: "Utjecaj digitalnih alata na akademsko pisanje",
  faculty: "Filozofski fakultet",
  requestedScope: "Strukturiranje poglavlja i plan provjere izvora",
  deadline: null,
};
const key = "11111111-1111-4111-8111-111111111111";

it("requires project type, topic, and faculty", () => {
  expect(intakeInputSchema.safeParse({ projectKind: "seminar", topic: "", faculty: "" }).success)
    .toBe(false);
});

it("does not create a second project when the request is replayed", async () => {
  const first = await submitIntake(validInput, key);
  const second = await submitIntake(validInput, key);
  expect(second.id).toBe(first.id);
});
```

The E2E test signs in through local Inbucket, submits one valid request, verifies the `lead` status and project summary, rejects missing required fields, and proves an anonymous browser cannot submit the form.

- [ ] **Step 2: Run the focused tests and confirm RED.**

Run: `npm test -- tests/server/intake.test.ts` and `npm run test:e2e -- tests/e2e/core-intake.spec.ts`.

Expected: FAIL because the schema, service, route, and form do not exist.

- [ ] **Step 3: Implement the server-owned intake flow.**

Parse all form data with the shared Zod schema, trim strings, enforce bounded lengths, normalize the project kind through `PROJECT_KIND_LABELS`, and reject an invalid deadline format without rejecting a valid future or past date solely on capacity assumptions. The server obtains the verified session and sends only validated data plus a UUID idempotency key to the guarded database RPC.

```ts
export async function submitIntake(
  input: IntakeInput,
  idempotencyKey: string,
): Promise<ProjectSummary> {
  const session = await getVerifiedSessionOrThrow();
  const parsed = intakeInputSchema.parse(input);
  return createProjectFromLead(parsed, { userId: session.userId, kind: "client" }, idempotencyKey);
}
```

The portal page must load only the current client's projects and link to a project detail route. It must not show another user's records on an empty/error response, and it must not display a guessed offer price.

- [ ] **Step 4: Run intake verification.**

Run: `supabase db reset`, `npm test -- tests/server/intake.test.ts`, `npm run test:e2e -- tests/e2e/core-intake.spec.ts`, `npm run lint`, and `npm run typecheck`.

Expected: PASS for required-field validation, verified-session gating, one-project replay behavior, Croatian scope disclosure, and `lead` creation without checkout or payment state.

- [ ] **Step 5: Commit the intake slice.**

```bash
git add supabase/migrations/202609230002_core_projects_and_lifecycle.sql src/domain/core.ts src/server/core/intake.ts src/app/(client)/portal/zahtjev src/components/client/IntakeForm.tsx src/app/(client)/portal/page.tsx tests/server/intake.test.ts tests/server/fixtures.ts tests/e2e/core-intake.spec.ts
git commit -m "feat: add verified client intake"
```

---

### Task 5: Private file validation, quarantine metadata, and Storage RLS

**Files:**
- Modify: `supabase/migrations/202609230003_core_messages_and_files.sql`, `supabase/config.toml`
- Create: `supabase/tests/003_storage_and_files.sql`, `src/server/core/file-validation.ts`, `src/server/core/files.ts`, `src/components/client/FileUploader.tsx`
- Test: `tests/server/file-validation.test.ts`, `tests/e2e/core-files.spec.ts`
- Modify: `src/app/(client)/portal/projekti/[id]/page.tsx`

**Interfaces:**
- `validateUpload(input: { fileName: string; mimeType: string; sizeBytes: number; bytes: Uint8Array }): UploadValidationResult`
- `ValidatedUpload = { fileName: string; sizeBytes: number; normalizedMime: string; bytes: Uint8Array }`
- `registerProjectFile(projectId: string, input: ValidatedUpload, idempotencyKey: string): Promise<FileSummary>`
- `fileSummarySchema: z.ZodType<FileSummary>`
- `createPrivateDownloadUrl(fileId: string): Promise<string>` with a maximum 300-second expiry
- `UploadValidationResult = { ok: true; extension: UploadExtension; normalizedMime: string } | { ok: false; code: UploadRejectionCode; message: string }`

Allow only DOCX, PDF, XLSX, CSV, PPTX, TXT, JPG/JPEG, PNG, GIF, and WEBP. Reject `.exe`, scripts, arbitrary `.zip`/`.rar`/`.7z`, macro-enabled Office extensions, MIME/extension conflicts, bad magic bytes, malformed OOXML, files over 25 MiB, and projects over 100 MiB. OOXML inspection must reject `vbaProject.bin`, ActiveX, and embedded arbitrary binaries before metadata registration. Store objects under a generated path such as `<user-id>/<project-id>/<file-id>`, never under a user-controlled filename, in a non-public bucket.

- [ ] **Step 1: Write the failing pure validator and isolation tests.**

```ts
const invalidFileFixture = (fileName: string) => ({
  fileName,
  mimeType: "application/octet-stream",
  sizeBytes: 4,
  bytes: new Uint8Array([0x4d, 0x5a, 0x21, 0x21]),
});
const utf8 = (value: string) => new TextEncoder().encode(value);

it.each(["virus.exe", "macro.docm", "payload.zip", "script.js"])(
  "rejects unsupported file %s",
  (fileName) => {
    expect(validateUpload(invalidFileFixture(fileName))).toMatchObject({ ok: false });
  },
);

it("rejects a PDF filename whose bytes are not a PDF", () => {
  expect(validateUpload({ fileName: "work.pdf", mimeType: "application/pdf", sizeBytes: 4, bytes: utf8("MZ!!") }))
    .toMatchObject({ ok: false, code: "magic_bytes_mismatch" });
});
```

The SQL test must prove a client can access only its own object prefix and metadata, cannot make the bucket public, and cannot create a file row for another client's project.

- [ ] **Step 2: Run the focused tests and confirm RED.**

Run: `npm test -- tests/server/file-validation.test.ts` and `supabase test db`.

Expected: FAIL because the validator, file table, storage bucket, policies, and registration service do not exist.

- [ ] **Step 3: Implement the validator and private Storage contract.**

Use a pure validator before any Storage upload. Compare normalized extension and MIME, inspect signatures for PDF/PNG/JPEG/GIF/WEBP, require UTF-8/no-NUL content for TXT/CSV, and use `fflate` only after a central-directory budget check to inspect OOXML package entries with an exact expansion/entry budget before accepting DOCX/XLSX/PPTX. Reject macro/ActiveX/embedded binary entries and reject arbitrary archives even when the first bytes look like ZIP. Use the explicit 25 MiB file and 100 MiB project limits from this plan.

Create `files` metadata with owner/project foreign keys, safe display name, generated object path, byte size, normalized MIME, validation status (`pending_manual_review` or `rejected`), and idempotency key. The registration RPC must check project ownership, insert one metadata row, and return a private signed URL only after the same ownership check. No public bucket policy or direct cross-project object path is allowed.

```ts
export async function registerProjectFile(
  projectId: string,
  input: ValidatedUpload,
  idempotencyKey: string,
): Promise<FileSummary> {
  const session = await getVerifiedSessionOrThrow();
  const client = await createServerSupabaseClient();
  const { data, error } = await client.rpc("register_project_file", {
    p_project_id: projectId,
    p_object_path: `${session.userId}/${projectId}/${crypto.randomUUID()}`,
    p_file_name: input.fileName,
    p_mime_type: input.normalizedMime,
    p_size_bytes: input.sizeBytes,
    p_idempotency_key: idempotencyKey,
  });
  if (error) throw error;
  return fileSummarySchema.parse(data);
}
```

The RPC derives the authenticated owner from `auth.uid()` and validates the project relationship before writing. It does not accept a user ID argument.

- [ ] **Step 4: Run upload and abuse verification.**

Run: `supabase db reset`, `supabase test db`, `npm test -- tests/server/file-validation.test.ts`, `npm run test:e2e -- tests/e2e/core-files.spec.ts`, `npm run lint`, and `npm run typecheck`.

Expected: PASS for allowed fixtures, extension/MIME/signature mismatch, macro-enabled OOXML, executable/archive rejection, size limits, private signed URLs, and Client A/B isolation. No accepted file is sent to an external scanner or processor.

- [ ] **Step 5: Commit the private file slice.**

```bash
git add supabase/migrations/202609230003_core_messages_and_files.sql supabase/tests/003_storage_and_files.sql supabase/config.toml src/server/core/file-validation.ts src/server/core/files.ts src/components/client/FileUploader.tsx src/app/(client)/portal/projekti/[id]/page.tsx tests/server/file-validation.test.ts tests/e2e/core-files.spec.ts
git commit -m "feat: add private validated project files"
```

---

### Task 6: Client workspace, messages, revisions, quality checks, and delivery gate

**Files:**
- Create: `src/app/(client)/portal/layout.tsx`, `src/server/core/messages.ts`, `src/components/client/ProjectStatusTimeline.tsx`, `src/components/client/MessageThread.tsx`, `src/components/admin/DeliveryApprovalPanel.tsx`, `src/app/(admin)/admin/projekti/[id]/page.tsx`, `tests/e2e/core-isolation.spec.ts`
- Modify: `src/app/(client)/portal/projekti/[id]/page.tsx`, `src/app/(admin)/admin/page.tsx`, `src/server/core/projects.ts`
- Test: `tests/server/messages.test.ts`, `tests/e2e/core-messages.spec.ts`, `tests/e2e/core-isolation.spec.ts`, `tests/e2e/admin-delivery-gate.spec.ts`

**Interfaces:**
- `postProjectMessage(projectId: string, body: string, idempotencyKey: string): Promise<MessageSummary>`
- `requestRevision(projectId: string, body: string, idempotencyKey: string): Promise<RevisionSummary>`
- `approveAndRecordDelivery(input: { projectId: string; qualityCheckId: string; deliveryObjectPath: string; approvedByDaniel: boolean; idempotencyKey: string }): Promise<DeliverySummary>`
- `getProjectWorkspace(projectId: string): Promise<ProjectWorkspace>`
- `createWorkspaceFixture(): Promise<{ projectId: string; otherProjectId: string; qualityCheckId: string; idempotencyKey: string }>`
- `ProjectWorkspace = { status: ProjectStatus; projectKind: ProjectKind; topic: string; faculty: string; messages: readonly MessageSummary[]; files: readonly FileSummary[]; deliveries: readonly DeliverySummary[]; revisions: readonly RevisionSummary[]; qualityChecks: readonly { id: string; complete: boolean }[] }`
- `DeliveryApprovalInput = { projectId: string; qualityCheckId: string; deliveryObjectPath: string; approvedByDaniel: boolean; idempotencyKey: string }`
- `deliverySummarySchema: z.ZodType<DeliverySummary>`

The client workspace shows only the client's project scope, status timeline, messages, private files, delivery metadata, and revision requests. Clients can post bounded messages and request a revision, but cannot set lifecycle status, quality completion, Daniel approval, delivery, or another user's project ID. Admin actions show the exact next transitions allowed by `canTransition`.

- [ ] **Step 1: Write failing message, workspace, and delivery-gate tests.**

```ts
it("rejects delivery without Daniel's explicit approval", async () => {
  const { projectId, qualityCheckId, idempotencyKey } = await createWorkspaceFixture();
  await expect(approveAndRecordDelivery({
    projectId,
    qualityCheckId,
    deliveryObjectPath: "client/project/delivery.docx",
    approvedByDaniel: false,
    idempotencyKey,
  })).rejects.toThrow("Daniel approval");
});

it("does not allow a client to post to another project", async () => {
  const { otherProjectId } = await createWorkspaceFixture();
  await expect(postProjectMessage(otherProjectId, "hello", crypto.randomUUID()))
    .rejects.toThrow("Project access denied");
});
```

The E2E suite must cover client message/revision submission, client read-only status behavior, admin status transition, incomplete quality check rejection, missing Daniel approval rejection, and one successful approved delivery record with an idempotent replay.

- [ ] **Step 2: Run focused tests and confirm RED.**

Run: `npm test -- tests/server/messages.test.ts` and `npm run test:e2e -- tests/e2e/core-messages.spec.ts tests/e2e/admin-delivery-gate.spec.ts`.

Expected: FAIL because workspace services/routes and the connected UI do not exist.

- [ ] **Step 3: Implement the workspace and guarded mutations.**

Messages use a bounded body schema, project ownership/admin authorization, and a unique `(project_id, author_user_id, idempotency_key)` constraint. Revision requests use the same pattern and remain informational; they do not silently expand a scope or create an offer. The workspace loader performs one authorized server-side read and returns DTOs that do not include raw cross-tenant database errors.

The delivery service must call the existing `assertDeliveryAllowed({ status, qualityComplete, approvedByDaniel })` before the guarded delivery RPC. The RPC rechecks the current database status and quality row under lock, records Daniel's explicit approval in an audit event, inserts one delivery metadata row, and transitions to `delivered`. It must not upload, email, charge, or call an external processor.

```ts
export async function approveAndRecordDelivery(input: DeliveryApprovalInput): Promise<DeliverySummary> {
  const workspace = await getProjectWorkspace(input.projectId);
  const qualityComplete = workspace.qualityChecks.some((check) => check.id === input.qualityCheckId && check.complete);
  assertDeliveryAllowed({
    status: workspace.status,
    qualityComplete,
    approvedByDaniel: input.approvedByDaniel,
  });
  const client = await createServerSupabaseClient();
  const { data, error } = await client.rpc("approve_and_record_delivery", {
    p_project_id: input.projectId,
    p_quality_check_id: input.qualityCheckId,
    p_delivery_object_path: input.deliveryObjectPath,
    p_idempotency_key: input.idempotencyKey,
  });
  if (error) throw error;
  return deliverySummarySchema.parse(data);
}
```

The database RPC derives the approver from the authenticated admin session and stores the explicit approval event; `approvedByDaniel` is never accepted as a client-controlled authorization fact.

- [ ] **Step 4: Run workspace and accessibility verification.**

Run: `supabase db reset`, `supabase test db`, `npm test -- tests/server/messages.test.ts tests/domain/approval.test.ts tests/domain/projects.test.ts`, `npm run test:e2e -- tests/e2e/core-messages.spec.ts tests/e2e/admin-delivery-gate.spec.ts`, `npm run lint`, and `npm run typecheck`.

Expected: PASS for client/admin isolation, bounded messages, revision requests, allowed transitions, rejection of unsafe delivery, explicit approval evidence, mobile layout, keyboard focus, and reduced-motion behavior.

- [ ] **Step 5: Commit the workspace and delivery gate.**

```bash
git add src/server/core/messages.ts src/components/client src/components/admin/DeliveryApprovalPanel.tsx src/app/(client)/portal src/app/(admin)/admin src/server/core/projects.ts tests/server/messages.test.ts tests/e2e/core-messages.spec.ts tests/e2e/core-isolation.spec.ts tests/e2e/admin-delivery-gate.spec.ts
git commit -m "feat: add isolated project workspace and delivery gate"
```

---

### Task 7: Admin authorization, versioned CMS preview/publish, and immutable audit

**Files:**
- Modify: `supabase/migrations/202609230004_core_content_and_cms.sql`, `supabase/tests/004_cms_and_audit.sql`
- Create: `src/server/core/content.ts`, `src/content/cms.ts`, `src/components/admin/AdminNav.tsx`, `src/components/admin/ContentEditor.tsx`
- Modify: `src/server/core/admin.ts`
- Create: `src/app/(admin)/admin/layout.tsx`, `src/app/(admin)/admin/sadrzaj/page.tsx`, `src/app/(admin)/admin/sadrzaj/[slug]/page.tsx`
- Test: `tests/server/content.test.ts`, `tests/e2e/admin-cms.spec.ts`
- Modify: `src/app/(admin)/admin/page.tsx`, selected public page loaders only where a published CMS record exists

**Interfaces:**
- `assertAdminSession(): Promise<{ userId: string; email: string }>`
- `saveDraftContent(input: DraftContentInput, idempotencyKey: string): Promise<ContentVersionSummary>`
- `publishContent(input: { slug: string; locale: string; version: number; idempotencyKey: string }): Promise<ContentVersionSummary>`
- `getPublishedContentPage(slug: string, locale: string): Promise<PublishedContent | null>`
- `DraftContentInput = { slug: string; locale: string; title: string; blocks: readonly ContentBlock[] }`
- `ContentBlock = { kind: "paragraph" | "heading" | "link"; text: string; href?: string }`
- `ContentVersionSummary = { slug: string; locale: string; version: number; status: "draft" | "published" | "archived" }`

Use versioned content rows so a published version is never overwritten by a draft edit. Validate structured content with Zod; render text/links from the typed model rather than arbitrary unsanitized HTML. The admin editor must show preview and require an explicit publish action. Public readers query only `status = 'published'`; if no CMS version exists, the existing committed static content is used.

- [ ] **Step 1: Write failing CMS, audit, and authorization tests.**

```ts
it("does not expose a draft to public content lookup", async () => {
  const draftInput: DraftContentInput = {
    slug: "kontakt",
    locale: "hr",
    title: "Kontakt informacije",
    blocks: [{ kind: "paragraph", text: "Ovo je radna verzija." }],
  };
  await saveDraftContent(draftInput, "33333333-3333-4333-8333-333333333333");
  await expect(getPublishedContentPage("kontakt", "hr")).resolves.toBeNull();
});

it("publishing the same draft twice returns one published version", async () => {
  const draft = await saveDraftContent({
    slug: "faq",
    locale: "hr",
    title: "Česta pitanja",
    blocks: [{ kind: "paragraph", text: "Radni tekst." }],
  }, "44444444-4444-4444-8444-444444444444");
  const first = await publishContent({
    slug: draft.slug,
    locale: draft.locale,
    version: draft.version,
    idempotencyKey: "55555555-5555-4555-8555-555555555555",
  });
  const second = await publishContent({
    slug: draft.slug,
    locale: draft.locale,
    version: draft.version,
    idempotencyKey: "55555555-5555-4555-8555-555555555555",
  });
  expect(second).toEqual(first);
});
```

The SQL test must assert that a non-admin cannot read or write drafts, a public/anonymous role can read only published content, a published version cannot be updated/deleted, and each publish/status mutation creates an append-only audit event. The E2E test must preview a draft as admin, confirm an anonymous browser cannot see it, publish it explicitly, and then confirm the public route sees only the published version.

- [ ] **Step 2: Run the focused tests and confirm RED.**

Run: `npm test -- tests/server/content.test.ts` and `supabase test db`.

Expected: FAIL because content tables, policies, admin service, and CMS routes do not exist.

- [ ] **Step 3: Implement the versioned CMS and audit protections.**

Create `content_pages` with a stable slug/locale identity and immutable version rows containing typed content, status, author, publisher, and timestamps. Save-draft inserts a new version; publish locks the page key, validates that the requested version is a draft, archives the previous published version, marks exactly one version published, and inserts a unique audit event. The database trigger rejects `UPDATE` and `DELETE` on `audit_events`; retention/deletion is not part of this local Core phase.

Admin routes must call `assertAdminSession()` on every read and mutation. The public content loader must query a published row only and must never accept a draft/version parameter from a public URL. CMS editor copy must preserve the same human-review and assisted-tool disclosure rules as the static Public Experience.

```sql
create or replace function private.reject_audit_mutation()
returns trigger
language plpgsql
set search_path = private, pg_temp
as $$
begin
  raise exception 'audit_events is append-only';
end;
$$;

create trigger audit_events_append_only
before update or delete on public.audit_events
for each row execute function private.reject_audit_mutation();
```

The publish RPC must lock the `(slug, locale)` key, verify the authenticated admin through `private.is_admin()`, insert a new audit event with a unique idempotency key, and return the existing published result on replay.

- [ ] **Step 4: Run CMS, audit, and public fallback verification.**

Run: `supabase db reset`, `supabase test db`, `npm test -- tests/server/content.test.ts`, `npm run test:e2e -- tests/e2e/admin-cms.spec.ts`, `npm run lint`, and `npm run typecheck`.

Expected: PASS for admin-only editing, draft preview, explicit publish, public published-only reads, static fallback, immutable audit rows, one-publish replay, and absence of price/payment fields in the CMS contract.

- [ ] **Step 5: Commit the CMS and audit boundary.**

```bash
git add supabase/migrations/202609230004_core_content_and_cms.sql supabase/tests/004_cms_and_audit.sql src/server/core/content.ts src/server/core/admin.ts src/content/cms.ts src/components/admin src/app/(admin) tests/server/content.test.ts tests/e2e/admin-cms.spec.ts
git commit -m "feat: add audited admin CMS publishing"
```

---

### Task 8: Documentation, local restore exercise, and Foundation-to-Core gate

**Files:**
- Create: `scripts/core/verify-local-core.mjs`, `scripts/core/restore-exercise.mjs`, `docs/core/phase3-core.md`, `docs/core/local-supabase.md`, `docs/core/security-boundary.md`
- Modify: `README.md`, `package.json`, `playwright.config.ts`
- Test: `tests/e2e/routes.spec.ts`, the complete Core E2E suite, and the exact-head verification commands

**Interfaces:**
- `npm run core:verify`: starts/validates local Supabase, resets the database, runs SQL tests, checks generated types/migration drift, and exits nonzero on missing evidence.
- `npm run core:restore-exercise`: creates a local schema/data backup using the CLI command form discovered from `supabase db dump --help`, restores it into a disposable local database, and verifies client isolation, audit immutability, and published-only CMS reads.

- [ ] **Step 1: Write failing gate checks and documentation assertions.**

```ts
it("documents Core as local-only and excludes production integrations", () => {
  const readme = readFileSync("README.md", "utf8");
  expect(readme).toContain("lokalni Supabase");
  expect(readme).toContain("nema checkouta");
  expect(readme).toContain("nema produkcijskih secretsa");
});
```

The gate script test must fail if `supabase status`, `supabase test db`, or the restore command produces no captured output or a nonzero exit code. It must also fail if tracked files contain `.env` values, service-role key names in runtime code, or a remote Supabase project reference.

- [ ] **Step 2: Run the gate tests to confirm RED.**

Run: `npm test -- tests/e2e/routes.spec.ts` and `npm run core:verify`.

Expected: the new documentation/gate assertions fail until the scripts and Core documentation are present. Do not weaken the gate to accept an older SHA or a skipped local database.

- [ ] **Step 3: Implement the reproducible local gate and restore exercise.**

The verification script must run commands in this order and capture exit code plus stdout/stderr: `supabase start`, `supabase db reset`, `supabase test db`, generated-type check, and migration drift check. The restore script must first discover supported CLI flags with `supabase db dump --help`, use an isolated local target, restore the captured schema/data, and assert that data and RLS behavior survive. It must never target a remote project or read production credentials. Application quality commands remain explicit in the final gate below so their output is independently visible.

```js
import { spawnSync } from "node:child_process";

const requiredCommands = [
  ["supabase", ["start"]],
  ["supabase", ["db", "reset"]],
  ["supabase", ["test", "db"]],
  ["supabase", ["gen", "types", "typescript", "--local"]],
];

for (const [command, args] of requiredCommands) {
  const result = spawnSync(command, args, { encoding: "utf8", windowsHide: true });
  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
  if (result.status !== 0 || output.trim().length === 0) {
    throw new Error(`Core verification failed: ${command} ${args.join(" ")}`);
  }
}
```

On Windows, the script must resolve a native Supabase executable when the shell exposes only a `.ps1` shim, and it must retain the captured output as gate evidence rather than treating an empty result as success.

Update README and the Core docs with:

- the local prerequisites and exact commands;
- the environment keys and the rule that only `.env.example` placeholders are tracked;
- passwordless local Auth/Inbucket flow;
- table ownership/RLS/storage/admin boundaries;
- the 25 MiB/100 MiB local file limits and quarantine meaning;
- the lifecycle and Daniel final-approval rule;
- explicit non-goals: Commerce, production Supabase, payment, AI, external integrations, and production launch.

- [ ] **Step 4: Run the exact final verification on the exact branch HEAD.**

Run from a clean `feat/core` worktree, in this order:

```text
npm ci
npm run core:verify
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
npm run core:restore-exercise
git diff --check
git status --short --branch
```

Expected: every command exits 0 on the same final SHA; Playwright covers `/`, `/portal`, `/admin`, `/prijava`, mobile viewport, keyboard focus, reduced motion, passwordless auth, project isolation, uploads, messages, CMS preview/publish, lifecycle transitions, immutable price/domain regression, and the final approval gate. The tracked-file secret scan must report no credential values, and the repository must not contain a remote Supabase link.

- [ ] **Step 5: Commit the gate documentation.**

```bash
git add scripts/core docs/core README.md package.json playwright.config.ts tests/e2e/routes.spec.ts
git commit -m "docs: define Core local verification gate"
```

---

## Phase 3 Completion Criteria

Phase 3 is complete only when all of the following are true on one exact `feat/core` HEAD:

1. Local Supabase starts from committed configuration, migrations reset cleanly, SQL tests pass, generated types are current, and the restore exercise has captured evidence.
2. Passwordless magic-link Auth works against local Inbucket; verified sessions protect `/portal`; admin membership protects `/admin`; no authorization relies on user-editable metadata.
3. Intake requires project type, topic, and faculty/institution; duplicate submissions are idempotent; no offer, checkout, payment, or price acceptance is created.
4. Client A/B RLS and Storage isolation tests pass, including direct table access, RPC access, signed URL access, and admin-only paths.
5. File validation rejects the specified abuse classes and stores accepted files as private, manually reviewable, unprocessed metadata.
6. Workspace messages, revisions, status display, lifecycle mutations, quality checks, and deliveries are bounded, audited, and replay-safe.
7. Delivery remains impossible without `awaiting_final_approval`, complete quality checks, and Daniel's explicit approval.
8. CMS drafts are previewable only to admins, publish is explicit and audited, public readers see only published content, and prices remain outside the CMS contract.
9. `npm ci`, lint, typecheck, unit tests, build, Playwright E2E, local database tests, restore exercise, diff check, and tracked-secret scan all pass on the same exact SHA.
10. A fresh-context whole-branch review compares that SHA to the design specification, master plan, Foundation plan, and this Core plan. Critical/Important findings are fixed with RED → GREEN evidence before any Draft PR is opened.

## Review and Handoff

After Task 8 passes, invoke `superpowers:requesting-code-review` with a fresh context and compare the exact branch HEAD against all four authoritative documents. The reviewer must specifically inspect RLS ownership, the `SECURITY DEFINER` admin helper, private Storage paths, upload parser limits, audit immutability, replay behavior, status transitions, the Daniel approval gate, reduced-motion/mobile behavior, and dependency additions. Apply Critical/Important findings task-by-task with the same RED → GREEN discipline, rerun the exact final gate on the new HEAD, and do not merge. This plan itself ends at review-ready Core implementation; Public Experience enhancements, Commerce, and Processing remain closed.

## Explicitly Deferred Beyond Phase 3

Commerce package/offer/payment implementation, production Supabase project and secrets, real SMTP/domain/business contact, legal/privacy/consumer copy finalization, external calendar/email integrations, Katedra/Lekta/WordReplica adapters, AI providers, automated document processing, malware-provider integration, paid launch, production restore/backup operations, retention jobs, and merge to `main` are outside this plan.
