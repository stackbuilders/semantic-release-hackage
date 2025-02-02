import { expect } from "@assertive-ts/core";

import { PluginConfig } from "../../src/types/pluginConfig";
import { verifyConditions } from "../../src/verifyConditions";
import { semanticVerifyReleaseContext } from "../helpers/context";

const pluginConfig: PluginConfig = {};

describe("verifyConditions", () => {
  it("throws EnvVarError when HACKAGE_TOKEN is not defined", () => {
    delete process.env.HACKAGE_TOKEN;

    expect(() => verifyConditions(pluginConfig, semanticVerifyReleaseContext))
      .toThrowError(Error)
      .toHaveMessage("HACKAGE_TOKEN must be set in the environment");
  });

  it("does not throw EnvVarError when HACKAGE_TOKEN is defined", () => {
    process.env.HACKAGE_TOKEN = "test_token";

    expect(() =>
      verifyConditions(pluginConfig, semanticVerifyReleaseContext),
    ).not.toThrow();
  });
});
