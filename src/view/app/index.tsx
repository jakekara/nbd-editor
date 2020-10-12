import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";
import "./index.css";

declare global {
  interface Window {
    acquireVsCodeApi(): any;
    initialData: string;
    filePath: string;
  }
}

const vscode: any = acquireVsCodeApi();

ReactDOM.render(
  <App
    vscode={vscode}
    filePath={window.filePath}
    initialData={window.initialData}
  ></App>,
  document.getElementById("root")
);
