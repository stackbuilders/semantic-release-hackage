const configMessage = "Check the README.md for config info.";

export class EnvVarError extends Error {
  public constructor(variable: string) {
    super(`Environment variable not found: ${variable}. ${configMessage}`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
