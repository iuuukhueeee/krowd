import { useMemo, useState } from "react";
import { botttsNeutral } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { useQuery } from "@tanstack/react-query";

import { adminApi } from "@/api";
import { isValidUrl } from "@/utils/validation";

export default function usePOs() {
  const query = useQuery({ queryKey: ["admin", "user"], queryFn: adminApi.getAllUser });
  const [filter, setFilter] = useState<string[]>([]);

  /**
   * transform filter to object
   * Example: ["admin/role", "active/status"] => { role: ["admin"], status: ["active"] }
   */
  const searchs = useMemo(
    () =>
      filter.reduce<{
        role: string[];
        status: string[];
      }>(
        (acc, cur) => {
          const group = cur.split("/")[1] as "role" | "status";
          return {
            ...acc,
            [group]: [...acc[group], cur.split("/")[0].toLowerCase()],
          };
        },
        { role: [], status: [] },
      ),
    [filter],
  );

  /**
   * this users is the filtered user depend on searchs
   */
  const users = useMemo(() => {
    if (!Array.isArray(query.data?.data)) return [];
    return (
      query.data?.data.filter((user) => {
        const role = user.roleId.toLowerCase();
        const status = user.status.toLowerCase();
        const isRoleMatch = searchs.role.length === 0 ? true : searchs.role.includes(role);
        const isStatusMatch = searchs.status.length === 0 ? true : searchs.status.includes(status);
        if (isRoleMatch && isStatusMatch) return user;
      }) || []
    );
  }, [query.data?.data, searchs.role, searchs.status]);

  const searchList = useMemo(() => {
    const user = query.data?.data || [];

    if (!Array.isArray(query.data?.data)) return [];

    return user.map((user) => {
      const avatar = createAvatar(botttsNeutral, {
        seed: user.email,
      }).toDataUriSync();

      return {
        image: isValidUrl(user.avatar) || avatar,
        label: user.full_name,
        value: user.email,
        description: user.email,
        searchString: JSON.stringify(user),
      };
    });
  }, [query.data?.data]);

  return { ...query, searchList, setFilter, filter, users };
}
