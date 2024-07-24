import { expect } from "@assertive-ts/core";

import { readAndWriteNewCabal, VERSION_PATTERN } from "../../src/prepare";

import { readFile, writeFile } from "fs/promises";

const fakeCabalPath = "./test/fixtures/test-1-package.cabal";
const fakeNewVersion = "0.0.7";
const cabalContent = "name: test-1-package\nversion: 0.0.1";
const fakeVersionCabalPath = "./test/fixtures/test-2-package.cabal";
const cabalVersionContent = "cabal-version: 1.12\nversion: 0.0.1";

describe("readAndWriteNewCabal", () => {
  context("when cabal file has name and version", () => {
    afterEach(async () => {
      await writeFile(fakeCabalPath, cabalContent, "utf8");
    });

    context("when version is semantic", () => {
      it("updates the version in the cabal file fixture", async () => {
        await readAndWriteNewCabal(fakeCabalPath, fakeNewVersion);

        const modifiedContents = await readFile(fakeCabalPath, "utf8");

        expect(modifiedContents).toBeEqual("name: test-1-package\nversion: 0.0.7");
      });
    });

    context("when version is not semantic", () => {
      it("updates the version in the cabal file fixture", async () => {
        const versionPrefix = "0.";
        await readAndWriteNewCabal(fakeCabalPath, versionPrefix + fakeNewVersion);

        const modifiedContents = await readFile(fakeCabalPath, "utf8");

        expect(modifiedContents).toBeEqual("name: test-1-package\nversion: 0.0.0.7");
      });
    });
  });

  context("when cabal file has cabal-version and version", () => {
    afterEach(async () => {
      await writeFile(fakeVersionCabalPath, cabalVersionContent, "utf8");
    });

    it("updates the right version in the cabal file fixture", async () => {
      await readAndWriteNewCabal(fakeVersionCabalPath, fakeNewVersion);

      const modifiedContents = await readFile(fakeVersionCabalPath, "utf8");

      expect(modifiedContents).toBeEqual("cabal-version: 1.12\nversion: 0.0.7");
    });

    it("updates the version in the cabal file fixture when version is not semantic", async () => {
      const versionPrefix = "0.";
      await readAndWriteNewCabal(fakeVersionCabalPath, versionPrefix + fakeNewVersion);

      const modifiedContents = await readFile(fakeVersionCabalPath, "utf8");

      expect(modifiedContents).toBeEqual("cabal-version: 1.12\nversion: 0.0.0.7");
    });
  });
});

describe("VERSION_PATTERN", () => {
  it("matches a valid version of strings", () => {
    const validStrings = ["version: 1.0.0", "   version: 2.3.4", "version: 3.0.0-alpha", "version: 4.2.0-beta.1"];

    validStrings.forEach(str => {
      const match = str.match(VERSION_PATTERN);
      expect(match).not.toBeNull();
      if (match && match[1]) {
        expect(match[1]).not.toBeUndefined();
      }
    });
  });

  it("does not match invalid version strings", () => {
    const invalidStrings = ["version 1.0.0", "ver: 2.3.4", "version:", "version:"];

    invalidStrings.forEach(str => {
      const match = str.match(VERSION_PATTERN);
      expect(match).toBeNull();
    });
  });

  it("matches version strings with extra spaces", () => {
    const validStrings = ["   version: 1.0.0", "\tversion: 2.3.4", " \t version: 3.0.0-alpha"];

    validStrings.forEach(str => {
      const match = str.match(VERSION_PATTERN);
      expect(match).not.toBeNull();
      if (match && match[1]) {
        expect(match[1]).not.toBeUndefined();
      }
    });
  });

  it("captures the correct version value", () => {
    const testCases = [
      { expected: "1.0.0", input: "version: 1.0.0" },
      { expected: "2.3.4", input: "  version: 2.3.4" },
    ];

    testCases.forEach(({ expected, input }) => {
      const match = input.match(VERSION_PATTERN);
      expect(match).not.toBeNull();
      if (match && match[1]) {
        expect(match[1]).toBeEqual(expected);
      }
    });
  });
});
