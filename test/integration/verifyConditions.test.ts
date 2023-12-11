import { expect } from "@stackbuilders/assertive-ts";

import { PluginConfig } from "../../src/types/pluginConfig";
import { EnvVarError } from "../../src/utils/EnvVarError";
import { verifyConditions } from "../../src/verifyConditions";
import { context } from "../utils";

const pluginConfig: PluginConfig = {
  cabalFile: "test-1-package.cabal",
  packageName: "test-1-package",
};

describe("verifyConditions", () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("throws EnvVarError when HACKAGE_TOKEN is not defined", () => {
    delete process.env.HACKAGE_TOKEN;

    expect(() => verifyConditions(pluginConfig, context)).toThrow(new EnvVarError("HACKAGE_TOKEN"));
  });

  it("does not throw EnvVarError when HACKAGE_TOKEN is defined", () => {
    process.env.HACKAGE_TOKEN = "test_token";

    expect(() => verifyConditions(pluginConfig, context)).not.toThrow();
  });
});
