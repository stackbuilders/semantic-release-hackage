import { expect } from "@assertive-ts/core";

import { PluginConfig } from "../../src/types/pluginConfig";
import { EnvVarError } from "../../src/utils/EnvVarError";
import { verifyConditions } from "../../src/verifyConditions";
import { semanticVerifyReleaseContext } from "../helpers/context";

const pluginConfig: PluginConfig = {
  cabalFile: "test-1-package.cabal",
  packageName: "test-1-package",
};

describe("verifyConditions", () => {
  it("throws EnvVarError when HACKAGE_TOKEN is not defined", () => {
    delete process.env.HACKAGE_TOKEN;

    expect(() => verifyConditions(pluginConfig, semanticVerifyReleaseContext))
      .toThrowError(EnvVarError)
      .toHaveMessage(
        "Environment variable not found: HACKAGE_TOKEN. Check the README.md for config info.",
      );
  });

  it("does not throw EnvVarError when HACKAGE_TOKEN is defined", () => {
    process.env.HACKAGE_TOKEN = "test_token";

    expect(() =>
      verifyConditions(pluginConfig, semanticVerifyReleaseContext),
    ).not.toThrow();
  });
});
