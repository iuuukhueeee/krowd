import { HTMLAttributes } from "react";
import { Button, ButtonProps } from "@mantine/core";

import { GoogleIcon } from "@/features/auth/components/GoogleIcon";

export function GoogleButton(props: ButtonProps & HTMLAttributes<HTMLButtonElement>) {
  return <Button leftIcon={<GoogleIcon />} variant="default" color="gray" {...props} />;
}
