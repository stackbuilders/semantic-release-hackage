import { expect } from "@assertive-ts/core";

import { getHaskellVersion } from "../../src/utils/version";

describe("getHaskellVersion", () => {
  it("returns with given prefix", () => {
    const version = getHaskellVersion({ version: "1.0.0" }, "0.", false);

    expect(version).toBeEqual("0.1.0.0");
  });

  it("strips things if told", () => {
    const version = getHaskellVersion(
      { version: "1.0.0-rc-foo.1" },
      "0.",
      true,
    );

    expect(version).toBeEqual("0.1.0.0");
  });

  it("doesn't strips things if told", () => {
    const version = getHaskellVersion(
      { version: "1.0.0-rc-foo.1" },
      "0.",
      false,
    );

    expect(version).toBeEqual("0.1.0.0-rc-foo.1");
  });

  it("doesn't strips things that don't parse", () => {
    const version = getHaskellVersion({ version: "1.2-rc-foo.1" }, "0.", true);

    expect(version).toBeEqual("0.1.2-rc-foo.1");
  });
});
