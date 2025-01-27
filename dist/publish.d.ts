import { PublishContext } from "semantic-release";
import { PluginConfig } from "./types/pluginConfig";
export declare const HACKAGE_PACKAGES_URL = "https://hackage.haskell.org/packages";
export declare const HACKAGE_CANDIDATES_URL = "https://hackage.haskell.org/packages/candidates";
export declare const postReleaseCandidate: (sdistPath: string, hackageToken?: string, asCandidate?: boolean) => Promise<number | undefined>;
export declare const publishRCDocumentation: (docsSdistPath: string, url: string, hackageToken?: string) => Promise<number | undefined>;
type Release = {
    name: string;
    url: string;
};
export declare const publish: ({ packageName, versionPrefix, publishDocumentation }: PluginConfig, { logger, nextRelease, cwd }: PublishContext) => Promise<Release>;
export {};
