import axios from "axios";
import { PublishContext } from "semantic-release";

import { PluginConfig } from "./types/pluginConfig";
import { runExecCommand } from "./utils/exec";

import fs from "fs";

export const HACKAGE_CANDIDATES_URL = "https://hackage.haskell.org/packages/candidates";

export const postReleaseCandidate = async (sdistPath: string, hackageToken?: string): Promise<number | undefined> => {
  try {
    const headers = {
      Accept: "text/plain",
      Authorization: `X-ApiKey ${hackageToken}`,
      "Content-Type": "multipart/form-data",
    };

    const req = await axios.post(HACKAGE_CANDIDATES_URL, { package: fs.createReadStream(sdistPath) }, { headers });

    return req.status;
  } catch (e: unknown) {
    throw e instanceof Error
      ? new Error(`You do not have access to POST a file to ${HACKAGE_CANDIDATES_URL} , ${e.message}`)
      : e;
  }
};

export const publishRCDocumentation = async (
  docsSdistPath: string,
  url: string,
  hackageToken?: string,
): Promise<number | undefined> => {
  try {
    const headers = {
      Authorization: `X-ApiKey ${hackageToken}`,
      "Content-Encoding": "gzip",
      "Content-Type": "application/x-tar",
    };

    const req = await axios.put(url, fs.createReadStream(docsSdistPath), { headers });

    return req.status;
  } catch (e: unknown) {
    throw e instanceof Error
      ? new Error(`You do not have access to POST a documentation file to ${url} , ${e.message}`)
      : e;
  }
};

export const publish = async (
  { packageName, versionPrefix, publishDocumentation }: PluginConfig,
  { logger, nextRelease, cwd }: PublishContext,
): Promise<void> => {
  const realCwd = cwd ?? process.cwd();
  logger.log("Current working directory: ", realCwd);
  const { version } = nextRelease;
  logger.log("Getting sdist path with version: ", version);
  const filename = `${packageName}-${versionPrefix}${version}.tar.gz`;
  const sdistPath = `${realCwd}/dist-newstyle/sdist/${filename}`;
  logger.log("Uploading sdist: ", sdistPath);

  logger.log("Post release candidate in hackage");
  const status = await postReleaseCandidate(sdistPath, process.env.HACKAGE_TOKEN);

  if (status !== 200) {
    throw new Error(`Cannot post release candidate now, status: ${status}`);
  }

  logger.log("Checking publishDocumentation plugin configuration: ", publishDocumentation);
  if (publishDocumentation) {
    logger.log("Generating documentation");
    const { error, output } = await runExecCommand("cabal haddock --haddock-for-hackage --enable-documentation");

    if (error) {
      logger.error(error);
      throw new Error(error);
    }
    logger.log(output);
    logger.log("Publishing documentation");
    const docsFilename = `${packageName}-${versionPrefix}${version}-docs.tar.gz`;
    const docsSdistPath = `${realCwd}/dist-newstyle/${docsFilename}`;
    const docsUrl = `https://hackage.haskell.org/package/${packageName}-${versionPrefix}${version}/candidate/docs`;

    const docStatus = await publishRCDocumentation(docsSdistPath, docsUrl, process.env.HACKAGE_TOKEN);

    if (docStatus !== 200) {
      throw new Error(`Cannot post release candidate documentation now, status: ${status}`);
    }
  }

  logger.success("Publish done!");
};
