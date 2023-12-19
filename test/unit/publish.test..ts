import { expect } from "@stackbuilders/assertive-ts";
import axios from "axios";
import sinon from "sinon";

import { CANDIDATES, HACKAGE_PACKAGES_URL, postReleaseCandidate } from "../../src/publish";

const sdistPath = "sdist/path";
const packageName = "my-hackage-package";
const hackageToken = "my-fake-token";

describe("postReleaseCandidate", () => {
  it("returns the status code when request is successful", async () => {
    const axiosPostStub = sinon.stub(axios, "post").resolves({ status: 200 });

    const statusCode = await postReleaseCandidate(sdistPath, packageName, hackageToken);

    expect(statusCode).toBeEqual(200);
    expect(axiosPostStub.calledOnce).toBeTruthy();
    expect(axiosPostStub.firstCall.args[0]).toBeEqual(`${HACKAGE_PACKAGES_URL}/${packageName}/${CANDIDATES}`);
  });

  it("throws an error on unsuccessful request", async () => {
    const errorMsg = "Error message from server";
    const axiosPostStub = sinon.stub(axios, "post").rejects({ message: errorMsg });

    const request = postReleaseCandidate(sdistPath, packageName, hackageToken);

    await expect(request).toBeRejectedWith(
      new Error(
        `You do not have access to POST a file to ${HACKAGE_PACKAGES_URL}/${packageName}/${CANDIDATES}, ${errorMsg}`,
      ),
    );
    expect(axiosPostStub.calledOnce).toBeTruthy();
  });
});
