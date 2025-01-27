import { exec } from "child_process";

interface OutputExec {
  output: string;
  warn?: string;
}

export const runExecCommand = (command: string): Promise<OutputExec> => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      error !== null
        ? reject(error)
        : resolve({ output: stdout, warn: stderr });
    });
  });
};
