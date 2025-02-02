import YAML from "yaml";

import { HasVersion, getVersionPrefix } from "./version";

import fs from "fs";

interface HasName {
  name: string;
}

type PackageYamlData = object & HasName & HasVersion;

export class PackageYaml {
  private readonly path: string;
  private readonly data: PackageYamlData;

  public constructor(path?: string) {
    this.path = path ?? "package.yaml";
    this.data = this.read();
  }

  public getName(): string {
    return this.data.name;
  }

  public getVersion(): string {
    return this.data.version;
  }

  public setVersion(version: string): PackageYaml {
    this.data.version = version;
    return this;
  }

  public inferVersionPrefix(): string | null {
    return getVersionPrefix(this.data);
  }

  public write(path?: string): PackageYaml {
    fs.writeFileSync(path ?? this.path, YAML.stringify(this.data));
    return this;
  }

  private read(): PackageYamlData {
    const exists = fs.existsSync(this.path);

    if (!exists) {
      throw new Error(`package.yaml does not exist in ${process.cwd()}`);
    }

    const yaml = fs.readFileSync(this.path, "utf8");
    return YAML.parse(yaml) as PackageYamlData;
  }
}
