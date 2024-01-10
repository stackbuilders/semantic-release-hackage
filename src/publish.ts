import axios from "axios";
import { BaseContext } from "semantic-release";

import { PluginConfig } from "./types/pluginConfig";
import { runExecCommand } from "./utils/exec";

export const HACKAGE_PACKAGES_URL = "https://hackage.haskell.org/package";
export const CANDIDATES_PATH = "candidates/";

export const postReleaseCandidate = async (
  sdistPath: string,
  packageName: string,
  hackageToken?: string,
): Promise<number | undefined> => {
  const url = `${HACKAGE_PACKAGES_URL}/${packageName}/${CANDIDATES_PATH}`;
  try {
    const headers = {
      Accept: "text/plain",
      Authorization: `X-ApiKey ${hackageToken}`,
    };

    const formData = new FormData();
    formData.append("package", sdistPath);

    const req = await axios.post(url, formData, { headers });

    return req.status;
  } catch (e: unknown) {
    throw e instanceof Error ? new Error(`You do not have access to POST a file to ${url}, ${e.message}`) : e;
  }
};

export const publish = async ({ packageName }: PluginConfig, { logger }: BaseContext): Promise<void> => {
  logger.log("Getting sdist path");
  const { error, output } = await runExecCommand(`ls dist-newstyle/sdist/${packageName}-*.tar.gz`);

  if (error) {
    logger.error(error);
    throw new Error(error);
  }

  logger.log("Post release candidate in hackage");
  const status = await postReleaseCandidate(output.trim(), packageName, process.env.HACKAGE_TOKEN);

  if (status !== 200) {
    throw new Error(`Cannot post release candidate now, status: ${status}`);
  }

  logger.log("Publish done!");
};
