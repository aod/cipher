import { Root, Span, Text } from "lowlight/lib/core";
import { CSSProperties } from "react";

// TODO: Fix @ts-ignores
export function _applyInlineStyles(
  node: Text | Span,
  mapClassToStyle: Record<string, CSSProperties>
) {
  if (node.type === "element") {
    // @ts-ignore
    node.properties.style = {};
    for (const clazz of node.properties.className) {
      // @ts-ignore
      Object.assign(node.properties.style, mapClassToStyle[clazz]);
    }
    delete node.properties.className;

    for (const child of node.children) {
      _applyInlineStyles(child, mapClassToStyle);
    }
  }
}

export default function applyInlineStyles(
  node: Root,
  mapClassToStyle: Record<string, CSSProperties>
) {
  for (const child of node.children) {
    if (child.type === "element") {
      _applyInlineStyles(child, mapClassToStyle);
    }
  }
}
