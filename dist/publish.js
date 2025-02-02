"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publish = void 0;
const tslib_1 = require("tslib");
const hackage_1 = require("./utils/hackage");
const package_1 = require("./utils/package");
const version_1 = require("./utils/version");
const fs_1 = tslib_1.__importDefault(require("fs"));
const publish = ({ stripSuffix = false, workingDirectory, versionPrefix = "" }, { branch, logger, nextRelease }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (workingDirectory) {
        logger.log("Changing directory to %s", workingDirectory);
        process.chdir(workingDirectory);
    }
    const packageYaml = new package_1.PackageYaml();
    const packageName = packageYaml.getName();
    const packageVersion = (0, version_1.getHaskellVersion)(nextRelease, versionPrefix, stripSuffix);
    const sdist = `${packageName}-${packageVersion}.tar.gz`;
    const exists = fs_1.default.existsSync(sdist);
    if (!exists) {
        throw new Error(`${sdist} does not exist`);
    }
    logger.log("Publishing %s to hackage%s", sdist, branch.prerelease ? " as release candidate" : "");
    yield (0, hackage_1.postPackage)(sdist, process.env.HACKAGE_TOKEN, branch.prerelease);
    logger.log("Published hackage release: https://hackage.haskell.org/package/%s-%s%s", packageName, packageVersion, branch.prerelease ? "/candidate" : "");
    logger.success("Publish done!");
});
exports.publish = publish;
//# sourceMappingURL=publish.js.map