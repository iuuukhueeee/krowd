import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { projectApi } from "@/api";

const queryKey = ["project"];

export default function useProject(projectId: number) {
  const [id, setId] = useState(projectId);

  const query = useQuery({
    queryKey: [...queryKey, id],
    queryFn: () => projectApi.getProject(id),
  });
  return { ...query, setId };
}
