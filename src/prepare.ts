import { execa } from "execa";
import { Context } from "semantic-release";

import { PluginConfig } from "./types/pluginConfig";

import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";

const runSDistCommand = async (): Promise<void> => {
  try {
    await execa("cabal", ["sdist"]);
  } catch (err) {
    throw Error("failed to run cabal sdist command");
  }
};

const readAndWriteNewCabal = async (fullCabalPath: string, newVersion: string): Promise<void> => {
  const pattern = /^version:\s+\S+/m;
  const versionContents = await readFile(fullCabalPath, "utf8");
  const newContents = versionContents.replace(pattern, `version: ${newVersion}`);
  await writeFile(fullCabalPath, newContents, "utf8");
};

export const prepare = async (
  { packageName, cabalFile }: PluginConfig,
  { nextRelease, logger }: Context,
): Promise<void> => {
  const cabalFileName = cabalFile ?? `${packageName.toLowerCase()}.cabal`;
  const version = nextRelease?.version;

  logger.log("Check new version");
  if (!version) {
    throw new Error("Could not determine the version from semantic release");
  }

  const fullCabalPath = resolve("./", cabalFileName);
  logger.log("Reading .cabal file");
  await readAndWriteNewCabal(fullCabalPath, version);
  logger.log("Writing new version %s to `%s`", version, fullCabalPath);

  logger.log("Running cabal sdist command");
  await runSDistCommand();

  logger.log("Prepare done!");
};
