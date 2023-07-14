import { create } from "zustand";

import { authenticationApi } from "@/api";
import { AuthenticationModel } from "@/types/models/authentication";

interface AuthenticationState {
  me: AuthenticationModel | null;
  get: () => void;
}

const useAuthentication = create<AuthenticationState>((set) => ({
  me: null,
  get: async () => {
    const user = await authenticationApi.get();
    set({ me: user.data });
  },
}));

export default useAuthentication;
