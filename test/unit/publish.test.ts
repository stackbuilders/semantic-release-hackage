import { expect } from "@assertive-ts/core";
import axios from "axios";
import sinon from "sinon";

import { HACKAGE_CANDIDATES_URL, postReleaseCandidate } from "../../src/publish";

const sdistPath = "sdist/path";
const hackageToken = "my-fake-token";

describe("postReleaseCandidate", () => {
  it("returns the status code when request is successful", async () => {
    const axiosPostStub = sinon.stub(axios, "post").resolves({ status: 200 });

    const statusCode = await postReleaseCandidate(sdistPath, hackageToken);

    expect(statusCode).toBeEqual(200);
    expect(axiosPostStub.calledOnce).toBeTruthy();
    expect(axiosPostStub.firstCall.args[0]).toBeEqual(HACKAGE_CANDIDATES_URL);
  });

  it("throws an error on unsuccessful request", async () => {
    const errorMsg = "Error message from server";
    const axiosPostStub = sinon.stub(axios, "post").rejects({ message: errorMsg });

    const request = postReleaseCandidate(sdistPath, hackageToken);

    await expect(request).toBeRejected();
    expect(axiosPostStub.calledOnce).toBeTruthy();
  });
});
