export const PROJECT_STATUSES = [
  "lead",
  "qualified",
  "offer_pending",
  "offer_accepted",
  "payment_pending",
  "paid",
  "in_progress",
  "waiting_for_client",
  "qc",
  "awaiting_final_approval",
  "delivered",
  "revisions",
  "closed",
  "rejected",
  "cancelled",
  "refunded",
] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

const transitions: Record<ProjectStatus, readonly ProjectStatus[]> = {
  lead: ["qualified", "rejected", "cancelled"],
  qualified: ["offer_pending", "rejected", "cancelled"],
  offer_pending: ["offer_accepted", "rejected", "cancelled"],
  offer_accepted: ["payment_pending", "rejected", "cancelled"],
  payment_pending: ["paid", "cancelled"],
  paid: ["in_progress", "cancelled", "refunded"],
  in_progress: ["waiting_for_client", "qc", "cancelled"],
  waiting_for_client: ["in_progress", "cancelled"],
  qc: ["awaiting_final_approval", "in_progress"],
  awaiting_final_approval: ["delivered", "in_progress"],
  delivered: ["revisions", "closed"],
  revisions: ["qc", "closed"],
  closed: [],
  rejected: [],
  cancelled: [],
  refunded: [],
};

export function parseProjectStatus(value: unknown): ProjectStatus {
  if (
    typeof value !== "string" ||
    !PROJECT_STATUSES.includes(value as ProjectStatus)
  ) {
    throw new Error(`Unknown project status: ${String(value)}`);
  }

  return value as ProjectStatus;
}

export function canTransition(
  from: unknown,
  to: unknown,
): boolean {
  const source = parseProjectStatus(from);
  const destination = parseProjectStatus(to);

  return transitions[source].includes(destination);
}
