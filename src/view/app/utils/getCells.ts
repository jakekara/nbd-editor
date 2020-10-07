import { CellData } from "./CellData";

export function getCells(source: string, cells?: Array<CellData>): Array<CellData> {

    if (!cells) { cells = []; }

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

        cellSource += (line + "\n");

    }

    cells.push({
        source: cellSource,
        type: "code"
    });

    return getCells(sourceLines.slice(index).join("\n"), cells);
}
