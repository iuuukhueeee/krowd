import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { adminApi } from "@/api";
import { ProjectModel } from "@/types/models/project";

interface State {
  projects: ProjectModel[];
}
interface Action {
  getByStatus: (status?: string) => void;
}

const useAdmin = create(
  immer<State & Action>((set) => ({
    projects: [],
    getByStatus: async (status?: string) => {
      const response = await adminApi.getProjectByStatus(status);
      set((state) => {
        state.projects = response.data;
      });
    },
  })),
);

export default useAdmin;
