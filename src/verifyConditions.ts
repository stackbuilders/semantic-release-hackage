import axios, { AxiosError } from "axios";
import { Context } from "semantic-release";

import { PluginConfig } from "./types/pluginConfig";
import { EnvVarError } from "./utils/EnvVarError";
import { HACKAGE_PACKAGE_URL } from "./utils/constants";

export const validateToken = async (
  packageName: string,
  cabalFileURL: string,
  hackageToken: string,
): Promise<number> => {
  const hackageCabalFileURL = `${HACKAGE_PACKAGE_URL}/${packageName}/${cabalFileURL}`;
  try {
    const response = await axios(hackageCabalFileURL, {
      headers: { Authorization: `X-ApiKey ${hackageToken}` },
      method: "PUT",
    });

    return response.status;
  } catch (err: unknown) {
    const error = err as AxiosError;
    throw new Error(`You do not have access to PUT a file to ${hackageCabalFileURL}, ${error.message}`);
  }
};

export const verifyConditions = async (pluginConfig: PluginConfig, context: Context): Promise<void> => {
  const { HACKAGE_TOKEN } = process.env;
  const { packageName, cabalFile } = pluginConfig;
  const cabalFileURL = cabalFile ? `${cabalFile}.cabal` : `${packageName.toLowerCase()}.cabal`;

  context.logger.log("Check environment variables");
  if (!HACKAGE_TOKEN) {
    throw new EnvVarError("HACKAGE_TOKEN");
  }

  context.logger.log("Verify authentication with hackage");
  await validateToken(packageName, cabalFileURL, HACKAGE_TOKEN);
  context.logger.log("Token information for the specified package seem to be valid.");
};
