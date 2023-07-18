import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ActionIcon,
  Anchor,
  Avatar,
  Button,
  createStyles,
  Group,
  HoverCard,
  Image,
  Menu,
  rem,
  Text,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { IconChevronDown, IconEdit, IconTrash } from "@tabler/icons-react";
import { pascalCase } from "change-case";
import dayjs from "dayjs";

import { ApproveStatus } from "@/types/enums/project-status";
import { ProjectModel } from "@/types/models/project";
import { getStatusColor } from "@/utils/color";
import generateAvatar from "@/utils/generate-avatar";
import createPopup from "@/utils/reate-popup";
import { isValidUrl } from "@/utils/validation";

const useStyles = createStyles((theme) => ({
  button: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  menuControl: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    border: 0,
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
  },
}));

interface ProjectRowProps {
  project: ProjectModel;
}

export default function POProjectRow({ project }: ProjectRowProps) {
  const { classes, theme } = useStyles();
  const navigate = useNavigate();

  const menuIconColor = theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 5 : 6];

  const avatar = useMemo(() => generateAvatar(project.projectId.toString()), [project]);

  const handleUpdate = () => navigate(`/po/update-project/${project.projectId}`);

  const isProjectApproved = project.status === ApproveStatus.APPROVED;

  const handleOpenDesciption = () =>
    createPopup(`/project/${project.projectId}`, project.projectName, 1440, 720);

  return (
    <tr key={project.projectId}>
      <td>{project.projectId}</td>
      <td>
        <UnstyledButton>
          <Group>
            <HoverCard width={280} shadow="md">
              <HoverCard.Target>
                <Avatar size={40} src={isValidUrl(project.image) ? project.image : avatar}>
                  PR
                </Avatar>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Image src={isValidUrl(project.image) ? project.image : avatar} />
              </HoverCard.Dropdown>
            </HoverCard>
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
      <td align="center">
        <Anchor color={getStatusColor(project.status)}>{pascalCase(project.status)}</Anchor>
      </td>
      <td align="right">
        <Group noWrap spacing={0} position="right">
          <Tooltip
            label={"This project can't be start because it is not approved yet."}
            disabled={isProjectApproved}
          >
            <div>
              <Button className={classes.button} disabled={!isProjectApproved}>
                Start
              </Button>
            </div>
          </Tooltip>
          <Menu transitionProps={{ transition: "pop" }} position="bottom-end" withinPortal>
            <Menu.Target>
              <ActionIcon
                variant="filled"
                color={theme.primaryColor}
                size={36}
                className={classes.menuControl}
              >
                <IconChevronDown size="1rem" stroke={1.5} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={handleUpdate}
                icon={<IconEdit size="1rem" stroke={1.5} color={menuIconColor} />}
              >
                Modify
              </Menu.Item>
              <Menu.Item color="red" icon={<IconTrash size="1rem" stroke={1.5} color="red" />}>
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </td>
    </tr>
  );
}
