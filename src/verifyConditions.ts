import { Context } from "semantic-release";


import type PluginConfig from "./types/pluginConfig";

const configMessage = "Check the README.md for config info.";

const thrownEnvVarError = (variable: string): Error => {
  throw new Error(`Environment variable not found: ${variable}. ${configMessage}`);
};

const verifyConditions = async (pluginConfig: PluginConfig, context: Context): void => {
  const { HACKAGE_TOKEN } = process.env;

  if (!HACKAGE_TOKEN) {
    thrownEnvVarError("HACKAGE_TOKEN");
  }
};

export default verifyConditions;
