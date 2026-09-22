# Tvoj Pisac — Product & System Design Specification

**Status:** Approved design baseline  
**Date:** 2026-09-22  
**Owner:** Daniel Rišavi

## 1. Purpose and principles

Tvoj Pisac is a premium web product for project intake, consulting, document preparation, communication, delivery, revisions and administration, initially for Croatia, Serbia and Bosnia and Herzegovina.

The service must be described truthfully. A consulting-led visual identity must not obscure the actual deliverable, authorship contribution or use of automation/AI. Client-facing copy states that purpose-built software and AI-assisted tools may be used, with human review before delivery.

For academic use, the product must not promise that commissioned material can be represented as the client's independently authored work. Terms and order flows must distinguish delivered assistance/material from institutional rules on authorship, disclosure and permitted assistance.

## 2. Goals

- Convert qualified visitors into paid projects.
- Support seminar, final, master's, specialist and doctoral project categories.
- Keep Daniel client-facing and the final delivery approver.
- Automate safe operational work while retaining human gates for non-standard acceptance, substantive negotiation, exceptions and final delivery.
- Give clients a private workspace without a conventional password.
- Integrate verified Katedra, Lekta, WordReplica, Drive, calendar, email and payment capabilities where appropriate.
- Measure qualified leads, conversion, time, processing cost, revisions and realized margin.
- No public launch before release gates pass.

## 3. Non-goals

No guaranteed grade/acceptance/scientific contribution; fabricated testimonials, sources, data, qualifications or team members; autonomous final delivery; public client documents by default; client documents as training/examples by default; unsupported server-side Word automation; arbitrary executable/macro uploads; dark patterns or misleading checkout copy.

## 4. Catalogue and pricing

| Category | Standard price |
|---|---:|
| Seminar project | €50 |
| Final/undergraduate project | €150 |
| Master's project | €300 |
| Specialist project | €500 |
| Doctoral project | €1,000 |

A fixed price applies only to a defined standard package. Before checkout, each package must define scope, deliverables, turnaround, research/data assumptions, formats, checks and material-scope-change rules.

Complex, empirical, unusually large or non-standard work routes to manual feasibility review and a custom offer before payment.

Additional services may include methodology, data analysis, editing, proofreading, translation, references/citations, formatting, presentation/oral preparation, essays, presentations and study materials.

Intake may accept all subject areas; acceptance is not automatic and requires responsible review feasibility.

## 5. Client journey

Primary CTA: **Zatraži ponudu**. Secondary: **Odaberi paket** and **Dogovori razgovor**.

Public site: Home, Services, package pages, Process, Pricing, Examples, About, FAQ, Articles, Contact, client-workspace entry and required privacy/consumer/business information.

### Intake

Initially required: project type, topic, faculty/institution. A verified email is required before final submission/private workspace creation.

Optional: discipline, scope, requested deadline, stage, description, budget, name, phone and files.

Initial upload allowlist: DOCX, PDF, XLSX, CSV, PPTX, TXT and common required image formats. Files are private, size-limited, validated beyond extension and checked before processing. Executables, macro-enabled Office files and arbitrary archives are rejected by default. File contents are untrusted input and cannot override system instructions.

### Qualification

Standard packages can use structured automated quoting only within package constraints. Manual review is mandatory for non-standard specialist/doctoral work, empirical/research-heavy work, unusual data/file requirements, deadlines outside capacity, ambiguous deliverables or work whose responsible review cannot be assured.

A requested deadline is not promised until confirmed. Urgent premiums remain disabled until turnaround tiers/capacity rules are approved.

### Payment

Target methods: bank transfer and cards. Production checkout stays disabled until the business entity, invoicing/tax handling, provider acceptance, consumer cancellation/withdrawal handling and package terms are ready. Failed payment never means paid; payment events must be idempotent.

### Workspace

Passwordless verified-email code/link access. Workspace shows scope/offer, status, deadline, payment, messages, files/deliveries, revisions and applicable terms/consents. Workspace is primary communication; email/WhatsApp are secondary.

### Delivery

Delivery may be final-only, staged, milestone-based or explicitly customized. Formats can include DOCX, PDF, PPTX, spreadsheets/data and agreed artifacts. Nothing enters Delivered until Daniel explicitly approves release.

## 6. Revisions and scope

Corrections required to meet agreed scope and minor same-scope revisions are free. New topic, new research, materially expanded length/deliverables or another substantial change is new paid scope.

Baseline proposal: 90 days of included post-delivery support unless otherwise agreed; configurable and legally reviewed before launch.

Late client material sets **Waiting for client** and requires a revised/proposed deadline rather than silently retaining an impossible date.

## 7. Cancellation and refunds

