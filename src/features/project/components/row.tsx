import { useMemo } from "react";
import { Anchor, Avatar, Box, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { IconBan, IconCheck } from "@tabler/icons-react";
import { pascalCase } from "change-case";
import dayjs from "dayjs";

import useProject from "@/services/admin/use-project";
import { ProjectModel } from "@/types/models/project";
import { getStatusColor } from "@/utils/color";
import generateAvatar from "@/utils/generate-avatar";
import createPopup from "@/utils/reate-popup";
import { isValidUrl } from "@/utils/validation";

interface ProjectRowProps {
  project: ProjectModel;
}

export default function ProjectRow({ project }: ProjectRowProps) {
  const { approveProject, rejectProject } = useProject();

  const avatar = useMemo(() => generateAvatar(project.projectId.toString()), [project]);

  const handleApprove = () => approveProject(project.projectId);
  const handleReject = () => rejectProject(project.projectId);

  const handleOpenDesciption = () =>
    createPopup(`/project/${project.projectId}`, project.projectName, 1440, 720);

  return (
    <tr key={project.projectId}>
      <td>{project.projectId}</td>
      <td>
        <UnstyledButton>
          <Group>
            <Avatar size={40} src={isValidUrl(project.image) ? project.image : avatar}>
              PR
            </Avatar>
            <div>
              <Text>{project.projectName}</Text>
              <Text size="xs" color="dimmed">
                {project.brand}
              </Text>
            </div>
          </Group>
        </UnstyledButton>
      </td>
      <td>{project.areaName}</td>
      <td>{project.fieldName}</td>
      <td>
        <Anchor onClick={handleOpenDesciption}>Description</Anchor>
      </td>
      <td>{dayjs(project.createAt).format("DD MMM YYYY")}</td>
      <td align="right">
        <Menu shadow="md" width={200} position="bottom-end">
          <Menu.Target>
            <Anchor color={getStatusColor(project.status)}>{pascalCase(project.status)}</Anchor>
          </Menu.Target>

          <Menu.Dropdown>
            <Box onClick={handleApprove}>
              <Menu.Item color="green" icon={<IconCheck size={14} />}>
                Approve
              </Menu.Item>
            </Box>
            <Box onClick={handleReject}>
              <Menu.Item color="red" icon={<IconBan size={14} />}>
                Reject
              </Menu.Item>
            </Box>
          </Menu.Dropdown>
        </Menu>
      </td>
    </tr>
  );
}
