"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runExecCommand = void 0;
const child_process_1 = require("child_process");
const runExecCommand = (command) => {
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(command, (error, stdout, stderr) => {
            error !== null
                ? reject(error)
                : resolve({ output: stdout, warn: stderr });
        });
    });
};
exports.runExecCommand = runExecCommand;
//# sourceMappingURL=exec.js.map