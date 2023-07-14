import { PropsWithChildren } from "react";
import { AppShell, Box } from "@mantine/core";

import { NavbarNested } from "@/features/layout/components/navbar";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <AppShell
      padding="md"
      navbar={<NavbarNested />}
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
