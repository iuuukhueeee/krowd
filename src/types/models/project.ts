import { ProjectStatus } from "@/types/enums/project-status";

export interface ProjectModel {
  projectId: number;
  projectName: string;
  description: string;
  areaName: string;
  fieldName: string;
  image: string;
  createAt: Date;
  brand: string;
  startDate: Date;
  endDate: Date;
  status: ProjectStatus;
}
