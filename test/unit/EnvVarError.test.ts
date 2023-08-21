import { expect } from "@stackbuilders/assertive-ts";

import { EnvVarError } from "../../src/utils/EnvVarError";

describe("EnvVarError", () => {
  it("throws an error with the correct message", () => {
    const variableName = "TOKEN";
    const expectedError = `Environment variable not found: ${variableName}. Check the README.md for config info.`;

    expect(new EnvVarError(variableName)).toHaveName("EnvVarError").toHaveMessage(expectedError);
  });
});
