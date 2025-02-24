"use client";

import { NodeViewContent, NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import { Trash2, Plus, CheckCircle, CheckCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

import ToolButton from "./ui/Button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export interface Choice {
  id: number;
  value: string;
  selected: boolean;
}

const MCQComponent = (props: NodeViewProps) => {
  const { MultipleChoices, isEditable } = props.node.attrs;
  const choices = MultipleChoices.choices || [];
  const question = MultipleChoices.question || "";

  const addChoice = () => {
    props.updateAttributes({
      MultipleChoices: {
        ...MultipleChoices,
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
    props.updateAttributes({
      MultipleChoices: {
        ...MultipleChoices,
        choices: choices.map((choice: Choice) => ({
          ...choice,
          selected: choice.id === index,
        })),
      },
    });
  };

  const setCorrectAnswer = (id: number) => {
    props.updateAttributes({
      MultipleChoices: {
        ...MultipleChoices,
        correctAnswer: id,
      },
    });

    toast.success(`Answer set to option ${id + 1}!`, {
      duration: 3000,
      position: "top-right",
    });
  };

  const handleChoiceChange = (index: number, value: string) => {
    const updatedChoices = choices.map((choice: Choice) =>
      choice.id === index ? { ...choice, value } : choice
    );

    props.updateAttributes({
      MultipleChoices: {
        ...MultipleChoices,
        choices: [...updatedChoices],
      },
    });
  };

  const handleQuestionChange = (value: string) => {
    props.updateAttributes({
      MultipleChoices: {
        ...MultipleChoices,
        question: value,
      },
    });
  };

  const handleSubmit = async () => {
    const selectedChoices = choices.find((choice: Choice) => choice.selected);

    if (selectedChoices.length === 0) {
      toast.error("Please select an answer before submitting!", {
        position: "top-right",
      });
      return;
    }

    // const submissionData = {
    //   question: MultipleChoices.question,
    //   selectedChoices: selectedChoices.map((choice: Choice) => choice.value),
    // };

    // console.log("Submitting JSON:", JSON.stringify(submissionData, null, 2)); // Printing formatted JSON here

    if (selectedChoices.id === props.node.attrs.MultipleChoices.correctAnswer) {
      toast.success("Correct Answer!", {
        position: "top-right",
      });
    } else {
      toast.error("Wrong Answer", {
        position: "top-right",
      });
    }
  };

  return (
    <NodeViewWrapper className="react-component">
      {/* <label contentEditable={false}>React Component</label> */}

      <Toaster />
      <NodeViewContent className="content is-editable mb-3" />
      {isEditable ? (
        <input
          type="text"
          value={question}
          onChange={(e) => handleQuestionChange(e.target.value)}
          className="w-full p-2 border-textColor rounded-md bg-background text-textColor focus: outline-none"
        />
      ) : (
        <label>{question}</label>
      )}
      <RadioGroup
        value={
          choices.find((choice: Choice) => choice.selected)?.id?.toString() ||
          ""
        }
        onValueChange={(value) => toggleSelect(parseInt(value))}
      >
        {choices.map((choice: Choice, index: number) => (
          <div key={choice.id} className="flex items-center gap-2 mt-2">
            {/* Choice CheckBox */}

            {!isEditable && (
              <RadioGroupItem
                key={"checkboxKey" + choice.id}
                value={choice.id.toString()}
                id={index.toString()}
              />
              // <input
              //   key={"checkboxKey" + choice.id}
              //   type="checkbox"
              //   checked={choice.selected}
              //   onChange={() => toggleSelect(index)}
              //   className="w-5 h-5 accent-buttonColor cursor-pointer"
              // />
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
              <ToolButton
                icon={Trash2}
                tooltip="Delete Choice"
                key={"buttonKey" + choice.id}
                onClick={() => deleteChoice(index)}
              />
            )}

            {/* Set Correct Answer Button */}
            {isEditable && (
              <ToolButton
                icon={CheckCheck}
                tooltip="Set Answer"
                key={"answerButtonKey" + choice.id}
                onClick={() => setCorrectAnswer(index)}
              />
            )}
          </div>
        ))}
      </RadioGroup>

      <div>
        {isEditable ? (
          <div>
            {/* Add Choice Button */}
            <ToolButton
              icon={Plus}
              tooltip="Add Multiple Choice"
              onClick={addChoice}
            />
          </div>
        ) : (
          // Submit Button
          <ToolButton
            icon={CheckCircle}
            tooltip="Submit Answer"
            onClick={handleSubmit}
          />
        )}
      </div>
    </NodeViewWrapper>
  );
};

export default MCQComponent;
