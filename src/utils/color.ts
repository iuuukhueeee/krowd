import { ProjectStatus } from "@/types/enums/project-status";

export const getStatusColor = (status: ProjectStatus) => {
  if (status === ProjectStatus.PENDING) return "yellow";
  if (status === ProjectStatus.APPROVED) return "green";
  if (status === ProjectStatus.REJECTED) return "red";
};
