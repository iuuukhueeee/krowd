import { useEffect } from "react";
import { botttsNeutral } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import {
  Anchor,
  Avatar,
  createStyles,
  Group,
  Menu,
  rem,
  Table,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconBan, IconCheck } from "@tabler/icons-react";
import { pascalCase } from "change-case";
import dayjs from "dayjs";

import { useAdminService } from "@/services";
import { getStatusColor } from "@/utils/color";
import { isValidUrl } from "@/utils/validation";

const useStyles = createStyles((theme) => ({
  progressBar: {
    "&:not(:first-of-type)": {
      borderLeft: `${rem(3)} solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
}));

export interface TableReviewsProps {
  data: {
    title: string;
    author: string;
    year: number;
    reviews: { positive: number; negative: number };
  }[];
}

export default function Projects({ data }: TableReviewsProps) {
  const { classes, theme } = useStyles();
  const { projects, getByStatus } = useAdminService();

  useEffect(() => {
    getByStatus();
  }, []);

  const rows = projects.map((row) => {
    const avatar = createAvatar(botttsNeutral, {
      seed: row.projectId.toString(),
    }).toDataUriSync();

    return (
      <tr key={row.projectId}>
        <td>{row.projectId}</td>
        <td>
          <UnstyledButton>
            <Group>
              <Avatar size={40} src={isValidUrl(row.image) ? row.image : avatar}>
                PR
              </Avatar>
              <div>
                <Text>{row.projectName}</Text>
                <Text size="xs" color="dimmed">
                  {row.brand}
                </Text>
              </div>
            </Group>
          </UnstyledButton>
        </td>
        <td>{row.areaName}</td>
        <td>{row.fieldName}</td>
        <td>
          <Anchor>Description</Anchor>
        </td>
        <td>{dayjs(row.createAt).format("DD MMM YYYY")}</td>
        <td align="right">
          <Menu shadow="md" width={200} position="bottom-end">
            <Menu.Target>
              <Anchor color={getStatusColor(row.status)}>{pascalCase(row.status)}</Anchor>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item color="green" icon={<IconCheck size={14} />}>
                Approve
              </Menu.Item>
              <Menu.Item color="red" icon={<IconBan size={14} />}>
                Reject
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </td>
      </tr>
    );
  });

  return (
    // <ScrollArea>
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
    // </ScrollArea>
  );
}
