import { useMutation, useQueryClient } from "@tanstack/react-query";

import { poApi } from "@/api";

const queryKey = ["po", "project"];

export default function useProject() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: poApi.postProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  return { ...mutation };
}

export const useUpdateProject = (id: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: poApi.putProject(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [...queryKey, id] }),
  });

  return mutation;
};
