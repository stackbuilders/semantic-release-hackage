import { expect } from "@assertive-ts/core";

import { readAndWriteNewCabal } from "../../src/prepare";

import { readFile, writeFile } from "fs/promises";

const fakeCabalPath = "./test/fixtures/test-1-package.cabal";
const fakeNewVersion = "0.0.7";
const cabalContent = "name: test-1-package\nversion: 0.0.1";

describe("readAndWriteNewCabal", () => {
  afterEach(async () => {
    await writeFile(fakeCabalPath, cabalContent, "utf8");
  });

  it("updates the version in the cabal file fixture", async () => {
    await readAndWriteNewCabal(fakeCabalPath, fakeNewVersion);

    const modifiedContents = await readFile(fakeCabalPath, "utf8");

    expect(modifiedContents).toBeEqual("name: test-1-package\nversion: 0.0.7");
  });
});
