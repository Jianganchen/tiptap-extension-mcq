"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useState } from "react";
import { Edit, Eye, ListChecks } from "lucide-react";

export type EditorHeaderProps = {
  editor: Editor;
};

const Tiptap = ({ editor }: EditorHeaderProps) => {
  const [isEditable, setIsEditable] = useState(true);

  if (!editor) {
    return null;
  }

  const toggleEditable = () => {
    editor.setOptions({ editable: !editor.isEditable });
    // force update the editor
    editor.view.dispatch(editor.view.state.tr);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-background text-textColor shadow-lg rounded-lg">
      <div className="flex items-center gap-1 mb-4">
        {/* Toggle Edit/Read-only Button */}
        <button
          onClick={toggleEditable}
          className="flex items-center justify-center w-10 h-10 rounded-full transition-all text-buttonColor hover:text-yellow-500"
        >
          {isEditable ? (
            <Eye className="w-6 h-6" />
          ) : (
            <Edit className="w-6 h-6" />
          )}
        </button>

        {/* Toggle MCQ Button */}
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
      </div>

      <EditorContent
        editor={editor}
        className="border border-secondary p-4 rounded-md shadow-sm focus:outline-none focus:ring-0 text-xl font-semibold leading-10"
      />
    </div>
  );
};

export default Tiptap;
