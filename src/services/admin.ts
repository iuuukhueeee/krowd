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
  postUser: UserModel[]; // post processing user list (after filtered)
  filters: string[];
}
interface Action {
  getByStatus: (status?: string) => void;
  putApproveProject: (id: number) => void;
  putRejectProject: (id: number) => void;
  getAllUser: () => void;

  setFilter: (string: []) => void;
}

const useAdmin = create(
  immer<State & Action>((set) => ({
    projects: [],
    user: [],
    filters: [],
    postUser: [],
    getAllUser: async () => {
      const response = await adminApi.getAllUser();
      set((state) => {
        state.user = response.data;
        state.postUser = response.data;
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
    setFilter: (filters: string[]) => {
      // group search by role and status
      const searchs = filters.reduce<{
        role: string[];
        status: string[];
      }>(
        (acc, cur) => {
          const group = cur.split("/")[1] as "role" | "status";
          return {
            ...acc,
            [group]: [...acc[group], cur.split("/")[0].toLowerCase()],
          };
        },
        { role: [], status: [] },
      );
      set((state) => {
        state.filters = filters;
        state.postUser = state.user.filter((user) => {
          const role = user.roleId.toLowerCase();
          const status = user.status.toLowerCase();
          const isRoleMatch = searchs.role.length === 0 ? true : searchs.role.includes(role);
          const isStatusMatch =
            searchs.status.length === 0 ? true : searchs.status.includes(status);
          if (isRoleMatch && isStatusMatch) return user;
        });
      });
    },
  })),
);

export default useAdmin;
