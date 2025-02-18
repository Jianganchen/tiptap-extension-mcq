import { NodeViewContent, NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import { Key } from "react";

export interface Choice {
  id: number;
  value: string;
  selected: boolean;
}

const MCQComponent = (props: NodeViewProps) => {
  const { MultipleChoices } = props.node.attrs;
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
    const updatedChoices = [...choices];
    updatedChoices[index].correct = !updatedChoices[index].correct;

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
    <NodeViewWrapper className="react-component">
      {/* <label contentEditable={false}>React Component</label> */}

      <NodeViewContent className="content is-editable" />

      {choices.map((choice: Choice, index: number) => (
        <div key={choice.id} className="flex items-center gap-2 mt-2">
          {/* Choice CheckBox */}
          <input
            key={"checkboxKey" + choice.id}
            type="checkbox"
            checked={choice.selected}
            onChange={() => toggleCorrect(index)}
          />

          {/* Choice Input Field */}
          <input
            key={"inputKey" + choice.id}
            type="text"
            value={choice.value}
            onChange={(e) => handleChoiceChange(index, e.target.value)}
            className="border p-2 w-full"
          />

          {/* Choice Delete Button */}
          <button
            key={"buttonKey" + choice.id}
            onClick={() => deleteChoice(index)}
            className="bg-red-500 text-white px-2 py-1"
          >
            Delete Choice
          </button>
        </div>
      ))}

      <div>
        <button
          className="bg-blue-500 text-white px-2 py-1 mt-2"
          onClick={addChoice}
        >
          Add Choice
        </button>
      </div>
    </NodeViewWrapper>
  );
};

export default MCQComponent;
