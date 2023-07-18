import { Flex, Stack, Table } from "@mantine/core";
import { IconClockHour2 } from "@tabler/icons-react";

import POProjectRow from "@/features/project/components/po-row";
import RankCard from "@/features/statistic/components/rank-card";
import useProjects from "@/services/po/use-projects";

export default function ProjectView() {
  const { data } = useProjects();

  const rows = data?.data.map((row) => <POProjectRow project={row} key={row.projectId} />);

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
            <th style={{ textAlign: "center" }}>Status</th>
            <th style={{ textAlign: "right" }}>Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Stack>
  );
}
