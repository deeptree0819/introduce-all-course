import { Content, EditorContent, useEditor } from "@tiptap/react";

import { editorExtensions, editorProps } from "./editorSetting";

type EditorParagraphProps = {
  content: Content;
  className?: string;
};

const EditorParagraph = ({ content, className }: EditorParagraphProps) => {
  const editor = useEditor({
    content: content,
    editable: false,
    extensions: editorExtensions,
    editorProps: editorProps,
  });

  return <EditorContent editor={editor} className={className} />;
};

export default EditorParagraph;
