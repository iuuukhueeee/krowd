import axiosInstance from "@/configs/axios";
import { ProjectModel } from "@/types/models/project";

const ENDPOINT = "projects";

const project = {
  async getProject(id: number) {
    const response = await axiosInstance.get<ProjectModel>(`${ENDPOINT}/project/${id}`);
    return response;
  },
};

export default project;
