"use client";

import { useRef, useState } from "react";
import { useBlockEditor } from "./hooks/useBlockEditor";
import Tiptap from "./Tiptap";
import { EditorHeader } from "./EditorHeader";

export const BlockEditor = () => {
  const [isEditable, setIsEditable] = useState(true);
  const menuContainerRef = useRef(null);

  const { editor } = useBlockEditor({
    onTransaction({ editor: currentEditor }) {
      setIsEditable(currentEditor.isEditable);
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex h-full" ref={menuContainerRef}>
      <div className="relative flex flex-col flex-1 h-full overflow-hidden">
        <EditorHeader editor={editor} />
        <Tiptap editor={editor} />
      </div>
    </div>
  );
};

export default BlockEditor;
