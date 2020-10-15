import * as React from 'react';
import { getCells, UniversalCell } from './utils/getCells';
import { Cell } from './components/Cell';

interface AppProps {
  initialData?: string;
  vscode?: any;
  filePath: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export default function App(props: AppProps): JSX.Element {
  const cells = getCells(window.initialData || '');
  console.log('Rendering App');

  return (
    <div>
      {cells.map((cell: UniversalCell, i: number) => {
        return (
          <Cell
            runCell={() => {
              props.vscode.postMessage({
                command: 'runCell',
                cell,
                index: {
                  i,
                },
              });
            }}
            cell={cell}
            key={i}
          />
        );
      })}
    </div>
  );
}
