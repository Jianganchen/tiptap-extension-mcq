import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import SummaryComponent from "../components/SummaryComponent";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    AISummary: {
      AISummarize: (text: string) => ReturnType;
    };
  }
}

export const AISummary = Node.create({
  name: "textSummary",

  group: "block",

  content: "inline*",

  addAttributes() {
    return {
      text: {
        default: "",
      },
      summary: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "summary-component",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["summary-component", mergeAttributes(HTMLAttributes), 0];
  },

  addCommands() {
    return {
      AISummarize:
        (text: string) =>
        ({ chain }) =>
          chain()
            .focus()
            .insertContent({
              type: this.name,
              attrs: {
                text,
              },
            })
            .run(),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(SummaryComponent);
  },
});

export default AISummary;
