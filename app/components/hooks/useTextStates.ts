import { Editor, useEditorState } from "@tiptap/react";

export const useTextStates = (editor: Editor) => {
  const states = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isMCQ: ctx.editor.isActive("mcq"),
        isBold: ctx.editor.isActive("bold"),
        isItalic: ctx.editor.isActive("italic"),
        isHeading1: ctx.editor.isActive("heading", { level: 1 }),
        isHeading2: ctx.editor.isActive("heading", { level: 2 }),
        isHeading3: ctx.editor.isActive("heading", { level: 3 }),
        isStrike: ctx.editor.isActive("strike"),
        isUnderline: ctx.editor.isActive("underline"),
        isCode: ctx.editor.isActive("code"),
        isSubscript: ctx.editor.isActive("subscript"),
        isSuperscript: ctx.editor.isActive("superscript"),
        isAlignLeft: ctx.editor.isActive({ textAlign: "left" }),
        isAlignCenter: ctx.editor.isActive({ textAlign: "center" }),
        isAlignRight: ctx.editor.isActive({ textAlign: "right" }),
        isAlignJustify: ctx.editor.isActive({ textAlign: "justify" }),
        currentColor: ctx.editor.getAttributes("textStyle")?.color || undefined,
        currentHighlight:
          ctx.editor.getAttributes("highlight")?.color || undefined,
        currentFont:
          ctx.editor.getAttributes("textStyle")?.fontFamily || undefined,
        currentSize:
          ctx.editor.getAttributes("textStyle")?.fontSize || undefined,
      };
    },
  });

  return {
    ...states,
  };
};
