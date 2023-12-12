import axios from "axios";
import { Context } from "semantic-release";

import { PluginConfig } from "./types/pluginConfig";
import { runExecCommand } from "./utils/exec";

const HACKAGE_PACKAGES_URL = "https://hackage.haskell.org/package";
const CANDIDATES = "candidates/";

const postReleaseCandidate = async (
  sdistPath: string,
  packageName: string,
  hackageToken?: string,
): Promise<number | undefined> => {
  const url = `${HACKAGE_PACKAGES_URL}/${packageName}/${CANDIDATES}`;
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
    throw new Error(`You do not have access to POST a file to ${url}, ${String(e)}`);
  }
};

export const publish = async ({ packageName }: PluginConfig, { logger }: Context): Promise<void> => {
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