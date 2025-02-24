"use client";

import { Editor } from "@tiptap/core";
import {
  Edit,
  Eye,
  ListChecks,
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";
import { useCallback } from "react";

import Button from "./ui/Button";

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
          <Button
            icon={editor.isEditable ? Eye : Edit}
            onClick={toggleEditable}
          />

          {/* Toggle MCQ Button */}
          {editor.isEditable && (
            <div className="flex flex-row items-center gap-x-1.5">
              <Button
                icon={ListChecks}
                active={editor.isActive("mcq")}
                onClick={() => editor?.chain().focus().toggleMCQ().run()}
              />

              <Button
                icon={Bold}
                active={editor.isActive("bold")}
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
              />

              <Button
                icon={Italic}
                active={editor.isActive("italic")}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
              />

              <Button
                icon={Heading1}
                active={editor.isActive("heading", { level: 1 })}
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
              />

              <Button
                icon={Heading2}
                active={editor.isActive("heading", { level: 2 })}
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
              />

              <Button
                icon={Heading3}
                active={editor.isActive("heading", { level: 3 })}
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
