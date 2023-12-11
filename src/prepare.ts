import { Context } from "semantic-release";

import { PluginConfig } from "./types/pluginConfig";
import { runExecCommand } from "./utils/exec";
import { getCabalFilename } from "./utils/prepare";

import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";

export const versionPattern = /version:\s+(\S+)/;

export const readAndWriteNewCabal = async (fullCabalPath: string, newVersion: string): Promise<void> => {
  const versionContents = await readFile(fullCabalPath, "utf8");
  const newContents = versionContents.replace(versionPattern, `version: ${newVersion}`);
  await writeFile(fullCabalPath, newContents, "utf8");
};

export const prepare = async ({ cabalFile }: PluginConfig, { nextRelease, logger }: Context): Promise<void> => {
  const cabalFileName = cabalFile ?? getCabalFilename();
  const { version } = nextRelease ?? {};

  logger.log("Check new version");
  if (!version) {
    throw new Error("Could not determine the version from semantic release. Check the plugin configuration");
  }

  logger.log("Check cabal file");
  if (!cabalFileName) {
    throw new Error("Could not determine the cabal filename. Check the plugin configuration");
  }

  const fullCabalPath = resolve("./", cabalFileName);
  logger.log("Reading .cabal file");
  await readAndWriteNewCabal(fullCabalPath, version);
  logger.log("Writing new version %s to `%s`", version, fullCabalPath);

  logger.log("Running cabal sdist command");
  const { error, output } = await runExecCommand("cabal sdist");

  if (error) {
    logger.error(error);
    throw new Error(error);
  }

  logger.log(output);
  logger.log("Prepare done!");
};