Do not implement a blanket no-refund rule. Before launch, consumer-law handling must be reviewed for target markets. Checkout/order records capture required information, requests/consents, acknowledgements, withdrawal/cancellation actions, timestamps and confirmations. Admin supports refunds/partial refunds where due.

## 8. Authorship and AI

Disclose purpose-built software/AI assistance where used. Never claim no AI when used; promise detector evasion; fabricate sources/data; guarantee grades; instruct false authorship claims; or market circumvention of academic-integrity rules.

The client controls use of delivered material but remains responsible for institutional rules; the service does not transform third-party/AI contribution into independent authorship.

## 9. Quality gate

Applicable checks are recorded: requirements match, source existence, citation integrity, data/calculations, language/editorial quality, formatting, tables/figures, completeness and argument/content review.

Automated checks assist but do not replace Daniel's release approval in v1. Delivered is impossible until required checks are completed/dispositioned and release is approved.

## 10. Workflow and automation

Lifecycle:
**Lead → Qualified → Offer pending → Offer accepted → Payment pending → Paid → In progress → Waiting for client (optional) → QC → Awaiting final approval → Delivered → Revisions (optional) → Closed**.

Rejected/cancelled/refunded states are separate and auditable.

Automation may handle acknowledgements, routing, eligible draft offers, reminders, mechanically verifiable statuses, processing jobs, QC orchestration, transactional notifications and delivery preparation.

Human gates: substantive negotiation, non-standard/ambiguous acceptance, price/scope/deadline exceptions, final delivery, judgment-based disputes/refunds.

Every job is idempotent, retry-safe, cost-bounded, time-bounded and auditable. Retry cannot double-charge, duplicate delivery or overwrite an approved artifact.

## 11. Integrations

- **Katedra:** process agreed requirements and workflow versions only after actual interfaces, reliability, costs and terms are verified.
- **Lekta:** supported document checks; represent only verified capabilities.
- **WordReplica:** Word-specific processing in a supported Windows/Word environment; v1 treats it primarily as an internal operator tool. Client installation is future scope.
- **Google Drive:** controlled working copy/archive; never the portal authorization layer; no public links by default.
- **Calendar:** availability and consultations.
- **Email:** notifications/correspondence; portal remains authoritative for order state.
- **AI providers:** commercial client workloads must use terms-compliant production access; personal subscriptions are not assumed to be an unlimited backend.

## 12. Architecture

One **Next.js + TypeScript** application for public site, client workspace and admin.

Dedicated **Supabase** project for Postgres, passwordless auth and private storage. Every exposed table uses RLS with ownership/authorization policies. Secrets/service-role keys are server-only; authorization never relies on user-editable metadata.

Netlify is the preferred initial host subject to final runtime/cost verification. Resend is the preferred transactional-email candidate. Stripe may be evaluated for cards but is not approved until provider acceptance of the accurately described model; bank transfer remains supported.

Observability: structured errors, safe integration/job logs, payment audit trail, admin-visible failures, uptime monitoring, backup/restore verification and client-safe errors.

## 13. Core data model

`users`, `client_profiles`, `leads`, `projects`, `project_scopes`, `offers`, `payments`, `project_messages`, `files`, `deliveries`, `revision_requests`, `quality_checks`, `workflow_jobs`, `appointments`, `consents`, `audit_events`, `service_packages`, `content_pages`.

Every client-owned record has explicit authorization. Sensitive admin records are never client-queryable merely because a user is authenticated.

## 14. Retention baseline

- Unconverted enquiries: delete 30 days after last relevant communication unless justified active negotiation.
- Active files: retain through performance and agreed support.
- Closed working files: delete/appropriately anonymize after 180 days unless specifically justified/agreed.
- Ordinary security/application logs: 30 days unless incident hold is justified.
- Backups: target 30-day rotation with deletion re-applied after restore.
- Invoices/statutory business records: applicable legal periods, separate from unnecessary project content.

These are configurable product defaults, not universal legal-period claims. Final privacy documentation maps category → purpose → legal basis → recipients → retention → rights.

## 15. Security

Private-by-default storage; RLS/cross-client isolation tests; rate limits for auth/intake/messages/uploads; secure state-changing flows and sessions; server-only secrets; upload allowlist/limits/validation/checks; untrusted-document handling; audit trail for payment/scope/delivery/consent/admin actions; idempotent callbacks; no client content in analytics; synthetic test fixtures; tested backup restore; pinned dependencies/lockfiles; pre-production security review.

## 16. Design

Direction: premium, editorial, professional, warm, distinctive; no generic AI aesthetic or fake corporate imagery; expressive typography, strong spacing and authentic/owned/licensed visuals.

Public pages may use a signature 3D scene, purposeful motion, interactive process visualization, modal previews and microinteractions. Portal/checkout/admin prioritize clarity.

