# Tvoj Pisac Public Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans task-by-task. Track steps with checkboxes.

**Goal:** Build a reviewable Croatian public experience that explains Tvoj Pisac honestly, presents the approved catalogue and prices, and remains useful without motion or backend services.

**Architecture:** Keep public content in typed, static content modules that consume the Foundation catalogue as the single price source. Add a public route-group layout with accessible navigation, reusable editorial components and static pages; keep client/admin shells separate. Use CSS-only progressive enhancement for decorative motion so no new animation, 3D, CMS, analytics, form, auth or integration dependency is required.

**Tech Stack:** Existing Next.js App Router, React, TypeScript, CSS, Zod/domain catalogue, Vitest, Testing Library and Playwright. No new runtime dependency is planned.

**Spec:** `docs/superpowers/specs/2026-09-22-tvoj-pisac-design.md`

**Depends on:** Foundation implementation at `dfe5b4957f3e10c5583593c41cedc6699a7bb65d` and its Draft PR review.

## Global Constraints

- Initial UI language is Croatian; route and content structures remain localization-ready.
- Display the exact Foundation prices: seminar €50, završni €150, diplomski/master's €300, specijalistički €500 and doktorski €1,000.
- A displayed price is for a defined standard package; every public price surface must state that final scope, deliverables, turnaround and material-change terms are confirmed before offer acceptance.
- Complex, empirical, unusually large or non-standard work must be described as requiring manual feasibility review and a custom offer.
- Primary CTA copy is `Zatraži ponudu`; secondary CTA copy is `Odaberi paket` and `Dogovori razgovor`.
- Public pages must not create checkout, payment, authentication, intake submission, upload, email, analytics or client-workspace behavior.
- No public copy may promise a grade, acceptance, scientific contribution, guaranteed outcome or detector evasion, or imply false authorship.
- No fabricated testimonials, client results, sources, qualifications, team members or portfolio evidence. Any non-client example must be labelled illustrative.
- Client documents are not uploaded, displayed, used as examples or sent to analytics/training fixtures in this phase.
- Content must work without motion, 3D, remote images or JavaScript interaction beyond normal navigation.
- Motion/3D is progressive enhancement only; reduced-motion users receive the same content, hierarchy and CTA access.
- Target the agreed-scope WCAG 2.2 AA baseline: semantic landmarks, keyboard navigation, visible focus, labels, contrast and mobile usability.
- Do not add a paid dependency. Do not add secrets, production configuration, Supabase, payment provider or external integration variables.
- The public experience is reviewable/demo-ready, not a public paid launch. Unresolved business/legal decisions remain explicit and must not be silently invented.

## Review Focus

1. A package slug that is not in the typed catalogue must return a real 404, not an arbitrary price or page. Test `getPublicPackageBySlug("nepoznat")` and Playwright `/paketi/nepoznat`.
2. Public price cards must consume `STANDARD_PRICES_EUR`; changing a copied content object must not change the Foundation catalogue, and all five prices must remain exact. Test the content projection and rendered price labels.
3. Public CTAs must route only to reviewable static pages and must not claim that an offer was submitted, payment was completed or a workspace was created. Test CTA hrefs and forbidden action copy.
4. Illustrative examples and educational articles must be visibly labelled as such and contain no fabricated proof. Test the content flags and visible labels.
5. Every public route must remain usable at the mobile viewport with reduced motion and keyboard navigation. Test route smoke, no horizontal overflow, `prefers-reduced-motion` and visible focus.

## File Map

Create the typed public content and component units:

- `src/content/public.ts` — public navigation, package projections, process steps, FAQ entries, illustrative examples, articles and page copy.
- `src/components/public/PublicHeader.tsx` — accessible public navigation and primary/secondary CTA links.
- `src/components/public/PublicFooter.tsx` — secondary navigation, scope/safety note and reviewable contact/workspace boundary.
- `src/components/public/PublicPageShell.tsx` — shared page heading and content layout.
- `src/components/public/PublicCta.tsx` — typed internal CTA link variants.
- `src/components/public/PackageCard.tsx` — catalogue-backed package summary and price card.
- `src/components/public/DecorativeScene.tsx` — aria-hidden CSS-only visual enhancement.

