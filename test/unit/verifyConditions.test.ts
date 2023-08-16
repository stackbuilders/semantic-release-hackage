import { expect } from "@stackbuilders/assertive-ts";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { HACKAGE_PACKAGE_URL } from "../../src/utils/constants";
import { validateToken } from "../../src/verifyConditions";

import assert from "assert";

const mock = new MockAdapter(axios);

describe("validateToken", () => {
  it("returns the status when the token is valid", async () => {
    const packageName = "package";
    const cabalFileURL = "package.cabal";
    const token = "valid-token";
    const hackageCabalFileURL = `${HACKAGE_PACKAGE_URL}/${packageName}/${cabalFileURL}`;

    mock.onPut(hackageCabalFileURL).reply(200);

    try {
      const response = await validateToken(packageName, cabalFileURL, token);
      expect(response).toBeEqual(200);
    } catch (e: unknown) {
      const error = e as Error;
      assert.fail(`boom! ${error.message}`);
    }
  });

  it("throws an error when the token is invalid", async () => {
    const packageName = "package";
    const cabalFileURL = "package.cabal";
    const token = "invalid-token";
    const hackageCabalFileURL = `${HACKAGE_PACKAGE_URL}/${packageName}/${cabalFileURL}`;
    const expectedError =
    `You do not have access to PUT a file to ${hackageCabalFileURL}, Request failed with status code 401`;

    mock.onPut(hackageCabalFileURL).reply(401);

    try {
      await validateToken(packageName, cabalFileURL, token);
    } catch (e: unknown) {
      const error = e as Error;
      expect(error.message).toBeEqual(expectedError);
    }
  });
});
