import { Terminal } from 'vscode';
import * as vscode from 'vscode';

const DELAY_MS = 3000;

interface IREPLExecutor {
  getTerminal(name?: string): Promise<Terminal>;
}

class PythonExecutor implements IREPLExecutor {
  interpreterSet: boolean;
  pythonRunning: boolean;
  terminal?: Terminal;

  constructor() {
    this.interpreterSet = false;
    this.pythonRunning = false;
    vscode.commands.executeCommand('python.setInterpreter').then(() => {
      this.interpreterSet = true;
    });
  }

  getNewTerminal(name?: string): Promise<Terminal> {

    const newTerminal = vscode.window.createTerminal(name);
    this.pythonRunning = false;

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(newTerminal);
      }, DELAY_MS);
    });

  }

  getTerminal(name?: string): Promise<Terminal> {
    if (this.terminal && !this.terminal.exitStatus) {
      return new Promise(resolve => resolve(this.terminal));
    }
    else {
      return this.getNewTerminal(name);
    }
  }

  startPython() {
    if (this.pythonRunning) {
      return;
    }

    this.getTerminal().then((terminal) => {
      terminal.sendText('python');
      vscode.workspace.getConfiguration("python.pythonPath")
    });

    setTimeout(() => {
      this.pythonRunning = true;
    }, DELAY_MS);
  }

  executePython() {

  }
}
