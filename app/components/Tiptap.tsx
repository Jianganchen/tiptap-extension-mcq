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
    <p>Climate change is one of the most pressing challenges of our time. It refers to long-term shifts in temperature and weather patterns, primarily caused by human activities such as burning fossil fuels. These activities increase the concentration of greenhouse gases in the atmosphere, leading to global warming.</p>

    <react-component>
      <p>Suppose this is the MCQ. This is editable. </p>
    </react-component>

    <p>The effects of climate change are widespread, including rising sea levels, more extreme weather events, and disruptions to ecosystems. Scientists emphasize the importance of reducing carbon emissions and adopting sustainable practices to mitigate its impact.</p>
    `,

    editable: isEditable,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-background text-textColor shadow-lg rounded-lg">
      <div className="flex items-center gap-1 mb-4">
        {/* Toggle Edit/Read-only Button */}
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
        className="border border-secondary p-4 rounded-md shadow-sm focus:outline-none focus:ring-0"
      />

      {editor.isEditable ? <h1>Is Editable!</h1> : <h1>Is not Editable!</h1>}
    </div>
  );
};

export default Tiptap;
