"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useEffect, useState } from "react";
import { Edit, Eye, ListChecks } from "lucide-react";

export type EditorHeaderProps = {
  editor: Editor;
  isEditable: boolean;
};

const Tiptap = ({ editor, isEditable }: EditorHeaderProps) => {
  if (!editor) {
    return null;
  }

  useEffect(() => {
    editor
      .chain()
      .focus("all")
      .updateAttributes("mcq", {
        isEditable: isEditable,
      })
      .blur()
      .run();
  }, [isEditable]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-background text-textColor shadow-lg rounded-lg">
      <EditorContent
        editor={editor}
        className="border border-secondary p-4 rounded-md shadow-sm focus:outline-none focus:ring-0 text-xl font-semibold leading-10"
      />
    </div>
  );
};

export default Tiptap;
