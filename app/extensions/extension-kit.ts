"use client";

import StarterKit from "@tiptap/starter-kit";

export const ExtensionKit = () => [
  Document,

  Selection,

  StarterKit.configure({
    document: false,
    dropcursor: false,
    heading: false,
    horizontalRule: false,
    blockquote: false,
    history: false,
    codeBlock: false,
  }),
];

export default ExtensionKit;
