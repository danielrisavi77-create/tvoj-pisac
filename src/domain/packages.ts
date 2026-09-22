export const PROJECT_KIND_LABELS = {
  seminar: "Seminarski rad",
  final: "Završni rad",
  masters: "Diplomski/master's rad",
  specialist: "Specijalistički rad",
  doctoral: "Doktorski rad",
} as const;

export type ProjectKind = keyof typeof PROJECT_KIND_LABELS;

export const STANDARD_PRICES_EUR: Readonly<Record<ProjectKind, number>> =
  Object.freeze({
    seminar: 50,
    final: 150,
    masters: 300,
    specialist: 500,
    doctoral: 1000,
  });

export interface OfferSnapshot {
  readonly projectKind: ProjectKind;
  readonly label: string;
  readonly priceEur: number;
  readonly currency: "EUR";
  readonly scopeVersion: string;
  readonly acceptedAt: string;
}

export function createOfferSnapshot(
  projectKind: ProjectKind,
  input: { scopeVersion: string; acceptedAt: string },
): OfferSnapshot {
  return Object.freeze({
    projectKind,
    label: PROJECT_KIND_LABELS[projectKind],
    priceEur: STANDARD_PRICES_EUR[projectKind],
    currency: "EUR" as const,
    scopeVersion: input.scopeVersion,
    acceptedAt: input.acceptedAt,
  });
}
