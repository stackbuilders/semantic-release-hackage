const VERSION_SUFFIX = /^([0-9]+\.[0-9]+\.[0-9]+).*$/;

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
