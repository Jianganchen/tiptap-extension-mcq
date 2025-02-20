"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { Edit, Eye, ListChecks } from "lucide-react";

import MCQ from "@/app/extensions/MCQ";

const Tiptap = () => {
  const [isEditable, setIsEditable] = useState(true);

  const editor = useEditor({
    extensions: [StarterKit, MCQ],
    immediatelyRender: false,
    content: `

    <react-component>
      <p>Suppose this is the MCQ. This is editable. </p>
    </react-component>
    `,

    editable: isEditable,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-background text-textColor shadow-lg rounded-lg">
      <div className="flex items-center gap-1 mb-4">
        <button
          onClick={() => {
            setIsEditable((prev) => !prev);
            editor.commands.updateAttributes("mcq", {
              isEditable: !isEditable,
            });
          }}
          className="flex items-center justify-center w-10 h-10 rounded-full transition-all text-buttonColor hover:text-yellow-500"
        >
          {isEditable ? (
            <Eye className="w-6 h-6" />
          ) : (
            <Edit className="w-6 h-6" />
          )}
        </button>
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
        className="border border-secondary p-4 rounded-md shadow-sm focus:outline-none focus:ring-0"
      />

      {editor.isEditable ? <h1>Is Editable!</h1> : <h1>Is not Editable!</h1>}
    </div>
  );
};

export default Tiptap;
