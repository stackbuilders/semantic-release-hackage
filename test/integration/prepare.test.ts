import { expect } from "@stackbuilders/assertive-ts";

import { prepare } from "../../src/prepare";
import { PluginConfig } from "../../src/types/pluginConfig";
import { semanticContext, contextWithoutRelease } from "../utils";

const pluginConfig: PluginConfig = {
  cabalFile: "test/fixtures/test-1-package.cabal",
  packageName: "test-1-package",
};

describe("prepare", () => {
  context("when release does not exists", () => {
    it("throws an error when next release is not defined", async () => {
      await expect(prepare(pluginConfig, contextWithoutRelease)).toBeRejected();
    });
  });

  context("when cabal file name does not exists", () => {
    it("throws an error when next release is not defined", async () => {
      await expect(prepare(pluginConfig, contextWithoutRelease)).toBeRejected();
    });
  });

  it.only("does not throw an error when next release is defined", async () => {
    await expect(prepare(pluginConfig, semanticContext)).toBeResolved();
  });
});
