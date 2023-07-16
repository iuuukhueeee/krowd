import { useEffect, useMemo } from "react";
import { botttsNeutral } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { Anchor, Box, Breadcrumbs, Grid, MultiSelect, Stack, Table, Title } from "@mantine/core";
import { Icon123 } from "@tabler/icons-react";

import CustomSearchBox from "@/components/custom-search-box";
import RankCard from "@/features/statistic/components/rank-card";
import UserRow from "@/features/user/components/row";
import { useAdminService } from "@/services";
import { ApproveStatus } from "@/types/enums/project-status";
import { Role } from "@/types/enums/role";
import { isValidUrl } from "@/utils/validation";

const breadCrums = [
  { title: "Admin", href: "/admin" },
  { title: "Users", href: "/admin/user" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

const FILTER_OPTIONS = [
  { label: "Admin", value: Role.ADMIN + "/role", group: "Role" },
  { label: "PO", value: Role.PO + "/role", group: "Role" },
  { label: "Investor", value: Role.INVESTOR + "/role", group: "Role" },
  { label: "Approved", value: ApproveStatus.APPROVED + "/status", group: "Status" },
  { label: "Pending", value: ApproveStatus.PENDING + "/status", group: "Status" },
  { label: "Rejected", value: ApproveStatus.REJECTED + "/status", group: "Status" },
  {
    label: "Filling Required",
    value: ApproveStatus.FILLING_REQUIRED + "/status",
    group: "Status",
  },
];

export default function POPage() {
  const { postUser, getAllUser, user, setFilter } = useAdminService();

  useEffect(() => {
    getAllUser();
  }, [getAllUser]);

  const rows = postUser.map((row) => <UserRow data={row} key={row.userId} />);

  const search = useMemo(() => {
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
  }, [user]);

  const handleFocus = (e: string) => {
    document.querySelector(`tr[data-target="${e}"]`)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <Stack spacing="lg">
      <Stack spacing="sm">
        <Title order={2}>USER MANAGEMENT</Title>
        <Breadcrumbs>{breadCrums}</Breadcrumbs>
      </Stack>
      <Box>
        <Grid>
          <Grid.Col span={4}>
            <RankCard avatar={{ children: <Icon123 /> }} />
          </Grid.Col>
          <Grid.Col span={4}>
            <RankCard />
          </Grid.Col>
          <Grid.Col span={4}>
            <RankCard />
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col span={8}>
            <MultiSelect
              onChange={setFilter}
              data={FILTER_OPTIONS}
              limit={20}
              searchable
              placeholder="Filter"
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <CustomSearchBox data={search} w="100%" onChange={handleFocus} />
          </Grid.Col>
        </Grid>
      </Box>
      <Table sx={{ minWidth: 800 }} verticalSpacing="xl">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>ID Card</th>
            <th>Bank</th>
            <th>Momo</th>
            <th>Role</th>
            <th style={{ textAlign: "right" }}>Status/Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Stack>
  );
}
