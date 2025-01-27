import { PublishContext } from "semantic-release";

import { PluginConfig } from "./types/pluginConfig";
import { postPackage } from "./utils/hackage";

import fs from "fs";

const VERSION_SUFFIX = /^([0-9]+\.[0-9]+\.[0-9]+).*$/;

export const publish = async (
  { packageName, versionPrefix, stripSuffix }: PluginConfig,
  { branch, logger, nextRelease, cwd }: PublishContext,
): Promise<void> => {
  const realCwd = cwd ?? process.cwd();
  const { version: rawVersion } = nextRelease;
  const version = stripSuffix
    ? rawVersion.replace(VERSION_SUFFIX, "$1") // drop suffix
    : rawVersion;
  const fullVersion = `${versionPrefix}${version}`;
  const sdistPath = `${packageName}-${fullVersion}.tar.gz`;
  const fullSdistPath = `${realCwd}/dist-newstyle/sdist/${sdistPath}`;

  logger.log("Current working directory: ", realCwd);
  logger.log("Full version: ", fullVersion);
  logger.log("Full sdist path: ", fullSdistPath);

  const exists = fs.existsSync(fullSdistPath);

  if (!exists) {
    throw new Error(`${fullSdistPath} does not exist`);
  }

  logger.log(
    "Publishing %s to hackage",
    branch.prerelease ? "release candidate" : "release",
  );

  await postPackage(
    fullSdistPath,
    process.env.HACKAGE_TOKEN,
    branch.prerelease,
  );

  logger.log(
    "Published hackage release: https://hackage.haskell.org/package/%s-%s%s",
    packageName,
    fullVersion,
    branch.prerelease ? "/candidate" : "",
  );

  logger.success("Publish done!");
};
