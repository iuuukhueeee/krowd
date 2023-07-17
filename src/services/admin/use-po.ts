import { useMutation, useQueryClient } from "@tanstack/react-query";

import { adminApi } from "@/api";

const queryKey = ["admin", "user"];

export default function usePO() {
  const queryClient = useQueryClient();

  const approve = useMutation({
    mutationFn: adminApi.putApprovePO,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const reject = useMutation({
    mutationFn: adminApi.putRejectPO,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const approvePO = (id: number) => approve.mutate(id);
  const rejectPO = (id: number) => reject.mutate(id);

  return { approvePO, rejectPO };
}
