import { PublishContext } from "semantic-release";

import { PluginConfig } from "./types/pluginConfig";
import { postPackage } from "./utils/hackage";
import { PackageYaml } from "./utils/package";
import { getHaskellVersion } from "./utils/version";

import fs from "fs";

export const publish = async (
  { stripSuffix = false, workingDirectory, versionPrefix = "" }: PluginConfig,
  { branch, logger, nextRelease }: PublishContext,
): Promise<void> => {
  if (workingDirectory) {
    logger.log("Changing directory to %s", workingDirectory);
    process.chdir(workingDirectory);
  }

  const packageYaml = new PackageYaml();
  const packageName = packageYaml.getName();
  const packageVersion = getHaskellVersion(
    nextRelease,
    versionPrefix,
    stripSuffix,
  );

  const sdist = `${packageName}-${packageVersion}.tar.gz`;
  const exists = fs.existsSync(sdist);

  if (!exists) {
    throw new Error(`${sdist} does not exist`);
  }

  logger.log(
    "Publishing %s to hackage%s",
    sdist,
    branch.prerelease ? " as release candidate" : "",
  );

  await postPackage(sdist, process.env.HACKAGE_TOKEN, branch.prerelease);

  logger.log(
    "Published hackage release: https://hackage.haskell.org/package/%s-%s%s",
    packageName,
    packageVersion,
    branch.prerelease ? "/candidate" : "",
  );

  logger.success("Publish done!");
};
