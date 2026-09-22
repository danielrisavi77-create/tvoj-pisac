import { assertDeliveryAllowed } from "@/domain/approval";

describe("final delivery approval", () => {
  it("rejects delivery without Daniel's explicit approval", () => {
    expect(() =>
      assertDeliveryAllowed({
        status: "awaiting_final_approval",
        qualityComplete: true,
        approvedByDaniel: false,
      }),
    ).toThrow(/approval/i);
  });

  it("rejects delivery when quality checks are incomplete", () => {
    expect(() =>
      assertDeliveryAllowed({
        status: "awaiting_final_approval",
        qualityComplete: false,
        approvedByDaniel: true,
      }),
    ).toThrow(/quality/i);
  });

  it("rejects delivery from any status other than final approval", () => {
    expect(() =>
      assertDeliveryAllowed({
        status: "qc",
        qualityComplete: true,
        approvedByDaniel: true,
      }),
    ).toThrow(/status/i);
  });

  it("allows delivery only after all release gates pass", () => {
    expect(
      assertDeliveryAllowed({
        status: "awaiting_final_approval",
        qualityComplete: true,
        approvedByDaniel: true,
      }),
    ).toBe(true);
  });
});
