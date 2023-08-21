import { Context } from "semantic-release";

import { PluginConfig } from "./types/pluginConfig";
import { EnvVarError } from "./utils/EnvVarError";

export const verifyConditions = (_pluginConfig: PluginConfig, context: Context): void => {
  const { HACKAGE_TOKEN } = process.env;

  context.logger.log("Check environment variables");
  if (!HACKAGE_TOKEN) {
    throw new EnvVarError("HACKAGE_TOKEN");
  }
};
