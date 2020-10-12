import * as vscode from "vscode";
import { getCells, UniversalCell } from "./getCells";

export function getNotebookCellData(cell: UniversalCell): vscode.NotebookCellData {
  return {
    cellKind:
      cell.cellType === "markdown"
        ? vscode.CellKind.Markdown
        : vscode.CellKind.Code,
    source: cell.source,
    language: cell.cellType === "markdown" ? "markdown" : "python",
    outputs: [],
    metadata: {},
  };
}

export function getNotebookData(source: string): vscode.NotebookData {

    const cells = getCells(source).map((cell: UniversalCell) => getNotebookCellData(cell));

  return {
    languages: [],
    metadata: { custom: {} },
    cells,
  };
}
