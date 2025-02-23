"use client";

import { NodeViewContent, NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import { Trash2, Plus, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export interface Choice {
  id: number;
  value: string;
  selected: boolean;
}

const MCQComponent = (props: NodeViewProps) => {
  const { MultipleChoices, isEditable } = props.node.attrs;
  const choices = MultipleChoices.choices || [];

  const [submitted, setSubmitted] = useState(false);

  const addChoice = () => {
    props.updateAttributes({
      MultipleChoices: {
        choices: [
          ...choices,
          {
            id: choices.length,
            value: `Option ${choices.length + 1}`,
            selected: false,
          },
        ],
      },
    });
  };

  const deleteChoice = (index: number) => {
    const updatedChoices = choices.filter(
      (_: Choice, i: number) => i !== index
    );

    props.updateAttributes({
      MultipleChoices: {
        ...MultipleChoices,
        choices: updatedChoices,
      },
    });
  };

  const toggleSelect = (index: number) => {
    const updatedChoices = choices.map((choice: Choice) =>
      choice.id === index ? { ...choice, selected: !choice.selected } : choice
    );

    props.updateAttributes({
      MultipleChoices: {
        ...MultipleChoices,
        choices: updatedChoices,
      },
    });
  };

  const handleChoiceChange = (index: number, value: string) => {
    const updatedChoices = choices.map((choice: Choice) =>
      choice.id === index ? { ...choice, value } : choice
    );

    props.updateAttributes({
      MultipleChoices: {
        choices: [...updatedChoices],
      },
    });
  };

  const handleSubmit = async () => {
    const selectedChoices = choices.filter((choice: Choice) => choice.selected);

    if (selectedChoices.length === 0) return;

    const submissionData = {
      question: MultipleChoices.question,
      selectedChoices: selectedChoices.map((choice: Choice) => choice.value),
    };

    console.log("Submitting JSON:", JSON.stringify(submissionData, null, 2)); // Printing formatted JSON here

    setSubmitted(true);

    toast.success("Answer submitted successfully!", {
      duration: 3000,
      position: "top-right",
    });
  };

  return (
    <NodeViewWrapper className="react-component ">
      {/* <label contentEditable={false}>React Component</label> */}

      <NodeViewContent className="content is-editable mb-3" />

      <Toaster />

      {choices.map((choice: Choice, index: number) => (
        <div key={choice.id} className="flex items-center gap-2 mt-2">
          {/* Choice CheckBox */}
          {!isEditable && (
            <input
              key={"checkboxKey" + choice.id}
              type="checkbox"
              checked={choice.selected}
              onChange={() => toggleSelect(index)}
              className="w-5 h-5 accent-buttonColor cursor-pointer"
            />
          )}

          {/* Choice Input Field */}
          {isEditable ? (
            <input
              key={"inputKey" + choice.id}
              type="text"
              value={choice.value}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
              className="w-full p-2 border border-textColor rounded-md bg-background text-textColor focus:outline-none focus:ring-2 focus:ring-buttonColor"
            />
          ) : (
            <label>{choice.value}</label>
          )}

          {/* Choice Delete Button */}
          {isEditable && (
            <button
              key={"buttonKey" + choice.id}
              onClick={() => deleteChoice(index)}
              className="flex items-center justify-center w-10 h-10 rounded-full transition-all text-red-500 hover:text-red-600"
            >
              <Trash2 className="w-6 h-6" />
            </button>
          )}
        </div>
      ))}

      <div>
        {isEditable ? (
          // Add Choice Button
          <button
            className="mt-3 flex items-center justify-center w-10 h-10 rounded-full transition-all text-buttonColor hover:text-yellow-500"
            onClick={addChoice}
          >
            <Plus className="w-6 h-6" />
          </button>
        ) : (
          // Submit Button
          <button
            onClick={handleSubmit}
            className={`mt-3 flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
              submitted
                ? "text-gray-300 bg-gray-500 cursor-not-allowed"
                : choices.some((choice: Choice) => choice.selected)
                ? "text-background bg-buttonColor hover:bg-yellow-600"
                : "text-gray-400 bg-gray-600 cursor-not-allowed"
            }`}
            disabled={submitted}
          >
            <CheckCircle className="w-5 h-5" />
          </button>
        )}
      </div>
    </NodeViewWrapper>
  );
};

export default MCQComponent;
