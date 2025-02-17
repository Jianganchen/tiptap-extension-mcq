import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import MCQComponent from "../components/MCQComponent";

export default Node.create({
  name: "reactComponent",

  group: "block",

  content: "inline*",

  addAttributes() {
    return {
      MultipleChoices: {
        default: {
          question: "Enter your question...",
          choices: [
            { id: 0, value: "Option 1" },
            { id: 1, value: "Option 2" },
          ],
        },
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
});
