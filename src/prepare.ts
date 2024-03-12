import { PrepareContext } from "semantic-release";

import { PluginConfig } from "./types/pluginConfig";
import { runExecCommand } from "./utils/exec";
import { lookupCabalFilename } from "./utils/prepare";

import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";

export const VERSION_PATTERN = /version:\s+(\S+)/;

export const readAndWriteNewCabal = async (fullCabalPath: string, newVersion: string): Promise<void> => {
  const versionContents = await readFile(fullCabalPath, "utf8");
  const newContents = versionContents.replace(VERSION_PATTERN, `version: ${newVersion}`);
  await writeFile(fullCabalPath, newContents, "utf8");
};

export const prepare = async (
  { cabalFile, versionPrefix = "" }: PluginConfig,
  { nextRelease, logger, cwd }: PrepareContext,
): Promise<void> => {
  const realCwd = cwd ?? process.cwd();
  logger.log("Current working directory: ", realCwd);
  const cabalFileName = cabalFile ?? lookupCabalFilename(realCwd, logger);
  const { version } = nextRelease;
  logger.log("New version: ", version);
  const fullCabalPath = resolve(realCwd, cabalFileName);
  const fullVersion = `${versionPrefix}${version}`;
  logger.log("Reading .cabal file", fullCabalPath);
  await readAndWriteNewCabal(fullCabalPath, fullVersion);
  logger.log("Writing new version %s to `%s`", version, fullCabalPath);

  logger.log("Running cabal sdist command");
  const { error, output } = await runExecCommand("cabal sdist");

  if (error) {
    logger.error(error);
    throw new Error(error);
  }

  logger.log(output);
  logger.success("Prepare done!");
};
