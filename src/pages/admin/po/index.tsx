import { Box, Breadcrumbs, Grid, MultiSelect, Stack, Table, Title } from "@mantine/core";
import { Icon123 } from "@tabler/icons-react";

import CustomSearchBox from "@/components/custom-search-box";
import RankCard from "@/features/statistic/components/rank-card";
import UserRow from "@/features/user/components/row";
import { breadCrums, FILTER_OPTIONS, skeleton } from "@/pages/admin/po/config";
import { useQueryAdminAllUser } from "@/services/use-query-admin";

export default function POPage() {
  const { searchList, users, setFilter, isLoading } = useQueryAdminAllUser();

  const rows = users.map((row) => <UserRow data={row} key={row.userId} />);

  const handleFocus = (e: string) =>
    document.querySelector(`tr[data-target="${e}"]`)?.scrollIntoView({
      behavior: "smooth",
    });

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
            <CustomSearchBox data={searchList} w="100%" onChange={handleFocus} />
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
        <tbody>{isLoading ? skeleton : rows}</tbody>
      </Table>
    </Stack>
  );
}
