import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { RunCellFunction } from "./app/utils/types";

export default class ViewLoader {
  private readonly _panel: vscode.WebviewPanel | undefined;
  private _extensionPath: string;

  constructor(
    fileUri: vscode.Uri,
    extensionPath: string,
    runCell: RunCellFunction
  ) {
    this._extensionPath = extensionPath;
    this._panel = vscode.window.createWebviewPanel(
      "configView",
      "Python Notebook Viewer",
      vscode.ViewColumn.One,
      {
        enableScripts: true,

        localResourceRoots: [
          vscode.Uri.file(path.join(extensionPath, "pynotebook")),
        ],
      }
    );

    this._panel.webview.html = this.getWebviewContent(
      fileUri.fsPath,
      this.getFileContent(fileUri) || ""
    );

    this._panel.webview.onDidReceiveMessage((message) => {
      console.log("Received message", message);
      switch (message.command) {
        case "runCell":
          runCell(message.cell);
          return;
      }
    });
  }

  private getFileContent(fileUri: vscode.Uri): string | undefined {
    if (fs.existsSync(fileUri.fsPath)) {
      let content = fs.readFileSync(fileUri.fsPath, "utf8");
      return content;
    }
    return undefined;
  }

  private getWebviewContent(filepath: string, content: string): string {
    const reactAppPathOnDisk = vscode.Uri.file(
      path.join(this._extensionPath, "pynotebook", "pynotebook.js")
    );
    const reactAppUri = reactAppPathOnDisk.with({ scheme: "vscode-resource" });
    console.log(filepath);

    const pageCode = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Viewer</title>
    
            <meta http-equiv="Content-Security-Policy"
                  content="default-src 'none';
                          img-src https:;
                          script-src 'unsafe-eval' 'unsafe-inline' vscode-resource:;
                          style-src vscode-resource: 'unsafe-inline';">
    
        </head>
        <body>
            <div id="root"></div>
            <script>
            window.fileName=${JSON.stringify(filepath)};
            window.initialData=${JSON.stringify(content)};
            </script>

            <script src="${reactAppUri}"></script>
        </body>
        </html>`;

    return pageCode;
  }
}
