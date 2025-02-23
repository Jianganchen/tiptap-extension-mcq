"use client";

import { Editor } from "@tiptap/core";
import { Edit, Eye, ListChecks } from "lucide-react";
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
          {/* Toggle Edit/Read-only Button */}
          <button
            onClick={toggleEditable}
            className="flex items-center justify-center w-10 h-10 rounded-full transition-all text-buttonColor hover:text-yellow-500"
          >
            {editor.isEditable ? (
              <Eye className="w-6 h-6" />
            ) : (
              <Edit className="w-6 h-6" />
            )}
          </button>

          {/* Toggle MCQ Button */}
          {editor.isEditable && (
            <button
              onClick={() => editor?.chain().focus().toggleMCQ().run()}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                editor.isActive("mcq")
                  ? "text-buttonColor hover:text-yellow-500"
                  : "text-textColor hover:text-d1d0c5"
              }`}
            >
              <ListChecks className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
