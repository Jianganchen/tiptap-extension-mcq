"use client";

import { Editor } from "@tiptap/core";
import { useCallback } from "react";

export type EditorHeaderProps = {
  editor: Editor;
};

export const EditorHeader = ({ editor }: EditorHeaderProps) => {
  const toggleEditable = useCallback(() => {
    editor.setOptions({ editable: !editor.isEditable });
    // force update the editor
    editor.view.dispatch(editor.view.state.tr);
  }, [editor]);

  return (
    <div className="flex flex-row items-center justify-between flex-none py-2 pl-6 pr-3 text-black bg-white border-b border-neutral-200 dark:bg-black dark:text-white dark:border-neutral-800">
      <div className="flex flex-row gap-x-1.5 items-center">
        <div className="flex items-center gap-x-1.5">
          <button onClick={toggleEditable}>Toggle Editable</button>
        </div>
      </div>
    </div>
  );
};
