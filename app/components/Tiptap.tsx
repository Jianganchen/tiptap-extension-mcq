"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import MCQ from "@/app/extensions/MCQ";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit, MCQ],
    immediatelyRender: false,
    content: `
    <p>
      This is still the text editor you’re used to, but enriched with node views.
    </p>
    <react-component>
      <p>Suppose this is the MCQ. This is editable. You can create a new component by pressing Mod+Enter.</p>
    </react-component>
    <p>
      Did you see that? That’s a React component. We are really living in the future.
    </p>
    `,
  });

  return <EditorContent editor={editor} />;
};

export default Tiptap;
