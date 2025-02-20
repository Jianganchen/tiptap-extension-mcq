import { NodeViewContent, NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import { useEffect } from "react";

export interface Choice {
  id: number;
  value: string;
  selected: boolean;
}

const MCQComponent = (props: NodeViewProps) => {
  const { MultipleChoices, isEditable } = props.node.attrs;
  const choices = MultipleChoices.choices || [];

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

  const toggleCorrect = (index: number) => {
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

  return (
    <NodeViewWrapper className="react-component ">
      {/* <label contentEditable={false}>React Component</label> */}

      <NodeViewContent className="content is-editable mb-3 text-lg font-semibold text-textColor" />

      {choices.map((choice: Choice, index: number) => (
        <div key={choice.id} className="flex items-center gap-2 mt-2">
          {/* Choice CheckBox */}
          {!isEditable && (
            <input
              key={"checkboxKey" + choice.id}
              type="checkbox"
              checked={choice.selected}
              onChange={() => toggleCorrect(index)}
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
              className="px-3 py-1 rounded-md text-background transition-all bg-red-500 hover:bg-red-600"
            >
              Delete Choice
            </button>
          )}
        </div>
      ))}

      <div>
        {isEditable ? (
          <button
            className="mt-3 px-4 py-2 text-background bg-buttonColor rounded-md hover:bg-yellow-600 transition-all"
            onClick={addChoice}
          >
            Add Choice
          </button>
        ) : null}
      </div>
    </NodeViewWrapper>
  );
};

export default MCQComponent;
