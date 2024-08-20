import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@utils/common";

const limit = 10000;

const editorExtensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
  }),
  Highlight,
  Underline,
  Placeholder.configure({
    placeholder: "내용을 입력해주세요.",
  }),
  Link,
  CharacterCount.configure({
    limit,
  }),
  Image,
];

const h1Class =
  "prose-h1:mt-6 prose-h1:mb-3 first:prose-h1:mt-0 last:prose-h1:mb-0 prose-h1:font-semibold prose-h1:text-[26px]";
const h2Class =
  "prose-h2:mt-4 prose-h2:mb-2 first:prose-h2:mt-0 last:prose-h2:mb-0 prose-h2:font-semibold prose-h2:text-[22px]";
const h3Class =
  "prose-h3:mt-2.5 prose-h3:mb-1 first:prose-h3:mt-0 last:prose-h3:mb-0 prose-h3:font-semibold prose-h3:text-[18px]";

const pClass = "prose-p:mt-1 prose-p:mb-1 first:prose-p:mt-0 last:prose-p:mb-0";
const aClass = "prose-a:text-brand";

const olClass =
  "prose-ol:mt-1.5 prose-ol:mb-1.5 first:prose-ol:mt-0 last:prose-ol:mb-0";
const ulClass =
  "prose-ul:mt-1.5 prose-ul:mb-1.5 first:prose-ul:mt-0 last:prose-ul:mb-0";
const liClass =
  "prose-li:mt-1 prose-li:mb-1 first:prose-li:mt-0 last:prose-li:mb-0";

const editorProps = {
  attributes: {
    class: cn(
      "prose prose-slate prose-sm focus:outline-none laptop:prose-base placeholder-black",
      h1Class,
      h2Class,
      h3Class,
      pClass,
      aClass,
      olClass,
      ulClass,
      liClass
    ),
  },
};

export { editorExtensions, editorProps };
