export interface HasVersion {
    version: string;
}
export declare function getHaskellVersion(nextRelease: HasVersion, versionPrefix: string, stripSuffix: boolean): string;
