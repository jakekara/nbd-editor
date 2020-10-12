import * as vscode from "vscode";
import { CancellationToken, NotebookCell, NotebookCommunication, NotebookDocument, NotebookKernel, NotebookKernelProvider, ProviderResult } from "vscode";

export class NBPYKernelProvider implements NotebookKernelProvider<NBPYKernel>{
    // onDidChangeKernels?: Event<NotebookDocument | undefined>;
    provideKernels(document: NotebookDocument, token: CancellationToken): ProviderResult<NBPYKernel[]> {
        return new Promise((resolve, reject) => {
            resolve([new NBPYKernel()]);
        });
    }
    // resolveKernel?(kernel: kernel, document: NotebookDocument, webview: NotebookCommunication, token: CancellationToken): ProviderResult<void>;

}

export class NBPYKernel implements NotebookKernel {
    label = "nbpy kernel";

    terminal?: vscode.Terminal;

    constructor() {
        const terminalOptions: vscode.TerminalOptions = {
            name: "nbpy-session",
        }
        vscode.commands.executeCommand("python.setInterpreter")
            .then(() => {
                this.terminal = vscode.window.createTerminal(terminalOptions)
                this.terminal.show()
                // this.terminal.sendText("python --version")

                setTimeout(() => this.terminal?.sendText("python"), 3000);

                // this.terminal.sendText("import sys; sys.version")

            });

    }


    executeCell(document: NotebookDocument, cell: NotebookCell): Promise<void> {

        console.log("Executing cell", cell, cell.document.getText());

        return new Promise((resolve, reject) => {
            if (cell.cellKind !== vscode.CellKind.Code) {
                console.log("Skipping markdown cell", cell.document.getText())
                resolve();
                return;
            }
            else if (!this.terminal) {
                reject("No terminal");
                return;
            }
            else if (this.terminal) {
                this.terminal.show()
                this.terminal.sendText(cell.document.getText())
                resolve();
            }


        })



    }

    cancelAllCellsExecution() {

    }

    executeAllCells(document: NotebookDocument): Promise<void> {

        console.log("Executing all cells")
        return new Promise((resolve, reject) => {
            document.cells.forEach(c => { this.executeCell(document, c) })
        })

    }

    cancelCellExecution() {

    }
}