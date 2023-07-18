/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Flex, Grid, Image, NumberInput, Paper, Stack, Text, Title } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { Link } from "@mantine/tiptap";
import { IconCalendarDue, IconCoin, IconMultiplier1x, IconPercentage } from "@tabler/icons-react";
import Highlight from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import dayjs from "dayjs";

import CustomSelect from "@/components/custom-select";
import FloatingLabelInput from "@/components/floating-label-input";
import ImageDrop from "@/components/image-drop";
import RichText from "@/components/rich-text";
import useQueryArea from "@/services/area";
import useQueryField from "@/services/field";
import { useUpdateProject } from "@/services/po/use-project";
import useProject from "@/services/use-project";

export default function UpdateProject() {
  const { id } = useParams();
  const { selectList: areas } = useQueryArea();
  const { selectList: fields } = useQueryField();
  const { mutate, isLoading } = useUpdateProject(id ? parseInt(id) : -1);
  const { data } = useProject(parseInt(id || "-1"));

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
  });

  useEffect(() => {
    const content = data?.data.description || "";
    editor?.commands.setContent(content);
  }, [data?.data.description]);

  const form = useForm({
    initialValues: {
      dateRange: [new Date(), new Date()],
      avatar: "",
      businessLicense: "",
      fieldId: 0,
      areaId: 0,
      projectName: "",
      brand: "",
      investmentTargetCapital: 0,
      sharedRevenue: 0,
      multiplier: 0,
      duration: 0,
    },
  });

  useEffect(() => {
    const project = data?.data;
    if (project)
      form.setValues({
        dateRange: [new Date(project.startDate), new Date(project.endDate)],
        avatar: project.image,
        businessLicense: project.businessLicense || "",
        fieldId: project.fieldId,
        areaId: project.areaId,
        projectName: project.projectName,
        brand: project.brand,
        investmentTargetCapital: project.targetCapital,
        sharedRevenue: project.sharedRevenue,
        multiplier: project.multiplier,
        duration: project.duration,
      });
  }, [data?.data]);

  const handleSubmit = () =>
    mutate({
      fieldId: form.values.fieldId,
      areaId: form.values.areaId,
      projectName: form.values.projectName,
      brand: form.values.brand,
      investmentTargetCapital: form.values.investmentTargetCapital,
      sharedRevenue: form.values.sharedRevenue,
      multiplier: form.values.multiplier,
      duration: form.values.duration,
      startDate: dayjs(form.values.dateRange[0]).toISOString(),
      endDate: dayjs(form.values.dateRange[1]).toISOString(),
      image: form.values.avatar,
      projectDescription: editor?.getHTML(),
      businessLicense: form.values.businessLicense,
    });

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Grid>
        <Grid.Col span={8}>
          <Paper p="lg">
            <Stack>
              <Grid>
                <Grid.Col span={4}>
                  <FloatingLabelInput
                    mt={0}
                    placeholder="Project title"
                    label="Project title"
                    {...form.getInputProps("projectName")}
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <FloatingLabelInput
                    mt={0}
                    placeholder="Brand name"
                    label="Brand name"
                    {...form.getInputProps("brand")}
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <FloatingLabelInput
                    mt={0}
                    placeholder="Business license"
                    label="Business license"
                    {...form.getInputProps("businessLicense")}
                  />
                </Grid.Col>
              </Grid>
              <Text color="dimmed" size="sm">
                Desciption
              </Text>
              <RichText editor={editor} />
              <Image src={form.values.avatar} />
              <ImageDrop form={form} noPreview>
                <Text>Drop your image here</Text>
              </ImageDrop>
            </Stack>
          </Paper>
        </Grid.Col>
        <Grid.Col span={4} pos="sticky" top={0}>
          <Title order={3}>Details</Title>
          <Text color="dimmed">Title, short description, image...</Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Paper p="lg">
            <Stack>
              <Flex gap="lg">
                <CustomSelect
                  w="100%"
                  label="Activity area"
                  data={areas}
                  placeholder="Select area"
                  {...form.getInputProps("areaId")}
                />
                <CustomSelect
                  label="The field of activity"
                  w="100%"
                  data={fields}
                  placeholder="Select fields"
                  {...form.getInputProps("fieldId")}
                />
              </Flex>
              <Grid>
                <Grid.Col span={4}>
                  <NumberInput
                    label="Target capital"
                    mt={0}
                    placeholder="Target capital"
                    parser={(value) => value.replaceAll(",", "")}
                    formatter={(value) => new Intl.NumberFormat().format(parseInt(value) || 0)}
                    icon={<IconCoin size={16} />}
                    {...form.getInputProps("investmentTargetCapital")}
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <NumberInput
                    mt={0}
                    label="Shared revenue"
                    placeholder="Shared revenue"
                    min={0}
                    max={100}
                    icon={<IconPercentage size={16} />}
                    {...form.getInputProps("sharedRevenue")}
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <NumberInput
                    mt={0}
                    label="Multiplier"
                    placeholder="Multiplier"
                    icon={<IconMultiplier1x size={16} />}
                    min={0}
                    precision={2}
                    {...form.getInputProps("multiplier")}
                  />
                </Grid.Col>
              </Grid>
              <Grid>
                <Grid.Col span={8}>
                  <DatePickerInput
                    label="Funding period"
                    type="range"
                    placeholder="Start date - end date"
                    mx="auto"
                    {...form.getInputProps("dateRange")}
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <NumberInput
                    mt={0}
                    label="Due of obligation"
                    placeholder="Due of obligation (month)"
                    min={0}
                    max={12}
                    icon={<IconCalendarDue size={16} />}
                    {...form.getInputProps("duration")}
                  />
                </Grid.Col>
              </Grid>
              <Button type="submit" w="100%" loading={isLoading}>
                Update project
              </Button>
            </Stack>
          </Paper>
        </Grid.Col>
        <Grid.Col span={4} pos="sticky" top={0}>
          <Title order={3}>Properties</Title>
          <Text color="dimmed">Additional functions and attributes...</Text>
        </Grid.Col>
      </Grid>
    </form>
  );
}
