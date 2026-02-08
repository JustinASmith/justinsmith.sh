import type { Config } from "@markdoc/markdoc";

export const markdocConfig: Config = {
  nodes: {
    fence: {
      render: "CodeBlock",
      attributes: {
        content: { type: String, required: true },
        language: { type: String },
      },
    },
  },
};
