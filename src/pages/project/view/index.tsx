import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Title } from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { useStyles } from "@/pages/project/view/style";
import useProject from "@/services/use-project";

export default function ProjectView() {
  const { id } = useParams();
  const { data } = useProject(parseInt(id || "-1"));
  const { classes } = useStyles();

  const content = data?.data.description || "";

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      Subscript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    editable: false,
    content,
  });

  useEffect(() => {
    editor?.commands.setContent(content);
  }, [content, editor?.commands]);

  return (
    <Container my={80}>
      {content ? (
        <RichTextEditor editor={editor} classNames={classes}>
          <RichTextEditor.Content />
        </RichTextEditor>
      ) : (
        <Title order={3} color="dimmed" align="center">
          This project has no description
        </Title>
      )}
    </Container>
  );
}
