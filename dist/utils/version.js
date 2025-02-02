"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHaskellVersion = void 0;
const VERSION_SUFFIX = /^([0-9]+\.[0-9]+\.[0-9]+).*$/;
function getHaskellVersion(nextRelease, versionPrefix, stripSuffix) {
    const { version } = nextRelease;
    const semanticVersion = stripSuffix
        ? version.replace(VERSION_SUFFIX, "$1")
        : version;
    return `${versionPrefix}${semanticVersion}`;
}
exports.getHaskellVersion = getHaskellVersion;
//# sourceMappingURL=version.js.map