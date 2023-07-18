import { Flex, Grid, NumberInput, Paper, Stack, Text, Title } from "@mantine/core";
import { parse } from "path";

import CustomSelect from "@/components/custom-select";
import FloatingLabelInput from "@/components/floating-label-input";
import RichText from "@/components/rich-text";
import useQueryArea from "@/services/area";
import useQueryField from "@/services/field";

const e = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function CreateProject() {
  const { selectList: areas } = useQueryArea();
  const { selectList: fields } = useQueryField();

  return (
    <Grid>
      <Grid.Col span={8}>
        <Paper p="lg">
          <Stack>
            <Grid>
              <Grid.Col span={8}>
                <FloatingLabelInput mt={0} placeholder="Project title" label="Project title" />
              </Grid.Col>
              <Grid.Col span={4}>
                <FloatingLabelInput mt={0} placeholder="Brand name" label="Brand name" />
              </Grid.Col>
            </Grid>
            <Text color="dimmed" size="sm">
              Desciption
            </Text>
            <RichText />
          </Stack>
        </Paper>
      </Grid.Col>
      <Grid.Col span={4}>
        <Title order={3}>Details</Title>
        <Text color="dimmed">Title, short description, image...</Text>
      </Grid.Col>
      <Grid.Col span={8}>
        <Paper p="lg">
          <Stack>
            <Flex gap="lg">
              <CustomSelect w="100%" data={areas} placeholder="Select area" />
              <CustomSelect w="100%" data={fields} placeholder="Select fields" />
            </Flex>
            <Grid>
              <Grid.Col span={4}>
                <FloatingLabelInput
                  mt={0}
                  placeholder="Target capital"
                  label="Target capital"
                  mask=""
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <NumberInput
                  mt={0}
                  placeholder="Brand name"
                  label="Brand name"
                  parser={(value) => value.replaceAll(",", "")}
                  formatter={(value) => new Intl.NumberFormat().format(parseInt(value))}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <FloatingLabelInput mt={0} placeholder="Brand name" label="Brand name" />
              </Grid.Col>
            </Grid>
          </Stack>
        </Paper>
      </Grid.Col>
      <Grid.Col span={4}>
        <Title order={3}>Properties</Title>
        <Text color="dimmed">Additional functions and attributes...</Text>
      </Grid.Col>
    </Grid>
  );
}
