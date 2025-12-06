import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import rehypeUnwrapImages from "rehype-unwrap-images";
import rehypeShiki from "@shikijs/rehype";
import {
  transformerNotationHighlight,
  transformerMetaHighlight,
  transformerNotationDiff,
} from "@shikijs/transformers";

/** @type {import('contentlayer2/source-files').ComputedFields} */
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

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Page],
  mdx: {
    remarkPlugins: [[remarkToc, { tight: true }]],
    rehypePlugins: [
      rehypeSlug,
      rehypeUnwrapImages,
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
