# Tvoj Pisac consulting site MVP plan

**Scope amendment:** `docs/superpowers/specs/2026-10-07-academic-consulting-amendment.md`

## Goal

Publish a clear Croatian landing page that brings in suitable clients for academic mentoring and consulting. The page must make the student-owned-work boundary visible before a visitor sends an inquiry.

## First release

- Static site in `site/`, with no application dependencies.
- Single page with services, process, scope boundary, short founder introduction, FAQ and contact section.
- Services: planning, methodology/research consultation, feedback on the client's own draft, proofreading/formatting, presentation/defense practice, and permitted AI-use guidance.
- Prices are agreed in writing by session/scope. Do not display the retired degree-level catalogue.
- Contact uses a visitor-side `mailto:` draft. The site does not accept uploads or store inquiry data.
- Netlify publishes the `site/` directory. No paid services or secrets are required.
- Keep the client portal, Supabase, payment flow and document-upload processing disabled and out of the first release.

## Work sequence

1. Confirm the amended service scope and boundaries.
2. Build the semantic, responsive landing page and contact-draft behavior.
3. Review all copy for clear, accurate claims and no invented testimonials or credentials.
4. Verify accessibility basics, mobile layout, links, contact configuration, and static-site build/preview.
5. Confirm Daniel's public contact address and approved prices before public launch.
6. After real leads and paid consulting sessions, review which service needs repeatable forms or client workspaces before adding application infrastructure.

## Success signal

A qualified student can understand the service, its boundaries, expected process and next step without a call. Track early outcomes manually: suitable inquiries, consultations booked, paid sessions, time per engagement, and requests declined as out of scope.
