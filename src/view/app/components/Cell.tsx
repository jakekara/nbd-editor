import * as React from "react";
import * as monaco from "monaco-editor";

import "./Cell.css";
import CellControls from "./CellControls";
import { UniversalCell } from "../utils/getCells";
import { RunCellFunction } from "../utils/types";

interface CellProps {
  runCell: RunCellFunction;
  cell: UniversalCell;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export function Cell(props: CellProps) {
  console.log("Rendering Cell with props", props);
  const ref = React.useRef(null);
  let editor: monaco.editor.IStandaloneCodeEditor;

  React.useEffect(() => {
    editor = monaco.editor.create(ref.current, {
      value: props.cell.source,
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

  return (
    <div className="Cell">
      <CellControls cell={props.cell} runCell={props.runCell} editor={editor} />
      <div
        style={{ overflow: "hidden" }}
        className="CellCodeEditor"
        ref={ref}
      ></div>
    </div>
  );
}
