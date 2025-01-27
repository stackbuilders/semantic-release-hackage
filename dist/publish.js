"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publish = exports.publishRCDocumentation = exports.postReleaseCandidate = exports.HACKAGE_CANDIDATES_URL = exports.HACKAGE_PACKAGES_URL = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const exec_1 = require("./utils/exec");
const fs_1 = tslib_1.__importDefault(require("fs"));
exports.HACKAGE_PACKAGES_URL = "https://hackage.haskell.org/packages";
exports.HACKAGE_CANDIDATES_URL = "https://hackage.haskell.org/packages/candidates";
const V2_HADDOCK_COMMAND = "cabal v2-haddock --haddock-for-hackage --enable-documentation";
const postReleaseCandidate = (sdistPath, hackageToken, asCandidate) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const url = asCandidate ? exports.HACKAGE_CANDIDATES_URL : exports.HACKAGE_PACKAGES_URL;
    try {
        const headers = {
            Accept: "text/plain",
            Authorization: `X-ApiKey ${hackageToken}`,
            "Content-Type": "multipart/form-data",
        };
        const req = yield axios_1.default.post(url, { package: fs_1.default.createReadStream(sdistPath) }, { headers });
        return req.status;
    }
    catch (e) {
        throw e instanceof Error
            ? new Error(`You do not have access to POST a file to ${url} , ${e.message}`)
            : e;
    }
});
exports.postReleaseCandidate = postReleaseCandidate;
const publishRCDocumentation = (docsSdistPath, url, hackageToken) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const headers = {
            Authorization: `X-ApiKey ${hackageToken}`,
            "Content-Encoding": "gzip",
            "Content-Type": "application/x-tar",
        };
        const req = yield axios_1.default.put(url, fs_1.default.createReadStream(docsSdistPath), {
            headers,
        });
        return req.status;
    }
    catch (e) {
        throw e instanceof Error
            ? new Error(`You do not have access to POST a documentation file to ${url} , ${e.message}`)
            : e;
    }
});
exports.publishRCDocumentation = publishRCDocumentation;
const publish = ({ packageName, versionPrefix, publishDocumentation }, { logger, nextRelease, cwd }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const realCwd = cwd !== null && cwd !== void 0 ? cwd : process.cwd();
    logger.log("Current working directory: ", realCwd);
    const { version: rawVersion } = nextRelease;
    const isPrerelease = nextRelease.type === "prerelease";
    const version = isPrerelease
        ? rawVersion.replace(/^([0-9]+\.[0-9]+\.[0-9]+).*$/, "$1") // drop suffix
        : rawVersion;
    logger.log("Getting sdist path with version: ", version);
    const filename = `${packageName}-${versionPrefix}${version}.tar.gz`;
    const sdistPath = `${realCwd}/dist-newstyle/sdist/${filename}`;
    logger.log("Uploading sdist: ", sdistPath);
    logger.log("Post release candidate in hackage");
    const status = yield (0, exports.postReleaseCandidate)(sdistPath, process.env.HACKAGE_TOKEN, isPrerelease);
    if (status !== 200) {
        throw new Error(`Cannot post release candidate now, status: ${status}`);
    }
    logger.log("Checking publishDocumentation plugin configuration: ", publishDocumentation);
    if (publishDocumentation) {
        logger.log("Generating documentation");
        const { warn, output } = yield (0, exec_1.runExecCommand)(V2_HADDOCK_COMMAND);
        if (warn) {
            logger.warn(warn);
        }
        logger.log(output);
        logger.log("Publishing documentation");
        const docsFilename = `${packageName}-${versionPrefix}${version}-docs.tar.gz`;
        const docsSdistPath = `${realCwd}/dist-newstyle/${docsFilename}`;
        const docsUrl = `https://hackage.haskell.org/package/${packageName}-${versionPrefix}${version}/candidate/docs`;
        logger.log("Publishing file: ", docsFilename, " from: ", docsSdistPath);
        const docStatus = yield (0, exports.publishRCDocumentation)(docsSdistPath, docsUrl, process.env.HACKAGE_TOKEN);
        if (docStatus !== 200) {
            throw new Error(`Cannot post release candidate documentation now, status: ${status}`);
        }
    }
    logger.success("Publish done!");
    return {
        name: `${packageName}-${version}${isPrerelease ? " (candidate)" : ""}`,
        url: `https://hackage.haskell.org/${packageName}-${version}${isPrerelease ? "/candidate" : ""}`,
    };
});
exports.publish = publish;
//# sourceMappingURL=publish.js.map