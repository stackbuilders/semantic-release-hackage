import got, { GotError } from "got";
import { Context } from "semantic-release";

import type PluginConfig from "./types/pluginConfig";

const configMessage = "Check the README.md for config info.";

const thrownEnvVarError = (variable: string): Error => {
  throw new Error(`Environment variable not found: ${variable}. ${configMessage}`);
};

const validateToken = async (hackageLibURL: string, cabalFilename: string, hackageToken: string): Promise<number> => {
  const hackageCabalFileURL = `${hackageLibURL}/${cabalFilename}`;
  try {
    const response = await got(hackageCabalFileURL, {
      headers: { Authorization: `X-ApiKey ${hackageToken}` },
      method: "PUT",
    });

    return response.statusCode;
  } catch (err: unknown) {
    const error = err as GotError;
    throw new Error(`You do not have access to PUT a file to ${hackageCabalFileURL}, ${error.message}`);
  }
};

const verifyConditions = async (pluginConfig: PluginConfig, { logger }: Context): Promise<void> => {
  const { HACKAGE_TOKEN } = process.env;

  logger.log("Check environment variables");
  if (!HACKAGE_TOKEN) {
    thrownEnvVarError("HACKAGE_TOKEN");
  }
};

export default verifyConditions;
