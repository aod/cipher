import { lowlight } from "lowlight";
import { toH } from "hast-to-hyperscript";
import { createElement } from "react";

import applyInlineStyles from "../lib/lowlight/ast-transfomers/inline-style";
import agate from "../lib/hljs/inline-styles/agate";

const tree = lowlight.highlightAuto(`#[derive(Debug)]
pub enum State {
    Start,
    Transient,
    Closed,
}

impl From<&'a str> for State {
    fn from(s: &'a str) -> Self {
        match s {
            "start" => State::Start,
            "closed" => State::Closed,
            _ => unreachable!(),
        }
    }
}`);

applyInlineStyles(tree, agate);

const react = toH(createElement, tree);

export default function Home() {
  return (
    <div className="font-mono text-3xl bg-[#333] text-white h-screen">
      <pre>{react}</pre>
    </div>
  );
}
