# Tvoj Pisac

Tvoj Pisac provides academic mentoring and consulting. Students remain responsible for their own research, decisions, arguments and submitted work.

## Current scope

The current public offer and release boundaries are defined in:

- [Academic consulting scope amendment](docs/superpowers/specs/2026-10-07-academic-consulting-amendment.md)
- [Consulting site MVP plan](docs/superpowers/plans/2026-10-07-consulting-site-mvp.md)

The September 2026 degree-level catalogue is historical and is not the current offer.

## Preview the site locally

The site is static and has no install step:

```bash
python -m http.server 8000 --directory site
```

Then open `http://localhost:8000`.

Set the public contact address in `site/config.js` and test the generated email draft before launch. The current draft intentionally leaves that address unset. The page does not upload or store student documents or inquiry details.
