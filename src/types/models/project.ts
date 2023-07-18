import { ApproveStatus } from "@/types/enums/project-status";

export interface ProjectModel {
  projectId: number;
  projectName: string;
  description: string;
  areaName: string;
  fieldName: string;
  image: string;
  createAt: Date;
  brand: string;
  startDate: string;
  endDate: string;
  status: ApproveStatus;
  fieldId: number;
  areaId: number;
  investmentTargetCapital: number;
  targetCapital: number;
  sharedRevenue: number;
  multiplier: number;
  duration: number;
  projectDescription: string;
  businessLicense: string;
  paidAmount: number;
  remainingAmount: number;
  investedCapital: number;
}
