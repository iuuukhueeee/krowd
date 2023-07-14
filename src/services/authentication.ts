import { AxiosError } from "axios";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { authenticationApi } from "@/api";
import { AuthenticationModel } from "@/types/models/authentication";
import { Request } from "@/types/models/request";

interface AuthenticationState {
  authentication: Request & {
    data: AuthenticationModel | null;
  };
  getAuthentication: () => void;
}

const useAuthentication = create(
  immer<AuthenticationState>((set) => ({
    authentication: {
      data: null,
      fetching: false,
    },
    getAuthentication: async () => {
      set((state) => {
        state.authentication.fetching = true;
      });
      try {
        const user = await authenticationApi.get();
        set((state) => {
          state.authentication.data = user.data;
        });
      } catch (error) {
        set((state) => {
          state.authentication.error = error as AxiosError;
        });
      } finally {
        set((state) => {
          state.authentication.fetching = false;
        });
      }
    },
  })),
);

export default useAuthentication;
