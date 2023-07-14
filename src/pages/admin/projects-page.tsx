import { useEffect } from "react";
import { Avatar, Flex, Group, Paper, Stack, Table, Text } from "@mantine/core";

import ProjectRow from "@/features/project/components/row";
import { useAdminService } from "@/services";

export default function ProjectsPage() {
  const { projects, getByStatus } = useAdminService();

  useEffect(() => {
    getByStatus();
  }, []);

  const rows = projects.map((row) => <ProjectRow project={row} key={row.projectId} />);

  return (
    <Stack>
      <Flex gap="lg">
        <Paper shadow="md" p="lg" w="100%">
          <Flex align="center">
            <Avatar size={40} color="blue">
              BH
            </Avatar>
            <div>
              <Text>Bob Handsome</Text>
              <Text size="xs" color="dimmed">
                bob@handsome.inc
              </Text>
            </div>
          </Flex>
        </Paper>
        <Paper shadow="md" p="lg">
          <Text>Paper is the most basic ui component</Text>
          <Text>
            Use it to create cards, dropdowns, modals and other components that require background
            with shadow
          </Text>
        </Paper>
        <Paper shadow="md" p="lg">
          <Text>Paper is the most basic ui component</Text>
          <Text>
            Use it to create cards, dropdowns, modals and other components that require background
            with shadow
          </Text>
        </Paper>
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
