export interface PluginConfig {
    cabalCmd?: string;
    cabalFile?: string;
    packageName: string;
    publishDocumentation?: boolean;
    sdistOptions?: string;
    versionPrefix?: string;
}
