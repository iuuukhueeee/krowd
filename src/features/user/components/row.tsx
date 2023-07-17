import { useMemo } from "react";
import { Anchor, Avatar, Box, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { IconBan, IconCheck } from "@tabler/icons-react";
import { pascalCase } from "change-case";
import dayjs from "dayjs";

import HiddenField from "@/components/hidden-field";
import usePO from "@/services/admin/use-po";
import { UserModel } from "@/types/models/user";
import { getStatusColor } from "@/utils/color";
import generateAvatar from "@/utils/generate-avatar";
import { isValidUrl } from "@/utils/validation";

interface UserRowProps {
  data: UserModel;
}

export default function UserRow({ data }: UserRowProps) {
  const { approvePO, rejectPO } = usePO();

  const avatar = useMemo(() => generateAvatar(data.email), [data]);

  const handleApprove = () => approvePO(data.userId);
  const handleReject = () => rejectPO(data.userId);

  return (
    <tr data-target={data.email}>
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
      <td>{pascalCase(data.roleId)}</td>
      <td align="right">
        <Menu shadow="md" width={200} position="bottom-end">
          <Menu.Target>
            <Anchor color={getStatusColor(data.status)}>{pascalCase(data.status)}</Anchor>
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
