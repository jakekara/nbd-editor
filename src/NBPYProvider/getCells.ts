import {
  Uri,
  NotebookCell,
  CellKind,
  TextDocument,
  NotebookCellData,
  NotebookDocument,
  NotebookDocumentContentOptions,
} from "vscode";

export interface UniversalCell {
  cellType: "code" | "markdown";
  source: string;
}

export function convertCellToCellData(cell: NotebookCell): NotebookCellData {
  return {
    cellKind: cell.cellKind,
    source: cell.document.getText(),
    language: cell.language,
    outputs: cell.outputs,
    metadata: cell.metadata,
  };
}

export function getNotebookDocument(
  source: string,
  filePath: string
): NotebookDocument {
  const options: NotebookDocumentContentOptions = {
    transientMetadata: {},
    transientOutputs: false,
  };
  const universalCells: Array<UniversalCell> = getCells(source);

  const notebookDocument: NotebookDocument = {
    uri: Uri.file(filePath),
    fileName: filePath,
    version: -1,
    viewType: "nbpy-notebook",
    isDirty: false,
    isUntitled: false,
    cells: universalCells.map((c: UniversalCell, i: number) =>
      getNotebookCell(i, notebookDocument, c)
    ),
    contentOptions: options,
    languages: [],
    metadata: {},
  };

  return notebookDocument;
}

export function getNotebookCell(
  index: number,
  document: NotebookDocument,
  cell: UniversalCell
): NotebookCell {
  const textDocument: TextDocument = {};

  return {
    index,
    notebook: document,
    uri: document.uri,
    cellKind: cell.cellType === "markdown" ? CellKind.Markdown : CellKind.Code,
    language: cell.cellType === "markdown" ? "markdown" : "python",
    outputs: [],
    metadata: {},
    document: textDocument,
  };
}

export function getCells(
  source: string,
  cells?: Array<UniversalCell>
): Array<UniversalCell> {
  if (!cells) {
    cells = [];
  }

  if (source.trim().length < 1) {
    return cells;
  }

  const sourceLines = source.split("\n");

  let cellSource = "";
  let index = 0;

  while (index < sourceLines.length) {
    const line = sourceLines[index];
    index++;

    if (line.trim().startsWith("# %%")) {
      break;
    }

    cellSource += line + "\n";
  }

  cells.push({
    cellType: "code",
    source: cellSource,
  });

  return getCells(sourceLines.slice(index).join("\n"), cells);
}
