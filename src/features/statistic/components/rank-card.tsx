import { ReactNode } from "react";
import { Avatar, AvatarProps, Flex, Paper, Text } from "@mantine/core";

interface RankCardProps {
  avatar?: AvatarProps;
  title?: ReactNode;
  subtitle?: ReactNode;
}

export default function RankCard({ avatar, title, subtitle }: RankCardProps) {
  return (
    <Paper shadow="md" p="lg" w="100%">
      <Flex align="center" gap="sm">
        <Avatar size={40} color="blue" {...avatar} />
        <div>
          <Text>{title}</Text>
          <Text size="xs" color="dimmed">
            {subtitle}
          </Text>
        </div>
      </Flex>
    </Paper>
  );
}
