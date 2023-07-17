import { useQuery, useQueryClient } from "@tanstack/react-query";

import { userApi } from "@/api";
import { signOutWithGoogle } from "@/features/auth/services/google";

export const useQueryUser = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["user", "login"],
    queryFn: userApi.getUser,
    retry: false,
    onError: () => {
      queryClient.setQueryData(["user", "login"], null);
      signOutWithGoogle();
    },
  });
};
