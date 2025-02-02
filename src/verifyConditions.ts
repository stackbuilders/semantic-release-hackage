import { BaseContext } from "semantic-release";

import { PluginConfig } from "./types/pluginConfig";

export const verifyConditions = (
  _pluginConfig: PluginConfig,
  { logger }: BaseContext,
): void => {
  const { HACKAGE_TOKEN } = process.env;

  if (!HACKAGE_TOKEN) {
    throw new Error("HACKAGE_TOKEN must be set in the environment");
  }

  logger.success("Verify conditions done!");
};
