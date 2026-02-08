import { Highlight, themes, Prism } from "prism-react-renderer";

// Register additional languages not bundled by default
(typeof globalThis !== "undefined" ? globalThis : window).Prism = Prism;
require("prismjs/components/prism-java");
require("prismjs/components/prism-sql");
require("prismjs/components/prism-docker");
require("prismjs/components/prism-toml");

interface CodeBlockProps {
  content: string;
  language?: string;
}

export function CodeBlock({ content, language }: CodeBlockProps) {
  const code = (content || "").trimEnd();

  return (
    <Highlight theme={themes.nightOwl} code={code} language={language || "text"}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, borderRadius: "0.5rem", padding: "1rem", overflow: "auto" }}>
          <code>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  );
}
