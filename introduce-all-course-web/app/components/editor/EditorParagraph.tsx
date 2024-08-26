import { EditorContent, useEditor } from "@tiptap/react";

import { editorExtensions, editorProps } from "./editorSetting";

type EditorParagraphProps = {
  content: string;
  className?: string;
};

const EditorParagraph = ({ content, className }: EditorParagraphProps) => {
  const editor = useEditor({
    content: JSON.parse(content),
    editable: false,
    extensions: editorExtensions,
    editorProps: editorProps,
  });

  return <EditorContent editor={editor} className={className} />;
};

export default EditorParagraph;
