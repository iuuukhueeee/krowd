import { useNavigate } from "react-router-dom";
import {
  Avatar,
  createStyles,
  Group,
  Menu,
  Text,
  UnstyledButton,
  UnstyledButtonProps,
} from "@mantine/core";
import { IconChevronRight, IconLogout } from "@tabler/icons-react";

import { signOutWithGoogle } from "@/features/auth/services/google";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  },
}));

interface UserButtonProps extends UnstyledButtonProps {
  image?: string;
  name?: string;
  email?: string;
  icon?: React.ReactNode;
}

export function UserButton({ image, name, email, icon, ...others }: UserButtonProps) {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Menu position="right-end">
      <Menu.Target>
        <UnstyledButton className={classes.user} {...others}>
          <Group>
            <Avatar src={image} radius="xl" />

            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {name}
              </Text>

              <Text color="dimmed" size="xs">
                {email}
              </Text>
            </div>

            {icon || <IconChevronRight size="0.9rem" stroke={1.5} />}
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={signOutWithGoogle(navigate)} color="red" icon={<IconLogout />}>
          Logout
        </Menu.Item>

        {/* Other items ... */}
      </Menu.Dropdown>
    </Menu>
  );
}
