import { Anchor, Group, Skeleton, UnstyledButton } from "@mantine/core";

import { ApproveStatus } from "@/types/enums/project-status";
import { Role } from "@/types/enums/role";

export const FILTER_OPTIONS = [
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

export const skeleton = new Array(10).fill(0).map((_, index) => (
  <tr key={index}>
    <td>
      <Skeleton height="0.875rem" width={50.53} radius="sm" />
    </td>
    <td>
      <UnstyledButton>
        <Group>
          <Skeleton height={40} width={40} radius="sm" />
          <div>
            <Skeleton height={24.8} width={200} radius="sm" />
          </div>
        </Group>
      </UnstyledButton>
    </td>
    <td>
      <Skeleton height={21.68} width={117} radius="sm" />
    </td>
    <td>
      <Skeleton height={21.68} width={87} radius="sm" />
    </td>
    <td>
      <Skeleton height={21.68} width={117} radius="sm" />
    </td>
    <td>
      <Skeleton height={21.68} width={117} radius="sm" />
    </td>
    <td>
      <Skeleton height={21.68} width={117} radius="sm" />
    </td>
    <td>
      <Skeleton height={21.68} width={117} radius="sm" />
    </td>
  </tr>
));

export const breadCrums = [
  { title: "Admin", href: "/admin" },
  { title: "Users", href: "/admin/user" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));
