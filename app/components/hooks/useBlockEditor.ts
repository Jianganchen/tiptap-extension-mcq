import { useEditor } from "@tiptap/react";
import type { Editor, EditorOptions } from "@tiptap/core";

import { sampleData } from "@/app/lib/sampleData";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import MCQ from "@/app/extensions/MCQ";
import TextSummary from "@/app/extensions/TextSummary";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export const useBlockEditor = ({
  ...editorOptions
}: {} & Partial<Omit<EditorOptions, "extensions">>) => {
  const editor = useEditor({
    ...editorOptions,
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    autofocus: true,
    onCreate: (ctx) => {
      if (ctx.editor.isEmpty) {
        ctx.editor.commands.setContent(sampleData); // Load sample data
        ctx.editor.commands.focus("start", { scrollIntoView: true }); // Move cursor to the start
      }
    },
    extensions: [
      TextStyle,
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      MCQ,
      TextSummary,
      Underline,
    ],
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        class: "min-h-full",
      },
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.editor = editor;
    }
  }, [editor]);

  return { editor };
};
