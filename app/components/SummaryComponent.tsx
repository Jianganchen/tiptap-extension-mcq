"use client";

import { NodeViewWrapper, NodeViewContent, NodeViewProps } from "@tiptap/react";

const SummaryComponent = (props: NodeViewProps) => {
  const { text, summary } = props.node.attrs;

  return (
    <NodeViewWrapper>
      {text ? (
        <p>{text}</p>
      ) : (
        <p className="text-gray-500">Generating AI content...</p> // Placeholder
      )}
    </NodeViewWrapper>
  );
};

export default SummaryComponent;
