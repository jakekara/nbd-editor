import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";
import "./index.css";

declare global {
  interface Window {
    acquireVsCodeApi(): any;
    initialData: string;
  }
}

// const vscode = acquireVsCodeApi();
console.log(window.initialData);

ReactDOM.render(
  <App initialData={window.initialData}></App>,
  document.getElementById("root")
);
