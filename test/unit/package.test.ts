import { expect } from "@assertive-ts/core";

import { PackageYaml } from "../../src/utils/package";

describe("PackageYaml", () => {
  it("reads an example file", () => {
    const packageYaml = new PackageYaml("test/fixtures/test-package.yaml");

    expect(packageYaml.getName()).toBeEqual("shellwords");
  });

  it("can be updated and rewritten", () => {
    const packageYamlPath = "test/fixtures/test-package.yaml";
    const packageYaml = new PackageYaml(packageYamlPath);
    const originalVersion = packageYaml.getVersion();
    const updatedVersion = "0.1.42.42";

    packageYaml.setVersion(updatedVersion);
    packageYaml.write();

    const packageYaml2 = new PackageYaml(packageYamlPath);

    expect(packageYaml2.getVersion()).toBeEqual(updatedVersion);

    // cleanup
    packageYaml2.setVersion(originalVersion);
    packageYaml2.write();
  });

  it("can infer a version prefix", () => {
    const packageYaml = new PackageYaml("test/fixtures/test-package.yaml");

    expect(packageYaml.inferVersionPrefix()).toBeEqual("0.");
  });
});
