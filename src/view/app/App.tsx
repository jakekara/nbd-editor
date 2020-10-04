import * as React from "react";

interface AppProps {
  initialData?: string;
  vscode?: any;
}
export default function App(props: AppProps): JSX.Element {
  return <pre>{props.initialData || "NOTHING RECEIVED"}</pre>;
}
