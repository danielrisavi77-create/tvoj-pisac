import {
  PROJECT_KIND_LABELS,
  STANDARD_PRICES_EUR,
  type ProjectKind,
} from "@/domain/packages";

export type PublicNavItem = {
  label: string;
  path: string;
  secondary?: boolean;
};

export const PUBLIC_NAV_ITEMS: readonly PublicNavItem[] = [
  { label: "Početna", path: "/" },
  { label: "Usluge", path: "/usluge" },
  { label: "Paketi", path: "/paketi" },
  { label: "Cijene", path: "/cijene" },
  { label: "Proces", path: "/proces" },
  { label: "Primjeri", path: "/primjeri" },
  { label: "FAQ", path: "/faq" },
  { label: "Članci", path: "/clanci" },
  { label: "O nama", path: "/o-nama" },
  { label: "Kontakt", path: "/kontakt" },
  { label: "Portal", path: "/portal", secondary: true },
];

export type PublicPackageSlug =
  | "seminarski"
  | "zavrsni"
  | "diplomski"
  | "specijalisticki"
  | "doktorski";

export type PublicPackageContent = {
  projectKind: ProjectKind;
  slug: PublicPackageSlug;
  title: string;
  shortDescription: string;
  scopeNote: string;
  priceEur: number;
  priceNote: string;
};

const SCOPE_NOTE =
  "Točan opseg, rok, formati i uvjeti potvrđuju se prije prihvata ponude. Isporuke i sve materijalne izmjene opsega potvrđuju se prije prihvata ponude.";
const PRICE_NOTE =
  "Standardna cijena vrijedi za definirani standardni paket; složeniji ili nestandardni rad ide na ručnu procjenu.";

const PACKAGE_DEFINITIONS: readonly {
  projectKind: ProjectKind;
  slug: PublicPackageSlug;
  shortDescription: string;
}[] = [
  {
    projectKind: "seminar",
    slug: "seminarski",
    shortDescription: "Podrška pri strukturiranju i razradi seminarskog rada.",
  },
  {
    projectKind: "final",
    slug: "zavrsni",
    shortDescription: "Podrška pri planiranju i razradi završnog rada.",
  },
  {
    projectKind: "masters",
    slug: "diplomski",
    shortDescription: "Podrška pri organizaciji diplomskog ili master's rada.",
  },
  {
    projectKind: "specialist",
    slug: "specijalisticki",
    shortDescription: "Podrška pri organizaciji specijalističkog rada.",
  },
  {
    projectKind: "doctoral",
    slug: "doktorski",
    shortDescription: "Podrška pri organizaciji doktorskog rada.",
  },
];

export const PUBLIC_PACKAGES: readonly PublicPackageContent[] =
  PACKAGE_DEFINITIONS.map(({ projectKind, slug, shortDescription }) => ({
    projectKind,
    slug,
    title: PROJECT_KIND_LABELS[projectKind],
    shortDescription,
    scopeNote: SCOPE_NOTE,
    priceEur: STANDARD_PRICES_EUR[projectKind],
    priceNote: PRICE_NOTE,
  }));

export function getPublicPackageBySlug(
  slug: string,
): PublicPackageContent | undefined {
  return PUBLIC_PACKAGES.find((item) => item.slug === slug);
}

export type PublicProcessStep = {
  title: string;
  description: string;
};

export const PUBLIC_PROCESS_STEPS: readonly PublicProcessStep[] = [
  {
    title: "Razgovor o potrebi",
    description: "Prikupljaju se osnovne informacije o temi, cilju i očekivanom opsegu.",
  },
  {
    title: "Potvrda opsega",
    description: SCOPE_NOTE,
  },
  {
    title: "Rad i provjera",
    description: "Dogovoreni materijali prolaze radnu i završnu provjeru.",
  },
  {
    title: "Završno odobrenje",
    description: "Prije završetka provjerava se da isporuka odgovara potvrđenom opsegu.",
  },
];

export type PublicFaq = {
  question: string;
  answer: string;
};

export const PUBLIC_FAQS: readonly PublicFaq[] = [
  {
    question: "Što uključuje standardni paket?",
    answer: "Standardni paket opisuje se prema jasno potvrđenom opsegu; nestandardni zahtjevi idu na ručnu procjenu.",
  },
  {
    question: "Kada se potvrđuju uvjeti?",
    answer: SCOPE_NOTE,
  },
  {
    question: "Je li rezultat automatski prihvatljiv na instituciji?",
    answer: "Ne. Institucionalna pravila, autorski zahtjevi i dopuštena pomoć ovise o tvojoj ustanovi i odgovornosti korisnika.",
  },
];

export type PublicExample = {
  label: string;
  description: string;
  isIllustrative: true;
  disclaimer: "Ilustrativni primjer — nije stvarni klijentski rezultat.";
};

export const PUBLIC_EXAMPLES: readonly PublicExample[] = [
  {
    label: "Struktura seminarskog rada — ilustrativni primjer",
    description: "Primjer organizacije poglavlja i istraživačkih pitanja.",
    isIllustrative: true,
    disclaimer: "Ilustrativni primjer — nije stvarni klijentski rezultat.",
  },
  {
    label: "Plan završnog rada — ilustrativni primjer",
    description: "Primjer kako se tema može razložiti na radne cjeline.",
    isIllustrative: true,
    disclaimer: "Ilustrativni primjer — nije stvarni klijentski rezultat.",
  },
  {
    label: "Organizacija istraživačkog projekta — ilustrativni primjer",
    description: "Primjer neutralne organizacije istraživačkog procesa.",
    isIllustrative: true,
    disclaimer: "Ilustrativni primjer — nije stvarni klijentski rezultat.",
  },
];

export type PublicArticle = {
  slug:
    | "prije-nego-sto-zatrazi-ponudu"
    | "kako-izgleda-proces"
    | "kontrola-kvalitete-i-odobrenje";
  title: string;
  summary: string;
  isEducational: true;
};

export const PUBLIC_ARTICLES: readonly PublicArticle[] = [
  {
    slug: "prije-nego-sto-zatrazi-ponudu",
    title: "Što pripremiti prije nego što zatražiš ponudu",
    summary: "Kratki vodič za pripremu teme, cilja i očekivanog opsega.",
    isEducational: true,
  },
  {
    slug: "kako-izgleda-proces",
    title: "Kako izgleda proces rada",
    summary: "Pregled koraka od početnog razgovora do završne provjere.",
    isEducational: true,
  },
  {
    slug: "kontrola-kvalitete-i-odobrenje",
    title: "Kontrola kvalitete i završno odobrenje",
    summary: "Zašto se opseg i završna provjera potvrđuju prije isporuke.",
    isEducational: true,
  },
];

export const PUBLIC_PAGE_COPY = {
  home: {
    eyebrow: "Tvoj Pisac",
    title: "Jasna podrška za akademske projekte.",
    description: "Pregled usluga, paketa i procesa na jednom mjestu.",
  },
  services: {
    title: "Usluge",
    description: "Neutralna podrška pri planiranju, strukturiranju i provjeri materijala.",
  },
  contact: {
    title: "Kontakt",
    description: "Informacije o sljedećem koraku i potvrdi opsega dostupne su na ovoj stranici.",
  },
} as const;
