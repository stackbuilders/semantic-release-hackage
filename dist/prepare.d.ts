import { PrepareContext } from "semantic-release";
import { PluginConfig } from "./types/pluginConfig";
export declare const prepare: ({ stripSuffix, sdistOptions, versionPrefix, workingDirectory, }: PluginConfig, { nextRelease, logger }: PrepareContext) => Promise<void>;