Create public route surfaces:

- `src/app/(public)/layout.tsx` — shared public header/footer wrapper.
- `src/app/(public)/usluge/page.tsx`
- `src/app/(public)/paketi/page.tsx`
- `src/app/(public)/paketi/[slug]/page.tsx`
- `src/app/(public)/cijene/page.tsx`
- `src/app/(public)/proces/page.tsx`
- `src/app/(public)/primjeri/page.tsx`
- `src/app/(public)/faq/page.tsx`
- `src/app/(public)/clanci/page.tsx`
- `src/app/(public)/clanci/[slug]/page.tsx`
- `src/app/(public)/o-nama/page.tsx`
- `src/app/(public)/kontakt/page.tsx`

Modify only public presentation files and documentation:

- `src/app/(public)/page.tsx` — complete the home page inside the shared public layout.
- `src/app/globals.css` — public layout tokens, responsive rules, focus styles and progressive motion.
- `src/app/layout.tsx` — Croatian public metadata that does not claim production readiness.
- `README.md` — public-phase commands, boundary and known deferred decisions after implementation.

Create tests:

- `tests/content/public.test.ts` — content contract, exact prices, slugs, labels and no fabricated proof.
- `tests/components/public.test.tsx` — shared shell, navigation, CTA semantics and package cards.
- `tests/e2e/public-experience.spec.ts` — all public routes, mobile overflow, keyboard focus and reduced-motion smoke.

## Content Contract

The implementation must use these exact route slugs and public package slugs:

| Surface | Path | Required purpose |
|---|---|---|
| Home | `/` | identity, neutral value proposition, primary CTA, catalogue entry |
| Services | `/usluge` | service categories and responsible-use framing |
| Packages | `/paketi` | package cards and route to category details |
| Package detail | `/paketi/seminarski`, `/paketi/zavrsni`, `/paketi/diplomski`, `/paketi/specijalisticki`, `/paketi/doktorski` | category-specific non-binding summary and exact standard price |
| Pricing | `/cijene` | comparable price table and custom-offer boundary |
| Process | `/proces` | qualification, scope confirmation, work, quality check and approval explanation |
| Examples | `/primjeri` | labelled illustrative structures, never client proof |
| FAQ | `/faq` | static answers using native disclosure controls |
| Articles | `/clanci` and `/clanci/[slug]` | static educational material with no fabricated authorship or publication claims |
| About | `/o-nama` | transparent Daniel-facing service description without invented team/credentials |
| Contact | `/kontakt` | honest contact/offer boundary without submission or email integration |
| Client workspace entry | `/portal` | existing development shell only; no auth or private data behavior |

The content module must define these package slugs and derive labels/prices from the Foundation domain:

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

Each `scopeNote` must use the concrete boundary: `Točan opseg, rok, formati i uvjeti potvrđuju se prije prihvata ponude.` Each `priceNote` must use: `Standardna cijena vrijedi za definirani standardni paket; složeniji ili nestandardni rad ide na ručnu procjenu.` No package record may contain a turnaround number, revision window, legal term or deliverable count because those are open business decisions in the authoritative design.

The static article records must use these titles and slugs:

- `prije-nego-sto-zatrazi-ponudu` — `Što pripremiti prije nego što zatražiš ponudu`
- `kako-izgleda-proces` — `Kako izgleda proces rada`
- `kontrola-kvalitete-i-odobrenje` — `Kontrola kvalitete i završno odobrenje`

The static example records must use these labels:

- `Struktura seminarskog rada — ilustrativni primjer`
- `Plan završnog rada — ilustrativni primjer`
- `Organizacija istraživačkog projekta — ilustrativni primjer`

Each example must expose `isIllustrative: true`; the UI must visibly render `Ilustrativni primjer — nije stvarni klijentski rezultat.`

## Implementation Tasks

