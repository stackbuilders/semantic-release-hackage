import { expect } from "@assertive-ts/core";
import axios from "axios";
import sinon from "sinon";

import {
  HACKAGE_CANDIDATES_URL,
  postReleaseCandidate,
  publishRCDocumentation,
} from "../../src/publish";

const filename = "my-package-1.0.0.tar.gz";
const docsFilename = "my-package-1.0.0-docs.tar.gz";
const docsUrl =
  "https://hackage.haskell.org/package/my-package-1.0.0/candidate/docs";
const sdistPath = `${process.cwd()}/test/fixtures/${filename}`;
const docsSdistPath = `${process.cwd()}/test/fixtures/${docsFilename}`;
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
    const axiosPostStub = sinon
      .stub(axios, "post")
      .rejects({ message: errorMsg });

    const request = postReleaseCandidate(sdistPath, hackageToken);

    await expect(request).toBeRejected();
    expect(axiosPostStub.calledOnce).toBeTruthy();
  });
});

describe("publishRCDocumentation", () => {
  it("returns the status code when request is successful", async () => {
    const axiosPutStub = sinon.stub(axios, "put").resolves({ status: 200 });

    const statusCode = await publishRCDocumentation(
      docsSdistPath,
      docsUrl,
      hackageToken,
    );

    expect(statusCode).toBeEqual(200);
    expect(axiosPutStub.calledOnce).toBeTruthy();
    expect(axiosPutStub.firstCall.args[0]).toBeEqual(docsUrl);
  });

  it("throws an error on unsuccessful request", async () => {
    const errorMsg = "Error message from server";
    const axiosPutStub = sinon
      .stub(axios, "put")
      .rejects({ message: errorMsg });

    const request = publishRCDocumentation(
      docsSdistPath,
      docsUrl,
      hackageToken,
    );

    await expect(request).toBeRejected();
    expect(axiosPutStub.calledOnce).toBeTruthy();
  });
});
