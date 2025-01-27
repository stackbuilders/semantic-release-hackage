"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvVarError = void 0;
const configMessage = "Check the README.md for config info.";
class EnvVarError extends Error {
    constructor(variable) {
        super(`Environment variable not found: ${variable}. ${configMessage}`);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.EnvVarError = EnvVarError;
//# sourceMappingURL=EnvVarError.js.map