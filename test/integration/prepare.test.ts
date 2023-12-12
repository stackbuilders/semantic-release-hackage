import { expect } from "@stackbuilders/assertive-ts";

import { prepare } from "../../src/prepare";
import { PluginConfig } from "../../src/types/pluginConfig";
import { context, contextWithoutRelease } from "../utils";

const pluginConfig: PluginConfig = {
  cabalFile: "test-1-package.cabal",
  packageName: "test-1-package",
};

describe("prepare", () => {
  it.skip("throws an error when next release is not defined", () => {
    expect(() => prepare(pluginConfig, contextWithoutRelease)).toThrow();
  });

  it("does not throw an error when next release is defined", () => {
    expect(() => prepare(pluginConfig, context)).not.toThrow();
  });
});
