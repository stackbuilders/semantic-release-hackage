import { PrepareContext } from "semantic-release";
import { PluginConfig } from "./types/pluginConfig";
export declare const VERSION_PATTERN: RegExp;
export declare const readAndWriteNewCabal: (fullCabalPath: string, newVersion: string) => Promise<void>;
export declare const prepare: ({ cabalCmd, cabalFile, sdistOptions, versionPrefix, }: PluginConfig, { nextRelease, logger, cwd }: PrepareContext) => Promise<void>;
