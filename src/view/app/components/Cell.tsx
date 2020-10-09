import * as React from "react";
import { CellData } from "../utils/CellData";
import * as monaco from "monaco-editor";

import "./Cell.css";

// eslint-disable-next-line @typescript-eslint/naming-convention
export function Cell(props: CellData) {
  console.log("Rendering Cell with props", props);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const editor = monaco.editor.create(ref.current, {
      value: props.source,
      language: "python",
      glyphMargin: false,
      lineHeight: 17,
      scrollbar: {
        vertical: "hidden",
        handleMouseWheel: false,
      },
      scrollBeyondLastLine: false,
      minimap: {
        enabled: false,
      },
    });
    editor.getScrollHeight;
    editor.layout({
      width: ref.current.clientWidth,
      height: editor.getContentHeight(),
    });

    const updateSize = () => {
      // ref.current.style.height = `${editor.getScrollHeight()}px`;
      const newParentHeight = editor.getModel().getLineCount() * 18;
      ref.current.style.height = `${newParentHeight}px`;

      editor.layout({
        width: ref.current.clientWidth,
        height: editor.getContentHeight(),
      });
    };

    editor.onDidChangeModelContent(updateSize);

    window.addEventListener("resize", updateSize);
  }, [ref]);

  return <div style={{ overflow: "hidden" }} className="Cell" ref={ref}></div>;
}
