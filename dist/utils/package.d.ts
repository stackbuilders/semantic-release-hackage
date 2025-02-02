export declare class PackageYaml {
    private readonly path;
    private readonly data;
    constructor(path?: string);
    getName(): string;
    getVersion(): string;
    setVersion(version: string): PackageYaml;
    write(path?: string): PackageYaml;
    private read;
}
