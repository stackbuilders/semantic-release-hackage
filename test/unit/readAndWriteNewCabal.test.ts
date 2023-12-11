import { expect } from "@stackbuilders/assertive-ts";

import { readAndWriteNewCabal, versionPattern } from "../../src/prepare";
import { runExecCommand } from "../../src/utils/exec";

import { readFile, writeFile } from "fs/promises";

describe("readAndWriteNewCabal", () => {
  const fakeCabalPath = "./test/fixtures/test-1-package.cabal";
  const fakeNewVersion = "0.0.7";

  beforeEach(async () => {
    const cabalContent = "name: test-1-package\nversion: 0.1.0";
    await writeFile(fakeCabalPath, cabalContent, "utf8");
  });

  afterEach(async () => {
    await runExecCommand(`rm -f ${fakeCabalPath}`);
  });

  it("updates the version in the cabal file fixture", async () => {
    const originalContents = await readFile(fakeCabalPath, "utf8");

    const versionMatch = versionPattern.exec(originalContents);
    if (versionMatch) {
      const originalVersion = versionMatch[1];
      expect(originalVersion).not.toBeEqual(fakeNewVersion);
    } else {
      throw new Error("No version matched");
    }

    await readAndWriteNewCabal(fakeCabalPath, fakeNewVersion);

    const modifiedContents = await readFile(fakeCabalPath, "utf8");

    const modifiedVersionMatch = versionPattern.exec(modifiedContents);
    if (modifiedVersionMatch) {
      const modifiedVersion = modifiedVersionMatch[1];
      expect(modifiedVersion).toBeEqual(fakeNewVersion);
    } else {
      throw new Error("Modified version does not match");
    }
  });
});
