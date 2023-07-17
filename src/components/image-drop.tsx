import { useState } from "react";
import { Avatar, Center, Flex } from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";

export default function ImageDrop() {
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Avatar
        key={index}
        size={80}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });

  return (
    <div>
      <Flex gap={16}>
        <Dropzone
          styles={{ inner: { height: "100%" } }}
          w="100%"
          h={80}
          accept={IMAGE_MIME_TYPE}
          onDrop={setFiles}
          multiple={false}
        >
          <Center w="100%" h="100%">
            Drop your avatar here
          </Center>
        </Dropzone>
        {previews}
      </Flex>
    </div>
  );
}
