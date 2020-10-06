import * as React from "react";
import * as monaco from "monaco-editor";

interface AppProps {
  initialData?: string;
  vscode?: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export default function App(props: AppProps): JSX.Element {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const editor = monaco.editor.create(ref.current, {
      value: props.initialData,
      language: "python",
    });
    editor.getScrollHeight;
    editor.layout({
      width: ref.current.getBoundingClientRect().width,
      height: editor.getScrollHeight(),
    });
  }, [ref]);

  return <div ref={ref}></div>;
}
