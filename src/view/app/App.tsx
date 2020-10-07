import * as React from "react";
import { Cell } from "./components/Cell";
import { CellData } from "./utils/CellData";
import { getCells } from "./utils/getCells";

interface AppProps {
  initialData?: string;
  vscode?: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export default function App(props: AppProps): JSX.Element {
  const cells = getCells(props.initialData || "");

  console.log("Rendering with initialData", props.initialData);
  console.log("Rendering with cells", cells);
  return (
    <div>
      {cells.map((cell: CellData, i: number) => {
        return <Cell key={i} {...cell} />;
      })}
    </div>
  );
}
