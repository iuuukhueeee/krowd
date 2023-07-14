import { useMemo } from "react";
import { botttsNeutral } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { Anchor, Avatar, Box, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { IconBan, IconCheck } from "@tabler/icons-react";
import { pascalCase } from "change-case";
import dayjs from "dayjs";

import HiddenField from "@/components/hidden-field";
import { UserModel } from "@/types/models/user";
import { getStatusColor } from "@/utils/color";
import { isValidUrl } from "@/utils/validation";

interface UserRowProps {
  data: UserModel;
}

export default function UserRow({ data }: UserRowProps) {
  const avatar = useMemo(() => {
    return createAvatar(botttsNeutral, {
      seed: data.email,
    }).toDataUriSync();
  }, [data]);

  // const handleApprove = () => putApproveProject(project.projectId);

  return (
    <tr>
      <td>{data.userId}</td>
      <td>
        <UnstyledButton>
          <Group>
            <Avatar size={40} src={isValidUrl(data.avatar) ? data.avatar : avatar}>
              PR
            </Avatar>
            <div>
              <Text>{data.full_name}</Text>
              <Text size="xs" color="dimmed">
                {data.email}
              </Text>
            </div>
          </Group>
        </UnstyledButton>
      </td>
      <td>
        <HiddenField>{data.id_card}</HiddenField>
      </td>
      <td>
        <HiddenField>{data.bank_account}</HiddenField>
      </td>
      <td>
        <HiddenField>{data.momo}</HiddenField>
      </td>
      <td>{dayjs(data.createdAt).format("DD MMM YYYY")}</td>
      <td align="right">
        <Menu shadow="md" width={200} position="bottom-end">
          <Menu.Target>
            <Anchor color={getStatusColor(data.status)}>{pascalCase(data.status)}</Anchor>
          </Menu.Target>

          <Menu.Dropdown>
            <Box>
              <Menu.Item color="green" icon={<IconCheck size={14} />}>
                Approve
              </Menu.Item>
            </Box>
            <Menu.Item color="red" icon={<IconBan size={14} />}>
              Reject
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </td>
    </tr>
  );
}
