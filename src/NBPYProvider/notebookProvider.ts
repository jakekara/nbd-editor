import * as vscode from "vscode";
import { getNotebookData } from "./getNotebookData";

console.log("NBPYProvider/index.ts");

export default class NBPYProvider implements vscode.NotebookContentProvider {
  async openNotebook(uri: vscode.Uri): Promise<vscode.NotebookData> {
    // vscode.commands.getCommands()
    // .then(commandString => {
    //     commandString.forEach(c=>{console.log(c)})
    // })

    const content = (await vscode.workspace.fs.readFile(uri)).toString();
    return getNotebookData(content);
  }

  // The following are dummy implementations not relevant to this example.
  onDidChangeNotebook = new vscode.EventEmitter<
    vscode.NotebookDocumentEditEvent
  >().event;
  async resolveNotebook(): Promise<void> {}
  async saveNotebook(): Promise<void> {}
  async saveNotebookAs(): Promise<void> {}
  async backupNotebook(): Promise<vscode.NotebookDocumentBackup> {
    return { id: "", delete: () => {} };
  }
}
