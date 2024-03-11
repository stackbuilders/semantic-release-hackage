import { BaseContext } from "semantic-release";

import { PluginConfig } from "./types/pluginConfig";
import { EnvVarError } from "./utils/EnvVarError";

export const verifyConditions = (_pluginConfig: PluginConfig, { logger }: BaseContext): void => {
  const { HACKAGE_TOKEN } = process.env;

  logger.log("Checking environment variables");
  if (!HACKAGE_TOKEN) {
    throw new EnvVarError("HACKAGE_TOKEN");
  }

  logger.success("Verify conditions done!");
};
