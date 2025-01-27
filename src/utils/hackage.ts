import axios from "axios";

import fs from "fs";

const HACKAGE_PACKAGES_URL = "https://hackage.haskell.org/packages";

export const postPackage = async (
  sdistPath: string,
  hackageToken?: string,
  isPrerelease?: string | boolean | undefined,
): Promise<number | undefined> => {
  const url = isPrerelease
    ? `${HACKAGE_PACKAGES_URL}/candidates`
    : HACKAGE_PACKAGES_URL;

  try {
    const headers = {
      Accept: "text/plain",
      Authorization: `X-ApiKey ${hackageToken}`,
      "Content-Type": "multipart/form-data",
    };

    const req = await axios.post(
      url,
      { package: fs.createReadStream(sdistPath) },
      { headers },
    );

    if (req.status !== 200) {
      throw new Error(`${req.status}: ${req.data}`); // catch will re-format
    }

    return req.status;
  } catch (e: unknown) {
    throw e instanceof Error ? new Error(`POST ${url} error: ${e.message}`) : e;
  }
};
