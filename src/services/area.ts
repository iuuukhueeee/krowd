import { useQuery } from "@tanstack/react-query";

import { areaApi } from "@/api";
import generateCustomSelectList from "@/utils/generate-custom-select-list";

const queryKey = ["area"];

export default function useQueryArea() {
  const query = useQuery({
    queryKey,
    queryFn: () => areaApi.getAreas(),
  });

  const selectList = generateCustomSelectList(query.data?.data || [], {
    label: "city",
    description: "district",
    value: "areaId",
    searchString: ["details", "district", "city"],
  });

  return { ...query, selectList };
}
