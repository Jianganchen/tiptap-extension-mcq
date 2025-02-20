"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

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
      <button
        onClick={() => {
          setIsEditable((prev) => !prev);
          editor.commands.updateAttributes("mcq", { isEditable: !isEditable });
        }}
        className="mb-4 px-4 py-2 text-background bg-buttonColor rounded-md transition-all hover:bg-yellow-600"
      >
        {isEditable ? "Switch to Read-Only" : "Switch to Edit Mode"}
      </button>
      <EditorContent
        editor={editor}
        className="border border-secondary p-4 rounded-md shadow-sm focus:outline-none focus:ring-0"
      />

      <button
        onClick={() => editor?.chain().focus().toggleMCQ().run()}
        className={`mt-4 px-4 py-2 rounded-md text-background transition-all ${
          editor.isActive("mcq")
            ? "bg-buttonColor hover:bg-yellow-600"
            : "bg-secondary"
        }`}
      >
        Toggle MCQ
      </button>

      {editor.isEditable ? <h1>Is Editable!</h1> : <h1>Is not Editable!</h1>}
    </div>
  );
};

export default Tiptap;
