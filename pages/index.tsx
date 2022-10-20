import SyntaxHighlighter from "../components/syntax-highlighter";

const source = String.raw`import { toH } from "hast-to-hyperscript";
import { lowlight } from "lowlight";
import { createElement } from "react";

import agate from "../lib/hljs/inline-styles/agate";
import applyInlineStyles from "../lib/lowlight/ast-transfomers/inline-style";

interface SyntaxHighlighterProps {
  source: string;
}

export default function SyntaxHighlighter(props: SyntaxHighlighterProps) {
  const tree = lowlight.highlightAuto(props.source);
  applyInlineStyles(tree, agate);
  const react = toH(createElement, tree);

  return (
    <div className="font-mono text-3xl bg-[#333] text-white h-screen">
      <pre>{react}</pre>
    </div>
  );
}`;

export default function Home() {
  return <SyntaxHighlighter source={source} />;
}