### Task 1 — Typed public content contract

**Files:**

- Create: `src/content/public.ts`
- Test: `tests/content/public.test.ts`
- Consume: `src/domain/packages.ts`, `src/domain/projects.ts` only; no new service or backend module.

**Produces:** `PUBLIC_NAV_ITEMS`, `PUBLIC_PACKAGES`, `getPublicPackageBySlug()`, `PUBLIC_PROCESS_STEPS`, `PUBLIC_FAQS`, `PUBLIC_EXAMPLES`, `PUBLIC_ARTICLES` and page copy constants.

- [ ] **Step 1: Write failing content tests**

```ts
import { describe, expect, it } from "vitest";
import {
  PUBLIC_ARTICLES,
  PUBLIC_EXAMPLES,
  PUBLIC_PACKAGES,
  getPublicPackageBySlug,
} from "@/content/public";

describe("public content contract", () => {
  it("exposes the five approved catalogue prices", () => {
    expect(PUBLIC_PACKAGES.map((item) => item.priceEur)).toEqual([
      50, 150, 300, 500, 1000,
    ]);
  });

  it("rejects an unknown package slug", () => {
    expect(getPublicPackageBySlug("nepoznat")).toBeUndefined();
  });

  it("labels every example as illustrative", () => {
    expect(PUBLIC_EXAMPLES.every((example) => example.isIllustrative)).toBe(true);
  });

  it("does not present articles as fabricated client proof", () => {
    expect(PUBLIC_ARTICLES.every((article) => article.isEducational)).toBe(true);
  });
});
```

- [ ] **Step 2: Run the focused test and confirm the expected RED**

Run: `npm test -- tests/content/public.test.ts`

Expected: FAIL because `@/content/public` does not exist yet. If it fails for a different reason, stop and diagnose before implementing.

- [ ] **Step 3: Implement the minimal typed content module**

Import `ProjectKind`, `PROJECT_KIND_LABELS` and `STANDARD_PRICES_EUR` from `src/domain/packages.ts`. Define the five package records with the exact slugs, neutral descriptions and boundary notes above. Define navigation paths only from the route contract. Define educational process/FAQ/article/example records with explicit `isIllustrative` / `isEducational` flags. `getPublicPackageBySlug(slug)` must return `undefined` for any unknown string.

- [ ] **Step 4: Run focused and Foundation domain tests**

Run: `npm test -- tests/content/public.test.ts tests/domain/packages.test.ts`

Expected: PASS, including the existing immutable price tests. Run `npm run typecheck`; expected PASS.

- [ ] **Step 5: Commit**

```bash
git add src/content/public.ts tests/content/public.test.ts
git commit -m "feat: define public experience content contract"
```

### Task 2 — Shared public shell and navigation

**Files:**

- Create: `src/app/(public)/layout.tsx`
- Create: `src/components/public/PublicHeader.tsx`
- Create: `src/components/public/PublicFooter.tsx`
- Create: `src/components/public/PublicPageShell.tsx`
- Create: `src/components/public/PublicCta.tsx`
- Modify: `src/app/(public)/page.tsx`, `src/components/shell/AppHeader.tsx` only if a shared primitive is genuinely reused.
- Test: `tests/components/public.test.tsx`

**Produces:** one semantic public layout with a keyboard-usable nav, exact CTA labels, footer boundary text and no form/action side effects.

**Interfaces:**

- `PublicHeader(): JSX.Element` — renders the brand, `nav[aria-label="Glavna navigacija"]` and the three approved CTA links.
- `PublicFooter(): JSX.Element` — renders secondary links and the static no-backend boundary copy.
- `PublicPageShell({ eyebrow?, title, intro, children }: { eyebrow?: string; title: string; intro: string; children: ReactNode }): JSX.Element` — owns the page heading hierarchy.
- `PublicCta({ href, variant, children }: { href: "/kontakt" | "/paketi" | "/kontakt#razgovor"; variant: "primary" | "secondary"; children: ReactNode }): JSX.Element` — renders an internal `next/link` with no action side effect.

