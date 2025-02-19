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
    <div>
      <button
        onClick={() => {
          setIsEditable((prev) => !prev);
          editor.commands.updateAttributes("mcq", { isEditable: !isEditable });
        }}
        className="bg-gray-700 text-white px-3 py-1 rounded"
      >
        {isEditable ? "Switch to Read-Only" : "Switch to Edit Mode"}
      </button>
      <EditorContent editor={editor} />

      <button
        onClick={() => editor?.chain().focus().toggleMCQ().run()}
        className={editor.isActive("mcq") ? "is-active" : ""}
      >
        Toggle MCQ
      </button>

      {editor.isEditable ? <h1>Is Editable!</h1> : <h1>Is not Editable!</h1>}
    </div>
  );
};

export default Tiptap;
