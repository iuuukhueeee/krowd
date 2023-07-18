import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Paper,
  rem,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconArrowLeft } from "@tabler/icons-react";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";

import FloatingLabelInput from "@/components/floating-label-input";
import ImageCheckbox from "@/components/image-checkbox";
import ImageDrop from "@/components/image-drop";
import { signOutWithGoogle } from "@/features/auth/services/google";
import { usePutUser } from "@/services/use-query-user";
import { Gender } from "@/types/enums/gender";
import { Role } from "@/types/enums/role";
import { JWTUser } from "@/types/jwt-user";

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

export interface FormDataType {
  IDCard: string;
  momo: string;
  bankAccount: string;
  address: string;
  taxID: string;
  gender: Gender;
  phone: string;
  avatar: string;
  fullName: string;
  birthdate: string | undefined;
}

const items = mockdata.map((item) => {
  if (item.disabled)
    return (
      <Tooltip color="red" label="Investor only available for mobile users">
        <ImageCheckbox {...item} key={item.title} />
      </Tooltip>
    );
  return (
    <Tooltip
      key={item.title}
      multiline
      label="Once you register on the web your role have to be PO"
    >
      <ImageCheckbox {...item} key={item.title} />
    </Tooltip>
  );
});

export default function SignUp() {
  const { mutate, isLoading } = usePutUser();
  const navigate = useNavigate();
  const user = useMemo<Partial<JWTUser>>(() => {
    const token = localStorage.getItem("id-token");
    if (!token) return {};
    return jwtDecode<JWTUser>(token);
  }, []);

  const form = useForm<FormDataType>({
    initialValues: {
      IDCard: "",
      momo: "",
      bankAccount: "",
      address: "",
      taxID: "",
      gender: Gender.MALE,
      phone: "",
      avatar: user.picture || "",
      fullName: user.name || "",
      birthdate: undefined,
    },
    validateInputOnChange: true,
    validate: {
      IDCard: (value) => (/^[\d]{12}$/.test(value) ? null : "ID Card must have 12 digits"),
      momo: (value) => (/^\d{8,12}$/.test(value) ? null : "Momo must have 8-12 digits"),
      bankAccount: (value) =>
        /^[\d-]+$/.test(value) ? null : "Bank account must have digits only",
      taxID: (value) => (/^[\d-]{10,14}$/.test(value) ? null : "Tax ID must have 10-13 digits"),
      phone: (value) => (/^\d{8,12}$/.test(value) ? null : "Phone number must have 8-12 digits"),
    },
  });

  const handleSubmit = () =>
    mutate({
      fullName: form.values.fullName,
      birthdate: dayjs(form.values.birthdate).format("YYYY-MM-DD"),
      roleId: Role.PO.toUpperCase(),
      id_card: form.values.IDCard,
      momo: form.values.momo,
      bankAccount: form.values.bankAccount,
      bankName: "",
      address: form.values.address,
      taxIdentification: form.values.taxID,
      gender: form.values.gender,
      phone: form.values.phone,
      avatar: form.values.avatar,
    });

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Center w="100vw" h="100vh">
        <Stack>
          <Tooltip color="red" label="Signout" position="right">
            <ActionIcon color="red" variant="outline" onClick={signOutWithGoogle(navigate)}>
              <IconArrowLeft size={16} />
            </ActionIcon>
          </Tooltip>
          <Paper withBorder p={rem(24)}>
            <Stack spacing="lg">
              <Box mb="lg">
                <Title>Signup</Title>
                <Text color="dimmed" size="sm" mt={5}>
                  You need to complate your information before to start using our service
                </Text>
              </Box>
              <Grid>
                <Grid.Col span={8}>
                  <FloatingLabelInput
                    mt={0}
                    label="Full name"
                    placeholder="Nguyen Van A"
                    {...form.getInputProps("fullName")}
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <DatePickerInput placeholder="Birthdate" {...form.getInputProps("birthdate")} />
                </Grid.Col>
              </Grid>
              <SimpleGrid
                cols={3}
                breakpoints={[
                  { maxWidth: "md", cols: 2 },
                  { maxWidth: "sm", cols: 1 },
                ]}
              >
                <FloatingLabelInput
                  mt={0}
                  placeholder="091234562223"
                  label="ID Card"
                  mask="000000000000"
                  {...form.getInputProps("IDCard")}
                />
                <FloatingLabelInput
                  mt={0}
                  label="Momo"
                  mask="0000000000"
                  placeholder="091234562"
                  {...form.getInputProps("momo")}
                />
                <FloatingLabelInput
                  mt={0}
                  label="Bank account"
                  placeholder="638-123-456-890"
                  mask="0000-0000-0000-0000"
                  {...form.getInputProps("bankAccount")}
                />
              </SimpleGrid>
              <Grid>
                <Grid.Col span={8}>
                  <FloatingLabelInput
                    mt={0}
                    label="Address"
                    placeholder="Ha Noi, Vietnam"
                    {...form.getInputProps("address")}
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <FloatingLabelInput
                    mt={0}
                    label="Tax ID"
                    mask="0000000000-000"
                    placeholder="1234567890"
                    {...form.getInputProps("taxID")}
                  />
                </Grid.Col>
              </Grid>
              <Grid>
                <Grid.Col span={4}>
                  <Select
                    placeholder="Gender"
                    data={[
                      { value: Gender.MALE, label: "Male" },
                      { value: Gender.FEMALE, label: "Female" },
                      { value: Gender.OTHER, label: "Other" },
                    ]}
                    {...form.getInputProps("gender")}
                  />
                </Grid.Col>
                <Grid.Col span={8}>
                  <FloatingLabelInput
                    mt={0}
                    label="Phone"
                    placeholder="091234562"
                    type="number"
                    {...form.getInputProps("phone")}
                  />
                </Grid.Col>
              </Grid>
              <ImageDrop form={form} />
              <SimpleGrid
                cols={2}
                breakpoints={[
                  { maxWidth: "md", cols: 2 },
                  { maxWidth: "sm", cols: 1 },
                ]}
              >
                {items}
              </SimpleGrid>
              <Flex gap="lg">
                <Button fullWidth type="submit" loading={isLoading}>
                  Confirm
                </Button>
              </Flex>
            </Stack>
          </Paper>
        </Stack>
      </Center>
    </form>
  );
}
