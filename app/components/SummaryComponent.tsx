import { NodeViewWrapper, NodeViewContent, NodeViewProps } from "@tiptap/react";
import { useState } from "react";
import { fetchSummary } from "../utils/fetchSummary";

const SummaryComponent = (props: NodeViewProps) => {
  const { text, summary } = props.node.attrs;
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    const summarizedText = await fetchSummary(text);
    console.log("Summarizing:", text);
    props.updateAttributes({ summary: summarizedText });
    setLoading(false);
  };

  return (
    <NodeViewWrapper className="summary-component">
      <NodeViewContent
        as="div"
        className="ProseMirror text-textColor"
        contentEditable
        suppressContentEditableWarning
        onInput={(e: { target: HTMLDivElement }) =>
          props.updateAttributes({
            text: (e.target as HTMLDivElement).innerText,
          })
        }
      />

      {/* Summarize Button */}
      <button
        onClick={handleSummarize}
        className="mt-3 px-4 py-2 rounded-md bg-buttonColor text-background hover:bg-yellow-600 transition-all"
        disabled={loading}
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {/* Display Summary */}
      {summary && (
        <p className="mt-2 p-2 bg-gray-800 text-textColor rounded-lg">
          {summary}
        </p>
      )}
    </NodeViewWrapper>
  );
};

export default SummaryComponent;
