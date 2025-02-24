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
  Bot,
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
            tooltip={editor.isEditable ? "Disable Editing" : "Enable Editing"}
            onClick={toggleEditable}
          />

          {editor.isEditable && (
            <div className="flex flex-row items-center gap-x-1.5">
              {/* Toggle MCQ Button */}
              <Button
                icon={ListChecks}
                tooltip="Toggle MCQ"
                active={editor.isActive("mcq")}
                onClick={() => editor?.chain().focus().toggleMCQ().run()}
              />

              {/* Toggle Bold Button */}
              <Button
                icon={Bold}
                tooltip="Bold"
                active={editor.isActive("bold")}
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
              />

              {/* Toggle Italic Button */}
              <Button
                icon={Italic}
                tooltip="Italic"
                active={editor.isActive("italic")}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
              />

              {/* Toggle H1 Button */}
              <Button
                icon={Heading1}
                tooltip="Heading 1"
                active={editor.isActive("heading", { level: 1 })}
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
              />

              {/* Toggle H2 Button */}
              <Button
                icon={Heading2}
                tooltip="Heading 2"
                active={editor.isActive("heading", { level: 2 })}
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
              />

              {/* Toggle H3 Button */}
              <Button
                icon={Heading3}
                tooltip="Heading 3"
                active={editor.isActive("heading", { level: 3 })}
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
              />

              {/* AI summarize Button */}
              <Button icon={Bot} tooltip="AI summarize" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
