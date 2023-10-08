import { exec } from "child_process";

export const runExecCommand = (command: string): Promise<{ error: string; output: string; }> => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      error !== null ? reject(error) : resolve({ error: stderr, output: stdout });
    });
  });
};
