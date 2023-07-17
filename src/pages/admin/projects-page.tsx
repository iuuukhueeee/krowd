import { Flex, Stack, Table } from "@mantine/core";
import { IconClockHour2 } from "@tabler/icons-react";

import ProjectRow from "@/features/project/components/row";
import RankCard from "@/features/statistic/components/rank-card";
import { useQueryAdminAllProject } from "@/services/use-query-admin";

export default function ProjectsPage() {
  const { data } = useQueryAdminAllProject();

  const rows = data?.data.map((row) => <ProjectRow project={row} key={row.projectId} />);

  return (
    <Stack>
      <Flex gap="lg">
        <RankCard avatar={{ children: <IconClockHour2 /> }} />
        <RankCard />
        <RankCard />
      </Flex>
      <Table sx={{ minWidth: 800 }} verticalSpacing="xl">
        <thead>
          <tr>
            <th>ID</th>
            <th>Project name</th>
            <th>Area</th>
            <th>Field</th>
            <th>Description</th>
            <th>Created</th>
            <th style={{ textAlign: "right" }}>Status/Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Stack>
  );
}
