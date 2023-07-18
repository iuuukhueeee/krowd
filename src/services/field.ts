import { useQuery } from "@tanstack/react-query";

import { fieldApi } from "@/api";
import generateCustomSelectList from "@/utils/generate-custom-select-list";

const queryKey = ["field"];

export default function useQueryField() {
  const query = useQuery({
    queryKey,
    queryFn: () => fieldApi.getFields(),
  });

  const selectList = generateCustomSelectList(query.data?.data || [], {
    label: "name",
    description: "fieldDescription",
    value: "fieldId",
    searchString: ["name", "fieldDescription"],
  });

  return { ...query, selectList };
}
