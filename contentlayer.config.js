import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import rehypeShiki from "@shikijs/rehype";
import {
  transformerNotationHighlight,
  transformerMetaHighlight,
  transformerNotationDiff,
} from "@shikijs/transformers";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
};

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
  },
  computedFields,
}));

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    image: {
      type: "string",
    },
  },
  computedFields,
}));

function rehypeCopyButton() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "pre" && node.children[0]?.tagName === "code") {
        node.properties.className = (node.properties.className || []).concat(
          "code-block"
        );
        const button = {
          type: "element",
          tagName: "button",
          properties: { className: ["copy-button"] },
          children: [{ type: "text", value: "Copy" }],
        };
        node.children.unshift(button);
      }
    });
  };
}

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Page],
  mdx: {
    remarkPlugins: [remarkUnwrapImages, [remarkToc, { tight: true }]],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeShiki,
        {
          transformers: [
            transformerNotationHighlight(),
            transformerMetaHighlight(),
            transformerNotationDiff(),
          ],
          themes: {
            light: "github-light",
            dark: "github-dark",
          },
          showLineNumbers: true,
        },
      ],
    ],
  },
});
