import { useEffect } from "react";
import { Table } from "@mantine/core";

import UserRow from "@/features/user/components/row";
import { useAdminService } from "@/services";

export default function POPage() {
  const { user, getAllUser } = useAdminService();

  useEffect(() => {
    getAllUser();
  }, []);

  const rows = user.map((row) => <UserRow data={row} key={row.userId} />);

  return (
    <Table sx={{ minWidth: 800 }} verticalSpacing="xl">
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>ID Card</th>
          <th>Bank</th>
          <th>Momo</th>
          <th>Created</th>
          <th style={{ textAlign: "right" }}>Status/Action</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
