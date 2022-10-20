import { toH } from "hast-to-hyperscript";
import { lowlight } from "lowlight";
import { createElement } from "react";

import agate from "../lib/hljs/inline-styles/agate";
import applyInlineStyles from "../lib/lowlight/ast-transfomers/inline-style";

interface SyntaxHighlighterProps {
  source: string;
  language?: string;
}

export default function SyntaxHighlighter(props: SyntaxHighlighterProps) {
  const tree = props.language?.length
    ? lowlight.highlight(props.language, props.source)
    : lowlight.highlightAuto(props.source);
  applyInlineStyles(tree, agate);
  const react = toH(createElement, tree);

  return (
    <div className="text-xs sm:text-lg lg:text-2xl bg-[#333] h-full text-white overflow-auto">
      <pre className="font-iosevka">{react}</pre>
    </div>
  );
}
