import { useQuery } from "@tanstack/react-query";

import { userApi } from "@/api";

export const useQueryUser = () => {
  return useQuery({ queryKey: [], queryFn: userApi.getUser });
};
