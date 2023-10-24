import axios from "axios";
import { Context } from "semantic-release";

import { PluginConfig } from "./types/pluginConfig";
import { runExecCommand } from "./utils/exec";

const postReleaseCandidate = async (sdistPath: string, hackageToken?: string): Promise<number | undefined> => {
  const url = "https://hackage.haskell.org/packages/candidates";

  try {
    const headers = {
      Accept: "text/plain",
      Authorization: `X-ApiKey ${hackageToken}`,
    };

    const formData = new FormData();
    formData.append("package", sdistPath);

    const req = await axios.post(url, formData, { headers });

    return req.status;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(`You do not have access to POST a file to ${url}, ${e.message}`);
    }
    return;
  }
};

export const publish = async ({ packageName }: PluginConfig, { logger }: Context): Promise<void> => {
  const { HACKAGE_TOKEN } = process.env;

  logger.log("Getting sdist path");
  const { error, output } = await runExecCommand(`ls dist-newstyle/sdist/${packageName}-*.tar.gz`);

  if (error) {
    logger.error(error);
    throw new Error(error);
  }

  logger.log("Post release candidate in hackage");
  const status = await postReleaseCandidate(output.trim(), HACKAGE_TOKEN);

  if (status !== 200) {
    throw new Error(`Cannot post release candidate now, status: ${status}`);
  }

  logger.log("Publish done!");
};
