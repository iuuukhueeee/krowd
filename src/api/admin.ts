import axiosInstance from "@/configs/axios";
import { ProjectModel } from "@/types/models/project";

const ENDPOINT = "admin";

const admin = {
  async putApproveProject(projectId: number) {
    const response = await axiosInstance.put(`${ENDPOINT}/approve-project/${projectId}`);
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
};

export default admin;
