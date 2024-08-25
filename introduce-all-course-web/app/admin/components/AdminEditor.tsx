import {
  editorExtensions,
  editorProps,
} from "@components/editor/editorSetting";
import { Input } from "@components/ui/input";
import {
  BubbleMenu,
  EditorContent,
  JSONContent,
  useEditor,
} from "@tiptap/react";
import { cn } from "@utils/common";
import {
  CheckIcon,
  ImageIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  Redo2Icon,
  StrikethroughIcon,
  Undo2Icon,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";

import {
  AdminButton,
  adminButtonVariants,
} from "@/app/admin/components/ui/admin-button";
import {
  AdminSelect,
  AdminSelectContent,
  AdminSelectGroup,
  AdminSelectItem,
  AdminSelectTrigger,
  AdminSelectValue,
} from "@/app/admin/components/ui/admin-select";
import { useUploadImage } from "@/app/hooks/fileUploadHooks";
import { Separator } from "@/components/ui/separator";

type AdminEditorProps = {
  className?: string;
  onChange?: (content: JSONContent) => void;
  defaultValue?: JSONContent;
};

const AdminEditor = ({
  className,
  onChange,
  defaultValue,
}: AdminEditorProps) => {
  const [selectedHeading, setSelectedHeading] = useState("T");
  const [enterLink, setEnterLink] = useState(false);

  const linkInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: uploadImage } = useUploadImage("images-in-post");

  const limit = 5000;

  const editor = useEditor({
    extensions: editorExtensions,
    editorProps: editorProps,
    onUpdate: ({ editor }) => onChange?.(editor.getJSON()),
    content: defaultValue || "",
  });

  const handleHeadingChange = useCallback(
    (value: string) => {
      if (!editor) return;

      switch (value) {
        case "H1":
          editor.chain().focus().setHeading({ level: 1 }).run();
          break;
        case "H2":
          editor.chain().focus().setHeading({ level: 2 }).run();
          break;
        case "H3":
          editor.chain().focus().setHeading({ level: 3 }).run();
          break;

        default:
          editor.chain().focus().setParagraph().run();
          break;
      }
      setSelectedHeading(value);
    },
    [editor]
  );

  const handleLinkButtonClick = () => {
    if (!editor) return;

    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();
      setEnterLink(false);
      return;
    }

    setEnterLink(true);
  };

  const handleEnterLink = () => {
    if (!editor) return;

    const currentInput = linkInputRef.current?.value;
    const newLink = !currentInput
      ? ""
      : !currentInput.startsWith("http://") &&
        !currentInput.startsWith("https://")
      ? `https://${currentInput}`
      : currentInput;

    editor.chain().focus().toggleLink({ href: newLink }).run();
  };

  const handleImageButtonClick = () => {
    imageInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editor) return;

    const file = e.target.files?.[0];
    if (!file) return;

    const src = await uploadImage(file);

    editor.chain().focus().setImage({ src }).run();
    imageInputRef.current!.value = "";
  };

  if (!editor) {
    return null;
  }

  editor.on("selectionUpdate", ({ editor }) => {
    if (editor.isActive("heading", { level: 1 })) {
      setSelectedHeading("H1");
    } else if (editor.isActive("heading", { level: 2 })) {
      setSelectedHeading("H2");
    } else if (editor.isActive("heading", { level: 3 })) {
      setSelectedHeading("H3");
    } else {
      setSelectedHeading("T");
    }

    setEnterLink(false);
  });

  return (
    <div
      className={cn(
        "hidden-scrollbar group max-h-[80vh] space-y-1 overflow-y-scroll rounded-lg border border-slate-200 focus-within:border-black",
        className
      )}
    >
      <div className="sticky top-0 z-10 space-y-1 bg-white px-1 pt-1">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center space-x-1">
            <AdminSelect
              value={
                editor.isActive("heading", { level: 1 })
                  ? "H1"
                  : editor.isActive("heading", { level: 2 })
                  ? "H2"
                  : editor.isActive("heading", { level: 3 })
                  ? "H3"
                  : "T"
              }
              onValueChange={handleHeadingChange}
            >
              <AdminSelectTrigger
                className={cn(
                  adminButtonVariants({ size: "icon", variant: "ghost" }),
                  "h-8 w-8 border-0 "
                )}
              >
                <AdminSelectValue>{selectedHeading}</AdminSelectValue>
              </AdminSelectTrigger>
              <AdminSelectContent>
                <AdminSelectGroup>
                  <AdminSelectItem value="H1">대제목</AdminSelectItem>
                  <AdminSelectItem value="H2">중제목</AdminSelectItem>
                  <AdminSelectItem value="H3">소제목</AdminSelectItem>
                  <AdminSelectItem value="T">본문</AdminSelectItem>
                </AdminSelectGroup>
              </AdminSelectContent>
            </AdminSelect>
            <AdminButton
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8",
                editor.isActive("bold") && "bg-accent text-accent-foreground"
              )}
            >
              <strong>B</strong>
            </AdminButton>
            <AdminButton
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8",
                editor.isActive("italic") && "bg-accent text-accent-foreground"
              )}
            >
              <i>i</i>
            </AdminButton>
            <AdminButton
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8",
                editor.isActive("strike") && "bg-accent text-accent-foreground"
              )}
            >
              <StrikethroughIcon className="h-4 w-4" />
            </AdminButton>
            <AdminButton
              type="button"
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8",
                editor.isActive("highlight") &&
                  "bg-accent text-accent-foreground"
              )}
            >
              <span className="w-4 bg-yellow-200">H</span>
            </AdminButton>
            <AdminButton
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8",
                editor.isActive("underline") &&
                  "bg-accent text-accent-foreground"
              )}
            >
              <span className="w-4 underline">U</span>
            </AdminButton>
            <div className="h-5 w-px bg-gray-300" />
            <AdminButton
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8",
                editor.isActive("bulletList") &&
                  "bg-accent text-accent-foreground"
              )}
            >
              <ListIcon className="h-4 w-4" />
            </AdminButton>
            <AdminButton
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8",
                editor.isActive("orderedList") &&
                  "bg-accent text-accent-foreground"
              )}
            >
              <ListOrderedIcon className="h-4 w-4" />
            </AdminButton>
            <AdminButton
              type="button"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8",
                editor.isActive("blockquote") &&
                  "bg-accent text-accent-foreground"
              )}
            >
              <QuoteIcon className="h-4 w-4" />
            </AdminButton>
            <div className="h-5 w-px bg-gray-300" />
            <AdminButton
              type="button"
              onClick={handleImageButtonClick}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <ImageIcon className="h-4 w-4" />
            </AdminButton>
            <Input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="h-5 w-px bg-gray-300" />
            <AdminButton
              type="button"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <Undo2Icon className="h-4 w-4" />
            </AdminButton>
            <AdminButton
              type="button"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <Redo2Icon className="h-4 w-4" />
            </AdminButton>
          </div>
          <div className="px-4 text-sm text-gray-500">
            {(
              editor.storage.characterCount.characters() as number
            ).toLocaleString()}{" "}
            / {limit.toLocaleString()}
          </div>
        </div>
        <Separator />
      </div>
      <BubbleMenu
        editor={editor}
        className="flex flex-row items-center space-x-1 rounded-md border border-gray-300 bg-background p-1"
      >
        <AdminButton
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8",
            editor.isActive("bold") && "bg-accent text-accent-foreground"
          )}
        >
          <strong>B</strong>
        </AdminButton>
        <AdminButton
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8",
            editor.isActive("italic") && "bg-accent text-accent-foreground"
          )}
        >
          <i>i</i>
        </AdminButton>
        <AdminButton
          type="button"
          onClick={() => handleLinkButtonClick()}
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8",
            editor.isActive("link") && "bg-accent text-accent-foreground"
          )}
        >
          <LinkIcon className="h-4 w-4" />
        </AdminButton>
        {(enterLink || editor.isActive("link")) && (
          <>
            <div className="h-5 w-px bg-gray-300" />
            <input
              placeholder={
                editor.getAttributes("link").href || "링크를 입력하세요."
              }
              className="text-sm focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleEnterLink();
              }}
              ref={linkInputRef}
            />
            <AdminButton
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleEnterLink()}
            >
              <CheckIcon className="h-4 w-4" />
            </AdminButton>
          </>
        )}
      </BubbleMenu>
      <EditorContent className="px-4 py-2" editor={editor} />
    </div>
  );
};

export default AdminEditor;
