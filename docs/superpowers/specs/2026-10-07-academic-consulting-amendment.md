# Tvoj Pisac: amendment for academic consulting

**Date:** 2026-10-07  
**Status:** Working scope for the first website  
**Owner:** Daniel Rišavi

This amendment is the current source of truth for Tvoj Pisac's commercial offer and first public website. It supersedes conflicting academic-work package, pricing, delivery and architecture choices in the 2026-09-22 plans and specification. The earlier documents remain historical design material.

## Purpose

Tvoj Pisac helps students make progress on their own academic work through consultations, coaching and bounded editorial support. The student remains responsible for the research, decisions, argument and final submitted text.

The first site is a low-cost lead-generation page for these consulting services. It is not a marketplace for finished academic work and does not promise a grade, acceptance or detector result.

## Services in scope

- **Planning consultation:** narrow the student's question, map requirements and agree on a feasible work plan.
- **Methodology and research consultation:** discuss research design, methods, sampling, analysis options and limitations. The student makes and documents the final choices.
- **Feedback on a student-authored draft:** explain issues in structure, reasoning and clarity using comments and discussion. Do not replace the draft with a ready-to-submit text.
- **Language and formatting support:** proofread and format text supplied by the student, preserve the student's voice and use tracked changes or comments. Substantive rewriting is out of scope.
- **Presentation and defense practice:** rehearse a student's own presentation and explain how to prepare for questions.
- **Academic-integrity and AI-use consultation:** help the student understand applicable course rules and document permitted assistance accurately.

Each engagement has a written scope, duration, deliverables and price agreed before it begins. Prices are based on the consulting service and time/scope, never on the academic degree or value of a completed submission. No fixed rates are published until Daniel approves them.

## Out of scope

- Writing, completing, buying or selling a graded assignment, thesis, dissertation, presentation or other assessed deliverable for a student to submit as their own.
- Replacing the student's argument or analysis with consultant-authored content.
- Fabricating sources, data, results, credentials, testimonials or outcomes.
- Evading AI/plagiarism detection or concealing authorship contributions.
- Promising a grade, pass, acceptance, originality score or institutional approval.

If a request falls outside scope, decline it and offer an in-scope consultation only when that would be a genuine fit.

## Client journey

1. The student chooses a consulting topic and asks for an initial conversation.
2. Daniel confirms the request is within scope, the applicable course rules are understood, and the time, price and deliverables are clear.
3. The student brings their own question, draft, materials or data to the session. Any comments or edits are advisory and visible.
4. The student decides what to apply, completes the work and remains its author.

The first website will not accept or retain uploaded academic documents. Its contact interaction opens a prefilled email draft in the visitor's own mail client. No form data is sent to or stored by the site.

## Claims and disclosure

Use plain language to state that Tvoj Pisac provides consultations and feedback, not work for submission. Do not imply formal university affiliation, professional accreditation, guaranteed outcomes or qualifications not documented by the owner. If AI tools are used in a specific engagement, disclose their role and follow the student's applicable institutional rules.

## First-site technical scope

- Static, responsive HTML, CSS and small vanilla JavaScript page, hosted as a static site.
- No account system, client portal, uploads, payment checkout, analytics or server-side storage.
- Contact email is a configuration value and must be supplied and tested before public launch.
- The earlier Next.js/Supabase client-platform proposal is deferred. Reconsider it only after the consulting offer has paying clients and a demonstrated need for private workspaces or automation.

## Release checks

Before public launch, confirm the contact address, service descriptions, prices, business identity, privacy/contact wording and any required consumer information. Test keyboard navigation, mobile layout, reduced motion, contrast, links and the email-draft flow. Do not publish a non-functional lead form or placeholder contact details.
