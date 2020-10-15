export interface UniversalCell {
  cellType: 'code' | 'markdown';
  source: string;
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

  const sourceLines = source.split('\n');

  let cellSource = '';
  let index = 0;

  while (index < sourceLines.length) {
    const line = sourceLines[index];
    index++;

    if (line.trim().startsWith('# %%')) {
      break;
    }

    cellSource += line + '\n';
  }

  cells.push({
    cellType: 'code',
    source: cellSource,
  });

  return getCells(sourceLines.slice(index).join('\n'), cells);
}
