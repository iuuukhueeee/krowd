import { useState } from "react";
import { createStyles, rem, TextInput, TextInputProps } from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";

const useStyles = createStyles((theme, { floating }: { floating: boolean }) => ({
  root: {
    position: "relative",
  },

  label: {
    position: "absolute",
    zIndex: 2,
    top: rem(7),
    left: theme.spacing.sm,
    pointerEvents: "none",
    color: floating
      ? theme.colorScheme === "dark"
        ? theme.white
        : theme.black
      : theme.colorScheme === "dark"
      ? theme.colors.dark[3]
      : theme.colors.gray[5],
    transition: "transform 150ms ease, color 150ms ease, font-size 150ms ease",
    transform: floating ? `translate(-${theme.spacing.sm}, ${rem(-28)})` : "none",
    fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
    fontWeight: floating ? 500 : 400,
  },

  required: {
    transition: "opacity 150ms ease",
    opacity: floating ? 1 : 0,
  },

  input: {
    "&::placeholder": {
      transition: "color 150ms ease",
      color: !floating ? "transparent" : undefined,
    },
  },
}));

interface FloatingLabelInputProps {
  value?: string;
  onChange?(value: string): void;
  defaultValue?: string;
}

export default function FloatingLabelInput({
  onChange,
  value,
  defaultValue,
  ...others
}: FloatingLabelInputProps & TextInputProps) {
  const [focused, setFocused] = useState(false);
  const [uncontrolledValue, handleChange] = useUncontrolled({
    value,
    defaultValue,
    finalValue: "",
    onChange,
  });
  const { classes } = useStyles({
    floating: uncontrolledValue.toString().trim().length !== 0 || focused,
  });

  const changeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e.currentTarget.value);
  };

  return (
    <TextInput
      label="Floating label"
      placeholder="OMG, it also has a placeholder"
      required
      classNames={classes}
      value={value}
      onChange={changeEvent}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      mt="md"
      autoComplete="nope"
      {...others}
    />
  );
}
