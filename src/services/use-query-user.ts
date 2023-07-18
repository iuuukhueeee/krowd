import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { userApi } from "@/api";

export const useQueryUser = () => {
  return useQuery({
    queryKey: ["user", "login"],
    queryFn: userApi.getUser,
    retry: false,
  });
};

export const usePutUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: userApi.putUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });

  return mutation;
};