Respect reduced-motion preferences. 3D/motion progressively degrade and can never block content, CTAs or checkout.

## 17. CMS and localization

Daniel can update public content/pricing through a protected lightweight admin CMS; structural changes remain Git-based. Publishing requires preview + explicit publish. Price changes never alter accepted orders retroactively.

Launch markets: Croatia, Serbia, Bosnia and Herzegovina. Initial language: Croatian. Architecture is localization-ready. EUR is the launch display currency unless business/legal requirements require otherwise.

## 18. Accessibility and performance

Target WCAG 2.2 AA for agreed scope: keyboard navigation, visible focus, semantic labels/errors, accessible modal focus, contrast, reduced motion, no animation-only information and mobile usability.

Performance is validated in lab and real-user data after launch. Advanced visuals cannot block fast first interaction or cause material layout instability.

## 19. Analytics

Privacy-respecting events: package viewed, quote started/submitted, consultation requested, offer accepted, checkout started, payment completed, project delivered, revision requested.

Admin metrics: qualified leads, conversion, paid projects/category, revenue, provider/processing cost, Daniel's time/project, turnaround, revision rate, realized margin.

Business target: at least 100 paid clients in first three months. This is an internal target, not a promise or forecast.

## 20. Budget

Initial cash setup budget: €100, excluding Daniel's own time and existing subscriptions. Planning baseline for ongoing fixed infrastructure: about €50–70/month before variable AI/API usage, card fees, accounting/legal costs, advertising, taxes and exceptional usage.

No paid dependency without explicit reason and cost review.

## 21. Testing

Required: domain/pricing unit tests; database/RLS integration tests; mocked/contract tests for external integrations; Playwright critical E2E; accessibility; upload-abuse; payment idempotency; cross-client isolation; failure/retry; backup/restore exercise.

Critical scenarios:
1. Client A cannot read/write Client B data/files.
2. Failed payment cannot start paid workflow.
3. Duplicate payment callback creates no duplicate payment/project/delivery.
4. Failed automation job is retryable without duplicate side effects.
5. A document cannot be delivered without Daniel's approval.
6. Upload rejection is safe and understandable.
7. Passwordless access cannot expose another client's workspace.
8. Price edits do not mutate accepted historical offers.
9. Reduced-motion mode preserves full usability.
10. Restore procedure recovers required data and reapplies deletion obligations.

## 22. Release gates

Public paid launch is **NO-GO** until all are true:
- business entity and required trader information are ready;
- package scopes/terms are final;
- payment/invoicing/tax workflow is verified;
- target-market consumer/privacy terms are reviewed;
- production payment provider accepts the accurately described model;
- auth/RLS isolation tests pass;
- critical E2E tests pass;
- real test payment + refund/cancellation path is verified;
- upload/security review passes;
- backup restore is demonstrated;
- integrations fail safely;
- Daniel's final-approval gate is enforced;
- mobile/accessibility/reduced-motion checks pass;
- content contains no fabricated proof or misleading claims;
- at least one full synthetic end-to-end order has been completed from intake through delivery/revision/closure.

## 23. Delivery phases

1. **Foundation:** repo rules, architecture skeleton, design tokens, test harness, environment contract.
2. **Public experience:** identity, marketing pages, catalogue, examples, FAQ, articles, responsive/motion system.
3. **Core platform:** passwordless auth, intake, projects, messages, files, statuses, admin/CMS.
4. **Commercial:** offers, packages, payment abstraction, bank transfer, compliant checkout/cancellation records.
5. **Processing:** QC model and verified Katedra/Lekta/WordReplica/Drive/calendar/email adapters.
6. **Hardening:** authorization, abuse/security, observability, backups, accessibility, performance, failure testing.
7. **Closed beta:** synthetic then controlled real workflows, measurement and fixes.
8. **Production gate:** final legal/business/technical GO-NO-GO.

## 24. Open decisions before implementation reaches the affected phase

These are intentionally deferred, not unspecified:
- exact standard-package scope/length and deliverables;
- standard turnaround tiers and urgent premium;
- final 90-day revision/support rule;
- exact monthly infrastructure ceiling within the proposed range;
- domain and business email provider;
- card processor approval;
- final visual identity/logo/colors/type;
- final consumer/privacy wording after business/legal review;
- verified technical contracts for Katedra, Lekta and WordReplica.

No deferred item may be silently invented by implementation. The affected feature stays disabled/configurable until its decision is approved.

## 25. Change control

This specification is the design baseline. Material changes to pricing model, academic-use positioning, payment/refund policy, authorization, final approval, data retention or integration trust boundaries require an explicit spec amendment before implementation.

Implementation starts only after this written specification is reviewed and approved.
