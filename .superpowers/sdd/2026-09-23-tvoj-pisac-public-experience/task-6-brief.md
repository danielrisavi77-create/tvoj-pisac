# Task 6 brief — documentation and Public Experience gate

Read this brief first. It is the exact task contract. Implement only this task on `feat/public-experience`; do not dispatch subagents or reviewers.

## Goal

Document the completed Phase 2 boundary and run the exact final quality/audit gate on the final HEAD.

## Files

- Modify `README.md` only for the Phase 2 section and boundary.
- Do not add runtime code, dependency, env variable, secret or integration.

## Documentation requirements

Document all public routes, Croatian content boundary, exact prices, illustrative-example rule, reduced-motion behavior and explicit absence of auth, intake submission, uploads, Supabase, checkout, payment, AI and external integrations. State that package scope, turnaround, revision/support, legal/consumer copy, visual identity and business contact channel remain deferred before paid launch.

## TDD/verification steps

1. Make the documentation change after all prior task tests are green.
2. Run exact commands in this order on final HEAD:

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

All must exit 0. Build must include public routes plus `/portal` and `/admin`; E2E must cover mobile, reduced motion, focus, positive routes, unknown package/article 404s and existing shells.

3. Run `git diff --check`, `git status --short --branch`, `git ls-files '.env*'`; scan tracked files for common secret markers without printing values. Search the diff for `supabase`, `stripe`, `checkout`, `OPENAI_API_KEY`, `service_role`, `Katedra`, `Lekta`, `WordReplica`; explicit boundary documentation is allowed, new runtime integration/configuration is not.
4. Commit `docs: document public experience boundary`.

## Report

Write `.superpowers/sdd/2026-09-23-tvoj-pisac-public-experience/task-6-report.md` with status, changed files, commit, exact command results and concerns. Return only a concise status summary.
