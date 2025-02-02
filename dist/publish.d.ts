import { PublishContext } from "semantic-release";
import { PluginConfig } from "./types/pluginConfig";
export declare const publish: ({ stripSuffix, workingDirectory, versionPrefix }: PluginConfig, { branch, logger, nextRelease }: PublishContext) => Promise<void>;
