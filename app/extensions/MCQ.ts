import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import MCQComponent from "../components/MCQComponent";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    mcq: {
      /**
       * Toggle a multiple choice question node
       */
      toggleMCQ: () => ReturnType;
    };
  }
}

export default Node.create({
  name: "mcq",

  group: "block",

  content: "inline*",

  addAttributes() {
    return {
      MultipleChoices: {
        // This is a sample question as a placeholder
        default: {
          question:
            "Which of the following is the primary cause of climate change?",
          choices: [
            { id: 0, value: "Deforestation", selected: false },
            { id: 1, value: "Burning fossil fuels", selected: false },
            { id: 2, value: "Volcanic eruptions", selected: false },
            {
              id: 3,
              value: "Earth’s natural temperature cycles",
              selected: false,
            },
          ],
        },
      },
      isEditable: {
        default: true,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "react-component",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["react-component", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(MCQComponent);
  },

  addCommands() {
    return {
      toggleMCQ:
        () =>
        ({ commands }) => {
          return commands.toggleNode("paragraph", this.name);
        },
    };
  },
});
