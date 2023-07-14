import { PropsWithChildren, useState } from "react";
import { Box, Overlay } from "@mantine/core";

export default function HiddenField({ children }: PropsWithChildren) {
  const [visible, setVisible] = useState(false);

  return (
    <Box pos="relative">
      <Box onClick={() => setVisible(false)}>{children}</Box>
      {!visible && (
        <Overlay blur={4} center radius="sm">
          <Box onClick={() => setVisible(true)} w="100%" h="100%"></Box>
        </Overlay>
      )}
    </Box>
  );
}
