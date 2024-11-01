import { PrepareContext } from "semantic-release";

import { PluginConfig } from "./types/pluginConfig";
import { runExecCommand } from "./utils/exec";
import { lookupCabalFilename } from "./utils/prepare";

import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";

export const VERSION_PATTERN = /^\s*version:\s+(\S+)/m;

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
  const fullCabalPath = resolve(realCwd, cabalFileName);
  const fullVersion = `${versionPrefix}${version}`;
  logger.log("Reading .cabal file: ", fullCabalPath);
  await readAndWriteNewCabal(fullCabalPath, fullVersion);
  logger.log("Writing new version %s to `%s`", version, fullCabalPath);

  logger.log("Running cabal sdist command");
  const { warn, output } = await runExecCommand("cabal sdist");

  if (warn) {
    logger.warn(warn);
  }

  logger.log(output);
  logger.success("Prepare done!");
};
