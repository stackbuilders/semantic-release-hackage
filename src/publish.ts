import axios from "axios";
import fs from "fs";
import { PublishContext } from "semantic-release";

import { PluginConfig } from "./types/pluginConfig";

export const HACKAGE_CANDIDATES_URL = "https://hackage.haskell.org/packages/candidates";

export const postReleaseCandidate = async (
  sdistPath: string,
  filename: string,
  hackageToken?: string,
): Promise<number | undefined> => {
  try {
    const headers = {
      Accept: "text/plain",
      "Content-Type": "multipart/form-data",
      Authorization: `X-ApiKey ${hackageToken}`,
    };

    const { buffer } = fs.readFileSync(sdistPath);
    const sdist = new File([buffer], filename);
    const formData = new FormData();
    formData.append("package", sdist);

    const req = await axios.post(HACKAGE_CANDIDATES_URL, formData, { headers });

    return req.status;
  } catch (e: unknown) {
    throw e instanceof Error
      ? new Error(`You do not have access to POST a file to ${HACKAGE_CANDIDATES_URL} , ${e.message}`)
      : e;
  }
};

export const publish = async (
  { packageName, versionPrefix }: PluginConfig,
  { logger, nextRelease, cwd }: PublishContext
): Promise<void> => {
  const realCwd = cwd ?? process.cwd();
  logger.log("Current working directory: ", realCwd);
  const { version } = nextRelease;
  logger.log("Getting sdist path with version: ", version);
  const filename = `${packageName}-${versionPrefix}${version}.tar.gz`;
  const sdistPath = `${realCwd}/dist-newstyle/sdist/${filename}`;
  logger.log("Uploading sdist: ", sdistPath);

  logger.log("Post release candidate in hackage");
  const status = await postReleaseCandidate(sdistPath, filename, process.env.HACKAGE_TOKEN);

  if (status !== 200) {
    throw new Error(`Cannot post release candidate now, status: ${status}`);
  }

  logger.success("Publish done!");
};
