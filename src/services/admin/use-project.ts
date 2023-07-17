import { useMutation, useQueryClient } from "@tanstack/react-query";

import { adminApi } from "@/api";

const queryKey = ["admin", "project"];

export default function useProject() {
  const queryClient = useQueryClient();

  const approve = useMutation({
    mutationFn: adminApi.putApproveProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const reject = useMutation({
    mutationFn: adminApi.putApproveProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const approveProject = (id: number) => approve.mutate(id);
  const rejectProject = (id: number) => reject.mutate(id);

  return { approveProject, rejectProject };
}
