import { parseProjectStatus, type ProjectStatus } from "./projects";

export interface DeliveryApprovalInput {
  status: ProjectStatus | string;
  qualityComplete: boolean;
  approvedByDaniel: boolean;
}

export function assertDeliveryAllowed(
  input: DeliveryApprovalInput,
): true {
  const status = parseProjectStatus(input.status);

  if (status !== "awaiting_final_approval") {
    throw new Error("Delivery requires awaiting final approval status");
  }

  if (!input.qualityComplete) {
    throw new Error("Delivery requires completed quality checks");
  }

  if (!input.approvedByDaniel) {
    throw new Error("Delivery requires Daniel approval");
  }

  return true;
}
