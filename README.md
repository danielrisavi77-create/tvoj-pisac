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

## Public Experience granica

Public Experience je pregledna, demo-spremna javna prezentacija na hrvatskom jeziku. Struktura sadržaja ostaje spremna za lokalizaciju, ali ova faza ne predstavlja plaćeno javno lansiranje.

Javne rute su:

- `/` — početna stranica
- `/usluge` — usluge
- `/paketi` i `/paketi/[slug]` — katalog i detalj paketa
- `/cijene` — cjenik
- `/proces` — proces rada
- `/primjeri` — primjeri
- `/faq` — česta pitanja
- `/clanci` i `/clanci/[slug]` — edukativni članci
- `/o-nama` — informacije o usluzi
- `/kontakt` — kontaktna granica bez obrasca ili izmišljenog kanala

Prikazane standardne cijene su točno: seminar €50, završni rad €150, diplomski/master's rad €300, specijalistički rad €500 i doktorski rad €1,000. Svaka cijena vrijedi samo za definirani standardni paket; opseg, isporuke, rok i materijalne promjene potvrđuju se prije prihvata ponude. Složeni, empirijski, neuobičajeno opsežni ili nestandardni radovi traže ručnu procjenu izvedivosti i prilagođenu ponudu.

Primjeri nisu dokaz rada za klijenta: svaki neklijentski primjer mora biti jasno označen kao ilustrativan. Javne stranice ne izmišljaju svjedočanstva, rezultate, izvore, kvalifikacije ni portfolio dokaze. Dekorativno kretanje je samo progresivno poboljšanje; uz `prefers-reduced-motion` kretanje se smanjuje ili isključuje, a sadržaj, hijerarhija i CTA poveznice ostaju jednako dostupni.

U ovoj fazi namjerno ne postoje autentikacija, slanje intake zahtjeva, uploadi, Supabase, checkout, plaćanje, AI, Katedra, Lekta, WordReplica ni druge vanjske integracije (uključujući Drive, kalendar i e-poštu). CTA poveznice ne stvaraju narudžbu, korisnički prostor ni bilo kakvu vanjsku radnju.

Prije plaćenog lansiranja ostaju otvorene odluke o točnom opsegu/isporukama paketa, rokovima, revizijama i podršci, pravnom i potrošačkom tekstu, vizualnom identitetu te poslovnom kontaktnom kanalu. Te se odluke ne smiju prešutno izmišljati u javnom sadržaju.

## Autoritativni dokumenti

Implementacija slijedi, ovim redom:

1. `docs/superpowers/specs/2026-09-22-tvoj-pisac-design.md`
2. `docs/superpowers/plans/2026-09-22-tvoj-pisac-master.md`
3. `docs/superpowers/plans/2026-09-22-tvoj-pisac-foundation.md`

Foundation ne izmišlja odluke koje pripadaju kasnijim fazama. Produkcijski secrets mogu se dodati tek nakon što je repozitorij privatan i nakon zasebnog odobrenja odgovarajuće faze.

## Secrets

Ne commitati `.env` datoteke, API ključeve, tokene, service-role ključeve, privatne certifikate ni druge credentials. Commitati se smije samo `.env.example` s placeholder vrijednostima.
