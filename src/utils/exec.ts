import { exec, ExecException } from "child_process";

const promisifyExec = (command: string): Promise<{ error: string; output: string; }> => {
  return new Promise((resolve, reject) => {
    exec(command, (error: ExecException | null, stdout: string, stderr: string) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ error: stderr, output: stdout });
    });
  });
};

export const runExecCommand = async (command: string): Promise<{ error: string; output: string; }> => {
  try {
    return await promisifyExec(command);
  } catch (e) {
    const error = e as ExecException;
    throw new Error(error.message);
  }
};
