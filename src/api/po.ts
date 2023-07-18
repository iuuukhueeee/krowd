import axiosInstance from "@/configs/axios";
import { ProjectModel } from "@/types/models/project";

const ENDPOINT = "po/project";

const po = {
  async postProject(project: Partial<ProjectModel>) {
    const response = await axiosInstance.post<ProjectModel>(`${ENDPOINT}`, project);
    return response;
  },
  putProject: (id: number) => async (project: Partial<ProjectModel>) => {
    const response = await axiosInstance.put<ProjectModel>(`${ENDPOINT}/${id}`, project);
    return response;
  },
  async getProject() {
    const response = await axiosInstance.get<ProjectModel[]>(`${ENDPOINT}/getProject`);
    return response;
  },
};

export default po;
