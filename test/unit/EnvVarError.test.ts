import { expect } from "@stackbuilders/assertive-ts";

import { EnvVarError } from "../../src/utils/EnvVarError";

describe("EnvVarError", () => {
  it("throws an error with the correct message", () => {
    const variableName = "TOKEN";
    const expectedError = `Environment variable not found: ${variableName}. Check the README.md for config info.`;

    try {
      throw new EnvVarError(variableName);
    } catch (e: unknown) {
      const error = e as Error;
      expect(error.message).toBeEqual(expectedError);
    }
  });
});
