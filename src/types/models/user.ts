import { ApproveStatus } from "@/types/enums/project-status";

export interface UserModel {
  userId: number;
  roleId: string;
  full_name: string;
  email: string;
  phone: string;
  avatar: string;
  id_card: string;
  gender: string;
  birthdate: Date;
  taxIdentification: string;
  address: string;
  bankName: string;
  bank_account: string;
  momo: string;
  createdAt: Date;
  status: ApproveStatus;
  enabled: boolean;
  fullName: string;
}
