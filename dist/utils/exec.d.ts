interface OutputExec {
    output: string;
    warn?: string;
}
export declare const runExecCommand: (command: string) => Promise<OutputExec>;
export {};
