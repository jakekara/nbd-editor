// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';

import NBPYContentProvider from './NBPYProvider/contentProvider';
import { NBPYKernel, NBPYKernelProvider } from './NBPYProvider/kernelProvider';
import SampleProvider from './SampleProvider';
import ViewLoader from './view/ViewLoader';
import {
  getNotebookCell,
  getNotebookDocument,
  UniversalCell,
} from './NBPYProvider/getCells';
import { glob } from 'glob';
import { Uri } from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "hello-react" is now active!');

  const nbpyProvider = new NBPYContentProvider();
  const sampleProvider = new SampleProvider();
  console.log('Instantiated nbpy provider', nbpyProvider);
  console.log('Instantiated sample provider', sampleProvider);

  context.subscriptions.push(
    vscode.notebook.registerNotebookContentProvider(
      'nbpy-provider',
      nbpyProvider
    )
  );

  context.subscriptions.push(
    vscode.notebook.registerNotebookContentProvider(
      'notebook-provider',
      sampleProvider
    )
  );

  context.subscriptions.push(
    vscode.notebook.registerNotebookKernelProvider(
      {
        viewType: 'nbpy-provider',
      },
      new NBPYKernelProvider()
    )
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('hello-react.open', () => {
    // The code you place here will be executed every time your command is executed
    let openDialogOptions: vscode.OpenDialogOptions = {
      canSelectFiles: true,
      canSelectFolders: false,
      canSelectMany: false,
      filters: {
        nbpy: ['nbpy'],
      },
    };

    const vscopy = vscode;
    vscode.window
      .showOpenDialog(openDialogOptions)
      .then(async (uri: vscode.Uri[] | undefined) => {
        const filePath = uri![0].fsPath;
        const source = fs.readFileSync(filePath, 'utf-8') || '';

        const kernel = new NBPYKernel();
        const contentProvider = new NBPYContentProvider();

        const runCell = (cell: UniversalCell) => {

          kernel.terminal?.sendText(cell.source);
          // const notebookDocument = getNotebookDocument(source, filePath)
          // setTimeout(()=>{
          // console.log("RUNNING A CELL WITH CODE", cell.source);
          // const notebookCell = getNotebookCell(0, notebookDocument, cell);
          // kernel.executeCell(notebookDocument, notebookCell)
          // }, 3000);
        };

        if (uri && uri.length > 0) {
          // vscode.window.showInformationMessage(uri[0].fsPath);
          const view = new ViewLoader(uri[0], context.extensionPath, (cell) =>
            runCell(cell)
          );
        } else {
          vscode.window.showErrorMessage('No valid file selected!');
          return;
        }
      });

    // Display a message box to the user
    // vscode.window.showInformationMessage('Hello World from hello-react!');
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
