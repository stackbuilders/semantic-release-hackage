import { PrepareContext } from "semantic-release";

import { PluginConfig } from "./types/pluginConfig";
import { runExecCommand } from "./utils/exec";
import { lookupCabalFilename } from "./utils/prepare";

import fs from "fs";
import { resolve } from "path";

const VERSION_PATTERN = /^\s*version:\s+(\S+)/m;
const VERSION_SUFFIX = /^([0-9]+\.[0-9]+\.[0-9]+).*$/;
const PACKAGE_YAML = "package.yaml";

function readAndWriteNewVersion(fullPath: string, newVersion: string): void {
  const versionContents = fs.readFileSync(fullPath, "utf8");
  const newContents = versionContents.replace(
    VERSION_PATTERN,
    `version: ${newVersion}`,
  );
  fs.writeFileSync(fullPath, newContents, "utf8");
}

export const prepare = async (
  {
    cabalCmd = "cabal",
    cabalFile,
    sdistOptions = "",
    stripSuffix = false,
    versionPrefix = "",
  }: PluginConfig,
  { nextRelease, logger, cwd }: PrepareContext,
): Promise<void> => {
  const realCwd = cwd ?? process.cwd();
  const cabalFileName = cabalFile ?? lookupCabalFilename(realCwd, logger);
  const { version: rawVersion } = nextRelease;
  const version = stripSuffix
    ? rawVersion.replace(VERSION_SUFFIX, "$1")
    : rawVersion;
  const fullPackageYaml = resolve(realCwd, PACKAGE_YAML);
  const fullCabalPath = resolve(realCwd, cabalFileName);
  const fullVersion = `${versionPrefix}${version}`;
  const sdistCmd = `${cabalCmd} sdist ${sdistOptions}`;

  if (fs.existsSync(PACKAGE_YAML)) {
    // Update package.yaml if it exists
    logger.log("Writing new version %s to `%s`", fullVersion, fullPackageYaml);
    readAndWriteNewVersion(fullPackageYaml, fullVersion);
  }

  // Always update *.cabal
  logger.log("Writing new version %s to `%s`", fullVersion, fullCabalPath);
  readAndWriteNewVersion(fullCabalPath, fullVersion);

  logger.log(`Running ${sdistCmd}`);
  const { warn, output } = await runExecCommand(sdistCmd);

  if (warn) {
    logger.warn(warn);
  }

  logger.log(output);
  logger.success("Prepare done!");
};