- [ ] **Step 1: Write failing component tests**

```tsx
import { render, screen } from "@testing-library/react";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";

it("renders the public navigation and approved CTA labels", () => {
  render(<PublicHeader />);
  expect(screen.getByRole("navigation", { name: "Glavna navigacija" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Zatraži ponudu" })).toHaveAttribute("href", "/kontakt");
  expect(screen.getByRole("link", { name: "Odaberi paket" })).toHaveAttribute("href", "/paketi");
  expect(screen.getByRole("link", { name: "Dogovori razgovor" })).toHaveAttribute("href", "/kontakt#razgovor");
});

it("states the static boundary without pretending to submit an offer", () => {
  render(<PublicFooter />);
  expect(screen.getByText(/kontaktni kanal i privatni intake povezat će se u core fazi/i)).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /pošalji/i })).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run: `npm test -- tests/components/public.test.tsx`

Expected: FAIL because the public components do not exist yet. Diagnose any unexpected failure before implementation.

- [ ] **Step 3: Implement the shared shell**

Create a route-group layout that renders `PublicHeader`, a single `<main>` around `children`, and `PublicFooter`. Use `PUBLIC_NAV_ITEMS` for links. The navigation must use a named `<nav>`, regular links, visible focus styles and no client-side menu state. Render the three CTA links exactly as tested. The footer must state that contact/intake/workspace connectivity is not active in this reviewable phase. Do not render a disabled submit button that looks operational.

- [ ] **Step 4: Run component tests and route smoke**

Run: `npm test -- tests/components/public.test.tsx tests/smoke/app.test.tsx`

Expected: PASS. Run `npm run lint`; expected PASS.

- [ ] **Step 5: Commit**

```bash
git add 'src/app/(public)/layout.tsx' src/components/public tests/components/public.test.tsx 'src/app/(public)/page.tsx'
git commit -m "feat: add public experience shell"
```

### Task 3 — Home, services, packages and pricing

**Files:**

- Create: `src/components/public/PackageCard.tsx`
- Create: `src/app/(public)/usluge/page.tsx`
- Create: `src/app/(public)/paketi/page.tsx`
- Create: `src/app/(public)/paketi/[slug]/page.tsx`
- Create: `src/app/(public)/cijene/page.tsx`
- Modify: `src/app/(public)/page.tsx`
- Test: extend `tests/components/public.test.tsx`; add `tests/e2e/public-experience.spec.ts` route cases.

**Produces:** catalogue-backed public surfaces with all five exact prices and truthful custom-offer boundaries.

**Interfaces:**

- `PackageCard({ package }: { package: PublicPackageContent }): JSX.Element` — renders the package label, exact catalogue-backed price, boundary note and internal detail link.
- `getPublicPackageBySlug(slug: string): PublicPackageContent | undefined` — supplies the dynamic page or causes `notFound()`; it never falls back to a different package.

- [ ] **Step 1: Write failing page/component tests**

```tsx
import { render, screen } from "@testing-library/react";
import Home from "@/app/(public)/page";
import PackagesPage from "@/app/(public)/paketi/page";

