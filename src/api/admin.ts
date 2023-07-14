import axiosInstance from "@/configs/axios";
import { ProjectModel } from "@/types/models/project";
import { UserModel } from "@/types/models/user";

const ENDPOINT = "admin";

const admin = {
  async putApproveProject(projectId: number) {
    const response = await axiosInstance.put(
      `${ENDPOINT}/approve-project`,
      {},
      {
        params: {
          project_id: projectId,
        },
      },
    );
    return response;
  },
  async putRejectProject(projectId: number) {
    const response = await axiosInstance.put(
      `${ENDPOINT}/reject-project`,
      {},
      {
        params: {
          project_id: projectId,
        },
      },
    );
    return response;
  },
  async getProjectByStatus(status?: string) {
    const response = await axiosInstance.get<ProjectModel[]>(`${ENDPOINT}/getByStatus`, {
      params: {
        status,
      },
    });
    return response;
  },
  async getAllUser() {
    const response = await axiosInstance.get<UserModel[]>(`${ENDPOINT}/all-user`);
    return response;
  },
};

export default admin;
