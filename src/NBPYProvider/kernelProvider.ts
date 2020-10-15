import * as vscode from 'vscode';
import * as path from 'path';

import {
  CancellationToken,
  NotebookCell,
  NotebookDocument,
  NotebookKernel,
  NotebookKernelProvider,
  ProviderResult,
} from 'vscode';

export class NBPYKernelProvider implements NotebookKernelProvider<NBPYKernel> {
  // onDidChangeKernels?: Event<NotebookDocument | undefined>;
  provideKernels(
    document: NotebookDocument,
    token: CancellationToken
  ): ProviderResult<NBPYKernel[]> {
    return new Promise((resolve, reject) => {
      resolve([new NBPYKernel()]);
    });
  }
  // resolveKernel?(kernel: kernel, document: NotebookDocument, webview: NotebookCommunication, token: CancellationToken): ProviderResult<void>;
}

export class NBPYKernel implements NotebookKernel {
  label = 'nbpy kernel';

  terminal?: vscode.Terminal;

  constructor() {

    vscode.commands.executeCommand('python.setInterpreter').then(() => {

      // const pythonPath = vscode.workspace.getConfiguration('python', (null as any) as vscode.Uri).get<string>('pythonPath') || undefined
      // let terminalShellPath: string = pythonPath || "";
      // if (!path.isAbsolute(terminalShellPath)) {
      //   terminalShellPath = path.join(vscode.workspace.rootPath || "", terminalShellPath);

      // }

      const terminalOptions: vscode.TerminalOptions = {
        name: 'nbpy-session',
        // shellPath: pythonPath ? terminalShellPath : undefined

      };

      this.terminal = vscode.window.createTerminal(terminalOptions);
      this.terminal.show();
      // if (!pythonPath) {
      setTimeout(() => this.terminal?.sendText('python'), 3000);
      // }
    });
  }

  executeCell(document: NotebookDocument, cell: NotebookCell): Promise<void> {
    console.log('Executing cell', cell, cell.document.getText());

    return new Promise((resolve, reject) => {
      if (cell.cellKind !== vscode.CellKind.Code) {
        console.log('Skipping markdown cell', cell.document.getText());
        resolve();
        return;
      } else if (!this.terminal) {
        reject('No terminal');
        return;
      } else if (this.terminal) {
        this.terminal.show();
        this.terminal.sendText(cell.document.getText());

        // TODO make this get the actual output
        const output: vscode.CellOutput = {
          outputKind: vscode.CellOutputKind.Text,
          text: 'DONE',
        };

        cell.outputs = [output];
        resolve();
      }
    });
  }

  cancelAllCellsExecution() { }

  executeAllCells(document: NotebookDocument): Promise<void> {
    console.log('Executing all cells');
    return new Promise((resolve, reject) => {
      document.cells.forEach((c) => {
        this.executeCell(document, c);
      });
    });
  }

  cancelCellExecution() { }
}
