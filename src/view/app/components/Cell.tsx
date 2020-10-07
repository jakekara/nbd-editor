import * as React from "react";
import { CellData } from "../utils/CellData";
import * as monaco from "monaco-editor";

import "./Cell.css";

export function Cell(props: CellData) {
  console.log("Rendering Cell with props", props);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const editor = monaco.editor.create(ref.current, {
      value: props.source,
      language: "python",
    });
    editor.getScrollHeight;
    editor.layout({
      width: ref.current.clientWidth,
      height: editor.getContentHeight(),
    });

    window.addEventListener("resize", () => {
      ref.current.style.height = `${editor.getScrollHeight()}px`;

      editor.layout({
        width: ref.current.clientWidth,
        height: editor.getContentHeight(),
      });
    });
  }, [ref]);

  return <div className="Cell" ref={ref}></div>;
}
