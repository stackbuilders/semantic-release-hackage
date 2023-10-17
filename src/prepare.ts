import { Context } from "semantic-release";

import { PluginConfig } from "./types/pluginConfig";
import { runExecCommand } from "./utils/exec";
import { getCabalFilename } from "./utils/prepare";

import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";

export const readAndWriteNewCabal = async (fullCabalPath: string, newVersion: string): Promise<void> => {
  const pattern = /^version:\s+\S+/m;
  const versionContents = await readFile(fullCabalPath, "utf8");
  const newContents = versionContents.replace(pattern, `version: ${newVersion}`);
  await writeFile(fullCabalPath, newContents, "utf8");
};

export const prepare = async ({ cabalFile }: PluginConfig, { nextRelease, logger }: Context): Promise<void> => {
  const cabalFileName = cabalFile ?? getCabalFilename();
  const version = nextRelease?.version;

  logger.log("Check new version");
  if (!version || !cabalFileName) {
    throw new Error(
      "Could not determine the version from semantic release and/or the cabal filename. Check the plugin configuration",
    );
  }

  const fullCabalPath = resolve("./", cabalFileName);
  logger.log("Reading .cabal file");
  await readAndWriteNewCabal(fullCabalPath, version);
  logger.log("Writing new version %s to `%s`", version, fullCabalPath);

  logger.log("Running cabal sdist command");
  const { error, output } = await runExecCommand("cabal sdist");

  if (error === "") {
    logger.log(output);
  } else {
    logger.error(error);
    return;
  }

  logger.log("Prepare done!");
};
