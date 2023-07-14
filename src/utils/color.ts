import { ApproveStatus } from "@/types/enums/project-status";

export const getStatusColor = (status: ApproveStatus) => {
  if (status === ApproveStatus.PENDING) return "yellow";
  if (status === ApproveStatus.APPROVED) return "green";
  if (status === ApproveStatus.REJECTED) return "red";
};
