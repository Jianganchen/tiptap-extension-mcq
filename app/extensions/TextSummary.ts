import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import SummaryComponent from "../components/SummaryComponent";

export default Node.create({
  name: "textSummary",

  group: "block",

  content: "inline*",

  addAttributes() {
    return {
      // This is a sample text as a placeholder
      text: {
        default:
          "The increase in greenhouse gases traps heat in the Earth's atmosphere, leading to rising global temperatures, melting ice caps, and extreme weather events. Scientists emphasize the need for immediate action, including reducing carbon emissions, adopting renewable energy sources, and promoting sustainable practices. Without intervention, climate change could have severe consequences for ecosystems and human societies worldwide.",
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

  addNodeView() {
    return ReactNodeViewRenderer(SummaryComponent);
  },
});
