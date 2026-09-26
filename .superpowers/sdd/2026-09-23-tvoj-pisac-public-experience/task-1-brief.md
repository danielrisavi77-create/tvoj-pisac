# Task 1 brief — typed public content contract

Read this brief first. It is the exact task contract. Implement only this task on `feat/public-experience`; do not dispatch subagents or reviewers.

## Goal

Create the static, typed public content source consumed by later public routes. Prices must come from Foundation `src/domain/packages.ts`, not duplicated literals in route components.

## Files

- Create `src/content/public.ts`.
- Create `tests/content/public.test.ts`.

## Required interfaces

Export `PUBLIC_NAV_ITEMS`, `PUBLIC_PACKAGES`, `getPublicPackageBySlug(slug: string): PublicPackageContent | undefined`, `PUBLIC_PROCESS_STEPS`, `PUBLIC_FAQS`, `PUBLIC_EXAMPLES`, `PUBLIC_ARTICLES` and page-copy constants.

`PublicPackageContent` must include:

```ts
type PublicPackageContent = {
  projectKind: ProjectKind;
  slug: "seminarski" | "zavrsni" | "diplomski" | "specijalisticki" | "doktorski";
  title: string;
  shortDescription: string;
  scopeNote: string;
  priceEur: number;
  priceNote: string;
};
```

Use these exact package prices, derived from `STANDARD_PRICES_EUR`: seminar €50, final/završni €150, master's/diplomski €300, specialist €500, doctoral €1,000. Use the five slugs exactly: `seminarski`, `zavrsni`, `diplomski`, `specijalisticki`, `doktorski`.

Each package `scopeNote` must be exactly or contain: `Točan opseg, rok, formati i uvjeti potvrđuju se prije prihvata ponude.` Each `priceNote` must be exactly or contain: `Standardna cijena vrijedi za definirani standardni paket; složeniji ili nestandardni rad ide na ručnu procjenu.` Do not invent turnaround, revision window, legal term or deliverable count.

Article slugs/titles:

- `prije-nego-sto-zatrazi-ponudu` — `Što pripremiti prije nego što zatražiš ponudu`
- `kako-izgleda-proces` — `Kako izgleda proces rada`
- `kontrola-kvalitete-i-odobrenje` — `Kontrola kvalitete i završno odobrenje`

Every article has `isEducational: true`. Every example has `isIllustrative: true` and the visible disclaimer text later pages will render: `Ilustrativni primjer — nije stvarni klijentski rezultat.`

Route/nav paths must match the plan: `/`, `/usluge`, `/paketi`, `/cijene`, `/proces`, `/primjeri`, `/faq`, `/clanci`, `/o-nama`, `/kontakt`, plus `/portal` as a secondary development-shell entry. No external URL or backend action.

## TDD steps

1. Write tests first for exact price array `[50, 150, 300, 500, 1000]`, unknown slug returning `undefined`, every example illustrative, every article educational.
2. Run `npm test -- tests/content/public.test.ts`; expected RED because the module is missing. Diagnose unexpected failures before implementation.
3. Implement the minimal typed module importing `ProjectKind`, `PROJECT_KIND_LABELS` and `STANDARD_PRICES_EUR` from `@/domain/packages`.
4. Run `npm test -- tests/content/public.test.ts tests/domain/packages.test.ts` and `npm run typecheck`; expected PASS.
5. Commit `feat: define public experience content contract`.

## Constraints

Croatian initial UI; no fabricated proof or academic outcome promise; no Supabase, auth, checkout, payment, AI, upload or external integration code; no new dependency.

## Report

Before returning, write a report to `.superpowers/sdd/2026-09-23-tvoj-pisac-public-experience/task-1-report.md` with status, changed files, commit, commands/results and concerns. Return only a concise status summary.
