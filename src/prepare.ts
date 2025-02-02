import { PrepareContext } from "semantic-release";

import { PluginConfig } from "./types/pluginConfig";
import { runExecCommand } from "./utils/exec";
import { PackageYaml } from "./utils/package";
import { getHaskellVersion } from "./utils/version";

export const prepare = async (
  {
    stripSuffix = false,
    sdistOptions = "",
    versionPrefix = "",
    workingDirectory,
  }: PluginConfig,
  { nextRelease, logger }: PrepareContext,
): Promise<void> => {
  if (workingDirectory) {
    logger.log("Changing directory to %s", workingDirectory);
    process.chdir(workingDirectory);
  }

  const version = getHaskellVersion(nextRelease, versionPrefix, stripSuffix);
  const packageYaml = new PackageYaml();
  const sdistCmd = `stack sdist ${sdistOptions} --tar-dir .`;

  logger.log("Setting package version to %s", version);
  packageYaml.setVersion(version);
  packageYaml.write();

  logger.log("Running %s", sdistCmd);
  const { warn, output } = await runExecCommand(sdistCmd);

  if (warn) {
    logger.warn(warn);
  }

  logger.log(output);
  logger.success("Prepare done!");
};
