import { useQuery } from "@tanstack/react-query";

import { adminApi } from "@/api";

const queryKey = ["admin", "project"];

export default function useProjects() {
  const query = useQuery({
    queryKey,
    queryFn: () => adminApi.getProjectByStatus(),
  });

  return query;
}
