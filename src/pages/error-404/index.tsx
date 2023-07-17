import { Link } from "react-router-dom";
import { Button, Center, Container, Group, Text, Title } from "@mantine/core";

import { useStyles } from "./styles";

export default function Error404() {
  const { classes } = useStyles();

  return (
    <Center w="100vw" h="100vh">
      <Container className={classes.root}>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>You have found a secret place.</Title>
        <Text color="dimmed" size="lg" align="center" className={classes.description}>
          Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
          been moved to another URL.
        </Text>
        <Group position="center">
          <Link to="/login">
            <Button variant="subtle" size="md">
              Take me back to home page
            </Button>
          </Link>
        </Group>
      </Container>
    </Center>
  );
}
