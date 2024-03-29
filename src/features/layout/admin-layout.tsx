import { PropsWithChildren } from "react";
import { AppShell, Box } from "@mantine/core";
import { IconGauge, IconNotes } from "@tabler/icons-react";

import { NavbarNested } from "@/features/layout/components/navbar";

const mockdata = [
  { label: "Dashboard", icon: IconGauge },
  {
    label: "Management",
    icon: IconNotes,
    links: [
      { label: "Projects", link: "/admin/projects" },
      { label: "Project owners", link: "/admin/po" },
    ],
  },
];

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <AppShell
      padding="md"
      navbar={<NavbarNested data={mockdata} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <Box component="main" maw={1200} m="0 auto">
        {children}
      </Box>
    </AppShell>
  );
}
