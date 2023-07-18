import { useQuery } from "@tanstack/react-query";

import { poApi } from "@/api";

const queryKey = ["admin", "project"];

export default function useProjects() {
  const query = useQuery({
    queryKey,
    queryFn: () => poApi.getProject(),
  });

  return query;
}
