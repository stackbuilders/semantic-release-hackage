import { expect } from "@assertive-ts/core";
import Sinon from "sinon";

import { prepare } from "../../src/prepare";
import { PluginConfig } from "../../src/types/pluginConfig";
import * as exec from "../../src/utils/exec";
import { semanticContext, contextWithoutRelease } from "../helpers/context";

const pluginConfig: PluginConfig = {
  cabalFile: "test/fixtures/test-1-package.cabal",
  packageName: "test-1-package",
};

const pluginConfigWithoutCabal: PluginConfig = {
  packageName: "test-1-package",
};

describe("prepare", () => {
  context("when release does not exists", () => {
    it("rejects the promise because of the release version", async () => {
      await expect(prepare(pluginConfig, contextWithoutRelease)).toBeRejected();
    });
  });

  context("when cabal file name does not exists", () => {
    it("rejects the promise because of the cabal file", async () => {
      await expect(prepare(pluginConfigWithoutCabal, semanticContext)).toBeRejected();
    });
  });

  context("when prepare has version and cabal name", () => {
    it("execs the cabal sdist command and resolves prepare fn", async () => {
      const runExecCommandStub = Sinon.stub();
      runExecCommandStub.withArgs("cabal sdist").resolves({ error: null, output: "Mocked output" });
      Sinon.replace(exec, "runExecCommand", runExecCommandStub);
      await expect(prepare(pluginConfig, semanticContext)).toBeResolved();
    });
  });
});
