const VERSION_PREFIX = /^(?<prefix>.*?)([0-9]+\.[0-9]+\.[0-9]+)$/;
const VERSION_SUFFIX = /^([0-9]+\.[0-9]+\.[0-9]+)(?<suffix>.*)$/;

export interface HasVersion {
  version: string;
}

export function getHaskellVersion(
  nextRelease: HasVersion,
  versionPrefix: string,
  stripSuffix: boolean,
): string {
  const { version } = nextRelease;
  const semanticVersion = stripSuffix
    ? version.replace(VERSION_SUFFIX, "$1")
    : version;

  return `${versionPrefix}${semanticVersion}`;
}

export function getVersionPrefix(x: HasVersion): string | null {
  const md = x.version.match(VERSION_PREFIX);
  return md?.groups?.prefix ?? null;
}
