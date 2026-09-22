# Tvoj Pisac — Foundation

Foundation je siguran Next.js skeleton za Tvoj Pisac. Početni UI je na hrvatskom i spreman za kasnije faze, ali ova faza ne povezuje produkcijske servise.

## Preduvjeti

- Node.js i npm
- Chromium za Playwright: `npx playwright install chromium`

## Lokalni workflow

```bash
npm ci
npm run dev
```

Razvojni server je dostupan na `http://localhost:3000`. Za izolirani E2E smoke test koristi se `127.0.0.1:3210` kroz Playwright konfiguraciju.

Quality commands:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

## Foundation scope

Implementirano je:

- eksplicitni project lifecycle i odbijanje nepoznatih statusa;
- Danielovo obavezno final approval pravilo prije `Delivered`;
- katalog s cijenama €50, €150, €300, €500 i €1.000;
- immutable accepted-offer snapshot s `scopeVersion` i `acceptedAt`;
- URL-only environment contract i `.env.example`;
- public, client i admin route shells sa shared headerom;
- reduced-motion CSS baseline i mobile route smoke testovi.

U ovoj fazi nema checkouta, paymenta, live Supabasea, produkcijskih secretsa, AI API poziva, upload workflowa, autentikacije ni Katedra/Lekta/WordReplica/Drive/calendar/email integracija.

## Autoritativni dokumenti

Implementacija slijedi, ovim redom:

1. `docs/superpowers/specs/2026-09-22-tvoj-pisac-design.md`
2. `docs/superpowers/plans/2026-09-22-tvoj-pisac-master.md`
3. `docs/superpowers/plans/2026-09-22-tvoj-pisac-foundation.md`

Foundation ne izmišlja odluke koje pripadaju kasnijim fazama. Produkcijski secrets mogu se dodati tek nakon što je repozitorij privatan i nakon zasebnog odobrenja odgovarajuće faze.

## Secrets

Ne commitati `.env` datoteke, API ključeve, tokene, service-role ključeve, privatne certifikate ni druge credentials. Commitati se smije samo `.env.example` s placeholder vrijednostima.
