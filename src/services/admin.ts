import { notifications } from "@mantine/notifications";
import { isAxiosError } from "axios";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { adminApi } from "@/api";
import { ApproveStatus } from "@/types/enums/project-status";
import { ProjectModel } from "@/types/models/project";
import { UserModel } from "@/types/models/user";

interface State {
  projects: ProjectModel[];
  user: UserModel[];
}
interface Action {
  getByStatus: (status?: string) => void;
  putApproveProject: (id: number) => void;
  putRejectProject: (id: number) => void;
  getAllUser: () => void;
}

const useAdmin = create(
  immer<State & Action>((set) => ({
    projects: [],
    user: [],
    getAllUser: async () => {
      const response = await adminApi.getAllUser();
      set((state) => {
        state.user = response.data;
      });
    },
    getByStatus: async (status?: string) => {
      const response = await adminApi.getProjectByStatus(status);
      set((state) => {
        state.projects = response.data;
      });
    },
    putApproveProject: async (id: number) => {
      try {
        await adminApi.putApproveProject(id);
        set((state) => {
          const index = state.projects.findIndex((p) => p.projectId === id);
          state.projects[index].status = ApproveStatus.APPROVED;
        });
      } catch (error) {
        if (isAxiosError(error)) {
          notifications.show({
            title: "Error",
            message: error.response?.data.error.message,
            color: "red",
          });
        }
      }
    },
    putRejectProject: async (id: number) => {
      try {
        await adminApi.putRejectProject(id);
        set((state) => {
          const index = state.projects.findIndex((p) => p.projectId === id);
          state.projects[index].status = ApproveStatus.REJECTED;
        });
      } catch (error) {
        if (isAxiosError(error)) {
          notifications.show({
            title: "Error",
            message: error.response?.data.error.message,
            color: "red",
          });
        }
      }
    },
  })),
);

export default useAdmin;
