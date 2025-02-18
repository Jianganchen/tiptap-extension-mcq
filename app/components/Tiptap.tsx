"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import MCQ from "@/app/extensions/MCQ";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit, MCQ],
    immediatelyRender: false,
    content: `

    <react-component>
      <p>Suppose this is the MCQ. This is editable. </p>
    </react-component>
    `,
  });

  if (!editor) {
    return null;
  }

  return (
    <div>
      <EditorContent editor={editor} />

      <button
        onClick={() => editor?.chain().focus().toggleMCQ().run()}
        className={editor.isActive("mcq") ? "is-active" : ""}
      >
        Discard MCQ
      </button>
    </div>
  );
};

export default Tiptap;
