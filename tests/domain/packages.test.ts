import {
  createOfferSnapshot,
  STANDARD_PRICES_EUR,
} from "@/domain/packages";

describe("service catalogue", () => {
  it("keeps the Foundation prices exact", () => {
    expect(STANDARD_PRICES_EUR).toEqual({
      seminar: 50,
      final: 150,
      masters: 300,
      specialist: 500,
      doctoral: 1000,
    });
  });

  it("keeps an accepted offer price after catalogue changes", () => {
    const snapshot = createOfferSnapshot("masters", {
      scopeVersion: "foundation-v1",
      acceptedAt: "2026-09-22T12:00:00.000Z",
    });
    const copiedCatalogue = { ...STANDARD_PRICES_EUR };

    copiedCatalogue.masters = 350;

    expect(snapshot.priceEur).toBe(300);
    expect(copiedCatalogue.masters).toBe(350);
  });
});
