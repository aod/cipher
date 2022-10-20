import { toH } from "hast-to-hyperscript";
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
    <div className="font-mono text-2xl bg-[#333] text-white h-full overflow-auto">
      <pre>{react}</pre>
    </div>
  );
}