import {
  canTransition,
  parseProjectStatus,
} from "@/domain/projects";

describe("project lifecycle", () => {
  it("allows paid work to start", () => {
    expect(canTransition("paid", "in_progress")).toBe(true);
  });

  it("allows quality control to await final approval", () => {
    expect(canTransition("qc", "awaiting_final_approval")).toBe(true);
  });

  it("rejects a direct lead to delivered transition", () => {
    expect(canTransition("lead", "delivered")).toBe(false);
  });

  it("rejects unknown project statuses", () => {
    expect(() => parseProjectStatus("unknown-status")).toThrow(/status/i);
  });
});