it("renders the primary public promise without academic outcome claims", () => {
  render(<Home />);
  expect(screen.getByRole("heading", { name: "Tvoj Pisac" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Zatraži ponudu" })).toHaveAttribute("href", "/kontakt");
  expect(screen.queryByText(/garantiramo ocjenu|prolaz|detektor/i)).not.toBeInTheDocument();
});

it("renders all Foundation prices from the public catalogue projection", () => {
  render(<PackagesPage />);
  for (const price of ["€50", "€150", "€300", "€500", "€1.000"]) {
    expect(screen.getByText(price)).toBeInTheDocument();
  }
  expect(screen.getAllByText(/konačni opseg, rok/i).length).toBeGreaterThanOrEqual(5);
});
```

- [ ] **Step 2: Run focused tests and confirm RED**

Run: `npm test -- tests/components/public.test.tsx`

Expected: FAIL because the pages and package cards do not contain the required content yet.

- [ ] **Step 3: Implement the catalogue surfaces**

Build the home hero with `Tvoj Pisac`, neutral service framing and links to `/paketi` and `/kontakt`. Build `/usluge` with service categories and responsible-use copy. Build `/paketi` and `/cijene` from `PUBLIC_PACKAGES`; never duplicate numeric prices in route files. Build `/paketi/[slug]` with `getPublicPackageBySlug`, `notFound()` for unknown slugs, exact price, non-binding scope note and links to `/kontakt` and `/proces`. Use `generateStaticParams` for the five known slugs. No route may render checkout, payment, upload or submission controls.

- [ ] **Step 4: Run focused tests, typecheck and build**

Run: `npm test -- tests/components/public.test.tsx tests/content/public.test.ts`; `npm run typecheck`; `npm run build`.

Expected: all PASS; build output includes `/`, `/usluge`, `/paketi`, `/paketi/[slug]` generated variants and `/cijene`.

- [ ] **Step 5: Commit**

```bash
git add 'src/app/(public)/page.tsx' 'src/app/(public)/usluge' 'src/app/(public)/paketi' 'src/app/(public)/cijene' src/components/public/PackageCard.tsx tests/components/public.test.tsx
git commit -m "feat: present public services and catalogue"
```

### Task 4 — Process, examples, FAQ, articles, about and contact

**Files:**

- Create: `src/app/(public)/proces/page.tsx`
- Create: `src/app/(public)/primjeri/page.tsx`
- Create: `src/app/(public)/faq/page.tsx`
- Create: `src/app/(public)/clanci/page.tsx`
- Create: `src/app/(public)/clanci/[slug]/page.tsx`
- Create: `src/app/(public)/o-nama/page.tsx`
- Create: `src/app/(public)/kontakt/page.tsx`
- Modify: `src/content/public.ts` only for concrete copy required by tests.
- Test: `tests/components/public.test.tsx`, `tests/e2e/public-experience.spec.ts`.

**Produces:** all required public informational surfaces, with honest boundaries around static reviewable behavior.

- [ ] **Step 1: Write failing page tests**

```tsx
import { render, screen } from "@testing-library/react";
import ProcessPage from "@/app/(public)/proces/page";
import ExamplesPage from "@/app/(public)/primjeri/page";
import FaqPage from "@/app/(public)/faq/page";

it("explains the human quality and approval boundary", () => {
  render(<ProcessPage />);
  expect(screen.getByText(/završna kontrola kvalitete/i)).toBeInTheDocument();
  expect(screen.getByText(/Danielovo završno odobrenje/i)).toBeInTheDocument();
});

it("labels examples as illustrative", () => {
  render(<ExamplesPage />);
  expect(screen.getAllByText(/ilustrativni primjer — nije stvarni klijentski rezultat/i)).toHaveLength(3);
});

it("uses native disclosure controls for FAQ", () => {
  render(<FaqPage />);
  expect(document.querySelectorAll("details").length).toBeGreaterThan(0);
});
```

- [ ] **Step 2: Run focused tests and confirm RED**

Run: `npm test -- tests/components/public.test.tsx`

Expected: FAIL because the informational pages do not exist yet or lack the required labels.

- [ ] **Step 3: Implement static informational pages**

Use `PublicPageShell` and content records. `/proces` must describe qualification, scope confirmation, work, QC and Daniel's final approval without claiming an automated delivery. `/primjeri` must render exactly the three illustrative records and their visible disclaimer. `/faq` must use `<details><summary>` controls. `/clanci` and `/clanci/[slug]` must use the three specified educational records; unknown article slugs must call `notFound()`. `/o-nama` must describe a Daniel-led service without invented staff or credentials. `/kontakt` must expose an honest static section with `id="razgovor"`, links back to packages and a sentence that intake/contact submission is not connected in this phase; do not use `mailto:` with an invented address and do not render a fake submit form.

- [ ] **Step 4: Run component and route tests**

Run: `npm test -- tests/components/public.test.tsx tests/content/public.test.ts`; `npm run lint`; `npm run typecheck`.

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add 'src/app/(public)/proces' 'src/app/(public)/primjeri' 'src/app/(public)/faq' 'src/app/(public)/clanci' 'src/app/(public)/o-nama' 'src/app/(public)/kontakt' src/content/public.ts tests/components/public.test.tsx
git commit -m "feat: add public informational pages"
```

### Task 5 — Responsive design, focus and reduced-motion enhancement

**Files:**

- Create: `src/components/public/DecorativeScene.tsx`
- Modify: `src/app/globals.css`, `src/app/layout.tsx`, public components/pages as required by the accessibility tests.
- Test: `tests/e2e/public-experience.spec.ts`.

**Produces:** premium editorial styling with a content-first, mobile-safe and reduced-motion-safe visual baseline.

**Interfaces:**

- `DecorativeScene(): JSX.Element` — renders only `aria-hidden` decorative layers; it accepts no data and cannot become a content or CTA dependency.

- [ ] **Step 1: Write failing browser checks**

```ts
import { expect, test } from "@playwright/test";

const publicPaths = [
  "/", "/usluge", "/paketi", "/cijene", "/proces", "/primjeri", "/faq", "/clanci", "/o-nama", "/kontakt",
  "/paketi/seminarski", "/paketi/zavrsni", "/paketi/diplomski", "/paketi/specijalisticki", "/paketi/doktorski",
  "/clanci/prije-nego-sto-zatrazi-ponudu", "/clanci/kako-izgleda-proces", "/clanci/kontrola-kvalitete-i-odobrenje",
];

for (const path of publicPaths) {
  test(`${path} is usable on mobile with reduced motion`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    await expect(page.locator("main")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect(await page.evaluate(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(true);
  });
}
```

Expected initial RED: new routes may not exist and the public visual selectors/baseline are not yet implemented.

- [ ] **Step 2: Implement visual and accessibility baseline**

Use CSS custom properties and existing tokens for a warm editorial hierarchy, clear type scale, readable line lengths, visible `:focus-visible`, semantic section headings and responsive grid/flex rules. Keep the mobile navigation as wrapping links; do not introduce a JavaScript menu dependency. Add `DecorativeScene` as `aria-hidden="true"` with no informational text, no remote asset and no WebGL. Its transforms/animation must be disabled or reduced by the existing `prefers-reduced-motion: reduce` rule. Ensure decorative layers cannot enlarge layout width or cover a CTA. Update root metadata to describe the reviewable service plainly in Croatian.

- [ ] **Step 3: Add keyboard and focus assertions**

In the same Playwright spec, visit `/`, press `Tab` repeatedly through the header, assert that the active element is visible, and assert that every primary CTA remains a normal link. Do not assert an implementation-specific animation duration; assert content visibility and the media query instead.

Add an explicit unknown-slug check:

```ts
test("unknown public resources return 404", async ({ page }) => {
  expect((await page.goto("/paketi/nepoznat"))?.status()).toBe(404);
  expect((await page.goto("/clanci/nepoznat"))?.status()).toBe(404);
});
```

- [ ] **Step 4: Run the browser gate**

Run: `npm run test:e2e`; expected PASS for all public paths plus existing `/portal` and `/admin` smoke coverage. Run `npm run lint`; expected PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/public/DecorativeScene.tsx src/app/globals.css src/app/layout.tsx tests/e2e/public-experience.spec.ts src/components/public 'src/app/(public)'
git commit -m "feat: add responsive public visual baseline"
```

### Task 6 — Documentation and Public Experience gate

**Files:**

- Modify: `README.md`
- Test/verification: repository commands and tracked-file audits.

**Produces:** a documented, exact-head review package with no accidental later-phase setup.

- [ ] **Step 1: Document the phase boundary**

Add a Public Experience section to `README.md` listing the public routes, Croatian content boundary, exact prices, truthful illustrative-example rule, reduced-motion behavior, and the explicit absence of auth, intake submission, uploads, Supabase, checkout, payment, AI and external integrations. Document that package scope, turnaround, revision/support, legal/consumer copy, visual identity and business contact channel remain decisions before paid launch.

- [ ] **Step 2: Run the exact quality gate on the final HEAD**

Run in this order:

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Expected: all commands exit 0; build contains every public route plus `/portal` and `/admin`; E2E covers mobile, reduced motion, keyboard focus, unknown package/article 404s and the existing shells.

- [ ] **Step 3: Run focused audits**

Run `git diff --check`. Verify `git status --short --branch` is clean after the documentation commit. Verify `git ls-files '.env*'` contains no production `.env` file. Search tracked files for common secret markers without printing matching values. Search the diff for `supabase`, `stripe`, `checkout`, `OPENAI_API_KEY`, `service_role`, `Katedra`, `Lekta` and `WordReplica`; any new runtime integration or secret reference is a scope failure, while explicit README boundary text is allowed.

- [ ] **Step 4: Whole-branch review**

Request a fresh-context whole-branch review against `dfe5b4957f3e10c5583593c41cedc6699a7bb65d`, this plan, the master plan and the design specification. Review focus: fabricated claims, misleading CTA behavior, exact prices, unknown route handling, accessibility/reduced motion, horizontal overflow, scope creep and unnecessary dependencies. Fix Critical/Important findings with TDD and rerun the exact gate.

- [ ] **Step 5: Commit**

```bash
git add README.md
git commit -m "docs: document public experience boundary"
```

## Public Experience Completion Criteria

- All route-contract public surfaces render with Croatian headings, shared navigation and footer; `/portal` remains a clearly marked development shell.
- Home, services, packages, pricing and package detail pages use the Foundation catalogue and render exactly €50, €150, €300, €500 and €1,000.
- Unknown package/article slugs return 404 and never invent content or prices.
- Primary/secondary CTAs are honest internal links; no checkout, payment, form submission, upload, auth or workspace mutation exists.
- Process content explicitly preserves QC and Daniel's final approval gate.
- Examples are all visibly labelled illustrative; articles are educational and contain no fabricated proof.
- Public content is usable without JavaScript motion/3D; reduced-motion and keyboard smoke pass.
- Mobile route smoke has no horizontal overflow; focus is visible and navigable.
- Exact quality commands, content tests, route tests, secret audit and diff audit pass on the final HEAD.
- No Core/Supabase, Commerce, payment, AI or external integration code/configuration is introduced.
- The phase is reviewable/demo-ready only; it is not a production GO and does not resolve the deferred business/legal decisions.

## Deferred Decisions Owned by Later Review

The plan deliberately does not invent or finalize: exact standard-package scope/length and deliverables, turnaround tiers and urgent premium, the 90-day revision/support rule, final visual identity/logo/colors/type, final consumer/privacy wording, business entity/trader information, domain/business email, payment provider approval, auth/RLS, upload policy enforcement, analytics and external integration terms. These are explicit deferred decisions, not silently omitted behavior; the public content must use the explicit non-binding boundary text until the affected phase approves them.

## Self-review

- Spec coverage: public site surfaces, catalogue/pricing, responsible-use copy, Daniel approval language, editorial direction, reduced motion, WCAG baseline, mobile usability, testing and no-fabricated-proof rules are mapped to Tasks 1–6.
- Scope check: no Core platform, live backend, Commerce, Processing integrations, production secrets or paid dependency is assigned to any task.
- Type consistency: `PublicPackageContent` consumes Foundation `ProjectKind`/catalogue values; `getPublicPackageBySlug()` returns `PublicPackageContent | undefined`; dynamic pages use `notFound()` for `undefined`.
- Review focus coverage: unknown slugs are tested in Task 1/6, immutable price projection in Task 1/3, CTA honesty in Task 2/3, fabricated-proof labels in Task 1/4, and mobile/reduced-motion/focus in Task 5/6.
- Placeholder scan: implementation steps contain concrete commands, interfaces, expected failures and acceptance behavior; deferred decisions have explicit boundary text and ownership.
