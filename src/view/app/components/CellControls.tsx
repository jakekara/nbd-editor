import * as React from "react";
import * as monaco from "monaco-editor";
import { RunCellFunction } from "../utils/types";
import { UniversalCell } from "../utils/getCells";

interface CellControlsProps {
  editor?: monaco.editor.IStandaloneCodeEditor;
  runCell: RunCellFunction;
  cell: UniversalCell;
}

export default function CellControls(props: CellControlsProps): JSX.Element {
  return (
    <div>
      <button onClick={() => props.runCell(props.cell)}>Run</button>
    </div>
  );
}
