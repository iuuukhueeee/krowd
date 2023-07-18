import { useEffect, useMemo } from "react";
import { botttsNeutral } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { Code, createStyles, Group, Navbar, rem, ScrollArea } from "@mantine/core";
import { TablerIconsProps } from "@tabler/icons-react";

import { LinksGroup } from "@/features/layout/components/links-group";
import { UserButton } from "@/features/layout/components/user-button";
import { useUserService } from "@/services";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

interface Item {
  label: string;
  icon?: (props: TablerIconsProps) => JSX.Element;
  link?: string;
  links?: Item[];
}

interface NavbarNestedProps {
  data: Item[];
}

export function NavbarNested({ data }: NavbarNestedProps) {
  const { classes } = useStyles();
  const links = data.map((item) => <LinksGroup {...item} key={item.label} />);
  const { user, getUser } = useUserService();

  useEffect(() => {
    getUser(); // notice
  }, [getUser]);

  const avatar = useMemo(() => {
    const avatar = createAvatar(botttsNeutral, {
      seed: user?.email,
    });
    return avatar.toDataUriSync();
  }, [user]);

  return (
    <Navbar height="100%" width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section className={classes.header}>
        <Group position="apart">
          <img src="/assets/logo.svg" alt="logo" width="30px" height="30px" />
          <Code sx={{ fontWeight: 700 }}>Fund fun</Code>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UserButton image={user?.avatar || avatar} name={user?.full_name} email={user?.email} />
      </Navbar.Section>
    </Navbar>
  );
}
