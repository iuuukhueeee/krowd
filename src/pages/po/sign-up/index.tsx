import { forwardRef } from "react";
import {
  Center,
  createStyles,
  Divider,
  FileInput,
  Grid,
  Image,
  Paper,
  rem,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";

import FloatingLabelInput from "@/components/floating-label-input";
import ImageDrop from "@/components/image-drop";

const useStyles = createStyles((theme, { checked }: { checked: boolean }) => ({
  button: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    transition: "background-color 150ms ease, border-color 150ms ease",
    border: `${rem(1)} solid ${
      checked
        ? theme.fn.variant({ variant: "outline", color: theme.primaryColor }).border
        : theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[3]
    }`,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.sm,
    backgroundColor: checked
      ? theme.fn.variant({ variant: "light", color: theme.primaryColor }).background
      : theme.colorScheme === "dark"
      ? theme.colors.dark[8]
      : theme.white,
  },

  disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },

  body: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
}));

interface ImageCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?(checked: boolean): void;
  title: string;
  description: string;
  image: string;
}

const ImageCheckbox = forwardRef<
  HTMLButtonElement,
  ImageCheckboxProps & Omit<React.ComponentPropsWithoutRef<"button">, keyof ImageCheckboxProps>
>(
  (
    {
      checked,
      defaultChecked,
      onChange,
      title,
      description,
      className,
      image,
      disabled,
      ...others
    },
    ref,
  ) => {
    const [value, handleChange] = useUncontrolled({
      value: checked,
      defaultValue: defaultChecked,
      finalValue: false,
      onChange,
    });

    const { classes, cx } = useStyles({ checked: value });

    const handleClick = () => {
      if (disabled) return handleChange(false);
      handleChange(!value);
    };

    return (
      <UnstyledButton
        ref={ref}
        {...others}
        onClick={handleClick}
        className={cx(classes.button, className, { [classes.disabled]: disabled })}
      >
        <Image src={image} alt={title} width={40} />

        <div className={classes.body}>
          <Text color="dimmed" size="xs" sx={{ lineHeight: 1 }} mb={5}>
            {description}
          </Text>
          <Text weight={500} size="sm" sx={{ lineHeight: 1 }}>
            {title}
          </Text>
        </div>
      </UnstyledButton>
    );
  },
);

const mockdata = [
  {
    description: "Project Owner",
    title: "Public your project and get funding",
    image: "https://doodleipsum.com/700/flat?i=c982bc352855beee7df64b426cf55746",
    checked: true,
  },
  {
    description: "Investor",
    title: "Invest in projects and get profit",
    image: "https://doodleipsum.com/700/flat?i=0f2e19619b1662e6a461ed297df217c5",
    disabled: true,
  },
];

export default function SignUp() {
  const items = mockdata.map((item) => {
    if (item.disabled)
      return (
        <Tooltip label="Investor only available for mobile users">
          <ImageCheckbox {...item} key={item.title} />
        </Tooltip>
      );
    return <ImageCheckbox {...item} key={item.title} />;
  });

  const handleAvatarUpload = async (file: File) => {};

  return (
    <Center w="100vw" h="100vh">
      <Paper withBorder p={rem(24)}>
        <Stack spacing={rem(24)}>
          <SimpleGrid
            cols={3}
            breakpoints={[
              { maxWidth: "md", cols: 2 },
              { maxWidth: "sm", cols: 1 },
            ]}
          >
            <FloatingLabelInput mt={0} label="ID Card" placeholder="091234562223" />
            <FloatingLabelInput mt={0} label="Momo" placeholder="091234562" />
            <FloatingLabelInput mt={0} label="Bank account" placeholder="638-123-456-890" />
          </SimpleGrid>
          <Grid>
            <Grid.Col span={8}>
              <FloatingLabelInput mt={0} label="Address" placeholder="Ha Noi, Vietnam" />
            </Grid.Col>
            <Grid.Col span={4}>
              <FloatingLabelInput mt={0} label="Tax ID" placeholder="1234567890" />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={4}>
              <Select
                placeholder="Gender"
                data={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                ]}
              />
            </Grid.Col>
            <Grid.Col span={8}>
              <FloatingLabelInput mt={0} label="Phone" placeholder="091234562" />
            </Grid.Col>
          </Grid>
          <ImageDrop />
          <SimpleGrid
            cols={2}
            breakpoints={[
              { maxWidth: "md", cols: 2 },
              { maxWidth: "sm", cols: 1 },
            ]}
          >
            {items}
          </SimpleGrid>
        </Stack>
      </Paper>
    </Center>
  );
}
