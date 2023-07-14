import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { userApi } from "@/api";
import { UserModel } from "@/types/models/user";

interface State {
  user: UserModel | null;
}
interface Action {
  getUser: () => void;
}

const useUser = create(
  immer<State & Action>((set) => ({
    user: null,
    getUser: async () => {
      const response = await userApi.getUser();
      set((state) => {
        state.user = response.data;
      });
    },
  })),
);

export default useUser;
