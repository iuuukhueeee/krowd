import { PropsWithChildren } from "react";
import { AppShell, Box } from "@mantine/core";
import { IconGauge, IconNotes } from "@tabler/icons-react";

import { NavbarNested } from "@/features/layout/components/navbar";

const mockdata = [
  { label: "Dashboard", icon: IconGauge },
  {
    label: "My project",
    icon: IconNotes,
    links: [
      { label: "New project", link: "/po/create" },
      { label: "Projects", link: "/po/projects" },
    ],
  },
];

export default function POLayout({ children }: PropsWithChildren) {
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
